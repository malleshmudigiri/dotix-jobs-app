import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateJob() {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("low");
  const [payload, setPayload] = useState("{}");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const BACKEND_URL= import.meta.env.VITE_BACKEND_URL

  const submitJob = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true); 
    try {
      const payloadObj = JSON.parse(payload);

      const res = await fetch(`${BACKEND_URL}/api/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskName, priority, payload: payloadObj }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create job");

      alert("Job created successfully");

      setTaskName("");
      setPriority("low");
      setPayload("{}");

      navigate("/");
    } catch (err) {
      alert(err.message);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create Job</h2>

      {message && <p className="text-red-500 mb-4">{message}</p>}

      <form onSubmit={submitJob} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Task Name:</label>
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Payload (JSON):</label>
          <textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            rows="5"
            className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 font-mono"
          />
        </div>

        <button
          type="submit"
          disabled={loading} 
          className={`px-4 py-2 rounded transition ${
            loading
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
          }`}
        >
          {loading ? "Creating..." : "Create Job"} 
        </button>
      </form>
    </div>
  );
}

export default CreateJob;
