import { afterEach, describe, expect, it, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import { registerSkillRoutes } from './skill-routes.js';

const createDependencies = (overrides = {}) => ({
  fs: {
    existsSync: () => false,
  },
  path: {
    resolve: (value) => value,
    sep: '/',
    dirname: (value) => value.split('/').slice(0, -1).join('/'),
    join: (...parts) => parts.join('/').replace(/\/+/g, '/'),
  },
  os: {
    homedir: () => '/home/tester',
  },
  resolveProjectDirectory: async () => ({ directory: '/workspace/project' }),
  resolveOptionalProjectDirectory: async () => ({ directory: '/workspace/project' }),
  readSettingsFromDisk: async () => ({}),
  sanitizeSkillCatalogs: () => [],
  isUnsafeSkillRelativePath: () => false,
  refreshOpenCodeAfterConfigChange: async () => {},
  clientReloadDelayMs: 0,
  buildOpenCodeUrl: (pathname) => `http://opencode.test${pathname}`,
  getOpenCodeAuthHeaders: () => ({}),
  getOpenCodePort: () => 4096,
  getSkillSources: (name) => ({
    md: {
      exists: true,
      path: `/skills/${name}/SKILL.md`,
      dir: `/skills/${name}`,
      fields: ['description'],
      supportingFiles: [],
      description: `${name} description`,
    },
  }),
  discoverSkills: () => [
    {
      name: 'agent-local',
      path: '/home/tester/.agents/skills/agent-local/SKILL.md',
      scope: 'user',
      source: 'agents',
      description: 'Local agent skill',
    },
  ],
  createSkill: () => {},
  updateSkill: () => {},
  deleteSkill: () => {},
  readSkillSupportingFile: () => '',
  writeSkillSupportingFile: () => {},
  deleteSkillSupportingFile: () => {},
  SKILL_SCOPE: {
    USER: 'user',
    PROJECT: 'project',
  },
  SKILL_DIR: '/home/tester/.config/opencode/skills',
  getCuratedSkillsSources: () => [],
  getCacheKey: () => 'key',
  getCachedScan: () => null,
  setCachedScan: () => {},
  parseSkillRepoSource: () => ({ ok: false }),
  scanSkillsRepository: async () => ({ ok: true, items: [] }),
  installSkillsFromRepository: async () => ({ ok: true, installed: [], skipped: [] }),
  scanClawdHubPage: async () => ({ ok: true, items: [] }),
  installSkillsFromClawdHub: async () => ({ ok: true, installed: [], skipped: [] }),
  isClawdHubSource: () => false,
  getProfiles: () => [],
  getProfile: () => null,
  ...overrides,
});

describe('skill routes', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('lists locally discovered skills even when OpenCode returns skills', async () => {
    globalThis.fetch = vi.fn(async () => ({
      ok: true,
      json: async () => [
        {
          name: 'upstream-skill',
          location: '/workspace/project/.opencode/skills/upstream-skill/SKILL.md',
          description: 'Upstream skill',
        },
      ],
    }));

    const app = express();
    registerSkillRoutes(app, createDependencies());

    const response = await request(app)
      .get('/api/config/skills')
      .query({ directory: '/workspace/project' })
      .expect(200);

    expect(response.body.skills.map((skill) => skill.name)).toEqual([
      'upstream-skill',
      'agent-local',
    ]);
    expect(response.body.skills.find((skill) => skill.name === 'agent-local')).toMatchObject({
      scope: 'user',
      source: 'agents',
    });
  });
});
