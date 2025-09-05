import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
          role: "learner",
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

        // ✅ Save token after signup
        localStorage.setItem("token", res.data.token);
        console.log("Redirecting to dashboard...");

        navigate("/dashboard");
      } else {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        alert("✅ Learner signed in!");
        console.log(res.data);

        // ✅ Save token after login
        localStorage.setItem("token", res.data.token);
        console.log("Redirecting to dashboard...");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  const headerText = isSignup ? "Learner Registration" : "Welcome Back";
  const descText = isSignup
    ? "Join WitTrade as a learner and access real-world startup projects."
    : "Sign in to manage your profile and applications.";

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-4 pt-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-2">
          {headerText}
        </h2>
        <p className="text-gray-600 text-center mb-6">{descText}</p>

        {/* Forms container */}
        <div className="relative" style={{ minHeight: "470px" }}>
          {/* Signup Form */}
          <form
            onSubmit={handleSubmit}
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
            className={`absolute inset-0 transition-all duration-300 ease-out ${
              !isSignup
                ? "opacity-100 translate-y-0 z-10"
                : "opacity-0 translate-y-4 z-0 pointer-events-none"
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
