export const site = {
  name: "Daphni Georoglidis",
  firstName: "Daphni",
  lastName: "Georoglidis",
  roles: ["Stand-up Comedienne", "Schauspielerin"],
  tagline: ["Düster.", "Gnadenlos.", "Komisch."],
  instagram: "https://instagram.com/daphni.comedy",
  instagramHandle: "@daphni.comedy",
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

// Real, current posts from @daphni.comedy (pulled from her live profile) —
// only loaded after explicit consent (DSGVO). Most recent first.
export const instagramPosts = [
  { id: "DY12eX3M0nx", embedUrl: "https://www.instagram.com/p/DY12eX3M0nx/embed" },
  { id: "DYo7JgAMzj6", embedUrl: "https://www.instagram.com/p/DYo7JgAMzj6/embed" },
  { id: "DYUMvOqNx30", embedUrl: "https://www.instagram.com/p/DYUMvOqNx30/embed" },
  { id: "DYEmXjYslDq", embedUrl: "https://www.instagram.com/p/DYEmXjYslDq/embed" },
  { id: "DX4LxsOsNBc", embedUrl: "https://www.instagram.com/p/DX4LxsOsNBc/embed" },
  { id: "DXyjqfLsO4m", embedUrl: "https://www.instagram.com/p/DXyjqfLsO4m/embed" },
  { id: "DXmDVwnjO-h", embedUrl: "https://www.instagram.com/p/DXmDVwnjO-h/embed" },
  { id: "DWHMro9jJKQ", embedUrl: "https://www.instagram.com/p/DWHMro9jJKQ/embed" },
  { id: "DIgLOCAs7jJ", embedUrl: "https://www.instagram.com/p/DIgLOCAs7jJ/embed" },
] as const;
