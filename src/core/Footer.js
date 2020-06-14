import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container-fluid bg-dark text-white text-center py-2">
        <h5 className="text-muted">
          A <span className="text-white">MERN</span> Project by{" "}
          <span className="text-white">
            <a
              href="http://vivek-kamble.github.io/"
              style={{ textDecoration: "none" }}
            >
              Vivek Kamble
            </a>
          </span>
        </h5>
        <h5>If you got any questions, feel free to reach out!</h5>
      </div>
    </div>
  );
}
