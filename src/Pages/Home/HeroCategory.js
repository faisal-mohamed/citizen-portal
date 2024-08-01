import React, { useState } from "react";
import { Row, Col, Nav, Container } from "reactstrap";
import "./home-screen.scss";
import NavButton from "../../Components/NavButton_ui";
import { useDispatch } from "react-redux";
import { setFilterCategory } from "../../store/reducers/commonSlice";

const HeroCategory = () => {
  const categories = [
    "Contemporary",
    "Traditional",
    "Rustic",
    "Industrial",
    "Bohemian",
    "Scandinavian",
    "Art Deco",
    "Coastal",
    "Minimalist",
  ];

  const [nav, setNav] = useState("");

  const dispatch = useDispatch();

  const handleOnClick = (e) => {
    const categoryName = e.target.name;
    setNav(categoryName);
    dispatch(setFilterCategory(categoryName));
  };

  return (
    <React.Fragment>
      <Container fluid className="hero-section-nav">
        <Row className="justify-content-center">
          <Col>
            <div className="text-center" id="nav-items">
              <Nav
                pills
                className="nav-pills filter-btns justify-content-center"
                role="tablist"
              >
                {categories.map((name) => (
                  <NavButton
                    key={name}
                    text={name}
                    onClick={handleOnClick}
                    className={nav === name ? "nav-active" : ""}
                  />
                ))}
              </Nav>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default HeroCategory;
