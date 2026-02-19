"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { 
  Instagram, 
  Calendar, 
  MapPin, 
  Ticket, 
  ChevronDown,
  Sparkles,
  Theater,
  Film,
  Mic2,
  ArrowRight,
  Cookie
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Image from "next/image";

// --- Types ---
interface Show {
  id: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  title: string;
  ticketLink?: string;
  status?: "available" | "limited" | "soldout";
}

// --- Data ---
const shows: Show[] = [
  {
    id: "1",
    date: "21. Februar 2026",
    time: "20:00 Uhr",
    venue: "Kulturhalle Rödermark",
    city: "Rödermark",
    title: "Soloprogramm 'Geduldsproben'",
    ticketLink: "#kontakt",
    status: "limited"
  },
  {
    id: "2",
    date: "10. April 2026",
    time: "20:00 Uhr",
    venue: "Halle 10, CD-Kaserne",
    city: "Celle",
    title: "Soloprogramm 'Artgerecht'",
    ticketLink: "#kontakt",
    status: "available"
  },
  {
    id: "3",
    date: "11. April 2026",
    time: "20:00 Uhr",
    venue: "Gustav-Heinemann-Bürgerhaus",
    city: "Bremen",
    title: "Soloprogramm 'Geduldsproben'",
    ticketLink: "#kontakt",
    status: "available"
  },
  {
    id: "4",
    date: "16. April 2026",
    time: "20:00 Uhr",
    venue: "Kulturbahnhof",
    city: "Greifswald",
    title: "Soloprogramm 'Artgerecht'",
    ticketLink: "#kontakt",
    status: "available"
  }
];

const actingCredits = [
  {
    year: "2024",
    type: "Film",
    title: "Comedy Film",
    role: "Melinda",
    director: "Yasin Kamat"
  },
  {
    year: "2023",
    type: "Hörspiel",
    title: "Jim Knopf und Lukas der Lokomotivführer",
    role: "Erzähler",
    director: ""
  },
  {
    year: "2023",
    type: "Sketch",
    title: "Comedy Sketch Pantomime",
    role: "Freundin",
    director: ""
  },
  {
    year: "2022",
    type: "Theater",
    title: "Der Kuss der Spinnenfrau",
    role: "FAS",
    director: "Beka Bediana, Horizont Theater"
  },
  {
    year: "2022",
    type: "Theater",
    title: "Pulp Fiction",
    role: "Jules",
    director: "Beka Bediana, Horizont Theater"
  }
];

// --- Components ---

// Cookie Consent Component
function CookieConsent({ onAccept }: { onAccept: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("instagram-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("instagram-consent", "true");
    setIsVisible(false);
    onAccept();
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
    >
      <div className="glass rounded-2xl p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Cookie className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">Instagram Inhalte</h4>
            <p className="text-xs text-muted-foreground mb-4">
              Für die Anzeige des Instagram-Feeds benötigen wir Ihre Zustimmung. 
              Dabei werden Daten an Instagram übertragen.
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAccept} className="flex-1">
                Zustimmen
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsVisible(false)}>
                Ablehnen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Navigation
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? "glass rounded-full px-6 py-3" : ""
        }`}>
          <motion.a 
            href="#" 
            className="text-xl font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-gradient">Daphni</span>
          </motion.a>
          
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Über mich", href: "#about" },
              { label: "Shows", href: "#shows" },
              { label: "Schauspiel", href: "#acting" },
              { label: "Instagram", href: "#instagram" },
              { label: "Kontakt", href: "#contact" },
            ].map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <motion.a
            href="https://instagram.com/daphnigg"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const name = "DAPHNI";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
            Stand-up Comedienne & Schauspielerin
          </span>
          <Sparkles className="w-4 h-4 text-primary" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter mb-4 perspective-1000"
          style={{ perspective: 1000 }}
        >
          {name.split("").map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="inline-block text-gradient"
              style={{ 
                textShadow: "0 0 80px rgba(220, 38, 38, 0.3)",
                transformStyle: "preserve-3d"
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Jung, düster – und überraschend gnadenlos.
          <br />
          <span className="text-foreground">Genau dorthin, wo es weh tut.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#shows"
            className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Ticket className="w-5 h-5" />
              Tickets & Shows
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.a>
          
          <motion.a
            href="#about"
            className="px-8 py-4 glass rounded-full font-semibold hover:bg-white/5 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Mehr erfahren
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// About Section
function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div 
            style={{ y: imageY }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-3xl overflow-hidden"
            >
              <Image
                src="/daphni_portrait.png"
                alt="Daphni Georoglidis"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div
              className="absolute -top-8 -right-8 p-6 glass rounded-2xl"
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Mic2 className="w-8 h-8 text-primary" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -left-4 p-4 glass rounded-xl"
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Theater className="w-6 h-6 text-accent" />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div style={{ y: textY }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="outline" className="mb-6">
                <Sparkles className="w-3 h-3 mr-1" />
                Über mich
              </Badge>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                Wo Comedy auf
                <span className="text-gradient block">Schauspiel trifft</span>
              </h2>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Als Stand-up Comedienne und Schauspielerin aus Köln bewege ich mich 
                  zwischen den Welten – mal gnadenlos direkt auf der Comedy-Bühne, 
                  mal in verschiedenen Rollen auf Theater- und Filmsets.
                </p>
                <p>
                  Mein Stil? Dark Humor mit bösartigem Witz und entwaffnender Ehrlichkeit. 
                  Ich gehe dorthin, wo es weh tut – und verwandle das Unbequeme in 
                  überraschend befreiendes Lachen.
                </p>
                <p>
                  Nach meiner Ausbildung in der Meisner Technique und Workshops mit 
                  Lucy Russel stehe ich regelmäßig auf den Bühnen des Landes – vom 
                  Quatsch Comedy Club bis zum eigenen Soloprogramm.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                {["Stand-up Comedy", "Schauspiel", "Dark Humor", "Köln"].map((tag) => (
                  <span 
                    key={tag}
                    className="px-4 py-2 glass rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Shows Section
function ShowsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="shows" className="relative py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge variant="outline" className="mb-6">
            <Calendar className="w-3 h-3 mr-1" />
            Live Shows
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Kommende <span className="text-gradient">Auftritte</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Erlebe Dark Humor live – gnadenlos, direkt und unvergesslich.
          </p>
        </motion.div>

        <div className="space-y-4">
          {shows.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(show.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`
                relative group p-6 md:p-8 rounded-2xl transition-all duration-500
                ${hoveredId === show.id ? "glass glow-red" : "hover:glass"}
              `}>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Date */}
                  <div className="flex-shrink-0 w-32">
                    <div className="text-2xl font-bold text-gradient">{show.date.split(" ")[0]}</div>
                    <div className="text-sm text-muted-foreground">{show.date.split(" ").slice(1).join(" ")}</div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {show.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {show.venue}, {show.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {show.time}
                      </span>
                    </div>
                  </div>

                  {/* Status & CTA */}
                  <div className="flex items-center gap-4">
                    {show.status && (
                      <Badge 
                        variant={show.status === "soldout" ? "destructive" : "secondary"}
                        className={show.status === "limited" ? "bg-amber-500/20 text-amber-400 border-amber-500/50" : ""}
                      >
                        {show.status === "available" && "Verfügbar"}
                        {show.status === "limited" && "Wenige Tickets"}
                        {show.status === "soldout" && "Ausverkauft"}
                      </Badge>
                    )}
                    <motion.a
                      href={show.ticketLink}
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Ticket className="w-4 h-4" />
                      Tickets
                      <motion.span
                        animate={{ x: hoveredId === show.id ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </motion.a>
                  </div>
                </div>

                {/* Animated border */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: hoveredId === show.id ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Weitere Termine in Planung – folge mir auf Instagram für Updates!
          </p>
          <motion.a
            href="https://instagram.com/daphnigg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
            whileHover={{ x: 5 }}
          >
            <Instagram className="w-4 h-4" />
            @daphnigg
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// Instagram Section
function InstagramSection() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("instagram-consent");
    if (stored === "true") setConsent(true);
  }, []);

  const posts = [
    { id: "1", type: "video", caption: "Dark Humor at its finest 🕯️" },
    { id: "2", type: "image", caption: "Backstage Moments" },
    { id: "3", type: "video", caption: "Live aus Köln" },
    { id: "4", type: "image", caption: "Neues Programm" },
  ];

  return (
    <section id="instagram" className="relative py-32 overflow-hidden">
      <CookieConsent onAccept={() => setConsent(true)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-6">
            <Instagram className="w-3 h-3 mr-1" />
            Social Media
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Folge mir auf <span className="text-gradient">Instagram</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            @daphnigg • Behind the Scenes, Show-Highlights und mehr
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {consent ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {posts.map((post, index) => (
                <motion.a
                  key={post.id}
                  href="https://instagram.com/daphnigg"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden glass"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {post.type === "video" ? (
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                      </div>
                    ) : (
                      <Instagram className="w-8 h-8 text-white/50" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-sm text-white/90 line-clamp-2">{post.caption}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 glass rounded-3xl"
            >
              <Cookie className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-4">Instagram Inhalte</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Um Instagram-Inhalte anzuzeigen, benötigen wir Ihre Zustimmung. 
                Die Zustimmung können Sie unten rechts erteilen.
              </p>
              <Button onClick={() => {
                localStorage.setItem("instagram-consent", "true");
                setConsent(true);
              }}>
                <Cookie className="w-4 h-4 mr-2" />
                Jetzt zustimmen
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://instagram.com/daphnigg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full hover:bg-white/5 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Instagram className="w-5 h-5" />
            Alle Posts auf Instagram ansehen
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// Acting Section
function ActingSection() {
  return (
    <section id="acting" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge variant="outline" className="mb-6">
            <Film className="w-3 h-3 mr-1" />
            Schauspiel
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Film & <span className="text-gradient">Theater</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Neben der Comedy-Bühne begebe ich mich in verschiedene Rollen – 
            vom Theater bis zum Film.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actingCredits.map((credit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-6 glass rounded-2xl overflow-hidden"
            >
              <div className="flex items-start justify-between mb-4">
                <Badge variant="secondary" className="text-xs">
                  {credit.year}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {credit.type}
                </Badge>
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {credit.title}
              </h3>
              
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Rolle: <span className="text-foreground">{credit.role}</span></p>
                {credit.director && (
                  <p>Regie: {credit.director}</p>
                )}
              </div>

              {/* Hover Effect */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 glass rounded-3xl text-center"
        >
          <Theater className="w-12 h-12 mx-auto mb-4 text-accent" />
          <h3 className="text-2xl font-bold mb-4">Ausbildung</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="text-left p-4 rounded-xl bg-white/5">
              <div className="text-sm text-muted-foreground mb-1">2023</div>
              <div className="font-semibold">Acting Workshop</div>
              <div className="text-sm text-muted-foreground">mit Lucy Russel</div>
            </div>
            <div className="text-left p-4 rounded-xl bg-white/5">
              <div className="text-sm text-muted-foreground mb-1">2021</div>
              <div className="font-semibold">Meisner Technique</div>
              <div className="text-sm text-muted-foreground">mit Jerry Coyle</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Lass uns <span className="text-gradient">zusammenarbeiten</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Anfragen für Shows, Kooperationen oder Schauspielprojekte? 
            Schreib mir einfach auf Instagram!
          </p>

          <motion.a
            href="https://instagram.com/daphnigg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-full font-bold text-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(220, 38, 38, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="w-6 h-6" />
            Anfrage senden
          </motion.a>

          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Köln, Deutschland
            </span>
            <span className="flex items-center gap-2">
              <Mic2 className="w-4 h-4" />
              Stand-up Comedy
            </span>
            <span className="flex items-center gap-2">
              <Theater className="w-4 h-4" />
              Schauspiel
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gradient">Daphni</span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Daphni Georoglidis. 
            Stand-up Comedienne & Schauspielerin.
          </p>

          <div className="flex items-center gap-4">
            <motion.a
              href="https://instagram.com/daphnigg"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Instagram className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Main Page ---
export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ShowsSection />
      <ActingSection />
      <InstagramSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
