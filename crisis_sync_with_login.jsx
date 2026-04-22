import { useState, useEffect } from "react";

/* ─── Global CSS ──────────────────────────────────────────────────────────── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#1a1f2e;min-height:100vh;font-family:'Inter',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:40px 20px 60px;}

  @keyframes sosPulse{0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,0.4),0 8px 32px rgba(220,38,38,0.35)}50%{box-shadow:0 0 0 18px rgba(220,38,38,0),0 8px 32px rgba(220,38,38,0.35)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes bellShake{0%,100%{transform:rotate(0)}20%{transform:rotate(-12deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(8deg)}}
  @keyframes slideIn{from{opacity:0;transform:translateX(-100%)}to{opacity:1;transform:translateX(0)}}
  @keyframes overlayFade{from{opacity:0}to{opacity:1}}
  @keyframes loginFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

  .sos-btn{animation:sosPulse 2s ease-in-out infinite;}
  .bell-anim{animation:bellShake 1.2s ease-in-out infinite;}
  .fade-up{animation:fadeUp 0.3s ease both;}
  .slide-in{animation:slideIn 0.3s ease both;}
  .overlay-fade{animation:overlayFade 0.3s ease both;}
  .login-fade{animation:loginFadeIn 0.5s ease both;}

  input:focus{outline:none;}
  input::placeholder{color:#9CA3AF;}
`;

/* ─── Tokens ──────────────────────────────────────────────────────────────── */
const RED = "#DC2626";
const RED_LIGHT = "#FEE2E2";
const RED_MID = "#FECACA";
const GREEN = "#16A34A";
const GREEN_LIGHT = "#DCFCE7";
const GRAY = "#6B7280";
const GRAY_LIGHT = "#F3F4F6";
const BORDER = "#E5E7EB";
const INK = "#111827";
const INK2 = "#374151";

/* ─── Shared Phone Shell ──────────────────────────────────────────────────── */
function Phone({ children, style = {} }) {
  return (
    <div style={{
      width: 320, background: "#fff", borderRadius: 32,
      boxShadow: "0 20px 60px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)",
      overflow: "hidden", display: "flex", flexDirection: "column",
      fontFamily: "'Inter',sans-serif", position: "relative", ...style,
    }}>
      <div style={{ padding: "10px 18px 4px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>9:41</span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <svg width="16" height="11" viewBox="0 0 16 11"><rect x="0" y="3" width="3" height="8" rx="0.5" fill={INK}/><rect x="4.3" y="2" width="3" height="9" rx="0.5" fill={INK}/><rect x="8.6" y="0.5" width="3" height="10.5" rx="0.5" fill={INK}/><rect x="12.9" y="0" width="2.5" height="11" rx="0.5" fill={INK} opacity="0.3"/></svg>
          <svg width="15" height="11" viewBox="0 0 15 11"><path d="M7.5 2.5 C9.5 2.5 11.3 3.3 12.5 4.6 L14 3C12.4 1.1 10.1 0 7.5 0 4.9 0 2.6 1.1 1 3L2.5 4.6C3.7 3.3 5.5 2.5 7.5 2.5Z" fill={INK}/><path d="M7.5 5.5C8.8 5.5 10 6.1 10.8 7L12.3 5.4C11.1 4.1 9.4 3.3 7.5 3.3 5.6 3.3 3.9 4.1 2.7 5.4L4.2 7C5 6.1 6.2 5.5 7.5 5.5Z" fill={INK}/><circle cx="7.5" cy="9.5" r="1.5" fill={INK}/></svg>
          <div style={{ width: 22, height: 11, border: `1.5px solid ${INK}`, borderRadius: 3, display: "flex", alignItems: "center", padding: "1px 1.5px", gap: 1 }}>
            <div style={{ width: 13, height: "100%", background: INK, borderRadius: 1 }} />
            <div style={{ width: 2, height: 5, background: INK, borderRadius: 1, marginLeft: "auto" }} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ─── Bottom Nav ──────────────────────────────────────────────────────────── */
function BottomNav({ active = "home", onNavigate }) {
  const items = [
    { id: "home", label: "Home", icon: (isActive) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" fill={isActive ? RED : "none"}/><path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.8"/></svg> },
    { id: "alerts", label: "Alerts", icon: (isActive) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2a7 7 0 00-7 7c0 3-1.5 4.5-2 5h18c-.5-.5-2-2-2-5a7 7 0 00-7-7z" stroke="currentColor" strokeWidth="1.8" fill={isActive ? RED : "none"}/><path d="M10 19a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8"/></svg> },
    { id: "map", label: "Map", icon: (isActive) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 3L3 6v15l6-3 6 3 6-3V3l-6 3-6-3z" stroke="currentColor" strokeWidth="1.8" fill={isActive ? RED : "none"}/><line x1="9" y1="3" x2="9" y2="18" stroke="currentColor" strokeWidth="1.8"/><line x1="15" y1="6" x2="15" y2="21" stroke="currentColor" strokeWidth="1.8"/></svg> },
    { id: "profile", label: "Profile", icon: (isActive) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" fill={isActive ? RED : "none"}/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8"/></svg> },
  ];
  return (
    <div style={{ display: "flex", borderTop: `1px solid ${BORDER}`, background: "#fff", paddingBottom: 8 }}>
      {items.map(item => (
        <button key={item.id} onClick={() => onNavigate && onNavigate(item.id)}
          style={{ flex: 1, border: "none", background: "none", cursor: "pointer", padding: "8px 0 2px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color: active === item.id ? RED : GRAY }}>
          {item.icon(active === item.id)}
          <span style={{ fontSize: 10, fontWeight: active === item.id ? 600 : 400 }}>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

function BackHeader({ title, right, onBack }) {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "10px 16px 8px", borderBottom: `1px solid ${BORDER}`, background: "#fff" }}>
      <button onClick={onBack} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 20, color: INK, padding: "0 8px 0 0" }}>←</button>
      <span style={{ flex: 1, textAlign: "center", fontSize: 16, fontWeight: 700, color: INK }}>{title}</span>
      {right || <div style={{ width: 28 }} />}
    </div>
  );
}

/* ─── Hamburger Drawer ────────────────────────────────────────────────────── */
function DrawerMenu({ open, onClose, onNavigate }) {
  if (!open) return null;
  const items = [
    { id: "home", label: "🏠  Home" },
    { id: "alertSent", label: "✅  Alert Sent" },
    { id: "incoming", label: "🔔  Incoming Alert" },
    { id: "activeResponse", label: "🚨  Active Response" },
    { id: "map", label: "🗺️  Map" },
    { id: "profile", label: "👤  Profile" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 100, display: "flex" }}>
      <div className="overlay-fade" onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
      <div className="slide-in" style={{ position: "relative", width: 220, height: "100%", background: "#fff", zIndex: 101, display: "flex", flexDirection: "column", padding: "20px 0", boxShadow: "4px 0 24px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 16px 16px", borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: RED, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 15v-4H7l5-9v4h4l-5 9z"/></svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: INK }}>Crisis Connect</span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", paddingTop: 8 }}>
          {items.map(item => (
            <button key={item.id} onClick={() => { onNavigate(item.id); onClose(); }}
              style={{ width: "100%", border: "none", background: "none", cursor: "pointer", padding: "13px 20px", textAlign: "left", fontSize: 14, fontWeight: 500, color: INK2, display: "block" }}>
              {item.label}
            </button>
          ))}
        </div>
        <button onClick={onClose} style={{ margin: "0 16px", padding: "10px", borderRadius: 8, border: `1px solid ${BORDER}`, background: GRAY_LIGHT, cursor: "pointer", fontSize: 13, color: GRAY, fontWeight: 500 }}>
          Close ✕
        </button>
      </div>
    </div>
  );
}

/* ─── Screen: Login ───────────────────────────────────────────────────────── */
function LoginScreen({ onLogin, onGoRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  };

  const inputStyle = {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    border: `1.5px solid ${BORDER}`, fontSize: 14, color: INK,
    fontFamily: "'Inter',sans-serif", background: GRAY_LIGHT,
  };

  return (
    <Phone>
      <div className="login-fade" style={{ flex: 1, display: "flex", flexDirection: "column", padding: "24px 20px 28px", background: "#fff", gap: 0 }}>
        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28, marginTop: 8 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: RED, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, boxShadow: `0 4px 16px rgba(220,38,38,0.35)` }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 15v-4H7l5-9v4h4l-5 9z"/></svg>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: INK, letterSpacing: -0.5 }}>Crisis Connect</h2>
          <p style={{ fontSize: 12, color: GRAY, marginTop: 3 }}>Emergency Response Network</p>
        </div>

        {/* Heading */}
        <p style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 4 }}>Welcome back</p>
        <p style={{ fontSize: 13, color: GRAY, marginBottom: 20 }}>Sign in to your responder account</p>

        {/* Error */}
        {error && (
          <div style={{ padding: "10px 12px", borderRadius: 8, background: RED_LIGHT, border: `1px solid ${RED_MID}`, marginBottom: 14 }}>
            <p style={{ fontSize: 12, color: RED, fontWeight: 500 }}>{error}</p>
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: INK2, display: "block", marginBottom: 6 }}>Email Address</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke={GRAY} strokeWidth="1.8"/><path d="M2 7l10 7 10-7" stroke={GRAY} strokeWidth="1.8"/></svg>
            </span>
            <input
              type="email" placeholder="john.doe@email.com" value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 36 }}
            />
          </div>
        </div>

        {/* Password */}
        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: INK2, display: "block", marginBottom: 6 }}>Password</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" stroke={GRAY} strokeWidth="1.8"/><path d="M8 11V7a4 4 0 018 0v4" stroke={GRAY} strokeWidth="1.8"/></svg>
            </span>
            <input
              type={showPass ? "text" : "password"} placeholder="Enter your password" value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 36, paddingRight: 38 }}
            />
            <button onClick={() => setShowPass(s => !s)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", border: "none", background: "none", cursor: "pointer", padding: 0, color: GRAY }}>
              {showPass
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke={GRAY} strokeWidth="1.8" strokeLinecap="round"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={GRAY} strokeWidth="1.8"/><circle cx="12" cy="12" r="3" stroke={GRAY} strokeWidth="1.8"/></svg>
              }
            </button>
          </div>
        </div>

        {/* Forgot */}
        <div style={{ textAlign: "right", marginBottom: 22 }}>
          <span style={{ fontSize: 12, color: RED, fontWeight: 600, cursor: "pointer" }}>Forgot password?</span>
        </div>

        {/* Login Button */}
        <button onClick={handleLogin} disabled={loading}
          style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: loading ? RED_MID : RED, color: "#fff", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
          {loading
            ? <><div style={{ width: 18, height: 18, border: "2.5px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> Signing in...</>
            : "Sign In"
          }
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: BORDER }} />
          <span style={{ fontSize: 12, color: GRAY }}>or</span>
          <div style={{ flex: 1, height: 1, background: BORDER }} />
        </div>

        {/* Register */}
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: 13, color: GRAY }}>New responder? </span>
          <span onClick={onGoRegister} style={{ fontSize: 13, color: RED, fontWeight: 700, cursor: "pointer" }}>Create Account</span>
        </div>
      </div>
    </Phone>
  );
}

/* ─── Screen: Register ────────────────────────────────────────────────────── */
function RegisterScreen({ onBack, onRegister }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onRegister(); }, 1200);
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: 10,
    border: `1.5px solid ${BORDER}`, fontSize: 14, color: INK,
    fontFamily: "'Inter',sans-serif", background: GRAY_LIGHT,
  };

  const fields = [
    { key: "name", label: "Full Name", placeholder: "John Doe", type: "text", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={GRAY} strokeWidth="1.8"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={GRAY} strokeWidth="1.8"/></svg> },
    { key: "email", label: "Email Address", placeholder: "john@email.com", type: "email", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke={GRAY} strokeWidth="1.8"/><path d="M2 7l10 7 10-7" stroke={GRAY} strokeWidth="1.8"/></svg> },
    { key: "phone", label: "Phone Number", placeholder: "+91 98765 43210", type: "tel", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke={GRAY} strokeWidth="1.8"/></svg> },
    { key: "password", label: "Password", placeholder: "Create a password", type: "password", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" stroke={GRAY} strokeWidth="1.8"/><path d="M8 11V7a4 4 0 018 0v4" stroke={GRAY} strokeWidth="1.8"/></svg> },
  ];

  return (
    <Phone>
      <BackHeader title="Create Account" onBack={onBack} />
      <div className="login-fade" style={{ flex: 1, overflowY: "auto", padding: "20px 20px 28px", background: "#fff", display: "flex", flexDirection: "column", gap: 0 }}>

        {/* Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: RED_LIGHT, border: `1px solid ${RED_MID}`, marginBottom: 20 }}>
          <span style={{ fontSize: 20 }}>🚨</span>
          <p style={{ fontSize: 12, color: RED, fontWeight: 600 }}>Join the emergency response network</p>
        </div>

        {fields.map(f => (
          <div key={f.key} style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: INK2, display: "block", marginBottom: 6 }}>{f.label}</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>{f.icon}</span>
              <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                style={{ ...inputStyle, paddingLeft: 34 }} />
            </div>
          </div>
        ))}

        {/* Role selector */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: INK2, display: "block", marginBottom: 6 }}>Role</label>
          <div style={{ display: "flex", gap: 8 }}>
            {["Volunteer", "First Responder", "Coordinator"].map(role => (
              <button key={role} style={{ flex: 1, padding: "9px 4px", borderRadius: 8, border: `1.5px solid ${role === "Volunteer" ? RED : BORDER}`, background: role === "Volunteer" ? RED_LIGHT : "#fff", color: role === "Volunteer" ? RED : GRAY, fontSize: 10, fontWeight: 600, cursor: "pointer" }}>
                {role}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleRegister} disabled={loading}
          style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: loading ? RED_MID : RED, color: "#fff", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {loading
            ? <><div style={{ width: 18, height: 18, border: "2.5px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> Creating account...</>
            : "Create Account"
          }
        </button>
      </div>
    </Phone>
  );
}

/* ─── Screen 1: Home ──────────────────────────────────────────────────────── */
function HomeScreen({ onSOS, onNavigate, onOpenMenu }) {
  return (
    <Phone>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 16px 10px", background: "#fff" }}>
        <button onClick={onOpenMenu} style={{ border: "none", background: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ width: 20, height: 2, background: INK, borderRadius: 2 }} />
          <div style={{ width: 20, height: 2, background: INK, borderRadius: 2 }} />
          <div style={{ width: 20, height: 2, background: INK, borderRadius: 2 }} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: RED, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 4v4l3 3-1.4 1.4L10 11V6h2z"/></svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: INK }}>Crisis Connect</span>
        </div>
        <div style={{ position: "relative" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2a7 7 0 00-7 7c0 3-1.5 4.5-2 5h18c-.5-.5-2-2-2-5a7 7 0 00-7-7z" stroke={INK} strokeWidth="1.8"/><path d="M10 19a2 2 0 004 0" stroke={INK} strokeWidth="1.8"/></svg>
          <div style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, borderRadius: "50%", background: RED, border: "1.5px solid #fff" }} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0 16px", background: "#fff" }}>
        <div style={{ position: "relative", width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", background: RED_LIGHT, opacity: 0.6 }} />
          <div style={{ position: "absolute", width: 138, height: 138, borderRadius: "50%", background: RED_MID }} />
          <button onClick={() => onSOS("fire")} className="sos-btn"
            style={{ width: 118, height: 118, borderRadius: "50%", background: `radial-gradient(circle at 35% 35%, #EF4444, ${RED} 60%, #B91C1C)`, border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1, zIndex: 2 }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: 3, lineHeight: 1 }}>SOS</span>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.85)", fontWeight: 600, letterSpacing: 1.5 }}>TAP TO ALERT</span>
          </button>
        </div>
      </div>

      <div style={{ margin: "0 16px 14px", padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${RED}`, background: RED_LIGHT, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 28 }}>🔥</span>
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: RED }}>Fire Emergency</p>
          <p style={{ fontSize: 11, color: INK2, marginTop: 2 }}>Tap SOS to immediately alert nearby responders</p>
        </div>
      </div>

      <div style={{ margin: "0 16px 16px", padding: "10px 12px", borderRadius: 10, border: `1px solid ${BORDER}`, background: GRAY_LIGHT, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={RED}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
          <div>
            <p style={{ fontSize: 10, color: GRAY, fontWeight: 500 }}>Current Location</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: INK }}>Building 4, Floor 2</p>
          </div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill={INK2}/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke={INK2} strokeWidth="1.8" strokeLinecap="round"/></svg>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </Phone>
  );
}

/* ─── Screen 2: Alert Sent ────────────────────────────────────────────────── */
function AlertSentScreen({ onBack, onNavigate }) {
  return (
    <Phone>
      <BackHeader title="Alert Sent" onBack={onBack} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 20px 20px", background: "#fff" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: GREEN_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <p style={{ fontSize: 18, fontWeight: 700, color: GREEN, marginBottom: 24 }}>Emergency Alert Sent!</p>
        <div style={{ width: "100%", border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden", marginBottom: 14 }}>
          {[{ label: "Type", value: "🔥  Fire" }, { label: "Location", value: "📍  Building 4, Floor 2" }, { label: "Time", value: "🕐  10:24 AM, May 24, 2025" }].map((row, i) => (
            <div key={row.label} style={{ padding: "11px 16px", borderBottom: i < 2 ? `1px solid ${BORDER}` : "none", background: "#fff" }}>
              <p style={{ fontSize: 11, color: GRAY, fontWeight: 500, marginBottom: 3 }}>{row.label}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: INK }}>{row.value}</p>
            </div>
          ))}
        </div>
        <div style={{ width: "100%", padding: "14px 16px", borderRadius: 12, background: GREEN_LIGHT, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", border: `3px solid ${GREEN}`, borderTopColor: "transparent", animation: "spin 1s linear infinite", flexShrink: 0 }} />
          <p style={{ fontSize: 14, fontWeight: 600, color: GREEN }}>Finding nearby responders...</p>
        </div>
      </div>
      <BottomNav active="alerts" onNavigate={onNavigate} />
    </Phone>
  );
}

/* ─── Screen 3: Incoming Alert ────────────────────────────────────────────── */
function IncomingAlertScreen({ onAccept, onIgnore, onBack }) {
  return (
    <Phone>
      <BackHeader title="Incoming Alert" right={<span style={{ fontSize: 12, fontWeight: 700, color: RED, border: `1.5px solid ${RED}`, borderRadius: 6, padding: "2px 7px" }}>LIVE</span>} onBack={onBack} />
      <div style={{ flex: 1, padding: "16px", background: "#fff", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ border: `1.5px solid ${RED_MID}`, borderRadius: 16, background: "#fff", padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div className="bell-anim" style={{ fontSize: 40 }}>🔔</div>
          <p style={{ fontSize: 16, fontWeight: 800, color: RED, letterSpacing: 0.5 }}>EMERGENCY ALERT!</p>
          <div style={{ width: "100%", marginTop: 8, display: "flex", flexDirection: "column", gap: 0 }}>
            {[{ label: "Type", value: "🔥  Fire" }, { label: "Location", value: "📍  Building 4, Floor 2" }, { label: "Distance", value: "📡  20 meters away" }, { label: "Time", value: "🕐  10:24 AM, May 24, 2025" }].map((row, i) => (
              <div key={row.label} style={{ display: "flex", alignItems: "center", padding: "9px 0", borderBottom: i < 3 ? `1px solid ${BORDER}` : "none" }}>
                <span style={{ width: 80, fontSize: 12, color: GRAY, fontWeight: 500 }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: INK }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={onAccept} style={{ width: "100%", padding: "15px", borderRadius: 12, border: "none", background: GREEN, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>ACCEPT HELP</button>
        <button onClick={onIgnore} style={{ width: "100%", padding: "15px", borderRadius: 12, border: `1.5px solid ${BORDER}`, background: "#fff", color: INK2, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>IGNORE</button>
      </div>
    </Phone>
  );
}

/* ─── Screen 4: Active Response ───────────────────────────────────────────── */
function ActiveResponseScreen({ onBack, onNavigate }) {
  const responders = [
    { name: "You (Accepted)", status: "On the way", statusColor: GREEN },
    { name: "User_2", status: "On the way", statusColor: GREEN },
    { name: "User_3", status: "Accepted", statusColor: GRAY },
  ];
  return (
    <Phone>
      <div style={{ display: "flex", alignItems: "center", padding: "8px 16px 10px", borderBottom: `1px solid ${BORDER}`, background: "#fff" }}>
        <button onClick={onBack} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 20, color: INK, marginRight: 8 }}>←</button>
        <span style={{ fontSize: 16, fontWeight: 700, color: INK, flex: 1 }}>Active Response</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: GREEN, background: GREEN_LIGHT, padding: "3px 9px", borderRadius: 99 }}>You are responding</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", background: "#fff" }}>
        <div style={{ margin: "14px 16px 0" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 8 }}>Incident Location</p>
          <div style={{ height: 130, borderRadius: 12, overflow: "hidden", border: `1px solid ${BORDER}`, position: "relative", background: "linear-gradient(135deg,#e8f5e9 0%,#c8e6c9 50%,#dcedc8 100%)" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 24px,rgba(0,0,0,0.05) 24px,rgba(0,0,0,0.05) 25px),repeating-linear-gradient(90deg,transparent,transparent 24px,rgba(0,0,0,0.05) 24px,rgba(0,0,0,0.05) 25px)" }} />
            <div style={{ position: "absolute", top: "48%", left: 0, right: 0, height: 10, background: "rgba(255,255,255,0.7)" }} />
            <div style={{ position: "absolute", left: "40%", top: 0, bottom: 0, width: 10, background: "rgba(255,255,255,0.7)" }} />
            <div style={{ position: "absolute", top: "30%", left: "42%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50% 50% 50% 0", background: RED, transform: "rotate(-45deg)", margin: "0 auto", boxShadow: `0 4px 12px rgba(220,38,38,0.4)` }} />
            </div>
          </div>
        </div>
        <div style={{ padding: "14px 16px 10px" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 10 }}>Responders</p>
          {responders.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${BORDER}` }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: GRAY_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={GRAY} strokeWidth="1.8"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={GRAY} strokeWidth="1.8"/></svg>
              </div>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: INK }}>{r.name}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: r.statusColor }}>{r.status}</span>
            </div>
          ))}
        </div>
        <div style={{ margin: "6px 16px 16px", padding: "12px 14px", borderRadius: 12, border: `1px solid ${BORDER}`, background: GRAY_LIGHT, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: RED_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill={RED}><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 14H11v-4H7v-2h4V6h2v4h4v2h-4v4z"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: GRAY, marginBottom: 2 }}>Your Role</p>
            <p style={{ fontSize: 12, color: INK2 }}>Assist victim and provide first aid if needed.</p>
          </div>
        </div>
      </div>
      <BottomNav active="home" onNavigate={onNavigate} />
    </Phone>
  );
}

/* ─── Screen 5: Map ───────────────────────────────────────────────────────── */
function MapScreen({ onNavigate }) {
  const nearby = [{ name: "User_1", dist: "120 m" }, { name: "User_2", dist: "200 m" }, { name: "User_3", dist: "350 m" }];
  return (
    <Phone>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 10px", borderBottom: `1px solid ${BORDER}`, background: "#fff" }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: INK }}>Map</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><polygon points="22 3 2 10 10.5 13.5 14 22 22 3" stroke={INK2} strokeWidth="1.8" strokeLinejoin="round"/></svg>
      </div>
      <div style={{ height: 220, position: "relative", background: "linear-gradient(135deg,#e8f5e9,#c8e6c9 60%,#dcedc8)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 26px,rgba(0,0,0,0.05) 26px,rgba(0,0,0,0.05) 27px),repeating-linear-gradient(90deg,transparent,transparent 26px,rgba(0,0,0,0.05) 26px,rgba(0,0,0,0.05) 27px)" }} />
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 12, background: "rgba(255,255,255,0.65)", transform: "translateY(-50%)" }} />
        <div style={{ position: "absolute", left: "52%", top: 0, bottom: 0, width: 12, background: "rgba(255,255,255,0.65)" }} />
        <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-100%)", textAlign: "center" }}>
          <div style={{ width: 22, height: 22, borderRadius: "50% 50% 50% 0", background: RED, transform: "rotate(-45deg)", margin: "0 auto", boxShadow: `0 3px 10px rgba(220,38,38,0.5)` }} />
        </div>
        {[{ top: "22%", left: "60%" }, { top: "55%", left: "25%" }, { top: "65%", left: "58%" }].map((pos, i) => (
          <div key={i} style={{ position: "absolute", top: pos.top, left: pos.left, transform: "translate(-50%,-50%)" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#fff", border: `2px solid ${GRAY}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill={GRAY}/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill={GRAY}/></svg>
            </div>
          </div>
        ))}
        <div style={{ position: "absolute", bottom: "20%", left: "55%", transform: "translate(-50%,-50%)" }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#2563EB", boxShadow: "0 0 0 4px rgba(37,99,235,0.25)" }} />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", background: "#fff" }}>
        <p style={{ padding: "12px 16px 6px", fontSize: 14, fontWeight: 600, color: INK }}>Nearby Responders</p>
        {nearby.map((u, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", padding: "10px 16px", borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: GRAY_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill={GRAY}/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill={GRAY}/></svg>
            </div>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: INK }}>{u.name}</span>
            <span style={{ fontSize: 13, color: GRAY, marginRight: 12 }}>{u.dist}</span>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: GRAY_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke={GRAY} strokeWidth="1.8"/></svg>
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="map" onNavigate={onNavigate} />
    </Phone>
  );
}

/* ─── Screen 6: Profile ───────────────────────────────────────────────────── */
function ProfileScreen({ onNavigate, onLogout }) {
  const [available, setAvailable] = useState(true);
  const skills = [{ label: "First Aid", checked: true }, { label: "Fire Safety", checked: true }, { label: "Search & Rescue", checked: false }];
  return (
    <Phone>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px 10px", borderBottom: `1px solid ${BORDER}`, background: "#fff" }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: INK }}>Profile</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke={INK2} strokeWidth="1.8"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={INK2} strokeWidth="1.8"/></svg>
      </div>
      <div style={{ flex: 1, overflowY: "auto", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "16px 16px 12px", borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: GRAY_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 12, border: `2px solid ${BORDER}` }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill={GRAY}/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill={GRAY}/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: INK }}>John Doe</p>
            <p style={{ fontSize: 13, color: GRAY }}>Volunteer</p>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: GREEN, background: GREEN_LIGHT, padding: "4px 10px", borderRadius: 99 }}>Available</span>
        </div>
        <div style={{ padding: "14px 16px", borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: INK }}>Skills</p>
            <span style={{ fontSize: 13, fontWeight: 600, color: RED, cursor: "pointer" }}>Edit</span>
          </div>
          {skills.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: s.checked ? GREEN : "#fff", border: `2px solid ${s.checked ? GREEN : BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {s.checked && <svg width="11" height="11" viewBox="0 0 24 24"><path d="M5 12l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span style={{ fontSize: 14, color: s.checked ? INK : GRAY, fontWeight: s.checked ? 500 : 400 }}>{s.label}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: "14px 16px", borderBottom: `1px solid ${BORDER}` }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 6 }}>Availability</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: GRAY }}>Available to help</span>
            <button onClick={() => setAvailable(a => !a)} style={{ width: 46, height: 26, borderRadius: 99, border: "none", cursor: "pointer", background: available ? GREEN : "#D1D5DB", position: "relative", transition: "background 0.25s", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: 3, left: available ? 22 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "left 0.25s" }} />
            </button>
          </div>
        </div>
        <div style={{ padding: "14px 16px 12px", borderBottom: `1px solid ${BORDER}` }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Contact</p>
          {[{ icon: "📞", value: "+91 98765 43210" }, { icon: "✉️", value: "john.doe@email.com" }].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
              <span style={{ fontSize: 16 }}>{c.icon}</span>
              <span style={{ fontSize: 13, color: INK2 }}>{c.value}</span>
            </div>
          ))}
        </div>
        {/* Logout */}
        <div style={{ padding: "16px" }}>
          <button onClick={onLogout} style={{ width: "100%", padding: "12px", borderRadius: 10, border: `1.5px solid ${RED_MID}`, background: RED_LIGHT, color: RED, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke={RED} strokeWidth="2" strokeLinecap="round"/><polyline points="16 17 21 12 16 7" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="21" y1="12" x2="9" y2="12" stroke={RED} strokeWidth="2" strokeLinecap="round"/></svg>
            Sign Out
          </button>
        </div>
      </div>
      <BottomNav active="profile" onNavigate={onNavigate} />
    </Phone>
  );
}

/* ─── App Shell ───────────────────────────────────────────────────────────── */
import { useState, useEffect } from "react";

export default function App() {
  // ✅ SAFE: default false (no window usage here)
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect screen size after component mounts
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen(); // run once on load

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // auth: "login" | "register" | "app"
  const [auth, setAuth] = useState("login");
  const [screen, setScreen] = useState("home");
  const [history, setHistory] = useState(["home"]);
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (s) => {
    setScreen(s);
    setHistory((h) => [...h, s]);
  };

  const back = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setScreen(newHistory[newHistory.length - 1]);
    }
  };

  const handleNavigate = (id) => {
    if (id === "alerts") go("alertSent");
    else go(id);
  };

  // 🔐 AUTH SCREENS
  if (auth === "login") {
    return (
      <>
        <style>{G}</style>
        <div className="fade-up">
          <LoginScreen
            onLogin={() => setAuth("app")}
            onGoRegister={() => setAuth("register")}
          />
        </div>
      </>
    );
  }

  if (auth === "register") {
    return (
      <>
        <style>{G}</style>
        <div className="fade-up">
          <RegisterScreen
            onBack={() => setAuth("login")}
            onRegister={() => setAuth("app")}
          />
        </div>
      </>
    );
  }

  const screens = {
    home: (
      <HomeScreen
        onSOS={() => go("alertSent")}
        onNavigate={handleNavigate}
        onOpenMenu={() => setMenuOpen(true)}
      />
    ),
    alertSent: (
      <AlertSentScreen onBack={back} onNavigate={handleNavigate} />
    ),
    incoming: (
      <IncomingAlertScreen
        onAccept={() => go("activeResponse")}
        onIgnore={() => go("home")}
        onBack={back}
      />
    ),
    activeResponse: (
      <ActiveResponseScreen onBack={back} onNavigate={handleNavigate} />
    ),
    map: <MapScreen onNavigate={handleNavigate} />,
    profile: (
      <ProfileScreen
        onNavigate={handleNavigate}
        onLogout={() => {
          setAuth("login");
          setScreen("home");
          setHistory(["home"]);
        }}
      />
    ),
  };

  return (
    <>
      <style>{G}</style>

      <div
        className="fade-up"
        key={screen}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#1a1f2e",
        }}
      >
        {isMobile ? (
          // 📱 MOBILE VIEW
          <div style={{ position: "relative" }}>
            {screens[screen]}

            {screen === "home" && (
              <DrawerMenu
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                onNavigate={(id) => {
                  handleNavigate(id);
                  setMenuOpen(false);
                }}
              />
            )}
          </div>
        ) : (
          // 💻 DESKTOP VIEW
          <div
            style={{
              width: "1000px",
              display: "flex",
              gap: "30px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* LEFT SIDE */}
            <div style={{ flex: 1, color: "white" }}>
              <h1 style={{ fontSize: "30px", marginBottom: "10px" }}>
                Crisis Connect Dashboard
              </h1>

              <p style={{ color: "#9CA3AF", marginBottom: "20px" }}>
                Desktop view — analytics, logs, responders here.
              </p>

              <div
                style={{
                  background: "#111827",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <p>🚨 Active Alerts: 2</p>
                <p>👥 Responders Online: 5</p>
                <p>📍 Location Tracking Enabled</p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div style={{ position: "relative" }}>
              {screens[screen]}

              {screen === "home" && (
                <DrawerMenu
                  open={menuOpen}
                  onClose={() => setMenuOpen(false)}
                  onNavigate={(id) => {
                    handleNavigate(id);
                    setMenuOpen(false);
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
