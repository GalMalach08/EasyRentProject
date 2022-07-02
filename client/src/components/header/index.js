import React from "react";
// React router dom
import { NavLink } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// Bootstrap
import { Nav, Navbar } from "react-bootstrap";
// React-typewriter-effect
import TypeWriterEffect from "react-typewriter-effect";
// Css
import "./style.css";

const TopNavBar = () => {
  const auth = useSelector((state) => state.users.auth);
  const isAdmin = useSelector((state) => state.users.data.isAdmin);
  const user = useSelector((state) => state.users.data);

  const myRef = document.querySelector(".scrollable-div");

  return (
    <>
      {/* Top navbar */}
      <div className="preview__header">
        <div className="preview__envato-logo">
          <span style={{ color: "#F1A32B" }}>Easy</span>
          <span style={{ color: "#3882A6" }}>Rent</span>
        </div>
      </div>

      <div className="header_section">
        <Navbar expand="lg" className="navbar">
          <NavLink to="/5">
            <Navbar.Brand className="nav_brand">
              {" "}
              <span style={{ color: "#F1A32B" }}>Easy</span>
              <span style={{ color: "#3882A6" }}>Rent</span>
            </Navbar.Brand>
          </NavLink>
          {auth && (
            <>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="mr-auto my-2 my-lg-0"
                  navbarScroll
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                >
                  <NavLink
                    to="/5"
                    className="nav_link"
                    activeclassname="selected"
                  >
                    סאבלט
                  </NavLink>
                  <NavLink
                    to="/15"
                    className="nav_link"
                    activeclassname="selected"
                  >
                    השכרה
                  </NavLink>
                  <NavLink
                    to="/upload"
                    className="nav_link"
                    activeclassname="selected"
                  >
                    העלאת נכס
                  </NavLink>
                  {auth && (
                    <NavLink
                      to={`/myassets/${user._id}`}
                      className="nav_link"
                      activeclassname="selected"
                    >
                      הנכסים שלי
                    </NavLink>
                  )}
                  {isAdmin && (
                    <NavLink
                      to={`/assets/notapproved`}
                      className="nav_link"
                      activeclassname="selected"
                    >
                      נכסים שלא אושרו
                    </NavLink>
                  )}
                  <NavLink
                    to={`/qanda`}
                    className="nav_link"
                    activeclassname="selected"
                  >
                    שאלות ותשובות
                  </NavLink>
                  <NavLink
                    to={`${auth ? "/logout" : "/signin"}`}
                    className="nav_link"
                    activeclassname="selected"
                  >
                    {`${auth ? "התנתק" : "התחבר"}`}
                  </NavLink>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Navbar>

        <div className="auto_typing_div">
          <TypeWriterEffect
            textStyle={{
              fontFamily: "Poppins, sans-serif",
              color: "white",
              fontSize: "20px",
              letterSpacing: "2px",
            }}
            startDelay={100}
            cursorColor="white"
            typeSpeed={100}
            scrollArea={myRef}
            multiText={[
              "שלום לכם, ברוכים הבאים לEasyRent - הדרך למצוא את הדירה הבאה שלכם בתל אביב🥳",
              "באתר תוכלו למצוא מאות דירות להשכרה ולמטרת סאבלט, השתמשו בחיפוש המסוננן שלנו על מנת לראות רק את הדירות הרלוונטיות אליכם",
              "אנו מזמינים אותכם להרשם לאתר על מנת להשאר מעודכנים ולהיות הראשונים שמקבלים את העדכונים לגבי הדירות הכי חמות",
              "בעל/ת דירה ? הרשם והעלה את הדירה שלך לאתר וכך תוכל להשכיר את דירתך בקלות וביעילות!",
              "תהנו😎",
            ]}
            multiTextDelay={1000}
          />
        </div>
      </div>
    </>
  );
};

export default TopNavBar;
