# Domain Docs

How engineering skills should consume this repo's domain documentation when exploring the codebase.

## Layout

OpenChamber uses the single-context layout:

- `CONTEXT.md` at the repo root, when present
- `docs/adr/`, when present
- Module documentation under `packages/**/DOCUMENTATION.md`
- Root agent guidance in `AGENTS.md`

If `CONTEXT.md` or `docs/adr/` do not exist, proceed silently. Do not create them upfront. The producer skill (`grill`) creates them lazily when durable terms or decisions actually get resolved.

## Before Exploring

Read the most specific existing documentation for the area being changed:

- Root architecture and workflow guidance: `AGENTS.md`
- Web server modules: `packages/web/server/**/DOCUMENTATION.md`
- UI state and sync modules: `packages/ui/src/**/DOCUMENTATION.md`
- VS Code runtime: `packages/vscode/src/DOCUMENTATION.md`
- Product and release docs: `docs/`, including `docs/TAURI_TO_ELECTRON_CUTOVER.md` when desktop shell cutover work is relevant

Also read any nearby `README.md` files that explain package-specific behavior.

## Use The Project Vocabulary

When output names a domain concept in an issue title, refactor proposal, hypothesis, test name, PRD, or implementation ticket, prefer the terms used by `AGENTS.md`, module docs, and `CONTEXT.md` when present. Do not introduce new synonyms for existing OpenChamber runtime concepts.

## Flag ADR Conflicts

If output contradicts an existing ADR or module documentation, surface it explicitly rather than silently overriding it.
