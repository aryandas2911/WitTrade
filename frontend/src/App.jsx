import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Landingpage";
import LearnerAuth from "./pages/LearnerAuth";
import StartupAuth from "./pages/StartupAuth";
import About from "./pages/About";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learner-auth" element={<LearnerAuth />} />
          <Route path="/startup-auth" element={<StartupAuth />} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </Router>
      <Footer/>
    </>
  );
}

export default App;