import { lazy, Suspense } from "react";
import "./App.css";
import "./MediaQueries.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ScrollToTop from "./Components/ScrollToTop";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import RouteFallback from "./Components/RouteFallback";

import Home from "./Pages/Home";

/**
 * Routes are split into their own chunks, so a visitor downloads the page they
 * asked for rather than all eleven.
 *
 * Home is imported eagerly and the rest lazily, on purpose. A lazy chunk cannot
 * even be requested until the main bundle has downloaded and parsed, so making
 * the most common landing page lazy would add a second round trip to the
 * critical path — the one place we can least afford one.
 *
 * There is no `webpackPrefetch` here, and that is deliberate too. Much of this
 * site's audience is on metered mobile data, where speculatively downloading
 * ten pages somebody may never open spends their money, not ours. The chunks
 * are small and arrive over an already-warm connection when a link is followed.
 */
const About = lazy(() => import("./Pages/About"));
const Programme = lazy(() => import("./Pages/Programme"));
const Gallery = lazy(() => import("./Pages/Gallery"));
const Stories = lazy(() => import("./Pages/Stories"));
const Events = lazy(() => import("./Pages/Events"));
const GetInvolved = lazy(() => import("./Pages/GetInvolved"));
const Contact = lazy(() => import("./Pages/Contact"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./Pages/TermsConditions"));
const NotFound = lazy(() => import("./Pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main id="main">
        {/* Header and Footer sit outside the boundary, so only the page area is
            replaced while a chunk loads. */}
        <Suspense fallback={<RouteFallback />}>
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
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
