"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
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
  Cookie,
  Star,
  Zap,
  Flame,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Play,
  Pause,
  Volume2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

interface InstagramPost {
  id: string;
  type: "image" | "video" | "carousel";
  caption: string;
  likes: number;
  comments: number;
  date: string;
  aspectRatio: "square" | "portrait" | "landscape";
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
  { year: "2024", type: "Film", title: "Comedy Film", role: "Melinda", director: "Yasin Kamat" },
  { year: "2023", type: "Hörspiel", title: "Jim Knopf und Lukas", role: "Erzähler", director: "" },
  { year: "2023", type: "Sketch", title: "Comedy Sketch Pantomime", role: "Freundin", director: "" },
  { year: "2022", type: "Theater", title: "Der Kuss der Spinnenfrau", role: "FAS", director: "Beka Bediana" },
  { year: "2022", type: "Theater", title: "Pulp Fiction", role: "Jules", director: "Beka Bediana" }
];

const instagramPosts: InstagramPost[] = [
  { id: "1", type: "video", caption: "Dark Humor at its finest 🕯️ Wer kann relate?", likes: 2847, comments: 156, date: "2 Tage", aspectRatio: "portrait" },
  { id: "2", type: "image", caption: "Backstage bei Echtzeit Comedy Köln 🎭", likes: 1923, comments: 89, date: "5 Tage", aspectRatio: "square" },
  { id: "3", type: "carousel", caption: "Swipe für mehr Chaos ➡️ Live aus dem Quatsch Comedy Club", likes: 3421, comments: 234, date: "1 Woche", aspectRatio: "square" },
  { id: "4", type: "video", caption: "POV: Du fragst mich nach meinem Menthal Health 🤡", likes: 5623, comments: 445, date: "1 Woche", aspectRatio: "portrait" },
  { id: "5", type: "image", caption: "Neues Programm 'Artgerecht' - Bald in deiner Stadt! 📍", likes: 2156, comments: 178, date: "2 Wochen", aspectRatio: "square" },
  { id: "6", type: "video", caption: "Die Insassen haben mich geliebt! #comedy", likes: 4892, comments: 312, date: "2 Wochen", aspectRatio: "portrait" },
  { id: "7", type: "image", caption: "Sagt mir ich bin nicht die einzige...", likes: 3678, comments: 267, date: "3 Wochen", aspectRatio: "square" },
  { id: "8", type: "video", caption: "Meine Zeit in der Psychiatrie 🏥✨", likes: 7234, comments: 589, date: "3 Wochen", aspectRatio: "portrait" },
];

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
};

// --- Components ---

function CookieConsent({ onAccept }: { onAccept: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("instagram-consent");
    if (!consent) setIsVisible(true);
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
      <div className="glass rounded-2xl p-6 shadow-2xl border border-white/10">
        <div className="flex items-start gap-4">
          <motion.div 
            className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Cookie className="w-5 h-5 text-white" />
          </motion.div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">Instagram Inhalte</h4>
            <p className="text-xs text-muted-foreground mb-4">
              Für die Anzeige des Instagram-Feeds benötigen wir Ihre Zustimmung. 
              Dabei werden Daten an Instagram übertragen.
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAccept} className="flex-1 bg-gradient-to-r from-primary to-accent">
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

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      
      const sections = ["about", "shows", "acting", "instagram", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "glass rounded-full px-6 py-3" : ""
          }`}
        >
          <motion.a href="#" className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-gradient">Daphni</span>
              <span className="text-white/80 font-normal"> Georoglidis</span>
            </span>
          </motion.a>
          
          <div className="hidden md:flex items-center gap-1">
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
                className={`relative px-4 py-2 text-sm transition-colors rounded-full ${
                  activeSection === item.href.replace("#", "") 
                    ? "text-white" 
                    : "text-muted-foreground hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeSection === item.href.replace("#", "") && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.a>
            ))}
          </div>

          <motion.a
            href="https://instagram.com/daphnigg"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white/5 transition-colors relative group"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="w-5 h-5" />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.a>
        </motion.div>
      </div>
    </motion.nav>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, 100]);
  
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const name = "DAPHNI";
  const springConfig = { stiffness: 100, damping: 10 };
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 50);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 50);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden noise-overlay" onMouseMove={handleMouseMove}>
      <FloatingParticles />
      
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px]"
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.3, 0.5, 0.3], y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[200px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Grid Pattern */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{ y: useTransform(scrollY, [0, 500], [0, 100]) }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </motion.div>

      <motion.div style={{ opacity, y }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Pre-title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
                Stand-up Comedienne & Schauspielerin
              </span>
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-accent" />
              </motion.div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4"
              style={{ perspective: 1000 }}
            >
              {name.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  className="inline-block text-gradient"
                  style={{ textShadow: "0 0 80px rgba(220, 38, 38, 0.4)" }}
                  whileHover={{ 
                    scale: 1.2, 
                    rotateY: 20,
                    color: "#7c3aed",
                    transition: { duration: 0.2 }
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mb-8"
            >
              <p className="text-2xl md:text-3xl text-white/90 font-light mb-2">
                Georoglidis
              </p>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Jung, düster – und überraschend gnadenlos.
                <br />
                <span className="text-primary font-semibold">Genau dorthin, wo es weh tut.</span>
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10"
            >
              {[
                { icon: Mic2, label: "Stand-up", value: "Comedy" },
                { icon: Theater, label: "Schauspiel", value: "Film & Bühne" },
                { icon: MapPin, label: "Based in", value: "Köln" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05, color: "#fff" }}
                >
                  <stat.icon className="w-4 h-4 text-primary" />
                  <span>{stat.label}:</span>
                  <span className="text-white font-medium">{stat.value}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <motion.a
                href="#shows"
                className="group relative px-8 py-4 bg-gradient-to-r from-primary to-red-700 text-white rounded-full font-bold overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(220, 38, 38, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  Tickets & Shows
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent to-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.a>
              
              <motion.a
                href="#about"
                className="px-8 py-4 glass rounded-full font-semibold hover:bg-white/10 transition-all border border-white/10"
                whileHover={{ scale: 1.05, borderColor: "rgba(220, 38, 38, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                Mehr erfahren
              </motion.a>
            </motion.div>
          </div>

          {/* Right - Portrait Image */}
          <motion.div 
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow Effect Behind Image */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/40 via-accent/40 to-primary/40 rounded-3xl blur-[80px]"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Main Image Container */}
              <motion.div
                className="relative z-10 rounded-3xl overflow-hidden"
                style={{
                  rotateX: useSpring(useTransform(mouseY, [-10, 10], [5, -5]), springConfig),
                  rotateY: useSpring(useTransform(mouseX, [-10, 10], [-5, 5]), springConfig),
                }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="/daphni_portrait.png"
                  alt="Daphni Georoglidis"
                  width={600}
                  height={600}
                  className="object-cover"
                  priority
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                
                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-white/10"
                  animate={{ 
                    borderColor: ["rgba(255,255,255,0.1)", "rgba(220,38,38,0.3)", "rgba(124,58,237,0.3)", "rgba(255,255,255,0.1)"]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>

              {/* Floating Badges */}
              <motion.div
                className="absolute -top-4 -right-4 z-20 px-4 py-2 glass rounded-full border border-primary/30"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-sm font-bold text-primary flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  Dark Humor
                </span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 z-20 px-4 py-2 glass rounded-full border border-accent/30"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-sm font-bold text-accent flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Köln
                </span>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 z-20 p-3 glass rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-5 h-5 text-yellow-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
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
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
          >
            <motion.div
              className="w-1.5 h-3 bg-primary rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const lineWidth = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"]);

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]"
        style={{ y: imageY }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm">Über mich</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Wo Comedy auf <span className="text-gradient">Schauspiel trifft</span>
          </h2>
          <motion.div 
            className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mt-6 mx-auto"
            style={{ width: lineWidth }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <motion.div style={{ y: imageY }} className="relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              className="relative"
            >
              {/* Decorative Frame */}
              <motion.div
                className="absolute -inset-4 border-2 border-dashed border-white/10 rounded-3xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                <Image
                  src="/daphni_portrait.png"
                  alt="Daphni Georoglidis Portrait"
                  fill
                  className="object-cover"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-accent/30"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>

              {/* Floating Icons */}
              <motion.div
                className="absolute -top-6 -right-6 p-4 glass rounded-2xl border border-primary/20"
                animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Mic2 className="w-8 h-8 text-primary" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-6 -left-6 p-4 glass rounded-2xl border border-accent/20"
                animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <Theater className="w-8 h-8 text-accent" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 p-3 glass rounded-xl"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <Star className="w-6 h-6 text-yellow-400" />
              </motion.div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div 
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {[
                { label: "Jahre Erfahrung", value: "5+" },
                { label: "Shows", value: "100+" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="glass px-6 py-4 rounded-2xl text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div style={{ y: textY }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed mb-6">
                Als <span className="text-white font-semibold">Stand-up Comedienne</span> und{" "}
                <span className="text-white font-semibold">Schauspielerin</span> aus Köln bewege ich mich 
                zwischen den Welten – mal gnadenlos direkt auf der Comedy-Bühne, 
                mal in verschiedenen Rollen auf Theater- und Filmsets.
              </motion.p>
              
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed mb-6">
                Mein Stil? <span className="text-primary font-semibold">Dark Humor</span> mit bösartigem Witz und entwaffnender Ehrlichkeit. 
                Ich gehe dorthin, wo es weh tut – und verwandle das Unbequeme in 
                überraschend befreiendes Lachen.
              </motion.p>
              
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed mb-8">
                Nach meiner Ausbildung in der <span className="text-accent font-semibold">Meisner Technique</span> und Workshops mit 
                Lucy Russel stehe ich regelmäßig auf den Bühnen des Landes.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                {["Stand-up Comedy", "Schauspiel", "Dark Humor", "Köln", "Deutschland"].map((tag, i) => (
                  <motion.span 
                    key={tag}
                    className="px-4 py-2 glass rounded-full text-sm border border-white/5 hover:border-primary/50 transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(220, 38, 38, 0.1)" }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ShowsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="shows" ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
        style={{ y: backgroundY }}
      />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 text-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <Ticket className="w-32 h-32" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-10 text-accent/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <Calendar className="w-24 h-24" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm">Live Shows</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Kommende <span className="text-gradient">Auftritte</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Erlebe Dark Humor live – gnadenlos, direkt und unvergesslich.
          </motion.p>
        </motion.div>

        {/* Shows List */}
        <div className="space-y-4">
          {shows.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredId(show.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div 
                className={`
                  relative group p-6 md:p-8 rounded-2xl transition-all duration-500 overflow-hidden
                  ${hoveredId === show.id ? "glass" : "hover:glass"}
                `}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Hover Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={hoveredId === show.id ? { opacity: 1 } : { opacity: 0 }}
                />

                <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                  {/* Date */}
                  <motion.div 
                    className="flex-shrink-0 w-36"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-3xl font-black text-gradient">{show.date.split(" ")[0]}</div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wider">{show.date.split(" ").slice(1).join(" ")}</div>
                  </motion.div>

                  {/* Info */}
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors"
                    >
                      {show.title}
                    </motion.h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <motion.span 
                        className="flex items-center gap-1"
                        whileHover={{ color: "#fff" }}
                      >
                        <MapPin className="w-4 h-4" />
                        {show.venue}, {show.city}
                      </motion.span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {show.time}
                      </span>
                    </div>
                  </div>

                  {/* Status & CTA */}
                  <div className="flex items-center gap-4">
                    {show.status && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Badge 
                          variant={show.status === "soldout" ? "destructive" : "secondary"}
                          className={show.status === "limited" ? "bg-amber-500/20 text-amber-400 border-amber-500/50" : ""}
                        >
                          {show.status === "available" && "Verfügbar"}
                          {show.status === "limited" && "Wenige Tickets"}
                          {show.status === "soldout" && "Ausverkauft"}
                        </Badge>
                      </motion.div>
                    )}
                    <motion.a
                      href={show.ticketLink}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-red-700 text-white rounded-full font-semibold relative overflow-hidden group/btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Ticket className="w-4 h-4" />
                      <span>Tickets</span>
                      <motion.span
                        animate={{ x: hoveredId === show.id ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.a>
                  </div>
                </div>

                {/* Animated Border Bottom */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: hoveredId === show.id ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Weitere Termine in Planung – folge mir auf Instagram für Updates!
          </p>
          <motion.a
            href="https://instagram.com/daphnigg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
            whileHover={{ scale: 1.05, x: 5 }}
          >
            <Instagram className="w-5 h-5" />
            @daphnigg
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function ActingSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="acting" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <motion.div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]"
        style={{ x }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Film className="w-4 h-4 text-accent" />
            <span className="text-sm">Schauspiel</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Film & <span className="text-gradient">Theater</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Neben der Comedy-Bühne begebe ich mich in verschiedene Rollen – 
            vom Theater bis zum Film.
          </motion.p>
        </motion.div>

        {/* Credits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {actingCredits.map((credit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                y: -10, 
                rotateY: 5,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative p-6 glass rounded-2xl overflow-hidden cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Hover Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <Badge variant="secondary" className="text-xs bg-white/5">
                      {credit.year}
                    </Badge>
                  </motion.div>
                  <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                    {credit.type}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {credit.title}
                </h3>
                
                <div className="space-y-1 text-sm text-muted-foreground">
                  <motion.p whileHover={{ x: 5, color: "#fff" }} className="transition-colors">
                    Rolle: <span className="text-white font-medium">{credit.role}</span>
                  </motion.p>
                  {credit.director && (
                    <p className="text-xs">{credit.director}</p>
                  )}
                </div>
              </div>

              {/* Bottom Line Animation */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-primary"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 glass rounded-3xl overflow-hidden"
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
          />
          
          <div className="relative text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary mb-6"
            >
              <Theater className="w-8 h-8 text-white" />
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-8">Ausbildung</h3>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                { year: "2023", title: "Acting Workshop", instructor: "mit Lucy Russel", icon: Star },
                { year: "2021", title: "Meisner Technique", instructor: "mit Jerry Coyle", icon: Zap },
              ].map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <edu.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <span className="text-sm text-primary font-semibold">{edu.year}</span>
                  </div>
                  <div className="font-semibold text-lg">{edu.title}</div>
                  <div className="text-sm text-muted-foreground">{edu.instructor}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InstagramSection() {
  const [consent, setConsent] = useState(false);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("instagram-consent");
    if (stored === "true") setConsent(true);
  }, []);

  return (
    <section id="instagram" className="relative py-32 overflow-hidden">
      <CookieConsent onAccept={() => setConsent(true)} />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Instagram className="w-4 h-4 text-pink-400" />
            <span className="text-sm">@daphnigg</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Folge mir auf <span className="text-gradient">Instagram</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground">
            Behind the Scenes, Show-Highlights und mehr
          </motion.p>
        </motion.div>

        <AnimatePresence mode="wait">
          {consent ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
            >
              {instagramPosts.map((post, index) => (
                <motion.a
                  key={post.id}
                  href="https://instagram.com/daphnigg"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  className="group relative aspect-square rounded-lg overflow-hidden bg-neutral-900 cursor-pointer"
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                  whileHover={{ scale: 1.03, zIndex: 10 }}
                >
                  {/* Placeholder Image with Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900">
                    {/* Content Type Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {post.type === "video" ? (
                        <motion.div 
                          className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm"
                          whileHover={{ scale: 1.2 }}
                        >
                          <Play className="w-8 h-8 text-white fill-white ml-1" />
                        </motion.div>
                      ) : post.type === "carousel" ? (
                        <div className="grid grid-cols-2 gap-1 w-16 h-16">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white/20 rounded-sm" />
                          ))}
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-6xl opacity-20">
                            {index % 3 === 0 ? "🎭" : index % 3 === 1 ? "😂" : "🎬"}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Top Right Indicators */}
                  <div className="absolute top-2 right-2 flex gap-1">
                    {post.type === "carousel" && (
                      <div className="p-1 bg-black/50 rounded">
                        <div className="grid grid-cols-2 gap-px w-3 h-3">
                          <div className="bg-white rounded-sm" />
                          <div className="bg-white rounded-sm" />
                          <div className="bg-white rounded-sm" />
                          <div className="bg-white rounded-sm" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredPost === post.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4 text-white mb-3">
                      <div className="flex items-center gap-1">
                        <Heart className="w-5 h-5 fill-white" />
                        <span className="font-semibold">{post.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-semibold">{post.comments}</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/80 text-center line-clamp-2">{post.caption}</p>
                    <p className="text-xs text-white/50 mt-2">{post.date}</p>
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20 glass rounded-3xl border border-white/10"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                <Cookie className="w-20 h-20 mx-auto mb-6 text-muted-foreground" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Instagram Inhalte</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Um Instagram-Inhalte anzuzeigen, benötigen wir Ihre Zustimmung.
              </p>
              <Button 
                onClick={() => {
                  localStorage.setItem("instagram-consent", "true");
                  setConsent(true);
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <Cookie className="w-4 h-4 mr-2" />
                Jetzt zustimmen
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://instagram.com/daphnigg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full hover:bg-white/5 transition-colors border border-white/10 hover:border-pink-500/50"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="w-5 h-5" />
            Alle Posts auf Instagram ansehen
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
      
      <motion.div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[150px]"
        animate={{ scale: [1.2, 1, 1.2], y: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm">Kontakt</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Lass uns <span className="text-gradient">zusammenarbeiten</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Anfragen für Shows, Kooperationen oder Schauspielprojekte? 
            Schreib mir einfach auf Instagram!
          </motion.p>

          <motion.div variants={fadeInUp}>
            <motion.a
              href="https://instagram.com/daphnigg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary via-red-600 to-primary rounded-full font-bold text-lg relative overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(220, 38, 38, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <span className="relative z-10 flex items-center gap-3">
                <Instagram className="w-6 h-6" />
                Anfrage senden
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
            </motion.a>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            {[
              { icon: MapPin, label: "Köln, Deutschland" },
              { icon: Mic2, label: "Stand-up Comedy" },
              { icon: Theater, label: "Schauspiel" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2"
                whileHover={{ scale: 1.1, color: "#fff" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              <span className="text-gradient">Daphni</span>
              <span className="text-white/60 font-light"> Georoglidis</span>
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Daphni Georoglidis. 
            Stand-up Comedienne & Schauspielerin.
          </p>

          <motion.a
            href="https://instagram.com/daphnigg"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Instagram className="w-5 h-5" />
          </motion.a>
        </motion.div>
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
