import { Link } from "react-router-dom";
import Landingpage_picture from "../assets/images/Landingpage_picture.jpg";
import {
  FaRocket,
  FaBrain,
  FaChartLine,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            A <span className="text-blue-600">Marketplace for Minds</span> <br />
            Where Startups & Learners <br className="hidden md:block" />
            <span className="text-blue-600">Grow Together</span>
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            WitTrade connects startups and learners through{" "}
            <span className="font-semibold text-gray-800">real projects</span>,{" "}
            <span className="font-semibold text-gray-800">mentorship</span>, and{" "}
            <span className="font-semibold text-gray-800">
              performance-based growth
            </span>.
          </p>

          <div className="mt-6 flex gap-4">
            <Link to="/startup-auth">
              <button className="btn-primary cursor-pointer hover:scale-105 transition">
                I’m a Startup
              </button>
            </Link>
            <Link to="/learner-auth">
              <button className="btn-secondary cursor-pointer hover:scale-105 transition">
                I’m a Learner
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center animate-fadeIn">
          <img
            src={Landingpage_picture}
            alt="WitTrade Illustration"
            className="rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer"
          />
        </div>
      </section>

      {/* Why WitTrade */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why WitTrade?</h2>
          <p className="text-gray-600 mt-2">
            Bridging the gap between startups and learners with unique features.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="card cursor-pointer hover:shadow-lg transition">
              <FaUsers className="text-blue-600 text-3xl mb-3 mx-auto" />
              <h3 className="font-semibold text-lg text-blue-600">
                Startup Dashboard
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Startups can post projects, track learners, and mentor
                effectively.
              </p>
            </div>

            <div className="card cursor-pointer hover:shadow-lg transition">
              <FaBrain className="text-blue-600 text-3xl mb-3 mx-auto" />
              <h3 className="font-semibold text-lg text-blue-600">
                Skill Based Matching
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Learners are matched with projects that fit their skills & goals.
              </p>
            </div>

            <div className="card cursor-pointer hover:shadow-lg transition">
              <FaChartLine className="text-blue-600 text-3xl mb-3 mx-auto" />
              <h3 className="font-semibold text-lg text-blue-600">
                Performance to Placement
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Track real progress and hire learners based on verified
                performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="card cursor-pointer hover:shadow-md transition">
              <FaRocket className="text-blue-600 text-3xl mb-3 mx-auto" />
              <h3 className="font-semibold text-lg text-blue-600">1. Post</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Startups post projects with real-world requirements.
              </p>
            </div>
            <div className="card cursor-pointer hover:shadow-md transition">
              <FaUsers className="text-blue-600 text-3xl mb-3 mx-auto" />
              <h3 className="font-semibold text-lg text-blue-600">2. Learn</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Learners apply, work on tasks, and get mentorship.
              </p>
            </div>
            <div className="card cursor-pointer hover:shadow-md transition">
              <FaCheckCircle className="text-blue-600 text-3xl mb-3 mx-auto" />
              <h3 className="font-semibold text-lg text-blue-600">3. Grow</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Verified performance helps learners land real opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">What People Say</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="card cursor-pointer hover:shadow-lg transition">
              <p className="text-gray-600 italic">
                “WitTrade gave our startup access to eager learners who delivered
                real results while we mentored them. A win-win!”
              </p>
              <p className="mt-4 font-semibold text-gray-800">
                — Anika, Startup Founder
              </p>
            </div>
            <div className="card cursor-pointer hover:shadow-lg transition">
              <p className="text-gray-600 italic">
                “Instead of just another internship, I got to work on live
                projects that actually mattered — and it boosted my confidence.”
              </p>
              <p className="mt-4 font-semibold text-gray-800">
                — Rohit, Learner
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mt-2">
          Join WitTrade today and unlock growth for both startups and learners.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to="/startup-auth">
            <button className="btn-secondary cursor-pointer hover:scale-105 transition">
              Post a Project
            </button>
          </Link>
          <Link to="/learner-auth">
            <button className="btn-primary cursor-pointer hover:scale-105 transition">
              Join as Learner
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
