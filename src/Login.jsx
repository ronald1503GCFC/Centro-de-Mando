import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { LOGO } from "./App";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [cargando, setCargando] = useState(false);

  const entrar = async () => {
    setErr("");
    if (!email.trim() || !pass) { setErr("Escribe tu correo y contraseña."); return; }
    setCargando(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pass });
    if (error) setErr("Correo o contraseña incorrectos.");
    setCargando(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-lg">
        <div className="mb-6 text-center">
          <img src={LOGO} alt="Guayaquil City F.C." className="mx-auto mb-3 h-16 w-16 object-contain" />
          <h1 className="text-lg font-semibold text-slate-900">Centro de Mando</h1>
          <p className="text-xs uppercase tracking-widest" style={{ color: "#1E6FA8" }}>Guayaquil City F.C.</p>
        </div>
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-500">Correo</span>
            <input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
              placeholder="tu@correo.com" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-500">Contraseña</span>
            <input type="password" autoComplete="current-password" value={pass} onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") entrar(); }}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
              placeholder="••••••••" />
          </label>
          {err && <p className="rounded-md bg-rose-50 px-3 py-2 text-xs text-rose-600">{err}</p>}
          <button onClick={entrar} disabled={cargando}
            className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white transition disabled:opacity-60"
            style={{ backgroundColor: "#15294D" }}>
            {cargando ? "Entrando…" : "Entrar"}
          </button>
          <p className="pt-1 text-center text-[11px] text-slate-400">Las cuentas las crea el administrador. Si no puedes entrar, contáctalo.</p>
        </div>
      </div>
    </div>
  );
}
