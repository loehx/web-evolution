export type PlantId =
  | 'pachira_aquatica_01'
  | 'anthurium_botany_01'
  | 'fern_02'
  | 'shrub_sorrel_01'
  | 'cheiridopsis_succulent'

export const DEFAULT_PLANT: PlantId = 'pachira_aquatica_01'

export const PLANT_URLS: Record<PlantId, string> = {
  pachira_aquatica_01: '/models/plants/pachira_aquatica_01/pachira_aquatica_01_2k.gltf',
  anthurium_botany_01: '/models/plants/anthurium_botany_01/anthurium_botany_01_2k.gltf',
  fern_02: '/models/plants/fern_02/fern_02_2k.gltf',
  shrub_sorrel_01: '/models/plants/shrub_sorrel_01/shrub_sorrel_01_2k.gltf',
  cheiridopsis_succulent: '/models/plants/cheiridopsis_succulent/cheiridopsis_succulent_2k.gltf',
}

/** Camera position [x, y, z] tuned per model — Poly Haven assets are real-world meters. */
export const PLANT_CAMERA: Record<PlantId, [number, number, number]> = {
  pachira_aquatica_01: [0, 1.4, 5.8],
  anthurium_botany_01: [0, 0.35, 2.6],
  fern_02: [0, 0.25, 2.3],
  shrub_sorrel_01: [0, 0.2, 2.1],
  cheiridopsis_succulent: [0, 0.12, 1.7],
}

export const PLANT_FOV: Record<PlantId, number> = {
  pachira_aquatica_01: 38,
  anthurium_botany_01: 42,
  fern_02: 42,
  shrub_sorrel_01: 44,
  cheiridopsis_succulent: 44,
}
