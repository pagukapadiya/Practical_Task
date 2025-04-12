import React from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { TNButton } from "./TNButton";
import "../../assets/scss/page/_notfound.scss";
import Errorpage from "../../assets/images/page_not_found.jpg";

const PageNotFound = (props) => {
  const navigate = useNavigate();

  /**
    This function will call on go to home button and will redirect user to dashboard 
   */
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <Container>
        <div className="page-not-found">
          <img src={Errorpage} alt="404" className="not-found-image" />
          <h1 className="page-heading-center">Oops! Page not found</h1>
          <div className="error-page-text">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </div>
          <div className="primary-button">
            <TNButton onClick={handleClick} loading={false}>
              Back To Home
            </TNButton>
          </div>
        </div>
      </Container>
    </>
  );
};

PageNotFound.propTypes = {
  from: PropTypes.string,
};

export default PageNotFound;
