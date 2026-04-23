import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "https://grievance-system-zrv5.onrender.com/api/login",
        data
      );

      localStorage.setItem("token", res.data.token);
      alert("Login Success ✅");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data || "Login Failed ❌");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) =>
          setData({ ...data, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;