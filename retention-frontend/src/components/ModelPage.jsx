import React, { useState } from "react";
import { If, Then, Else, ElseIf } from "react-if-elseif-else-render";
import Button from "react-bootstrap/Button";
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
                backgroundColor: "#5d8aa8",
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
                        <If condition={finaluserResponse.prediction === "1"}>
                          <Then>
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
                            <div className="row">
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
                              </If>
                            </div>
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
                            <div className="row">
                              <h4>Few Reasons to think about:</h4>
                              <If
                                condition={
                                  finaluserResponse.probability <= 0.35
                                }
                              >
                                <Then>
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
                            </div>
                          </ElseIf>
                        </If>
                      </div>
                    </ElseIf>
                  </If>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModelPage;
