import type { Lang } from "@/data/translations";

/** Update taxId (CIF/NIF) when available — required for full LSSI compliance. */
export const COMPANY = {
  name: "Nata Television",
  tradeName: "Nata.tv",
  address: "Carrer Canalejas 3, 08015 Barcelona, Spain",
  email: "admin@natatelevision.com",
  emailAlt: "hi@natatelevision.com",
  phone: "+34 619 92 63 11",
  taxId: "",
  siteUrl: "https://natatelevision.com",
} as const;

export type LegalSlug = "aviso-legal" | "privacidad" | "cookies";

export const LEGAL_SLUGS: LegalSlug[] = ["aviso-legal", "privacidad", "cookies"];

type LegalDoc = {
  title: Record<Lang, string>;
  updated: Record<Lang, string>;
  sections: { heading: Record<Lang, string>; body: Record<Lang, string[]> }[];
};

function idBlock(lang: Lang): string[] {
  const lines = [
    `${COMPANY.name} (${COMPANY.tradeName})`,
    COMPANY.address,
    `${lang === "en" ? "Email" : lang === "es" ? "Email" : "Correu"}: ${COMPANY.email}`,
    `${lang === "en" ? "Phone" : lang === "es" ? "Teléfono" : "Telèfon"}: ${COMPANY.phone}`,
  ];
  if (COMPANY.taxId) {
    lines.push(`CIF/NIF: ${COMPANY.taxId}`);
  } else {
    lines.push(
      lang === "en"
        ? "Tax ID (CIF/NIF): to be published — ask admin@natatelevision.com"
        : lang === "es"
          ? "CIF/NIF: pendiente de publicar — solicitar en admin@natatelevision.com"
          : "CIF/NIF: pendent de publicar — sol·licitar a admin@natatelevision.com"
    );
  }
  return lines;
}

export const LEGAL_DOCS: Record<LegalSlug, LegalDoc> = {
  "aviso-legal": {
    title: {
      en: "Legal notice",
      es: "Aviso legal",
      ca: "Avís legal",
    },
    updated: {
      en: "Last updated: March 2026",
      es: "Última actualización: marzo 2026",
      ca: "Darrera actualització: març 2026",
    },
    sections: [
      {
        heading: {
          en: "1. Website owner",
          es: "1. Titular del sitio web",
          ca: "1. Titular del lloc web",
        },
        body: {
          en: [
            "In accordance with Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), the owner of this website is:",
            ...idBlock("en"),
          ],
          es: [
            "De conformidad con la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), el titular de este sitio web es:",
            ...idBlock("es"),
          ],
          ca: [
            "D'acord amb la Llei 34/2002 de Serveis de la Societat de la Informació i de Comerç Electrònic (LSSI-CE), el titular d'aquest lloc web és:",
            ...idBlock("ca"),
          ],
        },
      },
      {
        heading: {
          en: "2. Purpose",
          es: "2. Objeto",
          ca: "2. Objecte",
        },
        body: {
          en: [
            "This website provides information about Nata Television’s services, projects and contact channels. Access and use imply acceptance of this legal notice.",
          ],
          es: [
            "Este sitio web ofrece información sobre los servicios, proyectos y canales de contacto de Nata Television. El acceso y uso implican la aceptación de este aviso legal.",
          ],
          ca: [
            "Aquest lloc web ofereix informació sobre els serveis, projectes i canals de contacte de Nata Television. L'accés i l'ús impliquen l'acceptació d'aquest avís legal.",
          ],
        },
      },
      {
        heading: {
          en: "3. Intellectual property",
          es: "3. Propiedad intelectual",
          ca: "3. Propietat intel·lectual",
        },
        body: {
          en: [
            "All content on this site (texts, images, videos, logos, design and code), unless otherwise stated, is owned by Nata Television or used with permission. Reproduction, distribution or public communication without prior written authorisation is forbidden.",
          ],
          es: [
            "Todo el contenido de este sitio (textos, imágenes, vídeos, logos, diseño y código), salvo indicación en contrario, es propiedad de Nata Television o se utiliza con autorización. Queda prohibida su reproducción, distribución o comunicación pública sin autorización previa por escrito.",
          ],
          ca: [
            "Tot el contingut d'aquest lloc (textos, imatges, vídeos, logos, disseny i codi), llevat d'indicació en contra, és propietat de Nata Television o s'utilitza amb autorització. Queda prohibida la reproducció, distribució o comunicació pública sense autorització prèvia per escrit.",
          ],
        },
      },
      {
        heading: {
          en: "4. Liability",
          es: "4. Responsabilidad",
          ca: "4. Responsabilitat",
        },
        body: {
          en: [
            "We strive to keep information accurate and the site available, but we do not guarantee absence of errors or uninterrupted access. We are not liable for third-party content linked from this site (including Vimeo or social networks).",
          ],
          es: [
            "Nos esforzamos por mantener la información exacta y el sitio disponible, pero no garantizamos la ausencia de errores ni un acceso ininterrumpido. No respondemos del contenido de terceros enlazado desde este sitio (incluido Vimeo o redes sociales).",
          ],
          ca: [
            "Ens esforcem per mantenir la informació exacta i el lloc disponible, però no garantim l'absència d'errors ni un accés ininterromput. No responem del contingut de tercers enllaçat des d'aquest lloc (inclòs Vimeo o xarxes socials).",
          ],
        },
      },
      {
        heading: {
          en: "5. Applicable law",
          es: "5. Legislación aplicable",
          ca: "5. Legislació aplicable",
        },
        body: {
          en: [
            "This website is governed by Spanish law. Any dispute shall be submitted to the courts of Barcelona, unless mandatory consumer rules provide otherwise.",
          ],
          es: [
            "Este sitio web se rige por la legislación española. Cualquier controversia se someterá a los juzgados y tribunales de Barcelona, salvo que la normativa de consumidores disponga otra cosa.",
          ],
          ca: [
            "Aquest lloc web es regeix per la legislació espanyola. Qualsevol controvèrsia se sotmetrà als jutjats i tribunals de Barcelona, llevat que la normativa de consumidors disposi una altra cosa.",
          ],
        },
      },
    ],
  },

  privacidad: {
    title: {
      en: "Privacy policy",
      es: "Política de privacidad",
      ca: "Política de privacitat",
    },
    updated: {
      en: "Last updated: March 2026",
      es: "Última actualización: marzo 2026",
      ca: "Darrera actualització: març 2026",
    },
    sections: [
      {
        heading: {
          en: "1. Data controller",
          es: "1. Responsable del tratamiento",
          ca: "1. Responsable del tractament",
        },
        body: {
          en: [
            "The controller of your personal data is:",
            ...idBlock("en"),
          ],
          es: [
            "El responsable del tratamiento de tus datos personales es:",
            ...idBlock("es"),
          ],
          ca: [
            "El responsable del tractament de les teves dades personals és:",
            ...idBlock("ca"),
          ],
        },
      },
      {
        heading: {
          en: "2. Data we collect",
          es: "2. Datos que recopilamos",
          ca: "2. Dades que recopilem",
        },
        body: {
          en: [
            "Through the contact form we may process: name, email address, enquiry type and message content.",
            "If you email or call us, we process the data you voluntarily provide to handle your request.",
            "Technically, the hosting provider may process connection data (IP, browser, date/time) needed to serve the website.",
          ],
          es: [
            "A través del formulario de contacto podemos tratar: nombre, dirección de email, tipo de consulta y contenido del mensaje.",
            "Si nos escribes o llamas, tratamos los datos que nos facilites voluntariamente para gestionar tu solicitud.",
            "A nivel técnico, el proveedor de alojamiento puede tratar datos de conexión (IP, navegador, fecha/hora) necesarios para servir el sitio web.",
          ],
          ca: [
            "A través del formulari de contacte podem tractar: nom, adreça d'email, tipus de consulta i contingut del missatge.",
            "Si ens escrius o truques, tractem les dades que ens facilitis voluntàriament per gestionar la teva sol·licitud.",
            "A nivell tècnic, el proveïdor d'allotjament pot tractar dades de connexió (IP, navegador, data/hora) necessàries per servir el lloc web.",
          ],
        },
      },
      {
        heading: {
          en: "3. Purpose and legal basis",
          es: "3. Finalidad y base jurídica",
          ca: "3. Finalitat i base jurídica",
        },
        body: {
          en: [
            "Purpose: to answer enquiries, project requests, career applications or collaborations.",
            "Legal basis: your consent when submitting the form (Art. 6.1.a GDPR) and, where applicable, pre-contractual measures or our legitimate interest in responding to professional contacts (Art. 6.1.b and 6.1.f GDPR).",
            "We do not use your data for automated profiling or mass marketing without a separate legal basis.",
          ],
          es: [
            "Finalidad: responder consultas, solicitudes de proyecto, candidaturas o colaboraciones.",
            "Base jurídica: tu consentimiento al enviar el formulario (art. 6.1.a RGPD) y, en su caso, medidas precontractuales o nuestro interés legítimo en responder a contactos profesionales (art. 6.1.b y 6.1.f RGPD).",
            "No utilizamos tus datos para elaboración automatizada de perfiles ni marketing masivo sin otra base legal.",
          ],
          ca: [
            "Finalitat: respondre consultes, sol·licituds de projecte, candidatures o col·laboracions.",
            "Base jurídica: el teu consentiment en enviar el formulari (art. 6.1.a RGPD) i, si escau, mesures precontractuals o el nostre interès legítim a respondre contactes professionals (art. 6.1.b i 6.1.f RGPD).",
            "No utilitzem les teves dades per a elaboració automatitzada de perfils ni màrqueting massiu sense una altra base legal.",
          ],
        },
      },
      {
        heading: {
          en: "4. Recipients and processors",
          es: "4. Destinatarios y encargados",
          ca: "4. Destinataris i encarregats",
        },
        body: {
          en: [
            "Contact form submissions are processed via Formspree (form service provider). This may involve transfers outside the EEA under appropriate safeguards (e.g. Standard Contractual Clauses).",
            "Website hosting and infrastructure providers process data strictly as needed to operate the site.",
            "If you accept cookies for embedded media, Vimeo may process technical data according to its own privacy policy.",
            "We do not sell your personal data.",
          ],
          es: [
            "Los envíos del formulario se procesan a través de Formspree (proveedor del servicio de formularios). Ello puede implicar transferencias fuera del EEE con garantías adecuadas (p. ej. Cláusulas Contractuales Tipo).",
            "Los proveedores de alojamiento e infraestructura tratan datos solo en la medida necesaria para operar el sitio.",
            "Si aceptas cookies para medios embebidos, Vimeo puede tratar datos técnicos según su propia política de privacidad.",
            "No vendemos tus datos personales.",
          ],
          ca: [
            "Els enviaments del formulari es processen a través de Formspree (proveïdor del servei de formularis). Això pot implicar transferències fora de l'EEE amb garanties adequades (p. ex. Clàusules Contractuals Tipus).",
            "Els proveïdors d'allotjament i infraestructura tracten dades només en la mesura necessària per operar el lloc.",
            "Si acceptes galetes per a mitjans incrustats, Vimeo pot tractar dades tècniques segons la seva pròpia política de privacitat.",
            "No venem les teves dades personals.",
          ],
        },
      },
      {
        heading: {
          en: "5. Retention",
          es: "5. Conservación",
          ca: "5. Conservació",
        },
        body: {
          en: [
            "We keep enquiry data only as long as needed to handle your request and for a reasonable follow-up period, or longer if a legal obligation applies. You may ask us to delete it earlier when legally possible.",
          ],
          es: [
            "Conservamos los datos de consultas solo el tiempo necesario para gestionar tu solicitud y un seguimiento razonable, o más si existe obligación legal. Puedes pedirnos su eliminación antes cuando la ley lo permita.",
          ],
          ca: [
            "Conservem les dades de consultes només el temps necessari per gestionar la teva sol·licitud i un seguiment raonable, o més si hi ha obligació legal. Pots demanar-ne l'eliminació abans quan la llei ho permeti.",
          ],
        },
      },
      {
        heading: {
          en: "6. Your rights",
          es: "6. Tus derechos",
          ca: "6. Els teus drets",
        },
        body: {
          en: [
            "You may exercise access, rectification, erasure, objection, restriction and portability by writing to admin@natatelevision.com, with enough detail to identify your request.",
            "You may withdraw consent at any time without affecting prior lawful processing.",
            "You may lodge a complaint with the Spanish Data Protection Agency (AEPD): www.aepd.es",
          ],
          es: [
            "Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a admin@natatelevision.com, con datos suficientes para identificar tu solicitud.",
            "Puedes retirar el consentimiento en cualquier momento sin afectar al tratamiento previo lícito.",
            "Puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD): www.aepd.es",
          ],
          ca: [
            "Pots exercir els drets d'accés, rectificació, supressió, oposició, limitació i portabilitat escrivint a admin@natatelevision.com, amb dades suficients per identificar la teva sol·licitud.",
            "Pots retirar el consentiment en qualsevol moment sense afectar el tractament previ lícit.",
            "Pots presentar una reclamació davant l'Agència Espanyola de Protecció de Dades (AEPD): www.aepd.es",
          ],
        },
      },
      {
        heading: {
          en: "7. Security",
          es: "7. Seguridad",
          ca: "7. Seguretat",
        },
        body: {
          en: [
            "We apply reasonable technical and organisational measures to protect personal data. No transmission over the Internet is fully secure; please avoid sending highly sensitive information through the form.",
          ],
          es: [
            "Aplicamos medidas técnicas y organizativas razonables para proteger los datos personales. Ninguna transmisión por Internet es totalmente segura; evita enviar información especialmente sensible a través del formulario.",
          ],
          ca: [
            "Apliquem mesures tècniques i organitzatives raonables per protegir les dades personals. Cap transmissió per Internet és totalment segura; evita enviar informació especialment sensible a través del formulari.",
          ],
        },
      },
    ],
  },

  cookies: {
    title: {
      en: "Cookie policy",
      es: "Política de cookies",
      ca: "Política de galetes",
    },
    updated: {
      en: "Last updated: March 2026",
      es: "Última actualización: marzo 2026",
      ca: "Darrera actualització: març 2026",
    },
    sections: [
      {
        heading: {
          en: "1. What are cookies?",
          es: "1. ¿Qué son las cookies?",
          ca: "1. Què són les galetes?",
        },
        body: {
          en: [
            "Cookies are small files stored on your device when you visit a website. Similar technologies (local storage, pixels) may be used for the same purposes.",
          ],
          es: [
            "Las cookies son pequeños archivos que se almacenan en tu dispositivo al visitar un sitio web. Tecnologías similares (almacenamiento local, píxeles) pueden usarse con los mismos fines.",
          ],
          ca: [
            "Les galetes són petits fitxers que s'emmagatzemen al teu dispositiu en visitar un lloc web. Tecnologies similars (emmagatzematge local, píxels) es poden usar amb les mateixes finalitats.",
          ],
        },
      },
      {
        heading: {
          en: "2. How we use them",
          es: "2. Cómo las usamos",
          ca: "2. Com les fem servir",
        },
        body: {
          en: [
            "Essential / technical: language preference and cookie-consent choice (stored in your browser’s local storage). These are needed for the site to work as you configure it.",
            "Third-party media (optional): if you accept, we load Vimeo embeds to play showreel and project videos. Vimeo may set its own cookies according to its policy: https://vimeo.com/privacy",
            "We do not use our own advertising or analytics cookies on this site.",
          ],
          es: [
            "Esenciales / técnicas: preferencia de idioma y elección de consentimiento de cookies (almacenadas en el local storage del navegador). Son necesarias para que el sitio funcione según tu configuración.",
            "Medios de terceros (opcionales): si aceptas, cargamos embeds de Vimeo para reproducir el showreel y los vídeos de proyectos. Vimeo puede instalar sus propias cookies según su política: https://vimeo.com/privacy",
            "No utilizamos cookies propias de publicidad ni de analítica en este sitio.",
          ],
          ca: [
            "Essencials / tècniques: preferència d'idioma i elecció de consentiment de galetes (desades al local storage del navegador). Són necessàries perquè el lloc funcioni segons la teva configuració.",
            "Mitjans de tercers (opcionals): si acceptes, carreguem embeds de Vimeo per reproduir el showreel i els vídeos de projectes. Vimeo pot instal·lar les seves pròpies galetes segons la seva política: https://vimeo.com/privacy",
            "No utilitzem galetes pròpies de publicitat ni d'analítica en aquest lloc.",
          ],
        },
      },
      {
        heading: {
          en: "3. Managing consent",
          es: "3. Gestión del consentimiento",
          ca: "3. Gestió del consentiment",
        },
        body: {
          en: [
            "On your first visit you can accept or reject optional cookies via the banner. You can change your choice later with the “Cookie settings” link in the footer.",
            "If you reject optional cookies, project videos stay as static images/posters until you accept.",
            "You can also delete cookies and site data from your browser settings.",
          ],
          es: [
            "En tu primera visita puedes aceptar o rechazar las cookies opcionales desde el banner. Puedes cambiar tu elección más tarde con el enlace “Configuración de cookies” del pie de página.",
            "Si rechazas las cookies opcionales, los vídeos de proyectos se muestran como imágenes/pósters hasta que aceptes.",
            "También puedes eliminar cookies y datos del sitio desde la configuración de tu navegador.",
          ],
          ca: [
            "En la teva primera visita pots acceptar o rebutjar les galetes opcionals des del bàner. Pots canviar l'elecció més tard amb l'enllaç “Configuració de galetes” del peu de pàgina.",
            "Si rebutges les galetes opcionals, els vídeos de projectes es mostren com a imatges/pòsters fins que acceptis.",
            "També pots eliminar galetes i dades del lloc des de la configuració del navegador.",
          ],
        },
      },
      {
        heading: {
          en: "4. More information",
          es: "4. Más información",
          ca: "4. Més informació",
        },
        body: {
          en: [
            `For personal data processing see our Privacy policy. Contact: ${COMPANY.email}`,
          ],
          es: [
            `Para el tratamiento de datos personales consulta nuestra Política de privacidad. Contacto: ${COMPANY.email}`,
          ],
          ca: [
            `Per al tractament de dades personals consulta la nostra Política de privacitat. Contacte: ${COMPANY.email}`,
          ],
        },
      },
    ],
  },
};

export function isLegalSlug(value: string): value is LegalSlug {
  return (LEGAL_SLUGS as string[]).includes(value);
}
