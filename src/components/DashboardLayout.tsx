import { useState } from "react";
import { LayoutDashboard, Users, Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import rumboLogo from "@/assets/rumbo-logo.png";

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

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=5491162204594&text=Hola%2C+soy+lucia%40geroeducacion.com+y+necesito+asistencia+con+el+dashboard.&type=phone_number&app_absent=0";

function SupportBlock() {
  return (
    <div className="px-4 pb-4">
      <p className="text-xs text-[hsl(220,9%,46%)] mb-2">¿Necesitas asistencia?</p>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-[hsl(220,26%,16%)] text-white text-sm font-medium hover:bg-[hsl(220,20%,22%)] transition-colors"
      >
        <MessageCircle size={16} />
        ¡Contáctanos!
      </a>
    </div>
  );
}

export default function DashboardLayout({ activeTab, onTabChange, children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-[hsl(0,0%,0%)]">
        {/* Mobile top header */}
        <header className="sticky top-0 z-30 flex items-center px-4 h-14 bg-white border-b border-[hsl(220,13%,91%)]">
          <div className="flex-1" />
          <img
            src={rumboLogo}
            alt="RUMBO"
            className="h-8 mix-blend-multiply"
          />
          <div className="flex-1 flex justify-end">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-secondary">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 z-20 bg-white p-4 shadow-lg border-b border-[hsl(220,13%,91%)] flex flex-col">
            <div className="flex-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onTabChange(item.id); setMobileMenuOpen(false); }}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-1",
                    activeTab === item.id
                      ? "text-primary border-l-4 border-primary bg-white"
                      : "text-secondary hover:bg-muted/50"
                  )}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[hsl(220,13%,91%)]">
              <SupportBlock />
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-4 pb-20 overflow-x-hidden">{children}</main>

        {/* Mobile bottom tab bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around h-16 bg-white border-t border-[hsl(220,13%,91%)] shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
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
        <footer className="pb-20 text-center text-xs text-[hsl(0,0%,60%)] py-4">
          © 2025 RUMBO · PrepaTEC
        </footer>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="flex min-h-screen bg-[hsl(0,0%,0%)]">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 bg-white flex flex-col sticky top-0 h-screen border-r border-[hsl(220,13%,91%)]">
        <div className="flex items-center justify-center px-4 py-6">
          <img
            src={rumboLogo}
            alt="RUMBO"
            className="h-12 mix-blend-multiply"
          />
        </div>

        <nav className="flex-1 px-3 mt-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all mb-1",
                activeTab === item.id
                  ? "border-l-4 border-primary text-primary bg-white"
                  : "text-secondary hover:bg-muted/50"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <SupportBlock />

        <div className="px-6 py-4 text-xs text-muted-foreground">
          © 2025 RUMBO · PrepaTEC
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-x-hidden">{children}</main>
    </div>
  );
}
