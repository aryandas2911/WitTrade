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

    const fetchProfileAndProjects = async () => {
      try {
        // ✅ fetch startup profile
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);

        // ✅ fetch projects created by this startup
        const projRes = await axios.get("http://localhost:5000/api/projects/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      // ✅ only send project fields, company info is added in backend
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

      setProjects([...projects, res.data]); // ✅ backend returns project with companyName
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
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className="w-64 text-white p-6 flex flex-col justify-between shadow-lg"
        style={{ backgroundColor: "var(--primary-dark)" }}
      >
        <div>
          <h2 className="text-2xl font-bold mb-10 text-white">WitTrade 🚀</h2>
          <nav className="space-y-3">
            {["profile", "projects", "applicants"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2 rounded-md transition ${
                  activeTab === tab
                    ? "text-black font-semibold"
                    : "hover:opacity-90"
                }`}
                style={{
                  backgroundColor:
                    activeTab === tab
                      ? "var(--secondary-color)"
                      : "transparent",
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        <button onClick={handleLogout} className="btn-secondary w-full py-2">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[var(--background)] p-10 overflow-y-auto">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="card max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-[var(--primary-color)] border-b pb-3">
              Company Profile
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <ProfileItem
                label="Company"
                value={user.startupProfile?.companyName}
              />
              <ProfileItem
                label="Founder"
                value={user.startupProfile?.founderName}
              />
              <ProfileItem
                label="Industry"
                value={user.startupProfile?.industry}
              />
              <ProfileItem
                label="Company Size"
                value={user.startupProfile?.companySize}
              />
              <div className="col-span-2">
                <span className="font-semibold">Website:</span>{" "}
                {user.startupProfile?.website ? (
                  <a
                    href={user.startupProfile.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--primary-color)] underline"
                  >
                    {user.startupProfile.website}
                  </a>
                ) : (
                  "Not provided"
                )}
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
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
                <button onClick={handleAddProject} className="btn-primary w-full">
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
                <ul className="space-y-4">
                  {projects.map((proj) => (
                    <li
                      key={proj._id}
                      className="p-4 border rounded-md bg-white shadow-sm hover:shadow-md transition"
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
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-[var(--primary-color)]">
              Applicants
            </h2>
            {projects.length === 0 ? (
              <p className="text-gray-600">No projects posted yet.</p>
            ) : (
              projects.map((proj) => (
                <div
                  key={proj._id}
                  className="mb-6 p-4 border rounded-lg bg-white shadow-sm"
                >
                  <h3 className="font-semibold text-lg mb-2">{proj.title}</h3>
                  {proj.applicants?.length === 0 ? (
                    <p className="text-gray-500 text-sm">No applicants yet.</p>
                  ) : (
                    <ul className="space-y-2">
                      {proj.applicants.map((app) => (
                        <li
                          key={app.learnerId}
                          className="p-2 border rounded-md bg-gray-50"
                        >
                          <p className="font-semibold">{app.learnerName}</p>
                          <p className="text-sm text-gray-600">{app.learnerEmail}</p>
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

function ProfileItem({ label, value }) {
  return (
    <p>
      <span className="font-semibold">{label}:</span>{" "}
      {value || "Not provided"}
    </p>
  );
}

export default StartupDashboard;
