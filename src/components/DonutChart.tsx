import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Lengua, Literatura y Comunicación", value: 14.2, color: "#4CAF50" },
  { name: "Lenguas y Culturas Extranjeras", value: 11.8, color: "#2196F3" },
  { name: "Individuos, Sociedad y Humanidades", value: 21.3, color: "#9C27B0" },
  { name: "Ciencias Naturales y Experimentales", value: 19.6, color: "#F44336" },
  { name: "Matemáticas y Pensamiento Lógico", value: 20.4, color: "#FF9800" },
  { name: "Artes, Expresión y Creatividad", value: 12.7, color: "#607D8B" },
];

export default function DonutChart() {
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
