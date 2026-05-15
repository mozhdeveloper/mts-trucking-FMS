"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth";
import { useDriverStore } from "@/lib/store";
import {
  ChevronRight, LogOut, User, Bell, Shield, Info,
  HelpCircle, Moon, Smartphone,
} from "lucide-react";
import { DriverNav } from "@/components/driver/DriverNav";
import { DriverSidebar } from "@/components/driver/DriverSidebar";
import { Logo } from "@/components/Brand/Logo";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function DriverSettingsPage() {
  const router       = useRouter();
  const user         = useAuthStore((s) => s.user);
  const logout       = useAuthStore((s) => s.logout);
  const drivers      = useDriverStore((s) => s.drivers);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const driverId = user?.driverId ?? drivers[0]?.id;
  const driver   = drivers.find((d) => d.id === driverId) ?? drivers[0];
  const fullName = user?.name ?? driver?.name ?? "Driver";
  const phone    = driver?.phone ?? user?.email ?? "—";
  const initials = fullName
    .split(" ")
    .map((n: string) => n[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-gray-50 overscroll-none">

      {/* ── Sticky header ── */}
      <header
        className="sticky top-0 z-30 bg-brand-black w-full shrink-0"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="max-w-lg mx-auto h-14 px-4 flex items-center justify-between">
          {/* Hamburger → opens sidebar */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="min-w-[44px] min-h-[44px] flex flex-col justify-center items-start gap-[5px] p-2 -ml-2"
            aria-label="Open menu"
          >
            <span className="block w-5 h-[2px] bg-white" />
            <span className="block w-5 h-[2px] bg-white" />
            <span className="block w-3.5 h-[2px] bg-white" />
          </button>
          {/* MTS Logo centered */}
          <Logo size={28} light showWordmark wordmarkSize="sm" />
          {/* Spacer to balance the hamburger */}
          <div className="min-w-[44px]" />
        </div>
        {/* Red accent bottom line */}
        <div className="h-[2px] bg-brand-red" />
      </header>

      {/* ── Profile banner ── */}
      <div className="bg-brand-black px-5 pb-6 pt-4 shrink-0" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(227,0,15,0.05) 0 1px, transparent 1px 12px)" }}>
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-brand-red flex items-center justify-center text-white text-2xl font-black font-display shrink-0 select-none">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-base leading-tight">{fullName}</p>
              <p className="text-white/50 text-xs mt-0.5">{phone}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-2 h-2 bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-[11px] text-white/60 font-sans">Active · On Duty</span>
              </div>
            </div>
            <div className="shrink-0 w-10 h-10 bg-brand-red-light flex items-center justify-center">
              <Truck className="w-5 h-5 text-brand-red" />
            </div>
          </div>
          {/* Driver ID chip */}
          {driver && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5">
              <span className="text-[10px] text-white/50 font-sans uppercase tracking-wider">ID</span>
              <span className="text-[11px] text-white font-bold font-display">{driver.id}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <main className="flex-1 overflow-y-auto overscroll-contain">
        <div className="max-w-lg mx-auto px-4 pt-5 pb-8 space-y-5">

          {/* Account */}
          <SettingsSection title="Account">
            <SettingsRow icon={User}    label="Profile"           sub="Name, contact info, photo"      onPress={() => toast.info("Profile editing coming soon")} />
            <SettingsRow icon={Bell}    label="Notifications"     sub="Trip alerts and push messages"  onPress={() => toast.info("Notification settings coming soon")} />
            <SettingsRow icon={Shield}  label="Privacy & Security" sub="Password, two-factor auth"     onPress={() => toast.info("Security settings coming soon")} />
          </SettingsSection>

          {/* App */}
          <SettingsSection title="App Preferences">
            <SettingsRow icon={Moon}       label="Appearance"           sub="Light / Dark / System theme"        onPress={() => toast.info("Theme settings coming soon")} />
            <SettingsRow icon={Smartphone} label="Device & Permissions" sub="Camera, location, storage"          onPress={() => toast.info("Permission settings coming soon")} />
          </SettingsSection>

          {/* Support */}
          <SettingsSection title="Support">
            <SettingsRow icon={HelpCircle} label="Help & FAQ"   sub="How to use the driver app"               onPress={() => toast.info("Help center coming soon")} />
            <SettingsRow icon={Info}       label="About"         sub="Version 1.0.0 · MTS Trucking FMS"       onPress={() => toast.success("MTS Trucking FMS v1.0.0")} />
          </SettingsSection>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full min-h-[52px] bg-white border border-red-100 flex items-center justify-center gap-2 text-brand-red font-black font-display uppercase tracking-wide text-sm active:scale-[0.99] transition-transform"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>

          <p className="text-center text-[10px] text-gray-400 pb-2">
            MTS Trucking FMS · Driver App · v1.0.0
          </p>
        </div>
      </main>

      <DriverNav active="settings" />

      <DriverSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active="settings"
      />
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────
function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
        {title}
      </p>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
        {children}
      </div>
    </section>
  );
}

function SettingsRow({
  icon: Icon,
  label,
  sub,
  onPress,
}: {
  icon: React.ElementType;
  label: string;
  sub: string;
  onPress: () => void;
}) {
  return (
    <button
      onClick={onPress}
      className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-gray-50 transition-colors min-h-[64px]"
    >
      <div className="w-9 h-9 bg-brand-red-light flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-brand-red" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-brand-navy">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
    </button>
  );
}
