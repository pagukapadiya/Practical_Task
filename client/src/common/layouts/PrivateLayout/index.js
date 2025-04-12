import { React, useState } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

import { Header } from "../../../common/layouts/Header/Header";
import { Sidebar } from "../../../common/layouts/Sidebar/Sidebar";

const LogoUrlFront = () => {
  return <img src={""} alt="logo" width={"100%"} className="nav-brand" />;
};

const PrivateLayout = (props) => {
  const [isActive, setActive] = useState(false);
  /**
   * This function will set active to InActive and vice versa
   */
  const toggleClass = () => {
    setActive(!isActive);
  };
  let bodyElement = document.getElementsByTagName("body")[0];
  bodyElement.className = isActive ? "overly bg-white" : "bg-white";

  return (
    <div {...props}>
      <Header toggleClass={toggleClass} />
      <div id="wrapper" className={isActive ? "toggled" : ""}>
        <Sidebar toggleClass={toggleClass} active={props.active} />
        <section id="content-wrapper" onClick={isActive ? toggleClass : null}>
          <Row>
            <Col lg={12}>{props.children}</Col>
          </Row>
        </section>
      </div>
    </div>
  );
};

PrivateLayout.propTypes = {
  children: PropTypes.any.isRequired,
  active: PropTypes.string,
};

export { PrivateLayout, LogoUrlFront };
