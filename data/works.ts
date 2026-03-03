export type Work = {
  id: number;
  title: string;
  year: number | string;
  description?: string;
  vimeoId: string; 
};

export const WORKS: Work[] = [
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
        Carlos Yau.
        `,
    vimeoId: "1117687956",
  },

  
  {
    id: 0,
    title: "MISSING PIECES - TV Series Pitch",
    year: 2021,
    description: `3D Animation. 
        Direction:
        Roger Piñol,
        Artists:
        Lucía Bordona,
        Carla Magriñà,
        Joel Martínez,
        Bernat Mas,
        Joan Palacios,
        Roger Piñol,
        Ilona Escudero,
        Montserrat Larque,
        Kirsty Harris,
        Irene Fernández,
        Olaf Aguera,
        Pau Losada,
        Cristian Casas,
        Joan Pons,
        Marina Salas,
        Andrea Gutiérrez,
        Silvia Ros,
        Sergi Solanes.
        `,
    vimeoId: "1169915996",
  },

];
