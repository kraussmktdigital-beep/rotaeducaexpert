import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function entrar() {
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        alert("Login realizado!");
      })
      .catch(() => {
        alert("Erro no login");
      });
  }

  return (
    <div className="login">

      <img src="/logo.png" className="logo" />

      <h2>Rota EducaExpert</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setSenha(e.target.value)}
      />

      <button onClick={entrar}>Entrar</button>

      <style>{`
        .login {
          height:100vh;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          background: linear-gradient(135deg,#0b1f3a,#123a6f);
        }

        .logo {
          width:60px;
          margin-bottom:10px;
        }

        h2 {
          color:white;
        }

        input {
          width:250px;
          padding:10px;
          margin-top:10px;
          border-radius:8px;
          border:none;
        }

        button {
          width:250px;
          margin-top:10px;
          padding:10px;
          border:none;
          border-radius:8px;
          background:#1e5eff;
          color:white;
        }
      `}</style>

    </div>
  );
}