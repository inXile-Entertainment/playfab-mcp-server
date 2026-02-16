#!/bin/bash

# Claude Code PreToolUse Hook: Block file operations outside worktree

WORKTREE_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
if [ -z "$WORKTREE_ROOT" ]; then
    WORKTREE_ROOT=$(pwd)
fi

is_within_worktree() {
    local target_path="$1"
    if [ -z "$target_path" ]; then
        return 1
    fi
    if [ "$target_path" = "~" ]; then
        return 1
    fi
    if [[ "$target_path" = /* ]]; then
        local abs_path="$target_path"
    else
        local abs_path
        abs_path=$(cd -- "$target_path" 2>/dev/null && pwd)
        if [ -z "$abs_path" ]; then
            abs_path="$(pwd)/$target_path"
        fi
    fi
    if command -v realpath >/dev/null 2>&1; then
        local resolved_path
        resolved_path=$(realpath -m "$abs_path" 2>/dev/null) && abs_path="$resolved_path"
    fi
    case "$abs_path" in
        "$WORKTREE_ROOT"|"$WORKTREE_ROOT"/*) return 0 ;;
        *) return 1 ;;
    esac
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
    if echo "$trimmed_segment" | grep -qE '^(mkdir|rmdir|rm|touch|cp|mv)\b'; then
        file_paths=$(echo "$trimmed_segment" | awk '{for(i=2;i<=NF;i++) if($i !~ /^-/) print $i}')
        while IFS= read -r path; do
            if [ -z "$path" ]; then
                continue
            fi
            if ! is_within_worktree "$path"; then
                cat <<EOF
{
  "decision": "block",
  "reason": "File operations outside worktree are not allowed",
  "stopReason": "Worktree root: $WORKTREE_ROOT\nTarget: $path\nBlocked: $command"
}
EOF
                exit 2
            fi
        done <<< "$file_paths"
    fi
done <<< "$command_segments"

exit 0
