# Plant 3D Models (CC0)

Five glTF 2.0 plant models from [Poly Haven](https://polyhaven.com/) (2k texture resolution). All assets are **CC0 1.0 Universal** — no attribution required, though crediting Poly Haven and the authors is appreciated.

## Models

| Folder | Display name | Entry file | Total size | Authors |
|--------|--------------|------------|------------|---------|
| `anthurium_botany_01/` | Anthurium Botany 01 | `anthurium_botany_01_2k.gltf` | ~6.8 MB | Rob Tuytel (scanning), Rico Cilliers (modeling) |
| `shrub_sorrel_01/` | Shrub Sorrel 01 | `shrub_sorrel_01_2k.gltf` | ~3.6 MB | Rico Cilliers |
| `fern_02/` | Fern 02 | `fern_02_2k.gltf` | ~3.3 MB | Rob Tuytel (scanning), Rico Cilliers (modeling) |
| `pachira_aquatica_01/` | Pachira Aquatica 01 (money tree) | `pachira_aquatica_01_2k.gltf` | ~12 MB | Rob Tuytel (scanning), Rico Cilliers (modeling) |
| `cheiridopsis_succulent/` | Cheiridopsis Succulent | `cheiridopsis_succulent_2k.gltf` | ~8.5 MB | James Ray Cock (modeling), Jenelle van Heerden (photography) |

## License

**CC0 1.0 Universal (Public Domain Dedication)**

- Source: https://polyhaven.com/
- License text: https://creativecommons.org/publicdomain/zero/1.0/
- You may use, modify, and redistribute these assets for any purpose without permission.

## Usage (Three.js / react-three-fiber)

Each model is a multi-file glTF package. Load the `.gltf` entry file from its folder:

```js
useGLTF('/models/plants/pachira_aquatica_01/pachira_aquatica_01_2k.gltf')
```

## Recommended default hero plant

**`pachira_aquatica_01`** — A recognizable potted indoor money tree with strong silhouette, balanced proportions, and detailed bark/leaves. Best for hero shots in interior or product-style scenes. Use `anthurium_botany_01` instead for lush tropical/ground-cover foliage.

## Re-download

```bash
./download_polyhaven_gltf.sh <model_id> 2k <output_dir>
```

Example:

```bash
./download_polyhaven_gltf.sh anthurium_botany_01 2k ./anthurium_botany_01
```
