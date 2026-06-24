import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import FeaturedTeams from "./components/FeaturedTeams";
import Working from "./components/Working";
import Footer from "./components/Footer";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar />
      <Hero />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <FeaturedTeams
        search={search}
      />

      <Working />
      <Footer />
    </>
  );
}

export default App;