import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { supabase } from "./supabaseClient";
import Login from "./Login";
import CentroDeMando from "./App";

function Root() {
  const [session, setSession] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setCargando(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((_evento, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (cargando) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontFamily: "system-ui, sans-serif" }}>Cargando…</div>;
  }
  if (!session) return <Login />;
  return <CentroDeMando session={session} onSignOut={() => supabase.auth.signOut()} />;
}

createRoot(document.getElementById("root")).render(<Root />);
