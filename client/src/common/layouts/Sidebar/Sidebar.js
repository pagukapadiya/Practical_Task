import { React } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
const Sidebar = (props) => {
  return (
    <>
      <aside id="sidebar-wrapper">
        <div className="sidebar mt-4">
          <nav className="navigation">
            <ul className="mainmenu">
              <li>
                <NavLink to="/dashboard" onClick={props.toggleClass}>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke="#4d8481"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="13.8333"
                        y="3"
                        width="7.16667"
                        height="7.16667"
                        rx="2"
                        stroke="#4d8481"
                        strokeWidth="2"
                      />
                      <rect
                        x="13.8333"
                        y="13.8333"
                        width="7.16667"
                        height="7.16667"
                        rx="2"
                        stroke="#4d8481"
                        strokeWidth="2"
                      />
                      <rect
                        x="3"
                        y="13.8333"
                        width="7.16667"
                        height="7.16667"
                        rx="2"
                        stroke="#4d8481"
                        strokeWidth="2"
                      />
                      <rect
                        x="3"
                        y="3"
                        width="7.16667"
                        height="7.16667"
                        rx="2"
                        stroke="#4d8481"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                  Dashboard
                </NavLink>
              </li>
              {/* Booking Menu */}
              <li>
                <NavLink to="/booking/add" onClick={props.toggleClass}>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4d8481"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 5H5V19H3V5ZM7 5H17V19H7V5ZM19 5H21V19H19V5ZM5 3H19V5H5V3ZM5 19H19V21H5V19Z"
                        stroke="#4d8481"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                  Booking
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};
Sidebar.propTypes = {
  toggleClass: PropTypes.any.isRequired,
};

export { Sidebar };
