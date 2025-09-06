import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaProjectDiagram,
  FaPlayCircle,
  FaSignOutAlt,
  FaEdit,
  FaGraduationCap,
  FaTools,
  FaLink,
} from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

function LearnerDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [projects, setProjects] = useState([]);
  const [appliedProjects, setAppliedProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/learner-auth");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setFormData(res.data.user);

        const projRes = await axios.get(
          `${API}/api/projects/match`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProjects(projRes.data);

        const appliedRes = await axios.get(
          `${API}/api/projects/applied/mine`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAppliedProjects(appliedRes.data);
      } catch (err) {
        console.error("Profile/projects fetch failed:", err);
        localStorage.removeItem("token");
        navigate("/learner-auth");
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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
        "${API}/api/users/profile",
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

  const handleApply = async (projectId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${API}/api/projects/${projectId}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Applied successfully!");

      const appliedRes = await axios.get(
        "${API}/api/projects/applied/mine",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppliedProjects(appliedRes.data);
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to apply");
    }
  };

  const handleWithdraw = async (projectId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${API}/api/projects/${projectId}/withdraw`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Withdrawn successfully!");

      const appliedRes = await axios.get(
        "${API}/api/projects/applied/mine",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppliedProjects(appliedRes.data);
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to withdraw");
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
        <h2 className="text-xl font-bold text-blue-600">Learner Dashboard</h2>
        <nav className="flex space-x-3 bg-gray-100 rounded-full px-3 py-1">
          {[
            { key: "profile", label: "Profile", icon: <FaUser /> },
            { key: "projects", label: "Projects", icon: <FaProjectDiagram /> },
            { key: "ongoing", label: "Ongoing", icon: <FaPlayCircle /> },
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
                  {user.name[0]}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary flex items-center gap-2 ml-auto cursor-pointer"
                  >
                    <FaEdit /> Edit
                  </button>
                )}
              </div>

              <div className="mt-6 space-y-3">
                {!isEditing ? (
                  <>
                    <p className="flex items-center gap-2">
                      <FaGraduationCap className="text-blue-500" />
                      <span className="font-semibold">Education:</span>{" "}
                      {user.learnerProfile?.education || "Not provided"}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaTools className="text-blue-500" />
                      <span className="font-semibold">Skills:</span>{" "}
                      {user.learnerProfile?.skills?.join(", ") ||
                        "Not provided"}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaLink className="text-blue-500" />
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
                    <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
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
                      <button
                        onClick={handleSave}
                        className="btn-primary px-6 cursor-pointer"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="btn-secondary px-6 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="card animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-6">Matching Projects</h2>
            {projects.length === 0 ? (
              <p className="text-gray-600">No matching projects found yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj._id}
                    className="p-5 border rounded-lg bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
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
                      className="btn-secondary w-full cursor-pointer"
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
          <div className="card animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-6">Ongoing Projects</h2>
            {appliedProjects.length === 0 ? (
              <p className="text-gray-600">
                You have not applied to any projects yet.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {appliedProjects.map((proj) => (
                  <div
                    key={proj._id}
                    className="p-5 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-lg mb-2">{proj.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {proj.description}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      Company: {proj.companyName}
                    </p>
                    <button
                      onClick={() => handleWithdraw(proj._id)}
                      className="btn-secondary flex items-center gap-2 w-full cursor-pointer"
                    >
                      <RiDeleteBin5Line /> Withdraw
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
