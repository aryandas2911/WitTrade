import { FaHome, FaUsers, FaGraduationCap, FaInfoCircle, FaRocket } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 hover:opacity-90 transition">
        <img src="Logo.png" alt="WitTrade Logo" className="h-8 w-8" />
        <span className="text-xl font-extrabold text-[var(--primary-color)]">
          WitTrade
        </span>
      </a>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        <a
          href="/"
          className="flex items-center gap-2 text-gray-700 hover:text-[var(--primary-color)] transition"
        >
          <FaHome size={16} /> Home
        </a>
        <a
          href="/startup-auth"
          className="flex items-center gap-2 text-gray-700 hover:text-[var(--primary-color)] transition"
        >
          <FaUsers size={16} /> Startup
        </a>
        <a
          href="/learner-auth"
          className="flex items-center gap-2 text-gray-700 hover:text-[var(--primary-color)] transition"
        >
          <FaGraduationCap size={16} /> Learner
        </a>
        <a
          href="/about"
          className="flex items-center gap-2 text-gray-700 hover:text-[var(--primary-color)] transition"
        >
          <FaInfoCircle size={16} /> About
        </a>
      </div>

      {/* CTA Button */}
      <a
        href="/explore"
        className="flex items-center gap-2 btn-primary hover:cursor-pointer"
      >
        <FaRocket size={16} /> Explore Projects
      </a>
    </nav>
  );
}

export default Navbar;
