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

// Reels from @daphni.comedy — downloaded and self-hosted (no Instagram iframe,
// no third-party request on load). `href` links back to the original post.
export interface Reel {
  id: string;
  src: string;
  poster: string;
  href: string;
}

export const featuredReel: Reel = {
  id: "DY12eX3M0nx",
  src: "/media/reels/DY12eX3M0nx.mp4",
  poster: "/media/reels/DY12eX3M0nx.jpg",
  href: "https://www.instagram.com/p/DY12eX3M0nx/",
};

export const reels: Reel[] = [
  "DYo7JgAMzj6",
  "DYUMvOqNx30",
  "DYEmXjYslDq",
  "DX4LxsOsNBc",
  "DXyjqfLsO4m",
  "DXmDVwnjO-h",
  "DWHMro9jJKQ",
].map((id) => ({
  id,
  src: `/media/reels/${id}.mp4`,
  poster: `/media/reels/${id}.jpg`,
  href: `https://www.instagram.com/p/${id}/`,
}));
