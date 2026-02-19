"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
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

// Instagram post shortcodes for embedding
const instagramPostIds = [
  "DC9oi8ZDdWZ", // Replace with actual post IDs from @daphnigg
  "DQ6kYqpjQ32",
  "DQ9Oi8ZDdWZ",
  "DPgZ8eGjZIV",
  "DOETCeeCJQB",
  "DJzoF4VtLy7",
  "DJHlnWjMZAt",
  "DK9n9InvoWZ"
];

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
          <div className="p-3 bg-white rounded-2xl border-2 border-[#DCAE96]">
            <Cookie className="w-6 h-6 text-[#90645A]" />
          </div>
          <h3 className="text-xl font-bold text-[#3d2e2a]">Cookies & Instagram</h3>
        </div>
        
        <div className="space-y-4 text-[#6b5b54] mb-8">
          <p className="leading-relaxed">
            Diese Website verwendet Cookies. Für die Anzeige von <strong>Instagram-Inhalten</strong> (eingebettete Posts) 
            ist Ihre Zustimmung erforderlich.
          </p>
          <div className="p-4 rounded-2xl bg-white border-2 border-[#DCAE96] space-y-3">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-[#90645A]" />
              <span className="text-sm">Notwendige Cookies (immer aktiv)</span>
            </div>
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5 text-[#90645A]" />
              <span className="text-sm">Instagram-Einbettung (optional)</span>
            </div>
          </div>
          <p className="text-xs text-[#6b5b54]/70">
            Bei Zustimmung werden Instagram-Posts direkt auf der Website angezeigt. 
            Daten werden an Instagram (Meta) übertragen.
          </p>
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
            Akzeptieren & Instagram anzeigen
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
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "bg-white/90 rounded-full px-6 py-3 shadow-lg border-2 border-[#DCAE96]" : ""}`}>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[#90645A]">Daphni</span>
              <span className="text-[#6b5b54] font-light"> Georoglidis</span>
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
                className={`relative px-4 py-2 text-sm transition-colors rounded-full ${activeSection === item.href.replace("#", "") ? "text-[#90645A]" : "text-[#6b5b54] hover:text-[#90645A]"}`}
              >
                {activeSection === item.href.replace("#", "") && (
                  <motion.div layoutId="activeNav" className="absolute inset-0 bg-[#DCAE96]/20 rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>

          <Link href="https://instagram.com/daphnigg" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-[#DCAE96]/20 transition-colors">
            <Instagram className="w-5 h-5 text-[#90645A]" />
          </Link>
        </div>
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

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#fff0db]" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Soft background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#DCAE96]/20 rounded-full blur-[100px] -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#90645A]/10 rounded-full blur-[80px] translate-y-1/3" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <div className="h-px w-12 bg-[#DCAE96]" />
              <span className="text-xs tracking-[0.3em] uppercase text-[#90645A] font-medium">Stand-up Comedienne</span>
              <div className="h-px w-12 bg-[#DCAE96]" />
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter mb-2 text-[#3d2e2a]">
              DAPHNI
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-2xl md:text-3xl text-[#90645A] font-light mb-8 tracking-wide">
              Georoglidis
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg text-[#6b5b54] max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Jung, düster – und überraschend gnadenlos.
              <br />
              <span className="text-[#90645A] font-medium">Genau dorthin, wo es weh tut.</span>
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="#shows" className="inline-flex items-center gap-2 px-8 py-4 bg-[#90645A] text-white rounded-full font-semibold shadow-lg hover:bg-[#6b4a42] transition-all">
                <Ticket className="w-5 h-5" />
                Tickets & Shows
              </Link>
              <Link href="#about" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#90645A] rounded-full font-semibold border-2 border-[#DCAE96] hover:bg-[#fff0db] transition-all">
                Mehr erfahren
              </Link>
            </motion.div>
          </div>

          {/* Right - Portrait with subtle animation only */}
          <motion.div className="order-1 lg:order-2 relative flex justify-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <motion.div className="relative w-full max-w-md" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
              {/* Single soft glow */}
              <div className="absolute inset-0 bg-[#DCAE96]/30 rounded-3xl blur-[30px] scale-95" />
              
              {/* Main image with border */}
              <div className="relative z-10 rounded-3xl overflow-hidden border-4 border-[#DCAE96] shadow-2xl">
                <Image src="/daphni_portrait.png" alt="Daphni Georoglidis" width={500} height={500} className="object-cover w-full h-full" priority />
              </div>

              {/* Single floating badge - calm animation */}
              <motion.div className="absolute -top-4 -right-4 z-20 px-4 py-2 bg-white rounded-full shadow-lg border-2 border-[#DCAE96]" animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <span className="text-sm font-semibold text-[#90645A] flex items-center gap-1.5">
                  <Wine className="w-4 h-4" />
                  Dark Humor
                </span>
              </motion.div>

              {/* Second badge - opposite corner */}
              <motion.div className="absolute -bottom-4 -left-4 z-20 px-4 py-2 bg-[#90645A] text-white rounded-full shadow-lg" animate={{ y: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                <span className="text-sm font-semibold">✦ Köln</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2">
          <span className="text-xs text-[#90645A] uppercase tracking-widest font-medium">Scroll</span>
          <ChevronDown className="w-5 h-5 text-[#90645A]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fff0db] rounded-full mb-8 border-2 border-[#DCAE96]">
          <Sparkles className="w-4 h-4 text-[#90645A]" />
          <span className="text-sm text-[#90645A] font-medium">Über mich</span>
        </motion.div>
        
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-[#3d2e2a]">
          Wo Comedy auf <span className="text-[#90645A]">Schauspiel</span> trifft
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-xl text-[#6b5b54] leading-relaxed mb-8">
          Als <span className="text-[#3d2e2a] font-semibold">Stand-up Comedienne</span> und <span className="text-[#3d2e2a] font-semibold">Schauspielerin</span> aus Köln bewege ich mich zwischen den Welten – mal gnadenlos direkt auf der Comedy-Bühne, mal in verschiedenen Rollen auf Theater- und Filmsets.
        </motion.p>
        
        <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-xl text-[#6b5b54] leading-relaxed mb-12">
          Mein Stil? <span className="text-[#90645A] font-semibold">Dark Humor</span> mit bösartigem Witz. Ich gehe dorthin, wo es weh tut – und verwandle das Unbequeme in überraschend befreiendes Lachen.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-3 mb-16">
          {["Stand-up Comedy", "Schauspiel", "Dark Humor", "Köln"].map((tag) => (
            <span key={tag} className="px-6 py-2.5 bg-[#fff0db] rounded-full text-sm text-[#90645A] border-2 border-[#DCAE96] font-medium">
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { value: "5+", label: "Jahre" },
            { value: "100+", label: "Shows" },
            { value: "4K+", label: "Fans" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-[#fff0db] border-2 border-[#DCAE96]">
              <div className="text-4xl font-bold text-[#90645A] mb-2">{stat.value}</div>
              <div className="text-sm text-[#6b5b54]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowsSection() {
  return (
    <section id="shows" className="relative py-32 overflow-hidden bg-[#fff0db]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full mb-6 border-2 border-[#DCAE96]">
            <Calendar className="w-4 h-4 text-[#90645A]" />
            <span className="text-sm text-[#90645A] font-medium">Live Shows</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3d2e2a]">
            Kommende <span className="text-[#90645A]">Auftritte</span>
          </h2>
        </div>

        <div className="space-y-6">
          {shows.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 md:p-8 rounded-3xl bg-white border-2 border-[#DCAE96] shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0 w-36">
                  <div className="text-4xl font-bold text-[#90645A]">{show.date.split(" ")[0]}</div>
                  <div className="text-sm text-[#6b5b54]">{show.date.split(" ").slice(1).join(" ")}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-[#3d2e2a] group-hover:text-[#90645A] transition-colors">{show.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#6b5b54]">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{show.venue}, {show.city}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{show.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {show.status && (
                    <Badge className={show.status === "limited" ? "bg-[#fff0db] text-[#90645A] border-2 border-[#DCAE96]" : "bg-[#DCAE96]/20 text-[#90645A] border-2 border-[#DCAE96]"}>
                      {show.status === "available" ? "Verfügbar" : "Wenige Tickets"}
                    </Badge>
                  )}
                  <Link href={show.ticketLink || "#"} className="flex items-center gap-2 px-6 py-3 bg-[#90645A] text-white rounded-full text-sm font-semibold hover:bg-[#6b4a42] transition-colors">
                    <Ticket className="w-4 h-4" />Tickets
                  </Link>
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fff0db] rounded-full mb-6 border-2 border-[#DCAE96]">
            <Film className="w-4 h-4 text-[#90645A]" />
            <span className="text-sm text-[#90645A] font-medium">Schauspiel</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3d2e2a]">
            Film & <span className="text-[#90645A]">Theater</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actingCredits.map((credit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-[#fff0db] rounded-2xl border-2 border-[#DCAE96] hover:border-[#90645A] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-bold text-[#90645A] bg-white px-3 py-1 rounded-full border border-[#DCAE96]">{credit.year}</span>
                <span className="text-xs text-[#6b5b54] bg-[#DCAE96]/30 px-3 py-1 rounded-full">{credit.type}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#3d2e2a]">{credit.title}</h3>
              <p className="text-sm text-[#6b5b54]">Rolle: <span className="text-[#3d2e2a] font-medium">{credit.role}</span></p>
            </motion.div>
          ))}
        </div>
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full mb-6 border-2 border-[#DCAE96]">
            <Instagram className="w-4 h-4 text-[#90645A]" />
            <span className="text-sm text-[#90645A] font-medium">@daphnigg</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3d2e2a]">
            Folge mir auf <span className="text-[#90645A]">Instagram</span>
          </h2>
        </div>

        {consent === true ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramPostIds.map((postId, index) => (
              <motion.div
                key={postId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-white border-2 border-[#DCAE96] shadow-lg"
              >
                <iframe
                  src={`https://www.instagram.com/p/${postId}/embed`}
                  className="w-full h-full absolute inset-0"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                  title={`Instagram Post ${index + 1}`}
                />
              </motion.div>
            ))}
          </div>
        ) : consent === false ? (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-[#DCAE96]">
            <Instagram className="w-16 h-16 mx-auto mb-6 text-[#DCAE96]" />
            <h3 className="text-xl font-bold mb-4 text-[#3d2e2a]">Instagram-Inhalte nicht verfügbar</h3>
            <p className="text-[#6b5b54] mb-6 max-w-md mx-auto">
              Sie haben die Einbettung von Instagram-Inhalten abgelehnt. 
              Um die Posts direkt auf der Website zu sehen, akzeptieren Sie bitte die Cookies.
            </p>
            <Button onClick={() => setShowBanner(true)} className="bg-[#90645A] hover:bg-[#6b4a42] text-white">
              Cookie-Einstellungen öffnen
            </Button>
          </div>
        ) : (
          <div className="text-center py-16 bg-white/50 rounded-3xl border-2 border-[#DCAE96]">
            <p className="text-[#6b5b54]">Bitte akzeptieren Sie die Cookies, um Instagram-Inhalte zu sehen.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="https://instagram.com/daphnigg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white rounded-full text-[#90645A] border-2 border-[#DCAE96] hover:bg-[#DCAE96]/10 transition-colors">
            <Instagram className="w-5 h-5" />
            Alle Posts auf Instagram ansehen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3d2e2a]">
          Lass uns <span className="text-[#90645A]">zusammenarbeiten</span>
        </h2>
        <p className="text-xl text-[#6b5b54] mb-12 max-w-2xl mx-auto">
          Anfragen für Shows oder Projekte? Schreib mir!
        </p>
        <Link href="https://instagram.com/daphnigg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-[#90645A] text-white rounded-full font-bold text-lg hover:bg-[#6b4a42] transition-colors shadow-lg">
          <Instagram className="w-6 h-6" />
          Anfrage senden
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-2 border-[#DCAE96] py-12 bg-[#fff0db]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Heart message */}
          <motion.div 
            className="flex items-center gap-2 text-[#90645A] text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span>Mit</span>
            <Heart className="w-5 h-5 fill-[#90645A] text-[#90645A] inline-block" />
            <span>erstellt in Köln</span>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
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
