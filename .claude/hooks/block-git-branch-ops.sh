#!/bin/bash

# Claude Code PreToolUse Hook: Block git branch operations

is_read_only_git_branch() {
    local branch_args="$1"
    branch_args=$(echo "$branch_args" | sed 's/^[[:space:]]*//; s/[[:space:]]*$//')
    if [ -z "$branch_args" ]; then
        return 0
    fi
    if echo "$branch_args" | grep -qE '^(--list|--show-current|--all|-a|--remotes|-r|--contains|--merged|--no-merged|--points-at|--format|--sort|--abbrev|-v|-vv|--verbose)'; then
        return 0
    fi
    return 1
}

json_input=$(cat)
tool_name=$(echo "$json_input" | jq -r '.tool_name // empty')

if [ "$tool_name" != "Bash" ]; then
    exit 0
fi

command=$(echo "$json_input" | jq -r '.tool_input.command // empty')
command_segments=$(printf '%s\n' "$command" | sed -E 's/\|&/\n/g; s/\|\|/\n/g; s/&&/\n/g; s/[;|&]/\n/g')

while IFS= read -r segment; do
    trimmed_segment=$(echo "$segment" | sed 's/[<>].*//; s/<<.*//' | xargs)
    if [ -z "$trimmed_segment" ]; then
        continue
    fi
    if printf '%s' "$trimmed_segment" | grep -qE '^git[[:space:]]+rebase\b'; then
        if printf '%s' "$trimmed_segment" | grep -qE '(^|[[:space:]])(-i|--interactive)([[:space:]]|$)' &&
           printf '%s' "$trimmed_segment" | grep -qE '(^|[[:space:]])origin/main([[:space:]]|$)'; then
            cat <<EOF
{
  "decision": "block",
  "reason": "Interactive rebase against origin/main is not allowed",
  "stopReason": "Blocked: $command"
}
EOF
            exit 2
        fi
    fi
    if echo "$trimmed_segment" | grep -qE '^git\b'; then
        if echo "$trimmed_segment" | grep -qE '\b(checkout|switch)\b'; then
            cat <<EOF
{
  "decision": "block",
  "reason": "Branch switching commands (checkout/switch) are not allowed",
  "stopReason": "Blocked: $command"
}
EOF
            exit 2
        fi
        if echo "$trimmed_segment" | grep -qE '^git[[:space:]]+((-[a-zA-Z]|--[a-z-]+)[[:space:]]+)*branch\b'; then
            branch_args=$(echo "$trimmed_segment" | sed -E 's/^git[[:space:]]+((-[a-zA-Z]|--[a-z-]+)[[:space:]]+)*branch//')
            if is_read_only_git_branch "$branch_args"; then
                continue
            fi
            cat <<EOF
{
  "decision": "block",
  "reason": "Branch modification commands are not allowed",
  "stopReason": "Blocked: $command"
}
EOF
            exit 2
        fi
        if echo "$trimmed_segment" | grep -qE '^git[[:space:]]+((-[a-zA-Z]|--[a-z-]+)[[:space:]]+)*worktree\b'; then
            cat <<EOF
{
  "decision": "block",
  "reason": "Worktree commands are not allowed",
  "stopReason": "Blocked: $command"
}
EOF
            exit 2
        fi
    fi
done <<< "$command_segments"

exit 0
