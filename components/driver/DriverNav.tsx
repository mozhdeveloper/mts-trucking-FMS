"use client";
import { useRouter } from "next/navigation";
import { LayoutGrid, ClipboardList, Camera, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export type DriverTab = "dashboard" | "trips" | "pod" | "settings" | "earnings";

const TABS: { id: DriverTab; label: string; icon: React.ElementType; href: string }[] = [
  { id: "dashboard", label: "Home",     icon: LayoutGrid,    href: "/driver" },
  { id: "trips",     label: "Trips",    icon: ClipboardList, href: "/driver?view=trips" },
  { id: "pod",       label: "POD",      icon: Camera,        href: "/pod" },
  { id: "settings",  label: "Settings", icon: Settings,      href: "/driver/settings" },
];

interface DriverNavProps {
  active: DriverTab;
  onTabChange?: (tab: DriverTab) => void;
}

export function DriverNav({ active, onTabChange }: DriverNavProps) {
  const router = useRouter();

  function handleClick(tab: (typeof TABS)[number]) {
    if (onTabChange) {
      onTabChange(tab.id);
    } else {
      router.push(tab.href);
    }
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 bg-brand-black border-t-2 border-brand-red"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Driver navigation"
    >
      <div className="max-w-lg mx-auto grid grid-cols-4">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleClick(tab)}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
              className="relative flex flex-col items-center gap-1 py-3 min-h-[60px] justify-center transition-colors"
            >
              {/* Active top accent */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-brand-red" />
              )}
              <tab.icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-brand-red" : "text-white/30"
                )}
              />
              <span
                className={cn(
                  "text-[9px] font-black uppercase tracking-[0.15em] font-display transition-colors",
                  isActive ? "text-brand-red" : "text-white/30"
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
