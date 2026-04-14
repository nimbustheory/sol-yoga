import { useState, useEffect, useCallback, createContext, useContext, useRef } from "react";
import {
  Home, Calendar, TrendingUp, Users, CreditCard, CalendarDays,
  Menu, X, Bell, Settings, Shield, ChevronRight, ChevronDown, Clock,
  ArrowUpRight, ArrowDownRight, Award, DollarSign, LayoutDashboard,
  UserCheck, Megaphone, LogOut, Plus, Edit3, Send, Check, Search, Info,
  CircleCheck, UserPlus, Heart, Flame, Star, Sun, Moon, Wind, Sparkles,
  Mountain, Leaf, Music, Gift, Share2, MapPin, Trash2, Volume2,
  Headphones, Eye, Waves, RefreshCw, Zap, Move, Anchor
} from "lucide-react";
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const STUDIO_CONFIG = {
  name: "SOL",
  subtitle: "YOGA",
  tagline: "Reconnect with your center.",
  logoMark: "S",
  description: "Heated yoga and sound baths on the shores of Lake Washington. Two studios plus seasonal Dock Yoga. Leschi, Seattle.",
  heroLine1: "RECONNECT",
  heroLine2: "WITH YOUR CENTER",
  address: { street: "200 Lake Washington Blvd, Ste 101", city: "Seattle", state: "WA", zip: "98122" },
  phone: "(612) 599-2211",
  email: "hello@solyogaseattle.com",
  neighborhood: "Leschi, Lake Washington",
  website: "https://www.solyogaseattle.com",
  social: { instagram: "@solyogaseattle" },
  locations: [{ name: "SOL Up", type: "yoga", capacity: 55 }, { name: "SOL Down", type: "yoga", capacity: 45 }, { name: "Dock", type: "outdoor", capacity: 30 }],
  theme: {
    accent:     { h: 172, s: 58, l: 39 },
    accentAlt:  { h: 38,  s: 65, l: 55 },
    warning:    { h: 12,  s: 60, l: 50 },
    primary:    { h: 200, s: 20, l: 10 },
    surface:    { h: 180, s: 8,  l: 97 },
    surfaceDim: { h: 175, s: 6,  l: 93 },
  },
  features: {
    workshops: true, retreats: false, soundBaths: true, teacherTrainings: true,
    practiceTracking: true, communityFeed: true, guestPasses: true, milestones: true,
    multiLocation: true,
  },
  classCapacity: 55,
  specialtyCapacity: 30,
};

const STUDIO_IMAGES = {
  home: "https://images.squarespace-cdn.com/content/v1/6746ec1b8f2ea01242a8c186/ca9fe41f-9200-4517-a4f8-b82a2a696cd5/Sol_Highres-8201.jpg?format=1500w",
  classes: "https://images.squarespace-cdn.com/content/v1/6746ec1b8f2ea01242a8c186/93f9e2af-7e73-4861-86a6-86bc5c8eaf78/Sol_Highres-8259.jpg?format=1500w",
  schedule: "https://images.squarespace-cdn.com/content/v1/6746ec1b8f2ea01242a8c186/ec15dba1-a6c8-4884-b312-e6fa1089b096/Sol_Highres-8134.jpg?format=1500w",
  practice: "https://images.squarespace-cdn.com/content/v1/6746ec1b8f2ea01242a8c186/4ae94bb0-f197-4370-bd2b-321b040ad613/Sol_Highres-8372.jpg?format=1500w",
  community: "https://images.squarespace-cdn.com/content/v1/6746ec1b8f2ea01242a8c186/aa3b9540-3d7c-4d5e-8985-da9e57af07d0/Sol_Highres-8753.jpg?format=1500w",
  events: "https://images.squarespace-cdn.com/content/v1/6746ec1b8f2ea01242a8c186/acf87d74-1e6a-4fe9-8255-f2bdb7212154/DSC_8575.jpg?format=1500w",
  teachersHero: "https://images.squarespace-cdn.com/content/v1/6746ec1b8f2ea01242a8c186/0fff95e1-244f-4a58-9b64-bc9d36f3a1f8/Sol_Highres-7199.jpg?format=1500w",
  pricingHero: "https://images.squarespace-cdn.com/content/v1/6746ec1b8f2ea01242a8c186/4aa86243-dfcb-4393-8a0d-d03d45d09344/Sol_Highres-8062.jpg?format=1500w",
};

const GRADIENTS = {
  home: `linear-gradient(135deg, hsl(172,58%,26%) 0%, hsl(200,20%,14%) 100%)`,
  classes: `linear-gradient(135deg, hsl(38,65%,32%) 0%, hsl(172,40%,20%) 100%)`,
  schedule: `linear-gradient(135deg, hsl(200,30%,22%) 0%, hsl(172,58%,18%) 100%)`,
  practice: `linear-gradient(135deg, hsl(172,40%,28%) 0%, hsl(200,20%,16%) 100%)`,
  community: `linear-gradient(135deg, hsl(38,65%,28%) 0%, hsl(200,20%,14%) 100%)`,
  events: `linear-gradient(135deg, hsl(12,60%,30%) 0%, hsl(172,40%,18%) 100%)`,
  membership: `linear-gradient(135deg, hsl(172,58%,24%) 0%, hsl(38,40%,22%) 100%)`,
};

const hsl = (c, a) => a !== undefined ? `hsla(${c.h},${c.s}%,${c.l}%,${a})` : `hsl(${c.h},${c.s}%,${c.l}%)`;
const hslShift = (c, lShift) => `hsl(${c.h},${c.s}%,${Math.max(0, Math.min(100, c.l + lShift))}%)`;

const T = {
  accent: hsl(STUDIO_CONFIG.theme.accent), accentDark: hslShift(STUDIO_CONFIG.theme.accent, -12),
  accentLight: hslShift(STUDIO_CONFIG.theme.accent, 30), accentGhost: hsl(STUDIO_CONFIG.theme.accent, 0.08),
  accentBorder: hsl(STUDIO_CONFIG.theme.accent, 0.18), success: hsl(STUDIO_CONFIG.theme.accentAlt),
  successGhost: hsl(STUDIO_CONFIG.theme.accentAlt, 0.08), successBorder: hsl(STUDIO_CONFIG.theme.accentAlt, 0.18),
  warning: hsl(STUDIO_CONFIG.theme.warning), warningGhost: hsl(STUDIO_CONFIG.theme.warning, 0.08),
  warningBorder: hsl(STUDIO_CONFIG.theme.warning, 0.2), bg: hsl(STUDIO_CONFIG.theme.primary),
  bgCard: hsl(STUDIO_CONFIG.theme.surface), bgDim: hsl(STUDIO_CONFIG.theme.surfaceDim),
  text: "#1a2028", textMuted: "#606878", textFaint: "#909aa8",
  border: "#d8dce4", borderLight: "#eaeef4",
};

const today = new Date().toISOString().split('T')[0];
const offsetDate = (d) => { const dt = new Date(); dt.setDate(dt.getDate() + d); return dt.toISOString().split('T')[0]; };
const formatDateShort = (s) => { const d = new Date(s + "T00:00:00"); return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }); };
const formatDateLong = (s) => { const d = new Date(s + "T00:00:00"); return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }); };
const fmtTime = (t) => { const [h, m] = t.split(":"); const hr = +h; return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`; };

const TEACHERS = [
  { id: "t1", firstName: "Sarah", lastName: "Goble", role: "Owner & Lead Teacher", certs: ["E-RYT 500", "Yoga School Collab Co-Founder"], specialties: ["SOL Vinyasa", "Slow Flow", "Teacher Training"], yearsTeaching: 20, bio: "With over 20 years of teaching experience, Sarah draws from her study of the history, philosophy and science of yoga. In class she keeps it real, sequencing movements and music intentionally with the occasional joke thrown in. She purchased the studio in 2019 and expanded to two spaces in 2024.", photo: "https://images.squarespace-cdn.com/content/v1/6746ec1b8f2ea01242a8c186/b0c87d56-f8e2-4c64-972d-9e45d1acc7e6/sarah.jpg?format=500w" },
  { id: "t2", firstName: "Lisa", lastName: "Black", role: "Teacher", certs: ["E-RYT 500", "Inversions Specialist"], specialties: ["Creative Vinyasa", "Inversions", "Workshops"], yearsTeaching: 20, bio: "Lisa brings powerful energy, expertise, and passion to teaching Creative Vinyasa Yoga. She teaches with love, humor, and intelligence. Her challenging and playful method empowers each person to discover their own potential.", photo: "https://images.squarespace-cdn.com/content/v1/6746ec1b8f2ea01242a8c186/ac59bfa6-72c1-41b7-8b8b-dccc3ed73307/LISA.jpg?format=500w" },
  { id: "t3", firstName: "Lex", lastName: "Torres", role: "Teacher", certs: ["RYT-200"], specialties: ["SOL Vinyasa", "Energetic Flow", "Self-Awareness"], yearsTeaching: 6, bio: "For Lex, SOL is her yoga home. She fell in love with a rhythmic physical practice and learned to take yoga out of the studio into her everyday life. She guides energetic flows that inspire curiosity and focus.", photo: "https://images.squarespace-cdn.com/content/v1/6746ec1b8f2ea01242a8c186/cc8fe116-f07c-4618-a7c6-1df6dcf74438/lex.jpg?format=500w" },
  { id: "t4", firstName: "Madzy", lastName: "Chen", role: "Teacher", certs: ["RYT-200"], specialties: ["Core-Based Movement", "Creative Flow", "Community"], yearsTeaching: 5, bio: "Madzy focuses on mindfully guiding students to maintain strong alignment and breath through spirited, core-based movement while introducing playful challenges. Creative movement, music, and mindset.", photo: "https://images.squarespace-cdn.com/content/v1/6746ec1b8f2ea01242a8c186/67dcf429-bb33-4592-9716-554744e44040/IMG_4273.jpg?format=500w" },
  { id: "t5", firstName: "Yvonne", lastName: "Park", role: "Teacher", certs: ["RYT-500", "Endurance Athlete Specialist"], specialties: ["Vinyasa", "Restorative", "Hatha"], yearsTeaching: 10, bio: "Yvonne began teaching in 2014 with a focus on building physical and emotional strength for endurance athletes. Her Vinyasa style centers on uniquely themed and creative classes that are challenging, energizing, and a little adventurous.", photo: "https://images.squarespace-cdn.com/content/v1/6746ec1b8f2ea01242a8c186/39f7c273-2a46-4151-9006-4f1b481ebd01/yvonne.jpg?format=500w" },
  { id: "t6", firstName: "Tai", lastName: "Williams", role: "Teacher", certs: ["RYT-200", "Accessibility Advocate"], specialties: ["Slow Flow", "Restorative", "Accessible Yoga"], yearsTeaching: 4, bio: "On a mission to help people slow down. Tai guides slow and mindful practices connecting mind, body, and breath. She creates an environment particularly welcoming to people new to yoga. Yoga is for every BODY.", photo: "https://images.squarespace-cdn.com/content/v1/6746ec1b8f2ea01242a8c186/92ba466f-59f3-4754-9fd4-3de49ad7fc06/tai.jpg?format=500w" },
  { id: "t7", firstName: "Cassidy", lastName: "Wells", role: "Teacher", certs: ["RYT-200", "15 Years Practice"], specialties: ["Vinyasa Flow", "Intentional Music", "Playful Movement"], yearsTeaching: 6, bio: "Cassidy creates a container for students to feel comfortable and connected to their truest selves. Her classes are playful, accessible, and deliberate using vinyasa flow, intentional music, and a bit of humor.", photo: "https://images.squarespace-cdn.com/content/v1/6746ec1b8f2ea01242a8c186/9c6b9218-b2b6-489d-970f-1ccab646faf1/cassidy.jpg?format=500w" },
];

const TODAYS_FOCUS = {
  id: "focus-today", date: today, name: "SOL Vinyasa (Up)", type: "VINYASA", style: "SOL Vinyasa", temp: "86\u00b0F", duration: 60,
  description: "A dynamic class synching movement with breath. Challenging, fluid, and athletic. Builds strength, flexibility, mental focus, and deep body awareness. SOL Up studio, street level.",
  intention: "Enter the sensory space. Let your inner knowledge guide when to challenge and when to add ease.",
  teacherTip: "The room is warmed to 86 degrees. Bring a towel and water. If the heat feels like too much, rest on your mat — that is still practicing.",
};

const PAST_PRACTICES = [
  { id: "p-y1", date: offsetDate(-1), name: "Slow Flow + Meditation (Down)", type: "SLOW", style: "Slow Flow + Med", temp: "86\u00b0F", duration: 75, description: "A slower practice winding down with 10 minutes of guided meditation in the quieter SOL Down space.", intention: "Slow down to find more time and space." },
  { id: "p-y2", date: offsetDate(-2), name: "Restorative (Down)", type: "RESTORE", style: "Restorative", temp: "Room Temp", duration: 60, description: "Props and longer holds invite the body to relax fully and release tension stored in the physical, emotional and energetic bodies.", intention: "Rest is not a luxury. It is essential." },
  { id: "p-y3", date: offsetDate(-3), name: "SOL Groove (Up)", type: "GROOVE", style: "SOL Groove", temp: "86\u00b0F", duration: 60, description: "Movement, yoga, Kriyas, and HIIT set to an upbeat musical soundtrack. Fluid movements, stretching, balance, mindfulness, and cleansing techniques.", intention: "Move and be moved." },
];

const UPCOMING_PRACTICE = { id: "p-tmrw", date: offsetDate(1), name: "Sound Bath (Down)", type: "SOUND", style: "Sound Bath", temp: "Room Temp", duration: 75, description: "Crystal and metal singing bowls, drums, chimes, and gongs. Bathed in healing vibrations that shift brainwaves and calm the nervous system. SOL Down, last Friday of the month.", intention: "Close your eyes. Let the vibrations find what needs to be released." };

const CLASSES_TODAY = [
  { id: "cl1", time: "06:00", type: "SOL Vinyasa", coach: "Sarah Goble", location: "SOL Up", capacity: 55, registered: 42, waitlist: 0 },
  { id: "cl2", time: "06:00", type: "Slow Flow", coach: "Tai Williams", location: "SOL Down", capacity: 45, registered: 32, waitlist: 0 },
  { id: "cl3", time: "08:00", type: "SOL Vinyasa", coach: "Lisa Black", location: "SOL Up", capacity: 55, registered: 52, waitlist: 3 },
  { id: "cl4", time: "09:30", type: "Vinyasa 1+", coach: "Lex Torres", location: "SOL Up", capacity: 55, registered: 38, waitlist: 0 },
  { id: "cl5", time: "09:30", type: "Restorative", coach: "Yvonne Park", location: "SOL Down", capacity: 45, registered: 28, waitlist: 0 },
  { id: "cl6", time: "12:00", type: "SOL Vinyasa", coach: "Madzy Chen", location: "SOL Up", capacity: 55, registered: 30, waitlist: 0 },
  { id: "cl7", time: "16:30", type: "SOL Groove", coach: "Cassidy Wells", location: "SOL Up", capacity: 55, registered: 48, waitlist: 0 },
  { id: "cl8", time: "17:45", type: "Slow Flow + Med", coach: "Sarah Goble", location: "SOL Down", capacity: 45, registered: 40, waitlist: 2 },
];

const WEEKLY_SCHEDULE = [
  { day: "Monday", classes: [{ time: "06:00", type: "SOL Vinyasa", coach: "Sarah", location: "SOL Up" }, { time: "06:00", type: "Slow Flow", coach: "Tai", location: "SOL Down" }, { time: "08:00", type: "SOL Vinyasa", coach: "Lisa", location: "SOL Up" }, { time: "09:30", type: "Vinyasa 1+", coach: "Lex", location: "SOL Up" }, { time: "09:30", type: "Restorative", coach: "Yvonne", location: "SOL Down" }, { time: "12:00", type: "SOL Vinyasa", coach: "Madzy", location: "SOL Up" }, { time: "16:30", type: "SOL Groove", coach: "Cassidy", location: "SOL Up" }, { time: "17:45", type: "Slow Flow + Med", coach: "Sarah", location: "SOL Down" }] },
  { day: "Tuesday", classes: [{ time: "06:00", type: "SOL Vinyasa", coach: "Sarah", location: "SOL Up" }, { time: "06:00", type: "Slow Flow", coach: "Tai", location: "SOL Down" }, { time: "08:00", type: "SOL Vinyasa", coach: "Lisa", location: "SOL Up" }, { time: "09:30", type: "Vinyasa 1+", coach: "Lex", location: "SOL Up" }, { time: "09:30", type: "Restorative", coach: "Yvonne", location: "SOL Down" }, { time: "12:00", type: "SOL Vinyasa", coach: "Madzy", location: "SOL Up" }, { time: "16:30", type: "SOL Groove", coach: "Cassidy", location: "SOL Up" }, { time: "17:45", type: "Slow Flow + Med", coach: "Sarah", location: "SOL Down" }] },
  { day: "Wednesday", classes: [{ time: "06:00", type: "SOL Vinyasa", coach: "Sarah", location: "SOL Up" }, { time: "06:00", type: "Slow Flow", coach: "Tai", location: "SOL Down" }, { time: "08:00", type: "SOL Vinyasa", coach: "Lisa", location: "SOL Up" }, { time: "09:30", type: "Vinyasa 1+", coach: "Lex", location: "SOL Up" }, { time: "09:30", type: "Restorative", coach: "Yvonne", location: "SOL Down" }, { time: "12:00", type: "SOL Vinyasa", coach: "Madzy", location: "SOL Up" }, { time: "16:30", type: "SOL Groove", coach: "Cassidy", location: "SOL Up" }, { time: "17:45", type: "Slow Flow + Med", coach: "Sarah", location: "SOL Down" }] },
  { day: "Thursday", classes: [{ time: "06:00", type: "SOL Vinyasa", coach: "Sarah", location: "SOL Up" }, { time: "06:00", type: "Slow Flow", coach: "Tai", location: "SOL Down" }, { time: "08:00", type: "SOL Vinyasa", coach: "Lisa", location: "SOL Up" }, { time: "09:30", type: "Vinyasa 1+", coach: "Lex", location: "SOL Up" }, { time: "09:30", type: "Restorative", coach: "Yvonne", location: "SOL Down" }, { time: "12:00", type: "SOL Vinyasa", coach: "Madzy", location: "SOL Up" }, { time: "16:30", type: "SOL Groove", coach: "Cassidy", location: "SOL Up" }, { time: "17:45", type: "Slow Flow + Med", coach: "Sarah", location: "SOL Down" }] },
  { day: "Friday", classes: [{ time: "06:00", type: "SOL Vinyasa", coach: "Sarah", location: "SOL Up" }, { time: "06:00", type: "Slow Flow", coach: "Tai", location: "SOL Down" }, { time: "08:00", type: "SOL Vinyasa", coach: "Lisa", location: "SOL Up" }, { time: "09:30", type: "Vinyasa 1+", coach: "Lex", location: "SOL Up" }, { time: "09:30", type: "Restorative", coach: "Yvonne", location: "SOL Down" }, { time: "12:00", type: "SOL Vinyasa", coach: "Madzy", location: "SOL Up" }, { time: "16:30", type: "SOL Groove", coach: "Cassidy", location: "SOL Up" }, { time: "17:45", type: "Slow Flow + Med", coach: "Sarah", location: "SOL Down" }] },
  { day: "Saturday", classes: [{ time: "08:00", type: "SOL Vinyasa", coach: "Sarah", location: "SOL Up" }, { time: "08:00", type: "Slow Flow", coach: "Tai", location: "SOL Down" }, { time: "09:30", type: "SOL Vinyasa", coach: "Lisa", location: "SOL Up" }, { time: "09:30", type: "Restorative", coach: "Yvonne", location: "SOL Down" }, { time: "11:00", type: "Vinyasa 1+", coach: "Madzy", location: "SOL Up" }, { time: "12:30", type: "Slow Flow + Med", coach: "Cassidy", location: "SOL Down" }] },
  { day: "Sunday", classes: [{ time: "08:00", type: "SOL Vinyasa", coach: "Sarah", location: "SOL Up" }, { time: "08:00", type: "Slow Flow", coach: "Tai", location: "SOL Down" }, { time: "09:30", type: "SOL Vinyasa", coach: "Lisa", location: "SOL Up" }, { time: "09:30", type: "Restorative", coach: "Yvonne", location: "SOL Down" }, { time: "11:00", type: "Vinyasa 1+", coach: "Madzy", location: "SOL Up" }, { time: "12:30", type: "Slow Flow + Med", coach: "Cassidy", location: "SOL Down" }] },
];

const COMMUNITY_FEED = [
  { id: "cf1", user: "Nadia K.", milestone: "First Dock Yoga", message: "Yoga on the water with Cascade views. Nothing compares. This is why I live in Seattle.", date: today, celebrations: 36 },
  { id: "cf2", user: "Owen T.", milestone: "200 Classes", message: "Two hundred practices at SOL. The community keeps me coming back. Sarah and Lisa have changed my life.", date: today, celebrations: 42 },
  { id: "cf3", user: "Mila R.", milestone: "30-Day Streak", message: "Thirty days straight between SOL Up and SOL Down. The 6am crew is my second family.", date: offsetDate(-1), celebrations: 24 },
  { id: "cf4", user: "Ethan P.", milestone: "First Sound Bath", message: "I did not know crystal bowls could do that to a person. Already registered for next month.", date: offsetDate(-2), celebrations: 18 },
];

const MILESTONE_BADGES = {
  "First Class": { icon: Leaf, color: T.accent },
  "10 Classes": { icon: Wind, color: T.accent },
  "50 Classes": { icon: Mountain, color: T.accent },
  "100 Classes": { icon: Star, color: T.success },
  "200 Classes": { icon: Award, color: T.success },
  "7-Day Streak": { icon: Flame, color: T.warning },
  "30-Day Streak": { icon: Sparkles, color: T.warning },
  "First Dock Yoga": { icon: Anchor, color: "#3b82f6" },
  "First Sound Bath": { icon: Headphones, color: "#8b5cf6" },
  "1 Year Member": { icon: Sun, color: T.success },
};

const EVENTS = [
  { id: "ev1", name: "Cosmic Flow: Galaxy Lighting Vinyasa", date: "2026-05-15", startTime: "19:00", type: "Special Class", description: "75-minute SOL Vinyasa under immersive galaxy lighting. Dynamic sequences with a curated cosmic playlist. Movement, mindfulness, and cosmic inspiration.", fee: 40, maxParticipants: 55, registered: 38, status: "Registration Open" },
  { id: "ev2", name: "SOL Sound Bath", date: "2026-04-24", startTime: "19:30", type: "Sound Bath", description: "Crystal and metal singing bowls, drums, chimes, and gongs in SOL Down. A deeply relaxing experience bathed in healing vibrations. Last Friday of the month.", fee: 50, maxParticipants: 45, registered: 40, status: "Almost Full" },
  { id: "ev3", name: "Inversions Workshop with Lisa Black", date: "2026-05-10", startTime: "13:00", type: "Workshop", description: "Learn essential foundational skills to safely practice tripod, handstand, forearm balance, headstand, and shoulder stand. No inversion experience required. Fun and safe approach.", fee: 55, maxParticipants: 30, registered: 22, status: "Registration Open" },
  { id: "ev4", name: "Dock Yoga Season Opens", date: "2026-06-01", startTime: "09:00", type: "Seasonal", description: "Yoga on the dock at Lake Washington returns for summer. Practice with Cascade Mountain views and water beneath you. The SOL experience at its most magical.", fee: 0, maxParticipants: 30, registered: 0, status: "Coming Soon" },
];

const MEMBERSHIP_TIERS = [
  { id: "m0", name: "New Student Special", type: "intro", price: 69, period: "21 days", features: ["21 days unlimited yoga", "All class types and studios", "Less than the cost of 2 drop-ins", "First-time students only"], popular: false },
  { id: "m1", name: "Drop-In", type: "drop-in", price: 35, period: "per class", features: ["Single class credit", "SOL Up, SOL Down, or Dock", "12-month expiration", "Shareable between students"], popular: false },
  { id: "m2", name: "10 Class Pass", type: "pack", price: 280, period: "10 classes", features: ["10 class credits", "12-month expiration", "Shareable between students", "All class types and studios"], popular: false },
  { id: "m3", name: "SOL Monthly", type: "unlimited", price: 155, period: "/month", features: ["Unlimited in-studio classes", "SOL Up, SOL Down, and Dock", "1 guest pass per month", "Freeze up to 3 months/year", "Cancel with 30 days notice"], popular: true },
  { id: "m4", name: "1 Year Unlimited", type: "unlimited", price: 1560, period: "/year", annualEquiv: 130, features: ["Unlimited all studios", "12 guest passes (1/month)", "Non-pausable, non-refundable", "Best monthly rate", "Free for special events (members only)"], popular: false },
];

const ANNOUNCEMENTS = [
  { id: "a1", title: "Dock Yoga Returns June 1st", message: "Yoga on Lake Washington with Cascade Mountain views. Seasonal passes available soon. The most beautiful way to practice.", type: "celebration", pinned: true },
  { id: "a2", title: "SOL Sound Bath: April 24th", message: "Last Friday of every month in SOL Down. Crystal bowls, drums, chimes. $50 event pass. Members free.", type: "info", pinned: false },
  { id: "a3", title: "Cosmic Flow: May 15th", message: "75-minute vinyasa under galaxy lighting with a curated cosmic playlist. Free for monthly and yearly members.", type: "celebration", pinned: false },
];

const MEMBERS_DATA = [
  { id: "mem1", name: "Nadia Kim", email: "nadia@email.com", membership: "SOL Monthly", status: "active", joined: "2023-05-01", checkIns: 342, lastVisit: today },
  { id: "mem2", name: "Owen Torres", email: "owen@email.com", membership: "1 Year Unlimited", status: "active", joined: "2024-01-15", checkIns: 286, lastVisit: offsetDate(-1) },
  { id: "mem3", name: "Mila Reeves", email: "mila@email.com", membership: "SOL Monthly", status: "active", joined: "2024-08-01", checkIns: 198, lastVisit: today },
  { id: "mem4", name: "Ethan Park", email: "ethan@email.com", membership: "10 Class Pass", status: "active", joined: "2026-02-10", checkIns: 5, lastVisit: offsetDate(-4) },
  { id: "mem5", name: "Lily Chen", email: "lily@email.com", membership: "SOL Monthly", status: "frozen", joined: "2024-06-01", checkIns: 124, lastVisit: offsetDate(-30) },
  { id: "mem6", name: "Jake Morrison", email: "jake@email.com", membership: "New Student Special", status: "active", joined: "2026-04-02", checkIns: 8, lastVisit: offsetDate(-1) },
  { id: "mem7", name: "Aisha Rahman", email: "aisha@email.com", membership: "1 Year Unlimited", status: "active", joined: "2023-09-01", checkIns: 468, lastVisit: today },
  { id: "mem8", name: "Sam Lee", email: "sam@email.com", membership: "SOL Monthly", status: "active", joined: "2025-01-15", checkIns: 86, lastVisit: offsetDate(-2) },
];

const ADMIN_METRICS = { activeMembers: 248, memberChange: 14, todayCheckIns: 86, weekCheckIns: 524, monthlyRevenue: 38400, revenueChange: 10.2, renewalRate: 90.1, workshopRevenue: 5200 };

const ADMIN_CHARTS = {
  attendance: [
    { day: "Mon", total: 88, avg: 11 }, { day: "Tue", total: 82, avg: 10 },
    { day: "Wed", total: 76, avg: 10 }, { day: "Thu", total: 84, avg: 11 },
    { day: "Fri", total: 78, avg: 10 }, { day: "Sat", total: 98, avg: 16 },
    { day: "Sun", total: 72, avg: 12 },
  ],
  revenue: [
    { month: "Sep", revenue: 30200 }, { month: "Oct", revenue: 31800 },
    { month: "Nov", revenue: 33400 }, { month: "Dec", revenue: 31200 },
    { month: "Jan", revenue: 35100 }, { month: "Feb", revenue: 37000 },
    { month: "Mar", revenue: 38400 },
  ],
  classPopularity: [
    { name: "6:00 AM", pct: 78 }, { name: "8:00 AM", pct: 95 },
    { name: "9:30 AM", pct: 72 }, { name: "12:00 PM", pct: 56 },
    { name: "4:30 PM", pct: 88 }, { name: "5:45 PM", pct: 92 },
  ],
  membershipBreakdown: [
    { name: "SOL Monthly", value: 108, color: T.accent },
    { name: "1 Year Unlimited", value: 52, color: T.success },
    { name: "10 Class Pass", value: 48, color: T.warning },
    { name: "Drop-In / Intro", value: 40, color: T.textMuted },
  ],
};

const AppContext = createContext(null);
//  SHNKED COMPONENTS
// ═══════════════════════════════════════════════════════════════

function PageHero({ image, gradient, title, subtitle }) {
  const [imgError, setImgError] = useState(false);
  const isUrl = image && (image.startsWith("http") || image.startsWith("/")) && !imgError;
  return (
    <div style={{ position: "relative", minHeight: 240, overflow: "hidden" }}>
      {isUrl ? (
        <img src={image} alt="" loading="lazy" onError={() => setImgError(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }} />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: gradient || GRADIENTS.home, filter: "brightness(0.7)" }} />
      )}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.45) 0%, rgba(0,0,0,.05) 50%, rgba(0,0,0,.15) 100%)" }} />
      <div style={{ position: "relative", padding: "80px 20px 24px", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 240 }}>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 34, fontWeight: 600, color: "#fff", margin: 0, lineHeight: 1.1 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: "rgba(255,255,255,.75)", margin: "6px 0 0", maxWidth: 280 }}>{subtitle}</p>}
      </div>
    </div>
  );
}

function TeacherAvatar({ teacher, size = 56 }) {
  const [imgError, setImgError] = useState(false);
  if (teacher.photo && !imgError) {
    return <img src={teacher.photo} alt={`${teacher.firstName} ${teacher.lastName}`} onError={() => setImgError(true)} style={{ width: size, height: size, borderRadius: size > 48 ? 14 : 10, objectFit: "cover", flexShrink: 0 }} />;
  }
  return (
    <div style={{ width: size, height: size, borderRadius: size > 48 ? 14 : 10, background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Instrument Serif', serif", fontSize: size * 0.38, color: "#fff", flexShrink: 0, fontWeight: 600 }}>
      {teacher.firstName[0]}{teacher.lastName[0]}
    </div>
  );
}

function SectionHeader({ title, linkText, linkPage }) {
  const { setPage } = useContext(AppContext);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, padding: "0 16px" }}>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, margin: 0, fontWeight: 600 }}>{title}</h2>
      {linkText && <button onClick={() => setPage(linkPage)} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: T.accent, background: "none", border: "none", cursor: "pointer" }}>{linkText} <ChevronRight size={16} /></button>}
    </div>
  );
}

function QuickAction({ icon: Icon, label, page, color }) {
  const { setPage } = useContext(AppContext);
  return (
    <button onClick={() => setPage(page)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", background: T.bgCard, borderRadius: 12, border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: color, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={20} color="#fff" /></div>
      <span style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{label}</span>
    </button>
  );
}

function PracticeCard({ practice, variant, expanded, onToggle }) {
  const isFeatured = variant === "featured";
  const isExpanded = expanded !== undefined ? expanded : isFeatured;
  const typeColors = { VINYASA: T.accent, YIN: "#8b5cf6", RESTORATIVE: T.success, LSD: "#8b5cf6", INVERSIONS: "#3b82f6", MELLOW: T.success, RESTORE: T.warning, SPECIAL: T.success };
  return (
    <div onClick={onToggle} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderLeft: `4px solid ${typeColors[practice.type] || T.accent}`, borderRadius: 12, padding: isFeatured ? "18px 18px" : "14px 16px", cursor: onToggle ? "pointer" : "default" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: isExpanded ? 10 : 0 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            {practice.date === today ? <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: T.accentGhost, color: T.accent }}>TODAY</span> : <span style={{ fontSize: 12, color: T.textMuted, fontWeight: 600 }}>{formatDateShort(practice.date)}</span>}
            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: `${typeColors[practice.type] || T.accent}12`, color: typeColors[practice.type] || T.accent }}>{practice.style}</span>
            {practice.duration && <span style={{ fontSize: 11, color: T.textFaint }}>{practice.duration} min</span>}
          </div>
          <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: isFeatured ? 26 : 20, margin: 0, color: T.text, fontWeight: 600 }}>{practice.name}</h3>
        </div>
        {onToggle && <ChevronDown size={18} color={T.textFaint} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />}
      </div>
      {isExpanded && (
        <div>
          {practice.temp && <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}><Sun size={14} color={T.success} /><span style={{ fontSize: 12, fontWeight: 600, color: T.success }}>{practice.temp}</span></div>}
          <p style={{ fontSize: 14, color: "#5a5040", lineHeight: 1.6, margin: "0 0 12px" }}>{practice.description}</p>
          {practice.intention && <div style={{ padding: "10px 12px", background: T.accentGhost, borderRadius: 8, marginBottom: 8 }}><span style={{ fontSize: 11, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: "0.05em" }}>Intention</span><p style={{ fontSize: 13, color: "#5a5040", margin: "4px 0 0", lineHeight: 1.5, fontStyle: "italic" }}>{practice.intention}</p></div>}
          {practice.teacherTip && <div style={{ padding: "10px 12px", background: T.successGhost, borderRadius: 8 }}><span style={{ fontSize: 11, fontWeight: 700, color: T.success, textTransform: "uppercase", letterSpacing: "0.05em" }}>Teacher Note</span><p style={{ fontSize: 13, color: "#5a5040", margin: "4px 0 0", lineHeight: 1.5 }}>{practice.teacherTip}</p></div>}
        </div>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, multiline }) {
  const style = { width: "100%", padding: "10px 12px", background: T.bgDim, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 14, color: T.text, outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      {multiline ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={{ ...style, resize: "vertical" }} /> : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={style} />}
    </div>
  );
}

function EmptyState({ icon: Icon, message, sub }) {
  return (
    <div style={{ textAlign: "center", padding: "32px 16px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12 }}>
      <Icon size={36} color={T.textFaint} style={{ margin: "0 auto 8px" }} /><p style={{ color: T.textMuted, margin: 0 }}>{message}</p>
      {sub && <p style={{ fontSize: 13, color: T.accent, margin: "6px 0 0" }}>{sub}</p>}
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div style={{ background: T.bgDim, borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 2px" }}>{label}</p>
      <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: T.text, margin: 0, fontWeight: 700 }}>{value}</p>
    </div>
  );
}

function AdminCard({ title, children }) {
  return (
    <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 18, boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
      <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, color: "#1a2028", margin: "0 0 14px", fontWeight: 600 }}>{title}</h3>
      {children}
    </div>
  );
}

function CrudBar({ onAdd, addLabel = "Add New" }) {
  return (
    <button onClick={onAdd} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
      <Plus size={16} /> {addLabel}
    </button>
  );
}

function CrudActions() {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      <button style={{ width: 32, height: 32, borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", color: "#6b7280", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Edit3 size={14} /></button>
      <button style={{ width: 32, height: 32, borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", color: "#6b7280", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={14} /></button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CONSUMER PAGES
// ═══════════════════════════════════════════════════════════════

function HomePage() {
  const { classRegistrations, openReservation, feedCelebrations, celebrateFeed } = useContext(AppContext);
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
  const upcoming = CLASSES_TODAY.filter(c => c.time >= currentTime).slice(0, 4);

  return (
    <div>
      <PageHero image={STUDIO_IMAGES.home} gradient={GRADIENTS.home} title={<>{STUDIO_CONFIG.heroLine1}<br/><span style={{ color: T.accent, fontStyle: "italic" }}>{STUDIO_CONFIG.heroLine2}</span></>} subtitle={STUDIO_CONFIG.description} />

      <section style={{ padding: "0 16px", marginTop: -16, position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {[
            { icon: Calendar, label: "Reserve", page: "schedule", color: T.accent },
            { icon: Flame, label: "Practice", page: "practice", color: T.success },
            { icon: Heart, label: "Community", page: "community", color: T.warning },
            { icon: Users, label: "Teachers", page: "teachers", color: T.textMuted },
          ].map(a => <QuickAction key={a.label} {...a} />)}
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <SectionHeader title="Today's Practice" linkText="All Classes" linkPage="classes" />
        <div style={{ padding: "0 16px" }}><PracticeCard practice={TODAYS_FOCUS} variant="featured" /></div>
      </section>

      <section style={{ marginTop: 28 }}>
        <SectionHeader title="Upcoming Classes" linkText="Full Schedule" linkPage="schedule" />
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
          {upcoming.length > 0 ? upcoming.map(c => {
            const regs = (classRegistrations[c.id] || 0);
            const totalReg = c.registered + regs;
            const isFull = totalReg >= c.capacity;
            return (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12 }}>
                <div style={{ textAlign: "center", minWidth: 48 }}>
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: T.text, fontWeight: 600 }}>{fmtTime(c.time).split(":")[0]}</span>
                  <span style={{ display: "block", fontSize: 10, color: T.textMuted }}>{fmtTime(c.time).slice(-5)}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: T.text, fontSize: 14, margin: 0 }}>{c.type}</p>
                  <p style={{ fontSize: 11, color: T.textMuted, margin: "2px 0 0" }}>{c.coach.split(" ")[0]} — {c.location}</p>
                </div>
                <div style={{ textAlign: "right", marginRight: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: isFull ? T.warning : totalReg >= c.capacity * 0.8 ? T.success : T.accent }}>{totalReg}/{c.capacity}</span>
                  {c.waitlist > 0 && <span style={{ display: "block", fontSize: 10, color: T.textFaint }}>+{c.waitlist} waitlist</span>}
                </div>
                <button onClick={() => openReservation({ ...c, date: today })} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: isFull ? T.bgDim : T.accent, color: isFull ? T.textMuted : "#fff" }}>
                  {isFull ? "Waitlist" : "Reserve"}
                </button>
              </div>
            );
          }) : <EmptyState icon={Moon} message="No more classes today" sub="See tomorrow's schedule" />}
        </div>
      </section>

      {STUDIO_CONFIG.features.communityFeed && (
        <section style={{ marginTop: 28 }}>
          <SectionHeader title="Community" linkText="View All" linkPage="community" />
          <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            {COMMUNITY_FEED.slice(0, 3).map(item => {
              const myC = feedCelebrations[item.id] || 0;
              return (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: `linear-gradient(135deg, ${T.successGhost}, transparent)`, border: `1px solid ${T.successBorder}`, borderRadius: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.success, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Sparkles size={18} color="#fff" /></div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 13, color: T.text, margin: 0 }}>{item.user} <span style={{ color: T.success }}>{item.milestone}</span></p>
                    <p style={{ fontSize: 11, color: "#6b6050", margin: "2px 0 0" }}>{item.message.length > 55 ? item.message.slice(0, 55) + "..." : item.message}</p>
                  </div>
                  <button onClick={() => celebrateFeed(item.id)} style={{ padding: 8, borderRadius: 8, border: "none", background: myC > 0 ? T.successGhost : "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    <Heart size={16} color={T.success} fill={myC > 0 ? T.success : "none"} /><span style={{ fontSize: 11, fontWeight: 600, color: T.success }}>{item.celebrations + myC}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {ANNOUNCEMENTS.length > 0 && (
        <section style={{ marginTop: 28, padding: "0 16px" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, margin: "0 0 12px", fontWeight: 600 }}>Announcements</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ANNOUNCEMENTS.map(a => (
              <div key={a.id} style={{ padding: "14px 16px", borderRadius: 12, borderLeft: `4px solid ${a.type === "celebration" ? T.accent : T.textMuted}`, background: a.type === "celebration" ? T.accentGhost : T.bgDim }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: 0 }}>{a.title}</h3>
                    <p style={{ fontSize: 12, color: "#6b6050", margin: "4px 0 0" }}>{a.message}</p>
                  </div>
                  {a.pinned && <span style={{ fontSize: 10, fontWeight: 600, color: T.accent, background: T.accentGhost, padding: "2px 8px", borderRadius: 99 }}>Pinned</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section style={{ padding: "16px 16px 8px", marginTop: 20 }}>
        <div style={{ background: `linear-gradient(165deg, ${T.bg}, hsl(30,20%,14%))`, borderRadius: 16, padding: "24px 20px", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.03, background: "radial-gradient(circle at 80% 30%, rgba(255,255,255,.4) 0%, transparent 50%)" }} />
          <div style={{ position: "relative" }}>
            <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, margin: "0 0 6px", fontWeight: 600 }}>New to SOL Yoga?</h3>
            <p style={{ fontSize: 13, color: "#b8a898", margin: "0 0 16px", lineHeight: 1.5 }}>Try us for 21 days unlimited for just $69. All studios. All class types. Lake Washington views.</p>
            <button onClick={() => {}} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontFamily: "'Instrument Serif', serif", fontSize: 15, cursor: "pointer", fontWeight: 600 }}>View Memberships <ChevronRight size={16} /></button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ClassesPage() {
  const [exp, setExp] = useState(null);
  const all = [TODAYS_FOCUS, ...PAST_PRACTICES, UPCOMING_PRACTICE].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.classes} gradient={GRADIENTS.classes} title="Classes" subtitle="Warm vinyasa, yin, restorative, sound baths, meditation and more" />
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {all.map(p => <PracticeCard key={p.id} practice={p} expanded={exp === p.id} onToggle={() => setExp(exp === p.id ? null : p.id)} />)}
      </div>
    </div>
  );
}

function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const { openReservation } = useContext(AppContext);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div>
      <PageHero image={STUDIO_IMAGES.schedule} gradient={GRADIENTS.schedule} title="Schedule" subtitle="Reserve your spot — classes fill up fast" />
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
          {days.map((d, i) => (
            <button key={d} onClick={() => setSelectedDay(i)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", background: selectedDay === i ? T.accent : T.bgDim, color: selectedDay === i ? "#fff" : T.textMuted }}>{d}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {WEEKLY_SCHEDULE[selectedDay]?.classes.map((cls, i) => {
            const isSpecial = cls.type.includes("Restorative") || cls.type.includes("Sound") || cls.type.includes("Med") || cls.type.includes("Groove");
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12 }}>
                <div style={{ textAlign: "center", minWidth: 54 }}>
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 16, color: T.text, fontWeight: 600 }}>{fmtTime(cls.time)}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <p style={{ fontWeight: 600, fontSize: 13, color: T.text, margin: 0 }}>{cls.type}</p>
                    {isSpecial && <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", padding: "1px 5px", borderRadius: 4, background: T.warningGhost, color: T.warning }}>SOL Down</span>}
                  </div>
                  <p style={{ fontSize: 11, color: T.textMuted, margin: "2px 0 0" }}>{cls.coach} — {cls.location}</p>
                </div>
                <button onClick={() => openReservation({ id: `sched-${selectedDay}-${i}`, time: cls.time, type: cls.type, coach: cls.coach || "TBD", location: cls.location, capacity: isSpecial ? STUDIO_CONFIG.specialtyCapacity : STUDIO_CONFIG.classCapacity, registered: Math.floor(Math.random() * 10) + 15, waitlist: 0, dayLabel: dayNames[selectedDay] })} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: T.accent, color: "#fff" }}>Reserve</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PracticePage() {
  const [activeTab, setActiveTab] = useState("log");
  const [reflection, setReflection] = useState({ energy: 4, focus: 4, notes: "" });
  const [saved, setSaved] = useState(null);
  const streakDays = 18; const totalClasses = 142;

  return (
    <div>
      <PageHero image={STUDIO_IMAGES.practice} gradient={GRADIENTS.practice} title="My Practice" subtitle="Track your journey and celebrate growth" />
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
          {[
            { icon: Flame, val: streakDays, label: "Day Streak", color: T.accent, ghost: T.accentGhost, bdr: T.accentBorder },
            { icon: Star, val: totalClasses, label: "Total Classes", color: T.success, ghost: T.successGhost, bdr: T.successBorder },
            { icon: Mountain, val: 8, label: "Milestones", color: T.warning, ghost: T.warningGhost, bdr: T.warningBorder },
          ].map((s, i) => (
            <div key={i} style={{ background: s.ghost, border: `1px solid ${s.bdr}`, borderRadius: 12, padding: "14px 10px", textAlign: "center" }}>
              <s.icon size={20} color={s.color} style={{ margin: "0 auto 4px" }} />
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, fontWeight: 700, color: T.text }}>{s.val}</div>
              <div style={{ fontSize: 10, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: T.bgDim, borderRadius: 10, padding: 4 }}>
          {[{ id: "log", label: "Reflection" }, { id: "milestones", label: "Milestones" }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: activeTab === tab.id ? T.bgCard : "transparent", color: activeTab === tab.id ? T.text : T.textMuted, boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,.06)" : "none" }}>{tab.label}</button>
          ))}
        </div>

        {activeTab === "log" && (
          <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}><Leaf size={18} color={T.accent} /><h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Post-Practice Reflection</h3></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Energy Level</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => setReflection({...reflection, energy: n})} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${reflection.energy >= n ? T.accent : T.border}`, background: reflection.energy >= n ? T.accentGhost : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {n <= 2 ? <Moon size={18} color={reflection.energy >= n ? T.accent : T.textFaint} /> : n <= 4 ? <Sun size={18} color={reflection.energy >= n ? T.accent : T.textFaint} /> : <Sparkles size={18} color={reflection.energy >= n ? T.accent : T.textFaint} />}
                    </button>
                  ))}
                </div>
              </div>
              <InputField label="Notes / Gratitude" value={reflection.notes} onChange={v => setReflection({...reflection, notes: v})} placeholder="What arose during practice today?" multiline />
              <button onClick={() => { setSaved(true); setTimeout(() => setSaved(null), 2000); setReflection({ energy: 4, focus: 4, notes: "" }); }} style={{ padding: "12px 0", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer", background: T.accent, color: "#fff", fontFamily: "'Instrument Serif', serif", fontSize: 17 }}>
                {saved ? <><Check size={16} style={{ display: "inline", verticalAlign: "middle" }} /> Saved</> : "Save Reflection"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "milestones" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {Object.entries(MILESTONE_BADGES).map(([name, badge], i) => {
              const earned = i < 8;
              return (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: earned ? T.bgCard : T.bgDim, border: `1px solid ${earned ? T.border : T.borderLight}`, borderRadius: 12, opacity: earned ? 1 : 0.5 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: earned ? `${badge.color}15` : T.bgDim, display: "flex", alignItems: "center", justifyContent: "center" }}><badge.icon size={22} color={earned ? badge.color : T.textFaint} /></div>
                  <div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: T.text }}>{name}</p><p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{earned ? "Earned" : "Keep practicing!"}</p></div>
                  {earned && <CircleCheck size={18} color={T.accent} />}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, margin: "0 0 12px", fontWeight: 600 }}>Recent Practice</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { date: today, name: "Warm Vinyasa Flow", result: "60 min", badge: "hot", icon: Sun, color: T.warning, ghost: T.warningGhost },
              { date: offsetDate(-1), name: "Yin Sound Bath", result: "75 min", badge: "sound", icon: Headphones, color: "#8b5cf6", ghost: "#8b5cf610" },
              { date: offsetDate(-2), name: "Restorative Yoga", result: "60 min", badge: "rest", icon: Moon, color: T.accent, ghost: T.accentGhost },
            ].map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: h.ghost, display: "flex", alignItems: "center", justifyContent: "center" }}><h.icon size={16} color={h.color} /></div>
                <div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: T.text }}>{h.name}</p><p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{formatDateShort(h.date)}</p></div>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.textMuted }}>{h.result}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityPage() {
  const { feedCelebrations, celebrateFeed } = useContext(AppContext);
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.community} gradient={GRADIENTS.community} title="Community" subtitle="Celebrate each other's practice" />
      <div style={{ padding: "16px 16px 0" }}>
        {STUDIO_CONFIG.features.guestPasses && (
          <div style={{ background: `linear-gradient(135deg, ${T.bg}, hsl(30,20%,14%))`, borderRadius: 14, padding: "18px", marginBottom: 20, color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}><Gift size={20} color={T.accent} /><h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, margin: 0, fontWeight: 600 }}>Guest Passes</h3></div>
            <p style={{ fontSize: 13, color: "#b8a898", margin: "0 0 14px", lineHeight: 1.5 }}>You have <span style={{ color: T.accent, fontWeight: 700 }}>2 guest passes</span> this month. Share the gift of practice.</p>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}><Share2 size={16} /> Share a Guest Pass</button>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {COMMUNITY_FEED.map(item => {
            const myC = feedCelebrations[item.id] || 0;
            return (
              <div key={item.id} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Instrument Serif', serif", fontSize: 16, color: "#fff", fontWeight: 700, flexShrink: 0 }}>{item.user[0]}</div>
                  <div><p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: T.text }}>{item.user}</p><p style={{ fontSize: 11, color: T.textMuted }}>{formatDateShort(item.date)}</p></div>
                  <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: T.successGhost, color: T.success }}>{item.milestone}</span>
                </div>
                <p style={{ fontSize: 13, color: "#4a4030", lineHeight: 1.5, margin: "0 0 12px" }}>{item.message}</p>
                <button onClick={() => celebrateFeed(item.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, border: `1px solid ${myC > 0 ? T.successBorder : T.border}`, background: myC > 0 ? T.successGhost : "transparent", cursor: "pointer" }}>
                  <Heart size={16} color={T.success} fill={myC > 0 ? T.success : "none"} /><span style={{ fontSize: 13, fontWeight: 600, color: T.success }}>{item.celebrations + myC}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TeachersPage() {
  const [expandedTeacher, setExpandedTeacher] = useState(null);
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.teachersHero} gradient={GRADIENTS.community} title="Teachers" subtitle="14 experienced instructors across two studios" />
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {TEACHERS.map(teacher => {
          const expanded = expandedTeacher === teacher.id;
          return (
            <div key={teacher.id} onClick={() => setExpandedTeacher(expanded ? null : teacher.id)} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px" }}>
                <TeacherAvatar teacher={teacher} size={56} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: T.text }}>{teacher.firstName} {teacher.lastName}</h3>
                  <p style={{ fontSize: 13, color: T.accent, fontWeight: 600, margin: "2px 0 0" }}>{teacher.role}</p>
                  <p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{teacher.yearsTeaching}+ years</p>
                </div>
                <ChevronDown size={18} color={T.textFaint} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </div>
              {expanded && (
                <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${T.borderLight}`, paddingTop: 14 }}>
                  <p style={{ fontSize: 13, color: "#5a5040", lineHeight: 1.6, margin: "0 0 12px" }}>{teacher.bio}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                    {teacher.specialties.map(s => <span key={s} style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: T.accentGhost, color: T.accent }}>{s}</span>)}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {teacher.certs.map(c => <span key={c} style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: T.bgDim, color: T.textMuted }}>{c}</span>)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MembershipPage() {
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.pricingHero} gradient={GRADIENTS.membership} title="Membership" subtitle="Find your path to practice" />
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {MEMBERSHIP_TIERS.map(tier => (
          <div key={tier.id} style={{ background: T.bgCard, border: `1px solid ${tier.popular ? T.accent : T.border}`, borderRadius: 14, padding: "20px 18px", position: "relative", overflow: "hidden" }}>
            {tier.popular && <div style={{ position: "absolute", top: 12, right: -28, background: T.accent, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 32px", transform: "rotate(45deg)", textTransform: "uppercase" }}>Popular</div>}
            <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, margin: "0 0 4px", color: T.text, fontWeight: 600 }}>{tier.name}</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 12 }}>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 38, color: T.accent, fontWeight: 700 }}>${tier.price}</span>
              <span style={{ fontSize: 13, color: T.textMuted }}>{tier.period}</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
              {tier.features.map((f, i) => <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", fontSize: 13, color: "#5a5040" }}><CircleCheck size={14} color={T.accent} style={{ flexShrink: 0 }} />{f}</li>)}
            </ul>
            <button style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Instrument Serif', serif", background: tier.popular ? T.accent : T.bg, color: "#fff" }}>Get Started</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsPage() {
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.events} gradient={GRADIENTS.events} title="Events" subtitle="Workshops, retreats, trainings, and special offerings" />
      <div style={{ padding: "16px 16px 0" }}>
        {EVENTS.map(ev => (
          <div key={ev.id} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
            <div style={{ background: `linear-gradient(135deg, ${T.bg}, hsl(30,20%,14%))`, padding: "20px 18px", color: "#fff" }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: T.accent }}>{ev.type}</span>
              <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, margin: "6px 0 4px", fontWeight: 600 }}>{ev.name}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "#b8a898" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar size={14} /> {formatDateShort(ev.date)}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={14} /> {fmtTime(ev.startTime)}</span>
              </div>
            </div>
            <div style={{ padding: "16px 18px" }}>
              <p style={{ fontSize: 13, color: "#5a5040", lineHeight: 1.6, margin: "0 0 14px" }}>{ev.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                <StatBox label="Price" value={ev.fee >= 1000 ? `$${(ev.fee/1000).toFixed(1)}k` : `$${ev.fee}`} />
                <StatBox label="Spots" value={`${ev.registered}/${ev.maxParticipants}`} />
              </div>
              <button style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Instrument Serif', serif", background: T.accent, color: "#fff" }}>Register Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ADMIN PAGES
// ═══════════════════════════════════════════════════════════════

function AdminDashboard() {
  const metrics = [
    { label: "Active Members", value: ADMIN_METRICS.activeMembers, change: `+${ADMIN_METRICS.memberChange}`, positive: true, icon: Users, color: T.accent },
    { label: "Today's Check-ins", value: ADMIN_METRICS.todayCheckIns, change: `${ADMIN_METRICS.weekCheckIns}/wk`, positive: true, icon: Calendar, color: T.success },
    { label: "Monthly Revenue", value: `$${ADMIN_METRICS.monthlyRevenue.toLocaleString()}`, change: `+${ADMIN_METRICS.revenueChange}%`, positive: true, icon: DollarSign, color: T.warning },
    { label: "Workshop Revenue", value: `$${ADMIN_METRICS.workshopRevenue.toLocaleString()}`, change: "+16 registrations", positive: true, icon: Award, color: "#8b5cf6" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div><h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: "#1a2028", margin: 0, fontWeight: 600 }}>Dashboard</h1><p style={{ fontSize: 13, color: "#6b7280", margin: "4px 0 0" }}>Welcome back. Here is what is happening at SOL Yoga.</p></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 18, boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `${m.color}14`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}><m.icon size={18} color={m.color} /></div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: "#1a2028", fontWeight: 700 }}>{m.value}</div>
            <span style={{ display: "flex", alignItems: "center", fontSize: 12, fontWeight: 600, color: m.positive ? "#16a34a" : "#dc2626", marginTop: 4 }}>{m.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {m.change}</span>
            <p style={{ fontSize: 13, color: "#6b7280", margin: "6px 0 0" }}>{m.label}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
        <AdminCard title="Weekly Attendance"><div style={{ height: 220 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={ADMIN_CHARTS.attendance}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /><XAxis dataKey="day" stroke="#6b7280" fontSize={12} /><YAxis stroke="#6b7280" fontSize={12} /><Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, color: "#1a2028" }} /><Bar dataKey="total" fill={T.accent} radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></AdminCard>
        <AdminCard title="Revenue Trend"><div style={{ height: 220 }}><ResponsiveContainer width="100%" height="100%"><AreaChart data={ADMIN_CHARTS.revenue}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /><XAxis dataKey="month" stroke="#6b7280" fontSize={12} /><YAxis stroke="#6b7280" fontSize={12} tickFormatter={v => `$${v / 1000}k`} /><Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, color: "#1a2028" }} formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]} /><defs><linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.accent} stopOpacity={0.3} /><stop offset="100%" stopColor={T.accent} stopOpacity={0} /></linearGradient></defs><Area type="monotone" dataKey="revenue" stroke={T.accent} fill="url(#revGrad)" /></AreaChart></ResponsiveContainer></div></AdminCard>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        <AdminCard title="Membership Breakdown">
          <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={ADMIN_CHARTS.membershipBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>{ADMIN_CHARTS.membershipBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, color: "#1a2028" }} /></PieChart></ResponsiveContainer></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>{ADMIN_CHARTS.membershipBreakdown.map((e, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: e.color }} /><span style={{ fontSize: 11, color: "#6b7280" }}>{e.name} ({e.value})</span></div>)}</div>
        </AdminCard>
        <AdminCard title="Class Popularity (% Capacity)"><div style={{ height: 210 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={ADMIN_CHARTS.classPopularity} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} /><XAxis type="number" stroke="#6b7280" fontSize={12} domain={[0, 100]} /><YAxis type="category" dataKey="name" stroke="#6b7280" fontSize={11} width={60} /><Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, color: "#1a2028" }} formatter={v => [`${v}%`, "Capacity"]} /><Bar dataKey="pct" fill={T.accent} radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer></div></AdminCard>
        <AdminCard title="Recent Activity">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[{ text: "New member signup", detail: "Jake Morrison - New Student", time: "5 min ago", color: T.accent },{ text: "Workshop registration", detail: "Inversions Workshop - Owen T.", time: "12 min ago", color: "#8b5cf6" },{ text: "Class waitlist full", detail: "8:00 AM SOL Vinyasa (Up)", time: "18 min ago", color: T.success },{ text: "Payment received", detail: "SOL Monthly - Nadia Kim", time: "25 min ago", color: T.warning },{ text: "Guest pass redeemed", detail: "Nadia Kim's guest", time: "1 hr ago", color: "#3b82f6" }].map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "6px 0" }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, marginTop: 6, flexShrink: 0 }} /><div style={{ flex: 1 }}><p style={{ fontSize: 13, color: "#374151", margin: 0 }}>{a.text}</p><p style={{ fontSize: 12, color: "#6b7280", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.detail}</p></div><span style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }}>{a.time}</span></div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

function AdminMembersPage() {
  const [search, setSearch] = useState(""); const [filter, setFilter] = useState("all");
  const filtered = MEMBERS_DATA.filter(m => { if (filter !== "all" && m.status !== filter) return false; if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false; return true; });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: "#1a2028", margin: 0, fontWeight: 600 }}>Members</h1><CrudBar addLabel="Add Member" /></div>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, position: "relative" }}><Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members..." style={{ width: "100%", padding: "10px 12px 10px 36px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, color: "#1a2028", fontSize: 13, outline: "none", boxSizing: "border-box" }} /></div>
        <div style={{ display: "flex", gap: 4 }}>{["all", "active", "frozen"].map(f => <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", background: filter === f ? T.accent : "#f3f4f6", color: filter === f ? "#fff" : "#6b7280" }}>{f}</button>)}</div>
      </div>
      <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>{["Member", "Plan", "Status", "Classes", "Actions"].map(h => <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#6b7280", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>)}</tr></thead>
          <tbody>{filtered.map(m => (
            <tr key={m.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: "12px 16px" }}><p style={{ color: "#1a2028", fontWeight: 600, margin: 0 }}>{m.name}</p><p style={{ color: "#9ca3af", fontSize: 12, margin: "2px 0 0" }}>{m.email}</p></td>
              <td style={{ padding: "12px 16px", color: "#374151", fontSize: 12 }}>{m.membership}</td>
              <td style={{ padding: "12px 16px" }}><span style={{ padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, textTransform: "capitalize", background: m.status === "active" ? `${T.accent}18` : `${T.warning}18`, color: m.status === "active" ? T.accent : T.warning }}>{m.status}</span></td>
              <td style={{ padding: "12px 16px", color: "#374151", fontFamily: "monospace" }}>{m.checkIns}</td>
              <td style={{ padding: "12px 16px" }}><CrudActions /></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function AdminSchedulePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: "#1a2028", margin: 0, fontWeight: 600 }}>Schedule</h1><CrudBar addLabel="Add Class" /></div>
      <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>{["Time", "Class", "Teacher", "Studio", "Capacity", "Actions"].map(h => <th key={h} style={{ padding: "12px 14px", textAlign: "left", color: "#6b7280", fontWeight: 600, fontSize: 11, textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>{CLASSES_TODAY.map(c => (
            <tr key={c.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: "12px 14px", color: "#1a2028", fontFamily: "monospace" }}>{fmtTime(c.time)}</td>
              <td style={{ padding: "12px 14px", color: "#374151", fontWeight: 600 }}>{c.type}</td>
              <td style={{ padding: "12px 14px", color: "#374151" }}>{c.coach}</td>
              <td style={{ padding: "12px 14px", color: "#6b7280", fontSize: 12 }}>{c.location}</td>
              <td style={{ padding: "12px 14px" }}><span style={{ fontFamily: "monospace", fontWeight: 600, color: c.registered >= c.capacity ? T.warning : T.accent }}>{c.registered}/{c.capacity}</span></td>
              <td style={{ padding: "12px 14px" }}><CrudActions /></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function AdminTeachersPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: "#1a2028", margin: 0, fontWeight: 600 }}>Teachers</h1><CrudBar addLabel="Add Teacher" /></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
        {TEACHERS.map(t => (
          <div key={t.id} style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 18, boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <TeacherAvatar teacher={t} size={48} />
              <div><h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a2028", margin: 0 }}>{t.firstName} {t.lastName}</h3><p style={{ fontSize: 12, color: T.accent, fontWeight: 600, margin: "2px 0 0" }}>{t.role}</p></div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>{t.certs.slice(0,3).map(c => <span key={c} style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: "#f3f4f6", color: "#6b7280" }}>{c}</span>)}</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", color: "#374151", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit</button>
              <button style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", color: "#374151", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Schedule</button>
              <button style={{ width: 36, padding: "8px 0", borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", color: "#6b7280", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminEventsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: "#1a2028", margin: 0, fontWeight: 600 }}>Events & Workshops</h1><CrudBar addLabel="New Event" /></div>
      {EVENTS.map(ev => (
        <div key={ev.id} style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 18, boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: `${T.accent}14`, color: T.accent }}>{ev.status}</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a2028", margin: "8px 0 4px" }}>{ev.name}</h3>
              <p style={{ fontSize: 13, color: "#6b7280" }}>{formatDateShort(ev.date)} — {ev.type} — ${ev.fee}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <div style={{ textAlign: "right" }}><div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: T.accent, fontWeight: 700 }}>{ev.registered}</div><p style={{ fontSize: 11, color: "#6b7280" }}>of {ev.maxParticipants}</p></div>
              <CrudActions />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminPricingPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: "#1a2028", margin: 0, fontWeight: 600 }}>Pricing & Memberships</h1><CrudBar addLabel="Add Tier" /></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {MEMBERSHIP_TIERS.map(tier => (
          <div key={tier.id} style={{ background: "#ffffff", border: `1px solid ${tier.popular ? T.accent : "#e5e7eb"}`, borderRadius: 12, padding: 18, boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
            {tier.popular && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: `${T.accent}14`, color: T.accent, marginBottom: 8, display: "inline-block" }}>POPULAR</span>}
            <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, color: "#1a2028", margin: "0 0 4px", fontWeight: 600 }}>{tier.name}</h3>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, color: T.accent, fontWeight: 700 }}>${tier.price}<span style={{ fontSize: 14, color: "#6b7280", fontWeight: 400 }}> {tier.period}</span></div>
            <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
              <button style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", color: "#374151", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit</button>
              <button style={{ width: 36, padding: "8px 0", borderRadius: 6, border: "1px solid #e5e7eb", background: "transparent", color: "#6b7280", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminBroadcastPage() {
  const [message, setMessage] = useState(""); const [audience, setAudience] = useState("all");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: "#1a2028", margin: 0, fontWeight: 600 }}>Broadcast</h1>
      <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 18, boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
        <h3 style={{ color: "#1a2028", fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>New Broadcast</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input placeholder="Title" style={{ padding: "10px 14px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, color: "#1a2028", fontSize: 13, outline: "none" }} />
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message..." rows={4} style={{ padding: "10px 14px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, color: "#1a2028", fontSize: 13, outline: "none", resize: "vertical", fontFamily: "inherit" }} />
          <div style={{ display: "flex", gap: 6 }}>{["all", "unlimited", "class cards", "teachers"].map(a => <button key={a} onClick={() => setAudience(a)} style={{ padding: "6px 12px", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", background: audience === a ? T.accent : "#f3f4f6", color: audience === a ? "#fff" : "#6b7280" }}>{a}</button>)}</div>
          <button style={{ padding: "10px 0", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Send size={16} /> Send Broadcast</button>
        </div>
      </div>
      <div><h3 style={{ color: "#1a2028", fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>Sent</h3>{ANNOUNCEMENTS.map(a => <div key={a.id} style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 14, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between" }}><h4 style={{ color: "#1a2028", margin: 0, fontSize: 14, fontWeight: 600 }}>{a.title}</h4><CrudActions /></div><p style={{ fontSize: 12, color: "#6b7280", margin: "4px 0 0" }}>{a.message}</p></div>)}</div>
    </div>
  );
}

function AdminSettingsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: "#1a2028", margin: 0, fontWeight: 600 }}>Studio Settings</h1>
      <AdminCard title="Studio Information">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[{ label: "Studio Name", value: STUDIO_CONFIG.name }, { label: "Address", value: STUDIO_CONFIG.address.street + ", " + STUDIO_CONFIG.address.city }, { label: "Phone", value: STUDIO_CONFIG.phone }, { label: "Email", value: STUDIO_CONFIG.email }].map((f, i) => (
            <div key={i}><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.label}</label><input defaultValue={f.value} style={{ width: "100%", padding: "10px 12px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, color: "#1a2028", fontSize: 13, outline: "none", boxSizing: "border-box" }} /></div>
          ))}
          <button style={{ padding: "10px 0", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Save Changes</button>
        </div>
      </AdminCard>
      <AdminCard title="Integrations">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {["MindBody API", "Stripe Payments", "Mailchimp", "Google Calendar"].map((name, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: "#f9fafb", borderRadius: 8 }}>
              <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{name}</span>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: i < 2 ? `${T.accent}14` : "#f3f4f6", color: i < 2 ? T.accent : "#6b7280" }}>{i < 2 ? "Connected" : "Connect"}</span>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MODALS
// ═══════════════════════════════════════════════════════════════

function ReservationModal({ classData, onConfirm, onClose }) {
  const [confirmed, setConfirmed] = useState(false);
  const [addedCal, setAddedCal] = useState(false);
  const isFull = classData.registered >= classData.capacity;
  const spotsLeft = classData.capacity - classData.registered;
  const dateLabel = classData.date ? formatDateShort(classData.date) : classData.dayLabel || "This week";

  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.bgCard, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 390, padding: "24px 20px 36px", animation: "slideUp 0.25s ease-out" }}>
        {!confirmed ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, margin: 0, color: T.text, fontWeight: 600 }}>Confirm Reservation</h2>
              <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} color={T.textMuted} /></button>
            </div>
            <div style={{ background: T.bgDim, borderRadius: 14, padding: "18px 16px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Calendar size={24} color="#fff" /></div>
                <div style={{ flex: 1 }}><h3 style={{ fontSize: 17, fontWeight: 700, color: T.text, margin: "0 0 3px" }}>{classData.type}</h3><p style={{ fontSize: 13, color: T.textMuted, margin: 0 }}>{classData.coach}</p></div>
              </div>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Clock size={16} color={T.textMuted} /><span style={{ fontSize: 14, color: T.text }}>{fmtTime(classData.time)}</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><CalendarDays size={16} color={T.textMuted} /><span style={{ fontSize: 14, color: T.text }}>{dateLabel}</span></div>
                {classData.location && <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Waves size={16} color={T.textMuted} /><span style={{ fontSize: 14, color: T.text }}>{classData.location}</span></div>}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Users size={16} color={T.textMuted} /><span style={{ fontSize: 14, color: isFull ? T.warning : spotsLeft <= 5 ? T.success : T.text }}>{isFull ? "Full - join the waitlist" : `${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} remaining`}</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><MapPin size={16} color={T.textMuted} /><span style={{ fontSize: 14, color: T.text }}>200 Lake Washington Blvd, Leschi</span></div>
              </div>
            </div>
            <div style={{ background: T.accentGhost, border: `1px solid ${T.accentBorder}`, borderRadius: 10, padding: "12px 14px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><Info size={16} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 700, color: T.accent }}>Reminders</span></div>
              <p style={{ fontSize: 12, color: "#5a5040", margin: "0 0 4px", lineHeight: 1.4 }}>Arrive 10-15 minutes early. Doors close when class begins.</p>
              <p style={{ fontSize: 12, color: "#5a5040", margin: "0 0 4px", lineHeight: 1.4 }}>$5 late-cancel or no-show fee (full classes only). Cancel at least 4 hours before class to avoid fees.</p>
              <p style={{ fontSize: 12, color: "#5a5040", margin: 0, lineHeight: 1.4 }}>Doors lock at class start. No late entry. Room warmed to 86 degrees..</p>
            </div>
            <button onClick={() => { setConfirmed(true); onConfirm(classData.id); }} style={{ width: "100%", padding: "14px 0", borderRadius: 10, border: "none", fontSize: 17, fontWeight: 700, cursor: "pointer", fontFamily: "'Instrument Serif', serif", background: isFull ? T.success : T.accent, color: "#fff", marginBottom: 8 }}>{isFull ? "Join Waitlist" : "Confirm Reservation"}</button>
            <button onClick={onClose} style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: `1px solid ${T.border}`, background: "transparent", fontSize: 14, fontWeight: 600, cursor: "pointer", color: T.textMuted }}>Cancel</button>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: T.accentGhost, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Check size={32} color={T.accent} /></div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, margin: "0 0 4px", color: T.text, fontWeight: 600 }}>{isFull ? "Added to Waitlist" : "You're In!"}</h2>
            <p style={{ fontSize: 14, color: T.textMuted, margin: "0 0 20px" }}>{classData.type} with {classData.coach.split(" ")[0]} at {fmtTime(classData.time)}. See you on the mat!</p>
            <div style={{ background: T.bgDim, borderRadius: 12, padding: "14px 16px", marginBottom: 16, textAlign: "left" }}>
              {[["Class", classData.type], ["Teacher", classData.coach], ["Time", fmtTime(classData.time)], ["Date", dateLabel]].map(([l, v], i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 3 ? 8 : 0 }}><span style={{ fontSize: 13, color: T.textMuted }}>{l}</span><span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{v}</span></div>)}
            </div>
            <button onClick={() => setAddedCal(true)} style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: `1px solid ${addedCal ? T.accentBorder : T.border}`, background: addedCal ? T.accentGhost : "transparent", fontSize: 14, fontWeight: 600, cursor: "pointer", color: addedCal ? T.accent : T.textMuted, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>{addedCal ? <><Check size={16} /> Added to Calendar</> : <><CalendarDays size={16} /> Add to Calendar</>}</button>
            <button onClick={onClose} style={{ width: "100%", padding: "14px 0", borderRadius: 10, border: "none", fontSize: 17, fontWeight: 700, cursor: "pointer", fontFamily: "'Instrument Serif', serif", background: T.accent, color: "#fff" }}>Done</button>
          </div>
        )}
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
}

function SettingsModal({ onClose }) {
  const [notifClass, setNotifClass] = useState(true); const [notifCommunity, setNotifCommunity] = useState(true); const [notifEvents, setNotifEvents] = useState(true);
  const Toggle = ({ active, onClick }) => <button onClick={onClick} style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", background: active ? T.accent : T.border, position: "relative" }}><div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: active ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,.15)" }} /></button>;
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.bgCard, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 390, maxHeight: "85vh", overflow: "auto", padding: "20px 20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, margin: 0, fontWeight: 600 }}>Settings</h2><button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} /></button></div>
        <div style={{ padding: "14px 0", borderBottom: `1px solid ${T.borderLight}` }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.textMuted, margin: "0 0 10px" }}>Profile</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Instrument Serif', serif", fontSize: 20, color: "#fff", fontWeight: 700 }}>NK</div>
            <div><p style={{ fontWeight: 700, margin: 0, fontSize: 15 }}>Nadia Kim</p><p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>SOL Monthly — Since May 2023</p></div>
          </div>
        </div>
        <div style={{ padding: "14px 0", borderBottom: `1px solid ${T.borderLight}` }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.textMuted, margin: "0 0 10px" }}>Notifications</h3>
          {[{ label: "Class Reminders", active: notifClass, toggle: () => setNotifClass(!notifClass) }, { label: "Community Milestones", active: notifCommunity, toggle: () => setNotifCommunity(!notifCommunity) }, { label: "Events & Workshops", active: notifEvents, toggle: () => setNotifEvents(!notifEvents) }].map(n => <div key={n.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}><span style={{ fontSize: 14, color: T.text }}>{n.label}</span><Toggle active={n.active} onClick={n.toggle} /></div>)}
        </div>
        <div style={{ padding: "14px 0" }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.textMuted, margin: "0 0 10px" }}>About</h3>
          <p style={{ fontSize: 13, color: T.textMuted, margin: 0 }}>{STUDIO_CONFIG.name} App v1.0</p>
          <p style={{ fontSize: 12, color: T.textFaint, margin: "4px 0 0" }}>Built by Lumi — LumiClass.App</p>
        </div>
        <button style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: T.accent, fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 8 }}>Sign Out</button>
      </div>
    </div>
  );
}

function NotificationsModal({ onClose }) {
  const notifications = [
    { id: 1, title: "Tomorrow: Slow Flow + Meditation", message: "75-minute slow flow ending with guided meditation in SOL Down.", type: "class", time: "2 hours ago", read: false },
    { id: 2, title: "New Milestone!", message: "Nadia K. completed first Dock Yoga. Celebrate together!", type: "community", time: "4 hours ago", read: false },
    { id: 3, title: "Class Reminder", message: "Reserved for 8:00 AM SOL Vinyasa (Up) with Nicole.", type: "class", time: "6 hours ago", read: true },
    { id: 4, title: "Dock Yoga Season Opening", message: "Yoga on Lake Washington returns June 1st. Limited spots.", type: "event", time: "1 day ago", read: true },
  ];
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.bgCard, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 390, maxHeight: "80vh", overflow: "auto", padding: "20px 20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, margin: 0, fontWeight: 600 }}>Notifications</h2><button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} /></button></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {notifications.map(n => (
            <div key={n.id} style={{ display: "flex", gap: 12, padding: "12px 14px", background: n.read ? "transparent" : T.accentGhost, border: `1px solid ${n.read ? T.borderLight : T.accentBorder}`, borderRadius: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: n.type === "class" ? T.accentGhost : n.type === "community" ? T.successGhost : T.warningGhost, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n.type === "class" ? <Calendar size={16} color={T.accent} /> : n.type === "community" ? <Heart size={16} color={T.success} /> : <CalendarDays size={16} color={T.warning} />}</div>
              <div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: n.read ? 500 : 700, color: T.text, margin: 0 }}>{n.title}</p><p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{n.message}</p><p style={{ fontSize: 11, color: T.textFaint, margin: "4px 0 0" }}>{n.time}</p></div>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.accent, marginTop: 4, flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [classRegistrations, setClassRegistrations] = useState({});
  const [feedCelebrations, setFeedCelebrations] = useState({});
  const [reservationClass, setReservationClass] = useState(null);
  const contentRef = useRef(null);

  const registerForClass = useCallback((classId) => { setClassRegistrations(prev => ({ ...prev, [classId]: (prev[classId] || 0) + 1 })); setReservationClass(null); }, []);
  const openReservation = useCallback((classData) => { setReservationClass(classData); }, []);
  const celebrateFeed = useCallback((feedId) => { setFeedCelebrations(prev => ({ ...prev, [feedId]: (prev[feedId] || 0) + 1 })); }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [page]);

  useEffect(() => {
    const handler = () => { setIsAdmin(true); setPage("admin-dashboard"); };
    window.addEventListener("open-admin", handler);
    return () => window.removeEventListener("open-admin", handler);
  }, []);

  const mainTabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "classes", label: "Classes", icon: Wind },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "practice", label: "Practice", icon: TrendingUp },
    { id: "more", label: "More", icon: Menu },
  ];
  const moreItems = [
    { id: "community", label: "Community", icon: Heart },
    { id: "teachers", label: "Teachers", icon: Users },
    { id: "membership", label: "Membership", icon: CreditCard },
    { id: "events", label: "Events", icon: CalendarDays },
  ];
  const adminTabs = [
    { id: "admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "admin-schedule", label: "Schedule", icon: Calendar },
    { id: "admin-members", label: "Members", icon: Users },
    { id: "admin-teachers", label: "Teachers", icon: UserCheck },
    { id: "admin-events", label: "Events", icon: CalendarDays },
    { id: "admin-pricing", label: "Pricing", icon: DollarSign },
    { id: "admin-broadcast", label: "Broadcast", icon: Megaphone },
    { id: "admin-settings", label: "Settings", icon: Settings },
  ];

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage />;
      case "classes": return <ClassesPage />;
      case "schedule": return <SchedulePage />;
      case "practice": return <PracticePage />;
      case "community": return <CommunityPage />;
      case "teachers": return <TeachersPage />;
      case "membership": return <MembershipPage />;
      case "events": return <EventsPage />;
      case "admin-dashboard": return <AdminDashboard />;
      case "admin-schedule": return <AdminSchedulePage />;
      case "admin-members": return <AdminMembersPage />;
      case "admin-teachers": return <AdminTeachersPage />;
      case "admin-events": return <AdminEventsPage />;
      case "admin-pricing": return <AdminPricingPage />;
      case "admin-broadcast": return <AdminBroadcastPage />;
      case "admin-settings": return <AdminSettingsPage />;
      default: return <HomePage />;
    }
  };

  const isMoreActive = moreItems.some(item => item.id === page);
  const unreadCount = 2;

  if (isAdmin) {
    return (
      <AppContext.Provider value={{ page, setPage, classRegistrations, registerForClass, openReservation, feedCelebrations, celebrateFeed }}>
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", fontFamily: "'Hanken Grotesk', system-ui, sans-serif", background: "#f5f5f7" }}>
          <aside style={{ width: 230, background: "#ffffff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", flexShrink: 0 }}>
            <div style={{ padding: "16px 14px", borderBottom: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Instrument Serif', serif", fontSize: 14, color: "#fff", fontWeight: 700 }}>{STUDIO_CONFIG.logoMark}</div>
                <div><span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 16, display: "block", lineHeight: 1, fontWeight: 600, color: "#1a2028" }}>{STUDIO_CONFIG.name}</span><span style={{ fontSize: 8, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.15em" }}>Admin</span></div>
              </div>
            </div>
            <nav style={{ flex: 1, padding: "8px 6px", overflow: "auto" }}>
              {adminTabs.map(tab => {
                const active = page === tab.id;
                return <button key={tab.id} onClick={() => setPage(tab.id)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", borderRadius: 8, border: "none", background: active ? `${T.accent}14` : "transparent", color: active ? T.accent : "#6b7280", fontSize: 13, fontWeight: active ? 600 : 400, cursor: "pointer", marginBottom: 2, textAlign: "left" }}><tab.icon size={16} /><span>{tab.label}</span></button>;
              })}
            </nav>
            <div style={{ borderTop: "1px solid #e5e7eb", padding: "8px 6px" }}>
              <button onClick={() => { setIsAdmin(false); setPage("home"); }} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", borderRadius: 8, border: "none", background: "transparent", color: "#6b7280", fontSize: 13, cursor: "pointer", textAlign: "left" }}><LogOut size={16} /><span>Exit Admin</span></button>
            </div>
          </aside>
          <main style={{ flex: 1, padding: 24, overflow: "auto" }}>{renderPage()}</main>
        </div>
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={{ page, setPage, classRegistrations, registerForClass, openReservation, feedCelebrations, celebrateFeed }}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: T.bgDim, fontFamily: "'Hanken Grotesk', system-ui, sans-serif", position: "relative" }}>
        <header style={{ flexShrink: 0, background: T.bg, color: "#fff", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Instrument Serif', serif", fontSize: 14, color: "#fff", fontWeight: 700 }}>{STUDIO_CONFIG.logoMark}</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, lineHeight: 1, fontWeight: 600 }}>{STUDIO_CONFIG.name}</span>
              <span style={{ fontSize: 8, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.15em" }}>{STUDIO_CONFIG.subtitle}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <button onClick={() => { setIsAdmin(true); setPage("admin-dashboard"); }} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: T.accent }}><Shield size={20} /></button>
            <button onClick={() => setShowNotifications(true)} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#fff", position: "relative" }}><Bell size={20} />{unreadCount > 0 && <span style={{ position: "absolute", top: 4, right: 4, width: 14, height: 14, borderRadius: "50%", background: T.accent, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>{unreadCount}</span>}</button>
            <button onClick={() => setShowSettings(true)} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#fff" }}><Settings size={20} /></button>
          </div>
        </header>

        <main ref={contentRef} style={{ flex: 1, overflowY: "auto", paddingBottom: 70 }}>{renderPage()}</main>

        {showMore && (
          <div onClick={() => setShowMore(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 40 }}>
            <div onClick={e => e.stopPropagation()} style={{ position: "absolute", bottom: 68, left: 16, right: 16, background: T.bgCard, borderRadius: 16, padding: "14px 12px", boxShadow: "0 8px 32px rgba(0,0,0,.15)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 6px 8px" }}><span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, fontWeight: 600 }}>More</span><button onClick={() => setShowMore(false)} style={{ padding: 4, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer" }}><X size={18} color={T.textMuted} /></button></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {moreItems.map(item => {
                  const active = page === item.id;
                  return <button key={item.id} onClick={() => { setPage(item.id); setShowMore(false); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", borderRadius: 10, border: "none", cursor: "pointer", background: active ? T.accentGhost : T.bgDim, color: active ? T.accent : T.textMuted }}><item.icon size={22} /><span style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</span></button>;
                })}
              </div>
            </div>
          </div>
        )}

        <nav style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: T.bgCard, borderTop: `1px solid ${T.border}`, zIndex: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-around", padding: "6px 4px 10px" }}>
            {mainTabs.map(tab => {
              const active = tab.id === "more" ? (isMoreActive || showMore) : page === tab.id;
              return (
                <button key={tab.id} onClick={() => tab.id === "more" ? setShowMore(true) : setPage(tab.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 12px", borderRadius: 10, border: "none", background: "transparent", cursor: "pointer", color: active ? T.accent : T.textFaint }}>
                  <tab.icon size={20} strokeWidth={active ? 2.5 : 2} /><span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
        {showNotifications && <NotificationsModal onClose={() => setShowNotifications(false)} />}
        {reservationClass && <ReservationModal classData={reservationClass} onConfirm={registerForClass} onClose={() => setReservationClass(null)} />}
      </div>
    </AppContext.Provider>
  );
}
