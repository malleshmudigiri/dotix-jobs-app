import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JobsTable from "./pages/JobsTable";
import JobDetail from "./pages/JobDetail";
import CreateJob from "./pages/CreateJob";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
      
        <nav className="bg-white shadow p-4 flex justify-center items-center">
          <Link
            to="/"
            className="text-gray-800 font-semibold mr-6 hover:text-blue-600 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/create-job"
            className="text-gray-800 font-semibold hover:text-blue-600 transition"
          >
            Create Job
          </Link>
        </nav>

     
        <div className="p-6">
          <Routes>
            <Route path="/" element={<JobsTable />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/create-job" element={<CreateJob />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
