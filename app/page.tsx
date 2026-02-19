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
  Check,
  Moon,
  Star,
  Flower2,
  Feather,
  Wine
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
  { id: "1", type: "video", caption: "Dark Humor at its finest 🕯️", likes: "2.847", comments: 156, date: "2 Tage" },
  { id: "2", type: "image", caption: "Backstage bei Echtzeit Comedy 🎭", likes: "1.923", comments: 89, date: "5 Tage" },
  { id: "3", type: "carousel", caption: "Swipe für mehr Chaos ➡️", likes: "3.421", comments: 234, date: "1 Woche" },
  { id: "4", type: "video", caption: "POV: Du fragst nach Mental Health 🤡", likes: "5.623", comments: 445, date: "1 Woche" },
  { id: "5", type: "image", caption: "Neues Programm 'Artgerecht' 📍", likes: "2.156", comments: 178, date: "2 Wochen" },
  { id: "6", type: "video", caption: "Die Insassen haben mich geliebt! 💀", likes: "4.892", comments: 312, date: "2 Wochen" },
  { id: "7", type: "image", caption: "Sagt mir ich bin nicht die einzige...", likes: "3.678", comments: 267, date: "3 Wochen" },
  { id: "8", type: "video", caption: "Meine Zeit in der Psychiatrie 🏥", likes: "7.234", comments: 589, date: "3 Wochen" },
];

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

// --- Components ---

function FloatingPetals() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 15}%`,
            top: `${10 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        >
          <Flower2 
            className="w-6 h-6" 
            style={{ 
              color: i % 2 === 0 ? '#DCAE96' : '#90645A',
              opacity: 0.4 
            }} 
          />
        </motion.div>
      ))}
    </div>
  );
}

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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#3d2e2a]/40"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full border-2 border-[#DCAE96]/30 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#fff0db] rounded-xl">
            <Cookie className="w-6 h-6 text-[#90645A]" />
          </div>
          <h3 className="text-xl font-semibold text-[#3d2e2a]">Cookies</h3>
        </div>
        
        <div className="space-y-4 text-[#6b5b54] mb-8">
          <p>Für Instagram-Inhalte benötigen wir Ihre Zustimmung.</p>
          <div className="p-4 rounded-xl bg-[#fff0db] space-y-2">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#90645A]" />
              <span className="text-sm">Notwendige Cookies</span>
            </div>
            <div className="flex items-center gap-2">
              <Cookie className="w-4 h-4 text-[#DCAE96]" />
              <span className="text-sm">Instagram (optional)</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleDecline}
            className="flex-1 border-[#DCAE96] text-[#90645A] hover:bg-[#fff0db]"
          >
            Ablehnen
          </Button>
          <Button 
            onClick={handleAccept}
            className="flex-1 bg-[#90645A] hover:bg-[#6b4a42] text-white"
          >
            Akzeptieren
          </Button>
        </div>
        
        <p className="text-xs text-[#6b5b54] text-center mt-4">
          <Link href="/datenschutz" className="text-[#90645A] hover:underline">Datenschutzerklärung</Link>
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
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "bg-white/90 rounded-full px-6 py-3 shadow-lg border border-[#DCAE96]/20" : ""
          }`}
        >
          <Link href="/" className="flex items-center gap-2 group">
            <motion.span 
              className="text-xl font-bold tracking-tight"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-[#90645A]">Daphni</span>
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
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm transition-colors rounded-full ${
                  activeSection === item.href.replace("#", "") 
                    ? "text-[#90645A]" 
                    : "text-[#6b5b54] hover:text-[#90645A]"
                }`}
              >
                {activeSection === item.href.replace("#", "") && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-[#DCAE96]/20 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
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
            className="p-2 rounded-full hover:bg-[#DCAE96]/20 transition-colors"
          >
            <Instagram className="w-5 h-5 text-[#90645A]" />
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, 150]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });
  
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

  // Letter animation variants
  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + i * 0.08,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const
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
      <FloatingPetals />
      
      {/* Soft background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#DCAE96]/30 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#90645A]/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#fff0db] rounded-full" />
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Animated pre-title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-8"
            >
              <motion.div 
                className="h-px w-12 bg-[#DCAE96]"
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
                className="h-px w-12 bg-[#DCAE96]"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>

            {/* Animated Name */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter text-[#3d2e2a] flex justify-center lg:justify-start"
                style={{ perspective: 1000 }}
              >
                {name.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                    whileHover={{ 
                      scale: 1.1, 
                      color: '#90645A',
                      transition: { duration: 0.2 }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            {/* Animated surname */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mb-8"
            >
              <span className="text-3xl md:text-4xl text-[#90645A] font-light tracking-[0.2em]">
                Georoglidis
              </span>
            </motion.div>

            {/* Tagline with fade in */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-lg text-[#6b5b54] max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Jung, düster – und überraschend gnadenlos.
              <br />
              <motion.span 
                className="text-[#90645A] font-medium inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                Genau dorthin, wo es weh tut.
              </motion.span>
            </motion.p>

            {/* CTA Buttons with stagger */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#shows"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#90645A] text-white rounded-full font-semibold shadow-lg shadow-[#90645A]/30 hover:shadow-xl hover:shadow-[#90645A]/40 transition-all"
                >
                  <Ticket className="w-5 h-5" />
                  Tickets & Shows
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#about"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#90645A] rounded-full font-semibold border-2 border-[#DCAE96] hover:bg-[#fff0db] transition-all"
                >
                  Mehr erfahren
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right - Portrait with enhanced styling */}
          <motion.div 
            className="order-1 lg:order-2 relative flex justify-center"
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div 
              className="relative w-full max-w-md"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              {/* Decorative ring behind image - DCAE96 for contrast */}
              <motion.div 
                className="absolute inset-0 rounded-full border-[3px] border-[#DCAE96]/40 scale-110"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Second ring - 90645A */}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#90645A]/30 scale-125"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              {/* Soft glow */}
              <div className="absolute inset-0 bg-[#DCAE96]/20 rounded-full blur-[40px] scale-95" />
              
              {/* Main image container with peachy border */}
              <div className="relative z-10 rounded-[2rem] overflow-hidden border-[4px] border-[#DCAE96] shadow-2xl shadow-[#90645A]/20">
                <Image
                  src="/daphni_portrait.png"
                  alt="Daphni Georoglidis"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                  priority
                />
                {/* Soft overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#fff0db]/40 via-transparent to-transparent" />
              </div>

              {/* Floating elements with animations */}
              <motion.div
                className="absolute -top-4 -right-4 z-20 px-5 py-2.5 bg-white rounded-2xl shadow-lg border-2 border-[#DCAE96]"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 3, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-sm font-semibold text-[#90645A] flex items-center gap-2">
                  <Wine className="w-4 h-4" />
                  Dark Humor
                </span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 z-20 px-5 py-2.5 bg-[#fff0db] rounded-2xl shadow-lg border-2 border-[#90645A]"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-sm font-semibold text-[#90645A]">✦ Köln</span>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 z-20 p-3 bg-white rounded-full shadow-lg border-2 border-[#DCAE96]"
                animate={{ 
                  scale: [1, 1.15, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-5 h-5 text-[#DCAE96] fill-[#DCAE96]" />
              </motion.div>

              {/* Additional floating feather */}
              <motion.div
                className="absolute top-8 -left-6 z-20"
                animate={{ 
                  y: [0, -15, 0],
                  x: [0, 5, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Feather className="w-8 h-8 text-[#90645A]/60" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#90645A] uppercase tracking-widest font-medium">Scroll</span>
          <ChevronDown className="w-5 h-5 text-[#90645A]" />
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
    <section id="about" ref={ref} className="relative py-32 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff0db] via-white to-[#fff0db] opacity-50" />
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 text-[#DCAE96]/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <Flower2 className="w-24 h-24" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 right-10 text-[#90645A]/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-20 h-20" />
      </motion.div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fff0db] rounded-full mb-6 border-2 border-[#DCAE96]">
            <Sparkles className="w-4 h-4 text-[#90645A]" />
            <span className="text-sm text-[#90645A] font-medium">Über mich</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3d2e2a]">
            Wo Comedy auf <span className="text-[#90645A]">Schauspiel</span> trifft
          </motion.h2>
          
          <motion.div 
            className="h-1 bg-gradient-to-r from-transparent via-[#DCAE96] to-transparent mx-auto"
            style={{ width: lineWidth }}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-8 text-center"
        >
          <motion.p variants={fadeInUp} className="text-xl text-[#6b5b54] leading-relaxed">
            Als <span className="text-[#3d2e2a] font-semibold">Stand-up Comedienne</span> und{" "}
            <span className="text-[#3d2e2a] font-semibold">Schauspielerin</span> aus Köln bewege ich mich 
            zwischen den Welten – mal gnadenlos direkt auf der Comedy-Bühne, 
            mal in verschiedenen Rollen auf Theater- und Filmsets.
          </motion.p>
          
          <motion.p variants={fadeInUp} className="text-xl text-[#6b5b54] leading-relaxed">
            Mein Stil? <span className="text-[#90645A] font-semibold">Dark Humor</span> mit bösartigem Witz. 
            Ich gehe dorthin, wo es weh tut – und verwandle das Unbequeme in 
            überraschend befreiendes Lachen.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 pt-8">
            {["Stand-up Comedy", "Schauspiel", "Dark Humor", "Köln"].map((tag, i) => (
              <motion.span 
                key={tag}
                className="px-6 py-2.5 bg-[#fff0db] rounded-full text-sm text-[#90645A] border-2 border-[#DCAE96] font-medium"
                whileHover={{ scale: 1.05, backgroundColor: "#DCAE96", color: "#fff" }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto"
          >
            {[
              { value: "5+", label: "Jahre" },
              { value: "100+", label: "Shows" },
              { value: "4K+", label: "Fans" },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label} 
                className="text-center p-6 rounded-2xl bg-[#fff0db] border-2 border-[#DCAE96]"
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(144, 100, 90, 0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-[#90645A] mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-[#6b5b54] font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ShowsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="shows" className="relative py-32 overflow-hidden bg-[#fff0db]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #DCAE96 1px, transparent 1px),
                           radial-gradient(circle at 80% 80%, #90645A 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full mb-6 border-2 border-[#DCAE96]">
            <Calendar className="w-4 h-4 text-[#90645A]" />
            <span className="text-sm text-[#90645A] font-medium">Live Shows</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3d2e2a]">
            Kommende <span className="text-[#90645A]">Auftritte</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-[#6b5b54] max-w-2xl mx-auto">
            Erlebe Dark Humor live – gnadenlos, direkt und unvergesslich.
          </motion.p>
        </motion.div>

        <div className="space-y-6">
          {shows.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              onMouseEnter={() => setHoveredId(show.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div 
                className={`
                  relative group p-6 md:p-8 rounded-3xl transition-all duration-300 bg-white
                  ${hoveredId === show.id ? "shadow-2xl" : "shadow-lg"}
                `}
                style={{
                  border: hoveredId === show.id ? "3px solid #DCAE96" : "2px solid #DCAE96"
                }}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0 w-36">
                    <div className="text-4xl font-bold text-[#90645A]">{show.date.split(" ")[0]}</div>
                    <div className="text-sm text-[#6b5b54]">{show.date.split(" ").slice(1).join(" ")}</div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-[#3d2e2a] group-hover:text-[#90645A] transition-colors">
                      {show.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#6b5b54]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-[#DCAE96]" />
                        {show.venue}, {show.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-[#DCAE96]" />
                        {show.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {show.status && (
                      <Badge 
                        className={show.status === "limited" 
                          ? "bg-[#fff0db] text-[#90645A] border-2 border-[#DCAE96] px-3 py-1" 
                          : "bg-[#DCAE96]/20 text-[#90645A] border-2 border-[#DCAE96] px-3 py-1"
                        }
                      >
                        {show.status === "available" && "Verfügbar"}
                        {show.status === "limited" && "Wenige Tickets"}
                      </Badge>
                    )}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={show.ticketLink || "#"}
                        className="flex items-center gap-2 px-6 py-3 bg-[#90645A] text-white rounded-full text-sm font-semibold hover:bg-[#6b4a42] transition-colors shadow-lg"
                      >
                        <Ticket className="w-4 h-4" />
                        Tickets
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fff0db] rounded-full mb-6 border-2 border-[#DCAE96]">
            <Film className="w-4 h-4 text-[#90645A]" />
            <span className="text-sm text-[#90645A] font-medium">Schauspiel</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3d2e2a]">
            Film & <span className="text-[#90645A]">Theater</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actingCredits.map((credit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, rotateY: 5 }}
              className="group p-6 bg-[#fff0db] rounded-2xl border-2 border-[#DCAE96] hover:border-[#90645A] transition-all shadow-lg hover:shadow-xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-bold text-[#90645A] bg-white px-3 py-1 rounded-full border border-[#DCAE96]">
                  {credit.year}
                </span>
                <span className="text-xs text-[#6b5b54] bg-[#DCAE96]/30 px-3 py-1 rounded-full">
                  {credit.type}
                </span>
              </div>
              
              <h3 className="text-lg font-bold mb-2 text-[#3d2e2a] group-hover:text-[#90645A] transition-colors">
                {credit.title}
              </h3>
              
              <div className="space-y-1 text-sm text-[#6b5b54]">
                <p>Rolle: <span className="text-[#3d2e2a] font-medium">{credit.role}</span></p>
                {credit.director && <p className="text-xs">{credit.director}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-[#fff0db] rounded-3xl max-w-3xl mx-auto border-2 border-[#DCAE96]"
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-[#3d2e2a]">Ausbildung</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { year: "2023", title: "Acting Workshop", instructor: "mit Lucy Russel" },
              { year: "2021", title: "Meisner Technique", instructor: "mit Jerry Coyle" },
            ].map((edu, i) => (
              <motion.div 
                key={i} 
                className="p-5 rounded-xl bg-white border-2 border-[#DCAE96]"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-sm text-[#90645A] font-bold">{edu.year}</span>
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
      {showBanner && <CookieConsent onAccept={handleAccept} onDecline={handleDecline} />}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full mb-6 border-2 border-[#DCAE96]">
            <Instagram className="w-4 h-4 text-[#90645A]" />
            <span className="text-sm text-[#90645A] font-medium">@daphnigg</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3d2e2a]">
            Folge mir auf <span className="text-[#90645A]">Instagram</span>
          </motion.h2>
        </motion.div>

        {consent === true ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {instagramPosts.map((post, index) => (
              <motion.a
                key={post.id}
                href="https://instagram.com/daphnigg"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-white border-2 border-[#DCAE96] shadow-lg"
              >
                {/* Background gradient based on index */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  index % 3 === 0 ? "from-[#DCAE96]/40 to-[#fff0db]" :
                  index % 3 === 1 ? "from-[#90645A]/30 to-[#DCAE96]/30" :
                  "from-[#fff0db] to-[#DCAE96]/40"
                }`} />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  {post.type === "video" ? (
                    <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-[#90645A] fill-[#90645A] ml-1" />
                    </div>
                  ) : post.type === "carousel" ? (
                    <div className="grid grid-cols-2 gap-1 w-10 h-10">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-[#90645A]/40 rounded" />
                      ))}
                    </div>
                  ) : (
                    <span className="text-5xl opacity-40">{index % 2 === 0 ? "✨" : "🎭"}</span>
                  )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#3d2e2a]/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                  <div className="flex items-center gap-4 text-white mb-3">
                    <div className="flex items-center gap-1">
                      <Heart className="w-5 h-5 fill-[#DCAE96] text-[#DCAE96]" />
                      <span className="font-bold">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-bold">{post.comments}</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/80 text-center line-clamp-2">{post.caption}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        ) : consent === false ? (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-[#DCAE96]">
            <Instagram className="w-16 h-16 mx-auto mb-6 text-[#DCAE96]" />
            <h3 className="text-xl font-bold mb-4 text-[#3d2e2a]">Instagram-Inhalte</h3>
            <Button onClick={() => setShowBanner(true)} variant="outline" className="border-[#90645A] text-[#90645A]">
              Cookie-Einstellungen
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff0db]/50 to-transparent" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3d2e2a]">
            Lass uns <span className="text-[#90645A]">zusammenarbeiten</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-[#6b5b54] mb-12 max-w-2xl mx-auto">
            Anfragen für Shows oder Projekte? Schreib mir!
          </motion.p>

          <motion.div variants={fadeInUp}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://instagram.com/daphnigg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#90645A] text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                <Instagram className="w-6 h-6" />
                Anfrage senden
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-2 border-[#DCAE96] py-12 bg-[#fff0db]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-2xl font-bold">
            <span className="text-[#90645A]">Daphni</span>
            <span className="text-[#6b5b54] font-light"> Georoglidis</span>
          </span>
          
          <div className="flex items-center gap-8 text-sm text-[#6b5b54]">
            <Link href="/impressum" className="hover:text-[#90645A] transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-[#90645A] transition-colors">Datenschutz</Link>
          </div>

          <p className="text-sm text-[#6b5b54]">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}

// --- Main Page ---
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
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
