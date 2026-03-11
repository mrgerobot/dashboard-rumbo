import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { Student } from "@/data/students";

const AREA_COLORS: Record<string, string> = {
  "Lengua, Literatura y Comunicación": "#4CAF50",
  "Lenguas y Culturas Extranjeras": "#2196F3",
  "Individuos, Sociedad y Humanidades": "#9C27B0",
  "Ciencias Naturales y Experimentales": "#F44336",
  "Matemáticas y Pensamiento Lógico": "#FF9800",
  "Artes, Expresión y Creatividad": "#607D8B",
};

interface Props {
  students: Student[];
}

export default function DonutChart({ students }: Props) {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    let total = 0;
    for (const s of students) {
      for (const a of s.areas) {
        counts[a] = (counts[a] || 0) + 1;
        total++;
      }
    }
    return Object.entries(AREA_COLORS).map(([name, color]) => ({
      name,
      value: total > 0 ? parseFloat(((counts[name] || 0) / total * 100).toFixed(1)) : 0,
      color,
    }));
  }, [students]);

  return (
    <div className="card-dashboard p-6">
      <h3 className="text-base font-semibold text-foreground">Distribución de áreas del Bachillerato Internacional</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-6">
        Resultados de los tests vocacionales aplicados a la población
      </p>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="w-full max-w-[240px] aspect-square">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="85%"
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `${value}%`}
                contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", fontSize: 13 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-2.5 text-sm">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-foreground">{item.name}</span>
              <span className="text-muted-foreground font-medium ml-auto pl-3">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
