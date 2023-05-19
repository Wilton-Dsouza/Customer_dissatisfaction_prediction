import React, { useState } from "react";
import { If, Then, Else, ElseIf } from "react-if-elseif-else-render";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import GaugeChart from "react-gauge-chart";
import ChurnNavbar from "./ChurnNavbar";
import Alert from "react-bootstrap/Alert";

function ModelPage() {
  const [filemessage, finalfilemessage] = useState({});
  fetch("http://127.0.0.1:8000/get_model", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (!response.ok) {
        }
        return response.json();
      },
      (err) => {
        finalfilemessage("Django Server is not enabled or its down!!");
      }
    )
    .then((data) => {
      if (data.message === "File does not exist") {
        finalfilemessage("SubmitDisable");
      }
      if (data.message === "File exists") {
        finalfilemessage("SubmitEnable");
      }
    });
  const [finaluserResponse, finalsetuserResponse] = useState({});
  let userResponse = {};
  let screenDisplayResponse = {};
  const [finalscreenDisplayResponse, setfinalscreenDisplayResponse] = useState(
    {}
  );
  const [hostmodelstatus, sethostmodelstatus] = useState({});
  function handleDropdownChange(event) {
    var value2 = event.target.value;
    var name = event.target.name;
    const value1 = parseInt(event.target.value);
    userResponse[name] = value1;
    if (name === "country") {
      name = "Country";
      if (value1 === 0) {
        value2 = "Germany";
      } else if (value1 === 1) {
        value2 = "France";
      } else {
        value2 = "Spain";
      }
      screenDisplayResponse[name] = value2;
    }
    if (name === "tenure") {
      name = "Tenure";
      screenDisplayResponse[name] = value1;
    }
    if (name === "Product1") {
      name = "Product 1";
      if (value1 === 0) {
        value2 = "No";
      } else {
        value2 = "Yes";
      }
      screenDisplayResponse[name] = value2;
    }
    if (name === "Product2") {
      name = "Product 2";
      if (value1 === 0) {
        value2 = "No";
      } else {
        value2 = "Yes";
      }
      screenDisplayResponse[name] = value2;
    }
    if (name === "Product3") {
      name = "Product 3";
      if (value1 === 0) {
        value2 = "No";
      } else {
        value2 = "Yes";
      }
      screenDisplayResponse[name] = value2;
    }
    if (name === "active_member") {
      name = "Active Member";
      if (value1 === 0) {
        value2 = "No";
      } else {
        value2 = "Yes";
      }
      screenDisplayResponse[name] = value2;
    }
    if (name === "Customer feedback Ratings") {
      name = "Feedback";
      screenDisplayResponse[name] = value1;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:8000/host_model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userResponse),
    })
      .then((response) => {
        if (!response.ok) {
          sethostmodelstatus("Model not hosted");
        }
        return response.json();
      })
      .then((data) => {
        finalsetuserResponse(data);
        finaluserResponse.probability = parseFloat(
          finaluserResponse.probability
        );
      });
    const form = event.target;
    setfinalscreenDisplayResponse(screenDisplayResponse);
    form.reset();
  };

  return (
    <div>
      <ChurnNavbar />
      <div>
        <br></br>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              backgroundColor: "#ADD8E6",
              borderRadius: "10px",
              marginBottom: "30px",
              overflow: "hidden",
            }}
            className="container"
          >
            <div className="row">
              <div
                style={{ textAlign: "center", marginTop: "15px" }}
                className="col"
              >
                <h3>Please fill all required Details</h3>
              </div>
            </div>
            <div
              style={{ marginTop: "20px", marginLeft: "20vh" }}
              className="row"
            >
              <div className="col">
                <div>
                  <p style={{ marginLeft: "10px" }}>Select Country</p>
                  <select
                    name="country"
                    defaultValue={""}
                    onChange={handleDropdownChange}
                    style={{
                      borderRadius: "999px",
                      height: "7vh",
                      width: "25vh",
                      padding: "0 10px",
                    }}
                    required
                  >
                    <option value="" disabled>
                      Country
                    </option>
                    <option value="0">Germany</option>
                    <option value="1">France</option>
                    <option value="2">Spain</option>
                  </select>
                </div>
              </div>
              <div className="col">
                <div>
                  <p style={{ marginLeft: "10px" }}>Enter Customer Tenure</p>
                  <input
                    name="tenure"
                    onChange={handleDropdownChange}
                    type="text"
                    placeholder="Enter Tenure years"
                    style={{
                      borderRadius: "999px",
                      height: "7vh",
                      width: "25vh",
                      padding: "0 10px",
                    }}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div>
                  <p style={{ marginLeft: "10px" }}>
                    Does the Customer use Product 1
                  </p>
                  <select
                    defaultValue={""}
                    required
                    name="Product1"
                    onChange={handleDropdownChange}
                    style={{
                      borderRadius: "999px",
                      height: "7vh",
                      width: "25vh",
                      padding: "0 10px",
                    }}
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "50px",
                marginLeft: "20vh",
                marginBottom: "10px",
              }}
              className="row"
            >
              <div className="col">
                <div style={{ marginBottom: "30px" }}>
                  <p style={{ marginLeft: "10px" }}>
                    Does the Customer use Product 2
                  </p>
                  <select
                    defaultValue={""}
                    required
                    name="Product2"
                    onChange={handleDropdownChange}
                    style={{
                      borderRadius: "999px",
                      height: "7vh",
                      width: "25vh",
                      padding: "0 10px",
                    }}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>
              <div className="col">
                <div style={{ marginBottom: "30px" }}>
                  <p style={{ marginLeft: "10px" }}>
                    Does the Customer use Product 3
                  </p>
                  <select
                    defaultValue={""}
                    required
                    name="Product3"
                    onChange={handleDropdownChange}
                    style={{
                      borderRadius: "999px",
                      height: "7vh",
                      width: "25vh",
                      padding: "0 10px",
                    }}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>
              <div className="col">
                <div style={{ marginBottom: "30px" }}>
                  <p style={{ marginLeft: "10px" }}>
                    Is the Customer an Active Member
                  </p>
                  <select
                    defaultValue={""}
                    required
                    name="active_member"
                    onChange={handleDropdownChange}
                    style={{
                      borderRadius: "999px",
                      height: "7vh",
                      width: "25vh",
                      padding: "0 10px",
                    }}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "10px",
                marginLeft: "20vh",
                marginBottom: "10px",
              }}
              className="row"
            >
              <div className="col">
                <div style={{ marginBottom: "30px" }}></div>
              </div>
              <div className="col">
                <div style={{ marginBottom: "30px" }}>
                  <p style={{ marginLeft: "10px" }}>
                    Select Customer Feedback between 1 to 5
                  </p>
                  <select
                    defaultValue={""}
                    required
                    name="Customer feedback Ratings"
                    onChange={handleDropdownChange}
                    style={{
                      borderRadius: "999px",
                      height: "7vh",
                      width: "25vh",
                      padding: "0 10px",
                    }}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              <div className="col">
                <div style={{ marginBottom: "30px" }}></div>
              </div>
            </div>
            <div
              style={{ marginLeft: "50px", marginRight: "50px" }}
              className="col"
            >
              <If condition={filemessage === "SubmitDisable"}>
                <Then>
                  <Button
                    className="w-100"
                    variant="secondary"
                    size="lg"
                    type="submit"
                    block="false"
                    disabled="true"
                  >
                    Predict Customer Insights
                  </Button>
                </Then>
                <ElseIf
                  condition={
                    filemessage === "Django Server is not enabled or its down!!"
                  }
                >
                  <Button
                    className="w-100"
                    variant="secondary"
                    size="lg"
                    type="submit"
                    block="false"
                    disabled="true"
                  >
                    Predict Customer Insights
                  </Button>
                </ElseIf>
                <Else>
                  <Button
                    className="w-100"
                    variant="secondary"
                    size="lg"
                    type="submit"
                    block="false"
                  >
                    Predict Customer Insights
                  </Button>
                </Else>
              </If>
              <br></br>
              <br></br>
            </div>
            <br></br>
            <br></br>
            <div
              style={{
                backgroundColor: "#008ECC",
                borderRadius: "10px",
                marginBottom: "30px",
                overflow: "hidden",
              }}
              className="container"
            >
              <div style={{ marginTop: "30px" }}>
                <div className="row">
                  <div className="col-md-4" style={{ marginLeft: "12px" }}>
                    <If condition={finaluserResponse.probability}>
                      <Then>
                        <GaugeChart
                          id="gauge-chart5"
                          textColor="#00000"
                          needleColor="#808080"
                          percent={finaluserResponse.probability}
                        />
                      </Then>
                      <Else>
                        <GaugeChart id="gauge-chart5" percent={0.0} />
                      </Else>
                    </If>
                    <If condition={finaluserResponse.prediction}>
                      <Then>
                        <If condition={finaluserResponse.prediction === "1"}>
                          <Then>
                            <div className="row">
                              <Alert key="danger" variant="danger">
                                Customer is <b>"likely to churn"</b> out of the
                                company
                              </Alert>
                            </div>
                          </Then>
                        </If>
                        <If condition={finaluserResponse.prediction === "0"}>
                          <Then>
                            <div className="row">
                              <Alert key="success" variant="success">
                                Customer is <b>"not likely to churn"</b> out of
                                the company
                              </Alert>
                            </div>
                          </Then>
                        </If>
                      </Then>
                    </If>
                  </div>
                  <If condition={filemessage === "SubmitDisable"}>
                    <Then>
                      <div className="col-md-8">
                        <Alert key="danger" variant="danger">
                          Model is not created by the Administrator. Please
                          contact the Admin Team.
                        </Alert>
                      </div>
                    </Then>
                    <ElseIf
                      condition={
                        filemessage ===
                        "Django Server is not enabled or its down!!"
                      }
                    >
                      <div className="col-md-8">
                        <Alert key="danger" variant="danger">
                          Django Server is not enabled or its down!! Please
                          contact the Admin Team.
                        </Alert>
                      </div>
                    </ElseIf>
                    <ElseIf condition={hostmodelstatus === "Model not hosted"}>
                      <div className="col-md-8">
                        <Alert key="danger" variant="danger">
                          Something went Wrong. It seems that Model is not
                          Hosted.Please Contact the Admin Team and{" "}
                          <b>Refresh</b> the screen
                        </Alert>
                      </div>
                    </ElseIf>
                    <ElseIf condition={finaluserResponse.prediction}>
                      <div className="col-md-7" style={{ marginLeft: "80px" }}>
                        <h4>Entered Details:</h4>
                        <hr style={{height:"5px", backgroundColor:"black"}}/>
                        <If condition={finaluserResponse.prediction === "1"}>
                          <Then>
                            <div className="row">
                              {Object.entries(finalscreenDisplayResponse).map(
                                ([key, value]) => (
                                  <div key={key}>
                                    {/* <span>{key}:</span>{" "} */}
                                    <If condition={key === "Country"}>
                                      <Then>
                                        <span style={{color:"white"}}>
                                          1. Which Country is the Customer from:
                                        </span>{" "}
                                      </Then>
                                    </If>
                                    <If condition={key === "Tenure"}>
                                      <Then>
                                      <span style={{color:"white"}}>
                                          2. How many years has the Customer
                                          been with us:
                                        </span>{" "}
                                      </Then>
                                    </If>
                                    <If condition={key === "Product 1"}>
                                      <Then>
                                      <span style={{color:"white"}}>
                                          3. Is the Customer using Product 1:
                                        </span>{" "}
                                      </Then>
                                    </If>
                                    <If condition={key === "Product 2"}>
                                      <Then>
                                      <span style={{color:"white"}}>
                                          4. Is the Customer using Product 2:
                                        </span>{" "}
                                      </Then>
                                    </If>
                                    <If condition={key === "Product 3"}>
                                      <Then>
                                      <span style={{color:"white"}}>
                                          5. Is the Customer using Product 2:
                                        </span>{" "}
                                      </Then>
                                    </If>
                                    <If condition={key === "Active Member"}>
                                      <Then>
                                      <span style={{color:"white"}}>
                                          6. Is the Customer an Active Member:
                                        </span>{" "}
                                      </Then>
                                    </If>
                                    <If condition={key === "Feedback"}>
                                      <Then>
                                      <span style={{color:"white"}}>
                                          7. What is the Rating provided by the
                                          Customer:
                                        </span>{" "}
                                      </Then>
                                    </If>
                                    <b>
                                      <span>{value}</span>
                                    </b>
                                  </div>
                                )
                              )}
                            </div>
                            {/* <div className="row">
                              <h4>Few Reasons to think about:</h4>
                              <If
                                condition={
                                  finaluserResponse.probability <= 0.35
                                }
                              >
                                <Then>
                                  <ul>
                                    <li style={{ color: "yellow" }}>
                                      Poor Customer Experience
                                    </li>
                                    <li style={{ color: "yellow" }}>
                                      Lack of Personalization
                                    </li>
                                    <li style={{ color: "green" }}>
                                      Negative Publicity/Competitors' Offers
                                    </li>
                                  </ul>
                                </Then>
                                <ElseIf
                                  condition={
                                    finaluserResponse.probability >= 0.35 &&
                                    finaluserResponse.probability < 0.65
                                  }
                                >
                                  <ul>
                                    <li style={{ color: "red" }}>
                                      Poor Customer Experience
                                    </li>
                                    <li style={{ color: "yellow" }}>
                                      Lack of Personalization
                                    </li>
                                    <li style={{ color: "yellow" }}>
                                      Negative Publicity/Competitors' Offers
                                    </li>
                                  </ul>
                                </ElseIf>
                                <ElseIf
                                  condition={
                                    finaluserResponse.probability > 0.65
                                  }
                                >
                                  <ul>
                                    <li style={{ color: "red" }}>
                                      Poor Customer Experience
                                    </li>
                                    <li style={{ color: "red" }}>
                                      Lack of Personalization
                                    </li>
                                    <li style={{ color: "red" }}>
                                      Negative Publicity/Competitors' Offers
                                    </li>
                                  </ul>
                                </ElseIf>
                              </If> */}
                            {/* </div> */}
                          </Then>
                          <ElseIf
                            condition={finaluserResponse.prediction === "0"}
                          >
                            <div className="row">
                              {Object.entries(finalscreenDisplayResponse).map(
                                ([key, value]) => (
                                  <div key={key}>
                                    {/* <span>{key}:</span>{" "} */}
                                    <If condition={key === "Country"}>
                                      <Then>
                                        <span>
                                          1. Which Country is the Customer from:
                                        </span>{" "}
                                      </Then>
                                    </If>
                                    <If condition={key === "Tenure"}>
                                      <Then>
                                        <span>
                                          2. How many years has the Customer
                                          been with us:
                                        </span>{" "}
                                      </Then>
                                    </If>
                                    <If condition={key === "Product 1"}>
                                      <Then>
                                        <span>
                                          3. Is the Customer using Product 1:
                                        </span>{" "}
                                      </Then>
                                    </If>
                                    <If condition={key === "Product 2"}>
                                      <Then>
                                        <span>
                                          4. Is the Customer using Product 2:
                                        </span>{" "}
                                      </Then>
                                    </If>
                                    <If condition={key === "Product 3"}>
                                      <Then>
                                        <span>
                                          5. Is the Customer using Product 2:
                                        </span>{" "}
                                      </Then>
                                    </If>
                                    <If condition={key === "Active Member"}>
                                      <Then>
                                        <span>
                                          6. Is the Customer an Active Member:
                                        </span>{" "}
                                      </Then>
                                    </If>
                                    <If condition={key === "Feedback"}>
                                      <Then>
                                        <span>
                                          7. What is the Rating provided by the
                                          Customer:
                                        </span>{" "}
                                      </Then>
                                    </If>
                                    <b>
                                      <span>{value}</span>
                                    </b>
                                  </div>
                                )
                              )}
                            </div>
                            <br></br>
                            {/* <div className="row">
                              <h4>Few Reasons to think about:</h4>
                              <If
                                condition={
                                  finaluserResponse.probability <= 0.35
                                }
                              >
                                <Then>
                                  <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                      <Accordion.Header>
                                        Accordion Item #1
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum.
                                      </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                      <Accordion.Header>
                                        Accordion Item #2
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum.
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  </Accordion>
                                </Then>
                                <ElseIf
                                  condition={
                                    finaluserResponse.probability >= 0.35 &&
                                    finaluserResponse.probability < 0.65
                                  }
                                >
                                  <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                      <Accordion.Header>
                                        Accordion Item #1
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum.
                                      </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                      <Accordion.Header>
                                        Accordion Item #2
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum.
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  </Accordion>
                                </ElseIf>
                                <ElseIf
                                  condition={
                                    finaluserResponse.probability > 0.65
                                  }
                                >
                                  <h1>Reached inside</h1>
                                  <ul>
                                    <li style={{ color: "yellow" }}>
                                      Poor Customer Experience
                                    </li>
                                    <li style={{ color: "green" }}>
                                      Lack of Personalization
                                    </li>
                                    <li style={{ color: "green" }}>
                                      Negative Publicity/Competitors' Offers
                                    </li>
                                  </ul>
                                </ElseIf>
                              </If>
                            </div> */}
                          </ElseIf>
                        </If>
                      </div>
                    </ElseIf>
                  </If>
                </div>
                <If condition={finaluserResponse.prediction === "0"}>
                  <Then>
                    <br></br>
                    <div className="row" style={{ marginBottom: "20px" }}>
                      <h4>Few Reasons to think about:</h4>
                      <If condition={finaluserResponse.probability <= 0.35}>
                        <Then>
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                Behavioral Analysis
                              </Accordion.Header>
                              <Accordion.Body>
                                Analyze customer behavior patterns to understand
                                why they are reducing their engagement. Look for
                                trends, patterns, or triggers that may be
                                driving the decrease in activity. This could
                                involve examining data related to their purchase
                                history, website/app usage, or interactions with
                                customer support.
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>
                                Proactive Engagement
                              </Accordion.Header>
                              <Accordion.Body>
                                Implement proactive engagement strategies to
                                re-engage customers and remind them of the value
                                and benefits of your products or services.
                                Personalized communication, targeted promotions,
                                loyalty programs, or exclusive offers can help
                                incentivize increased activity and reignite
                                their interest.
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>
                                Customer Success Programs
                              </Accordion.Header>
                              <Accordion.Body>
                                Develop customer success programs aimed at
                                proactively addressing customer needs and
                                ensuring their ongoing satisfaction. Assign
                                dedicated account managers or customer success
                                representatives who can regularly engage with
                                customers, provide support, and identify
                                opportunities for upselling or cross-selling
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Then>
                        <ElseIf
                          condition={
                            finaluserResponse.probability >= 0.35 &&
                            finaluserResponse.probability < 0.65
                          }
                        >
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                Personalization and Customization
                              </Accordion.Header>
                              <Accordion.Body>
                                Personalize the customer experience based on
                                their preferences and behavior. Leverage
                                customer data and insights to deliver tailored
                                recommendations, content, or promotions that
                                align with their interests. By providing a
                                customized experience, you can increase the
                                likelihood of continued engagement.
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>
                                Re-engagement Strategies
                              </Accordion.Header>
                              <Accordion.Body>
                                Develop strategies to re-engage customers who
                                have shown signs of reduced activity. Implement
                                targeted communication campaigns to remind them
                                of the value and benefits of your products or
                                services. Offer incentives, exclusive content,
                                or personalized recommendations to reignite
                                their interest and encourage renewed engagement.
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>
                                Continuous Monitoring and Adaptation
                              </Accordion.Header>
                              <Accordion.Body>
                                Continuously monitor customer behavior and
                                engagement metrics to detect early signs of
                                disengagement. Implement mechanisms to track
                                customer activity and promptly intervene with
                                targeted retention efforts. Regularly evaluate
                                the effectiveness of your strategies and make
                                adjustments based on customer feedback and
                                insights.
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </ElseIf>
                        <ElseIf
                          condition={finaluserResponse.probability > 0.65}
                        >
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                Personalized Engagement
                              </Accordion.Header>
                              <Accordion.Body>
                                Develop personalized engagement strategies to
                                reinvigorate customer interest and increase
                                their activity levels. Leverage data and
                                insights to create customized offers,
                                recommendations, or content that aligns with
                                their preferences and needs. Focus on delivering
                                value and addressing any specific pain points.
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>
                                Customer Feedback and Surveys
                              </Accordion.Header>
                              <Accordion.Body>
                                Gather feedback directly from customers to
                                understand their motivations and reasons for
                                reducing their engagement. Conduct surveys,
                                interviews, or feedback sessions to gain
                                insights into their experiences, challenges, and
                                expectations. This feedback can guide the
                                development of targeted retention efforts.
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>
                                Continuous Improvement
                              </Accordion.Header>
                              <Accordion.Body>
                                Continuously monitor customer behavior and
                                engagement metrics to identify trends and
                                patterns. Regularly track key indicators and
                                iterate on your strategies based on the insights
                                gained. This iterative approach allows for
                                ongoing improvement in customer engagement and
                                retention efforts.
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </ElseIf>
                      </If>
                    </div>
                  </Then>
                  <ElseIf condition={finaluserResponse.prediction === "1"}>
                    <br></br>
                    <div className="row" style={{ marginBottom: "20px" }}>
                      <h4>Few Reasons to think about:</h4>
                      <If condition={finaluserResponse.probability <= 0.35}>
                        <Then>
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                Retention Strategy
                              </Accordion.Header>
                              <Accordion.Body>
                                With a churn rate between 10% and 40%, it
                                indicates that a significant portion of
                                customers are discontinuing their subscription
                                or leaving the service. To mitigate churn, it's
                                crucial to have a robust retention strategy in
                                place. Analyze the reasons behind the churn and
                                focus on improving customer satisfaction,
                                addressing pain points, and delivering value
                                through personalized experiences.
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>
                                Usage Patterns
                              </Accordion.Header>
                              <Accordion.Body>
                                Evaluate the usage patterns of customers who
                                churned versus those who stayed. Look for
                                patterns or differences in their engagement
                                levels, frequency of usage, feature utilization,
                                or any other relevant metrics. This analysis can
                                provide insights into the factors influencing
                                churn and guide efforts to improve customer
                                engagement.
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>
                                Predictive Analytics
                              </Accordion.Header>
                              <Accordion.Body>
                                Consider implementing predictive analytics
                                techniques to forecast churn. By analyzing
                                historical data, customer behavior, and various
                                factors, predictive models can provide insights
                                into which customers are most likely to churn.
                                This allows you to proactively target those
                                customers with tailored retention efforts.
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Then>
                        <ElseIf
                          condition={
                            finaluserResponse.probability >= 0.35 &&
                            finaluserResponse.probability < 0.65
                          }
                        >
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                Root Cause Analysis
                              </Accordion.Header>
                              <Accordion.Body>
                                Conduct a thorough analysis to identify the
                                underlying reasons for such a high churn rate.
                                Examine factors such as customer satisfaction,
                                product quality, pricing, competition, customer
                                support, or any other relevant aspects that may
                                be driving customers to leave. Identifying the
                                root causes is crucial for developing effective
                                retention strategies.
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>
                                Customer Satisfaction and Engagement
                              </Accordion.Header>
                              <Accordion.Body>
                                Evaluate customer satisfaction levels and
                                engagement metrics for customers with two
                                products. Look for indicators of low
                                satisfaction or disengagement, such as reduced
                                usage, lack of interaction with the products, or
                                negative feedback. Addressing these issues can
                                help improve customer retention.
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>
                                Competitive Analysis
                              </Accordion.Header>
                              <Accordion.Body>
                                Analyze the competitive landscape and consider
                                if competitors are offering similar products
                                with better features, pricing, or overall value.
                                Understanding competitive dynamics can help
                                adjust pricing strategies, product
                                differentiation, or marketing efforts to
                                maintain a competitive edge and reduce churn.
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </ElseIf>
                        <ElseIf
                          condition={finaluserResponse.probability > 0.65}
                        >
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                Urgent Investigation
                              </Accordion.Header>
                              <Accordion.Body>
                                The high churn rate demands immediate attention
                                and a thorough investigation. Analyze customer
                                feedback, conduct surveys, and gather data to
                                understand the primary reasons customers are
                                leaving at such a high rate. Identify any
                                systemic issues, product deficiencies, or other
                                factors that contribute to dissatisfaction.
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>
                                Targeted Customer Retention Programs
                              </Accordion.Header>
                              <Accordion.Body>
                                Develop targeted retention programs to address
                                the needs and concerns of customers with two
                                products. Personalize communication, offers, and
                                incentives based on customer profiles and
                                preferences. Leverage data and predictive
                                analytics to identify customers at the highest
                                risk of churn and prioritize efforts
                                accordingly.
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>
                                Rebuilding Customer Trust
                              </Accordion.Header>
                              <Accordion.Body>
                                If trust has been eroded due to product or
                                service shortcomings, focus on rebuilding
                                customer trust. Be transparent about any
                                improvements or changes being made, communicate
                                updates effectively, and provide assurances that
                                the identified issues are being addressed.
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                              <Accordion.Header>
                                Product Evaluation
                              </Accordion.Header>
                              <Accordion.Body>
                                Assess the quality, functionality, and value of
                                the products being offered. Ensure they meet
                                customer expectations and address their needs
                                effectively. Conduct user testing, feedback
                                sessions, and competitor analysis to identify
                                opportunities for product improvement or
                                innovation.
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </ElseIf>
                      </If>
                    </div>
                  </ElseIf>
                </If>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModelPage;
