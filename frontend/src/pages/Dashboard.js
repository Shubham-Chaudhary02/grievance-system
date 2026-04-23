import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Fetch
  const fetchData = async () => {
    const res = await axios.get(
      "https://grievance-system-zrv5.onrender.com/api/grievances",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setList(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create
  const submit = async () => {
    try {
      await axios.post(
        "https://grievance-system-zrv5.onrender.com/api/grievances",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Submitted ✅");
      setData({ title: "", description: "", category: "" });
      fetchData();
    } catch {
      alert("Error ❌");
    }
  };

  // Delete
  const deleteItem = async (id) => {
    await axios.delete(
      `https://grievance-system-zrv5.onrender.com/api/grievances/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchData();
  };

  // Update
  const updateStatus = async (id) => {
    await axios.put(
      `https://grievance-system-zrv5.onrender.com/api/grievances/${id}`,
      { status: "Resolved" },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchData();
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <h3>Add Grievance</h3>

      <input
        placeholder="Title"
        value={data.title}
        onChange={(e) =>
          setData({ ...data, title: e.target.value })
        }
      />

      <input
        placeholder="Description"
        value={data.description}
        onChange={(e) =>
          setData({ ...data, description: e.target.value })
        }
      />

      <input
        placeholder="Category"
        value={data.category}
        onChange={(e) =>
          setData({ ...data, category: e.target.value })
        }
      />

      <button onClick={submit}>Submit</button>

      <h3>All Grievances</h3>

      {list.map((item) => (
        <div key={item._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <p><b>Title:</b> {item.title}</p>
          <p><b>Description:</b> {item.description}</p>
          <p><b>Category:</b> {item.category}</p>
          <p>
            <b>Status:</b>{" "}
            <span style={{ color: item.status === "Resolved" ? "green" : "red" }}>
              {item.status}
            </span>
          </p>

          <button onClick={() => deleteItem(item._id)}>Delete</button>
          <button onClick={() => updateStatus(item._id)}>Mark Resolved</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;