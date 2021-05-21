import React, { Component } from "react";
import WithAuthHeader from "../WithAuthHeaderFooter/WithAuthHeader";
import {
  Layout,
  Button,
  Divider,
  Row,
  Col,
  Space,
  Modal,
  message,
  Carousel,
  Card,
} from "antd";

import {
  DownloadOutlined,
  CheckOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./register-property.css";
import "../css/global.css";
import { Link, Redirect } from "react-router-dom";
import BaseUrl from "../services/axios-url";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";
import Cookies from "universal-cookie";
import logoRound from "../images/logo-round.svg";
import nationalLogo from "../images/national.png";
import history from "./history";

const axios = require("axios");
const { Content } = Layout;

// /property-detail/:id
class PropertyPrice extends Component {
  state = {
    loading: false,
    visible: false,
    propertyData: [],
  };

  componentDidMount() {
    var propertyId = window.location.pathname.split("/").pop();
    axios
      .get(`${BaseUrl}/adminapi/GetPropertyDetailById/${propertyId}`)
      .then((res) => {
        console.log(res.data.data);
        if (res.data.status == 1 || res.data.status == "1") {
          this.setState({
            propertyData: res.data.data,
          });
        }
      });
  }

  render() {
    const { visible, loading, propertyData } = this.state;

    return (
      <Layout className="register-property-layout">
        <WithAuthHeader />

        <Content>
          <Layout className="site-layout-background">
            <Space direction="vertical" size={"large"}>
              <Content className="content-padding">
                <Row>
                  <Col className="cs-main-block">
                    <Row>
                      <Col className="text-center mb-15" span={24}>
                        {/* <h2>Logo</h2> */}
                        <img src={logoRound} />
                      </Col>

                      <Col className="text-center mb-15" span={24}>
                        <h2 className="contact-header-h2">
                          {propertyData.address}
                        </h2>
                        <svg
                          className="cs-back-button"
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => history.goBack()}
                        >
                          <path
                            d="M24.0081 16.3074L32.8857 24.4003L24.0081 32.4933"
                            stroke="#44358F"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M32.3988 24.4H13.1988"
                            stroke="#44358F"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <circle
                            r="23.2"
                            transform="matrix(-1 0 0 1 24 24)"
                            stroke="#44358F"
                            stroke-width="1.6"
                          />
                        </svg>

                        {/* <p className="second-primary-color contact-header-p">
                          {(this.props.location.state.propertyType ==
                            "For Sale" ||
                            this.props.location.state.propertyType ==
                              "For Sale,For Rent") &&
                            "For Sale "}
                          {this.props.location.state.propertyCost}

                          {(this.props.location.state.propertyType ==
                            "For Rent" ||
                            this.props.location.state.propertyType ==
                              "For Sale,For Rent") && (
                            <>
                              For Rent :{this.props.location.state.propertyRent}
                            </>
                          )}
                        </p> */}
                        <div className="second-primary-color contact-header-p">
                          {(propertyData.propertyType == "For Sale" ||
                            propertyData.propertyType == "For Sale,For Rent" ||
                            propertyData.propertyType ==
                              "For Rent,For Sale") && (
                            <>매매 {propertyData.propertyCost}만원 </>
                          )}
                        </div>
                        <div className="second-primary-color contact-header-p">
                          {(propertyData.propertyType == "For Rent" ||
                            propertyData.propertyType == "For Sale,For Rent" ||
                            propertyData.propertyType ==
                              "For Rent,For Sale") && (
                            <>보증금 {propertyData.propertyDeposite}만원</>
                          )}
                        </div>
                        <div className="second-primary-color contact-header-p">
                          {(propertyData.propertyType == "For Rent" ||
                            propertyData.propertyType == "For Sale,For Rent" ||
                            propertyData.propertyType ==
                              "For Rent,For Sale") && (
                            <>월세 {propertyData.propertyRent}만원</>
                          )}
                        </div>
                      </Col>
                    </Row>

                    <Divider />
                    <Row>
                      {" "}
                      <Col className="text-left mb-15" span={24}>
                        <img src={nationalLogo} height="50" />
                      </Col>
                      <Col span={24} className="text-left cs-font-28 font-bold">
                        <p style={{ margin: "0" }}>
                          국토교통부 최근 실거래가 정보{" "}
                        </p>
                      </Col>
                      <Space
                        direction="vertical"
                        style={{
                          height: "630px",
                          overflow: "auto",
                          width: "100%",
                          marginTop: "30px",
                          marginBottom: "20px",
                        }}
                        className="cs-address-block"
                      >
                        <Col
                          className="text-left cs-address-block-list"
                          span={24}
                        >
                          <Card>
                            <p
                              className="cs-font-26"
                              style={{
                                lineHeight: "28px",
                                marginBottom: "30px",
                              }}
                            >
                              서울시 양천구 목동북로 12
                              <br />
                              i목동아파트 102동 302호{" "}
                            </p>
                            <b
                              className="color-red cs-font-30"
                              style={{ lineHeight: "40px" }}
                            >
                              14억 3,000
                            </b>
                          </Card>
                        </Col>
                        <Col
                          className="text-left cs-address-block-list"
                          span={24}
                        >
                          <Card>
                            <p
                              className="cs-font-26"
                              style={{
                                lineHeight: "28px",
                                marginBottom: "30px",
                              }}
                            >
                              서울시 양천구 목동북로 12
                              <br />
                              i목동아파트 102동 302호{" "}
                            </p>
                            <b
                              className="color-red cs-font-30"
                              style={{ lineHeight: "40px" }}
                            >
                              14억 3,000
                            </b>
                          </Card>
                        </Col>
                        <Col
                          className="text-left cs-address-block-list"
                          span={24}
                        >
                          <Card>
                            <p
                              className="cs-font-26"
                              style={{
                                lineHeight: "28px",
                                marginBottom: "30px",
                              }}
                            >
                              서울시 양천구 목동북로 12
                              <br />
                              i목동아파트 102동 302호{" "}
                            </p>
                            <b
                              className="color-red cs-font-30"
                              style={{ lineHeight: "40px" }}
                            >
                              14억 3,000
                            </b>
                          </Card>
                        </Col>
                        <Col
                          className="text-left cs-address-block-list"
                          span={24}
                        >
                          <Card>
                            <p
                              className="cs-font-26"
                              style={{
                                lineHeight: "28px",
                                marginBottom: "30px",
                              }}
                            >
                              서울시 양천구 목동북로 12
                              <br />
                              i목동아파트 102동 302호{" "}
                            </p>
                            <b
                              className="color-red cs-font-30"
                              style={{ lineHeight: "40px" }}
                            >
                              14억 3,000
                            </b>
                          </Card>
                        </Col>
                      </Space>
                      <Divider />
                    </Row>
                  </Col>
                </Row>
              </Content>
            </Space>
          </Layout>
        </Content>

        <WithAuthFooter />
      </Layout>
    );
  }
}

export default PropertyPrice;
