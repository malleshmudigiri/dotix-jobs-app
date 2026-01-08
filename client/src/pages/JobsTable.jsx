import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function JobsTable() {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const BACKEND_URL= import.meta.env.VITE_BACKEND_URL

 
  const fetchJobs = async (statusVal = "", priorityVal = "") => {
    setLoading(true);
    try {
      let url = `${BACKEND_URL}/api/jobs`;
      const query = [];
      if (statusVal) query.push(`status=${encodeURIComponent(statusVal)}`);
      if (priorityVal) query.push(`priority=${encodeURIComponent(priorityVal)}`);
      if (query.length) url += `?${query.join("&")}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch jobs");
      setJobs(data);
      setMessage("");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const runJob = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/run-job/${id}`, { method: "POST" });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to run job");
    
      fetchJobs(status, priority);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Jobs Dashboard</h2>

   
      <div className="flex gap-4 mb-4">
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            fetchJobs(e.target.value, priority);
          }}
          className="px-3 py-2 border rounded text-gray-700"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
            fetchJobs(status, e.target.value);
          }}
          className="px-3 py-2 border rounded text-gray-700"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

   
      {loading && <p className="text-blue-500 mb-2 text-center text-xl">Loading...</p>}
      {message && <p className="text-red-500 mb-2">{message}</p>}


      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Task Name</th>
              <th className="py-2 px-4 text-left">Priority</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No jobs found
                </td>
              </tr>
            )}
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td
                  className="py-2 px-4 cursor-pointer text-blue-700"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  {job.taskName}
                </td>
                <td className="py-2 px-4 capitalize">{job.priority}</td>
                <td className="py-2 px-4 capitalize">{job.status}</td>
                <td className="py-2 px-4 flex gap-2">
                  {job.status === "pending" && (
                    <button
                      onClick={() => runJob(job.id)}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition"
                    >
                      Run
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobsTable;
