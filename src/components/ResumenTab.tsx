import { useMemo } from "react";
import KpiCard from "./KpiCard";
import DonutChart from "./DonutChart";
import HBarChart from "./HBarChart";
import { students } from "@/data/students";

interface Props {
  campus: string | null;  // null = admin
  role: "admin" | "mentor";
}

export default function ResumenTab({ campus, role }: Props) {
  const filteredStudents = useMemo(
    () => role === "admin" ? students : students.filter((s) => s.campus === campus),
    [campus, role]
  );

  const total = filteredStudents.length;
  const finalizados = filteredStudents.filter((s) => s.estado === "Finalizado").length;
  const enProgreso = filteredStudents.filter((s) => s.estado === "En progreso").length;
  const sinComenzar = filteredStudents.filter((s) => s.estado === "Sin comenzar").length;
  const tasaRespuesta = total > 0 ? ((finalizados / total) * 100).toFixed(1) : "0";

  const coachSi = filteredStudents.filter((s) => s.interaccion === "Interactuó").length;
  const coachNo = filteredStudents.filter((s) => s.interaccion === "No interactuó").length;

  const actividadData = [
    { name: "Finalizado", value: finalizados, color: "#4CAF50" },
    { name: "En progreso", value: enProgreso, color: "#2196F3" },
    { name: "Sin comenzar", value: sinComenzar, color: "#9E9E9E" },
  ];

  const coachData = [
    { name: "Comenzó", value: coachSi, color: "#FF6B35" },
    { name: "No comenzó", value: coachNo, color: "#9E9E9E" },
  ];

  const maxActividad = Math.max(finalizados, enProgreso, sinComenzar, 10);
  const maxCoach = Math.max(coachSi, coachNo, 10);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        Resumen — Campus {campus}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <KpiCard title="Estudiantes encuestados" value={String(total)} subtitle="Total de estudiantes en el programa" icon="users" />
        <KpiCard title="Tasa de respuesta" value={`${tasaRespuesta}%`} subtitle="Estudiantes que completaron el test" icon="chart" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <DonutChart students={filteredStudents} />
        <HBarChart
          title="Avance de actividades por estado"
          subtitle="Distribución del progreso de los estudiantes en la plataforma"
          data={actividadData}
          maxValue={Math.ceil(maxActividad * 1.2)}
        />
      </div>

      <HBarChart
        title="Avance de interacción con el coach"
        subtitle="Proporción de estudiantes que iniciaron sesiones con su coach RUMBO"
        data={coachData}
        maxValue={Math.ceil(maxCoach * 1.2)}
      />
    </div>
  );
}