import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";



function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const BACKEND_URL= import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/api/jobs/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch job");
        setJob(data);
        setMessage("");
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <p className="text-gray-500 text-2xl text-center">Loading...</p>;
  if (message) return <p className="text-red-500 text-2xl text-center">{message}</p>;
  if (!job) return <p className="text-gray-500 text-2xl text-center">Job not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Job Detail</h2>
      <Link
        to="/"
        className="text-blue-700 hover:underline mb-4 inline-block"
      >
        ← Back to Dashboard
      </Link>

      <table className="min-w-full border rounded border-gray-200">
        <tbody>
          <tr className="border-b"><td className="px-4 py-2 font-semibold">ID</td><td className="px-4 py-2">{job.id}</td></tr>
          <tr className="border-b"><td className="px-4 py-2 font-semibold">Task Name</td><td className="px-4 py-2">{job.taskName}</td></tr>
          <tr className="border-b"><td className="px-4 py-2 font-semibold">Priority</td><td className="px-4 py-2 capitalize">{job.priority}</td></tr>
          <tr className="border-b"><td className="px-4 py-2 font-semibold">Status</td><td className="px-4 py-2 capitalize">{job.status}</td></tr>
          <tr className="border-b"><td className="px-4 py-2 font-semibold">Payload</td>
            <td className="px-4 py-2">
              <pre className="bg-gray-50 p-2 rounded font-mono text-sm overflow-x-auto">
                {JSON.stringify(job.payload, null, 2)}
              </pre>
            </td>
          </tr>
          <tr className="border-b"><td className="px-4 py-2 font-semibold">Created At</td><td className="px-4 py-2"> {new Date(job.createdAt).toLocaleString()}</td></tr>
          <tr><td className="px-4 py-2 font-semibold">Updated At</td><td className="px-4 py-2">{new Date(job.updatedAt).toLocaleString()}</td></tr>
        </tbody>
      </table>
    </div>
  );
}

export default JobDetail;
