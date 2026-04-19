import { loginWithGoogle } from "./firebase";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>

      <button onClick={loginWithGoogle}>
        Entrar com Google
      </button>
    </div>
  );
}