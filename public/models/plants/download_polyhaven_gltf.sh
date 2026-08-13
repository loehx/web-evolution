#!/usr/bin/env bash
# Download Poly Haven glTF package (main .gltf + included files) into a target folder.
set -euo pipefail

MODEL_ID="${1:?model id required}"
RES="${2:-2k}"
OUT_DIR="${3:?output dir required}"

API_JSON=$(curl -fsSL "https://api.polyhaven.com/files/${MODEL_ID}") || {
  echo "ERROR: API request failed for ${MODEL_ID}" >&2
  exit 1
}

MAIN_URL=$(echo "$API_JSON" | python3 -c "
import json,sys
d=json.load(sys.stdin)
g=d['gltf']['${RES}']['gltf']
print(g['url'])
")

mkdir -p "$OUT_DIR"

download_file() {
  local url="$1"
  local dest="$2"
  local dir
  dir=$(dirname "$dest")
  mkdir -p "$dir"
  echo "  -> $dest"
  curl -fsSL "$url" -o "$dest" || {
    echo "ERROR: download failed (403 or network) for $url" >&2
    exit 1
  }
}

# Main glTF
MAIN_FILE=$(basename "$MAIN_URL")
download_file "$MAIN_URL" "$OUT_DIR/$MAIN_FILE"

# Included files (textures, .bin)
echo "$API_JSON" | python3 -c "
import json,sys
d=json.load(sys.stdin)
g=d['gltf']['${RES}']['gltf']
for path, info in g.get('include', {}).items():
    print(info['url'] + '\t' + path)
" | while IFS=$'\t' read -r url relpath; do
  download_file "$url" "$OUT_DIR/$relpath"
done

echo "Downloaded ${MODEL_ID} (${RES}) to ${OUT_DIR}"
