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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Explore Innovative Projects
        </h1>
        <p className="mt-3 text-lg opacity-90">
          Discover real-world projects posted by startups and apply to work on
          challenges that match your skills.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
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
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        {/* Project List */}
        {!loading && projects.length === 0 ? (
          <p className="text-gray-600 text-center animate-fadeIn">
            No projects found. Try adjusting your filters.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
            {projects.map((proj) => (
              <div
                key={proj._id}
                className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="font-bold text-xl mb-2 text-gray-900">
                  {proj.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {proj.description}
                </p>

                {/* Skills as badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {proj.requiredSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-500 mb-4">
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
    </div>
  );
}

export default ExploreProjects;
