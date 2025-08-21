import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Freetrial from "./components/Freetrial/Freetrial";
import Footer from "./layout/Footer";
import Support from "./pages/Support/Support";
import Film from "./pages/Film/Film";
import Subscrib from "./pages/Subscrib/Subscrib";
import Movies from "./pages/Movies/Movies";
import Scroll from "./components/Scroll/Scroll";
import Actor from "./pages/Actor/Actor";
import Login from "./pages/Login/Login";
import Search from "./pages/Search/Search";
import Tv from "./pages/Tv/Tv";
import NotFound from "./pages/NotFound/NotFound";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/support" element={<Support />} />
          <Route path="/subscriptions" element={<Subscrib />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/actor/:id" element={<Actor />} />
          <Route path="/tv/:id" element={<Tv />} />
          <Route path="/film/:id" element={<Film />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Freetrial />
        <Footer />
        <Scroll />
      </BrowserRouter>
    </>
  );
}

export default App;
