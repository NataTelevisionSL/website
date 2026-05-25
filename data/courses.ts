import { Lang } from "./translations";

export type ML = Record<Lang, string>;

export type CourseGroup = {
  name: ML;
  period: ML;
  schedule: ML;
};

export type CourseSession = {
  number: number;
  title: ML;
};

export type CourseStatus = "open" | "full" | "coming-soon";

export type Course = {
  slug: string;
  status: CourseStatus;
  title: string;
  subtitle: string;
  tag: ML;
  shortDescription: ML;
  description: ML[];
  mentoring: ML;
  details: {
    groups: ML;
    duration: ML;
    frequency: ML;
    sessionDuration: ML;
    price: string;
    language: ML;
  };
  groups: CourseGroup[];
  syllabus: CourseSession[];
  equipment: ML;
  instructor: { name: string; bio: ML };
  location: string;
  web: string;
  contact: string;
};

export const COURSES: Course[] = [
  {
    slug: "taller-3d-verano-2026",
    status: "open",
    title: "TALLER DE 3D",
    subtitle: "Animación, VFX, Archviz, IA",
    tag: {
      en: "Summer Course 2026",
      es: "Curso de Verano 2026",
      ca: "Curs d'Estiu 2026",
    },
    shortDescription: {
      en: "Summer workshop for young people and adults looking to start or strengthen their knowledge in 3D animation, VFX, Archviz and AI.",
      es: "Taller de verano dirigido a jóvenes y adultos interesados en iniciarse o reforzar sus conocimientos en 3D. Animación, VFX, Archviz e IA.",
      ca: "Taller d'estiu adreçat a joves i adults interessats a iniciar-se o reforçar els seus coneixements en 3D. Animació, VFX, Archviz i IA.",
    },
    description: [
      {
        en: "Summer workshop aimed at young people and adults interested in starting or strengthening their knowledge in 3D. We offer classes adapted to the needs of each group with a generalist approach, ideal for developing 3D animations, visual effects (VFX) or architecture renders (Archviz).",
        es: "Taller de verano dirigido a jóvenes y adultos interesados en iniciarse o reforzar sus conocimientos en 3D. Ofrecemos clases adaptadas a las necesidades de cada grupo con un enfoque generalista, ideal tanto para desarrollar animaciones 3D, efectos visuales (VFX) o renders para arquitectura (Archviz).",
        ca: "Taller d'estiu adreçat a joves i adults interessats a iniciar-se o reforçar els seus coneixements en 3D. Oferim classes adaptades a les necessitats de cada grup amb un enfocament generalista, ideal tant per desenvolupar animacions 3D, efectes visuals (VFX) o renders per a arquitectura (Archviz).",
      },
      {
        en: "Each session is divided into two parts. Common part: theoretical explanation of the lesson and demonstration of how to implement it in industry-standard software (Maya, Substance, Nuke, etc.). Practical part: guided mentoring where students implement what they've learned in their preferred software (such as Blender).",
        es: "Cada sesión se divide en dos partes. Parte común: Explicación teórica de la lección y demostración de cómo realizarla en el software estándar de la industria (Maya, Substance, Nuke, etc.). Parte práctica: Mentoría guiada donde los alumnos implementan lo aprendido directamente en su software de preferencia (como Blender).",
        ca: "Cada sessió es divideix en dues parts. Part comuna: Explicació teòrica de la lliçó i demostració de com realitzar-la en el programari estàndard de la indústria (Maya, Substance, Nuke, etc.). Part pràctica: Mentoria guiada on els alumnes implementen el que han après directament en el seu programari de preferència (com Blender).",
      },
      {
        en: "We want to provide a global vision where what matters is not the tool, but understanding the technical and artistic concepts behind each process.",
        es: "Queremos dar una visión global donde lo importante no es la herramienta, sino entender los conceptos técnicos y artísticos detrás de cada proceso.",
        ca: "Volem donar una visió global on el que importa no és l'eina, sinó entendre els conceptes tècnics i artístics darrere de cada procés.",
      },
      {
        en: "Additionally, we include an exclusive segment at the end of each lesson dedicated to emerging Artificial Intelligence technologies (ComfyUI, Magnific, Krea, etc.), showing how they optimise and transform current workflows.",
        es: "Además, añadimos un segmento exclusivo al final de cada lección dedicado a las nuevas tecnologías emergentes de Inteligencia Artificial (ComfyUI, Magnific, Krea, etc.), mostrando cómo optimizan y transforman los flujos de trabajo actuales.",
        ca: "A més, afegim un segment exclusiu al final de cada lliçó dedicat a les noves tecnologies emergents d'Intel·ligència Artificial (ComfyUI, Magnific, Krea, etc.), mostrant com optimitzen i transformen els fluxos de treball actuals.",
      },
    ],
    mentoring: {
      en: "Included in the price, all students have direct access to the instructor outside of class to resolve doubts, request feedback or ask whatever they need. If a student cannot attend a class, it will be recorded and shared so they don't fall behind.",
      es: "Incluido en el precio, todos los alumnos tienen acceso directo al profesor fuera de clase para resolver dudas, pedir feedback o consultar lo que necesiten. Si algún alumno no puede asistir a una clase, esta será grabada y compartida para que no pierda el ritmo.",
      ca: "Inclòs en el preu, tots els alumnes tenen accés directe al professor fora de classe per resoldre dubtes, demanar feedback o consultar el que necessitin. Si algun alumne no pot assistir a una classe, aquesta serà gravada i compartida perquè no perdi el ritme.",
    },
    details: {
      groups: {
        en: "Max. 6 people (100% personalised attention)",
        es: "Máximo 6 personas (atención 100% personalizada)",
        ca: "Màxim 6 persones (atenció 100% personalitzada)",
      },
      duration: {
        en: "2 months (8 sessions)",
        es: "2 meses (8 sesiones)",
        ca: "2 mesos (8 sessions)",
      },
      frequency: {
        en: "1 class per week",
        es: "1 clase por semana",
        ca: "1 classe per setmana",
      },
      sessionDuration: {
        en: "2 hours per session",
        es: "2 horas por sesión",
        ca: "2 hores per sessió",
      },
      price: "250€ (125€/mes)",
      language: {
        en: "Catalan or Spanish",
        es: "Catalán o Castellano",
        ca: "Català o Castellà",
      },
    },
    groups: [
      {
        name: { en: "GROUP A", es: "GRUPO A", ca: "GRUP A" },
        period: {
          en: "24 June – 12 August",
          es: "24 de Junio – 12 de Agosto",
          ca: "24 de Juny – 12 d'Agost",
        },
        schedule: {
          en: "Wednesdays 18:30–20:30h",
          es: "Miércoles de 18:30 a 20:30h",
          ca: "Dimecres de 18:30 a 20:30h",
        },
      },
      {
        name: { en: "GROUP B", es: "GRUPO B", ca: "GRUP B" },
        period: {
          en: "27 June – 15 August",
          es: "27 de Junio – 15 de Agosto",
          ca: "27 de Juny – 15 d'Agost",
        },
        schedule: {
          en: "Saturdays 10:30–12:30h",
          es: "Sábados de 10:30 a 12:30h",
          ca: "Dissabtes de 10:30 a 12:30h",
        },
      },
    ],
    syllabus: [
      {
        number: 1,
        title: {
          en: "Welcome to 3D, interface and navigation.",
          es: "Bienvenida al 3D, interfaz y navegación.",
          ca: "Benvinguda al 3D, interfície i navegació.",
        },
      },
      {
        number: 2,
        title: {
          en: "Basic modelling and geometry.",
          es: "Modelado básico y geometría.",
          ca: "Modelat bàsic i geometria.",
        },
      },
      {
        number: 3,
        title: {
          en: "Materials, textures and UV Unwrapping.",
          es: "Materiales, texturas y UV Unwrapping.",
          ca: "Materials, textures i UV Unwrapping.",
        },
      },
      {
        number: 4,
        title: {
          en: "Advanced PBR texturing.",
          es: "Texturizado PBR avanzado.",
          ca: "Texturitzat PBR avançat.",
        },
      },
      {
        number: 5,
        title: {
          en: "Studio lighting and Render engine.",
          es: "Iluminación de estudio y motor de Render.",
          ca: "Il·luminació d'estudi i motor de Render.",
        },
      },
      {
        number: 6,
        title: {
          en: "Animation and VFX fundamentals.",
          es: "Fundamentos de Animación y VFX.",
          ca: "Fonaments d'Animació i VFX.",
        },
      },
      {
        number: 7,
        title: {
          en: "Pipeline and basic digital compositing.",
          es: "Pipeline y Composición digital básica.",
          ca: "Pipeline i Composició digital bàsica.",
        },
      },
      {
        number: 8,
        title: {
          en: "Final project, Portfolio and closing.",
          es: "Proyecto Final, Portfolio y cierre.",
          ca: "Projecte Final, Portfolio i tancament.",
        },
      },
    ],
    equipment: {
      en: "The workshop has computers available for all students, included in the course price. You are welcome to bring your own laptop if you prefer.",
      es: "El taller dispone de ordenadores para todos los alumnos, incluidos en el precio del curso. Si prefieres trabajar con tu propio portátil, estás bienvenido a traerlo.",
      ca: "El taller disposa d'ordinadors per a tots els alumnes, inclosos en el preu del curs. Si prefereixes treballar amb el teu propi portàtil, ets benvingut a portar-lo.",
    },
    instructor: {
      name: "Roger Piñol",
      bio: {
        en: "Active VFX and 3D artist with experience in real productions.",
        es: "Artista de VFX y 3D en activo con experiencia en producciones reales.",
        ca: "Artista de VFX i 3D en actiu amb experiència en produccions reals.",
      },
    },
    location: "Carrer Canalejas, 3, Sants, Barcelona",
    web: "natatelevision.com",
    contact: "hi@natatelevision.com",
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}
