function About() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            About <span className="text-blue-600">WitTrade</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            WitTrade is a marketplace for minds — where learners upskill by
            solving real startup challenges, and startups get innovative
            solutions while mentoring future talent.
          </p>
        </section>

        {/* What We Do */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            What We Do
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-semibold text-lg text-blue-600">
                For Learners
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                Gain hands-on experience, build your portfolio, and learn
                directly from startup founders by working on real projects.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-semibold text-lg text-blue-600">
                For Startups
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                Post projects, mentor learners, and discover potential hires by
                tracking performance — not just resumes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="font-semibold text-lg text-blue-600">
                For the Ecosystem
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                Bridge the gap between education and industry by making
                practical upskilling accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div className="p-6">
              <div className="w-12 h-12 mx-auto bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mb-4 font-bold">
                1
              </div>
              <h3 className="font-semibold text-lg">Post or Apply</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Startups post projects. Learners browse and apply for the ones
                that excite them.
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 mx-auto bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mb-4 font-bold">
                2
              </div>
              <h3 className="font-semibold text-lg">Collaborate</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Learners work on real problems with guidance and mentorship from
                startup founders.
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 mx-auto bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mb-4 font-bold">
                3
              </div>
              <h3 className="font-semibold text-lg">Grow</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Startups get solutions. Learners gain verified skills and career
                opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Vision / Closing */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-600">
            We believe practical experience is the key to growth. WitTrade is
            built to empower learners with real skills while helping startups
            innovate faster — creating a win-win ecosystem.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
