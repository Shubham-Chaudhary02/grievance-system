import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "https://grievance-system-zrv5.onrender.com/api/login",
        data
      );

      // token save
      localStorage.setItem("token", res.data.token);

      alert("Login Successful ✅");

      // dashboard pe redirect
      navigate("/dashboard");
    } catch (err) {
      alert("Login Failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setData({ ...data, email: e.target.value })
        }
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />
      <br /><br />

      <button onClick={login}>Login</button>

      <br /><br />

      {/* 🔥 REGISTER LINK */}
      <p>
        Don’t have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;