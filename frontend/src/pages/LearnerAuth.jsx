import { useState } from "react";

function LearnerAuth() {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      console.log("Signup Data:", formData);
      alert("✅ Learner signed up!");
    } else {
      console.log("Signin Data:", {
        email: formData.email,
        password: formData.password,
      });
      alert("✅ Learner signed in!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 transition-colors duration-300">
            {isSignup ? "Create Your Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-600 mt-2">
            {isSignup
              ? "Join WitTrade as a learner and start your journey."
              : "Sign in to continue your learning journey."}
          </p>
        </div>

        <div className="relative" style={{ minHeight: 300 }}>
          <form
            onSubmit={handleSubmit}
            aria-hidden={!isSignup}
            className={`absolute inset-0 transition-all duration-300 ease-out transform ${
              isSignup
                ? "opacity-100 translate-y-0 z-10"
                : "opacity-0 -translate-y-4 z-0 pointer-events-none"
            }`}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full py-3 text-lg">
                Sign Up
              </button>
            </div>
          </form>

          <form
            onSubmit={handleSubmit}
            aria-hidden={isSignup}
            className={`absolute inset-0 transition-all duration-300 ease-out transform ${
              isSignup
                ? "opacity-0 translate-y-4 z-0 pointer-events-none"
                : "opacity-100 translate-y-0 z-10"
            }`}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full py-3 text-lg">
                Sign In
              </button>
            </div>
          </form>
        </div>

        <div className="my-6 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button className="w-full border py-3 rounded-md hover:bg-gray-50 transition">
          Continue with Google
        </button>

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
