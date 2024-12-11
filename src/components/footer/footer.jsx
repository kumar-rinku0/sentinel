import { Link } from "react-router";
import React from "react";
import "./footer.css";
import { FaDiscord, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="logo-text-container">
        <h3 className="footer-logo">Sentinel</h3>
        <p className="footer-text">
          be prime like sentinel prime!
          <span className="heart"> ❤</span>
        </p>
      </div>
      <div className="references">
        <Link prefetch={false} to="/">Terms and conditions</Link>
        <Link prefetch={false} to="/">Privacy policy</Link>
        <Link prefetch={false} to="/">Contect</Link>
        <Link prefetch={false} to="/">API docs</Link>
        <Link prefetch={false} to="/">Refund policy</Link>
      </div>
      <div className="social-copyright-container">
        <div className="copyright">Copyright © 2024 InferNo, All rights reserved.</div>
        <div>
          <div className="socials">
            <Link href={"/"} prefetch={false}>
              <FaGithub />
            </Link>
            <Link href={"/"} prefetch={false}>
              <FaDiscord />
            </Link>
            <Link href={"/"} prefetch={false}>
              <FaYoutube />
            </Link>
            <Link href={"/"} prefetch={false}>
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
