import { useState } from "react";
import axios from "axios";

function StartupAuth() {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    companyName: "",
    founderName: "",
    email: "",
    password: "",
    industry: "",
    companySize: "",
    website: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const res = await axios.post("http://localhost:5000/api/auth/register", {
          name: formData.companyName,
          email: formData.email,
          password: formData.password,
          role: "startup",
          startupProfile: {
            companyName: formData.companyName,
            founderName: formData.founderName,
            industry: formData.industry,
            companySize: formData.companySize,
            website: formData.website,
          },
        });
        alert("✅ Startup signed up!");
        console.log(res.data);
      } else {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        alert("✅ Startup signed in!");
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  // Fixed headers and descriptions
  const headerText = isSignup ? "Startup Registration" : "Startup Sign In";
  const descText = isSignup
    ? "Join WitTrade as a startup and post real-world projects."
    : "Sign in to manage your dashboard and projects.";

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 to-gray-100 px-4 pt-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
        {/* Headers fixed outside the forms */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center">
          {headerText}
        </h2>
        <p className="text-gray-600 text-center mt-2 mb-6">{descText}</p>

        {/* Forms container with fixed height */}
        <div className="relative min-h-[470px]">
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
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="founderName"
                placeholder="Founder / Contact Person"
                value={formData.founderName}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Work Email"
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
              <input
                type="text"
                name="industry"
                placeholder="Industry (e.g. FinTech, EdTech)"
                value={formData.industry}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Company Size</option>
                <option value="1-10">1–10 employees</option>
                <option value="11-50">11–50 employees</option>
                <option value="51-200">51–200 employees</option>
                <option value="200+">200+ employees</option>
              </select>
              <input
                type="text"
                name="website"
                placeholder="Company Website (optional)"
                value={formData.website}
                onChange={handleChange}
                className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="btn-primary w-full py-2.5 text-lg"
              >
                Register Startup
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
                placeholder="Work Email"
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
              Already registered?{" "}
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
              New to WitTrade?{" "}
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

export default StartupAuth;
