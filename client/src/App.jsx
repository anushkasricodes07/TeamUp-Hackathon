import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import FeaturedTeams from "./components/FeaturedTeams";
import Working from "./components/Working";
import Footer from "./components/Footer";

import CreateTeam from "./pages/CreateTeam";

function App() {
  const [search, setSearch] = useState("");

  return (
  <>
    <Navbar />

    <Routes>
      <Route
        path="/"
        element={
          <>
            <Hero />

            <SearchBar
              search={search}
              setSearch={setSearch}
            />

            <FeaturedTeams search={search} />

            <Working />
            <Footer />
          </>
        }
      />

      <Route
        path="/create-team"
        element={<CreateTeam />}
      />
    </Routes>
  </>
); 
}

export default App;