import { FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t mt-12">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--primary-color)]">
            WitTrade
          </h2>
          <p className="text-gray-600 mt-3 text-sm leading-relaxed">
            A marketplace for minds — where startups and learners grow together
            through real-world projects, mentorship, and performance-driven learning.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-[var(--primary-color)]">Home</a></li>
            <li><a href="/startup-auth" className="hover:text-[var(--primary-color)]">Startups</a></li>
            <li><a href="/learner-auth" className="hover:text-[var(--primary-color)]">Learners</a></li>
            <li><a href="/about" className="hover:text-[var(--primary-color)]">About</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-md font-semibold text-gray-900 mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-[var(--primary-color)]">Blog</a></li>
            <li><a href="#" className="hover:text-[var(--primary-color)]">Docs</a></li>
            <li><a href="#" className="hover:text-[var(--primary-color)]">Community</a></li>
            <li><a href="#" className="hover:text-[var(--primary-color)]">Support</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-md font-semibold text-gray-900 mb-4">Follow Us</h3>
          <div className="flex gap-5 text-gray-600 text-2xl">
            <a href="#" className="hover:text-[var(--primary-color)]">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-[var(--primary-color)]">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-[var(--primary-color)]">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full bg-white border-t py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-[var(--primary-color)]">
          WitTrade
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
