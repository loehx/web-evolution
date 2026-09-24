#!/usr/bin/env bash
# Copy Soundboard source audio from ~/Downloads into public/sounds/soundboard/
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$ROOT/public/sounds/soundboard"
DOWNLOADS="${HOME}/Downloads"

mkdir -p "$DEST"

for i in $(seq 2 16); do
  cp "$DOWNLOADS/Stahltwiete $i.m4a" "$DEST/stahltwiete-$i.m4a"
done

cp "$DOWNLOADS/Zähne putzen.m4a" "$DEST/zaehne-putzen.m4a"

echo "Copied $(ls -1 "$DEST"/*.m4a | wc -l | tr -d ' ') files to $DEST"
