import { useState } from "react";
import axios from "axios";

function LearnerAuth() {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    education: "",
    skills: "",
    portfolio: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "learner", // fixed role
          learnerProfile: {
            education: formData.education,
            skills: formData.skills
              ? formData.skills.split(",").map((s) => s.trim())
              : [],
            portfolio: formData.portfolio,
          },
        });
        alert("✅ Learner signed up!");
        console.log(res.data);
      } else {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        alert("✅ Learner signed in!");
        console.log(res.data);

        localStorage.setItem("token", res.data.token);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      {/* Auth Box */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
        {/* Header */}
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
          {isSignup ? "Learner Sign Up" : "Learner Sign In"}
        </h2>

        {/* Forms wrapper with fixed height */}
        <div className="relative" style={{ minHeight: "400px" }}>
          {/* Signup Form */}
          <form
            onSubmit={handleSubmit}
            aria-hidden={!isSignup}
            className={`absolute inset-0 transition-all duration-300 ease-out ${
              isSignup
                ? "opacity-100 translate-y-0 z-10"
                : "opacity-0 -translate-y-4 z-0 pointer-events-none"
            }`}
          >
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="education"
                placeholder="Education"
                value={formData.education}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="skills"
                placeholder="Skills (comma separated)"
                value={formData.skills}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="portfolio"
                placeholder="Portfolio / GitHub link"
                value={formData.portfolio}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="btn-primary w-full py-2.5 text-lg"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Signin Form */}
          <form
            onSubmit={handleSubmit}
            aria-hidden={isSignup}
            className={`absolute inset-0 transition-all duration-300 ease-out ${
              isSignup
                ? "opacity-0 translate-y-4 z-0 pointer-events-none"
                : "opacity-100 translate-y-0 z-10"
            }`}
          >
            <div className="space-y-3">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="btn-primary w-full py-2.5 text-lg"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        {/* Toggle */}
        <p className="text-sm text-gray-600 text-center mt-6">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignup(true)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default LearnerAuth;
