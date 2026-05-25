export type Member = {
  name: string;
  roles: string[];
  refs?: string;
  instagram?: string;
  linkedin?: string;
  imdb?: string;
  reel?: string;
};

export const TEAM: Member[] = [
  {
    name: "Júlia Bosch",
    roles: ["CREATIVE AND ART DIRECTOR"],
    refs: "Coca-Cola: Be Who You Are, League of Legends: Paranoia, Samsung Galaxy S25 Ultra, Pepsi - Where There’s A Ball There’s A Way",
    instagram: "@juliaboschart_",
    linkedin: "https://www.linkedin.com/in/j%C3%BAlia-bosch-hortal-17219b17b/",
    reel: "",
  },
  {
    name: "Noé Delaye",
    roles: ["CEO", "3D GENERALIST"],
    refs: "Pepsi Football Nation, CUPRA Tindaya Showcar, Subway Surfers City trailer, Modelo 77, SHISHEIDO Elixir",
    instagram: "@noe.dly",
    linkedin: "https://www.linkedin.com/in/no%C3%A9-delaye-su%C3%B1er-043229231/",
    reel: "",
  },
  {
    name: "Roger Piñol",
    roles: ["CG SUPERVISOR", "3D GENERALIST"],
    refs: "Magic: The Gathering, League of Legends: Paranoia, Subway Surfers City, Google Android XR: CES 2026, Netflix Bird Box Barcelona, Society of the Snow.",
    instagram: "@rogerpinol_",
    linkedin: "https://www.linkedin.com/in/rogerpinol",
    imdb: "https://www.imdb.com/name/nm13080324/",
    reel: "",
  },
  {
    name: "Carlos Yau",
    roles: ["VFX SUPERVISOR", "COMPOSITOR",  "HEAD OF VIRTUAL PROD"],
    refs: "Powerade FIFA World Cup, Oppo Reno 5 Commercial, Labyrinth - Kill For Your Love, Riders Republic _ win More Than Gold, Control Room",
    instagram: "@cyau49",
    linkedin: "https://www.linkedin.com/in/carlosyau/",
    reel: "",
  },
];
