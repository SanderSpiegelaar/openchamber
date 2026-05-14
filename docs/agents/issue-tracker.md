# Issue tracker: GitHub

Issues, PRDs, and implementation tickets for this repo may be published to GitHub issues when the user explicitly asks for tracker publication. Filesystem artifacts remain the canonical default unless the user asks to publish.

Detected GitHub remotes:

- `origin`: `git@github.com:SanderSpiegelaar/openchamber.git`
- `upstream`: `git@github.com:openchamber/openchamber.git`

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --comments`, filtering comments with `jq` when needed and fetching labels.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

Infer the repo from GitHub CLI context when possible. If Git discovery is unavailable in the current shell, pass the repo explicitly with `--repo SanderSpiegelaar/openchamber` or `--repo openchamber/openchamber` as appropriate.

## When a skill says "publish to the issue tracker"

Create a GitHub issue only when the user explicitly asks for publication. Otherwise, write the requested PRD, implementation plan, ticket, or handoff file under `docs/`.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments` for a GitHub issue, or read the local ticket file directly when the user points to a filesystem ticket.
