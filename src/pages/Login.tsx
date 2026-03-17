import { useState } from "react";
import { Loader2, MessageCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import rumboLogo from "@/assets/rumbo-logo.png";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=5491162204594&text=Hola%2C+soy+lucia%40geroeducacion.com+y+necesito+asistencia+con+el+dashboard.&type=phone_number&app_absent=0";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/validar-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, url_origen: window.location.href }),
      });

      console.log(res);

      const data = await res.json();

      if (data.status === "allowed") {
        login({
          email: normalizedEmail,
          role: data.campus ? "mentor" : "admin",
          campus: data.campus ?? null,
          nombre: data.nombre ?? "Usuario",
        });
      } else {
        setError(data.message || "Este correo no está autorizado para acceder.");
      }
    } catch {
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-white rounded-2xl p-10 shadow-lg">
        <div className="flex justify-center mb-3">
          <img src={rumboLogo} alt="RUMBO" className="h-14 mix-blend-multiply" />
        </div>

        <p className="text-center text-sm text-muted-foreground mb-4">
          Dashboard · PrepaTEC
        </p>

        <div className="border-t border-border mb-6" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="w-full rounded-lg border border-border bg-white px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Ingresar"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground mb-2">¿Necesitas asistencia?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            <MessageCircle size={14} />
            ¡Contáctanos!
          </a>
        </div>
      </div>
    </div>
  );
}