function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-xl font-bold text-blue-600">WitTrade</h2>
          <p className="text-gray-600 mt-2 text-sm">
            A marketplace for minds — where startups and learners grow together
            through real-world projects, mentorship, and performance-driven learning.
          </p>
        </div>

        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><a href="/startup-auth" className="hover:text-blue-600">Startups</a></li>
            <li><a href="/learner-auth" className="hover:text-blue-600">Learners</a></li>
            <li><a href="#" className="hover:text-blue-600">Applications</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-3">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-blue-600">Blog</a></li>
            <li><a href="#" className="hover:text-blue-600">Docs</a></li>
            <li><a href="#" className="hover:text-blue-600">Community</a></li>
            <li><a href="#" className="hover:text-blue-600">Support</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-3">Follow Us</h3>
          <div className="flex gap-4 text-gray-600 text-xl">
            <a href="#" className="hover:text-blue-600">🐦</a>
            <a href="#" className="hover:text-blue-600">🔗</a>
            <a href="#" className="hover:text-blue-600">💻</a>
          </div>
        </div>
      </div>

      <div className="w-full bg-white border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} WitTrade. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
