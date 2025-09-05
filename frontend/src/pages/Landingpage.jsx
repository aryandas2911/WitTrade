import { Link } from "react-router-dom";
import Landingpage_picture from "../assets/images/Landingpage_picture.jpg";

function Home() {
  return (
    <div className="bg-gray-50">
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            A Marketplace for Minds <br />
            <span className="text-blue-600">
              Where Startups and Learners Grow Together
            </span>
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            WitTrade connects startups and learners through real projects,
            mentorship, and performance-based growth. Not internships — but
            practical upskilling that leads to opportunities.
          </p>

          <div className="mt-6 flex gap-4">
            <Link to="/startup-auth">
              <button className="btn-primary hover:cursor-pointer">
                I’m a Startup
              </button>
            </Link>
            <Link to="/learner-auth">
              <button className="btn-secondary hover:cursor-pointer">
                I’m a Learner
              </button>
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src={Landingpage_picture}
            alt="WitTrade Illustration"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Why WitTrade?</h2>
          <p className="text-gray-600 mt-2">
            Bridging the gap between startups and learners with unique features.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="card">
              <h3 className="font-semibold text-lg text-blue-600">
                Startup Dashboard
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Startups can post projects, track learners, and mentor
                effectively.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-lg text-blue-600">
                AI Matching
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Learners are matched with projects that fit their skills & goals.
              </p>
            </div>

            <div className="card">
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

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="card">
              <h3 className="font-semibold text-lg text-blue-600">1. Post</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Startups post projects with real-world requirements.
              </p>
            </div>
            <div className="card">
              <h3 className="font-semibold text-lg text-blue-600">2. Learn</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Learners apply, work on tasks, and get mentorship.
              </p>
            </div>
            <div className="card">
              <h3 className="font-semibold text-lg text-blue-600">3. Grow</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Verified performance helps learners land real opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">What People Say</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="card">
              <p className="text-gray-600 italic">
                “WitTrade gave our startup access to eager learners who delivered
                real results while we mentored them. A win-win!”
              </p>
              <p className="mt-4 font-semibold text-gray-800">
                — Anika, Startup Founder
              </p>
            </div>
            <div className="card">
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

      <section className="bg-blue-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mt-2">
          Join WitTrade today and unlock growth for both startups and learners.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button className="btn-secondary">Post a Project</button>
          <Link to="/learner-auth">
            <button className="btn-primary">Join as Learner</button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
