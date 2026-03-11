import KpiCard from "./KpiCard";
import DonutChart from "./DonutChart";
import HBarChart from "./HBarChart";

const actividadData = [
  { name: "Finalizado", value: 520, color: "#4CAF50" },
  { name: "En progreso", value: 218, color: "#2196F3" },
  { name: "Sin comenzar", value: 109, color: "#9E9E9E" },
];

const coachData = [
  { name: "Comenzó", value: 389, color: "#FF6B35" },
  { name: "No comenzó", value: 458, color: "#9E9E9E" },
];

export default function ResumenTab() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Resumen</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <KpiCard title="Estudiantes encuestados" value="847" subtitle="Total de estudiantes en el programa" icon="users" />
        <KpiCard title="Tasa de respuesta" value="61.3%" subtitle="Estudiantes que completaron el test" icon="chart" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <DonutChart />
        <HBarChart
          title="Avance de actividades por estado"
          subtitle="Distribución del progreso de los estudiantes en la plataforma"
          data={actividadData}
          maxValue={600}
        />
      </div>

      {/* Coach chart full width */}
      <HBarChart
        title="Avance de interacción con el coach"
        subtitle="Proporción de estudiantes que iniciaron sesiones con su coach RUMBO"
        data={coachData}
        maxValue={500}
      />
    </div>
  );
}
