#!/usr/bin/env bash
# List component folders in web-evolution alive, dead, and staging trees.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEFAULT_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
ROOT="${1:-$DEFAULT_ROOT}"

for bucket in alive dead staging; do
  dir="$ROOT/$bucket"
  echo "=== $bucket ==="
  if [[ -d "$dir" ]]; then
    find "$dir" -mindepth 1 -maxdepth 1 -type d -exec basename {} \; 2>/dev/null | sort || true
  else
    echo "(missing: $dir)"
  fi
  echo
done

# Legacy flat layout under src/components
legacy="$ROOT/src/components"
if [[ -d "$legacy" ]]; then
  echo "=== src/components (legacy flat) ==="
  find "$legacy" -maxdepth 1 -name '*.tsx' -exec basename {} .tsx \; 2>/dev/null | sort || true
fi
