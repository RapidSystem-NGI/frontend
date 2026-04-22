import { useState, useEffect } from "react";

const COLORS = {
  red: "#e53e3e",
  redLight: "#fff5f5",
  redMid: "#fed7d7",
  redDark: "#c53030",
  green: "#38a169",
  greenLight: "#f0fff4",
  amber: "#d69e2e",
  amberLight: "#fffff0",
  blue: "#3182ce",
  blueLight: "#ebf8ff",
  bg: "#f7fafc",
  surface: "#ffffff",
  surface2: "#edf2f7",
  border: "#e2e8f0",
  border2: "#cbd5e0",
  text: "#1a202c",
  text2: "#4a5568",
  text3: "#a0aec0",
  sidebar: "#2d3748",
  sidebarText: "#a0aec0",
};

const styles = {
  // Global
  app: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: COLORS.bg,
    color: COLORS.text,
    minHeight: "100vh",
  },
  // Auth
  authWrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f7fafc 0%, #e2e8f0 100%)",
  },
  authCard: {
    background: COLORS.surface,
    borderRadius: 18,
    boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 0 0 1px #e2e8f0",
    padding: "44px 48px",
    width: 420,
  },
  authLogo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 32,
  },
  authLogoIcon: {
    width: 42,
    height: 42,
    background: COLORS.red,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 4,
    letterSpacing: "-0.5px",
  },
  authSub: {
    fontSize: 14,
    color: COLORS.text2,
    marginBottom: 28,
  },
  field: { marginBottom: 18 },
  fieldLabel: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: COLORS.text2,
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    marginBottom: 7,
  },
  fieldInput: {
    width: "100%",
    border: `1.5px solid ${COLORS.border2}`,
    borderRadius: 9,
    padding: "11px 14px",
    fontSize: 14,
    color: COLORS.text,
    background: COLORS.surface,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  btnPrimary: {
    width: "100%",
    background: COLORS.red,
    color: "white",
    border: "none",
    borderRadius: 9,
    padding: "12px",
    fontSize: 15,
    fontWeight: 600,
    fontFamily: "inherit",
    cursor: "pointer",
    marginTop: 6,
    letterSpacing: "0.3px",
  },
  authSwitch: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 13,
    color: COLORS.text2,
  },
  authLocBanner: {
    marginTop: 20,
    background: COLORS.surface2,
    borderRadius: 9,
    padding: "11px 14px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    color: COLORS.text2,
  },
  // App Layout
  topbar: {
    height: 58,
    background: COLORS.surface,
    borderBottom: `1px solid ${COLORS.border}`,
    display: "flex",
    alignItems: "center",
    padding: "0 28px",
    gap: 16,
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  topbarBrand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginRight: 24,
  },
  topbarBrandIcon: {
    width: 32,
    height: 32,
    background: COLORS.red,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topbarSearch: {
    flex: 1,
    maxWidth: 340,
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: COLORS.surface2,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    padding: "8px 14px",
    color: COLORS.text3,
    fontSize: 13,
  },
  topbarActions: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  topbarIconBtn: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    border: `1px solid ${COLORS.border}`,
    background: COLORS.surface,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    background: COLORS.red,
    borderRadius: "50%",
    fontSize: 10,
    color: "white",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid white",
  },
  topbarUser: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    padding: "5px 10px",
    borderRadius: 8,
  },
  topbarAvatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: COLORS.redLight,
    border: `2px solid ${COLORS.redMid}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.red,
  },
  appBody: { display: "flex", flex: 1 },
  sidebar: {
    width: 210,
    background: COLORS.sidebar,
    display: "flex",
    flexDirection: "column",
    padding: "16px 0",
    flexShrink: 0,
    position: "sticky",
    top: 58,
    height: "calc(100vh - 58px)",
    overflowY: "auto",
  },
  navItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 11,
    padding: "10px 20px",
    cursor: "pointer",
    color: active ? "#fff" : COLORS.sidebarText,
    fontSize: 14,
    fontWeight: active ? 600 : 400,
    background: active ? "rgba(229,62,62,0.18)" : "transparent",
    borderLeft: active ? `3px solid ${COLORS.red}` : "3px solid transparent",
    transition: "all 0.15s",
  }),
  content: {
    flex: 1,
    padding: "28px 36px",
    overflowY: "auto",
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 4,
    letterSpacing: "-0.4px",
  },
  pageSub: {
    fontSize: 14,
    color: COLORS.text2,
    marginBottom: 28,
  },
  card: {
    background: COLORS.surface,
    borderRadius: 14,
    border: `1px solid ${COLORS.border}`,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    padding: 24,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: 16,
  },
  // SOS Button
  sosBtn: {
    width: 130,
    height: 130,
    borderRadius: "50%",
    background: COLORS.red,
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: 2,
    boxShadow: `0 0 0 16px rgba(229,62,62,0.10), 0 0 0 30px rgba(229,62,62,0.05)`,
  },
  // Chips
  chip: (color) => {
    const map = {
      green: { bg: COLORS.greenLight, color: COLORS.green },
      amber: { bg: COLORS.amberLight, color: COLORS.amber },
      red: { bg: COLORS.redLight, color: COLORS.red },
      blue: { bg: COLORS.blueLight, color: COLORS.blue },
    };
    return {
      fontSize: 11,
      fontWeight: 600,
      padding: "3px 10px",
      borderRadius: 20,
      background: map[color].bg,
      color: map[color].color,
    };
  },
  // Stat cards
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    background: COLORS.surface,
    borderRadius: 14,
    border: `1px solid ${COLORS.border}`,
    padding: "20px 22px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  statNum: {
    fontSize: 28,
    fontWeight: 700,
    color: COLORS.text,
    letterSpacing: "-1px",
  },
  statLbl: {
    fontSize: 12,
    color: COLORS.text2,
    marginTop: 4,
  },
  // Responder
  responderItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 14px",
    background: COLORS.surface2,
    borderRadius: 10,
    marginBottom: 8,
  },
  rAvatar: (color = COLORS.blueLight, textColor = COLORS.blue) => ({
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    color: textColor,
    flexShrink: 0,
  }),
  // Alert cards
  alertCard: (critical) => ({
    background: critical ? "#fff8f8" : COLORS.surface,
    borderRadius: 14,
    border: `1.5px solid ${critical ? COLORS.redMid : COLORS.border}`,
    padding: "20px 24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 14,
  }),
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: COLORS.redLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  btnSmRed: {
    background: COLORS.red,
    color: "white",
    border: "none",
    borderRadius: 8,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "inherit",
    cursor: "pointer",
  },
  btnSmOutline: {
    background: "none",
    color: COLORS.text2,
    border: `1.5px solid ${COLORS.border2}`,
    borderRadius: 8,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "inherit",
    cursor: "pointer",
  },
  // Map placeholder
  mapPlaceholder: {
    background: "#dce8dc",
    borderRadius: 12,
    overflow: "hidden",
    border: `1px solid #c0d4c0`,
    marginBottom: 20,
  },
  // Profile
  skillItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 0",
    borderBottom: `1px solid ${COLORS.border}`,
    fontSize: 14,
  },
  skillCheck: (done) => ({
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: done ? COLORS.greenLight : COLORS.surface2,
    border: done ? "none" : `1.5px solid ${COLORS.border2}`,
  }),
  toggle: (on) => ({
    width: 42,
    height: 22,
    borderRadius: 11,
    background: on ? COLORS.green : COLORS.border2,
    position: "relative",
    cursor: "pointer",
    transition: "background 0.2s",
    flexShrink: 0,
  }),
  toggleKnob: (on) => ({
    position: "absolute",
    top: 2,
    left: on ? "calc(100% - 20px)" : 2,
    width: 18,
    height: 18,
    borderRadius: "50%",
    background: "white",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
    transition: "left 0.2s",
  }),
};

// ── SVG Icons ──
const Icon = {
  bolt: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  home: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
  bell: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>,
  map: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>,
  team: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>,
  history: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7v4l5-5-5-5v4z"/></svg>,
  profile: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>,
  settings: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>,
  logout: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>,
  pin: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>,
  check: <svg width="11" height="11" viewBox="0 0 24 24" fill={COLORS.green}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>,
  fire: <svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.red}><path d="M12 1a9 9 0 0 0-6 15.93V21a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4.07A9 9 0 0 0 12 1z"/></svg>,
  medical: <svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.blue}><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>,
  search: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.text3} strokeWidth="2"><circle cx="11" cy="11" r="6"/><path d="M21 21l-4-4"/></svg>,
  email: <svg width="15" height="15" viewBox="0 0 24 24" fill={COLORS.text3}><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
};

// ── Components ──
function Spinner() {
  return (
    <div style={{ width: 18, height: 18, border: `2px solid ${COLORS.border2}`, borderTopColor: COLORS.red, borderRadius: "50%", animation: "spin 0.8s linear infinite", flexShrink: 0 }} />
  );
}

function PulseDot({ color = COLORS.green }) {
  return <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: color, marginRight: 5, animation: "pulse 2s infinite" }} />;
}

function MapSVG({ full = false }) {
  const h = full ? 300 : 210;
  const w = full ? 800 : 600;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} xmlns="http://www.w3.org/2000/svg">
      <rect width={w} height={h} fill="#d4e6d4"/>
      {[60,120,180,240].map(y => <rect key={y} x="0" y={y} width={w} height="10" fill="#c8d8c8"/>)}
      {[80,200,340,480,620].map(x => <rect key={x} x={x} y="0" width="10" height={h} fill="#c8d8c8"/>)}
      <rect x="90" y="70" width="100" height="40" fill="#b8ccb8" rx="3"/>
      <rect x="210" y="70" width="120" height="40" fill="#b8ccb8" rx="3"/>
      <rect x="350" y="130" width="120" height="40" fill="#b8ccb8" rx="3"/>
      {full && <rect x="456" y="70" width="120" height="40" fill="#b8ccb8" rx="3"/>}
      <line x1={full ? 220 : 150} y1={full ? 190 : 150} x2={full ? 480 : 370} y2={full ? 110 : 110} stroke="#2563eb" strokeWidth="2" strokeDasharray="6,4"/>
      <circle cx={full ? 480 : 370} cy="110" r="13" fill="#dc2626"/>
      <text x={full ? 480 : 370} y="115" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">!</text>
      <circle cx={full ? 220 : 150} cy={full ? 190 : 150} r="11" fill="#2563eb"/>
      <text x={full ? 220 : 150} y={full ? 195 : 155} textAnchor="middle" fill="white" fontSize="11">Y</text>
      {full && <><circle cx="350" cy="260" r="11" fill="#38a169"/><text x="350" y="265" textAnchor="middle" fill="white" fontSize="11">R</text></>}
    </svg>
  );
}

// ── GPS Location Hook ──
function useLocation() {
  const [loc, setLoc] = useState({ status: "idle", address: "", coords: null });

  const fetch = () => {
    if (!navigator.geolocation) {
      setLoc({ status: "error", address: "Geolocation not supported", coords: null });
      return;
    }
    setLoc(l => ({ ...l, status: "loading" }));
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        let address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        try {
          const res = await window.fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await res.json();
          const a = data.address || {};
          const parts = [
            a.road || a.pedestrian || a.suburb,
            a.city || a.town || a.village || a.county,
            a.state,
          ].filter(Boolean);
          address = parts.join(", ") || data.display_name || address;
        } catch (_) {}
        setLoc({ status: "ok", address, coords: { lat, lng } });
      },
      (err) => {
        setLoc({ status: "error", address: "Location access denied", coords: null });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => { fetch(); }, []);
  return { ...loc, refresh: fetch };
}

// ── SCREENS ──
function HomeScreen({ onNavigate }) {
  const [eType, setEType] = useState("Fire");
  const loc = useLocation();

  const locText = loc.status === "loading"
    ? "Detecting location…"
    : loc.status === "ok"
    ? loc.address
    : loc.status === "error"
    ? loc.address
    : "—";

  return (
    <div>
      <div style={styles.pageTitle}>Emergency Quick Start</div>
      <div style={styles.pageSub}>Trigger an SOS or monitor active incidents in your area</div>
      {/* Stats Row */}
      <div style={styles.statGrid}>
        {[
          { num: "2", lbl: "Active Alerts", dot: "red" },
          { num: "5", lbl: "Responders Online", dot: "green" },
          { num: "3", lbl: "Incidents Today" },
          { num: "12", lbl: "Total Responders" },
        ].map((s, i) => (
          <div key={i} style={styles.statCard}>
            <div style={styles.statNum}>{s.dot && <PulseDot color={COLORS[s.dot]} />}{s.num}</div>
            <div style={styles.statLbl}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* SOS + Responders */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* SOS Card */}
        <div style={styles.card}>
          <div style={{ textAlign: "center", padding: "20px 0 24px" }}>
            <button style={styles.sosBtn} onClick={() => onNavigate("alertSent")}>
              SOS
              <span style={{ fontSize: 10, fontWeight: 400, letterSpacing: 1.5, opacity: 0.85 }}>TAP TO ALERT</span>
            </button>
            <div style={{ marginTop: 16, fontSize: 13, color: COLORS.text2, fontWeight: 500 }}>Press to send emergency alert</div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 10 }}>Emergency Type</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[{ label: "Fire", icon: Icon.fire }].map(({ label, icon }) => (
                <div key={label} onClick={() => setEType(label)} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
                  borderRadius: 8, border: `1.5px solid ${eType === label ? COLORS.red : COLORS.border2}`,
                  background: eType === label ? COLORS.redLight : COLORS.surface,
                  color: eType === label ? COLORS.red : COLORS.text2,
                  fontSize: 13, fontWeight: 500, cursor: "pointer",
                }}>
                  {icon}{label}
                </div>
              ))}
            </div>

            {/* Live Location Banner */}
            <div style={{ marginTop: 14, background: loc.status === "ok" ? "#f0fff4" : COLORS.surface2, border: `1px solid ${loc.status === "ok" ? "#c6f6d5" : COLORS.border}`, borderRadius: 9, padding: "11px 14px", display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <span style={{ color: loc.status === "ok" ? COLORS.green : loc.status === "error" ? COLORS.red : COLORS.text3, flexShrink: 0 }}>
                {Icon.pin}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontWeight: 600, color: COLORS.text, marginRight: 6 }}>Current Location:</span>
                <span style={{ color: COLORS.text2, wordBreak: "break-word" }}>
                  {loc.status === "loading"
                    ? <><Spinner /> &nbsp;Detecting…</>
                    : locText}
                </span>
                {loc.coords && (
                  <div style={{ fontSize: 11, color: COLORS.text3, marginTop: 3 }}>
                    {loc.coords.lat.toFixed(6)}°N, {loc.coords.lng.toFixed(6)}°E
                  </div>
                )}
              </div>
              <button onClick={loc.refresh} title="Refresh location" style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.blue, flexShrink: 0, padding: 4 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.blue}><path d="M12 6v3l4-4-4-4v3a8 8 0 1 0 8 8h-2a6 6 0 1 1-6-6z"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Responders Card */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>Nearby Responders</div>
          {[
            { init: "U1", name: "User_1", dist: "120 m", status: "Available", chip: "green" },
            { init: "U2", name: "User_2", dist: "200 m", status: "Busy", chip: "amber" },
            { init: "U3", name: "User_3", dist: "350 m", status: "Available", chip: "green" },
            { init: "U4", name: "User_4", dist: "500 m", status: "Offline", chip: "red" },
          ].map((r, i) => (
            <div key={i} style={styles.responderItem}>
              <div style={styles.rAvatar()}>{r.init}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{r.name}</div>
                <div style={{ fontSize: 12, color: COLORS.text3 }}>{r.dist} away</div>
              </div>
              <span style={styles.chip(r.chip)}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AlertsScreen({ onNavigate }) {
  return (
    <div>
      <div style={styles.pageTitle}>Active Alerts</div>
      <div style={styles.pageSub}>Nearby emergencies requiring response</div>
      {[
        { type: "🔥 Fire", loc: "Building 4, Floor 2", dist: "20 meters", time: "10:24 AM, May 24, 2025", resp: "2 responders en route", critical: true },
      ].map((a, i) => (
        <div key={i} style={styles.alertCard(a.critical)}>
          <div style={{ ...styles.alertIcon, background: COLORS.redLight }}>
            {Icon.fire}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>{a.type} — {a.loc}</div>
            <div style={{ fontSize: 13, color: COLORS.text2, marginTop: 4 }}>{a.dist} away</div>
            <div style={{ fontSize: 12, color: COLORS.text3, marginTop: 4 }}>{a.time} · {a.resp}</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button style={styles.btnSmRed} onClick={() => onNavigate("incoming")}>Respond</button>
            <button style={styles.btnSmOutline}>Ignore</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AlertSentScreen({ onNavigate }) {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: COLORS.greenLight, border: `3px solid ${COLORS.green}`, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill={COLORS.green}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
      </div>
      <div style={{ ...styles.pageTitle, color: COLORS.green, textAlign: "center" }}>Emergency Alert Sent!</div>
      <div style={{ ...styles.pageSub, textAlign: "center" }}>Your alert has been broadcast to nearby responders</div>
      <div style={styles.card}>
        {[
          { key: "Type", val: "🔥 Fire" },
          { key: "Location", val: "Building 4, Floor 2 — Bengaluru, KA" },
          { key: "Time", val: "10:24 AM, May 24, 2025" },
        ].map(({ key, val }) => (
          <div key={key} style={{ marginBottom: 16, textAlign: "left" }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", color: COLORS.text3 }}>{key}</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: COLORS.text, marginTop: 4 }}>{val}</div>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 16, fontSize: 14, color: COLORS.text2 }}>
          <Spinner /> Finding nearby responders…
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
        <button style={{ ...styles.btnSmOutline, flex: 1, padding: "12px" }} onClick={() => onNavigate("home")}>Back to Home</button>
        <button style={{ ...styles.btnSmRed, flex: 1, padding: "12px", borderRadius: 9 }} onClick={() => onNavigate("activeResponse")}>View Response</button>
      </div>
    </div>
  );
}

function IncomingScreen({ onNavigate }) {
  return (
    <div style={{ maxWidth: 520, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", background: COLORS.redLight, border: `2px solid ${COLORS.redMid}`, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill={COLORS.red}><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.red, letterSpacing: "-0.4px" }}>EMERGENCY ALERT!</div>
        <div style={{ fontSize: 14, color: COLORS.text2, marginTop: 6 }}>A nearby user needs your help</div>
      </div>
      <div style={styles.card}>
        {[
          { key: "Type", val: "🔥 Fire" },
          { key: "Location", val: "Building 4, Floor 2" },
          { key: "Distance", val: "20 meters away" },
          { key: "Time", val: "10:24 AM, May 24, 2025" },
        ].map(({ key, val }, i, arr) => (
          <div key={key} style={{ display: "grid", gridTemplateColumns: "100px 1fr", alignItems: "center", padding: "12px 0", borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.border}` : "none", fontSize: 14 }}>
            <div style={{ fontWeight: 500, color: COLORS.text3, fontSize: 13 }}>{key}</div>
            <div style={{ fontWeight: 600, color: COLORS.text }}>{val}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 14, marginTop: 4 }}>
        <button style={{ flex: 1, background: COLORS.green, color: "white", border: "none", borderRadius: 9, padding: "13px", fontSize: 15, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }} onClick={() => onNavigate("activeResponse")}>ACCEPT HELP</button>
        <button style={{ flex: 1, background: COLORS.surface, color: COLORS.text, border: `1.5px solid ${COLORS.border2}`, borderRadius: 9, padding: "13px", fontSize: 15, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }} onClick={() => onNavigate("home")}>IGNORE</button>
      </div>
    </div>
  );
}

function ActiveResponseScreen({ onNavigate }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <div style={styles.pageTitle}>Active Response</div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: COLORS.greenLight, color: COLORS.green, fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, border: `1px solid #c6f6d5` }}>
          <PulseDot /> You are responding
        </span>
      </div>
      <div style={{ ...styles.pageSub }}>Incident Location — Building 4, Floor 2</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 270px", gap: 20 }}>
        <div>
          <div style={{ ...styles.card, padding: 0, overflow: "hidden" }}>
            <MapSVG />
          </div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Responders</div>
            {[
              { init: "JD", name: "You (Accepted)", dist: "On scene", chip: "green", bg: COLORS.redLight, tc: COLORS.red },
              { init: "U2", name: "User_2", dist: "200 m away", chip: "green" },
              { init: "U3", name: "User_3", dist: "350 m away", chip: "blue" },
            ].map((r, i) => (
              <div key={i} style={styles.responderItem}>
                <div style={styles.rAvatar(r.bg, r.tc)}>{r.init}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.text3 }}>{r.dist}</div>
                </div>
                <span style={styles.chip(r.chip)}>On the way</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Your Role</div>
            <div style={{ background: COLORS.amberLight, border: `1px solid #fde68a`, borderRadius: 9, padding: 14, fontSize: 13, color: COLORS.text }}>
              <strong style={{ color: COLORS.amber, display: "block", marginBottom: 4, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px" }}>Instructions</strong>
              Assist victim and provide first aid if needed. Stay on scene until emergency services arrive.
            </div>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <button style={{ ...styles.btnSmRed, padding: 10, borderRadius: 8, fontSize: 13 }}>Call Emergency Services</button>
              <button style={{ ...styles.btnSmOutline, padding: 10, borderRadius: 8, fontSize: 13 }}>Share My Location</button>
              <button style={{ ...styles.btnSmOutline, padding: 10, borderRadius: 8, fontSize: 13, color: COLORS.red, borderColor: COLORS.redMid }} onClick={() => onNavigate("home")}>Cancel Response</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapScreen() {
  return (
    <div>
      <div style={styles.pageTitle}>Map View</div>
      <div style={styles.pageSub}>Real-time incident locations and nearby responders</div>
      <div style={{ ...styles.mapPlaceholder, position: "relative" }}>
        <MapSVG full />
        <div style={{ position: "absolute", bottom: 14, right: 14, background: "white", borderRadius: 10, padding: "12px 16px", boxShadow: "0 4px 12px rgba(0,0,0,0.10)", fontSize: 12 }}>
          {[{ color: COLORS.red, label: "Incident" }, { color: COLORS.blue, label: "You" }, { color: COLORS.green, label: "Responder" }].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
              <span style={{ color: COLORS.text2 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.card}>
        <div style={styles.cardTitle}>Nearby Responders</div>
        {[
          { init: "U1", name: "User_1", dist: "120 m", chip: "green", status: "Available" },
          { init: "U2", name: "User_2", dist: "200 m", chip: "amber", status: "Busy" },
          { init: "U3", name: "User_3", dist: "350 m", chip: "green", status: "Available" },
        ].map((r, i) => (
          <div key={i} style={styles.responderItem}>
            <div style={styles.rAvatar()}>{r.init}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{r.name}</div>
              <div style={{ fontSize: 12, color: COLORS.text3 }}>{r.dist} away</div>
            </div>
            <span style={styles.chip(r.chip)}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen({ onLogout, user }) {
  const [avail, setAvail] = useState(true);
  return (
    <div>
      <div style={styles.pageTitle}>Profile</div>
      <div style={styles.pageSub}>Manage your responder details and availability</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>
        <div>
          <div style={styles.card}>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
              <div style={{ width: 68, height: 68, borderRadius: "50%", background: COLORS.redLight, border: `3px solid ${COLORS.redMid}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: COLORS.red, flexShrink: 0 }}>{user.initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.text }}>{user.name || "User"}</div>
                <div style={{ fontSize: 13, color: COLORS.text2, marginTop: 3 }}>Volunteer Responder · Bengaluru, KA</div>
              </div>
              <button style={{ ...styles.btnSmOutline, fontSize: 13 }}>Edit Profile</button>
            </div>
            <div style={styles.cardTitle}>Skills & Certifications</div>
            {[
              { label: "First Aid", done: true },
              { label: "Fire Safety", done: true },
              { label: "Search & Rescue", done: false },
            ].map(({ label, done }, i) => (
              <div key={i} style={{ ...styles.skillItem, borderBottom: i < 2 ? `1px solid ${COLORS.border}` : "none" }}>
                <div style={styles.skillCheck(done)}>{done && Icon.check}</div>
                <span style={{ color: done ? COLORS.text : COLORS.text3 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Availability</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, color: COLORS.text2 }}>Available to help</span>
              <div style={styles.toggle(avail)} onClick={() => setAvail(!avail)}>
                <div style={styles.toggleKnob(avail)} />
              </div>
            </div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Contact</div>
            {[
              { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.red}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>, val: user.phone || "—" },
              { icon: Icon.email, val: user.email || "—" },
            ].map(({ icon, val }, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 1 ? `1px solid ${COLORS.border}` : "none", fontSize: 14, color: COLORS.text2 }}>
                {icon}{val}
              </div>
            ))}
          </div>
          <button style={{ ...styles.btnPrimary, background: COLORS.surface2, color: COLORS.red, border: `1.5px solid ${COLORS.redMid}`, fontSize: 14, padding: "11px" }} onClick={onLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

function PlaceholderScreen({ title, sub }) {
  return (
    <div>
      <div style={styles.pageTitle}>{title}</div>
      <div style={styles.pageSub}>{sub}</div>
      <div style={{ ...styles.card, textAlign: "center", padding: 60, color: COLORS.text3 }}>Coming soon.</div>
    </div>
  );
}

// ── AUTH ──
function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  const initials = name.trim().split(" ").filter(Boolean).map(w => w[0].toUpperCase()).slice(0, 2).join("") || "?";

  const handleSubmit = () => {
    onLogin({ name: name || "User", email, phone, initials });
  };

  return (
    <div style={styles.authWrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.3} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
      <div style={styles.authCard}>
        <div style={styles.authLogo}>
          <div style={styles.authLogoIcon}><svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.text }}>Crisis Connect</div>
            <div style={{ fontSize: 12, color: COLORS.text3, marginTop: 2 }}>Emergency Response Network</div>
          </div>
        </div>
        <div style={styles.authTitle}>{mode === "login" ? "Welcome back" : "Create account"}</div>
        <div style={styles.authSub}>{mode === "login" ? "Sign in to your responder account" : "Join the emergency response network"}</div>

        <div style={styles.field}>
          <label style={styles.fieldLabel}>Full Name</label>
          <input style={styles.fieldInput} type="text" placeholder={mode === "login" ? "Your name" : "John Doe"} value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div style={styles.field}>
          <label style={styles.fieldLabel}>Phone Number</label>
          <input style={styles.fieldInput} type="tel" placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div style={styles.field}>
          <label style={styles.fieldLabel}>Email Address</label>
          <input style={styles.fieldInput} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div style={styles.field}>
          <label style={styles.fieldLabel}>Password</label>
          <div style={{ position: "relative" }}>
            <input style={{ ...styles.fieldInput, paddingRight: 60 }} type={showPw ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)} placeholder="Enter password" />
            <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: COLORS.text3, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>{showPw ? "Hide" : "Show"}</button>
          </div>
          {mode === "login" && <div style={{ textAlign: "right", marginTop: 7 }}><a href="#" style={{ fontSize: 12, color: COLORS.text3, textDecoration: "none" }}>Forgot password?</a></div>}
        </div>
        <button style={styles.btnPrimary} onClick={handleSubmit}>{mode === "login" ? "Sign In" : "Create Account"}</button>
        <div style={styles.authSwitch}>
          {mode === "login"
            ? <>No account? <a href="#" style={{ color: COLORS.red, fontWeight: 600, textDecoration: "none" }} onClick={e => { e.preventDefault(); setMode("register"); }}>Create one</a></>
            : <>Already have an account? <a href="#" style={{ color: COLORS.red, fontWeight: 600, textDecoration: "none" }} onClick={e => { e.preventDefault(); setMode("login"); }}>Sign in</a></>}
        </div>

      </div>
    </div>
  );
}

// ── MAIN APP ──
const NAV = [
  { id: "home", label: "Home", icon: Icon.home },
  { id: "alerts", label: "Alerts", icon: Icon.bell, badge: 2 },
  { id: "map", label: "Map", icon: Icon.map },
  { id: "teams", label: "Teams", icon: Icon.team },
  { id: "history", label: "History", icon: Icon.history },
  { id: "profile", label: "Profile", icon: Icon.profile },
  { id: "settings", label: "Settings", icon: Icon.settings },
];

function AppLayout({ onLogout, user }) {
  const [screen, setScreen] = useState("home");

  const renderScreen = () => {
    switch (screen) {
      case "home": return <HomeScreen onNavigate={setScreen} />;
      case "alerts": return <AlertsScreen onNavigate={setScreen} />;
      case "alertSent": return <AlertSentScreen onNavigate={setScreen} />;
      case "incoming": return <IncomingScreen onNavigate={setScreen} />;
      case "activeResponse": return <ActiveResponseScreen onNavigate={setScreen} />;
      case "map": return <MapScreen />;
      case "profile": return <ProfileScreen onLogout={onLogout} user={user} />;
      case "teams": return <PlaceholderScreen title="Teams" sub="Coordinate with your response team" />;
      case "history": return <PlaceholderScreen title="Response History" sub="Your past incident responses" />;
      case "settings": return <PlaceholderScreen title="Settings" sub="App preferences and notifications" />;
      default: return null;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.3} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f7fafc; }
      `}</style>
      {/* Topbar */}
      <div style={styles.topbar}>
        <div style={styles.topbarBrand}>
          <div style={styles.topbarBrandIcon}><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
          <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>Crisis Connect</span>
        </div>
        <div style={styles.topbarSearch}>
          {Icon.search} Search…
        </div>
        <div style={styles.topbarActions}>
          <div style={styles.topbarIconBtn}>
            {Icon.email}
          </div>
          <div style={styles.topbarIconBtn} onClick={() => setScreen("alerts")}>
            {Icon.bell}
            <div style={styles.badge}>2</div>
          </div>
          <div style={styles.topbarUser}>
            <div style={styles.topbarAvatar}>{user.initials}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{user.name || "User"}</div>
              <div style={{ fontSize: 11, color: COLORS.text3 }}>Volunteer</div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={styles.appBody}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          {NAV.map(({ id, label, icon, badge }) => (
            <div key={id} style={styles.navItem(screen === id)} onClick={() => setScreen(id)}>
              {icon}
              <span style={{ flex: 1 }}>{label}</span>
              {badge && <span style={{ background: COLORS.red, color: "white", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "1px 7px" }}>{badge}</span>}
            </div>
          ))}
          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "10px 20px" }} />
          <div style={styles.navItem(false)} onClick={onLogout}>
            {Icon.logout} Logout
          </div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  return user ? <AppLayout onLogout={() => setUser(null)} user={user} /> : <AuthScreen onLogin={(u) => setUser(u)} />;
}
