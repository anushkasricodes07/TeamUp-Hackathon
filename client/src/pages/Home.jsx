import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateTeam from "./pages/CreateTeam";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-team" element={<CreateTeam />} />
      </Routes>
    </>
  );
}

export default App;