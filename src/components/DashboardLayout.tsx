import { useState } from "react";
import { LayoutDashboard, Users, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type Tab = "resumen" | "seguimiento";

interface DashboardLayoutProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  children: React.ReactNode;
}

const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "resumen", label: "Resumen", icon: LayoutDashboard },
  { id: "seguimiento", label: "Seguimiento", icon: Users },
];

export default function DashboardLayout({ activeTab, onTabChange, children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        {/* Mobile top header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 h-14 bg-secondary">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              R
            </div>
            <span className="text-secondary-foreground font-semibold text-lg">RUMBO</span>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-secondary-foreground">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 z-20 bg-secondary p-4 shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onTabChange(item.id); setMobileMenuOpen(false); }}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-1",
                  activeTab === item.id
                    ? "bg-sidebar-accent text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-4 pb-20 overflow-x-hidden">{children}</main>

        {/* Mobile bottom tab bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around h-16 bg-card border-t border-border shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 text-xs font-medium transition-colors",
                activeTab === item.id ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <footer className="pb-20 text-center text-xs text-muted-foreground py-4">
          © 2025 RUMBO · PrepaTEC
        </footer>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-secondary flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            R
          </div>
          <span className="text-secondary-foreground font-bold text-xl">RUMBO</span>
        </div>

        <nav className="flex-1 px-3 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all mb-1",
                activeTab === item.id
                  ? "bg-sidebar-accent text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-6 py-4 text-xs text-sidebar-foreground/50">
          © 2025 RUMBO · PrepaTEC
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-x-hidden">{children}</main>
    </div>
  );
}
