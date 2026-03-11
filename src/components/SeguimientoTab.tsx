import { useState, useMemo } from "react";
import { Search, Download, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { students } from "@/data/students";
import type { Estado, Interaccion } from "@/data/students";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 10;

function StatusBadge({ estado }: { estado: Estado }) {
  const cls = estado === "Finalizado" ? "badge-status-green" : estado === "En progreso" ? "badge-status-blue" : "badge-status-gray";
  return <span className={cls}>{estado}</span>;
}

function InteraccionBadge({ interaccion }: { interaccion: Interaccion }) {
  const cls = interaccion === "Interactuó" ? "badge-status-orange" : "badge-status-gray";
  return <span className={cls}>{interaccion}</span>;
}

export default function SeguimientoTab() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const isMobile = useIsMobile();

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return students.filter(
      (s) => s.nombre.toLowerCase().includes(q) || s.correo.toLowerCase().includes(q) || s.campus.toLowerCase().includes(q)
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const finalizados = students.filter((s) => s.estado === "Finalizado").length;
  const conCoach = students.filter((s) => s.interaccion === "Interactuó").length;
  const sinComenzar = students.filter((s) => s.estado === "Sin comenzar").length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Seguimiento</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card-dashboard p-5 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
            <CheckCircle2 size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Tests finalizados</p>
            <p className="text-2xl font-bold text-foreground">{finalizados}</p>
            <p className="text-xs text-muted-foreground">Estudiantes que completaron el test</p>
          </div>
        </div>
        <div className="card-dashboard p-5 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
            <MessageSquare size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Interactuaron con el coach</p>
            <p className="text-2xl font-bold text-foreground">{conCoach}</p>
            <p className="text-xs text-muted-foreground">Estudiantes con al menos una sesión</p>
          </div>
        </div>
        <div className="card-dashboard p-5 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
            <AlertCircle size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Sin comenzar</p>
            <p className="text-2xl font-bold text-foreground">{sinComenzar}</p>
            <p className="text-xs text-muted-foreground">Pendientes de iniciar</p>
          </div>
        </div>
      </div>

      {/* Search + Export */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nombre, correo electrónico o campus..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-primary text-primary text-sm font-medium hover:bg-accent transition-colors flex-shrink-0">
          <Download size={16} />
          Exportar datos
        </button>
      </div>

      {/* Table */}
      <div className="card-dashboard overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Nombre completo</th>
                {!isMobile && (
                  <>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Correo electrónico</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Campus</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Mentor</th>
                  </>
                )}
                <th className="text-left py-3 px-4 font-semibold text-foreground">Estado</th>
                {!isMobile && (
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Áreas del BI</th>
                )}
                <th className="text-left py-3 px-4 font-semibold text-foreground whitespace-nowrap">Interacción con el coach</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Reporte</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((s, i) => (
                <tr key={s.correo} className={cn("border-b border-border last:border-0 transition-colors", i % 2 === 1 && "bg-muted/30")}>
                  <td className="py-3 px-4 font-semibold text-foreground whitespace-nowrap">{s.nombre}</td>
                  {!isMobile && (
                    <>
                      <td className="py-3 px-4 text-muted-foreground text-xs">{s.correo}</td>
                      <td className="py-3 px-4 text-foreground">{s.campus}</td>
                      <td className="py-3 px-4 text-foreground whitespace-nowrap">{s.mentor}</td>
                    </>
                  )}
                  <td className="py-3 px-4"><StatusBadge estado={s.estado} /></td>
                  {!isMobile && (
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {s.areas.map((a) => (
                          <span key={a} className="area-tag">{a}</span>
                        ))}
                      </div>
                    </td>
                  )}
                  <td className="py-3 px-4"><InteraccionBadge interaccion={s.interaccion} /></td>
                  <td className="py-3 px-4">
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                    >
                      Ver reporte
                      <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              ))}
              {pageData.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    No se encontraron resultados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <span className="text-xs text-muted-foreground">
              Mostrando {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} de {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
                className="p-1.5 rounded-md hover:bg-muted disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={cn(
                    "w-8 h-8 rounded-md text-xs font-medium transition-colors",
                    page === i ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={page === totalPages - 1}
                onClick={() => setPage(page + 1)}
                className="p-1.5 rounded-md hover:bg-muted disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
