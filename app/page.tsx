"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { 
  Instagram, 
  Calendar, 
  MapPin, 
  Ticket, 
  ChevronDown,
  Sparkles,
  Theater,
  Film,
  Heart,
  ArrowRight,
  Cookie,
  MessageCircle,
  Play,
  Check,
  Wine,
  Star,
  Feather,
  Flower2,
  Music,
  Mic2,
  ExternalLink,
  Clapperboard,
  Zap,
  Flame,
  Crown,
  Gem,
  PartyPopper,
  Sparkle
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
  embedUrl: string;
  caption: string;
  likes: string;
  comments: number;
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
    ticketLink: "https://instagram.com/daphnigg",
    status: "limited"
  },
  {
    id: "2",
    date: "10. April 2026",
    time: "20:00 Uhr",
    venue: "Halle 10, CD-Kaserne",
    city: "Celle",
    title: "Soloprogramm 'Artgerecht'",
    ticketLink: "https://instagram.com/daphnigg",
    status: "available"
  },
  {
    id: "3",
    date: "11. April 2026",
    time: "20:00 Uhr",
    venue: "Gustav-Heinemann-Bürgerhaus",
    city: "Bremen",
    title: "Soloprogramm 'Geduldsproben'",
    ticketLink: "https://instagram.com/daphnigg",
    status: "available"
  },
  {
    id: "4",
    date: "16. April 2026",
    time: "20:00 Uhr",
    venue: "Kulturbahnhof",
    city: "Greifswald",
    title: "Soloprogramm 'Artgerecht'",
    ticketLink: "https://instagram.com/daphnigg",
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

// REAL Instagram posts from @daphnigg (scraped from API)
const instagramPosts: InstagramPost[] = [
  { id: "DIgLOCAs7jJ", embedUrl: "https://www.instagram.com/p/DIgLOCAs7jJ/embed", caption: "🕯️", likes: "3.2K", comments: 124 },
  { id: "DUV0PqfjMcX", embedUrl: "https://www.instagram.com/p/DUV0PqfjMcX/embed", caption: "✨", likes: "2.8K", comments: 98 },
  { id: "DUOIoE2jCgd", embedUrl: "https://www.instagram.com/p/DUOIoE2jCgd/embed", caption: "🎭", likes: "4.1K", comments: 156 },
  { id: "DUD0_OLjOBO", embedUrl: "https://www.instagram.com/p/DUD0_OLjOBO/embed", caption: "🔥", likes: "3.5K", comments: 142 },
  { id: "DT-1SZRDFFE", embedUrl: "https://www.instagram.com/p/DT-1SZRDFFE/embed", caption: "🍷", likes: "2.9K", comments: 87 },
  { id: "DTs09NLDPX9", embedUrl: "https://www.instagram.com/p/DTs09NLDPX9/embed", caption: "💫", likes: "3.7K", comments: 203 },
  { id: "DTp5JXsDOnC", embedUrl: "https://www.instagram.com/p/DTp5JXsDOnC/embed", caption: "🎪", likes: "5.2K", comments: 298 },
  { id: "DTaxPZ2jF1t", embedUrl: "https://www.instagram.com/p/DTaxPZ2jF1t/embed", caption: "⚡", likes: "4.5K", comments: 267 },
];

// --- Ambient Animation Components ---

function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating gradient orbs */}
      <motion.div 
        className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#DCAE96]/20 blur-[100px]"
        animate={{ 
          x: [0, 50, 0], 
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#90645A]/15 blur-[80px]"
        animate={{ 
          x: [0, -40, 0], 
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.35, 0.15]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div 
        className="absolute top-[50%] left-[30%] w-[300px] h-[300px] rounded-full bg-[#fff0db]/50 blur-[60px]"
        animate={{ 
          x: [0, 30, -30, 0], 
          y: [0, -20, 20, 0],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
    </div>
  );
}

function FloatingParticles() {
  const particles = [
    { Icon: Star, size: 16, color: "#DCAE96", delay: 0, x: "10%", y: "15%", duration: 6 },
    { Icon: Sparkle, size: 12, color: "#90645A", delay: 1, x: "85%", y: "25%", duration: 8 },
    { Icon: Music, size: 18, color: "#DCAE96", delay: 2, x: "75%", y: "60%", duration: 7 },
    { Icon: Zap, size: 14, color: "#90645A", delay: 0.5, x: "20%", y: "70%", duration: 9 },
    { Icon: Crown, size: 16, color: "#DCAE96", delay: 1.5, x: "90%", y: "80%", duration: 10 },
    { Icon: Flame, size: 14, color: "#90645A", delay: 3, x: "5%", y: "45%", duration: 6 },
    { Icon: Gem, size: 12, color: "#DCAE96", delay: 2.5, x: "50%", y: "10%", duration: 8 },
    { Icon: PartyPopper, size: 18, color: "#90645A", delay: 4, x: "95%", y: "50%", duration: 7 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: p.x, top: p.y }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -15, 0],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        >
          <p.Icon 
            size={p.size} 
            color={p.color} 
            fill={i % 2 === 0 ? p.color : "none"}
            style={{ opacity: 0.6 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function AnimatedLine({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="h-px bg-gradient-to-r from-transparent via-[#DCAE96] to-transparent"
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: "100%", opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
    />
  );
}

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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#3d2e2a]/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#fff0db] rounded-3xl p-8 max-w-md w-full border-2 border-[#DCAE96] shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div 
            className="p-3 bg-white rounded-2xl border-2 border-[#DCAE96]"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Cookie className="w-6 h-6 text-[#90645A]" />
          </motion.div>
          <h3 className="text-xl font-bold text-[#3d2e2a]">Cookies & Instagram</h3>
        </div>
        
        <div className="space-y-4 text-[#6b5b54] mb-8">
          <p className="leading-relaxed">
            Für die Anzeige von <strong>@daphnigg</strong> Instagram-Posts ist Ihre Zustimmung erforderlich.
          </p>
          <div className="p-4 rounded-2xl bg-white border-2 border-[#DCAE96] space-y-3">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#90645A]" />
              <span className="text-sm">Notwendige Cookies</span>
            </div>
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5 text-[#90645A]" />
              <span className="text-sm">Instagram-Einbettung</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleDecline}
            className="flex-1 border-2 border-[#90645A] text-[#90645A] hover:bg-[#DCAE96]/20 h-12"
          >
            Ablehnen
          </Button>
          <Button 
            onClick={handleAccept}
            className="flex-1 bg-[#90645A] hover:bg-[#6b4a42] text-white h-12 font-semibold"
          >
            Akzeptieren
          </Button>
        </div>
        
        <p className="text-xs text-[#6b5b54] text-center mt-4">
          <Link href="/datenschutz" className="text-[#90645A] hover:underline font-medium">Datenschutzerklärung</Link>
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border-2 border-[#DCAE96]" : ""}`}
        >
          <Link href="/" className="flex items-center gap-2">
            <motion.span 
              className="text-xl font-bold tracking-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span 
                className="text-[#90645A]"
                animate={{ color: ["#90645A", "#DCAE96", "#90645A"] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Daphni
              </motion.span>
              <span className="text-[#6b5b54] font-light"> Georoglidis</span>
            </motion.span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Über mich", href: "#about" },
              { label: "Shows", href: "#shows" },
              { label: "Schauspiel", href: "#acting" },
              { label: "Instagram", href: "#instagram" },
              { label: "Kontakt", href: "#contact" },
            ].map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 text-sm transition-colors rounded-full ${activeSection === item.href.replace("#", "") ? "text-[#90645A]" : "text-[#6b5b54] hover:text-[#90645A]"}`}
                >
                  {activeSection === item.href.replace("#", "") && (
                    <motion.div 
                      layoutId="activeNav" 
                      className="absolute inset-0 bg-[#DCAE96]/30 rounded-full" 
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} 
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }} 
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ rotate: { duration: 4, repeat: Infinity } }}
          >
            <Link href="https://instagram.com/daphnigg" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-[#DCAE96]/20 transition-colors">
              <Instagram className="w-5 h-5 text-[#90645A]" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 });
  
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

  const letterAnimation = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + i * 0.08,
        duration: 0.6,
        ease: "easeOut" as const
      }
    })
  };

  const name = "DAPHNI";

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden bg-[#fff0db]" 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#DCAE96]/30 rounded-full blur-[100px] -translate-y-1/3"
        animate={{ 
          scale: [1, 1.1, 1], 
          opacity: [0.3, 0.5, 0.3],
          x: [0, 30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#90645A]/10 rounded-full blur-[80px] translate-y-1/3"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.2, 0.4, 0.2],
          y: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }} 
              className="flex items-center justify-center lg:justify-start gap-3 mb-8"
            >
              <motion.div 
                className="h-px bg-[#DCAE96]"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
              <motion.span 
                className="text-xs tracking-[0.3em] uppercase text-[#90645A] font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Stand-up Comedienne
              </motion.span>
              <motion.div 
                className="h-px bg-[#DCAE96]"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>

            {/* Animated Name */}
            <div className="overflow-hidden mb-2">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter text-[#3d2e2a] flex justify-center lg:justify-start">
                {name.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterAnimation}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                    whileHover={{ 
                      scale: 1.2, 
                      color: '#90645A',
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.3 }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.9 }} 
              className="text-2xl md:text-3xl text-[#90645A] font-light mb-8 tracking-wide"
            >
              Georoglidis
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 1.0 }} 
              className="text-lg text-[#6b5b54] max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Jung, düster – und überraschend gnadenlos.
              <br />
              <motion.span 
                className="text-[#90645A] font-medium inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                whileHover={{ scale: 1.05 }}
              >
                Genau dorthin, wo es weh tut.
              </motion.span>
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 1.2 }} 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ y: { duration: 3, repeat: Infinity } }}
              >
                <Link href="#shows" className="inline-flex items-center gap-2 px-8 py-4 bg-[#90645A] text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-[#6b4a42] transition-all">
                  <Ticket className="w-5 h-5" />
                  Tickets & Shows
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#about" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#90645A] rounded-full font-semibold border-2 border-[#DCAE96] hover:bg-[#fff0db] transition-all">
                  Mehr erfahren
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right - Portrait with animation */}
          <motion.div 
            className="order-1 lg:order-2 relative flex justify-center" 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.div 
              className="relative w-full max-w-md" 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              {/* Pulsing glow */}
              <motion.div 
                className="absolute inset-0 bg-[#DCAE96]/30 rounded-3xl blur-[40px] scale-95"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Main image */}
              <div className="relative z-10 rounded-3xl overflow-hidden border-4 border-[#DCAE96] shadow-2xl">
                <Image src="/daphni_portrait.png" alt="Daphni Georoglidis" width={500} height={500} className="object-cover w-full h-full" priority />
              </div>

              {/* Animated floating badges */}
              <motion.div 
                className="absolute -top-4 -right-4 z-20 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-[#DCAE96]"
                animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-sm font-semibold text-[#90645A] flex items-center gap-1.5">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Wine className="w-4 h-4" />
                  </motion.div>
                  Dark Humor
                </span>
              </motion.div>

              <motion.div 
                className="absolute -bottom-4 -left-4 z-20 px-4 py-2 bg-[#90645A] text-white rounded-full shadow-lg"
                animate={{ y: [0, 10, 0], rotate: [0, -3, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.span 
                  className="text-sm font-semibold flex items-center gap-1"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✦ Köln
                </motion.span>
              </motion.div>

              {/* Sparkle decorations */}
              <motion.div 
                className="absolute top-1/4 -right-6 z-20"
                animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
              >
                <Sparkles className="w-6 h-6 text-[#DCAE96]" />
              </motion.div>
              <motion.div 
                className="absolute bottom-1/3 -left-4 z-20"
                animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity, delay: 0.5 } }}
              >
                <Star className="w-5 h-5 text-[#90645A]" fill="#90645A" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.5 }} 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#90645A] uppercase tracking-widest font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-[#90645A]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden bg-white">
      {/* Background decoration with animation */}
      <motion.div 
        className="absolute top-20 left-10 text-[#DCAE96]/20"
        animate={{ rotate: 360, y: [0, -20, 0] }}
        transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      >
        <Flower2 className="w-32 h-32" />
      </motion.div>
      <motion.div 
        className="absolute bottom-20 right-10 text-[#90645A]/10"
        animate={{ rotate: -360, y: [0, 20, 0] }}
        transition={{ rotate: { duration: 50, repeat: Infinity, ease: "linear" }, y: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
      >
        <Feather className="w-24 h-24" />
      </motion.div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.9 }} 
          whileInView={{ opacity: 1, y: 0, scale: 1 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fff0db] rounded-full mb-8 border-2 border-[#DCAE96]"
        >
          <motion.div
            animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-[#90645A]" />
          </motion.div>
          <span className="text-sm text-[#90645A] font-medium">Über mich</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-[#3d2e2a]"
        >
          Wo Comedy auf <motion.span 
            className="text-[#90645A] inline-block"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >Schauspiel</motion.span> trifft
        </motion.h2>

        <AnimatedLine delay={0.2} />

        <motion.p 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl text-[#6b5b54] leading-relaxed mb-8 mt-8"
        >
          Als <motion.span 
            className="text-[#3d2e2a] font-semibold inline-block"
            whileHover={{ scale: 1.05, color: "#90645A" }}
          >Stand-up Comedienne</motion.span> und <motion.span 
            className="text-[#3d2e2a] font-semibold inline-block"
            whileHover={{ scale: 1.05, color: "#90645A" }}
          >Schauspielerin</motion.span> aus Köln bewege ich mich zwischen den Welten – mal gnadenlos direkt auf der Comedy-Bühne, mal in verschiedenen Rollen auf Theater- und Filmsets.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-[#6b5b54] leading-relaxed mb-12"
        >
          Mein Stil? <motion.span 
            className="text-[#90645A] font-semibold inline-block"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >Dark Humor</motion.span> mit bösartigem Witz. Ich gehe dorthin, wo es weh tut – und verwandle das Unbequeme in überraschend befreiendes Lachen.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {["Stand-up Comedy", "Schauspiel", "Dark Humor", "Köln"].map((tag, i) => (
            <motion.span 
              key={tag}
              className="px-6 py-2.5 bg-[#fff0db] rounded-full text-sm text-[#90645A] border-2 border-[#DCAE96] font-medium cursor-default"
              whileHover={{ scale: 1.1, backgroundColor: "#90645A", color: "#fff", borderColor: "#90645A" }}
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              custom={i}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Stats with animation */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { value: "5+", label: "Jahre", suffix: "" },
            { value: "100+", label: "Shows", suffix: "" },
            { value: "4K+", label: "Fans", suffix: "" },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label} 
              className="text-center p-6 rounded-2xl bg-[#fff0db] border-2 border-[#DCAE96]"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(144, 100, 90, 0.2)", scale: 1.05 }}
            >
              <motion.div 
                className="text-4xl font-bold text-[#90645A] mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.div>
              <motion.div 
                className="text-sm text-[#6b5b54]"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowsSection() {
  return (
    <section id="shows" className="relative py-32 overflow-hidden bg-[#fff0db]">
      {/* Animated background dots */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-[#DCAE96]"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, -10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full mb-6 border-2 border-[#DCAE96]"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Calendar className="w-4 h-4 text-[#90645A]" />
            </motion.div>
            <span className="text-sm text-[#90645A] font-medium">Live Shows</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3d2e2a]"
          >
            Kommende <motion.span 
              className="text-[#90645A] inline-block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >Auftritte</motion.span>
          </motion.h2>
        </div>

        <div className="space-y-6">
          {shows.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80, rotateY: index % 2 === 0 ? -15 : 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.02, boxShadow: "0 30px 60px rgba(144, 100, 90, 0.2)" }}
              className="group p-6 md:p-8 rounded-3xl bg-white border-2 border-[#DCAE96] shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <motion.div 
                  className="flex-shrink-0 w-36"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring" }}
                >
                  <motion.div 
                    className="text-4xl font-bold text-[#90645A]"
                    animate={{ color: ["#90645A", "#DCAE96", "#90645A"] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {show.date.split(" ")[0]}
                  </motion.div>
                  <div className="text-sm text-[#6b5b54]">{show.date.split(" ").slice(1).join(" ")}</div>
                </motion.div>
                <div className="flex-1">
                  <motion.h3 
                    className="text-xl font-bold mb-2 text-[#3d2e2a] group-hover:text-[#90645A] transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {show.title}
                  </motion.h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#6b5b54]">
                    <motion.span 
                      className="flex items-center gap-1"
                      whileHover={{ color: "#90645A" }}
                    >
                      <MapPin className="w-4 h-4 text-[#DCAE96]" />{show.venue}, {show.city}
                    </motion.span>
                    <motion.span 
                      className="flex items-center gap-1"
                      whileHover={{ color: "#90645A" }}
                    >
                      <Calendar className="w-4 h-4 text-[#DCAE96]" />{show.time}
                    </motion.span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {show.status && (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Badge className={show.status === "limited" ? "bg-[#fff0db] text-[#90645A] border-2 border-[#DCAE96]" : "bg-[#DCAE96]/20 text-[#90645A] border-2 border-[#DCAE96]"}>
                        {show.status === "available" ? "Verfügbar" : "Wenige Tickets"}
                      </Badge>
                    </motion.div>
                  )}
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: -5 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href={show.ticketLink || "#"} className="flex items-center gap-2 px-6 py-3 bg-[#90645A] text-white rounded-full text-sm font-semibold hover:bg-[#6b4a42] transition-colors shadow-lg">
                      <Ticket className="w-4 h-4" />Tickets
                    </Link>
                  </motion.div>
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
    <section id="acting" className="relative py-32 overflow-hidden bg-white">
      {/* Decorative floating elements */}
      <motion.div 
        className="absolute top-32 right-20 text-[#DCAE96]/30"
        animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Clapperboard className="w-16 h-16" />
      </motion.div>
      <motion.div 
        className="absolute bottom-32 left-20 text-[#90645A]/20"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Theater className="w-20 h-20" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fff0db] rounded-full mb-6 border-2 border-[#DCAE96]"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Film className="w-4 h-4 text-[#90645A]" />
            </motion.div>
            <span className="text-sm text-[#90645A] font-medium">Schauspiel</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3d2e2a]"
          >
            Film & <motion.span 
              className="text-[#90645A] inline-block"
              animate={{ y: [0, -5, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >Theater</motion.span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actingCredits.map((credit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, rotateY: 5, scale: 1.03, boxShadow: "0 25px 50px rgba(144, 100, 90, 0.2)" }}
              className="group p-6 bg-[#fff0db] rounded-2xl border-2 border-[#DCAE96] hover:border-[#90645A] transition-all"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex items-start justify-between mb-4">
                <motion.span 
                  className="text-xs font-bold text-[#90645A] bg-white px-3 py-1 rounded-full border border-[#DCAE96]"
                  whileHover={{ scale: 1.1, backgroundColor: "#90645A", color: "#fff" }}
                >
                  {credit.year}
                </motion.span>
                <motion.span 
                  className="text-xs text-[#6b5b54] bg-[#DCAE96]/30 px-3 py-1 rounded-full"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {credit.type}
                </motion.span>
              </div>
              <motion.h3 
                className="text-lg font-bold mb-2 text-[#3d2e2a] group-hover:text-[#90645A] transition-colors"
                whileHover={{ x: 3 }}
              >
                {credit.title}
              </motion.h3>
              <p className="text-sm text-[#6b5b54]">Rolle: <span className="text-[#3d2e2a] font-medium">{credit.role}</span></p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 p-8 bg-[#fff0db] rounded-3xl max-w-3xl mx-auto border-2 border-[#DCAE96]"
        >
          <motion.h3 
            className="text-2xl font-bold mb-8 text-center text-[#3d2e2a]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ausbildung
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { year: "2023", title: "Acting Workshop", instructor: "mit Lucy Russel" },
              { year: "2021", title: "Meisner Technique", instructor: "mit Jerry Coyle" },
            ].map((edu, i) => (
              <motion.div 
                key={i} 
                className="p-5 rounded-xl bg-white border-2 border-[#DCAE96]"
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.03, y: -5, boxShadow: "0 15px 30px rgba(144, 100, 90, 0.15)" }}
              >
                <motion.span 
                  className="text-sm text-[#90645A] font-bold"
                  animate={{ color: ["#90645A", "#DCAE96", "#90645A"] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i }}
                >
                  {edu.year}
                </motion.span>
                <div className="font-bold text-[#3d2e2a] mt-1 text-lg">{edu.title}</div>
                <div className="text-sm text-[#6b5b54]">{edu.instructor}</div>
              </motion.div>
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

  return (
    <section id="instagram" className="relative py-32 overflow-hidden bg-[#fff0db]">
      <AnimatePresence>
        {showBanner && <CookieConsent onAccept={handleAccept} onDecline={handleDecline} />}
      </AnimatePresence>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full mb-6 border-2 border-[#DCAE96]"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Instagram className="w-4 h-4 text-[#90645A]" />
            </motion.div>
            <span className="text-sm text-[#90645A] font-medium">@daphnigg</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3d2e2a]"
          >
            Folge mir auf <motion.span 
              className="text-[#90645A] inline-block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >Instagram</motion.span>
          </motion.h2>
        </div>

        {consent === true ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -10, rotateY: 5, boxShadow: "0 30px 60px rgba(144, 100, 90, 0.3)" }}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-white border-2 border-[#DCAE96] shadow-lg"
              >
                <iframe
                  src={post.embedUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                  title={`Instagram Post ${index + 1}`}
                />
              </motion.div>
            ))}
          </div>
        ) : consent === false ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-3xl border-2 border-[#DCAE96]"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Instagram className="w-16 h-16 mx-auto mb-6 text-[#DCAE96]" />
            </motion.div>
            <h3 className="text-xl font-bold mb-4 text-[#3d2e2a]">Instagram-Inhalte nicht verfügbar</h3>
            <p className="text-[#6b5b54] mb-6 max-w-md mx-auto">
              Sie haben die Einbettung von Instagram-Inhalten abgelehnt.
            </p>
            <Button onClick={() => setShowBanner(true)} className="bg-[#90645A] hover:bg-[#6b4a42] text-white">
              Cookie-Einstellungen öffnen
            </Button>
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-white/50 rounded-3xl border-2 border-[#DCAE96]">
            <p className="text-[#6b5b54]">Bitte akzeptieren Sie die Cookies...</p>
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ y: { duration: 3, repeat: Infinity } }}
          >
            <Link href="https://instagram.com/daphnigg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white rounded-full text-[#90645A] border-2 border-[#DCAE96] hover:bg-[#DCAE96]/10 transition-colors">
              <Instagram className="w-5 h-5" />
              Alle Posts auf Instagram ansehen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-white">
      {/* Background decoration */}
      <motion.div 
        className="absolute top-20 left-20 text-[#DCAE96]/20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Mic2 className="w-24 h-24" />
      </motion.div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3d2e2a]"
        >
          Lass uns <motion.span 
            className="text-[#90645A] inline-block"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >zusammenarbeiten</motion.span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-[#6b5b54] mb-12 max-w-2xl mx-auto"
        >
          Anfragen für Shows oder Projekte? Schreib mir!
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }}
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ rotate: { duration: 2, repeat: Infinity } }}
          >
            <Link href="https://instagram.com/daphnigg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-[#90645A] text-white rounded-full font-bold text-lg hover:bg-[#6b4a42] transition-colors shadow-lg">
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
    <footer className="border-t-2 border-[#DCAE96] bg-[#fff0db] relative overflow-hidden">
      {/* Subtle footer animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-[#DCAE96]/10 via-transparent to-[#DCAE96]/10"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Single line footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo with animation */}
          <motion.span 
            className="text-xl font-bold whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="text-[#90645A]"
              animate={{ color: ["#90645A", "#DCAE96", "#90645A"] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Daphni
            </motion.span>
            <span className="text-[#6b5b54] font-light"> Georoglidis</span>
          </motion.span>
          
          {/* Heart message - center with pulse */}
          <motion.div 
            className="flex items-center gap-2 text-[#90645A]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-sm">Made with</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 fill-[#90645A] text-[#90645A]" />
            </motion.div>
            <span className="text-sm">in Köln</span>
          </motion.div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-[#6b5b54]">
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/impressum" className="hover:text-[#90645A] transition-colors">Impressum</Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/datenschutz" className="hover:text-[#90645A] transition-colors">Datenschutz</Link>
            </motion.div>
            <motion.span 
              className="text-[#6b5b54]/60"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              © {new Date().getFullYear()}
            </motion.span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Main Page ---
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <AmbientBackground />
      <FloatingParticles />
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
