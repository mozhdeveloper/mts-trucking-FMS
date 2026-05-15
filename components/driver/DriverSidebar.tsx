"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  X, LayoutGrid, ClipboardList, Camera, Settings, LogOut, Truck, Wallet,
} from "lucide-react";
import { useAuthStore } from "@/lib/store/auth";
import { useDriverStore } from "@/lib/store";
import { Logo } from "@/components/Brand/Logo";
import { cn } from "@/lib/utils";
import type { DriverTab } from "./DriverNav";

// ── Nav items ────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",          icon: LayoutGrid,    href: "/driver" },
  { id: "trips",     label: "My Trips",           icon: ClipboardList, href: "/driver?view=trips" },
  { id: "pod",       label: "Proof of Delivery",  icon: Camera,        href: "/pod" },
  { id: "earnings",  label: "My Earnings",        icon: Wallet,        href: "/driver/earnings" },
  { id: "settings",  label: "Settings",           icon: Settings,      href: "/driver/settings" },
] as const;

// ── Props ─────────────────────────────────────────────────────
interface DriverSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  active: DriverTab;
}

// ── Component ─────────────────────────────────────────────────
export function DriverSidebar({ isOpen, onClose, active }: DriverSidebarProps) {
  const router  = useRouter();
  const user    = useAuthStore((s) => s.user);
  const logout  = useAuthStore((s) => s.logout);
  const drivers = useDriverStore((s) => s.drivers);

  const driverId = user?.driverId ?? drivers[0]?.id;
  const myDriver = drivers.find((d) => d.id === driverId) ?? drivers[0];
  const fullName = user?.name ?? myDriver?.name ?? "Driver";
  const phone    = myDriver?.phone ?? user?.email ?? "";
  const initials = fullName
    .split(" ")
    .map((w: string) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function navigate(href: string) {
    onClose();
    // Small delay lets the close animation start before navigating
    setTimeout(() => router.push(href), 150);
  }

  function handleLogout() {
    onClose();
    logout();
    router.push("/login");
  }

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-brand-navy/60 backdrop-blur-[2px] transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Drawer ── */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 max-w-[82vw] bg-brand-black flex flex-col shadow-2xl",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
        aria-label="Navigation menu"
        role="navigation"
      >
        {/* ── Header (brand-black with red accent) ── */}
        <div
          className="relative px-5 pb-5 border-b border-white/8 shrink-0"
          style={{ paddingTop: "max(env(safe-area-inset-top), 20px)" }}
        >
          {/* Right red border accent */}
          <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-brand-red" />

          <div className="flex items-center justify-between mb-5">
            {/* MTS Logo */}
            <Logo size={40} light showWordmark wordmarkSize="sm" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="w-9 h-9 bg-white/8 flex items-center justify-center"
              aria-label="Close menu"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Driver profile card */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-brand-red flex items-center justify-center text-white font-black text-xl font-display shrink-0 select-none">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-white font-black text-sm font-display uppercase leading-tight truncate">{fullName}</p>
              <p className="text-white/40 text-[10px] font-sans mt-0.5">Driver · MTS Trucking</p>
              {phone && (
                <p className="text-white/30 text-[10px] font-sans truncate mt-0.5">{phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Navigation items ── */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.35em] px-3 mb-3">
            Navigation
          </p>

          {NAV_ITEMS.map((item) => {
            const isActive = item.id === active;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.href)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 text-left transition-colors relative min-h-[48px]",
                  isActive
                    ? "bg-brand-red text-white"
                    : "text-white/55 hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white" />
                )}
                <item.icon
                  className={cn(
                    "w-4 h-4 shrink-0",
                    isActive ? "text-white" : "text-white/40"
                  )}
                />
                <span className="text-[12px] font-bold font-display uppercase tracking-wide flex-1">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Divider */}
          <div className="my-3 border-t border-white/8" />

          {/* Fleet overview shortcut */}
          <button
            onClick={() => navigate("/fleet")}
            className="w-full flex items-center gap-3 px-3 py-3 text-left text-white/55 hover:text-white hover:bg-white/5 transition-colors min-h-[48px]"
          >
            <Truck className="w-4 h-4 shrink-0 text-white/40" />
            <span className="text-[12px] font-bold font-display uppercase tracking-wide">Fleet Overview</span>
          </button>
        </nav>

        {/* ── Logout ── */}
        <div className="px-3 pb-6 border-t border-white/8 pt-4 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 text-white/40 hover:text-brand-red transition-colors min-h-[48px]"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span className="text-[12px] font-bold font-display uppercase tracking-wide">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
