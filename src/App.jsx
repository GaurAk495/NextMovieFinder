import Home from "@/pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import Navbar from "./components/Navbar";
import TV from "./pages/TV";
import TvShowPage from "./pages/TvShowPage";
import CastIndividualPage from "./components/CastIndividualPage/CastIndividualPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/tv/:id" element={<TvShowPage />} />
        <Route path="/people/:id" element={<CastIndividualPage />} />
      </Routes>
    </>
  );
}

export default App;
