import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api/axios";  
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();

    api
      .post("/login", {           
        email,
        password,
      })
      .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("priv", res.data.user.priv);
          navigate("/products");
        })

      .catch(() => {
        setError("Invalid credentials");
      });
  };

  return (
    <div>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
