import { loginWithGoogle, logout } from "./firebase";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Rota Expert</h1>

      <button onClick={loginWithGoogle}>
        Login com Google
      </button>

      <button onClick={logout} style={{ marginLeft: 10 }}>
        Sair
      </button>
    </div>
  );
}