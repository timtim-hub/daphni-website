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
  Heart,
  MessageCircle,
  Play,
  X,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

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
  likes: string;
  comments: number;
  date: string;
  color: string;
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
  { id: "1", type: "video", caption: "Dark Humor at its finest 🕯️ Wer kann relate?", likes: "2.847", comments: 156, date: "2 Tage", color: "from-rose-900/40 to-red-900/40" },
  { id: "2", type: "image", caption: "Backstage bei Echtzeit Comedy Köln 🎭", likes: "1.923", comments: 89, date: "5 Tage", color: "from-neutral-800 to-neutral-900" },
  { id: "3", type: "carousel", caption: "Swipe für mehr Chaos ➡️ Live aus dem Quatsch Comedy Club", likes: "3.421", comments: 234, date: "1 Woche", color: "from-red-900/30 to-rose-900/30" },
  { id: "4", type: "video", caption: "POV: Du fragst mich nach meinem Mental Health 🤡", likes: "5.623", comments: 445, date: "1 Woche", color: "from-amber-900/30 to-red-900/30" },
  { id: "5", type: "image", caption: "Neues Programm 'Artgerecht' - Bald in deiner Stadt! 📍", likes: "2.156", comments: 178, date: "2 Wochen", color: "from-neutral-800 to-stone-900" },
  { id: "6", type: "video", caption: "Die Insassen haben mich geliebt! #comedy", likes: "4.892", comments: 312, date: "2 Wochen", color: "from-red-900/40 to-rose-800/40" },
  { id: "7", type: "image", caption: "Sagt mir ich bin nicht die einzige...", likes: "3.678", comments: 267, date: "3 Wochen", color: "from-stone-900 to-neutral-900" },
  { id: "8", type: "video", caption: "Meine Zeit in der Psychiatrie 🏥✨", likes: "7.234", comments: 589, date: "3 Wochen", color: "from-rose-800/30 to-red-900/30" },
];

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

// --- Components ---

function CookieConsent({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("instagram-consent");
    if (consent === null) setIsVisible(true);
    else if (consent === "true") onAccept();
  }, []);

  const handleAccept = () => {
    localStorage.setItem("instagram-consent", "true");
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem("instagram-consent", "false");
    setIsVisible(false);
    onDecline();
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass rounded-2xl p-8 max-w-md w-full border border-white/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Cookie className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Cookie-Einstellungen</h3>
        </div>
        
        <div className="space-y-4 text-muted-foreground mb-8">
          <p>
            Diese Website verwendet Cookies und bindet Instagram-Inhalte ein. 
            Für die Anzeige von Instagram-Posts ist Ihre Zustimmung erforderlich.
          </p>
          <div className="p-4 rounded-xl bg-white/5 space-y-2">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-sm">Notwendige Cookies (immer aktiv)</span>
            </div>
            <div className="flex items-center gap-2">
              <Cookie className="w-4 h-4 text-primary" />
              <span className="text-sm">Instagram-Einbettung (optional)</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleDecline}
            className="flex-1"
          >
            Ablehnen
          </Button>
          <Button 
            onClick={handleAccept}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Akzeptieren
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          Weitere Informationen finden Sie in unserer{" "}
          <Link href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</Link>
        </p>
      </motion.div>
    </motion.div>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ["about", "shows", "acting", "instagram", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
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
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-gradient">Daphni</span>
              <span className="text-white/70 font-light"> Georoglidis</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Über mich", href: "#about" },
              { label: "Shows", href: "#shows" },
              { label: "Schauspiel", href: "#acting" },
              { label: "Instagram", href: "#instagram" },
              { label: "Kontakt", href: "#contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm transition-colors rounded-full ${
                  activeSection === item.href.replace("#", "") 
                    ? "text-white" 
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {activeSection === item.href.replace("#", "") && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>

          <Link
            href="https://instagram.com/daphnigg"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  
  const springConfig = { stiffness: 100, damping: 30 };
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-background to-neutral-950" />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
              <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                Stand-up Comedienne & Schauspielerin
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-2"
            >
              <span className="text-gradient">DAPHNI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl md:text-3xl text-white/80 font-light mb-8 tracking-wide"
            >
              Georoglidis
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Jung, düster – und überraschend gnadenlos.
              <br />
              <span className="text-primary">Genau dorthin, wo es weh tut.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="#shows"
                className="group px-8 py-4 bg-primary text-white rounded-full font-semibold transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
              >
                <span className="flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  Tickets & Shows
                </span>
              </Link>
              
              <Link
                href="#about"
                className="px-8 py-4 border border-white/10 rounded-full font-semibold hover:bg-white/5 transition-all"
              >
                Mehr erfahren
              </Link>
            </motion.div>
          </div>

          {/* Right - Portrait */}
          <motion.div 
            className="order-1 lg:order-2 relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <motion.div 
              className="relative w-full max-w-md aspect-square"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-red-900/30 rounded-full blur-[80px] scale-90" />
              
              {/* Image */}
              <div className="relative z-10 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                <Image
                  src="/daphni_portrait.png"
                  alt="Daphni Georoglidis"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>

              {/* Floating Tags */}
              <motion.div
                className="absolute -top-2 -right-2 z-20 px-4 py-2 glass rounded-full border border-primary/20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-sm font-medium text-primary">Dark Humor</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-2 z-20 px-4 py-2 glass rounded-full border border-white/10"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-sm font-medium text-white/80">Köln</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
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

function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const lineWidth = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"]);

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm">Über mich</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Wo Comedy auf <span className="text-gradient">Schauspiel trifft</span>
          </motion.h2>
          
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
            style={{ width: lineWidth }}
          />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8 text-center"
          >
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground leading-relaxed">
              Als <span className="text-white font-medium">Stand-up Comedienne</span> und{" "}
              <span className="text-white font-medium">Schauspielerin</span> aus Köln bewege ich mich 
              zwischen den Welten – mal gnadenlos direkt auf der Comedy-Bühne, 
              mal in verschiedenen Rollen auf Theater- und Filmsets.
            </motion.p>
            
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground leading-relaxed">
              Mein Stil? <span className="text-primary font-medium">Dark Humor</span> mit bösartigem Witz und entwaffnender Ehrlichkeit. 
              Ich gehe dorthin, wo es weh tut – und verwandle das Unbequeme in 
              überraschend befreiendes Lachen.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 pt-8">
              {["Stand-up Comedy", "Schauspiel", "Dark Humor", "Köln"].map((tag) => (
                <span 
                  key={tag}
                  className="px-5 py-2 glass rounded-full text-sm border border-white/5 hover:border-primary/30 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto"
            >
              {[
                { value: "5+", label: "Jahre Erfahrung" },
                { value: "100+", label: "Shows" },
                { value: "4K+", label: "Follower" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ShowsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="shows" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="space-y-4 max-w-4xl mx-auto">
          {shows.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(show.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`
                relative group p-6 md:p-8 rounded-2xl transition-all duration-300
                ${hoveredId === show.id ? "glass border-primary/20" : "hover:glass border-transparent"}
                border
              `}>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0 w-32">
                    <div className="text-3xl font-bold text-gradient">{show.date.split(" ")[0]}</div>
                    <div className="text-sm text-muted-foreground">{show.date.split(" ").slice(1).join(" ")}</div>
                  </div>

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

                  <div className="flex items-center gap-4">
                    {show.status && (
                      <Badge 
                        variant="secondary"
                        className={show.status === "limited" ? "bg-amber-500/10 text-amber-400 border-amber-500/30" : ""}
                      >
                        {show.status === "available" && "Verfügbar"}
                        {show.status === "limited" && "Wenige Tickets"}
                      </Badge>
                    )}
                    <Link
                      href={show.ticketLink || "#"}
                      className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Ticket className="w-4 h-4" />
                      Tickets
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ActingSection() {
  return (
    <section id="acting" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Film className="w-4 h-4 text-primary" />
            <span className="text-sm">Schauspiel</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Film & <span className="text-gradient">Theater</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Neben der Comedy-Bühne begebe ich mich in verschiedene Rollen.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actingCredits.map((credit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 glass rounded-2xl hover:border-primary/20 border border-transparent transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <Badge variant="secondary" className="text-xs bg-white/5">
                  {credit.year}
                </Badge>
                <Badge variant="outline" className="text-xs border-white/10">
                  {credit.type}
                </Badge>
              </div>
              
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                {credit.title}
              </h3>
              
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Rolle: <span className="text-white">{credit.role}</span></p>
                {credit.director && <p className="text-xs">{credit.director}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 glass rounded-2xl max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-bold mb-6 text-center">Ausbildung</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { year: "2023", title: "Acting Workshop", instructor: "mit Lucy Russel" },
              { year: "2021", title: "Meisner Technique", instructor: "mit Jerry Coyle" },
            ].map((edu, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5">
                <span className="text-sm text-primary font-medium">{edu.year}</span>
                <div className="font-medium mt-1">{edu.title}</div>
                <div className="text-sm text-muted-foreground">{edu.instructor}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InstagramSection() {
  const [consent, setConsent] = useState<boolean | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("instagram-consent");
    if (stored === "true") setConsent(true);
    else if (stored === "false") setConsent(false);
    else setShowBanner(true);
  }, []);

  const handleAccept = () => {
    setConsent(true);
    setShowBanner(false);
  };

  const handleDecline = () => {
    setConsent(false);
    setShowBanner(false);
  };

  const openSettings = () => {
    setShowBanner(true);
  };

  return (
    <section id="instagram" className="relative py-32 overflow-hidden">
      {showBanner && (
        <CookieConsent 
          onAccept={handleAccept} 
          onDecline={handleDecline}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Instagram className="w-4 h-4 text-primary" />
            <span className="text-sm">@daphnigg</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Folge mir auf <span className="text-gradient">Instagram</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground">
            Behind the Scenes, Show-Highlights und mehr
          </motion.p>
        </motion.div>

        {consent === true ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {instagramPosts.map((post, index) => (
              <motion.a
                key={post.id}
                href="https://instagram.com/daphnigg"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br"
                style={{ background: `linear-gradient(to bottom right, ${post.color})` }}
              >
                {/* Placeholder Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {post.type === "video" ? (
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                  ) : post.type === "carousel" ? (
                    <div className="grid grid-cols-2 gap-0.5 w-8 h-8">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white/30 rounded-sm" />
                      ))}
                    </div>
                  ) : (
                    <div className="text-4xl opacity-20">
                      {index % 3 === 0 ? "🎭" : index % 3 === 1 ? "✨" : "🎬"}
                    </div>
                  )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3">
                  <div className="flex items-center gap-4 text-white mb-2">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 fill-white" />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/70 text-center line-clamp-2">{post.caption}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        ) : consent === false ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 glass rounded-2xl border border-white/5"
          >
            <Instagram className="w-16 h-16 mx-auto mb-6 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold mb-4">Instagram-Inhalte</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Sie haben die Einbettung von Instagram-Inhalten abgelehnt. 
              Um die Posts zu sehen, akzeptieren Sie bitte die Cookies.
            </p>
            <Button onClick={openSettings} variant="outline">
              Cookie-Einstellungen ändern
            </Button>
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <div className="animate-pulse text-muted-foreground">Warte auf Cookie-Entscheidung...</div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="https://instagram.com/daphnigg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full hover:bg-white/5 transition-colors border border-white/5"
          >
            <Instagram className="w-5 h-5" />
            Alle Posts auf Instagram ansehen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Lass uns <span className="text-gradient">zusammenarbeiten</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Anfragen für Shows, Kooperationen oder Schauspielprojekte? 
            Schreib mir einfach auf Instagram!
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Link
              href="https://instagram.com/daphnigg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-colors"
            >
              <Instagram className="w-6 h-6" />
              Anfrage senden
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              <span className="text-gradient">Daphni</span>
              <span className="text-white/60 font-light"> Georoglidis</span>
            </span>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Daphni Georoglidis
          </p>
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
