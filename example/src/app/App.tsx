import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Ticket,
} from "lucide-react";
import { SEOHead } from "./shared/lib/SEOHead";

const logoSrc = "88b39e628c231107b835731e0312f61d.png";
const floralSrc = "d4332e29763bf40b194df497d03f58aa.png";

const links = {
  booking: "https://tx.fivease.com/online/cbb?merchantid=60GVM90PQRDS1",
  whatsapp: "https://wa.me/13059221149",
  reviews: "https://g.page/r/CXMMamMU4ZISEBM/review",
  instagram: "https://www.instagram.com/marbritaesthetics/",
  tiktok: "https://www.tiktok.com/@marbritsaesthetics",
  maps: "https://www.google.com/maps/place/3837+SW+8th+St,+Coral+Gables,+FL+33134",
} as const;

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#packages", label: "Packages" },
  { href: "#community", label: "Community" },
  { href: "#contact", label: "Contact" },
] as const;

const heroTags = ["Facials", "Laser Hair Removal", "Venus Legacy"] as const;

const services = [
  {
    number: "01",
    title: "Facial Treatments",
    image: "d392f84f9e708bd48d8cca5562342e21.jpg",
    imagePosition: "center 30%",
    body: "Targeted protocols for deep cleansing, glow, hydration, texture renewal, and skin recovery based on each client.",
    items: [
      "Deep facial cleansing",
      "Hydrafacial",
      "Oxygeneo",
      "Carbon peel",
      "HIFU",
      "Enzymes",
      "Facial PRP",
      "Radio frequency",
    ],
  },
  {
    number: "02",
    title: "Advanced Aesthetics",
    image: "354dfe361cc9c6104ad3d3ee29244d40.jpg",
    imagePosition: "center 30%",
    body: "Regenerative and high-demand treatments for skin, face, and body — PRP, exosomes, fillers, and more.",
    items: [
      "Facial PRP",
      "Hair PRP",
      "Exosomes",
      "Exosomes + PRP",
      "Fibroblast",
      "Fillers",
      "Radiesse",
    ],
  },
  {
    number: "03",
    title: "Body Contouring",
    image: "3f78e95e2b103246ebd23ee1ac1505ef.jpg",
    imagePosition: "center 30%",
    body: "Firming, sculpting, and contour support with Venus Legacy, Ems Sculpt, and tailored body plans.",
    items: [
      "Venus Legacy",
      "Ems Sculpt",
      "Carboxytherapy",
      "Wood therapy",
      "Fat freezing",
      "Brightening by area",
    ],
  },
  {
    number: "04",
    title: "Laser Hair Removal",
    image: "84268bb5db8cddab06aaa6b5868984d4.jpg",
    imagePosition: "center 25%",
    body: "Face and body laser sessions with fast booking and direct WhatsApp support for any questions.",
    items: [
      "Underarms",
      "Bikini / Full Bikini",
      "Half Leg / Full Legs",
      "Upper Lip / Chin",
      "Buttocks",
      "Full Body",
      "Brightening add-ons",
      "Tattoo removal",
    ],
  },
] as const;

const highlights = [
  {
    number: "01",
    accent: "Full range",
    title: "of treatments",
    body: "Facials, laser, PRP, exosomes, Venus Legacy, and body contouring — all available under one roof.",
  },
  {
    number: "02",
    accent: "Direct",
    title: "WhatsApp support",
    body: "Ask questions, confirm your treatment, and book directly through WhatsApp — no waiting, no runaround.",
  },
  {
    number: "03",
    accent: "Located in",
    title: "Coral Gables",
    body: "A visible studio with a real address, consistent hours, and a local presence you can trust.",
  },
  {
    number: "04",
    accent: "Real",
    title: "studio and results",
    body: "Every photo on this site is taken inside the actual treatment rooms with real equipment and real clients.",
  },
] as const;

const mapAreas = [
  {
    title: "Glow and cleansing",
    items: ["Hydrafacial", "Deep cleansing", "Oxygeneo"],
    className: "left-[0%] top-[2%]",
    connector: "left-full",
    zoneClassName: "left-[20%] top-[3%] h-[18%] w-[62%]",
  },
  {
    title: "Regeneration",
    items: ["PRP", "Exosomes", "Peels"],
    className: "left-[0%] top-[38%]",
    connector: "left-full",
    zoneClassName: "left-[18%] top-[22%] h-[20%] w-[64%]",
  },
  {
    title: "Facial firmness",
    items: ["HIFU", "Venus Legacy", "Radio frequency"],
    className: "right-[0%] top-[2%]",
    connector: "right-full flex-row-reverse",
    zoneClassName: "left-[20%] top-[42%] h-[18%] w-[62%]",
  },
  {
    title: "Body sculpting",
    items: ["Venus Legacy", "Wood therapy", "Carboxytherapy"],
    className: "right-[0%] top-[38%]",
    connector: "right-full flex-row-reverse",
    zoneClassName: "left-[14%] top-[60%] h-[24%] w-[72%]",
  },
  {
    title: "Laser zones",
    items: ["Bikini", "Legs", "Underarms"],
    className: "right-[0%] top-[72%]",
    connector: "right-full flex-row-reverse",
    zoneClassName: "left-[18%] top-[76%] h-[18%] w-[64%]",
  },
] as const;

const packages = [
  {
    eyebrow: "Current package",
    title: "4 brightening sessions",
    items: [
      "Intimate-area brightening",
      "Scheduled treatment path",
      "WhatsApp consultation first",
      "Final booking through Fivease",
    ],
    featured: false,
  },
  {
    eyebrow: "Most requested",
    title: "6 laser bikini sessions",
    items: [
      "Laser bikini / full bikini",
      "External booking follow-through",
      "One-on-one attention",
      "Designed for continuity",
    ],
    featured: true,
  },
  {
    eyebrow: "Body focus",
    title: "Ems Sculpt 10-session package",
    items: [
      "Structured Ems Sculpt bundle",
      "Can be paired with body contouring",
      "Adjusted to the treatment goal",
      "Pre-visit guidance on WhatsApp",
    ],
    featured: false,
  },
] as const;

const trustCards = [
  {
    quote:
      "WhatsApp is the fastest way to get answers, confirm your treatment, and schedule your visit — all in one conversation.",
    author: "Direct contact",
    label: "WhatsApp",
  },
  {
    quote:
      "Browse available times for facials, laser, Venus Legacy, and packages — then book instantly through Fivease.",
    author: "Online booking",
    label: "Fivease",
  },
  {
    quote:
      "Follow Marbrit on Instagram and TikTok for real treatment clips, before-and-after results, and studio moments.",
    author: "Social media",
    label: "Instagram & TikTok",
  },
] as const;

const gallery = [
  {
    src: "00b176f4983dbd724299ba99c91e36cf.jpg",
    alt: "Marbrit Aesthetic reception area inside the studio.",
    className: "1 / 1 / 3 / 3",
    label: "Studio",
    position: "center 30%",
  },
  {
    src: "18055694ec56b4d9d105947db5edb916.png",
    alt: "Facial treatment close-up.",
    className: "1 / 3 / 2 / 4",
    label: "Facials",
    position: "center 25%",
  },
  {
    src: "2344c6777414aee5db6c25994b7def15.jpg",
    alt: "Laser hair removal session on the leg.",
    className: "1 / 4 / 2 / 5",
    label: "Laser",
    position: "center 35%",
  },
  {
    src: "5b3b4142e96035095027b426f56e05cd.jpg",
    alt: "Close-up view of Venus Legacy treatment.",
    className: "2 / 3 / 3 / 4",
    label: "Venus Legacy",
    position: "center 30%",
  },
  {
    src: "2ec2aa4f1d3295a3b5a3e759d2ad43f8.jpg",
    alt: "PRP and regenerative treatment materials.",
    className: "2 / 4 / 3 / 5",
    label: "PRP",
    position: "center 30%",
  },
] as const;

const floatingLinks: ReadonlyArray<{
  href: string;
  label: string;
  icon: LucideIcon;
}> = [
  { href: links.whatsapp, label: "WhatsApp", icon: MessageCircle },
  { href: links.instagram, label: "Instagram", icon: Instagram },
  { href: links.tiktok, label: "TikTok", icon: Sparkles },
  { href: links.reviews, label: "Reviews", icon: Star },
] as const;

const cookieConsentName = "marbrit_cookie_consent";
const cookieConsentValue = "accepted";
const cookieConsentMaxAge = 15552000;

const serviceSpreads = [
  [services[0], services[1]],
  [services[2], services[3]],
] as const;

function FlowerDecoration({
  className,
  mirrored = false,
}: {
  className: string;
  mirrored?: boolean;
}) {
  return (
    <img
      alt=""
      aria-hidden="true"
      src={`${import.meta.env.BASE_URL}${floralSrc}`}
      className={`pointer-events-none absolute select-none ${mirrored ? "-scale-x-100" : ""} ${className}`}
    />
  );
}

function BrandMark({
  compact = false,
  variant = "dark",
}: {
  compact?: boolean;
  variant?: "dark" | "light";
}) {
  const scriptColor =
    variant === "light"
      ? "text-[oklab(0.97_0.006_0.01)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
      : "text-[lab(65.6_23.4_15.3)]";
  const labelColor = variant === "light" ? "text-white/84" : "text-[lab(15.5_11.5_10.8)]";

  return (
    <span aria-label="Marbrit Aesthetic" className="inline-flex items-center gap-3">
      <img
        alt="Marbrit Aesthetic logo"
        src={`${import.meta.env.BASE_URL}${logoSrc}`}
        className={compact ? "h-11 w-11 rounded-full object-cover" : "h-14 w-14 rounded-full object-cover"}
      />
      <span className="flex flex-col leading-[16px]">
        <span
          className={`${compact ? "mb-[-4px] text-[34px] leading-[34px]" : "mb-[-4px] text-[38px] leading-[38px]"} ${scriptColor}`}
          style={{ fontFamily: '"Pinyon Script", "Pinyon Script Fallback", cursive' }}
        >
          Marbrit
        </span>
        <span className={`font-medium uppercase tracking-[4.8px] text-[11px] ${labelColor}`}>Aesthetic</span>
      </span>
    </span>
  );
}

function BulletList({ items, dark = false }: { items: readonly string[]; dark?: boolean }) {
  return (
    <ul className="grid grow basis-0 gap-x-3 gap-y-1.5 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-2 text-[13px] leading-[19px] ${dark ? "text-[oklab(0.984998_0.00513196_0.00615114_/_0.92)]/88" : "text-[oklab(0.260001_0.0475461_0.0154568_/_0.88)]/88"
            }`}
        >
          <span className="mt-[6px] block h-[5px] w-[5px] shrink-0 rounded-full bg-[lab(65.6_23.4_15.3)]"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ServicePage({
  service,
  isLeft,
  muted = false,
  onClick,
}: {
  service: (typeof services)[number];
  isLeft: boolean;
  muted?: boolean;
  onClick?: () => void;
}) {
  return (
    <article
      className={`book-page ${isLeft ? "book-page-left border-r border-[rgba(110,76,74,0.08)]" : "book-page-right"} relative flex h-full flex-col overflow-hidden ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <div className="book-page-image relative shrink-0 overflow-hidden" style={{ height: "55%" }}>
        <img alt={service.title} src={`${import.meta.env.BASE_URL}${service.image}`} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: service.imagePosition || "center" }} />
        <div className={`absolute inset-0 ${muted ? "bg-[linear-gradient(180deg,rgba(42,24,20,0.1),rgba(42,24,20,0.48))]" : "bg-[linear-gradient(180deg,rgba(42,24,20,0.02),rgba(42,24,20,0.28))]"}`}></div>
        <div className={`absolute right-5 top-5 rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[1.6px] backdrop-blur-sm ${muted ? "border-white/20 bg-white/12 text-white/90" : "border-white/55 bg-white/18 text-white"}`}>
          Signature
        </div>
      </div>

      <div className={`flex min-h-0 flex-1 flex-col p-5 lg:p-6 ${muted ? "bg-[linear-gradient(180deg,rgba(176,112,104,0.98),rgba(150,88,80,0.98))] text-white" : ""}`}>
        <div className="mb-2">
          <p className={`mb-1 text-[10px] font-medium uppercase tracking-[1.8px] ${muted ? "text-white/55" : "text-[rgba(103,66,78,0.55)]"}`}>
            Service chapter
          </p>
          <h3
            className={`text-[28px] font-semibold leading-[1.04] ${muted ? "text-white" : "text-[lab(15.5_11.5_10.8)]"}`}
            style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
          >
            {service.title}
          </h3>
        </div>

        <p className={`text-[13px] leading-[20px] ${muted ? "text-white/80" : "text-[lab(15.5_11.5_10.8)]"}`}>
          {service.body}
        </p>

        <div className="mt-3">
          <a
            href={links.booking}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex min-h-9 items-center gap-[5px] rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[1.8px] shadow-[rgba(71,37,42,0.1)_0px_14px_28px_-18px] transition duration-200 ease-out hover:scale-[0.97] motion-reduce:transition-none ${muted ? "bg-white text-[lab(65.6_23.4_15.3)]" : "bg-[lab(65.6_23.4_15.3)] text-[lab(98.2272_1.72979_2.3571)]"}`}
          >
            Book this service
            <ChevronRight size={13} />
          </a>
        </div>

        <div className="mt-3">
          <BulletList items={service.items} dark={muted} />
        </div>
      </div>
    </article>
  );
}

function StarRow() {
  return (
    <div className="flex gap-1 text-[lab(65.6_23.4_15.3)]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={16} fill="currentColor" strokeWidth={1.6} />
      ))}
    </div>
  );
}

function FloatingSocials() {
  return (
    <div className="fixed right-4 bottom-4 z-[60] flex flex-col gap-3 md:bottom-auto md:top-1/2 md:-translate-y-1/2">
      {floatingLinks.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="float-social press-feedback group flex min-h-11 items-center justify-center gap-2 rounded-full border border-[oklab(0.640001_0.0534498_0.0272538_/_0.4)]/40 bg-[oklab(0.984998_0.00513196_0.00615114_/_0.96)]/95 px-3 py-2 text-[lab(15.5_11.5_10.8)] shadow-[rgba(71,37,42,0.16)_0px_18px_36px_-18px] md:justify-start md:px-4"
        >
          <Icon size={16} className="shrink-0 text-[lab(65.6_23.4_15.3)]" />
          <span className="hidden text-[11px] font-medium uppercase tracking-[1.8px] md:block">{label}</span>
        </a>
      ))}
    </div>
  );
}

function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = document.cookie
      .split("; ")
      .some((cookie) => cookie === `${cookieConsentName}=${cookieConsentValue}`);

    setIsVisible(!hasConsent);
  }, []);

  function acceptCookies() {
    document.cookie = `${cookieConsentName}=${cookieConsentValue}; path=/; max-age=${cookieConsentMaxAge}; SameSite=Lax; Secure`;
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <aside
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-4 bottom-4 z-[70] max-w-[620px] rounded-[18px] border border-[rgba(110,76,74,0.14)] bg-[rgba(250,243,239,0.97)] p-4 pr-5 text-[lab(15.5_11.5_10.8)] shadow-[rgba(71,37,42,0.18)_0px_24px_60px_-24px,rgba(255,255,255,0.85)_0px_1px_0px_inset] backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-auto sm:p-5"
      role="region"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md">
          <p
            id="cookie-consent-title"
            className="text-[11px] font-medium uppercase tracking-[2px] text-[lab(65.6_23.4_15.3)]"
          >
            Cookie notice
          </p>
          <p className="mt-2 text-[14px] leading-[22px] text-[oklab(0.260001_0.0475461_0.0154568_/_0.86)]/86">
            We use essential cookies to keep this site working properly and remember your preferences.
          </p>
        </div>

        <button
          type="button"
          onClick={acceptCookies}
          className="press-feedback inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[lab(65.6_23.4_15.3)] px-5 py-3 text-[12px] font-medium text-[lab(98.2272_1.72979_2.3571)] shadow-[rgba(71,37,42,0.16)_0px_18px_34px_-18px] transition-[background-color,transform,box-shadow] duration-200 ease-out hover:scale-[0.98] hover:bg-[lab(58_27_11)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[lab(65.6_23.4_15.3)] motion-reduce:transition-none"
        >
          Accept cookies
        </button>
      </div>
    </aside>
  );
}

export default function App() {
  const [activeSpread, setActiveSpread] = useState(0);
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [turning, setTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<"next" | "prev" | null>(null);
  const [displaySpread, setDisplaySpread] = useState(0);
  const rotation = useMotionValue(0);
  const turnOpacity = useMotionValue(1);
  const skewY = useTransform(rotation, [-180, -120, -60, 0, 60, 120, 180], [0, -2.2, -1.4, 0, 1.4, 2.2, 0]);
  const scaleX = useTransform(rotation, [-180, -120, -60, 0, 60, 120, 180], [1, 0.93, 0.96, 1, 0.96, 0.93, 1]);
  const translateY = useTransform(rotation, [-180, -120, -60, 0, 60, 120, 180], [0, -6, -3, 0, -3, -6, 0]);
  const rotateX = useTransform(rotation, [-180, -150, -90, -30, 0, 30, 90, 150, 180], [0, 1.5, 3, 1.5, 0, 1.5, 3, 1.5, 0]);
  const curlOpacity = useTransform(rotation, [-180, -120, -60, 0, 60, 120, 180], [0, 0.7, 1, 0, 1, 0.7, 0]);
  const pendingRef = useRef<number | null>(null);

  function goToSpread(nextIndex: number, direction: "next" | "prev") {
    if (turning || nextIndex === activeSpread) return;

    const target = direction === "next" ? -180 : 180;
    setTurning(true);
    setTurnDirection(direction);
    pendingRef.current = nextIndex;
    setDisplaySpread(activeSpread);
    turnOpacity.set(1);

    animate(rotation, target, {
      type: "spring",
      stiffness: 32,
      damping: 18,
      mass: 1.6,
      restDelta: 0.15,
      onComplete: () => {
        setDisplaySpread(nextIndex);
        animate(turnOpacity, 0, {
          type: "spring",
          stiffness: 60,
          damping: 20,
          mass: 0.8,
          onComplete: () => {
            setActiveSpread(nextIndex);
            setTurning(false);
            setTurnDirection(null);
            pendingRef.current = null;
            rotation.set(0);
          },
        });
      },
    });

    const unsubMid = rotation.on("change", (v) => {
      if (direction === "next" && v < -90 && pendingRef.current !== null) {
        setDisplaySpread(pendingRef.current);
        unsubMid();
      } else if (direction === "prev" && v > 90 && pendingRef.current !== null) {
        setDisplaySpread(pendingRef.current);
        unsubMid();
      }
    });
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!turning) {
        goToSpread((activeSpread + 1) % serviceSpreads.length, "next");
      }
    }, 5800);

    return () => window.clearInterval(timer);
  }, [activeSpread, turning]);

  function showPrevSpread() {
    goToSpread((activeSpread - 1 + serviceSpreads.length) % serviceSpreads.length, "prev");
  }

  function showNextSpread() {
    goToSpread((activeSpread + 1) % serviceSpreads.length, "next");
  }

  return (
    <div
      className="min-h-screen overflow-x-clip bg-[oklab(0.948_0.014_0.01)] text-black"
      style={{
        fontFamily: 'Montserrat, "Montserrat Fallback", sans-serif',
        textDecoration: "none",
      }}
    >
      <SEOHead
        title="Beauty Clinic Coral Gables"
        description="Marbrit Aesthetic in Coral Gables. Facial treatments, laser hair removal, Venus Legacy, PRP, exosomes, and advanced aesthetics. WhatsApp booking available."
        canonical="https://marbritaesthetic.com/"
        ogImage="https://marbritaesthetic.com/18055694ec56b4d9d105947db5edb916.png"
      />

      <div className="isolate relative bg-[linear-gradient(180deg,rgba(248,240,236,1)_0%,rgba(243,229,222,1)_33%,rgba(247,241,238,1)_100%)] text-[lab(15.5_11.5_10.8)]">
        <header className="fixed inset-x-0 top-0 z-[50] border-b border-[rgba(140,90,80,0.12)] bg-[rgba(250,243,239,0.92)] backdrop-blur-md">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
            <a href="#home" className="shrink-0">
              <BrandMark compact variant="dark" />
            </a>

            <nav className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[12px] font-medium uppercase tracking-[2.16px] text-[lab(15.5_11.5_10.8)] transition hover:text-[lab(54.66_30.32_6.37)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href={links.booking}
              target="_blank"
              rel="noreferrer"
              className="press-feedback inline-flex min-h-11 items-center gap-2 rounded-full bg-[lab(98.2272_1.72979_2.3571)] px-4 py-[10px] text-[12px] font-medium uppercase tracking-[1.92px] text-[lab(65.6_23.4_15.3)]"
            >
              <CalendarDays size={16} />
              Book
            </a>
          </div>
        </header>

        <main>
          <section
            id="home"
            className="relative flex min-h-[100svh] items-end overflow-hidden pt-28"
            style={{
              backgroundImage:
                "radial-gradient(circle at top left, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 38%), linear-gradient(180deg, rgba(245,231,223,1) 0%, rgba(238,220,212,1) 100%)",
            }}
          >
            <FlowerDecoration className="right-[-10rem] top-[-7rem] w-[540px] opacity-50 md:w-[720px]" />
            <FlowerDecoration className="bottom-[-8rem] left-[-8rem] w-[440px] opacity-20 md:w-[560px]" mirrored />

            <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-[1320px] gap-12 px-5 pb-18 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div className="relative z-10 max-w-xl lg:max-w-none">
                <p className="hero-animate-1 mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(110,76,74,0.18)] bg-white/75 px-4 py-[6px] text-[11.2px] font-medium uppercase tracking-[2.464px] text-[lab(65.6_23.4_15.3)] shadow-[rgba(71,37,42,0.08)_0px_16px_30px_-22px]">
                  <span className="block h-[6px] w-[6px] rounded-full bg-[lab(65.6_23.4_15.3)]"></span>
                  Coral Gables | Since 2018
                </p>

                <h1
                  className="hero-animate-2 max-w-[9ch] text-[72px] font-medium leading-[0.88] text-[lab(15.5_11.5_10.8)] sm:text-[88px] lg:text-[112px]"
                  style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
                >
                  Elevated beauty with{" "}
                  <span className="text-[lab(65.6_23.4_15.3)]" style={{ fontFamily: '"Pinyon Script", "Pinyon Script Fallback", cursive' }}>
                    Marbrit
                  </span>
                </h1>

                <p className="hero-animate-3 mt-6 max-w-lg text-[17px] leading-[29px] text-[lab(15.5_11.5_10.8)] lg:text-[18px] lg:leading-[31px]">
                  Facial care, laser hair removal, Venus Legacy, and advanced treatments shaped into a warmer, more direct premium experience.
                </p>

                <div className="hero-animate-4 mt-9 flex flex-wrap items-center gap-3">
                  {heroTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex min-h-10 items-center rounded-full border border-white/40 bg-white/55 px-4 py-2 text-[11px] font-medium uppercase tracking-[1.8px] text-[lab(65.6_23.4_15.3)] backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="hero-animate-5 mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={links.booking}
                    target="_blank"
                    rel="noreferrer"
                    className="press-feedback inline-flex min-h-11 items-center gap-2 rounded-full bg-[lab(65.6_23.4_15.3)] px-6 py-3 text-[12px] font-medium uppercase tracking-[1.92px] text-[lab(98.2272_1.72979_2.3571)] shadow-[rgba(71,37,42,0.18)_0px_22px_42px_-18px]"
                  >
                    <Ticket size={16} />
                    View booking
                  </a>
                  <a
                    href={links.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="press-feedback inline-flex min-h-11 items-center gap-2 rounded-full bg-[lab(98.2272_1.72979_2.3571)] px-6 py-3 text-[12px] font-medium uppercase tracking-[1.92px] text-[lab(65.6_23.4_15.3)] shadow-[rgba(71,37,42,0.08)_0px_16px_30px_-22px]"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </div>

                <div className="hero-animate-7 mt-10 flex items-center gap-2 text-[14px] leading-[20px] text-[lab(15.5_11.5_10.8)]">
                  <MapPin size={16} className="shrink-0 text-[lab(65.6_23.4_15.3)]" />
                  <span>3837 SW 8th St, Coral Gables, FL 33134</span>
                </div>
              </div>

              <div className="hero-animate-6 relative lg:ml-4 lg:mr-[-3vw]">
                <div className="img-zoom relative overflow-hidden rounded-[2.6rem] border border-white/60 bg-white/38 shadow-[rgba(71,37,42,0.18)_0px_40px_72px_-30px]">
                  <div className="absolute inset-x-0 top-0 z-10 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0))]"></div>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] lg:aspect-[0.8]">
                    <img
                      alt="Marbrit Aesthetic reception area with the founder inside the studio."
                      src={`${import.meta.env.BASE_URL}00b176f4983dbd724299ba99c91e36cf.jpg`}
                      className="absolute inset-0 h-full w-full object-cover"
                      width="800"
                      height="1000"
                    />
                  </div>
                </div>

                <div className="hero-animate-7 absolute -left-4 bottom-7 rounded-[1rem] border border-white/60 bg-white/78 px-6 py-4 shadow-[rgba(71,37,42,0.16)_0px_22px_42px_-24px] backdrop-blur-sm">
                  <p
                    className="text-[34px] font-semibold leading-[38px] text-[lab(65.6_23.4_15.3)]"
                    style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
                  >
                    2018
                  </p>
                  <p className="text-[12px] uppercase tracking-[2.16px] text-[lab(15.5_11.5_10.8)]">Coral Gables | Miami</p>
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="relative py-28">
            <FlowerDecoration className="left-[-6rem] top-6 w-[320px] opacity-16 md:w-[460px]" mirrored />
            <FlowerDecoration className="right-[-6rem] bottom-6 w-[300px] opacity-14 md:w-[420px]" />
            <FlowerDecoration className="left-[20%] bottom-[-4rem] w-[260px] opacity-12 md:w-[360px]" mirrored />
            <FlowerDecoration className="right-[15%] top-[-2rem] w-[240px] opacity-10 md:w-[340px]" />
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="reveal-up mb-14 max-w-3xl mx-auto text-center">
                <p className="mb-4 text-[12px] font-medium uppercase tracking-[3.36px] text-[lab(98.2272_1.72979_2.3571)]">Services</p>
                <h2
                  className="text-[44px] font-medium leading-[1.05] text-[lab(15.5_11.5_10.8)] sm:text-[54px]"
                  style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
                >
                  Real services, real images, <span className="text-[lab(65.6_23.4_15.3)]">cleaner language</span>.
                </h2>
                <p className="mt-5 mx-auto max-w-xl text-center leading-[26px] text-[lab(15.5_11.5_10.8)]">
                  Facials, advanced treatments, body contouring, and laser — each one clearly explained and easy to book.
                </p>
              </div>

              <div className="reveal-scale relative mx-auto max-w-7xl">
                {/* Desktop: Book animation */}
                <div className="relative hidden py-8 lg:block" style={{ height: "920px", perspective: "2800px" }}>
                  <div className="book-shell relative h-full shadow-[rgba(71,37,42,0.14)_0px_30px_56px_-26px]">
                    <div className="book-spine pointer-events-none absolute inset-y-[3%] left-1/2 z-20 w-8 -translate-x-1/2"></div>
                    <div className="book-spine-shadow-left"></div>
                    <div className="book-spine-shadow-right"></div>

                    <div className="grid h-full grid-cols-2">
                      {serviceSpreads[displaySpread].map((service, pageIndex) => (
                        <ServicePage
                          key={`base-${service.title}`}
                          service={service}
                          isLeft={pageIndex === 0}
                          onClick={turning ? undefined : pageIndex === 0 ? showPrevSpread : showNextSpread}
                        />
                      ))}
                    </div>

                    {turning && turnDirection !== null && (
                      <div className={`absolute inset-y-0 z-30 w-1/2 overflow-visible [perspective:2200px] ${turnDirection === "next" ? "right-0" : "left-0"}`}>
                        <motion.div
                          className="book-turn-page relative h-full w-full"
                          style={{
                            transformOrigin: turnDirection === "next" ? "left center" : "right center",
                            rotateY: rotation,
                            translateZ: 16,
                            skewY,
                            scaleX,
                            translateY,
                          }}
                        >
                          <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
                            <ServicePage
                              service={serviceSpreads[activeSpread][turnDirection === "next" ? 1 : 0]}
                              isLeft={turnDirection === "prev"}
                            />
                          </div>
                          <div
                            className="absolute inset-0"
                            style={{ backfaceVisibility: "hidden", transform: `rotateY(${turnDirection === "next" ? 180 : -180}deg)` }}
                          >
                            <ServicePage
                              service={serviceSpreads[pendingRef.current ?? activeSpread][turnDirection === "next" ? 0 : 1]}
                              isLeft={turnDirection === "next"}
                            />
                          </div>
                          <motion.div
                            className="pointer-events-none absolute inset-0 z-10"
                            style={{
                              opacity: curlOpacity,
                              background: turnDirection === "next"
                                ? "linear-gradient(90deg, rgba(42,24,20,0.22) 0%, rgba(42,24,20,0.08) 4%, rgba(42,24,20,0.02) 10%, transparent 22%, transparent 100%)"
                                : "linear-gradient(270deg, rgba(42,24,20,0.22) 0%, rgba(42,24,20,0.08) 4%, rgba(42,24,20,0.02) 10%, transparent 22%, transparent 100%)",
                            }}
                          />
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile: Simple card grid */}
                <div className="grid gap-6 lg:hidden">
                  {services.map((service) => (
                    <ServicePage
                      key={`mobile-${service.title}`}
                      service={service}
                      isLeft={false}
                      onClick={() => window.open(links.booking, "_blank")}
                    />
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <p className="text-[11px] uppercase tracking-[2px] text-[rgba(103,66,78,0.4)]">
                    <span className="hidden lg:inline">Click a page to turn</span>
                    <span className="lg:hidden">Tap a card to book</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="experience" className="relative bg-[rgba(255,250,247,0.72)] py-28 text-[lab(15.5_11.5_10.8)]">
            <FlowerDecoration className="right-[-9rem] top-[-4rem] w-[430px] opacity-18 md:w-[540px]" />
            <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
              <div className="reveal-left relative">
                <div className="img-zoom relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[rgba(110,76,74,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(244,225,217,0.7))] shadow-[rgba(71,37,42,0.12)_0px_26px_52px_-30px] lg:-rotate-[1.2deg]">
                  <img
                    alt="Marbrit holding treatment equipment inside the clinic."
                    src={`${import.meta.env.BASE_URL}2cabd1a73a125daaf5265831d93ad336.jpg`}
                    className="absolute inset-0 h-full w-full object-cover"
                    width="800"
                    height="1000"
                  />
                </div>
              </div>

              <div className="reveal-right">
                <p className="mb-4 text-[12px] font-medium uppercase tracking-[3.36px] text-[lab(98.2272_1.72979_2.3571)]">Why clients choose Marbrit</p>
                <h2
                  className="text-[44px] font-medium leading-[1.04] text-[lab(15.5_11.5_10.8)] sm:text-[54px]"
                  style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
                >
                  More credibility,{" "}
                  <span className="text-[lab(65.6_23.4_15.3)]" style={{ fontFamily: '"Pinyon Script", "Pinyon Script Fallback", cursive' }}>
                    less filler
                  </span>
                  .
                </h2>
                <p className="mt-5 max-w-lg leading-[26px] text-[lab(15.5_11.5_10.8)]">
                  Every treatment, every image, and every detail on this site comes directly from Marbrit's real practice — no stock photos, no invented promises.
                </p>

                <div className="mt-10 grid gap-5 sm:grid-cols-2">
                  {highlights.map((item, index) => (
                    <div
                      key={item.number}
                      className={[
                        "rounded-[1.45rem] p-6 shadow-[rgba(71,37,42,0.1)_0px_18px_34px_-24px]",
                        index === 1 ? "bg-[linear-gradient(180deg,rgba(176,112,104,1)_0%,rgba(150,88,80,1)_100%)] text-white lg:-translate-y-4" : "",
                        index === 2 ? "bg-[rgba(244,228,220,0.92)] lg:translate-y-4" : "",
                        index === 0 ? "border border-[rgba(110,76,74,0.12)] bg-white/90" : "",
                        index === 3 ? "border border-[rgba(110,76,74,0.12)] bg-white/84" : "",
                      ].join(" ")}
                    >
                      <span
                        className={`text-[28px] font-semibold leading-[32px] ${index === 1 ? "text-white/38" : "text-[rgba(103,66,78,0.28)]"
                          }`}
                        style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
                      >
                        {item.number}
                      </span>
                      <h3
                        className={`mt-3 text-[22px] font-semibold leading-[28px] ${index === 1 ? "text-white" : "text-[lab(15.5_11.5_10.8)]"
                          }`}
                        style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
                      >
                        <span className={index === 1 ? "text-[lab(81.9_11.2_9.8)]" : "text-[lab(65.6_23.4_15.3)]"}>{item.accent}</span> {item.title}
                      </h3>
                      <p className={`mt-2 text-[14px] leading-[23px] ${index === 1 ? "text-white/84" : "text-[lab(15.5_11.5_10.8)]"}`}>
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            id="treatments"
            className="relative overflow-hidden py-24 text-white"
            style={{
              backgroundImage:
                "linear-gradient(160deg, rgba(140,78,72,1) 0%, rgba(160,95,88,1) 40%, rgba(176,112,104,1) 100%)",
            }}
          >
            <FlowerDecoration className="left-[-8rem] top-[-5rem] w-[380px] opacity-10 md:w-[480px]" mirrored />
            <FlowerDecoration className="right-[-6rem] bottom-[-4rem] w-[320px] opacity-12 md:w-[420px]" />

            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="reveal-up mb-12 text-center">
                <p className="mb-4 flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[3.6px] text-white/50">
                  <span>Face</span>
                  <span className="h-[3px] w-[3px] rounded-full bg-white/25"></span>
                  <span>Body</span>
                  <span className="h-[3px] w-[3px] rounded-full bg-white/25"></span>
                  <span>Laser</span>
                </p>
                <h2
                  className="mx-auto max-w-[18ch] text-[40px] font-medium leading-[1.06] sm:text-[50px]"
                  style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
                >
                  Face and body care, now with a{" "}
                  <span className="text-[lab(81.9_11.2_9.8)]" style={{ fontFamily: '"Pinyon Script", "Pinyon Script Fallback", cursive' }}>
                    clearer read
                  </span>.
                </h2>
              </div>

              {/* Desktop */}
              <div className="mx-auto hidden max-w-6xl lg:block">
                <div className="flex items-center justify-center gap-4">

                  {/* Left cards — 2 */}
                  <div className="relative z-10 flex w-[200px] shrink-0 flex-col gap-5 -ml-[100px]">
                    {mapAreas.filter((_, i) => i < 2).map((area, i) => {
                      const isActive = activeArea === area.title;
                      return (
                        <div
                          key={area.title}
                          className={`relative ${i === 0 ? "rotate-[-2deg] translate-x-[150px]" : "rotate-[1.5deg] translate-x-[150px] -translate-y-1"}`}
                          onMouseEnter={() => setActiveArea(area.title)}
                          onMouseLeave={() => setActiveArea(null)}
                        >
                          <div className={`rounded-xl border p-4 transition-all duration-300 ${isActive ? "border-white/30 bg-white/18 shadow-[0_14px_28px_-14px_rgba(0,0,0,0.5)]" : "border-white/8 bg-white/5 hover:bg-white/8"}`}>
                            <h3 className="text-[16px] font-semibold leading-[20px] text-white" style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}>{area.title}</h3>
                            <ul className="mt-2 space-y-1">
                              {area.items.map((item) => (
                                <li key={item} className="flex items-center gap-1.5 text-[12px] leading-[17px] text-white/68">
                                  <span className={`h-[4px] w-[4px] rounded-full transition-colors duration-300 ${isActive ? "bg-[lab(81.9_11.2_9.8)]" : "bg-white/25"}`}></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="absolute top-1/2 -right-8 flex -translate-y-1/2 items-center">
                            <span className={`h-px transition-all duration-300 ${isActive ? "w-8 bg-white/55" : "w-5 bg-white/18"}`}></span>
                            <span className={`h-[6px] w-[6px] rounded-full border-[1.5px] transition-all duration-300 ${isActive ? "border-[lab(81.9_11.2_9.8)] bg-[lab(81.9_11.2_9.8)]/25" : "border-white/22 bg-transparent"}`}></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Body */}
                  <div className="relative z-0 shrink-0 overflow-hidden" style={{ height: "500px", width: "1000px" }} onMouseLeave={() => setActiveArea(null)}>
                    <img
                      alt="Body silhouette showing treatment zones."
                      src={`${import.meta.env.BASE_URL}54d6ea10685e2ab991c74e0e67248bdd.png`}
                      className="h-full w-full object-contain object-[center_18%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                    />
                    {mapAreas.map((area) => (
                      <button
                        key={`${area.title}-zone`}
                        type="button"
                        aria-label={area.title}
                        onMouseEnter={() => setActiveArea(area.title)}
                        className={`absolute rounded-full transition-all duration-300 ${activeArea === area.title ? "bg-[rgba(200,155,175,0.25)] ring-1 ring-[rgba(200,155,175,0.4)]" : "bg-transparent hover:bg-[rgba(200,155,175,0.08)]"} ${area.zoneClassName}`}
                      />
                    ))}
                  </div>

                  {/* Right cards — 3 */}
                  <div className="relative z-10 flex w-[200px] shrink-0 flex-col gap-5 -mr-[100px]">
                    {mapAreas.filter((_, i) => i >= 2).map((area, i) => {
                      const isActive = activeArea === area.title;
                      return (
                        <div
                          key={area.title}
                          className={`relative ${i === 0 ? "rotate-[2deg] translate-x-[-200px]" : i === 1 ? "rotate-[-1deg] translate-x-[-200px] translate-y-1" : "rotate-[1.8deg] translate-x-[-200px] -translate-y-1"}`}
                          onMouseEnter={() => setActiveArea(area.title)}
                          onMouseLeave={() => setActiveArea(null)}
                        >
                          <div className={`rounded-xl border p-4 transition-all duration-300 ${isActive ? "border-white/30 bg-white/18 shadow-[0_14px_28px_-14px_rgba(0,0,0,0.5)]" : "border-white/8 bg-white/5 hover:bg-white/8"}`}>
                            <h3 className="text-[16px] font-semibold leading-[20px] text-white" style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}>{area.title}</h3>
                            <ul className="mt-2 space-y-1">
                              {area.items.map((item) => (
                                <li key={item} className="flex items-center gap-1.5 text-[12px] leading-[17px] text-white/68">
                                  <span className={`h-[4px] w-[4px] rounded-full transition-colors duration-300 ${isActive ? "bg-[lab(81.9_11.2_9.8)]" : "bg-white/25"}`}></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="absolute top-1/2 -left-8 flex -translate-y-1/2 items-center">
                            <span className={`h-[6px] w-[6px] rounded-full border-[1.5px] transition-all duration-300 ${isActive ? "border-[lab(81.9_11.2_9.8)] bg-[lab(81.9_11.2_9.8)]/25" : "border-white/22 bg-transparent"}`}></span>
                            <span className={`h-px transition-all duration-300 ${isActive ? "w-8 bg-white/55" : "w-5 bg-white/18"}`}></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mobile */}
              <div className="grid gap-3 lg:hidden">
                {mapAreas.map((area) => (
                  <div key={area.title} className="rounded-2xl border border-white/10 bg-white/7 p-4 backdrop-blur-sm">
                    <h3 className="text-[18px] font-semibold leading-[24px] text-white" style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}>{area.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {area.items.map((item) => (
                        <span key={item} className="rounded-full border border-white/14 bg-white/8 px-3 py-1 text-[11px] uppercase tracking-[1.4px] text-white/78">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative bg-[rgba(255,250,247,0.74)] py-28 text-[lab(15.5_11.5_10.8)]">
            <FlowerDecoration className="right-[-7rem] bottom-[-6rem] w-[360px] opacity-16 md:w-[470px]" />
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="reveal-up mb-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-3xl">
                  <p className="mb-4 text-[12px] font-medium uppercase tracking-[3.36px] text-[lab(98.2272_1.72979_2.3571)]">A moment for yourself</p>
                  <h2
                    className="max-w-[14ch] text-[44px] font-medium leading-[1.02] text-[lab(15.5_11.5_10.8)] sm:max-w-none sm:text-[54px]"
                    style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
                  >
                    <span className="block">The studio, the specialist,</span>
                    <span className="block">and the real results.</span>
                  </h2>
                  <p className="mt-5 max-w-xl leading-[26px] text-[lab(15.5_11.5_10.8)]">
                    Real photos from the actual treatment rooms, equipment, and results — because trust starts with what you can actually see.
                  </p>
                </div>

                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="press-feedback inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-[rgba(110,76,74,0.16)] bg-white/82 px-5 py-3 text-[12px] font-medium uppercase tracking-[1.92px] text-[lab(15.5_11.5_10.8)] shadow-[rgba(71,37,42,0.08)_0px_18px_34px_-24px]"
                >
                  <Instagram size={16} />
                  @marbritaesthetics
                </a>
              </div>

              <div className="reveal-scale hidden gap-4 lg:grid lg:grid-cols-4 lg:auto-rows-[220px]">
                {gallery.map((item) => (
                  <div
                    key={item.src}
                    className="img-zoom relative overflow-hidden rounded-[1rem] border border-[rgba(110,76,74,0.12)] shadow-[rgba(71,37,42,0.08)_0px_18px_34px_-24px]"
                    style={{ gridArea: item.className }}
                  >
                    <img alt={item.alt} src={`${import.meta.env.BASE_URL}${item.src}`} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: item.position || "center" }} width="600" height="400" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,24,20,0.04),rgba(42,24,20,0.54))]"></div>
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/88 px-3 py-1 text-[10.4px] font-medium uppercase tracking-[1.664px] text-[lab(65.6_23.4_15.3)]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="reveal-scale grid gap-4 lg:hidden">
                <div className="img-zoom relative col-span-2 overflow-hidden rounded-[1rem] border border-[rgba(110,76,74,0.12)] shadow-[rgba(71,37,42,0.08)_0px_18px_34px_-24px] aspect-[4/5]">
                  <img alt={gallery[0].alt} src={`${import.meta.env.BASE_URL}${gallery[0].src}`} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: gallery[0].position || "center" }} width="600" height="800" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,24,20,0.04),rgba(42,24,20,0.54))]"></div>
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/88 px-3 py-1 text-[10.4px] font-medium uppercase tracking-[1.664px] text-[lab(65.6_23.4_15.3)]">
                    {gallery[0].label}
                  </span>
                </div>
                {gallery.slice(1, 3).map((item) => (
                  <div
                    key={item.src}
                    className="img-zoom relative overflow-hidden rounded-[1rem] border border-[rgba(110,76,74,0.12)] shadow-[rgba(71,37,42,0.08)_0px_18px_34px_-24px] aspect-square"
                  >
                    <img alt={item.alt} src={`${import.meta.env.BASE_URL}${item.src}`} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: item.position || "center" }} width="400" height="400" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,24,20,0.04),rgba(42,24,20,0.54))]"></div>
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/88 px-3 py-1 text-[10.4px] font-medium uppercase tracking-[1.664px] text-[lab(65.6_23.4_15.3)]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-4 lg:grid-cols-3">
                <div className="flex items-start gap-4 rounded-[1rem] border border-[rgba(110,76,74,0.12)] bg-white/84 p-6 shadow-[rgba(71,37,42,0.08)_0px_18px_34px_-24px]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[lab(81.9_11.2_9.8)] text-[lab(65.6_23.4_15.3)]">
                    <Sparkles size={18} />
                  </span>
                  <div>
                    <h3
                      className="text-[18px] font-semibold leading-[28px] text-[lab(15.5_11.5_10.8)]"
                      style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
                    >
                      Real treatment room
                    </h3>
                    <p className="mt-1 text-[14px] leading-[22.75px] text-[lab(15.5_11.5_10.8)]">Photos of the actual studio, equipment, and treatment rooms — what you see is what you get.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-[1rem] border border-[rgba(110,76,74,0.12)] bg-white/84 p-6 shadow-[rgba(71,37,42,0.08)_0px_18px_34px_-24px]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[lab(81.9_11.2_9.8)] text-[lab(65.6_23.4_15.3)]">
                    <MessageCircle size={18} />
                  </span>
                  <div>
                    <h3
                      className="text-[18px] font-semibold leading-[28px] text-[lab(15.5_11.5_10.8)]"
                      style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
                    >
                      Direct communication
                    </h3>
                    <p className="mt-1 text-[14px] leading-[22.75px] text-[lab(15.5_11.5_10.8)]">Send a message anytime — questions, appointment requests, or treatment guidance, all through WhatsApp.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-[1rem] border border-[rgba(110,76,74,0.12)] bg-white/84 p-6 shadow-[rgba(71,37,42,0.08)_0px_18px_34px_-24px]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[lab(81.9_11.2_9.8)] text-[lab(65.6_23.4_15.3)]">
                    <CalendarDays size={18} />
                  </span>
                  <div>
                    <h3
                      className="text-[18px] font-semibold leading-[28px] text-[lab(15.5_11.5_10.8)]"
                      style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
                    >
                      Easy online booking
                    </h3>
                    <p className="mt-1 text-[14px] leading-[22.75px] text-[lab(15.5_11.5_10.8)]">Choose your service, pick a time, and book directly through Fivease — fast and simple.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <a
                  href={links.booking}
                  target="_blank"
                  rel="noreferrer"
                  className="press-feedback inline-flex min-h-11 items-center gap-2 rounded-full bg-[lab(65.6_23.4_15.3)] px-7 py-4 text-[12px] font-medium uppercase tracking-[1.92px] text-[lab(98.2272_1.72979_2.3571)] shadow-[rgba(71,37,42,0.16)_0px_22px_42px_-20px]"
                >
                  Book an appointment
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </section>

          <section id="packages" className="relative py-28">
            <FlowerDecoration className="left-[-8rem] bottom-[-8rem] w-[340px] opacity-16 md:w-[470px]" mirrored />
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="reveal-up mx-auto mb-16 max-w-2xl text-center">
                <p className="mb-4 text-[12px] font-medium uppercase tracking-[3.36px] text-[rgba(96,74,74,0.72)]">Packages</p>
                <h2
                  className="text-[44px] font-medium leading-[1.05] text-[lab(15.5_11.5_10.8)] sm:text-[54px]"
                  style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
                >
                  Real packages,{" "}
                  <span className="text-[lab(65.6_23.4_15.3)]">real savings</span>.
                </h2>
                <p className="mt-5 leading-[26px] text-[lab(15.5_11.5_10.8)]">
                  Book a bundle of sessions and get more value out of each treatment. Packages are available for facials, laser, and body contouring.
                </p>
              </div>

              <div className="reveal-scale grid gap-6 lg:grid-cols-3 lg:items-start">
                {packages.map((pkg, index) => (
                  <article
                    key={pkg.title}
                    className={[
                      "card-lift relative flex flex-col rounded-[2rem] p-8 shadow-[rgba(71,37,42,0.14)_0px_28px_52px_-26px]",
                      pkg.featured
                        ? "bg-[linear-gradient(180deg,rgba(176,112,104,1)_0%,rgba(150,88,80,1)_100%)] text-[lab(98.2272_1.72979_2.3571)] lg:-translate-y-5 lg:scale-[1.02]"
                        : "border border-[rgba(110,76,74,0.12)] bg-white/86 text-[lab(15.5_11.5_10.8)]",
                      index === 0 ? "lg:rotate-[-2deg]" : "",
                      index === 2 ? "lg:rotate-[2deg] lg:translate-y-6" : "",
                    ].join(" ")}
                  >
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <p
                        className={`text-[12px] font-medium uppercase tracking-[2.4px] ${pkg.featured ? "text-white/72" : "text-[lab(65.6_23.4_15.3)]"
                          }`}
                      >
                        {pkg.eyebrow}
                      </p>
                      {pkg.featured ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/12 px-3 py-1 text-[10.4px] font-medium uppercase tracking-[1.456px]">
                          <Star size={12} fill="currentColor" strokeWidth={1.6} />
                          Popular
                        </span>
                      ) : null}
                    </div>

                    <h3
                      className="max-w-[12ch] text-[32px] font-semibold leading-[1.02]"
                      style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
                    >
                      {pkg.title}
                    </h3>

                    <div className="mt-5">
                      <BulletList items={pkg.items} dark={pkg.featured} />
                    </div>

                    <a
                      href={links.booking}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-[14px] text-[12px] font-medium uppercase tracking-[1.92px] ${pkg.featured
                        ? "bg-[lab(98.2272_1.72979_2.3571)] text-[lab(65.6_23.4_15.3)]"
                        : "bg-[lab(65.6_23.4_15.3)] text-[lab(98.2272_1.72979_2.3571)]"
                        }`}
                    >
                      View in booking
                      <ChevronRight size={16} />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="community"
            className="relative overflow-hidden py-28 text-[lab(98.2272_1.72979_2.3571)]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(140,78,72,1) 0%, rgba(160,95,88,1) 50%, rgba(176,112,104,1) 100%)",
            }}
          >
            <FlowerDecoration className="left-[-9rem] top-[-6rem] w-[420px] opacity-14 md:w-[540px]" mirrored />
            <FlowerDecoration className="right-[-8rem] bottom-[-8rem] w-[360px] opacity-12 md:w-[470px]" />

            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="reveal-up mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="mb-4 text-[12px] font-medium uppercase tracking-[3.36px] text-white/68">Reviews and community</p>
                  <h2
                    className="text-[44px] font-medium leading-[1.04] text-[lab(98.2272_1.72979_2.3571)] sm:text-[54px]"
                    style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
                  >
                    Trusted by real clients,{" "}
                    <span className="text-[lab(81.9_11.2_9.8)]">proven by results</span>.
                  </h2>
                </div>

                <a
                  href={links.reviews}
                  target="_blank"
                  rel="noreferrer"
                  className="press-feedback inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-white px-6 py-[14px] text-[12px] font-medium uppercase tracking-[1.92px] text-[lab(65.6_23.4_15.3)] shadow-[rgba(255,255,255,0.14)_0px_16px_34px_-24px]"
                >
                  Leave a review
                  <Star size={16} />
                </a>
              </div>

              <div className="reveal-scale grid gap-6 lg:grid-cols-3">
                {trustCards.map((item, index) => (
                  <figure
                    key={item.author}
                    className={[
                      "card-lift flex h-full flex-col rounded-[1.8rem] p-7 shadow-[rgba(25,12,16,0.24)_0px_24px_48px_-28px]",
                      index === 1
                        ? "border border-white/10 bg-[rgba(255,244,239,0.96)] text-[lab(15.5_11.5_10.8)]"
                        : "border border-white/12 bg-white/8 text-[lab(98.2272_1.72979_2.3571)] backdrop-blur-sm",
                    ].join(" ")}
                  >
                    <StarRow />
                    <blockquote
                      className={`mt-5 grow basis-0 text-[22px] leading-[34px] ${index === 1 ? "text-[lab(15.5_11.5_10.8)]" : "text-white/95"
                        }`}
                      style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
                    >
                      "{item.quote}"
                    </blockquote>
                    <figcaption
                      className={`mt-6 border-t pt-4 ${index === 1 ? "border-[rgba(71,37,42,0.12)]" : "border-white/12"
                        }`}
                    >
                      <p className="font-medium">{item.author}</p>
                      <p className={`text-[12px] uppercase tracking-[1.92px] ${index === 1 ? "text-[rgba(71,37,42,0.6)]" : "text-white/62"}`}>
                        {item.label}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="relative py-28">
            <FlowerDecoration className="right-[-7rem] top-[-5rem] w-[340px] opacity-16 md:w-[440px]" />
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div className="reveal-scale overflow-hidden rounded-[2rem] border border-[rgba(110,76,74,0.12)] bg-white/84 shadow-[rgba(71,37,42,0.12)_0px_28px_52px_-30px]">
                <div className="grid lg:grid-cols-2">
                  <div className="p-8 sm:p-12">
                    <p className="mb-4 text-[12px] font-medium uppercase tracking-[3.36px] text-[lab(98.2272_1.72979_2.3571)]">Visit us</p>
                    <h2
                      className="text-[44px] font-medium leading-[1.04] text-[lab(15.5_11.5_10.8)] sm:text-[54px]"
                      style={{ fontFamily: '"Cormorant Garamond", "Cormorant Garamond Fallback", serif' }}
                    >
                      Everything you need, in one place.
                    </h2>
                    <p className="mt-5 max-w-md leading-[26px] text-[lab(15.5_11.5_10.8)]">
                      Address, hours, phone, email, and payment methods — plus quick access to WhatsApp and online booking.
                    </p>

                    <dl className="mt-10 space-y-6">
                      <div className="flex gap-4">
                        <span className="mt-[2px] flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[lab(81.9_11.2_9.8)] text-[lab(65.6_23.4_15.3)]">
                          <MapPin size={18} />
                        </span>
                        <div>
                          <dt className="text-[12px] font-medium uppercase tracking-[2.16px] text-[lab(15.5_11.5_10.8)]">Address</dt>
                          <dd className="mt-1">
                            <a href={links.maps} target="_blank" rel="noreferrer">
                              3837 SW 8th St, Coral Gables, FL 33134
                            </a>
                          </dd>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <span className="mt-[2px] flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[lab(81.9_11.2_9.8)] text-[lab(65.6_23.4_15.3)]">
                          <Clock3 size={18} />
                        </span>
                        <div>
                          <dt className="text-[12px] font-medium uppercase tracking-[2.16px] text-[lab(15.5_11.5_10.8)]">Hours</dt>
                          <dd className="mt-1">Monday to Saturday | 10:00 AM - 5:00 PM</dd>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <span className="mt-[2px] flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[lab(81.9_11.2_9.8)] text-[lab(65.6_23.4_15.3)]">
                          <Phone size={18} />
                        </span>
                        <div>
                          <dt className="text-[12px] font-medium uppercase tracking-[2.16px] text-[lab(15.5_11.5_10.8)]">Phone</dt>
                          <dd className="mt-1">
                            <a href="tel:+13059221149">(305) 922-1149</a>
                          </dd>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <span className="mt-[2px] flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[lab(81.9_11.2_9.8)] text-[lab(65.6_23.4_15.3)]">
                          <MessageCircle size={18} />
                        </span>
                        <div>
                          <dt className="text-[12px] font-medium uppercase tracking-[2.16px] text-[lab(15.5_11.5_10.8)]">Email</dt>
                          <dd className="mt-1">
                            <a href="mailto:maralisbrito1224@gmail.com">maralisbrito1224@gmail.com</a>
                          </dd>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <span className="mt-[2px] flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[lab(81.9_11.2_9.8)] text-[lab(65.6_23.4_15.3)]">
                          <Sparkles size={18} />
                        </span>
                        <div>
                          <dt className="text-[12px] font-medium uppercase tracking-[2.16px] text-[lab(15.5_11.5_10.8)]">Payment methods</dt>
                          <dd className="mt-1">Zelle | Debit and credit cards | Cash</dd>
                        </div>
                      </div>
                    </dl>

                    <div className="mt-10 flex flex-wrap gap-3">
                      <a
                        href={links.booking}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[lab(65.6_23.4_15.3)] px-7 py-4 text-[12px] font-medium uppercase tracking-[1.92px] text-[lab(98.2272_1.72979_2.3571)]"
                      >
                        <CalendarDays size={16} />
                        Book
                      </a>
                      <a
                        href={links.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[rgba(110,76,74,0.12)] bg-[rgba(244,232,225,0.8)] px-7 py-4 text-[12px] font-medium uppercase tracking-[1.92px] text-[lab(15.5_11.5_10.8)]"
                      >
                        <MessageCircle size={16} />
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="relative min-h-[360px] border-t border-[rgba(110,76,74,0.12)] lg:min-h-full lg:border-l lg:border-t-0">
                    <iframe
                      title="Marbrit Aesthetic location in Coral Gables"
                      src="https://www.google.com/maps?q=3837+SW+8th+St,+Coral+Gables,+FL+33134&z=15&output=embed"
                      className="absolute inset-0 h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-[rgba(110,76,74,0.12)] bg-[rgba(250,243,239,0.82)]">
          <div className="mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.35fr_0.85fr_1fr_1.1fr]">
              <div>
                <BrandMark variant="dark" />
                <p className="mt-5 max-w-xs text-[14px] leading-[22.75px] text-[lab(15.5_11.5_10.8)]">
                  Facial and body aesthetics in Coral Gables with a stronger focus on real treatments, real imagery, and direct communication.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-[12px] uppercase tracking-[1.6px] text-[lab(15.5_11.5_10.8)]">
                  <span>Women-focused care</span>
                  <span>|</span>
                  <span>Since 2018</span>
                </div>
              </div>

              <div>
                <h3 className="text-[12px] font-medium uppercase tracking-[2.4px] text-[lab(15.5_11.5_10.8)]">Navigation</h3>
                <ul className="mt-5 space-y-3 text-[14px] leading-[20px] text-[oklab(0.260001_0.0475461_0.0154568_/_0.85)]/85">
                  {navItems.map((item) => (
                    <li key={item.href} className="list-none">
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-[12px] font-medium uppercase tracking-[2.4px] text-[lab(15.5_11.5_10.8)]">Signature services</h3>
                <ul className="mt-5 space-y-3 text-[14px] leading-[20px] text-[oklab(0.260001_0.0475461_0.0154568_/_0.85)]/85">
                  <li className="list-none">Hydrafacial and deep cleansing</li>
                  <li className="list-none">Laser hair removal</li>
                  <li className="list-none">Venus Legacy</li>
                  <li className="list-none">PRP and exosomes</li>
                  <li className="list-none">Body contouring packages</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[12px] font-medium uppercase tracking-[2.4px] text-[lab(15.5_11.5_10.8)]">Contact and links</h3>
                <ul className="mt-5 space-y-3 text-[14px] leading-[20px] text-[oklab(0.260001_0.0475461_0.0154568_/_0.85)]/85">
                  <li className="list-none">
                    <a href={links.maps} target="_blank" rel="noreferrer">
                      3837 SW 8th St, Coral Gables, FL 33134
                    </a>
                  </li>
                  <li className="list-none">
                    <a href="tel:+13059221149">(305) 922-1149</a>
                  </li>
                  <li className="list-none">
                    <a href="mailto:maralisbrito1224@gmail.com">maralisbrito1224@gmail.com</a>
                  </li>
                  <li className="list-none">Monday to Saturday | 10:00 AM - 5:00 PM</li>
                  <li className="list-none">
                    <a href={links.booking} target="_blank" rel="noreferrer">
                      Book with Fivease
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-6 border-t border-[rgba(110,76,74,0.12)] pt-8 text-[12px] leading-[16px] text-[lab(15.5_11.5_10.8)] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <p>Copyright 2026 Marbrit Aesthetic. All rights reserved.</p>
                <p>Coral Gables | Miami | Florida</p>
              </div>
              <div className="flex flex-col items-center gap-2 group">
                <span className="text-[10px] uppercase tracking-[2.4px] font-semibold text-[rgba(103,66,78,0.5)] group-hover:text-[lab(65.6_23.4_15.3)] transition-colors">
                  Marketing by
                </span>
                <a
                  href="https://crescendodigitalmarketingagency.com/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-transparent bg-[rgba(110,76,74,0.04)] p-2 transition-all hover:bg-[rgba(110,76,74,0.08)] hover:border-[rgba(110,76,74,0.12)]"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}cdm-marketing-logo.jpeg`}
                    alt="CDM Marketing"
                    className="h-9 w-auto rounded-lg shadow-sm grayscale group-hover:grayscale-0 transition-all"
                  />
                  <span className="text-[16px] font-bold bg-gradient-to-r from-[lab(15.5_11.5_10.8)] to-[rgba(103,66,78,0.6)] bg-clip-text text-transparent">
                    CDM
                  </span>
                </a>
              </div>
            </div>
          </div>
        </footer>

        <FloatingSocials />
        <CookieConsentBanner />
      </div>
    </div>
  );
}
