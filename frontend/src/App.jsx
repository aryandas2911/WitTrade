import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Landingpage";
import LearnerAuth from "./pages/LearnerAuth";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learner-auth" element={<LearnerAuth />} />
        </Routes>
      </Router>
      <Footer/>
    </>
  );
}

export default App;