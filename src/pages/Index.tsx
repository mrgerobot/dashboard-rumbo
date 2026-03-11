import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ResumenTab from "@/components/ResumenTab";
import SeguimientoTab from "@/components/SeguimientoTab";
import { useAuth } from "@/contexts/AuthContext";

type Tab = "resumen" | "seguimiento";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("resumen");
  const { session } = useAuth();

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "resumen" ? (
        <ResumenTab role={session!.role} campus={session!.campus} />
      ) : (
        <SeguimientoTab role={session!.role} campus={session!.campus} />
      )}
    </DashboardLayout>
  );
};

export default Index;
