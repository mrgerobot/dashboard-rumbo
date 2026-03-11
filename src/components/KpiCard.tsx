import { Users, TrendingUp } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: "users" | "chart";
}

const iconMap = {
  users: Users,
  chart: TrendingUp,
};

export default function KpiCard({ title, value, subtitle, icon }: KpiCardProps) {
  const Icon = iconMap[icon];

  return (
    <div className="card-dashboard p-6 flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
        <Icon size={22} className="text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
