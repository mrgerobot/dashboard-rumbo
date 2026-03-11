import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ResumenTab from "@/components/ResumenTab";
import SeguimientoTab from "@/components/SeguimientoTab";

type Tab = "resumen" | "seguimiento";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("resumen");

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "resumen" ? <ResumenTab /> : <SeguimientoTab />}
    </DashboardLayout>
  );
};

export default Index;
