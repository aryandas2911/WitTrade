import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Profile fetch failed:", err);
        localStorage.removeItem("token");
        navigate("/startup-auth");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleProjectChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) {
      alert("Please fill in all fields");
      return;
    }

    const formattedProject = {
      ...newProject,
      requiredSkills: newProject.requiredSkills
        .split(",")
        .map((s) => s.trim()),
    };

    setProjects([...projects, formattedProject]);
    setNewProject({ title: "", description: "", requiredSkills: "" });
    alert("✅ Project added!");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <h2 className="text-xl font-bold text-blue-600">Startup Dashboard</h2>
        <nav className="space-y-3">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full text-left px-3 py-2 rounded-md ${
              activeTab === "profile"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full text-left px-3 py-2 rounded-md ${
              activeTab === "projects"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            Manage Projects
          </button>
          <button
            onClick={() => setActiveTab("applicants")}
            className={`w-full text-left px-3 py-2 rounded-md ${
              activeTab === "applicants"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            Applicants
          </button>
        </nav>
        <button onClick={handleLogout} className="btn-primary w-full mt-6">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {activeTab === "profile" && (
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Startup Profile</h2>
            <p>
              <span className="font-semibold">Company Name:</span>{" "}
              {user.startupProfile?.companyName || "Not provided"}
            </p>
            <p>
              <span className="font-semibold">Founder:</span>{" "}
              {user.startupProfile?.founderName || "Not provided"}
            </p>
            <p>
              <span className="font-semibold">Industry:</span>{" "}
              {user.startupProfile?.industry || "Not provided"}
            </p>
            <p>
              <span className="font-semibold">Company Size:</span>{" "}
              {user.startupProfile?.companySize || "Not provided"}
            </p>
            <p>
              <span className="font-semibold">Website:</span>{" "}
              {user.startupProfile?.website ? (
                <a
                  href={user.startupProfile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {user.startupProfile.website}
                </a>
              ) : (
                "Not provided"
              )}
            </p>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="card">
            <h2 className="text-2xl font-semibold mb-6">Manage Projects</h2>

            {/* Add Project Form */}
            <div className="mb-6 space-y-3">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={newProject.title}
                onChange={handleProjectChange}
                className="w-full p-2 border rounded-md"
              />
              <textarea
                name="description"
                placeholder="Project Description"
                value={newProject.description}
                onChange={handleProjectChange}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                name="requiredSkills"
                placeholder="Required Skills (comma separated)"
                value={newProject.requiredSkills}
                onChange={handleProjectChange}
                className="w-full p-2 border rounded-md"
              />
              <button onClick={handleAddProject} className="btn-primary">
                Add Project
              </button>
            </div>

            {/* Posted Projects */}
            <h3 className="text-xl font-semibold mb-3">Your Projects</h3>
            {projects.length === 0 ? (
              <p className="text-gray-600">No projects posted yet.</p>
            ) : (
              <ul className="space-y-4">
                {projects.map((proj, idx) => (
                  <li
                    key={idx}
                    className="p-4 border rounded-md bg-white shadow-sm"
                  >
                    <h4 className="font-semibold">{proj.title}</h4>
                    <p className="text-gray-600">{proj.description}</p>
                    <p className="text-sm text-gray-500">
                      Skills: {proj.requiredSkills.join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "applicants" && (
          <div className="card">
            <h2 className="text-2xl font-semibold mb-6">Applicants</h2>
            {/* Mock applicants section */}
            <p className="text-gray-600 mb-4">
              Learners who applied to your projects will appear here.
            </p>
            <ul className="space-y-3">
              <li className="p-4 border rounded-md bg-white shadow-sm">
                <p className="font-semibold">John Doe</p>
                <p className="text-gray-600 text-sm">
                  Skills: React, Node.js
                </p>
                <a
                  href="https://github.com/johndoe"
                  className="text-blue-600 underline text-sm"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Portfolio
                </a>
              </li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default StartupDashboard;
