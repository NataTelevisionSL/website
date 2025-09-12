export type Work = {
  id: number;
  title: string;
  year: number | string;
  description?: string;
  vimeoId: string; 
};

export const WORKS: Work[] = [
   {
    id: 3,
    title: "TOFU DE TORO",
    year: 2025,
    description: `Client: NATA TELEVISION. Full Service project.
        `,
    vimeoId: "1117687971",
  },

  {
    id: 2,
    title: "ESTA ES TU CASA - Kapo & Camilo",
    year: 2025,
    description: `Client: PIJAMA STUDIO. Post-production / VFX of sixty shots for the new music video of Kapo & Camilo. 
        VFX team:
        Noé Delaye Suñer,
        Roger Piñol Cancer,
        Carlos Yau,
        Noa Bofill,
        Clara Beltran,
        Joaquín Cuervo,
        Joan Cortit,
        Adrià Draper,
        Eduardo García,
        Nacho Hoyos,
        Daniel Lores,
        David Lozano.
        `,
    vimeoId: "1117687982",
  },

  {
    id: 1,
    title: "LA VITAMINA DE L'AMOR - Mama Dousha",
    year: 2025,
    description: `Client: MAMA DOUSHA. Post-production / VFX. 
        VFX Supervision:
        Ariadna Ollé,
        VFX Artist:
        Noé Delaye Suñer
        Roger Piñol Cancer,
        Carlos Yau,
        `,
    vimeoId: "1117687956",
  },
];
