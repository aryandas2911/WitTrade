import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LearnerDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token, send back to login page
    if (!token) {
      navigate("/learner-auth");
      return;
    }

    // Fetch learner profile
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/learner-auth"); // redirect if token is invalid
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // back to homepage
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Welcome, {user.name} 👋
        </h1>
        <button
          onClick={handleLogout}
          className="btn-primary px-4 py-2"
        >
          Logout
        </button>
      </div>

      {/* Profile Overview */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Overview</h2>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Education:</span> {user.learnerProfile?.education || "Not provided"}</p>
        <p><span className="font-semibold">Skills:</span> {user.learnerProfile?.skills?.join(", ") || "Not provided"}</p>
        <p><span className="font-semibold">Portfolio:</span> {user.learnerProfile?.portfolio || "Not provided"}</p>
      </div>

      {/* Placeholder Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-2">Projects</h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold mb-2">Progress & Badges</h2>
          <p className="text-gray-600">Gamification section will go here.</p>
        </div>
        <div className="card md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Leaderboard</h2>
          <p className="text-gray-600">Leaderboard data will be displayed here.</p>
        </div>
      </div>
    </div>
  );
}

export default LearnerDashboard;
