import React, { useState, useEffect, useMemo } from "react";
import {
  Plus, Copy, Trash2, X, Calendar, LayoutGrid, Home, Database, Users,
  AlertTriangle, Clock, CheckSquare, Inbox, ChevronLeft, ChevronRight,
  User, Building2, CircleDot, Layers, GripVertical, FileStack, History, ArrowRight,
} from "lucide-react";
import { supabase } from "./supabaseClient";

export const LOGO = "data:image/png;base64,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";
const NAVY = "#15294d";

const HOY = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
const pd = (s) => (s ? new Date(s + "T00:00:00") : null);
const fmt = (s) => (s ? pd(s).toLocaleDateString("es-EC", { day: "2-digit", month: "short" }) : "—");
const fmtTs = (ts) => (ts ? new Date(ts).toLocaleDateString("es-EC", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "");
const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const lunesDe = (d) => { const x = new Date(d); const g = (x.getDay() + 6) % 7; x.setDate(x.getDate() - g); x.setHours(0, 0, 0, 0); return x; };
const nowISO = () => new Date().toISOString();
const evt = (autorId, tipo, texto) => ({ ts: nowISO(), autorId, tipo, texto });
const diasDesde = (ts) => Math.floor((Date.now() - new Date(ts).getTime()) / 86400000);

const ENTIDADES = ["Primer Equipo", "La Cantera", "Institucional"];
const AREAS = ["Marketing", "Comunicación/Prensa", "Comercial/Patrocinios", "Eventos", "Administración Cantera"];
const FUNCIONES = ["Ejecuto", "Apruebo", "Coordino", "Superviso", "Informado"];
const PRIOS = ["Alta", "Media", "Baja"];

const ESTADO = {
  porhacer: { label: "Por hacer", dot: "bg-slate-400", chip: "bg-slate-100 text-slate-600", hex: "#94a3b8" },
  progreso: { label: "En progreso", dot: "bg-sky-500", chip: "bg-sky-50 text-sky-700", hex: "#0ea5e9" },
  espera: { label: "En espera", dot: "bg-amber-500", chip: "bg-amber-50 text-amber-700", hex: "#f59e0b" },
  revision: { label: "En revisión", dot: "bg-violet-500", chip: "bg-violet-50 text-violet-700", hex: "#8b5cf6" },
  hecho: { label: "Hecho", dot: "bg-emerald-500", chip: "bg-emerald-50 text-emerald-700", hex: "#10b981" },
};
const ESTADO_ORDEN = ["porhacer", "progreso", "espera", "revision", "hecho"];
const elabel = (k) => ESTADO[k]?.label || k;
const PRIO = {
  Alta: { chip: "bg-rose-50 text-rose-700 ring-1 ring-rose-200", hex: "#e11d48" },
  Media: { chip: "bg-amber-50 text-amber-700 ring-1 ring-amber-200", hex: "#f59e0b" },
  Baja: { chip: "bg-slate-100 text-slate-500 ring-1 ring-slate-200", hex: "#64748b" },
};
const ENT_COLOR = { "Primer Equipo": "#15294d", "La Cantera": "#0ea5e9", "Institucional": "#64748b" };

const PLANTILLA_CONTENIDO = [
  { titulo: "Planificar idea/concepto", duenoId: "ronald", miFuncion: "Coordino" },
  { titulo: "Diseño del arte", duenoId: "dis", miFuncion: "Ejecuto" },
  { titulo: "Caption/copy", duenoId: "cont", miFuncion: "Ejecuto" },
  { titulo: "Revisión y aprobación", duenoId: "ronald", miFuncion: "Apruebo" },
  { titulo: "Publicación", duenoId: "cont", miFuncion: "Ejecuto" },
];
// Subtareas propias de la plantilla. Compatibilidad: plantillas viejas con conSubtareas usan el set de contenido.
const plantillaSubs = (t) => Array.isArray(t.subtareasPlantilla) ? t.subtareasPlantilla : (t.conSubtareas ? PLANTILLA_CONTENIDO : []);
const materializarSubs = (t) => plantillaSubs(t).map((s, i) => ({ id: "s" + Date.now() + i, titulo: s.titulo, duenoId: s.duenoId, miFuncion: s.miFuncion || "Ejecuto", fecha: "", prioridad: "Media", estado: "porhacer", eventos: [] }));
// Tipos de contacto externo (gente con la que se hace gestión, pero que NO usa el sistema)
const TIPOS_CONTACTO_DEFAULT = ["Presidente", "Gerente General", "Cuerpo Técnico", "Jugadores", "LigaPro", "Patrocinadores"];

const SEED = {
  catalogos: {
    personas: [
      { id: "ronald", nombre: "Ronald Miranda", rol: "Líder de área" },
      { id: "dis", nombre: "Diseñador", rol: "Diseño" },
      { id: "foto", nombre: "Fotógrafo/Diseñador", rol: "Foto y video" },
      { id: "cont", nombre: "Contenido/Prensa", rol: "Contenido y prensa" },
      { id: "asisadm", nombre: "Asist. Administrativa", rol: "Administración Cantera" },
      { id: "coordadm", nombre: "Coord. Administrativo", rol: "Administración Cantera" },
      { id: "coorddep", nombre: "Coord. Deportivo", rol: "Administración Cantera" },
    ],
    contactos: [
      { id: "presid", nombre: "Presidencia", tipo: "Presidente" },
      { id: "geren", nombre: "Gerencia General", tipo: "Gerente General" },
      { id: "ct", nombre: "Cuerpo Técnico", tipo: "Cuerpo Técnico" },
    ],
    tiposContacto: TIPOS_CONTACTO_DEFAULT,
    proyectos: [
      { id: "p1", nombre: "Presentaciones primer equipo 2026", entidad: "Primer Equipo", descripcion: "Anuncios de fichajes y renovaciones" },
      { id: "p2", nombre: "Captación academia 2026", entidad: "La Cantera", descripcion: "Campaña de inscripciones" },
      { id: "p3", nombre: "Patrocinios 2026", entidad: "Institucional", descripcion: "Gestión y activación de sponsors" },
    ],
    subcats: {
      "Marketing": ["Campañas", "Redes sociales", "Captación academia", "Marca", "Pauta/Ads"],
      "Comunicación/Prensa": ["Comunicados", "Relación con medios", "Partido (cobertura)", "Gestión de crisis"],
      "Comercial/Patrocinios": ["Patrocinadores", "Contratos", "Activaciones", "Nuevos negocios"],
      "Eventos": ["Matchday", "Institucionales", "Academia"],
      "Administración Cantera": ["Cobranzas", "Atención al cliente", "Compras", "Coordinación deportiva"],
    },
    tipos: ["Reunión", "Llamada/Mensaje", "Documento", "Investigación", "Planificación", "Pieza de contenido", "Cobertura", "Evento", "Gestión/Seguimiento"],
    plantillasTarea: [
      { id: "t1", nombre: "Story de jugador", entidad: "Primer Equipo", area: "Marketing", subcategoria: "Redes sociales", tipoTrabajo: "Pieza de contenido", prioridad: "Media", responsableId: "cont", conSubtareas: false },
      { id: "t2", nombre: "Pieza de contenido (con proceso)", entidad: "Primer Equipo", area: "Marketing", subcategoria: "Redes sociales", tipoTrabajo: "Pieza de contenido", prioridad: "Alta", responsableId: "ronald", conSubtareas: true },
      { id: "t3", nombre: "Cobertura de partido", entidad: "Primer Equipo", area: "Comunicación/Prensa", subcategoria: "Partido (cobertura)", tipoTrabajo: "Cobertura", prioridad: "Media", responsableId: "foto", conSubtareas: false },
    ],
  },
  actividades: [
    {
      id: 1, titulo: "Presentación de Juan Pérez", descripcion: "Anuncio oficial del fichaje en redes.", proyectoId: "p1",
      entidad: "Primer Equipo", area: "Marketing", subcategoria: "Redes sociales", tipoTrabajo: "Pieza de contenido",
      prioridad: "Alta", fechaSolicitud: "2026-06-18", fechaTope: "2026-06-25", solicitanteId: "presid", responsableId: "ronald",
      estado: "progreso", proxAccion: "", proxRespId: "", esperaDe: "", involucrados: ["dis", "cont", "foto"],
      eventos: [{ ts: "2026-06-18T09:00:00.000Z", autorId: "ronald", tipo: "creado", texto: "Actividad creada" }],
      subtareas: [
        { id: "s1", titulo: "Planificar concepto", duenoId: "ronald", miFuncion: "Coordino", fecha: "2026-06-19", prioridad: "Media", estado: "hecho", eventos: [{ ts: "2026-06-19T14:00:00.000Z", autorId: "ronald", tipo: "estado", texto: "Por hacer → Hecho" }] },
        { id: "s2", titulo: "Diseño del arte", duenoId: "dis", miFuncion: "Ejecuto", fecha: "2026-06-23", prioridad: "Alta", estado: "progreso", eventos: [{ ts: "2026-06-22T10:00:00.000Z", autorId: "dis", tipo: "estado", texto: "Por hacer → En progreso" }, { ts: "2026-06-22T16:30:00.000Z", autorId: "dis", tipo: "avance", texto: "Primera versión lista, falta ajustar tipografía." }] },
        { id: "s3", titulo: "Caption/copy", duenoId: "cont", miFuncion: "Ejecuto", fecha: "2026-06-24", prioridad: "Media", estado: "porhacer", eventos: [] },
        { id: "s4", titulo: "Revisión y aprobación", duenoId: "ronald", miFuncion: "Apruebo", fecha: "2026-06-24", prioridad: "Alta", estado: "porhacer", eventos: [] },
        { id: "s5", titulo: "Publicación", duenoId: "cont", miFuncion: "Ejecuto", fecha: "2026-06-25", prioridad: "Alta", estado: "porhacer", eventos: [] },
      ],
    },
    {
      id: 2, titulo: "Activación patrocinador (vs Emelec)", descripcion: "Vallas + post con sponsor.", proyectoId: "p3",
      entidad: "Primer Equipo", area: "Comercial/Patrocinios", subcategoria: "Activaciones", tipoTrabajo: "Pieza de contenido",
      prioridad: "Alta", fechaSolicitud: "2026-06-17", fechaTope: "2026-06-27", solicitanteId: "geren", responsableId: "cont",
      estado: "espera", proxAccion: "Recibir arte del patrocinador", proxRespId: "externo", esperaDe: "Patrocinador (logos finales)", involucrados: ["dis", "cont"], subtareas: [], eventos: [],
    },
    {
      id: 3, titulo: "Campaña de captación — academia", descripcion: "Concepto de campaña de inscripciones.", proyectoId: "p2",
      entidad: "La Cantera", area: "Marketing", subcategoria: "Captación academia", tipoTrabajo: "Planificación",
      prioridad: "Alta", fechaSolicitud: "2026-06-16", fechaTope: "2026-06-30", solicitanteId: "geren", responsableId: "cont",
      estado: "revision", proxAccion: "Aprobar concepto de campaña", proxRespId: "ronald", esperaDe: "", involucrados: ["dis", "cont"], subtareas: [], eventos: [],
    },
    {
      id: 4, titulo: "Nota de prensa — parte médico", descripcion: "Comunicado sobre lesión de jugador.", proyectoId: "",
      entidad: "Primer Equipo", area: "Comunicación/Prensa", subcategoria: "Comunicados", tipoTrabajo: "Documento",
      prioridad: "Alta", fechaSolicitud: "2026-06-19", fechaTope: "2026-06-21", solicitanteId: "ct", responsableId: "cont",
      estado: "revision", proxAccion: "Aprobar redacción", proxRespId: "ronald", esperaDe: "", involucrados: ["cont"], subtareas: [], eventos: [],
    },
    {
      id: 5, titulo: "Cobertura partido fin de semana", descripcion: "Foto y video en cancha.", proyectoId: "",
      entidad: "Primer Equipo", area: "Comunicación/Prensa", subcategoria: "Partido (cobertura)", tipoTrabajo: "Cobertura",
      prioridad: "Media", fechaSolicitud: "2026-06-20", fechaTope: "2026-06-28", solicitanteId: "ronald", responsableId: "foto",
      estado: "porhacer", proxAccion: "Confirmar acreditación", proxRespId: "foto", esperaDe: "", involucrados: ["foto"], subtareas: [], eventos: [],
    },
    {
      id: 6, titulo: "Cobranza de cuotas atrasadas (academia)", descripcion: "Seguimiento a representantes morosos.", proyectoId: "",
      entidad: "La Cantera", area: "Administración Cantera", subcategoria: "Cobranzas", tipoTrabajo: "Gestión/Seguimiento",
      prioridad: "Alta", fechaSolicitud: "2026-06-15", fechaTope: "2026-06-26", solicitanteId: "geren", responsableId: "coordadm",
      estado: "progreso", proxAccion: "Llamar a representantes pendientes", proxRespId: "coordadm", esperaDe: "", involucrados: ["coordadm", "asisadm"], subtareas: [], eventos: [],
    },
    {
      id: 7, titulo: "Control de contrato — patrocinador principal", descripcion: "Revisar contraprestaciones y vencimientos.", proyectoId: "p3",
      entidad: "Institucional", area: "Comercial/Patrocinios", subcategoria: "Contratos", tipoTrabajo: "Gestión/Seguimiento",
      prioridad: "Media", fechaSolicitud: "2026-06-10", fechaTope: "", solicitanteId: "ronald", responsableId: "ronald",
      estado: "porhacer", proxAccion: "Revisar contraprestaciones pendientes", proxRespId: "ronald", esperaDe: "", involucrados: ["ronald"], subtareas: [], eventos: [],
    },
    {
      id: 8, titulo: "Coordinación deportiva — torneo formativas", descripcion: "Reunión de planificación del torneo.", proyectoId: "",
      entidad: "La Cantera", area: "Administración Cantera", subcategoria: "Coordinación deportiva", tipoTrabajo: "Reunión",
      prioridad: "Media", fechaSolicitud: "2026-06-18", fechaTope: "2026-06-29", solicitanteId: "coorddep", responsableId: "coorddep",
      estado: "porhacer", proxAccion: "Convocar a entrenadores", proxRespId: "coorddep", esperaDe: "", involucrados: ["coorddep"], subtareas: [], eventos: [],
    },
  ],
};

async function fetchAll() {
  const [{ data: actRows, error: e1 }, { data: catRows, error: e2 }] = await Promise.all([
    supabase.from("actividades").select("id,data"),
    supabase.from("catalogos").select("data").eq("id", "main"),
  ]);
  if (e1 || e2) { console.error(e1 || e2); return null; }
  const actividades = (actRows || []).map((r) => r.data);
  const catalogos = catRows && catRows[0] ? catRows[0].data : null;
  if ((!actRows || actRows.length === 0) && !catalogos) {
    // Base vacía: sembrar datos de ejemplo una sola vez
    await supabase.from("catalogos").upsert({ id: "main", data: SEED.catalogos });
    await supabase.from("actividades").upsert(SEED.actividades.map((a) => ({ id: String(a.id), data: a })));
    return SEED;
  }
  return { actividades, catalogos: catalogos || SEED.catalogos };
}

async function sincronizar(prev, next) {
  try {
    const prevMap = new Map((prev.actividades || []).map((a) => [String(a.id), a]));
    const nextMap = new Map((next.actividades || []).map((a) => [String(a.id), a]));
    const upserts = [];
    for (const a of next.actividades || []) {
      const p = prevMap.get(String(a.id));
      if (!p || JSON.stringify(p) !== JSON.stringify(a)) upserts.push({ id: String(a.id), data: a });
    }
    const deletes = [];
    for (const a of prev.actividades || []) if (!nextMap.has(String(a.id))) deletes.push(String(a.id));
    if (upserts.length) await supabase.from("actividades").upsert(upserts);
    if (deletes.length) await supabase.from("actividades").delete().in("id", deletes);
    if (JSON.stringify(prev.catalogos) !== JSON.stringify(next.catalogos)) {
      await supabase.from("catalogos").upsert({ id: "main", data: next.catalogos });
    }
  } catch (e) { console.error("sync", e); }
}

function buildUnits(acts) {
  const u = [];
  for (const a of acts) {
    if (a.subtareas && a.subtareas.length) {
      for (const s of a.subtareas) u.push({ key: `${a.id}-${s.id}`, actId: a.id, subId: s.id, base: a.titulo, titulo: s.titulo, prioridad: s.prioridad || a.prioridad, entidad: a.entidad, estado: s.estado, fecha: s.fecha || "", funcion: s.miFuncion, duenoId: s.duenoId });
    } else {
      u.push({ key: `${a.id}`, actId: a.id, subId: null, base: null, titulo: a.titulo, prioridad: a.prioridad, entidad: a.entidad, estado: a.estado, fecha: a.fechaTope || "", funcion: null, duenoId: a.responsableId });
    }
  }
  return u;
}
const venc = (u) => u.fecha && pd(u.fecha) < HOY && u.estado !== "hecho";
const aprob = (u) => u.estado === "revision" && (u.funcion == null || u.funcion === "Apruebo" || u.funcion === "Superviso");

// Genera eventos automáticos comparando versión vieja vs nueva
function diffEventos(viejo, nuevo, actor, nombre) {
  const out = { ...nuevo, eventos: [...(nuevo.eventos || [])], subtareas: (nuevo.subtareas || []).map((s) => ({ ...s, eventos: [...(s.eventos || [])] })) };
  if (!viejo) { out.eventos.push(evt(actor, "creado", "Actividad creada")); return out; }
  const subN = out.subtareas.length > 0, subV = (viejo.subtareas || []).length > 0;
  if (!subN && !subV && viejo.estado !== out.estado) out.eventos.push(evt(actor, "estado", `${elabel(viejo.estado)} → ${elabel(out.estado)}`));
  if ((viejo.fechaTope || "") !== (out.fechaTope || "")) out.eventos.push(evt(actor, "fecha", `Fecha tope: ${fmt(viejo.fechaTope)} → ${fmt(out.fechaTope)}`));
  if ((viejo.responsableId || "") !== (out.responsableId || "")) out.eventos.push(evt(actor, "resp", `Responsable: ${nombre(viejo.responsableId)} → ${nombre(out.responsableId)}`));
  for (const ns of out.subtareas) {
    const os = (viejo.subtareas || []).find((s) => s.id === ns.id);
    if (!os) { ns.eventos.push(evt(actor, "creado", `Subtarea creada: ${ns.titulo}`)); continue; }
    if (os.estado !== ns.estado) ns.eventos.push(evt(actor, "estado", `${elabel(os.estado)} → ${elabel(ns.estado)}`));
    if ((os.fecha || "") !== (ns.fecha || "")) ns.eventos.push(evt(actor, "fecha", `Fecha: ${fmt(os.fecha)} → ${fmt(ns.fecha)}`));
    if ((os.duenoId || "") !== (ns.duenoId || "")) ns.eventos.push(evt(actor, "resp", `Dueño: ${nombre(os.duenoId)} → ${nombre(ns.duenoId)}`));
  }
  return out;
}

const inp = "w-full min-w-0 box-border rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300";
function Pill({ children, className, style }) { return <span style={style} className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${className || ""}`}>{children}</span>; }
function Field({ label, children }) { return <label className="flex h-full flex-col"><span className="mb-1 block text-xs font-medium text-slate-500">{label}</span><span className="mt-auto block">{children}</span></label>; }
const optInp = "w-full min-w-0 box-border rounded-lg border border-emerald-200 bg-emerald-50/40 px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300";
function FieldOpt({ label, children }) { return <label className="flex h-full flex-col"><span className="mb-1 block text-xs font-medium text-slate-400">{label} <span className="font-normal text-emerald-600">(opcional)</span></span><span className="mt-auto block">{children}</span></label>; }
const reqCls = (v) => `${inp}${!v || (typeof v === "string" && !v.trim()) ? " border-rose-300 bg-rose-50/40" : ""}`;
function EntBadge({ ent }) { return <Pill style={{ backgroundColor: ENT_COLOR[ent], color: "#fff" }}>{ent}</Pill>; }

function CardUnit({ u, nombre, onOpen, draggable, onDragStart }) {
  return (
    <div draggable={draggable} onDragStart={onDragStart} onClick={onOpen} style={{ borderLeftColor: ENT_COLOR[u.entidad] }} className="cursor-pointer rounded-lg border border-l-4 border-slate-200 bg-white p-2.5 shadow-sm hover:border-slate-300">
      <div className="flex items-start justify-between gap-1.5">
        <p className="text-sm font-medium leading-snug text-slate-800">{u.titulo}</p>
        {draggable && <GripVertical size={14} className="mt-0.5 shrink-0 text-slate-300" />}
      </div>
      {u.base && <p className="mt-0.5 text-[11px] text-slate-400">{u.base}</p>}
      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
        <Pill className={PRIO[u.prioridad].chip}>{u.prioridad}</Pill>
        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500"><User size={11} className="text-slate-400" />{nombre(u.duenoId)}</span>
        {u.fecha && <span className={`text-[11px] tabular-nums ${venc(u) ? "font-semibold text-rose-600" : "text-slate-400"}`}>{fmt(u.fecha)}</span>}
      </div>
    </div>
  );
}

function Kanban({ units, nombre, onOpen, onMove }) {
  const [drag, setDrag] = useState(null);
  const col = (k) => units.filter((u) => u.estado === k).sort((a, b) => (PRIOS.indexOf(a.prioridad) - PRIOS.indexOf(b.prioridad)) || (a.fecha || "9999").localeCompare(b.fecha || "9999"));
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {ESTADO_ORDEN.map((k) => {
        const items = col(k);
        return (
          <div key={k} onDragOver={(e) => e.preventDefault()} onDrop={() => { if (drag) onMove(drag, k); setDrag(null); }} className="flex w-64 shrink-0 flex-col rounded-xl bg-slate-100/70 p-2">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600"><span className={`h-1.5 w-1.5 rounded-full ${ESTADO[k].dot}`} />{ESTADO[k].label}</span>
              <span className="text-[11px] text-slate-400">{items.length}</span>
            </div>
            <div className="flex flex-col gap-2">
              {items.map((u) => <CardUnit key={u.key} u={u} nombre={nombre} onOpen={() => onOpen(u.actId)} draggable onDragStart={() => setDrag(u)} />)}
              {items.length === 0 && <p className="px-1 py-3 text-center text-[11px] text-slate-300">—</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Calendario({ units, onDia }) {
  const [cursor, setCursor] = useState(() => { const d = new Date(HOY); d.setDate(1); return d; });
  const y = cursor.getFullYear(), m = cursor.getMonth();
  const dias = new Date(y, m + 1, 0).getDate();
  const offset = (new Date(y, m, 1).getDay() + 6) % 7;
  const celdas = []; for (let i = 0; i < offset; i++) celdas.push(null); for (let d = 1; d <= dias; d++) celdas.push(new Date(y, m, d));
  const delDia = (date) => units.filter((u) => u.fecha && sameDay(pd(u.fecha), date) && u.estado !== "hecho");
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold capitalize text-slate-800">{cursor.toLocaleDateString("es-EC", { month: "long", year: "numeric" })}</p>
        <div className="flex gap-1">
          <button onClick={() => setCursor(new Date(y, m - 1, 1))} className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"><ChevronLeft size={16} /></button>
          <button onClick={() => { const d = new Date(HOY); d.setDate(1); setCursor(d); }} className="rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100">Hoy</button>
          <button onClick={() => setCursor(new Date(y, m + 1, 1))} className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"><ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-slate-400">
        {["L", "M", "X", "J", "V", "S", "D"].map((d) => <div key={d} className="pb-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {celdas.map((date, i) => {
          if (!date) return <div key={i} />;
          const items = delDia(date), hoy = sameDay(date, HOY);
          return (
            <button key={i} onClick={() => onDia(date)} className={`min-h-[68px] rounded-lg border p-1 text-left transition hover:border-slate-300 ${hoy ? "border-sky-400 bg-sky-50/40" : "border-slate-100"}`}>
              <span className={`text-[11px] font-medium ${hoy ? "text-sky-700" : "text-slate-500"}`}>{date.getDate()}</span>
              <div className="mt-0.5 space-y-0.5">
                {items.slice(0, 3).map((u) => <div key={u.key} className="truncate rounded px-1 py-0.5 text-[10px] font-medium text-white" style={{ backgroundColor: PRIO[u.prioridad].hex }}>{u.titulo}</div>)}
                {items.length > 3 && <div className="px-1 text-[10px] text-slate-400">+{items.length - 3}</div>}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 border-t border-slate-100 pt-3">
        {PRIOS.map((p) => <span key={p} className="inline-flex items-center gap-1 text-[11px] text-slate-500"><span className="h-2 w-2 rounded" style={{ backgroundColor: PRIO[p].hex }} />Prioridad {p.toLowerCase()}</span>)}
      </div>
    </div>
  );
}

function PanelDia({ date, units, nombre, onClose, onOpen, onMove }) {
  const delDia = units.filter((u) => u.fecha && sameDay(pd(u.fecha), date));
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm" onClick={onClose}>
      <div className="h-full w-full max-w-3xl overflow-y-auto bg-slate-50 p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Día</p>
            <h2 className="text-base font-semibold capitalize text-slate-900">{date.toLocaleDateString("es-EC", { weekday: "long", day: "numeric", month: "long" })}</h2>
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200"><X size={18} /></button>
        </div>
        {delDia.length === 0 ? <p className="py-12 text-center text-sm text-slate-400">Nada agendado este día.</p> : <Kanban units={delDia} nombre={nombre} onOpen={onOpen} onMove={onMove} />}
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, count, tone, active, onClick }) {
  const t = { violet: "text-violet-600 bg-violet-50", amber: "text-amber-600 bg-amber-50", rose: "text-rose-600 bg-rose-50" };
  return (
    <button onClick={onClick} className={`flex-1 rounded-xl border p-4 text-left transition ${active ? "border-slate-900 bg-white shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"}`}>
      <div className="flex items-center justify-between">
        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${t[tone]}`}><Icon size={16} /></span>
        <span className="text-2xl font-semibold tabular-nums text-slate-900">{count}</span>
      </div>
      <p className="mt-2 text-xs font-medium leading-tight text-slate-500">{label}</p>
    </button>
  );
}
function Inicio({ units, acts, nombre, onOpen, onDia }) {
  const ini = lunesDe(HOY);
  const venceHoy = (u) => u.estado !== "hecho" && u.fecha && sameDay(pd(u.fecha), HOY);
  const empieza = [
    ...units.filter(venc).sort((a, b) => (a.fecha || "").localeCompare(b.fecha || "")),
    ...units.filter(venceHoy).sort((a, b) => PRIOS.indexOf(a.prioridad) - PRIOS.indexOf(b.prioridad)),
  ];
  const esperando = [
    ...units.filter(aprob).map((u) => ({ ...u, tag: "aprob" })),
    ...units.filter((u) => u.estado === "espera").map((u) => ({ ...u, tag: "bloq" })),
  ];
  const sinFecha = acts.filter((a) => !a.fechaTope && !(a.subtareas || []).some((s) => s.fecha));
  const semana = [...Array(7)].map((_, i) => { const d = new Date(ini); d.setDate(ini.getDate() + i); return d; });
  const itemsDia = (d) => units.filter((u) => u.estado !== "hecho" && u.fecha && sameDay(pd(u.fecha), d));
  const topPrio = (arr) => (arr.some((u) => u.prioridad === "Alta") ? "Alta" : arr.some((u) => u.prioridad === "Media") ? "Media" : arr.length ? "Baja" : null);
  const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <div className="space-y-6">
      {/* 1 — Empieza por aquí */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-600"><AlertTriangle size={15} /></span>
          <p className="text-sm font-semibold text-slate-800">Empieza por aquí</p>
          <span className="text-[11px] text-slate-400">vencido y lo de hoy, en orden de ataque</span>
        </div>
        {empieza.length === 0 ? (
          <p className="py-5 text-center text-sm text-slate-400">Nada vencido ni para hoy. Vas al día — revisa la semana abajo. 👌</p>
        ) : (
          <ul className="space-y-2">
            {empieza.map((u) => {
              const vencida = venc(u);
              return (
                <li key={u.key} onClick={() => onOpen(u.actId)} style={{ borderLeftColor: PRIO[u.prioridad].hex }} className="flex cursor-pointer flex-col gap-2 rounded-lg border border-l-4 border-slate-200 bg-white px-3 py-2.5 hover:border-slate-300 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 sm:truncate">{u.titulo}</p>
                    <p className="text-[11px] text-slate-400">{u.base ? u.base + " · " : ""}{nombre(u.duenoId)}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <Pill className={PRIO[u.prioridad].chip}>{u.prioridad}</Pill>
                    <EntBadge ent={u.entidad} />
                    <span className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${vencida ? "bg-rose-100 text-rose-700" : "bg-sky-100 text-sky-700"}`}>{vencida ? `Vencida · ${fmt(u.fecha)}` : "Hoy"}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* 2 — Te están esperando */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-violet-600"><CheckSquare size={15} /></span>
          <p className="text-sm font-semibold text-slate-800">Te están esperando</p>
          <span className="text-[11px] text-slate-400">para destrabar, no para ejecutar</span>
        </div>
        {esperando.length === 0 ? (
          <p className="py-4 text-center text-sm text-slate-400">Nada esperando tu aprobación ni bloqueado.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {esperando.map((u) => (
              <li key={u.key + u.tag} onClick={() => onOpen(u.actId)} className="flex cursor-pointer flex-col gap-1.5 py-2.5 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-slate-700 sm:truncate">{u.titulo}</p>
                  <p className="text-[11px] text-slate-400">{u.base ? u.base + " · " : ""}{u.tag === "bloq" && u.esperaDe ? `espera: ${u.esperaDe}` : nombre(u.duenoId)}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {u.tag === "aprob"
                    ? <Pill className="bg-violet-50 text-violet-700">Tu aprobación</Pill>
                    : <Pill className="bg-amber-50 text-amber-700">Bloqueada</Pill>}
                  <span className="text-xs tabular-nums text-slate-400">{fmt(u.fecha)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 3 — Esta semana (mini) */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600"><Calendar size={15} /></span>
          <p className="text-sm font-semibold text-slate-800">Esta semana</p>
          <span className="text-[11px] text-slate-400">toca un día para ver su tablero</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {semana.map((d, i) => {
            const items = itemsDia(d), tp = topPrio(items), hoy = sameDay(d, HOY);
            return (
              <button key={i} onClick={() => onDia(d)} className={`flex flex-col items-center rounded-lg border p-2 transition hover:border-slate-300 ${hoy ? "border-sky-400 bg-sky-50/40" : "border-slate-100"}`}>
                <span className="text-[10px] font-medium uppercase text-slate-400">{DIAS[i]}</span>
                <span className={`text-sm font-semibold ${hoy ? "text-sky-700" : "text-slate-600"}`}>{d.getDate()}</span>
                {items.length > 0 ? (
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold text-white" style={{ backgroundColor: PRIO[tp].hex }}>{items.length}</span>
                ) : <span className="mt-1 h-[15px]" />}
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-3 border-t border-slate-100 pt-3">
          {PRIOS.map((p) => <span key={p} className="inline-flex items-center gap-1 text-[11px] text-slate-500"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: PRIO[p].hex }} />{p}</span>)}
        </div>
      </div>

      {/* Bandeja sin fecha — colapsada */}
      <details className="rounded-xl border border-dashed border-slate-300 bg-white p-4">
        <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-slate-700">
          <span className="flex items-center gap-2"><Inbox size={15} className="shrink-0 text-slate-400" /><span className="whitespace-nowrap">Bandeja · sin fecha</span></span>
          <span className="rounded-full bg-slate-100 px-1.5 text-[11px] font-medium text-slate-500">{sinFecha.length}</span>
          <span className="hidden text-[11px] font-normal text-slate-400 sm:inline">— para tu repaso, no para el día</span>
        </summary>
        {sinFecha.length === 0 ? <p className="py-2 text-center text-xs text-slate-400">Vacía.</p> : (
          <ul className="mt-3 space-y-1.5">
            {sinFecha.map((a) => (
              <li key={a.id} onClick={() => onOpen(a.id)} className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-1 hover:bg-slate-50">
                <CircleDot size={13} className="text-slate-300" /><span className="text-sm text-slate-700">{a.titulo}</span><EntBadge ent={a.entidad} />
              </li>
            ))}
          </ul>
        )}
      </details>
    </div>
  );
}

function PorPersona({ units, personas, nombre, onOpen, verUnit }) {
  const [sub, setSub] = useState("pendiente"); // pendiente | historial
  const [desde, setDesde] = useState(""); const [hasta, setHasta] = useState("");
  const ver = verUnit || (() => true);
  const enRango = (u) => {
    if (!desde && !hasta) return true;
    if (!u.fecha) return false;
    if (desde && u.fecha < desde) return false;
    if (hasta && u.fecha > hasta) return false;
    return true;
  };
  const grupos = personas.map((p) => {
    const propios = units.filter((u) => u.duenoId === p.id);
    const pendiente = propios.filter((u) => u.estado !== "hecho");
    const historial = propios.filter((u) => u.estado === "hecho" && enRango(u)).sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));
    return { ...p, pendiente, historial, abiertas: pendiente.length };
  }).filter((g) => (sub === "pendiente" ? g.pendiente.length : g.historial.length));

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-0.5">
          {[["pendiente", "Pendiente"], ["historial", "Historial"]].map(([id, lbl]) => (
            <button key={id} onClick={() => setSub(id)} className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${sub === id ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"}`}>{lbl}</button>
          ))}
        </div>
        {sub === "historial" && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Fecha tope:</span>
            <input type="date" className="rounded border border-slate-200 px-2 py-1 text-xs" value={desde} onChange={(e) => setDesde(e.target.value)} />
            <span>a</span>
            <input type="date" className="rounded border border-slate-200 px-2 py-1 text-xs" value={hasta} onChange={(e) => setHasta(e.target.value)} />
            {(desde || hasta) && <button onClick={() => { setDesde(""); setHasta(""); }} className="text-slate-400 hover:text-slate-700">limpiar</button>}
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {grupos.map((g) => {
          const lista = sub === "pendiente" ? g.pendiente : g.historial;
          const visibles = lista.filter(ver);
          const ocultas = lista.length - visibles.length;
          return (
            <div key={g.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500"><User size={15} /></span>
                  <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800">{g.nombre}</p><p className="truncate text-[11px] text-slate-400">{g.rol}</p></div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="whitespace-nowrap rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700" title="Completadas en el rango">{g.historial.length} hechas</span>
                  <span className="whitespace-nowrap rounded-full bg-slate-900 px-2 py-0.5 text-xs font-medium text-white" title="Abiertas">{g.abiertas} abiertas</span>
                </div>
              </div>
              <ul className="space-y-2">
                {visibles.map((u) => (
                  <li key={u.key} onClick={() => onOpen(u.actId)} className="-mx-1 flex cursor-pointer items-start gap-2 rounded-md px-1 py-1 hover:bg-slate-50">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${ESTADO[u.estado].dot}`} />
                    <div className="min-w-0"><p className="truncate text-sm text-slate-700">{u.titulo}</p><p className="text-[11px] text-slate-400">{u.base ? u.base + " · " : ""}{fmt(u.fecha)}{sub === "pendiente" && venc(u) && <span className="font-medium text-rose-600"> · vencida</span>}</p></div>
                  </li>
                ))}
                {ocultas > 0 && <li className="px-1 py-1 text-[11px] italic text-slate-400">+{ocultas} {ocultas === 1 ? "actividad no visible" : "actividades no visibles"} para tu área</li>}
                {visibles.length === 0 && ocultas === 0 && <li className="py-2 text-center text-xs text-slate-400">—</li>}
              </ul>
            </div>
          );
        })}
        {grupos.length === 0 && <p className="py-10 text-center text-sm text-slate-400 md:col-span-2">{sub === "pendiente" ? "Sin pendientes abiertos." : "Nada completado en este rango."}</p>}
      </div>
    </div>
  );
}

// Bitácora dentro del modal
function Bitacora({ live, nombre, onAvance, soloLectura }) {
  const [subSel, setSubSel] = useState("");
  const [texto, setTexto] = useState("");
  const timeline = [];
  for (const e of (live.eventos || [])) timeline.push({ ...e, ctx: "Actividad" });
  for (const s of (live.subtareas || [])) for (const e of (s.eventos || [])) timeline.push({ ...e, ctx: s.titulo });
  timeline.sort((a, b) => (b.ts || "").localeCompare(a.ts || ""));
  const allTs = timeline.map((e) => e.ts).filter(Boolean);
  const abierta = allTs.length ? diasDesde(allTs[allTs.length - 1]) : (live.fechaSolicitud ? diasDesde(live.fechaSolicitud + "T00:00:00") : 0);
  const ultEstado = timeline.find((e) => e.tipo === "estado");
  const enEstado = ultEstado ? diasDesde(ultEstado.ts) : abierta;
  const tipoIcon = { estado: ArrowRight, fecha: Calendar, resp: User, avance: History, creado: Plus };
  const tipoColor = { estado: "text-sky-600", fecha: "text-amber-600", resp: "text-violet-600", avance: "text-emerald-600", creado: "text-slate-400" };
  const registrar = () => { if (texto.trim()) { onAvance(subSel || null, texto.trim()); setTexto(""); } };
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 rounded-lg bg-slate-50 p-3"><p className="text-[11px] uppercase tracking-wide text-slate-400">Abierta hace</p><p className="text-lg font-semibold text-slate-800">{abierta} días</p></div>
        <div className="flex-1 rounded-lg bg-slate-50 p-3"><p className="text-[11px] uppercase tracking-wide text-slate-400">En estado actual hace</p><p className="text-lg font-semibold text-slate-800">{enEstado} días</p></div>
      </div>

      {!soloLectura && (
      <div className="rounded-lg border border-slate-200 p-3">
        <p className="mb-2 text-xs font-semibold text-slate-700">Registrar avance / gestión</p>
        <div className="flex flex-col gap-2">
          {(live.subtareas || []).length > 0 && (
            <select className={inp} value={subSel} onChange={(e) => setSubSel(e.target.value)}>
              <option value="">Actividad (general)</option>
              {live.subtareas.map((s) => <option key={s.id} value={s.id}>{s.titulo}</option>)}
            </select>
          )}
          <textarea className={inp} rows={2} value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Ej.: Llamé al patrocinador, no contestó, reintento el jueves." />
          <button onClick={registrar} className="self-end rounded-lg bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-800">Registrar</button>
        </div>
      </div>
      )}

      <div>
        <p className="mb-2 text-xs font-semibold text-slate-700">Historial</p>
        {timeline.length === 0 ? <p className="py-3 text-center text-xs text-slate-400">Sin movimientos aún.</p> : (
          <ul className="space-y-2">
            {timeline.map((e, i) => {
              const Ico = tipoIcon[e.tipo] || CircleDot;
              return (
                <li key={i} className="flex gap-2.5">
                  <span className={`mt-0.5 ${tipoColor[e.tipo] || "text-slate-400"}`}><Ico size={14} /></span>
                  <div className="min-w-0 flex-1 border-b border-slate-100 pb-2">
                    <p className="text-sm text-slate-700">{e.texto}</p>
                    <p className="text-[11px] text-slate-400">{e.ctx} · {nombre(e.autorId)} · {fmtTs(e.ts)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function QuickAdd({ plantillas, onCreate, onClose }) {
  const [titulo, setTitulo] = useState("");
  const [plantillaId, setPlantillaId] = useState("");
  const pl = plantillas.find((x) => x.id === plantillaId) || null;
  const [prioridad, setPrioridad] = useState("Media");
  const [fechaTope, setFechaTope] = useState("");
  // Al elegir plantilla, prerrellena la prioridad (el usuario puede cambiarla)
  const elegirPlantilla = (id) => { setPlantillaId(id); const t = plantillas.find((x) => x.id === id); if (t) setPrioridad(t.prioridad); };
  const valido = titulo.trim() && plantillaId;
  const crear = () => { if (valido) onCreate({ titulo: titulo.trim(), plantilla: pl, entidad: pl?.entidad || "Primer Equipo", prioridad, fechaTope }); };
  const hayPlantillas = plantillas.length > 0;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="my-16 w-full max-w-md rounded-2xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Captura rápida</h2>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <p className="mb-4 text-xs text-slate-400">Elige una plantilla y ponle nombre. La plantilla precarga entidad, área, responsable y subtareas.</p>
        {!hayPlantillas ? (
          <p className="rounded-lg bg-amber-50 px-3 py-3 text-sm text-amber-700">Aún no tienes plantillas. Créalas en la pestaña <b>Plantillas</b> para usar la captura rápida, o usa "Nueva" para una actividad completa.</p>
        ) : (
          <div className="space-y-3">
            <Field label="Título *"><input autoFocus className={inp} value={titulo} onChange={(e) => setTitulo(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") crear(); }} placeholder="Ej.: Story Juan Pérez vs Emelec" /></Field>
            <Field label="Plantilla *">
              <select className={`${inp} bg-sky-50`} value={plantillaId} onChange={(e) => elegirPlantilla(e.target.value)}>
                <option value="">— Elige una plantilla —</option>
                {plantillas.map((t) => <option key={t.id} value={t.id}>{t.nombre}</option>)}
              </select>
            </Field>
            {pl && <p className="-mt-1 text-[11px] text-slate-400">Precarga: {pl.entidad} · {pl.area} · {pl.tipoTrabajo}{plantillaSubs(pl).length ? ` · ${plantillaSubs(pl).length} subtareas` : ""}.</p>}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Prioridad *"><select className={inp} value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>{PRIOS.map((x) => <option key={x}>{x}</option>)}</select></Field>
              <Field label="Fecha tope (opcional)"><input type="date" className={inp} value={fechaTope} onChange={(e) => setFechaTope(e.target.value)} /></Field>
            </div>
            <p className="text-[11px] text-slate-400">Entidad, área, responsable y subtareas vienen de la plantilla. La fecha de solicitud se registra hoy.</p>
          </div>
        )}
        {hayPlantillas && (
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100">Cancelar</button>
            <button onClick={crear} disabled={!valido} className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${valido ? "bg-slate-900 hover:bg-slate-800" : "cursor-not-allowed bg-slate-300"}`}>Crear</button>
          </div>
        )}
      </div>
    </div>
  );
}

function ModalActividad({ inicial, live, cat, plantillasMias, nombre, onSave, onClose, onAvance, onDuplicar, onEliminar, soloLectura, esAdmin }) {
  const esNuevo = !inicial;
  const [vista, setVista] = useState("datos");
  const vacio = {
    titulo: "", descripcion: "", proyectoId: "", entidad: "", area: "", subcategoria: "",
    tipoTrabajo: "", prioridad: "", fechaSolicitud: HOY.toISOString().slice(0, 10), fechaTope: "", solicitanteId: "",
    responsableId: "", estado: "porhacer", proxAccion: "", proxRespId: "", esperaDe: "", involucrados: [], contrapartes: [], subtareas: [], eventos: [], privada: false,
  };
  const [f, setF] = useState(inicial ? { ...vacio, ...inicial } : vacio);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const subcatsArea = cat.subcats[f.area] || [];
  const tieneSub = f.subtareas.length > 0;
  const valido = f.titulo.trim() && f.entidad && f.area && f.prioridad && f.fechaSolicitud && f.responsableId;
  const personasSel = cat.personas;
  const contactos = cat.contactos || [];
  const toggleContra = (id) => setF((p) => ({ ...p, contrapartes: (p.contrapartes || []).includes(id) ? p.contrapartes.filter((x) => x !== id) : [...(p.contrapartes || []), id] }));
  const setSub = (i, k, v) => setF((p) => { const ns = [...p.subtareas]; ns[i] = { ...ns[i], [k]: v }; return { ...p, subtareas: ns }; });
  const addSub = () => setF((p) => ({ ...p, subtareas: [...p.subtareas, { id: "s" + Date.now(), titulo: "", duenoId: "dis", miFuncion: "Ejecuto", fecha: "", prioridad: "Media", estado: "porhacer", eventos: [] }] }));
  const delSub = (i) => setF((p) => ({ ...p, subtareas: p.subtareas.filter((_, x) => x !== i) }));
  const aplicarPlantilla = () => setF((p) => ({ ...p, subtareas: PLANTILLA_CONTENIDO.map((s, i) => ({ ...s, id: "s" + Date.now() + i, fecha: "", prioridad: "Media", estado: "porhacer", eventos: [] })) }));
  const toggleInv = (id) => setF((p) => ({ ...p, involucrados: p.involucrados.includes(id) ? p.involucrados.filter((x) => x !== id) : [...p.involucrados, id] }));
  const aplicarPlantillaTarea = (t) => setF((p) => ({ ...p, entidad: t.entidad, area: t.area, subcategoria: t.subcategoria, tipoTrabajo: t.tipoTrabajo, prioridad: t.prioridad, responsableId: t.responsableId, subtareas: plantillaSubs(t).length ? materializarSubs(t) : p.subtareas }));
  const [guardarPlantilla, setGuardarPlantilla] = useState(false);
  const [nombrePlantilla, setNombrePlantilla] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="my-8 w-full max-w-2xl rounded-2xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">{esNuevo ? "Nueva actividad" : "Actividad"}</h2>
          <div className="flex items-center gap-1">
            {!esNuevo && !soloLectura && <button onClick={() => onDuplicar(f)} title="Duplicar" className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Copy size={16} /></button>}
            {!esNuevo && !soloLectura && <button onClick={() => onEliminar(f.id)} title="Eliminar" className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={16} /></button>}
            <button onClick={onClose} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100"><X size={18} /></button>
          </div>
        </div>

        {!esNuevo && (
          <div className="mb-4 flex gap-1 border-b border-slate-200">
            {[["datos", "Datos"], ["bitacora", "Bitácora"]].map(([id, lbl]) => (
              <button key={id} onClick={() => setVista(id)} className={`-mb-px border-b-2 px-3 py-1.5 text-sm font-medium ${vista === id ? "border-sky-500 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"}`}>{lbl}</button>
            ))}
          </div>
        )}

        {vista === "bitacora" && live ? (
          <Bitacora live={live} nombre={nombre} soloLectura={soloLectura} onAvance={(subId, texto) => onAvance(f.id, subId, texto)} />
        ) : (
          <div className="space-y-3">
            {soloLectura && <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] text-slate-500">Solo lectura — no eres responsable de esta actividad ni de sus subtareas. Puedes verla, pero no editarla.</div>}
            <fieldset disabled={soloLectura} className="m-0 min-w-0 space-y-3 border-0 p-0">
            {esNuevo && (plantillasMias || []).length > 0 && (
              <Field label="Cargar plantilla (opcional)">
                <select className={`${inp} bg-sky-50`} value="" onChange={(e) => { const t = (plantillasMias || []).find((x) => x.id === e.target.value); if (t) aplicarPlantillaTarea(t); }}>
                  <option value="">— Empezar en blanco —</option>
                  {(plantillasMias || []).map((t) => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                </select>
              </Field>
            )}
            <Field label="Título *"><input className={reqCls(f.titulo)} value={f.titulo} onChange={(e) => set("titulo", e.target.value)} placeholder="¿Qué hay que hacer?" /></Field>
            <FieldOpt label="Descripción / notas"><textarea className={optInp} rows={2} value={f.descripcion} onChange={(e) => set("descripcion", e.target.value)} placeholder="Brief, links, contexto…" /></FieldOpt>
            <div className="grid grid-cols-2 gap-3">
              <FieldOpt label="Proyecto"><select className={optInp} value={f.proyectoId} onChange={(e) => set("proyectoId", e.target.value)}><option value="">— Sin proyecto —</option>{cat.proyectos.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}</select></FieldOpt>
              <Field label="Tipo de trabajo"><select className={inp} value={f.tipoTrabajo} onChange={(e) => set("tipoTrabajo", e.target.value)}><option value="">—</option>{cat.tipos.map((t) => <option key={t}>{t}</option>)}</select></Field>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Field label="Entidad *"><select className={reqCls(f.entidad)} value={f.entidad} onChange={(e) => set("entidad", e.target.value)}><option value="">— Selecciona —</option>{ENTIDADES.map((x) => <option key={x}>{x}</option>)}</select></Field>
              <Field label="Área *"><select className={reqCls(f.area)} value={f.area} onChange={(e) => { set("area", e.target.value); set("subcategoria", ""); }}><option value="">— Selecciona —</option>{AREAS.map((x) => <option key={x}>{x}</option>)}</select></Field>
              <Field label="Subcategoría"><select className={inp} value={f.subcategoria} onChange={(e) => set("subcategoria", e.target.value)}><option value="">—</option>{subcatsArea.map((x) => <option key={x}>{x}</option>)}</select></Field>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Field label="Prioridad *"><select className={reqCls(f.prioridad)} value={f.prioridad} onChange={(e) => set("prioridad", e.target.value)}><option value="">— Selecciona —</option>{PRIOS.map((x) => <option key={x}>{x}</option>)}</select></Field>
              <Field label="Fecha de solicitud *"><input type="date" className={reqCls(f.fechaSolicitud)} value={f.fechaSolicitud} onChange={(e) => set("fechaSolicitud", e.target.value)} /></Field>
              <Field label="Fecha tope"><input type="date" className={inp} value={f.fechaTope} onChange={(e) => set("fechaTope", e.target.value)} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nace de (solicitante)"><select className={inp} value={f.solicitanteId} onChange={(e) => set("solicitanteId", e.target.value)}><option value="">—</option><optgroup label="Equipo">{personasSel.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}</optgroup>{contactos.length > 0 && <optgroup label="Externos">{contactos.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}</optgroup>}</select></Field>
              <Field label="Asignado a / Responsable *"><select className={reqCls(f.responsableId)} value={f.responsableId} onChange={(e) => set("responsableId", e.target.value)}><option value="">—</option>{personasSel.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}</select></Field>
            </div>
            {!tieneSub && (
              <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3">
                <Field label="Estado"><select className={inp} value={f.estado} onChange={(e) => set("estado", e.target.value)}>{ESTADO_ORDEN.map((k) => <option key={k} value={k}>{ESTADO[k].label}</option>)}</select></Field>
                <FieldOpt label="En espera de"><input className={optInp} value={f.esperaDe} onChange={(e) => set("esperaDe", e.target.value)} placeholder="Quién bloquea, si aplica" /></FieldOpt>
                <FieldOpt label="Próxima acción"><input className={optInp} value={f.proxAccion} onChange={(e) => set("proxAccion", e.target.value)} /></FieldOpt>
                <FieldOpt label="Quién la tiene"><select className={optInp} value={f.proxRespId} onChange={(e) => set("proxRespId", e.target.value)}><option value="">—</option>{personasSel.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}<option value="externo">Tercero (fuera del equipo)</option></select></FieldOpt>
              </div>
            )}
            <div>
              <span className="mb-1 block text-xs font-medium text-slate-500">Personas involucradas</span>
              <div className="flex flex-wrap gap-1.5">
                {personasSel.map((p) => <button key={p.id} onClick={() => toggleInv(p.id)} className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${f.involucrados.includes(p.id) ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>{p.nombre}</button>)}
              </div>
            </div>
            {contactos.length > 0 && (
              <div>
                <span className="mb-1 block text-xs font-medium text-slate-500">Gestión con <span className="font-normal text-slate-400">(contraparte externa, opcional)</span></span>
                <div className="flex flex-wrap gap-1.5">
                  {contactos.map((c) => <button key={c.id} onClick={() => toggleContra(c.id)} className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${(f.contrapartes || []).includes(c.id) ? "bg-sky-600 text-white" : "bg-sky-50 text-sky-700 hover:bg-sky-100"}`}>{c.nombre}</button>)}
                </div>
                <p className="mt-1 text-[11px] text-slate-400">Externos con los que se hace la gestión (no usan el sistema, no son responsables).</p>
              </div>
            )}
            <div className="rounded-lg border border-slate-200 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Subtareas (proceso)</span>
                <div className="flex gap-1.5">
                  <button onClick={aplicarPlantilla} className="rounded-md bg-sky-50 px-2 py-1 text-[11px] font-medium text-sky-700 hover:bg-sky-100">Aplicar "Pieza de contenido"</button>
                  <button onClick={addSub} className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-200"><Plus size={12} />Subtarea</button>
                </div>
              </div>
              {f.subtareas.length === 0 ? <p className="py-2 text-center text-[11px] text-slate-400">Sin subtareas. La actividad se gestiona con su estado simple de arriba.</p> : (
                <div className="space-y-2">
                  {f.subtareas.map((s, i) => (
                    <div key={s.id} className="rounded-lg bg-slate-50 p-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-medium text-slate-400">{i + 1}</span>
                        <input className="flex-1 rounded border border-slate-200 px-2 py-1 text-xs" value={s.titulo} onChange={(e) => setSub(i, "titulo", e.target.value)} placeholder="Paso…" />
                        <button onClick={() => delSub(i)} className="rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={13} /></button>
                      </div>
                      <div className="mt-1.5 grid grid-cols-2 gap-1.5 sm:grid-cols-5">
                        <select className="rounded border border-slate-200 px-1.5 py-1 text-[11px]" value={s.duenoId} onChange={(e) => setSub(i, "duenoId", e.target.value)}>{personasSel.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}</select>
                        <select className="rounded border border-slate-200 px-1.5 py-1 text-[11px]" value={s.miFuncion} onChange={(e) => setSub(i, "miFuncion", e.target.value)}>{FUNCIONES.map((x) => <option key={x}>{x}</option>)}</select>
                        <input type="date" className="rounded border border-slate-200 px-1.5 py-1 text-[11px]" value={s.fecha} onChange={(e) => setSub(i, "fecha", e.target.value)} />
                        <select className="rounded border border-slate-200 px-1.5 py-1 text-[11px]" value={s.prioridad} onChange={(e) => setSub(i, "prioridad", e.target.value)}>{PRIOS.map((x) => <option key={x}>{x}</option>)}</select>
                        <select className="rounded border border-slate-200 px-1.5 py-1 text-[11px]" value={s.estado} onChange={(e) => setSub(i, "estado", e.target.value)}>{ESTADO_ORDEN.map((k) => <option key={k} value={k}>{ESTADO[k].label}</option>)}</select>
                      </div>
                    </div>
                  ))}
                  <p className="text-[11px] text-slate-400">Permite subtareas en paralelo. No cierra hasta que todas estén en "Hecho".</p>
                </div>
              )}
            </div>
            {esNuevo && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <input type="checkbox" checked={guardarPlantilla} onChange={(e) => setGuardarPlantilla(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-sky-600" />
                  Guardar también como plantilla
                </label>
                {guardarPlantilla && (
                  <div className="mt-2">
                    <input className={inp} value={nombrePlantilla} onChange={(e) => setNombrePlantilla(e.target.value)} placeholder="Nombre de la plantilla (ej.: Presentación de jugador)" />
                    <p className="mt-1 text-[11px] text-slate-400">Se guarda el patrón (área, tipo, prioridad, responsable, subtareas), sin el título ni las fechas de esta actividad.</p>
                  </div>
                )}
              </div>
            )}
            {esAdmin && (
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700">
                <input type="checkbox" checked={!!f.privada} onChange={(e) => set("privada", e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-sky-600" />
                Privada — solo el administrador puede verla
              </label>
            )}
            </fieldset>
            {soloLectura ? (
              <div className="flex justify-end pt-1">
                <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100">Cerrar</button>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-3 pt-1">
                {!valido && <span className="text-[11px] text-rose-500">Completa los campos marcados con *</span>}
                <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100">Cancelar</button>
                <button onClick={() => valido && onSave(f, esNuevo && guardarPlantilla ? { nombre: nombrePlantilla } : null)} disabled={!valido} className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${valido ? "bg-slate-900 hover:bg-slate-800" : "cursor-not-allowed bg-slate-300"}`}>{esNuevo ? "Crear actividad" : "Guardar cambios"}</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Catalogos({ cat, setCat }) {
  const [areaSel, setAreaSel] = useState(AREAS[0]);
  const [nP, setNP] = useState({ nombre: "", rol: "" });
  const [nPr, setNPr] = useState({ nombre: "", entidad: "Primer Equipo", descripcion: "" });
  const [nS, setNS] = useState(""); const [nT, setNT] = useState("");
  const [nC, setNC] = useState({ nombre: "", tipo: "" }); const [nTC, setNTC] = useState("");
  const contactos = cat.contactos || [];
  const tiposContacto = cat.tiposContacto || TIPOS_CONTACTO_DEFAULT;
  const upd = (parcial) => setCat({ ...cat, ...parcial });
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-800"><Users size={15} className="text-slate-400" />Visibilidad del equipo</p>
        <p className="text-xs text-slate-400">El alcance se define <b>por persona</b>, abajo en cada ficha de Personas. Cada quien puede: ver todo, ver solo ciertas entidades, o ver solo lo suyo. Tú como administrador siempre ves todo. Las actividades marcadas como "Privada" solo las ves tú.</p>
        <p className="mt-2 text-[11px] text-slate-400">El panorama "Por persona" muestra la carga (números) de todos; el detalle de cada actividad se limita a lo que cada quien puede ver.</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-800"><Users size={15} className="text-slate-400" />Personas</p>
        <p className="mb-3 text-xs text-slate-400">El correo vincula a cada persona con su inicio de sesión. Marca "Administrador" a quien deba ver y editar todo.</p>
        <div className="space-y-2">
          {cat.personas.map((p, i) => (
            <div key={p.id} className="rounded-lg border border-slate-100 p-2">
              <div className="flex items-start gap-2">
                <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                  <input className="flex-1 rounded border border-slate-200 px-2 py-1.5 text-sm" placeholder="Nombre" value={p.nombre} onChange={(e) => { const a = [...cat.personas]; a[i] = { ...p, nombre: e.target.value }; upd({ personas: a }); }} />
                  <input className="w-full rounded border border-slate-200 px-2 py-1.5 text-xs text-slate-500 sm:w-44" placeholder="Rol" value={p.rol} onChange={(e) => { const a = [...cat.personas]; a[i] = { ...p, rol: e.target.value }; upd({ personas: a }); }} />
                </div>
                <button onClick={() => upd({ personas: cat.personas.filter((x) => x.id !== p.id) })} className="mt-1 shrink-0 rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={14} /></button>
              </div>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                <input type="email" className="flex-1 rounded border border-slate-200 px-2 py-1.5 text-xs" placeholder="correo@guayaquilcityfc.com (para iniciar sesión)" value={p.email || ""} onChange={(e) => { const a = [...cat.personas]; a[i] = { ...p, email: e.target.value }; upd({ personas: a }); }} />
                <select className="w-full rounded border border-slate-200 px-2 py-1.5 text-xs text-slate-600 sm:w-48" value={p.admin ? "admin" : (p.alcance || "todo")} onChange={(e) => { const v = e.target.value; const a = [...cat.personas]; a[i] = v === "admin" ? { ...p, admin: true } : { ...p, admin: false, alcance: v }; upd({ personas: a }); }}>
                  <option value="admin">Administrador (ve y edita todo)</option>
                  <option value="todo">Ve todo</option>
                  <option value="entidades">Ve solo ciertas entidades</option>
                  <option value="solo">Ve solo lo suyo</option>
                </select>
              </div>
              {!p.admin && (p.alcance || "todo") === "entidades" && (
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg bg-slate-50 px-2.5 py-2">
                  <span className="text-[11px] font-medium text-slate-500">Entidades que ve:</span>
                  {ENTIDADES.map((ent) => {
                    const sel = (p.entidadesVis || []).includes(ent);
                    return (
                      <label key={ent} className="inline-flex items-center gap-1.5 text-[11px] text-slate-600">
                        <input type="checkbox" checked={sel} onChange={() => { const cur = p.entidadesVis || []; const next = sel ? cur.filter((x) => x !== ent) : [...cur, ent]; const a = [...cat.personas]; a[i] = { ...p, entidadesVis: next }; upd({ personas: a }); }} className="h-3.5 w-3.5" />{ent}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-start gap-2 border-t border-slate-100 pt-3">
          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <input className="flex-1 rounded border border-slate-200 px-2 py-1.5 text-sm" placeholder="Nombre" value={nP.nombre} onChange={(e) => setNP({ ...nP, nombre: e.target.value })} />
            <input className="w-full rounded border border-slate-200 px-2 py-1.5 text-xs sm:w-44" placeholder="Rol" value={nP.rol} onChange={(e) => setNP({ ...nP, rol: e.target.value })} />
          </div>
          <button onClick={() => { if (nP.nombre.trim()) { upd({ personas: [...cat.personas, { id: "u" + Date.now(), nombre: nP.nombre, rol: nP.rol, email: "", admin: false }] }); setNP({ nombre: "", rol: "" }); } }} className="inline-flex shrink-0 items-center gap-1 rounded-md bg-slate-900 px-3 py-2 text-xs font-medium text-white"><Plus size={13} />Agregar</button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-800"><User size={15} className="text-slate-400" />Contactos externos</p>
        <p className="mb-3 text-xs text-slate-400">Gente con la que se hace gestión pero que NO usa el sistema (presidente, cuerpo técnico, jugadores, patrocinadores…). Aparecen en las actividades como contraparte o solicitante, nunca como responsables ni con login.</p>
        <div className="space-y-2">
          {contactos.map((c, i) => (
            <div key={c.id} className="flex items-start gap-2">
              <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                <input className="flex-1 rounded border border-slate-200 px-2 py-1.5 text-sm" placeholder="Nombre" value={c.nombre} onChange={(e) => { const a = [...contactos]; a[i] = { ...c, nombre: e.target.value }; upd({ contactos: a }); }} />
                <select className="w-full rounded border border-slate-200 px-2 py-1.5 text-xs text-slate-600 sm:w-48" value={c.tipo} onChange={(e) => { const a = [...contactos]; a[i] = { ...c, tipo: e.target.value }; upd({ contactos: a }); }}>
                  <option value="">— Tipo —</option>
                  {tiposContacto.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <button onClick={() => upd({ contactos: contactos.filter((x) => x.id !== c.id) })} className="mt-1 shrink-0 rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={14} /></button>
            </div>
          ))}
          {contactos.length === 0 && <p className="py-2 text-center text-xs text-slate-400">Sin contactos externos aún.</p>}
        </div>
        <div className="mt-3 flex items-start gap-2 border-t border-slate-100 pt-3">
          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <input className="flex-1 rounded border border-slate-200 px-2 py-1.5 text-sm" placeholder="Nombre (ej.: Presidente, Marathon, Liga Pro)" value={nC.nombre} onChange={(e) => setNC({ ...nC, nombre: e.target.value })} />
            <select className="w-full rounded border border-slate-200 px-2 py-1.5 text-xs sm:w-48" value={nC.tipo} onChange={(e) => setNC({ ...nC, tipo: e.target.value })}>
              <option value="">— Tipo —</option>
              {tiposContacto.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <button onClick={() => { if (nC.nombre.trim()) { upd({ contactos: [...contactos, { id: "c" + Date.now(), nombre: nC.nombre.trim(), tipo: nC.tipo }] }); setNC({ nombre: "", tipo: "" }); } }} className="inline-flex shrink-0 items-center gap-1 rounded-md bg-slate-900 px-3 py-2 text-xs font-medium text-white"><Plus size={13} />Agregar</button>
        </div>
        <div className="mt-3 border-t border-slate-100 pt-3">
          <p className="mb-2 text-[11px] font-medium text-slate-500">Tipos de contacto</p>
          <div className="flex flex-wrap items-center gap-1.5">
            {tiposContacto.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full bg-slate-100 py-1 pl-3 pr-1.5 text-xs text-slate-600">{t}<button onClick={() => upd({ tiposContacto: tiposContacto.filter((x) => x !== t) })} className="rounded-full p-0.5 hover:bg-slate-300"><X size={12} /></button></span>
            ))}
            <input className="w-40 rounded border border-slate-200 px-2 py-1 text-xs" placeholder="Nuevo tipo + Enter" value={nTC} onChange={(e) => setNTC(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && nTC.trim() && !tiposContacto.includes(nTC.trim())) { upd({ tiposContacto: [...tiposContacto, nTC.trim()] }); setNTC(""); } }} />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800"><FileStack size={15} className="text-slate-400" />Proyectos</p>
        <div className="space-y-2">
          {cat.proyectos.map((p, i) => (
            <div key={p.id} className="flex items-start gap-2">
              <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                <input className="flex-1 rounded border border-slate-200 px-2 py-1.5 text-sm" value={p.nombre} onChange={(e) => { const a = [...cat.proyectos]; a[i] = { ...p, nombre: e.target.value }; upd({ proyectos: a }); }} />
                <select className="w-full rounded border border-slate-200 px-2 py-1.5 text-xs sm:w-40" value={p.entidad} onChange={(e) => { const a = [...cat.proyectos]; a[i] = { ...p, entidad: e.target.value }; upd({ proyectos: a }); }}>{ENTIDADES.map((x) => <option key={x}>{x}</option>)}</select>
              </div>
              <button onClick={() => upd({ proyectos: cat.proyectos.filter((x) => x.id !== p.id) })} className="mt-1 shrink-0 rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-start gap-2 border-t border-slate-100 pt-3">
          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <input className="flex-1 rounded border border-slate-200 px-2 py-1.5 text-sm" placeholder="Nombre del proyecto" value={nPr.nombre} onChange={(e) => setNPr({ ...nPr, nombre: e.target.value })} />
            <select className="w-full rounded border border-slate-200 px-2 py-1.5 text-xs sm:w-40" value={nPr.entidad} onChange={(e) => setNPr({ ...nPr, entidad: e.target.value })}>{ENTIDADES.map((x) => <option key={x}>{x}</option>)}</select>
          </div>
          <button onClick={() => { if (nPr.nombre.trim()) { upd({ proyectos: [...cat.proyectos, { id: "p" + Date.now(), ...nPr }] }); setNPr({ nombre: "", entidad: "Primer Equipo", descripcion: "" }); } }} className="inline-flex shrink-0 items-center gap-1 rounded-md bg-slate-900 px-3 py-2 text-xs font-medium text-white"><Plus size={13} />Agregar</button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800"><Layers size={15} className="text-slate-400" />Subcategorías (por área)</p>
        <select className="mb-3 w-full rounded border border-slate-200 px-2 py-1.5 text-sm sm:w-64" value={areaSel} onChange={(e) => setAreaSel(e.target.value)}>{AREAS.map((x) => <option key={x}>{x}</option>)}</select>
        <div className="flex flex-wrap gap-1.5">
          {(cat.subcats[areaSel] || []).map((s) => (
            <span key={s} className="inline-flex items-center gap-1 rounded-full bg-slate-100 py-1 pl-3 pr-1.5 text-xs text-slate-600">{s}<button onClick={() => upd({ subcats: { ...cat.subcats, [areaSel]: cat.subcats[areaSel].filter((x) => x !== s) } })} className="rounded-full p-0.5 hover:bg-slate-300"><X size={12} /></button></span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
          <input className="flex-1 rounded border border-slate-200 px-2 py-1 text-sm" placeholder={`Nueva subcategoría en ${areaSel}`} value={nS} onChange={(e) => setNS(e.target.value)} />
          <button onClick={() => { if (nS.trim() && !(cat.subcats[areaSel] || []).includes(nS.trim())) { upd({ subcats: { ...cat.subcats, [areaSel]: [...(cat.subcats[areaSel] || []), nS.trim()] } }); setNS(""); } }} className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white"><Plus size={13} />Agregar</button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800"><Database size={15} className="text-slate-400" />Tipos de trabajo <span className="font-normal text-slate-400">(lista global)</span></p>
        <div className="flex flex-wrap gap-1.5">
          {cat.tipos.map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-full bg-slate-100 py-1 pl-3 pr-1.5 text-xs text-slate-600">{t}<button onClick={() => upd({ tipos: cat.tipos.filter((x) => x !== t) })} className="rounded-full p-0.5 hover:bg-slate-300"><X size={12} /></button></span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
          <input className="flex-1 rounded border border-slate-200 px-2 py-1 text-sm" placeholder="Nuevo tipo de trabajo" value={nT} onChange={(e) => setNT(e.target.value)} />
          <button onClick={() => { if (nT.trim() && !cat.tipos.includes(nT.trim())) { upd({ tipos: [...cat.tipos, nT.trim()] }); setNT(""); } }} className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white"><Plus size={13} />Agregar</button>
        </div>
      </div>
    </div>
  );
}

function Plantillas({ cat, setCat, actor }) {
  const [nPl, setNPl] = useState({ nombre: "", entidad: "Primer Equipo", area: "Marketing", subcategoria: "", tipoTrabajo: "Pieza de contenido", prioridad: "Media", responsableId: "dis" });
  const upd = (parcial) => setCat({ ...cat, ...parcial });
  const plantillas = cat.plantillasTarea || [];
  const dueno = (t) => t.duenoId || "ronald"; // las de ejemplo (sin dueño) son del admin
  const mias = plantillas.filter((t) => dueno(t) === actor);
  const updT = (id, patch) => upd({ plantillasTarea: plantillas.map((t) => (t.id === id ? { ...t, ...patch } : t)) });
  const delT = (id) => upd({ plantillasTarea: plantillas.filter((t) => t.id !== id) });
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-800"><Copy size={15} className="text-slate-400" />Mis plantillas</p>
      <p className="mb-3 text-xs text-slate-400">Moldes con tus campos repetitivos. Son personales: solo tú las ves y las usas en la captura rápida y en "Nueva" → "Cargar plantilla".</p>
      <div className="space-y-2">
        {mias.map((t) => {
          const subs = plantillaSubs(t);
          const setSubs = (ns) => updT(t.id, { subtareasPlantilla: ns });
          return (
          <div key={t.id} className="rounded-lg bg-slate-50 p-2.5">
            <div className="flex items-center gap-2">
              <input className="flex-1 rounded border border-slate-200 px-2 py-1.5 text-sm" value={t.nombre} onChange={(e) => updT(t.id, { nombre: e.target.value })} />
              <button onClick={() => delT(t.id)} className="shrink-0 rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={14} /></button>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              <select className="w-full rounded border border-slate-200 px-1.5 py-1.5 text-[11px]" value={t.entidad} onChange={(e) => updT(t.id, { entidad: e.target.value })}>{ENTIDADES.map((x) => <option key={x}>{x}</option>)}</select>
              <select className="w-full rounded border border-slate-200 px-1.5 py-1.5 text-[11px]" value={t.area} onChange={(e) => updT(t.id, { area: e.target.value, subcategoria: "" })}>{AREAS.map((x) => <option key={x}>{x}</option>)}</select>
              <select className="w-full rounded border border-slate-200 px-1.5 py-1.5 text-[11px]" value={t.tipoTrabajo} onChange={(e) => updT(t.id, { tipoTrabajo: e.target.value })}>{cat.tipos.map((x) => <option key={x}>{x}</option>)}</select>
              <select className="w-full rounded border border-slate-200 px-1.5 py-1.5 text-[11px]" value={t.prioridad} onChange={(e) => updT(t.id, { prioridad: e.target.value })}>{PRIOS.map((x) => <option key={x}>{x}</option>)}</select>
              <select className="w-full rounded border border-slate-200 px-1.5 py-1.5 text-[11px]" value={t.responsableId} onChange={(e) => updT(t.id, { responsableId: e.target.value })}>{cat.personas.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}</select>
            </div>
            <div className="mt-2 rounded-lg border border-dashed border-slate-200 bg-white p-2">
              <p className="mb-1.5 text-[11px] font-medium text-slate-500">Subtareas del proceso <span className="font-normal text-slate-400">(opcional · se crean al usar la plantilla)</span></p>
              <div className="space-y-1.5">
                {subs.map((s, j) => (
                  <div key={j} className="flex items-center gap-1.5">
                    <input className="min-w-0 flex-1 rounded border border-slate-200 px-2 py-1 text-[11px]" value={s.titulo} placeholder={`Paso ${j + 1}`} onChange={(e) => setSubs(subs.map((x, k) => (k === j ? { ...x, titulo: e.target.value } : x)))} />
                    <select className="rounded border border-slate-200 px-1 py-1 text-[11px]" value={s.duenoId} onChange={(e) => setSubs(subs.map((x, k) => (k === j ? { ...x, duenoId: e.target.value } : x)))}>{cat.personas.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}</select>
                    <select className="rounded border border-slate-200 px-1 py-1 text-[11px]" value={s.miFuncion} onChange={(e) => setSubs(subs.map((x, k) => (k === j ? { ...x, miFuncion: e.target.value } : x)))}>{FUNCIONES.map((x) => <option key={x}>{x}</option>)}</select>
                    <button onClick={() => setSubs(subs.filter((_, k) => k !== j))} className="shrink-0 rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><X size={12} /></button>
                  </div>
                ))}
              </div>
              <button onClick={() => setSubs([...subs, { titulo: "", duenoId: cat.personas[0]?.id || "dis", miFuncion: "Ejecuto" }])} className="mt-1.5 inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-50"><Plus size={12} />Agregar paso</button>
            </div>
          </div>
          );
        })}
        {mias.length === 0 && <p className="py-2 text-center text-xs text-slate-400">Aún no tienes plantillas. Crea una abajo.</p>}
      </div>
      <div className="mt-3 border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2">
          <input className="flex-1 rounded border border-slate-200 px-2 py-1.5 text-sm" placeholder="Nombre de la plantilla" value={nPl.nombre} onChange={(e) => setNPl({ ...nPl, nombre: e.target.value })} />
          <button onClick={() => { if (nPl.nombre.trim()) { upd({ plantillasTarea: [...plantillas, { id: "t" + Date.now(), ...nPl, duenoId: actor }] }); setNPl({ ...nPl, nombre: "" }); } }} className="inline-flex shrink-0 items-center gap-1 rounded-md bg-slate-900 px-3 py-2 text-xs font-medium text-white"><Plus size={13} />Agregar</button>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          <select className="w-full rounded border border-slate-200 px-1.5 py-1.5 text-[11px]" value={nPl.entidad} onChange={(e) => setNPl({ ...nPl, entidad: e.target.value })}>{ENTIDADES.map((x) => <option key={x}>{x}</option>)}</select>
          <select className="w-full rounded border border-slate-200 px-1.5 py-1.5 text-[11px]" value={nPl.area} onChange={(e) => setNPl({ ...nPl, area: e.target.value })}>{AREAS.map((x) => <option key={x}>{x}</option>)}</select>
          <select className="w-full rounded border border-slate-200 px-1.5 py-1.5 text-[11px]" value={nPl.responsableId} onChange={(e) => setNPl({ ...nPl, responsableId: e.target.value })}>{cat.personas.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}</select>
        </div>
        <p className="mt-1.5 text-[11px] text-slate-400">Crea la plantilla y luego, en su fila, agrega los pasos (subtareas) del proceso.</p>
      </div>
    </div>
  );
}

export default function CentroDeMando({ session, onSignOut }) {
  const [db, setDb] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [entidad, setEntidad] = useState("Todos");
  const [tab, setTab] = useState("inicio");
  const [modal, setModal] = useState(null);
  const [aEliminar, setAEliminar] = useState(null);
  const [dia, setDia] = useState(null);
  const [kpiSel, setKpiSel] = useState(null);
  const [quick, setQuick] = useState(false);

  const dbRef = React.useRef({ actividades: [], catalogos: null });
  const refrescar = React.useCallback(async () => {
    const d = await fetchAll();
    if (d) { dbRef.current = d; setDb(d); }
  }, []);

  useEffect(() => {
    (async () => { await refrescar(); setCargando(false); })();
    const canal = supabase
      .channel("cdm-sync")
      .on("postgres_changes", { event: "*", schema: "public", table: "actividades" }, () => refrescar())
      .on("postgres_changes", { event: "*", schema: "public", table: "catalogos" }, () => refrescar())
      .subscribe();
    return () => { supabase.removeChannel(canal); };
  }, [refrescar]);

  const persist = (next) => { const prev = dbRef.current; dbRef.current = next; setDb(next); sincronizar(prev, next); };
  const cat = db?.catalogos;
  const acts = db?.actividades || [];
  const nombre = (id) => (id === "externo" ? "Tercero" : (cat?.personas.find((p) => p.id === id)?.nombre || cat?.contactos?.find((c) => c.id === id)?.nombre || "—"));

  // ── Identidad y permisos ──
  const ADMIN_EMAIL = "ronald.miranda@guayaquilcityfc.com";
  const correo = (session?.user?.email || "").toLowerCase();
  const yo = (cat?.personas || []).find((p) => (p.email || "").toLowerCase() === correo) || null;
  const esAdmin = (yo?.admin === true) || (correo === ADMIN_EMAIL);
  const actor = yo?.id || (esAdmin ? "ronald" : "anon");
  const participo = (a) => !!yo && (a.responsableId === yo.id || (a.subtareas || []).some((s) => s.duenoId === yo.id));
  const alcance = yo?.alcance || "todo"; // "todo" | "entidades" | "solo"
  const entidadesVis = yo?.entidadesVis || [];
  const puedeVer = (a) => {
    if (esAdmin) return true;
    if (a.privada) return false;
    if (!yo) return false; // cuenta sin vincular: sin acceso hasta que el admin la asocie
    if (alcance === "todo") return true;
    if (alcance === "solo") return participo(a);
    return participo(a) || entidadesVis.includes(a.entidad); // "entidades"
  };
  const puedeEditar = (a) => esAdmin || participo(a);

  const actsEnt = acts.filter((a) => entidad === "Todos" || a.entidad === entidad);
  const actsF = actsEnt.filter(puedeVer);
  // Visibilidad a nivel de tarjeta (subtarea). En "solo lo suyo" se ve únicamente lo propio;
  // si la persona es la responsable de la actividad, ve todo su proceso.
  const verUnit = (u) => {
    const a = acts.find((x) => String(x.id) === String(u.actId));
    if (!a || !puedeVer(a)) return false;
    if (!esAdmin && alcance === "solo" && yo) return a.responsableId === yo.id || u.duenoId === yo.id;
    return true;
  };
  const units = buildUnits(actsF).filter(verUnit);
  const unitsAll = buildUnits(actsEnt); // Por persona: carga (números) visible para todos
  const vencidasTot = units.filter(venc).length;
  const misPlantillas = (cat?.plantillasTarea || []).filter((t) => (t.duenoId || "ronald") === actor);

  const crear = (a, plantillaReq) => {
    const c = diffEventos(null, { ...a, id: Date.now() }, actor, nombre);
    let next = { ...db, actividades: [...acts, c] };
    if (plantillaReq) {
      const nuevaPl = { id: "t" + Date.now(), nombre: (plantillaReq.nombre || "").trim() || `${a.area} · ${a.tipoTrabajo}`, entidad: a.entidad, area: a.area, subcategoria: a.subcategoria || "", tipoTrabajo: a.tipoTrabajo, prioridad: a.prioridad, responsableId: a.responsableId, subtareasPlantilla: (a.subtareas || []).map((s) => ({ titulo: s.titulo, duenoId: s.duenoId, miFuncion: s.miFuncion || "Ejecuto" })), duenoId: actor };
      next = { ...next, catalogos: { ...db.catalogos, plantillasTarea: [...(db.catalogos.plantillasTarea || []), nuevaPl] } };
    }
    persist(next); setModal(null);
  };
  const editar = (nuevo) => { const viejo = acts.find((x) => x.id === nuevo.id); const c = diffEventos(viejo, nuevo, actor, nombre); persist({ ...db, actividades: acts.map((x) => (x.id === nuevo.id ? c : x)) }); setModal(null); };
  const eliminar = (id) => { persist({ ...db, actividades: acts.filter((x) => x.id !== id) }); setAEliminar(null); setModal(null); };
  const setCat = (nc) => persist({ ...db, catalogos: nc });
  const mover = (u, nuevo) => {
    const act = acts.find((a) => a.id === u.actId);
    if (act && !puedeEditar(act)) return;
    persist({ ...db, actividades: acts.map((a) => {
      if (a.id !== u.actId) return a;
      if (u.subId) return { ...a, subtareas: a.subtareas.map((s) => (s.id === u.subId ? { ...s, estado: nuevo, eventos: [...(s.eventos || []), evt(actor, "estado", `${elabel(s.estado)} → ${elabel(nuevo)}`)] } : s)) };
      return { ...a, estado: nuevo, eventos: [...(a.eventos || []), evt(actor, "estado", `${elabel(a.estado)} → ${elabel(nuevo)}`)] };
    }) });
  };
  const registrarAvance = (actId, subId, texto) => {
    persist({ ...db, actividades: acts.map((a) => {
      if (a.id !== actId) return a;
      if (subId) return { ...a, subtareas: a.subtareas.map((s) => (s.id === subId ? { ...s, eventos: [...(s.eventos || []), evt(actor, "avance", texto)] } : s)) };
      return { ...a, eventos: [...(a.eventos || []), evt(actor, "avance", texto)] };
    }) });
  };
  const duplicar = (a) => {
    const copia = { ...a, id: Date.now(), titulo: a.titulo + " (copia)", estado: "porhacer", eventos: [evt(actor, "creado", "Duplicada desde otra actividad")], subtareas: (a.subtareas || []).map((s, i) => ({ ...s, id: "s" + Date.now() + i, estado: "porhacer", eventos: [] })) };
    persist({ ...db, actividades: [...acts, copia] }); setModal(null);
  };
  const quickCrear = ({ titulo, plantilla, entidad, prioridad, fechaTope }) => {
    const t = plantilla || {};
    const hoyISO = HOY.toISOString().slice(0, 10);
    const subtareas = materializarSubs(t);
    const base = {
      titulo, descripcion: "", proyectoId: "", entidad,
      area: t.area || "Marketing", subcategoria: t.subcategoria || "", tipoTrabajo: t.tipoTrabajo || "Pieza de contenido",
      prioridad, fechaSolicitud: hoyISO, fechaTope: fechaTope || "", solicitanteId: "",
      responsableId: t.responsableId || "dis", estado: "porhacer", proxAccion: "", proxRespId: "", esperaDe: "",
      involucrados: [], subtareas, eventos: [],
    };
    const c = diffEventos(null, { ...base, id: Date.now() }, actor, nombre);
    persist({ ...db, actividades: [...acts, c] }); setQuick(false);
  };
  const abrir = (id) => { const a = acts.find((x) => x.id === id); if (a && puedeVer(a)) setModal({ a, soloLectura: !puedeEditar(a) }); };
  const live = modal && modal.a ? acts.find((x) => x.id === modal.a.id) : null;

  const tabs = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "calendario", label: "Calendario", icon: Calendar },
    { id: "tablero", label: "Tablero", icon: LayoutGrid },
    { id: "persona", label: "Por persona", icon: Users },
    { id: "plantillas", label: "Plantillas", icon: Copy },
    ...(esAdmin ? [{ id: "catalogos", label: "Catálogos", icon: Database }] : []),
  ];

  if (cargando) return <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-400">Cargando…</div>;

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="w-full px-2 py-2" style={{ background: NAVY }}>
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-2 sm:gap-3">
          <img src={LOGO} alt="Guayaquil City F.C." className="h-9 w-9 shrink-0" />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold leading-tight text-white">GCFC</h1>
            <p className="truncate text-[9px] uppercase tracking-widest sm:text-[11px]" style={{ color: "#7fb3e0" }}>Centro de Mando</p>
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="rounded-md bg-white/10 px-2 py-1.5 text-xs text-white">{yo ? yo.nombre : (session?.user?.email || "—")}</span>
            {esAdmin ? <span className="rounded-md bg-sky-500/30 px-1.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky-100">Admin</span>
              : <span className="rounded-md bg-white/10 px-1.5 py-1 text-[10px] font-medium text-white/70">{!yo ? "sin vincular" : (alcance === "solo" ? "ve solo lo suyo" : alcance === "entidades" ? "ve entidades" : "ve todo")}</span>}
          </div>
          <button onClick={() => setQuick(true)} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-white/90 hover:bg-white/10 sm:px-3"><Clock size={15} />Rápida</button>
          <button onClick={() => setModal({ a: null })} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-2 text-sm font-medium text-white hover:bg-white/20 sm:px-3"><Plus size={16} />Nueva</button>
          <button onClick={onSignOut} title={session?.user?.email || "Cerrar sesión"} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white">Salir</button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        {vencidasTot > 0 && (
          <button onClick={() => setTab("inicio")} className="mb-4 flex w-full items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2.5 text-left text-sm text-rose-700 hover:bg-rose-100">
            <AlertTriangle size={16} /><span className="font-medium">{vencidasTot} {vencidasTot === 1 ? "tarea vencida" : "tareas vencidas"}</span><span className="text-rose-500">— pasaron su fecha tope y no están en "Hecho". Toca para verlas.</span>
          </button>
        )}

        <div className="mb-4 flex max-w-full items-center gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-white p-0.5 sm:w-fit">
          {["Todos", ...ENTIDADES].map((s) => (
            <button key={s} onClick={() => setEntidad(s)} className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition ${entidad === s ? "text-white" : "text-slate-500 hover:text-slate-800"}`} style={entidad === s ? { backgroundColor: s === "Todos" ? NAVY : ENT_COLOR[s] } : {}}>
              {s !== "Todos" && <Building2 size={12} />}{s}
            </button>
          ))}
        </div>

        <div className="mb-5 flex items-center gap-1 overflow-x-auto border-b border-slate-200">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`-mb-px inline-flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition ${tab === t.id ? "border-sky-500 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
              <t.icon size={15} />{t.label}{t.id === "inicio" && vencidasTot > 0 && <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />}
            </button>
          ))}
        </div>

        {tab === "inicio" && <Inicio units={units} acts={actsF} nombre={nombre} onOpen={abrir} onDia={setDia} />}
        {tab === "calendario" && <Calendario units={units} onDia={setDia} />}
        {tab === "tablero" && <Kanban units={units} nombre={nombre} onOpen={abrir} onMove={mover} />}
        {tab === "persona" && <PorPersona units={unitsAll} personas={cat.personas} nombre={nombre} onOpen={abrir} verUnit={verUnit} />}
        {tab === "plantillas" && <Plantillas cat={cat} setCat={setCat} actor={actor} />}
        {tab === "catalogos" && esAdmin && <Catalogos cat={cat} setCat={setCat} />}

        <p className="mt-6 text-center text-[11px] text-slate-400">Datos de ejemplo · edítalos o reemplázalos · todo se guarda automáticamente</p>
      </div>

      {modal && <ModalActividad inicial={modal.a} live={live} cat={cat} plantillasMias={misPlantillas} nombre={nombre} soloLectura={modal.soloLectura} esAdmin={esAdmin} onSave={modal.a ? editar : crear} onClose={() => setModal(null)} onAvance={registrarAvance} onDuplicar={duplicar} onEliminar={(id) => setAEliminar(id)} />}
      {quick && <QuickAdd plantillas={misPlantillas} onCreate={quickCrear} onClose={() => setQuick(false)} />}
      {dia && <PanelDia date={dia} units={units} nombre={nombre} onClose={() => setDia(null)} onOpen={(id) => { setDia(null); abrir(id); }} onMove={mover} />}

      {aEliminar && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm" onClick={() => setAEliminar(null)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm font-semibold text-slate-900">¿Eliminar actividad?</p>
            <p className="mt-1 text-sm text-slate-500">Se borrará de forma permanente, junto con su bitácora.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setAEliminar(null)} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100">Cancelar</button>
              <button onClick={() => eliminar(aEliminar)} className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
