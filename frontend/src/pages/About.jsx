import { FaGraduationCap, FaBriefcase, FaGlobe, FaRocket } from "react-icons/fa";

function About() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[var(--background)] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            About <span className="text-[var(--primary-color)]">WitTrade</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            WitTrade is a marketplace for minds — where learners upskill by solving 
            real startup challenges, and startups gain innovative solutions while 
            mentoring future talent.
          </p>
        </section>

        {/* What We Do */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What We Do
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-lg transition">
              <FaGraduationCap className="mx-auto text-[var(--primary-color)] mb-4" size={40} />
              <h3 className="font-semibold text-lg text-[var(--primary-color)]">For Learners</h3>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                Gain hands-on experience, build your portfolio, and learn directly 
                from startup founders by working on real projects.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-lg transition">
              <FaBriefcase className="mx-auto text-[var(--primary-color)] mb-4" size={40} />
              <h3 className="font-semibold text-lg text-[var(--primary-color)]">For Startups</h3>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                Post projects, mentor learners, and discover potential hires by 
                tracking performance — not just resumes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-lg transition">
              <FaGlobe className="mx-auto text-[var(--primary-color)] mb-4" size={40} />
              <h3 className="font-semibold text-lg text-[var(--primary-color)]">For the Ecosystem</h3>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                Bridge the gap between education and industry by making practical 
                upskilling accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid gap-10 md:grid-cols-3 text-center">
            <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="w-14 h-14 mx-auto bg-blue-100 text-[var(--primary-color)] 
                              flex items-center justify-center rounded-full mb-4 font-bold text-xl">
                1
              </div>
              <h3 className="font-semibold text-lg">Post or Apply</h3>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                Startups post projects. Learners browse and apply for the ones that excite them.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="w-14 h-14 mx-auto bg-blue-100 text-[var(--primary-color)] 
                              flex items-center justify-center rounded-full mb-4 font-bold text-xl">
                2
              </div>
              <h3 className="font-semibold text-lg">Collaborate</h3>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                Learners work on real problems with guidance and mentorship from startup founders.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="w-14 h-14 mx-auto bg-blue-100 text-[var(--primary-color)] 
                              flex items-center justify-center rounded-full mb-4 font-bold text-xl">
                3
              </div>
              <h3 className="font-semibold text-lg">Grow</h3>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                Startups get solutions. Learners gain verified skills and career opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="text-center max-w-4xl mx-auto">
          <FaRocket className="mx-auto text-[var(--primary-color)] mb-6" size={48} />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            We believe practical experience is the key to growth. WitTrade is 
            built to empower learners with real skills while helping startups 
            innovate faster — creating a win-win ecosystem for the future.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
