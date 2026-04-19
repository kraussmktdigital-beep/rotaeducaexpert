import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";

export default function App() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const partidaRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState<any>(null);
  const [escolas, setEscolas] = useState<any[]>([]);
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [rotaTexto, setRotaTexto] = useState("");

  // 🔐 CONTROLE DE LOGIN
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsub();
  }, []);

  // 🔒 SE NÃO ESTIVER LOGADO
  if (!user) {
    return <Login />;
  }

  // 📂 CARREGAR CSV
  function carregar() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const lines = (e.target?.result as string).split("\n");
      const dados: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        let c = lines[i].split(";");

        if (c.length < 10) continue;

        dados.push({
          micro: c[5],
          municipio: c[3],
          escola: c[8],
          categoria: c[10] || "SEM CATEGORIA",
        });
      }

      setEscolas(dados);
      setSelecionadas([]);
      setRotaTexto("");
    };

    reader.readAsText(file);
  }

  // ✔ SELECIONAR
  function toggle(i: number) {
    setSelecionadas((prev) =>
      prev.includes(i)
        ? prev.filter((x) => x !== i)
        : [...prev, i]
    );
  }

  // 🚀 GERAR ROTA
  function gerarRota() {
    if (!partidaRef.current?.value) return alert("Digite a partida");
    if (selecionadas.length === 0) return alert("Selecione escolas");

    const selecionadasObj = selecionadas.map((i) => escolas[i]);

    let texto = "📍 ROTA ORGANIZADA\n\n";
    texto += `PARTIDA: ${partidaRef.current.value}\n\n`;

    selecionadasObj.forEach((e, i) => {
      texto += `${i + 1}. ${e.micro} - ${e.municipio} - ${e.escola}\n`;
    });

    setRotaTexto(texto);
  }

  // 🌍 GOOGLE MAPS
  function abrirGoogle() {
    const partida = partidaRef.current?.value!;
    const destinos = selecionadas.map((i) => escolas[i]);

    if (destinos.length === 0) return;

    const destinoFinal = destinos[destinos.length - 1];

    const waypoints = destinos
      .slice(0, 8)
      .map((e) =>
        encodeURIComponent(`${e.escola}, ${e.municipio}, MG`)
      )
      .join("|");

    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
      partida
    )}&destination=${encodeURIComponent(
      `${destinoFinal.escola}, ${destinoFinal.municipio}, MG`
    )}&waypoints=${waypoints}`;

    window.open(url, "_blank");
  }

  // 🧭 WAZE
  function abrirWaze() {
    const destinos = selecionadas.map((i) => escolas[i]);
    if (destinos.length === 0) return;

    const destinoFinal = destinos[destinos.length - 1];

    const url = `https://waze.com/ul?q=${encodeURIComponent(
      `${destinoFinal.escola}, ${destinoFinal.municipio}, MG`
    )}`;

    window.open(url, "_blank");
  }

  // 🚪 LOGOUT
  function sair() {
    signOut(auth);
  }

  // 📊 AGRUPAMENTO
  const agrupado = escolas.reduce((acc: any, e, i) => {
    const micro = e.micro || "SEM MICRORREGIÃO";
    const cat = e.categoria || "SEM CATEGORIA";

    if (!acc[micro]) acc[micro] = {};
    if (!acc[micro][cat]) acc[micro][cat] = [];

    acc[micro][cat].push({ ...e, index: i });

    return acc;
  }, {});

  return (
    <div className="app">

      {/* HEADER */}
      <div className="header">
        <img src="/logo.png" className="logo" />
        <h1 className="titulo">Rota EducaExpert</h1>

        <button onClick={sair} className="logout">
          Sair
        </button>
      </div>

      <div className="container">

        <input type="file" ref={fileRef} />
        <button onClick={carregar}>Carregar CSV</button>

        <input
          ref={partidaRef}
          placeholder="Partida (ex: Pouso Alegre MG)"
        />

        <button onClick={gerarRota} className="btn-main">
          📍 Gerar Rota
        </button>

        {rotaTexto && <pre className="rota-box">{rotaTexto}</pre>}

        {rotaTexto && (
          <div className="btn-row">
            <button onClick={abrirGoogle}>🚗 Google Maps</button>
            <button onClick={abrirWaze}>🧭 Waze</button>
          </div>
        )}

        {/* LISTA */}
        <div className="lista">
          {Object.entries(agrupado)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([micro, categorias]: any) => (
              <div key={micro} style={{ marginTop: 15 }}>

                <div className="micro">📍 {micro}</div>

                {Object.entries(categorias)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([cat, itens]: any) => (
                    <div key={cat} style={{ marginLeft: 10 }}>

                      <div className="cat">🏷 {cat}</div>

                      {itens.map((e: any) => (
                        <div key={e.index} className="item">

                          <span>
                            {e.municipio} - {e.escola}
                          </span>

                          <input
                            type="checkbox"
                            checked={selecionadas.includes(e.index)}
                            onChange={() => toggle(e.index)}
                          />
                        </div>
                      ))}

                    </div>
                  ))}

              </div>
            ))}
        </div>

      </div>

      {/* ESTILO */}
      <style>{`
        body {
          margin:0;
          font-family: Arial;
          background: linear-gradient(135deg,#0b1f3a,#123a6f);
          color:white;
        }

        .header {
          text-align:center;
          padding:20px;
          position:relative;
        }

        .logo {
          width:40px;
        }

        .titulo {
          color:white;
          margin-top:5px;
        }

        .logout {
          position:absolute;
          right:20px;
          top:20px;
          background:red;
        }

        .container {
          max-width:900px;
          margin:auto;
          padding:20px;
        }

        input {
          width:100%;
          padding:10px;
          margin-top:10px;
          border-radius:8px;
          border:none;
        }

        button {
          width:100%;
          margin-top:10px;
          padding:10px;
          border:none;
          border-radius:8px;
          background:#1e5eff;
          color:white;
        }

        .btn-main {
          background:#00aaff;
        }

        .rota-box {
          background:white;
          color:black;
          padding:10px;
          margin-top:10px;
          border-radius:8px;
          white-space:pre-wrap;
        }

        .btn-row {
          display:flex;
          gap:10px;
        }

        .item {
          padding:10px;
          margin-top:5px;
          border-radius:6px;
          display:flex;
          justify-content:space-between;
          background:rgba(255,255,255,0.1);
        }

        .micro {
          font-weight:bold;
          margin-top:10px;
        }

        .cat {
          font-size:12px;
          margin-left:10px;
        }
      `}</style>

    </div>
  );
}