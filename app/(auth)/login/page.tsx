"use client";
import { useRouter } from "next/navigation";
import {
  Shield,
  Building2,
  Headphones,
  Truck as TruckIcon,
  Calculator,
  Users as UsersIcon,
  Mail,
  Lock,
  ArrowRight,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/store/auth";
import { DEFAULT_LANDING } from "@/lib/auth/roles";
import { Logo } from "@/components/Brand/Logo";
import type { Role } from "@/lib/types";
import { toast } from "sonner";

interface RoleCard {
  role: Role;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  email: string;
  password: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ROLE_CARDS: RoleCard[] = [
  {
    role: "super_admin",
    number: "01",
    title: "SUPER ADMIN",
    subtitle: "Full system access",
    description: "Complete access to all companies, settings, users, reports and system management.",
    email: "admin@mtstrucking.demo",
    password: "Admin123!",
    icon: Shield,
  },
  {
    role: "company_admin",
    number: "02",
    title: "COMPANY ADMIN",
    subtitle: "Company management",
    description: "Manage fleet, drivers, trips, maintenance, expenses, payroll and reports.",
    email: "operations@mtstrucking.demo",
    password: "Ops123!",
    icon: Building2,
  },
  {
    role: "dispatcher",
    number: "03",
    title: "DISPATCHER",
    subtitle: "Trip & dispatch management",
    description: "Create trips, assign drivers and vehicles, monitor deliveries in real-time.",
    email: "dispatcher@mtstrucking.demo",
    password: "Dispatch123!",
    icon: Headphones,
  },
  {
    role: "driver",
    number: "04",
    title: "DRIVER",
    subtitle: "Driver mobile access",
    description: "View assigned trips, update delivery status and upload proof of delivery.",
    email: "driver.mark@mtstrucking.demo",
    password: "Driver123!",
    icon: TruckIcon,
  },
  {
    role: "accounting",
    number: "05",
    title: "ACCOUNTING / HR",
    subtitle: "Payroll & financial management",
    description: "Manage payroll, attendance, expenses, deductions and financial reports.",
    email: "finance@mtstrucking.demo",
    password: "Finance123!",
    icon: Calculator,
  },
  {
    role: "client",
    number: "06",
    title: "CLIENT PORTAL",
    subtitle: "Client shipment visibility",
    description: "Track deliveries, view invoices and download proof of delivery documents.",
    email: "client@abcconstruction.demo",
    password: "Client123!",
    icon: UsersIcon,
  },
];

const PLATFORM_FEATURES = [
  "Real-time GPS fleet tracking & monitoring",
  "Full trip dispatch & driver management",
  "Automated payroll computation & payslips",
  "Billing, invoicing & client portal access",
  "Preventive maintenance scheduling (PMS)",
  "Reports & AI-powered analytics engine",
];

const PLATFORM_STATS = [
  { value: "10", label: "Fleet Vehicles" },
  { value: "10", label: "Active Drivers" },
  { value: "20+", label: "Live Trips" },
];

export default function LoginPage() {
  const router = useRouter();
  const loginAsRole = useAuthStore((s) => s.loginAsRole);

  const handleLogin = (role: Role, label: string) => {
    const u = loginAsRole(role);
    if (u) {
      toast.success(`Welcome, ${u.name}!`, { description: `Signed in as ${label}.` });
      router.push(DEFAULT_LANDING[role]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ═══════════════════════════════════════════════════
          LEFT BRAND PANEL — Industrial black + chevron pattern
      ═══════════════════════════════════════════════════ */}
      <div className="relative lg:w-[400px] xl:w-[460px] bg-brand-black flex-shrink-0 flex flex-col overflow-hidden">

        {/* Diagonal chevron brand texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(227,0,15,0.07) 0 1px, transparent 1px 14px)",
          }}
        />

        {/* Right border accent — desktop */}
        <div className="absolute top-0 right-0 bottom-0 w-[3px] bg-brand-red hidden lg:block" />

        {/* Bottom border accent — mobile */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-red lg:hidden" />

        <div className="relative z-10 flex flex-col h-full p-8 xl:p-12">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Logo size={52} light showWordmark wordmarkSize="md" />
          </motion.div>

          {/* Hero copy — vertically centered */}
          <motion.div
            className="flex-1 flex flex-col justify-center py-12 lg:py-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
          >
            <div className="text-[9px] font-black tracking-[0.35em] text-brand-red uppercase mb-5">
              Enterprise Logistics Platform
            </div>

            <h2 className="font-display text-3xl xl:text-[2.5rem] font-black uppercase text-white leading-[1.1] tracking-tight">
              Fleet &<br />
              Logistics<br />
              <span className="text-brand-red">Management</span>
            </h2>

            {/* Red rule divider */}
            <div className="flex items-center gap-3 mt-7 mb-7">
              <div className="h-[3px] w-10 bg-brand-red" />
              <div className="h-px flex-1 bg-white/8" />
            </div>

            <p className="text-[13px] text-white/50 leading-relaxed font-sans max-w-[290px]">
              Industrial-grade platform for fleet operations, real-time dispatch,
              driver payroll, and delivery analytics.
            </p>

            {/* Feature list */}
            <ul className="mt-8 space-y-3">
              {PLATFORM_FEATURES.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-[2px] bg-brand-red flex-shrink-0" />
                  <span className="text-[12px] text-white/55 font-sans leading-snug">{f}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="border-t border-white/8 pt-6 grid grid-cols-3 gap-4"
          >
            {PLATFORM_STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black text-white font-display leading-none">
                  {s.value}
                </div>
                <div className="text-[10px] text-white/35 uppercase tracking-[0.18em] mt-1 font-sans">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          RIGHT PANEL — Role selector on white/ash background
      ═══════════════════════════════════════════════════ */}
      <div className="flex-1 bg-brand-ash overflow-y-auto">
        <div className="max-w-[720px] mx-auto px-6 xl:px-10 py-10">

          {/* Section label + heading */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className="h-[2px] w-6 bg-brand-red" />
              <span className="text-[9px] font-black text-brand-red uppercase tracking-[0.3em]">
                Demo Access
              </span>
            </div>
            <h1 className="font-display text-2xl xl:text-3xl font-black uppercase text-brand-black tracking-tight">
              Select Your Role
            </h1>
            <p className="text-sm text-brand-steel mt-1.5 font-sans">
              Choose a demo account to explore the full platform
            </p>
          </motion.div>

          {/* ── 2-column role cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ROLE_CARDS.map((c, i) => (
              <motion.div
                key={c.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.08 }}
                className="group relative bg-white border border-gray-200 hover:border-brand-red/40 hover:shadow-industrial transition-all duration-200"
              >
                {/* Left red accent stripe */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-red" />

                <div className="p-5 pl-6">

                  {/* Card header: icon + role number + title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brand-red-light flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-[18px] h-[18px] text-brand-red" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[9px] font-black text-brand-red font-display tracking-[0.28em] uppercase">
                          {c.number}
                        </span>
                        <div className="h-px flex-1 bg-brand-red/12" />
                      </div>
                      <div className="text-[13px] font-extrabold text-brand-black font-display uppercase leading-tight">
                        {c.title}
                      </div>
                      <div className="text-[11px] text-brand-steel mt-0.5">{c.subtitle}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-brand-steel leading-relaxed mb-4 pl-3 border-l border-brand-red/20">
                    {c.description}
                  </p>

                  {/* Credentials block */}
                  <div className="bg-brand-ash border border-gray-200 mb-4">
                    <div className="px-3 py-2.5">
                      <div className="text-[8px] uppercase tracking-[0.22em] text-brand-steel font-bold flex items-center gap-1.5 mb-1">
                        <Mail className="w-2.5 h-2.5" /> Email
                      </div>
                      <div className="text-xs font-semibold text-brand-black font-mono leading-snug break-all">
                        {c.email}
                      </div>
                    </div>
                    <div className="border-t border-gray-200 px-3 py-2.5">
                      <div className="text-[8px] uppercase tracking-[0.22em] text-brand-steel font-bold flex items-center gap-1.5 mb-1">
                        <Lock className="w-2.5 h-2.5" /> Password
                      </div>
                      <div className="text-xs font-semibold text-brand-black font-mono">
                        {c.password}
                      </div>
                    </div>
                  </div>

                  {/* Login CTA — solid red, sharp corners, Montserrat uppercase */}
                  <button
                    onClick={() => handleLogin(c.role, c.title)}
                    className="w-full bg-brand-red hover:bg-brand-red-dark active:scale-[0.99] text-white font-black text-[11px] uppercase tracking-[0.2em] font-display py-2.5 flex items-center justify-center gap-2 transition-colors"
                  >
                    Login as{" "}
                    {c.title
                      .split(" / ")[0]
                      .split(" ")
                      .map((w) => w[0] + w.slice(1).toLowerCase())
                      .join(" ")}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── QUICK ACCESS BAR ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-5 bg-brand-black relative overflow-hidden"
          >
            {/* Diagonal texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.07]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #E3000F 0 1px, transparent 1px 10px)",
              }}
            />
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-red" />

            <div className="relative z-10 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Label */}
              <div className="flex items-center gap-3 sm:w-48 shrink-0">
                <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-black text-white font-display uppercase text-[11px] tracking-[0.18em]">
                    Quick Access
                  </div>
                  <div className="text-[10px] text-white/40 font-sans">
                    One-click instant login
                  </div>
                </div>
              </div>

              {/* Role tiles */}
              <div className="flex-1 grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {ROLE_CARDS.map((c) => (
                  <button
                    key={c.role}
                    onClick={() => handleLogin(c.role, c.title)}
                    className="group/q flex flex-col items-center gap-1.5 bg-white/5 hover:bg-brand-red border border-white/8 hover:border-brand-red py-2.5 px-1 transition-all"
                  >
                    <c.icon className="w-4 h-4 text-white/35 group-hover/q:text-white transition-colors" />
                    <div className="text-[9px] font-black text-brand-red group-hover/q:text-white font-display uppercase tracking-widest transition-colors leading-none">
                      {c.number}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-brand-red/25" />
            <p className="text-[11px] text-brand-steel font-sans">
              MTS Trucking Incorporated © {new Date().getFullYear()} · Enterprise Fleet Management Platform
            </p>
            <div className="h-px w-10 bg-brand-red/25" />
          </div>

        </div>
      </div>
    </div>
  );
}
