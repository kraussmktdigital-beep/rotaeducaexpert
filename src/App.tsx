import { useState, useEffect } from "react";
import { auth, loginWithGoogle, logout } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  }, []);

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      fontFamily: "Arial",
      background: "#0f172a",
      color: "white"
    }}>
      
      {/* SIDEBAR */}
      <div style={{ width: 240, background: "#111827", padding: 20 }}>
        <h2 style={{ color: "#38bdf8" }}>Rota Expert</h2>

        {user ? (
          <>
            <p>👤 {user.email}</p>
            <button onClick={logout} style={btn}>Logout</button>
          </>
        ) : (
          <button onClick={loginWithGoogle} style={btn}>
            Login Google
          </button>
        )}

        <hr />
        <p>📊 Dashboard</p>
        <p>👥 Leads</p>
        <p>💰 Vendas</p>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: 20 }}>
        <h1>Dashboard</h1>

        <div style={{ display: "flex", gap: 10 }}>
          <Card title="Vendas" value="R$ 0" />
          <Card title="Leads" value="0" />
          <Card title="Conversão" value="0%" />
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div style={{
      background: "#1e293b",
      padding: 20,
      borderRadius: 10,
      flex: 1
    }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

const btn = {
  marginTop: 10,
  padding: 10,
  background: "#1f2937",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  width: "100%"
};