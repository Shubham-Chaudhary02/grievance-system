import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post(
        "https://grievance-system-zrv5.onrender.com/api/register",
        data
      );

      alert("Registered Successfully ✅");
      navigate("/");
    } catch (err) {
      alert(err.response?.data || "Register Error ❌");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) =>
          setData({ ...data, name: e.target.value })
        }
      />

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

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;