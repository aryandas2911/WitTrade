import { useState } from "react";

function StartupAuth() {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    companyName: "",
    founderName: "",
    email: "",
    password: "",
    industry: "",
    companySize: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      console.log("Startup Signup Data:", formData);
      alert("✅ Startup signed up!");
    } else {
      console.log("Startup Signin Data:", {
        email: formData.email,
        password: formData.password,
      });
      alert("✅ Startup signed in!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center">
          {isSignup ? "Startup Registration" : "Welcome Back"}
        </h2>
        <p className="text-gray-600 text-center mt-2 mb-6">
          {isSignup
            ? "Join WitTrade as a startup and post real-world projects."
            : "Sign in to manage your dashboard and projects."}
        </p>

        {/* Transition wrapper */}
        <div
          key={isSignup ? "signup" : "signin"}
          className="transition-all duration-500 ease-out transform opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards]"
        >
          <style>
            {`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(12px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}
          </style>

          {isSignup ? (
            <form onSubmit={handleSubmit} className="space-y-3">
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
              <button type="submit" className="btn-primary w-full py-2.5 text-lg">
                Register Startup
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
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
              <button type="submit" className="btn-primary w-full py-2.5 text-lg">
                Sign In
              </button>
            </form>
          )}
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
