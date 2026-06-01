export const site = {
  name: "Daphni Georoglidis",
  firstName: "Daphni",
  lastName: "Georoglidis",
  roles: ["Stand-up Comedienne", "Schauspielerin"],
  tagline: ["Düster.", "Gnadenlos.", "Komisch."],
  instagram: "https://instagram.com/daphnigg",
  instagramHandle: "@daphnigg",
  email: "kontakt@daphni-georoglidis.de",
  city: "Köln",
} as const;

export const acting = [
  { year: "2024", type: "Film", title: "Comedy Film", role: "Melinda", director: "Yasin Kamat" },
  { year: "2023", type: "Hörspiel", title: "Jim Knopf und Lukas", role: "Erzähler", director: "" },
  { year: "2023", type: "Sketch", title: "Comedy Sketch Pantomime", role: "Freundin", director: "" },
  { year: "2022", type: "Theater", title: "Der Kuss der Spinnenfrau", role: "FAS", director: "Beka Bediana" },
  { year: "2022", type: "Theater", title: "Pulp Fiction", role: "Jules", director: "Beka Bediana" },
] as const;

export const training = [
  { year: "2023", title: "Acting Workshop", instructor: "Lucy Russel" },
  { year: "2021", title: "Meisner Technique", instructor: "Jerry Coyle" },
] as const;

// Real posts from @daphnigg — only loaded after explicit consent.
export const instagramPosts = [
  { id: "DIgLOCAs7jJ", embedUrl: "https://www.instagram.com/p/DIgLOCAs7jJ/embed" },
  { id: "DUV0PqfjMcX", embedUrl: "https://www.instagram.com/p/DUV0PqfjMcX/embed" },
  { id: "DUOIoE2jCgd", embedUrl: "https://www.instagram.com/p/DUOIoE2jCgd/embed" },
  { id: "DUD0_OLjOBO", embedUrl: "https://www.instagram.com/p/DUD0_OLjOBO/embed" },
  { id: "DT-1SZRDFFE", embedUrl: "https://www.instagram.com/p/DT-1SZRDFFE/embed" },
  { id: "DTs09NLDPX9", embedUrl: "https://www.instagram.com/p/DTs09NLDPX9/embed" },
] as const;
