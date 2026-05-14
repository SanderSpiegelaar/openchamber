# Triage Labels

Default mapping: the five canonical **state** roles from the `triage` skill use the same strings as GitHub labels. Edit the **Label in this repo** column only if the tracker later adopts different names.

The skills refer to roles by canonical name; this table maps each role to the label string this repo uses.

| Canonical role    | Label in this repo    | Meaning                                  |
| ----------------- | --------------------- | ---------------------------------------- |
| `needs-triage`    | `needs-triage`        | Maintainer needs to evaluate this issue  |
| `needs-info`      | `needs-info`          | Waiting on reporter for more information |
| `ready-for-agent` | `ready-for-agent`     | Fully specified, ready for an AFK agent  |
| `ready-for-human` | `ready-for-human`     | Requires human implementation            |
| `wontfix`         | `wontfix`             | Will not be actioned                     |

Existing GitHub issue templates also use type labels such as `bug` and `enhancement`. Keep those as issue classification labels; do not substitute them for the state labels above.

When a skill mentions a role, such as "apply the AFK-ready triage label", use the corresponding **Label in this repo** string from this table.
