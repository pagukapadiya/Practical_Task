import React from "react";

import { TNButton } from "./TNButton";
import "../../assets/scss/page/_notfound.scss";
import NointernetPage from "../../assets/images/no_interner.jpg";

export default function NoInternetPage() {
  /**
    This function will call on Try again button and will reload page
   */
  const handleClick = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="page-not-found">
        <img
          src={NointernetPage}
          alt="no-internet"
          className="not-found-image"
        />
        <h1 className="page-heading-center">Oops!</h1>
        <div className="error-page-text">
          NO INTERNET CONNECTION,PLEASE CHECK YOUR INTERNET{" "}
        </div>
        <div className="primary-button">
          <TNButton loading={false} type="button" onClick={handleClick}>
            Try Again
          </TNButton>
        </div>
      </div>
    </>
  );
}
