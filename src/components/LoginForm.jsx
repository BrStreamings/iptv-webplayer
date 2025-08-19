import React, { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [server, setServer] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [type, setType] = useState("m3u");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!server || !user || !pass) {
      alert("Preencha todos os campos!");
      return;
    }
    let srv = server.trim();
    if (!/^http/.test(srv)) srv = "http://" + srv;
    onLogin({ server: srv, user, pass, type });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input placeholder="Servidor (ex: http://seuiptv.com:80)" value={server} onChange={e=>setServer(e.target.value)} />
      <input placeholder="Usuário" value={user} onChange={e=>setUser(e.target.value)} />
      <input type="password" placeholder="Senha" value={pass} onChange={e=>setPass(e.target.value)} />
      <div>
        <label>
          <input type="radio" checked={type==="m3u"} onChange={()=>setType("m3u")} />
          M3U
        </label>
        <label style={{marginLeft:20}}>
          <input type="radio" checked={type==="xtream"} onChange={()=>setType("xtream")} />
          Xtream Codes
        </label>
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
}