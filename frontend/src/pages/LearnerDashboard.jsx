import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LearnerDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [projects, setProjects] = useState([]); // matching projects
  const [appliedProjects, setAppliedProjects] = useState([]); // ongoing projects
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/learner-auth");
      return;
    }

    const fetchData = async () => {
      try {
        // ✅ fetch learner profile
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setFormData(res.data.user);

        // ✅ fetch matching projects
        const projRes = await axios.get("http://localhost:5000/api/projects/match", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(projRes.data);

        // ✅ fetch learner’s applied projects
        const appliedRes = await axios.get("http://localhost:5000/api/projects/applied/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppliedProjects(appliedRes.data);
      } catch (err) {
        console.error("Profile/projects fetch failed:", err);
        localStorage.removeItem("token");
        navigate("/learner-auth");
      }
    };

    fetchData();
  }, [navigate]);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ✅ Profile edit handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "skills") {
      setFormData({
        ...formData,
        learnerProfile: {
          ...formData.learnerProfile,
          skills: value.split(",").map((s) => s.trim()),
        },
      });
    } else if (["education", "portfolio"].includes(name)) {
      setFormData({
        ...formData,
        learnerProfile: {
          ...formData.learnerProfile,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name: formData.name,
          education: formData.learnerProfile?.education,
          skills: formData.learnerProfile?.skills,
          portfolio: formData.learnerProfile?.portfolio,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data.user);
      setIsEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update profile");
    }
  };

  // ✅ Apply to project
  const handleApply = async (projectId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:5000/api/projects/${projectId}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Applied successfully!");

      // refresh applied projects
      const appliedRes = await axios.get("http://localhost:5000/api/projects/applied/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppliedProjects(appliedRes.data);
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to apply");
    }
  };

  // ✅ Withdraw from project
  const handleWithdraw = async (projectId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:5000/api/projects/${projectId}/withdraw`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Withdrawn successfully!");

      // refresh applied projects
      const appliedRes = await axios.get("http://localhost:5000/api/projects/applied/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppliedProjects(appliedRes.data);
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to withdraw");
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <h2 className="text-xl font-bold text-blue-600">Learner Dashboard</h2>
        <nav className="space-y-3">
          {["profile", "projects", "ongoing"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === tab
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} className="btn-primary w-full mt-6">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="card max-w-2xl mx-auto">
            {!isEditing ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-700">
                      {user.name[0]}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{user.name}</h1>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary"
                  >
                    Edit
                  </button>
                </div>
                <p>
                  <span className="font-semibold">Education:</span>{" "}
                  {user.learnerProfile?.education || "Not provided"}
                </p>
                <p>
                  <span className="font-semibold">Skills:</span>{" "}
                  {user.learnerProfile?.skills?.join(", ") || "Not provided"}
                </p>
                <p>
                  <span className="font-semibold">Portfolio:</span>{" "}
                  {user.learnerProfile?.portfolio ? (
                    <a
                      href={user.learnerProfile.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      {user.learnerProfile.portfolio}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Full Name"
                  />
                  <input
                    type="text"
                    name="education"
                    value={formData.learnerProfile?.education || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Education"
                  />
                  <input
                    type="text"
                    name="skills"
                    value={formData.learnerProfile?.skills?.join(", ") || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Skills (comma separated)"
                  />
                  <input
                    type="text"
                    name="portfolio"
                    value={formData.learnerProfile?.portfolio || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Portfolio / GitHub link"
                  />
                </div>
                <div className="flex space-x-4 mt-6">
                  <button onClick={handleSave} className="btn-primary px-6">
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary px-6"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="card">
            <h2 className="text-2xl font-semibold mb-6">Matching Projects</h2>
            {projects.length === 0 ? (
              <p className="text-gray-600">No matching projects found yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj._id}
                    className="p-5 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-lg mb-2">{proj.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {proj.description}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      Skills: {proj.requiredSkills.join(", ")}
                    </p>
                    <p className="text-xs text-gray-400 mb-3">
                      Posted by: <strong>{proj.companyName}</strong>
                    </p>
                    <button
                      onClick={() => handleApply(proj._id)}
                      className="btn-secondary"
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Ongoing Projects Tab */}
        {activeTab === "ongoing" && (
          <div className="card">
            <h2 className="text-2xl font-semibold mb-6">Ongoing Projects</h2>
            {appliedProjects.length === 0 ? (
              <p className="text-gray-600">You have not applied to any projects yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {appliedProjects.map((proj) => (
                  <div
                    key={proj._id}
                    className="p-5 border rounded-lg bg-white shadow-sm"
                  >
                    <h3 className="font-semibold text-lg mb-2">{proj.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{proj.description}</p>
                    <p className="text-sm text-gray-500 mb-3">
                      Company: {proj.companyName}
                    </p>
                    <button
                      onClick={() => handleWithdraw(proj._id)}
                      className="btn-secondary"
                    >
                      Withdraw
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default LearnerDashboard;
