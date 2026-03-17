import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setAuth, getAuth } from "@/auth/auth";
import { useStudents} from "@/contexts/StudentsProvider";
import { reconcileCacheOwner } from "@/lib/cache";

type ValidateResponse = {
  status: "allowed" | "denied" | "error";
  message: string;
  campus?: string | null;
};

export default function Validar() {
  const navigate = useNavigate();

  const existing = getAuth();
  const [email, setEmail] = useState(existing?.email ?? "");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string>("");
  const [ok, setOk] = useState<boolean | null>(null);
  const [entering, setEntering] = useState(false);
  const { refresh } = useStudents();

  if (entering) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">Cargando dashboard…</p>
        </div>
      </div>
    );
  }

  async function validate() {
    setLoading(true);
    setMsg("");
    setOk(null);

    try {
      const res = await fetch("/api/validar-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, url_origen: window.location.href }),
      });

      const data = (await res.json()) as ValidateResponse;

      if (data.status === "allowed") {
        setOk(true);
        setMsg("Email válido. Entrando...");
        const emailNorm = email.trim().toLowerCase();
        localStorage.clear();
        sessionStorage.clear(); // optional but recommended

        setAuth({
          email: emailNorm.trim(),
          campus: data.campus ?? null,
          ts: Date.now(),
        });
      
        window.dispatchEvent(new Event("gero:auth-updated"));
        setEntering(true);

        try {
          await refresh();
        } catch {}
      
        navigate("/resumen", { replace: true });
        return;
      }


      setOk(false);
      setMsg(data.message || "No autorizado");
    } catch (e) {
      setOk(false);
      setMsg("Ocurrió un error. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  }

   return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>¡Bienvenida/o!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Ingresa tu <b>email</b> para acceder al dashboard 🙌🏻
          </p>

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@dominio.com"
          />

          {msg && (
            <p className={`text-sm ${ok ? "text-green-600" : "text-destructive"}`}>
              {msg}
            </p>
          )}

          <Button
            className="w-full"
            onClick={validate}
            disabled={entering || loading || !email.trim()}>
            {entering ? "Cargando..." : loading ? "Validando..." : "Validar"}
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}
