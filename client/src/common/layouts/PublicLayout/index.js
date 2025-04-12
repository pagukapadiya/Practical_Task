import { useEffect } from "react";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Footer } from "../../../common/layouts/Footer/Footer";
import "../../../assets/scss/_custom.scss";
const LogoUrl = () => {
  return (
    <LazyLoadImage
      key={""}
      alt="logo"
      // width={'100%'}
      className="nav-brand"
    />
  );
};
const PublicLayout = (props) => {
  // Adding class in body
  useEffect(() => {
    document.body.classList.add("bg-box");
  }, []);
  return (
    <div {...props} className="auth-pages">
      {props.children}
      <Footer />
    </div>
  );
};

PublicLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export { PublicLayout, LogoUrl };
