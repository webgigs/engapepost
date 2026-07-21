import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <section className="notfound-section">
    <div className="container notfound-inner">
      <p className="section-kicker">404</p>
      <h1>We could not find that page</h1>
      <p>
        The link may be out of date, or the page may have moved. Try one of these instead.
      </p>
      <div className="notfound-actions">
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link to="/gallery" className="btn btn-outline">
          Gallery
        </Link>
        <Link to="/contact-us" className="btn btn-outline">
          Contact us
        </Link>
      </div>
    </div>
  </section>
);

export default NotFound;
