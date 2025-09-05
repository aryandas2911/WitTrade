import { useState } from "react";

function LearnerAuth() {
  const [isSignup, setIsSignup] = useState(true); // toggle state
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="card w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
          {isSignup ? "Learner Sign Up" : "Learner Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="btn-primary w-full">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className="text-blue-600 hover:underline"
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
                className="text-blue-600 hover:underline"
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
