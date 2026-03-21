// ─────────────────────────────────────────────────────────────
//  Aquí defines tus modelos.
//  Para agregar uno nuevo solo añade un objeto a este array.
// ─────────────────────────────────────────────────────────────

const MODELS = [
  {
    id: 'casa2',
    name: 'Casa Moderna',
    description:
      'Diseño contemporáneo con grandes ventanales, techos planos y espacios abiertos. Ideal para terrenos amplios.',
    src: 'src/data/assets/modelos/casa_2.glb',
    badge: 'Residencial',
  },
  {
    id: 'cajaj',
    name: 'Casa Cajaj',
    description:
      'Arquitectura vernácula con elementos regionales. Volumetría cálida que armoniza con el entorno natural.',
    src: 'src/data/assets/modelos/Astronaut.glb',
    badge: 'Vernácula',
  },
  {
    id: 'astronauta',
    name: 'Astronauta',
    description:
      'Figura de exploración espacial. Úsala para probar escala y posicionamiento AR en cualquier superficie.',
    src: 'src/data/assets/modelos/casa_j.glb',
    badge: 'Demo',
  },
]

export default MODELS