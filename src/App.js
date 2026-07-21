import "./App.css";
import "./MediaQueries.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ScrollToTop from "./Components/ScrollToTop";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Programme from "./Pages/Programme";
import Gallery from "./Pages/Gallery";
import Stories from "./Pages/Stories";
import Events from "./Pages/Events";
import GetInvolved from "./Pages/GetInvolved";
import Contact from "./Pages/Contact";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsConditions from "./Pages/TermsConditions";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />

          {/* All five programme pages are rendered from Data.js by slug. */}
          <Route path="/programmes/:slug" element={<Programme />} />
          <Route path="/programmes" element={<Navigate to="/programmes/education" replace />} />

          <Route path="/gallery" element={<Gallery />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/events" element={<Events />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
