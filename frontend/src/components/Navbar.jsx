function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={"Logo.png"} alt="WitTrade Logo" className="h-8 w-8" />
        <span className="text-xl font-bold text-blue-600">WitTrade</span>
      </div>

      <div className="flex gap-6">
        <a href="#" className="text-gray-700 hover:text-blue-600 transition">
          Home
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600 transition">
          Startup
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600 transition">
          Learner
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600 transition">
          Applications
        </a>
      </div>

      <button className="btn-primary hover:cursor-pointer">
        Get Started
      </button>
    </nav>
  );
}

export default Navbar;
