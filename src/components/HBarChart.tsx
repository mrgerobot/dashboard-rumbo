import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";

interface HBarChartProps {
  title: string;
  subtitle: string;
  data: { name: string; value: number; color: string }[];
  maxValue?: number;
}

export default function HBarChart({ title, subtitle, data, maxValue }: HBarChartProps) {
  const max = maxValue ?? Math.ceil(Math.max(...data.map((d) => d.value)) / 100) * 100 + 100;

  return (
    <div className="card-dashboard p-6">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-6">{subtitle}</p>

      <ResponsiveContainer width="100%" height={data.length * 56 + 30}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30, top: 0, bottom: 0 }}>
          <XAxis type="number" domain={[0, max]} tickLine={false} axisLine={false} fontSize={12} tick={{ fill: "hsl(215,16%,47%)" }} />
          <YAxis
            type="category"
            dataKey="name"
            tickLine={false}
            axisLine={false}
            width={100}
            fontSize={13}
            tick={{ fill: "hsl(240,10%,10%)" }}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
            contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", fontSize: 13 }}
          />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
