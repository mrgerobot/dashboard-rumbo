import { useState, useMemo } from "react";
import { Search, Download, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2, MessageSquare, AlertCircle, Filter, ChevronDown } from "lucide-react";
import { students as allStudents } from "@/data/students";
import type { Estado, Interaccion } from "@/data/students";
import { useIsMobile } from "@/hooks/use-mobile";
import { exportAllColumnsToExcel, cn } from "@/lib/utils";
const PAGE_SIZE = 10;

function StatusBadge({ estado }: { estado: Estado }) {
  const cls = estado === "Finalizado" ? "badge-status-green" : estado === "En progreso" ? "badge-status-blue" : "badge-status-gray";
  return <span className={cls}>{estado}</span>;
}

function InteraccionBadge({ interaccion }: { interaccion: Interaccion }) {
  const cls = interaccion === "Interactuó" ? "badge-status-orange" : "badge-status-gray";
  return <span className={cls}>{interaccion}</span>;
}

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  defaultValue: string;
}

function FilterDropdown({ label, value, options, onChange, defaultValue }: FilterDropdownProps) {
  const isActive = value !== defaultValue;
  return (
    <div className="flex flex-col gap-1.5 min-w-[180px]">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="relative">
        {isActive && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary z-10" />
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full appearance-none rounded-lg border bg-white px-3 py-2.5 pr-8 text-sm text-secondary cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors",
            isActive ? "border-primary" : "border-[hsl(220,13%,91%)]"
          )}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}


interface SeguimientoProps {
  campus: string | null;  // null = admin
  role: "admin" | "mentor";
}

export default function SeguimientoTab({ campus: userCampus, role }: SeguimientoProps) {
  const students = useMemo(
    () => role === "admin" ? allStudents : allStudents.filter((s) => s.campus === userCampus),
    [userCampus, role]
  );

  // --- Derive filter options from the scoped population ---
  const ALL_AREAS = "Todas las áreas";
  const ALL_ESTADOS = "Todos los estados";
  const ALL_COACH = "Todos";
  const ALL_CAMPUSES = "Todos los campus";

  const areaOptions = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => s.areas.forEach((a) => set.add(a)));
    return [ALL_AREAS, ...Array.from(set).sort()];
  }, [students]);

  const estadoOptions = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => set.add(s.estado));
    // Preserve logical order
    return [ALL_ESTADOS, ...["Sin comenzar", "En progreso", "Finalizado"].filter((e) => set.has(e))];
  }, [students]);

  const coachOptions = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => set.add(s.interaccion));
    return [ALL_COACH, ...Array.from(set).sort()];
  }, [students]);

  const campusOptions = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => set.add(s.campus));
    return [ALL_CAMPUSES, ...Array.from(set).sort()];
  }, [students]);

  // --- Filter state ---
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [area, setArea] = useState(ALL_AREAS);
  const [estado, setEstado] = useState(ALL_ESTADOS);
  const [coach, setCoach] = useState(ALL_COACH);
  const [campus, setCampus] = useState(ALL_CAMPUSES);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const isMobile = useIsMobile();

  const hasActiveFilters =
    area !== ALL_AREAS ||
    estado !== ALL_ESTADOS ||
    coach !== ALL_COACH;

  const clearFilters = () => {
    setArea(ALL_AREAS);
    setEstado(ALL_ESTADOS);
    setCoach(ALL_COACH);
    setPage(0);
  };

  const handleFilterChange = (setter: (v: string) => void) => (v: string) => {
    setter(v);
    setPage(0);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return students.filter((s) => {
      if (q && !s.nombre.toLowerCase().includes(q) && !s.correo.toLowerCase().includes(q) && !s.campus.toLowerCase().includes(q)) return false;
      if (area !== ALL_AREAS && !s.areas.includes(area as any)) return false;
      if (estado !== ALL_ESTADOS && s.estado !== estado) return false;
      if (coach !== ALL_COACH && s.interaccion !== coach) return false;
      return true;
    });
  }, [search, area, estado, coach, campus, students]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // KPIs from role-scoped dataset (not from filtered — always reflect full scope)
  const finalizados = students.filter((s) => s.estado === "Finalizado").length;
  const conCoach = students.filter((s) => s.interaccion === "Interactuó").length;
  const sinComenzar = students.filter((s) => s.estado === "Sin comenzar").length;

  const filterControls = (
    <>
      <FilterDropdown label="Área de estudio" value={area} options={areaOptions} onChange={handleFilterChange(setArea)} defaultValue={ALL_AREAS} />
      <FilterDropdown label="Estado del test" value={estado} options={estadoOptions} onChange={handleFilterChange(setEstado)} defaultValue={ALL_ESTADOS} />
      <FilterDropdown label="Uso del coach" value={coach} options={coachOptions} onChange={handleFilterChange(setCoach)} defaultValue={ALL_COACH} />
    </>
  );

  const handleExport = () => {
    exportAllColumnsToExcel(
      filtered,
      `seguimiento_${new Date().toISOString().slice(0, 10)}.xlsx`,
      { excludeKeys: [], sheetName: "Seguimiento" }
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Seguimiento</h1>

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

      {/* Filters */}
      {isMobile ? (
        <div className="mb-4">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors",
              hasActiveFilters
                ? "border-primary text-primary bg-primary/5"
                : "border-[hsl(220,13%,91%)] text-secondary"
            )}
          >
            <Filter size={16} />
            Filtros
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-primary" />}
          </button>
          {mobileFiltersOpen && (
            <div className="mt-3 p-4 card-dashboard space-y-4">
              {filterControls}
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-sm font-medium text-primary hover:underline">
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-end gap-4 mb-4 flex-wrap">
          {filterControls}
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-sm font-medium text-primary hover:underline pb-2.5">
              Limpiar filtros
            </button>
          )}
        </div>
      )}

      {/* Search + Export */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nombre, correo electrónico o campus..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[hsl(220,13%,91%)] bg-white text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        {/* ✅ Fixed export button — orange border + orange text, no broken variant prop */}
        <button
          onClick={handleExport}
          disabled={!filtered.length}
          className= "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-primary text-primary text-sm font-medium hover:bg-accent transition-colors flex-shrink-0"
        >
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
                <tr key={s.correo} className={cn("border-b border-border last:border-0 transition-colors", i % 2 === 1 ? "bg-[hsl(0,0%,98%)]" : "bg-white")}>
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
                      href={s.reporte}
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
                    No se encontraron estudiantes con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-white">
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