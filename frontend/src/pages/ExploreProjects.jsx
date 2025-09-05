import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaBuilding, FaCode } from "react-icons/fa";

function ExploreProjects() {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({ skill: "", companyName: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams(
        Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v) // only non-empty filters
        )
      ).toString();

      const res = await axios.get(
        `http://localhost:5000/api/projects/all?${query}`
      );
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = () => {
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      {/* Page Header */}
      <div className="text-center mb-10 animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">
          Explore <span className="text-gray-900">Projects</span>
        </h1>
        <p className="mt-3 text-gray-600 text-lg">
          Browse projects from startups and filter by skill or company.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 flex flex-wrap gap-4 items-center transition-all duration-300 hover:shadow-lg">
        <div className="relative flex-1 min-w-[200px]">
          <FaCode className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="skill"
            placeholder="Filter by Skill (e.g., React)"
            value={filters.skill}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div className="relative flex-1 min-w-[200px]">
          <FaBuilding className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="companyName"
            placeholder="Filter by Company"
            value={filters.companyName}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <button
          onClick={handleFilter}
          className="btn-primary flex items-center gap-2 px-6 py-2 transition-transform hover:scale-105 cursor-pointer"
        >
          <FaSearch /> Apply
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="text-center text-gray-500 animate-pulse">
          Loading projects...
        </div>
      )}

      {/* Project List */}
      {!loading && projects.length === 0 ? (
        <p className="text-gray-600 text-center animate-fadeIn">
          No projects found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="p-5 border rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                {proj.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {proj.description}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <span className="font-medium">Skills:</span>{" "}
                {proj.requiredSkills.join(", ")}
              </p>
              <p className="text-xs text-gray-400 mb-3">
                <span className="font-medium">Company:</span>{" "}
                {proj.companyName}
              </p>
              <a href="/learner-auth">
                <button className="btn-secondary w-full transition hover:scale-105 cursor-pointer">
                  View / Apply
                </button>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExploreProjects;
