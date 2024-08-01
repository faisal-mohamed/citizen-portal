import React, { memo } from "react";
import { Row, Col, Label, Form, Input } from "reactstrap";

const UpdateForm = ({ formData, handleFormChange }) => {
  const {
    firstName,
    lastName,
    jobTitle,
    website,
    city,
    country,
    bio,
    experience,
    contactNumber,
    company
  } = formData;
  return (
    <React.Fragment>
      <Form>
        <Row>
          <Col lg={4}>
            <div className="mb-3">
              <Label htmlFor="firstnameInput" className="form-label">
                First Name
              </Label>
              <Input
                type="text"
                name="firstName"
                className="form-control"
                id="firstnameInput"
                value={firstName}
                placeholder="Enter your firstname"
                onChange={handleFormChange}
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Label htmlFor="lastnameInput" className="form-label">
                Last Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="lastnameInput"
                name="lastName"
                value={lastName}
                placeholder="Enter your lastname"
                onChange={handleFormChange}
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Label htmlFor="contactInput" className="form-label">
              Contact Number (Singapore):
              </Label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                className="form-control"
                id="contactInput"
                name="contactNumber"
                value={contactNumber}
                onChange={handleFormChange}
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Label htmlFor="companyInput" className="form-label">
                Company
              </Label>
              <Input
                type="text"
                className="form-control"
                name="company"
                value={company}
                id="companyInput"
                placeholder="Enter company name"
                onChange={handleFormChange}
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Label htmlFor="designationInput" className="form-label">
                Current Job Title
              </Label>
              <Input
                type="text"
                className="form-control"
                name="jobTitle"
                value={jobTitle}
                id="designationInput"
                placeholder="Enter Job Title"
                onChange={handleFormChange}
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Label htmlFor="websiteInput1" className="form-label">
                Website
              </Label>
              <Input
                type="text"
                className="form-control"
                name="website"
                id="websiteInput1"
                value={website}
                placeholder="www.example.com"
                onChange={handleFormChange}
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Label htmlFor="cityInput" className="form-label">
                City
              </Label>
              <Input
                type="text"
                className="form-control"
                name="city"
                id="cityInput"
                value={city}
                disabled={true}
                placeholder="City"
                onChange={handleFormChange}
              />
            </div>
          </Col>

          <Col lg={4}>
            <div className="mb-3">
              <Label htmlFor="countryInput" className="form-label">
                Country
              </Label>
              <Input
                type="text"
                className="form-control"
                id="countryInput"
                name="country"
                value={country}
                disabled={true}
                placeholder="Enter Country"
                onChange={handleFormChange}
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Label htmlFor="experienceInput" className="form-label">
                Experience
              </Label>
              <Input
                type="number"
                className="form-control"
                id="experienceInput"
                name="experience"
                maxLength="2"
                value={experience}
                placeholder="Enter no of year experience"
                onChange={handleFormChange}
              />
            </div>
          </Col>
          <Col lg={12}>
            <div className="mb-3 pb-2">
              <Label
                htmlFor="exampleFormControlTextarea"
                className="form-label"
              >
                Bio
              </Label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea"
                name="bio"
                value={bio}
                onChange={handleFormChange}
                rows="3"
              ></textarea>
            </div>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default memo(UpdateForm);
