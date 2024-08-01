import React from "react";
import { Button, NavItem, NavLink } from "reactstrap";
import "../css/component.style.scss"

const NavButton = ({ text, className,onClick }) => {
  return (
    <NavItem role="presentation">
      <NavLink
        type="button"
        name={text}
        // onClick={() => setNav("All")}
        className={`hero-link ${className}` }
        onClick={onClick}
      >
       {text}
      </NavLink>
    </NavItem>
  );
};

export default NavButton;
