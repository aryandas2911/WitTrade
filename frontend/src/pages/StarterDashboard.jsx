import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUserTie,
  FaFolderPlus,
  FaUsers,
  FaSignOutAlt,
  FaIndustry,
  FaUsersCog,
  FaGlobe,
  FaBuilding,
} from "react-icons/fa";

function StartupDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    requiredSkills: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/startup-auth");
      return;
    }

    const fetchProfileAndProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);

        const projRes = await axios.get(
          "http://localhost:5000/api/projects/mine",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProjects(projRes.data);
      } catch (err) {
        console.error("Profile or projects fetch failed:", err);
        localStorage.removeItem("token");
        navigate("/startup-auth");
      }
    };

    fetchProfileAndProjects();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleProjectChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description) {
      alert("Please fill in all fields");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/projects",
        {
          title: newProject.title,
          description: newProject.description,
          requiredSkills: newProject.requiredSkills
            .split(",")
            .map((s) => s.trim()),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProjects([...projects, res.data]);
      setNewProject({ title: "", description: "", requiredSkills: "" });
      alert("✅ Project added successfully!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to add project");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-blue-600">Startup Dashboard</h2>
        <nav className="flex space-x-3 bg-gray-100 rounded-full px-3 py-1">
          {[
            { key: "profile", label: "Profile", icon: <FaUserTie /> },
            { key: "projects", label: "Projects", icon: <FaFolderPlus /> },
            { key: "applicants", label: "Applicants", icon: <FaUsers /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white font-semibold shadow-md"
                  : "text-gray-600 hover:bg-white hover:shadow-sm hover:scale-105"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition font-semibold cursor-pointer"
        >
          <FaSignOutAlt /> Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="relative animate-fadeIn">
            {/* Banner */}
            <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-xl"></div>

            {/* Profile Card */}
            <div className="card max-w-3xl mx-auto -mt-20 relative p-8 shadow-lg rounded-xl bg-white">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 flex items-center justify-center text-3xl font-bold text-white shadow-md">
                  {user.startupProfile?.companyName?.[0] || "S"}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    {user.startupProfile?.companyName}
                  </h1>
                  <p className="text-gray-600">Founder: {user.startupProfile?.founderName}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <p className="flex items-center gap-2">
                  <FaIndustry className="text-blue-500" />
                  <span className="font-semibold">Industry:</span>{" "}
                  {user.startupProfile?.industry || "Not provided"}
                </p>
                <p className="flex items-center gap-2">
                  <FaUsersCog className="text-blue-500" />
                  <span className="font-semibold">Company Size:</span>{" "}
                  {user.startupProfile?.companySize || "Not provided"}
                </p>
                <p className="flex items-center gap-2">
                  <FaGlobe className="text-blue-500" />
                  <span className="font-semibold">Website:</span>{" "}
                  {user.startupProfile?.website ? (
                    <a
                      href={user.startupProfile.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline hover:opacity-80 transition cursor-pointer"
                    >
                      {user.startupProfile.website}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Add Project Form */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4 text-[var(--primary-color)]">
                Post a New Project
              </h2>
              <div className="space-y-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={handleProjectChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--primary-color)]"
                />
                <textarea
                  name="description"
                  placeholder="Project Description"
                  value={newProject.description}
                  onChange={handleProjectChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--primary-color)]"
                />
                <input
                  type="text"
                  name="requiredSkills"
                  placeholder="Required Skills (comma separated)"
                  value={newProject.requiredSkills}
                  onChange={handleProjectChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--primary-color)]"
                />
                <button
                  onClick={handleAddProject}
                  className="btn-primary w-full cursor-pointer hover:scale-105 transition"
                >
                  Add Project
                </button>
              </div>
            </div>

            {/* Posted Projects */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4 text-[var(--primary-color)]">
                Your Projects
              </h2>
              {projects.length === 0 ? (
                <p className="text-[var(--text-light)]">
                  No projects posted yet.
                </p>
              ) : (
                <ul className="grid md:grid-cols-2 gap-6">
                  {projects.map((proj) => (
                    <li
                      key={proj._id}
                      className="p-4 border rounded-md bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition cursor-pointer"
                    >
                      <h4 className="font-semibold text-lg">{proj.title}</h4>
                      <p className="text-[var(--text-light)]">
                        {proj.description}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Skills: {proj.requiredSkills.join(", ")}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Posted by: <strong>{proj.companyName}</strong>
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Applicants Tab */}
        {activeTab === "applicants" && (
          <div className="card animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-[var(--primary-color)]">
              Applicants
            </h2>
            {projects.length === 0 ? (
              <p className="text-gray-600">No projects posted yet.</p>
            ) : (
              projects.map((proj) => (
                <div
                  key={proj._id}
                  className="mb-6 p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-lg mb-2">{proj.title}</h3>
                  {proj.applicants?.length === 0 ? (
                    <p className="text-gray-500 text-sm">No applicants yet.</p>
                  ) : (
                    <ul className="space-y-2">
                      {proj.applicants.map((app) => (
                        <li
                          key={app.learnerId}
                          className="p-2 border rounded-md bg-gray-50 hover:shadow-sm transition cursor-pointer"
                        >
                          <p className="font-semibold">{app.learnerName}</p>
                          <p className="text-sm text-gray-600">
                            {app.learnerEmail}
                          </p>
                          <p className="text-xs text-gray-400">
                            Applied at{" "}
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default StartupDashboard;
