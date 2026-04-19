import { useState } from "react";
import { loginWithGoogle, logout } from "./firebase";

export default function App() {
  const [user, setUser] = useState<any>(null);

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={{ color: "#38bdf8" }}>Rota Expert</h2>

        <button style={styles.btn} onClick={loginWithGoogle}>
          Login Google
        </button>

        <button style={styles.btn} onClick={logout}>
          Logout
        </button>

        <hr />

        <p style={{ fontSize: 12 }}>Dashboard</p>
        <p style={{ fontSize: 12 }}>Vendas</p>
        <p style={{ fontSize: 12 }}>Leads</p>
        <p style={{ fontSize: 12 }}>Configurações</p>
      </aside>

      <main style={styles.main}>
        <h1>Dashboard</h1>

        <div style={styles.cards}>
          <div style={styles.card}>📊 Vendas: R$ 0</div>
          <div style={styles.card}>👤 Leads: 0</div>
          <div style={styles.card}>🚀 Conversão: 0%</div>
        </div>

        <div style={styles.panel}>
          <h3>Bem-vindo ao sistema</h3>
          <p>Seu CRM está rodando com Firebase + React + Vercel</p>
        </div>
      </main>
    </div>
  );
}

const styles: any = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
    background: "#0f172a",
    color: "white",
  },
  sidebar: {
    width: "220px",
    padding: "20px",
    background: "#111827",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  main: {
    flex: 1,
    padding: "20px",
  },
  btn: {
    padding: "10px",
    marginTop: "5px",
    background: "#1f2937",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
  },
  cards: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  card: {
    flex: 1,
    padding: "20px",
    background: "#1e293b",
    borderRadius: "10px",
  },
  panel: {
    marginTop: "20px",
    padding: "20px",
    background: "#1e293b",
    borderRadius: "10px",
  },
};