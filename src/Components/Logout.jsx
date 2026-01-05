import { useNavigate } from "react-router-dom";
import api from "./api/axios";

function Logout() {
  const navigate = useNavigate();

  const logout = () => {
    api.post("/logout").finally(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("priv");
      navigate("/login", { replace: true });
    });
  };

  return <button onClick={logout}>Logout</button>;
}

export default Logout;
