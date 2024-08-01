import React from "react";
import "../css/component.style.scss";
import { Label } from "reactstrap";
import Button from "./button_ui";
import CustomSelect from "./CustomSelect";
import { timeFrameArray } from "../Utilities/constants";

const DropDownFilter = () => {
  return (
    <div className="filter-wrapper">
      <div className="filter-container">
        <div className="tags-search">
          <Label>Tags</Label>
          <CustomSelect options={[]} placeholder="Search by tags" />
        </div>
        <div className="time-search">
          <Label>Timeframe</Label>
          <CustomSelect
            options={timeFrameArray}
            placeholder="Select Timeframe"
          />
        </div>
        <div className="filter-search">
          <Button text="Reset"/>
          <Button text="Apply" className="primary" />
        </div>
      </div>
    </div>
  );
};

export default DropDownFilter;
