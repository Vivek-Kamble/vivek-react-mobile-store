import React from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import "../styles.css";

const Base = ({
  title = "My Title",
  // description = "My desription",
  className = "text-dark p-2",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid pt-5">
      <div className="text-dark text-center">
        <h6 className="title display-4 text-primary">{title}</h6>
        {/* <p className="lead">{description}</p> */}
      </div>
      <div className={className}>{children}</div>
    </div>
    <Footer />
  </div>
);

export default Base;
