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
} from "antd";
import util from "../../util/Util";
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
import history from "./history";
import moment from "moment";
import EmptyPhase from "./EmptyPhase";
// import { PDFDownloadLink } from "@react-pdf/renderer";

const axios = require("axios");
const { Content } = Layout;

// /property-detail/:id
class ContractHistory extends Component {
  state = {
    loading: false,
    visible: false,
    data: [],
    propertyData: [],
  };

  componentDidMount() {
    var propertyId = window.location.pathname.split("/").pop();
    console.log("propertyId", propertyId);
    axios
      .get(`${BaseUrl}/adminapi/GetAllContractsByPropertyId/${propertyId}`)
      .then((res) => {
        console.log("datadatadatadata", res.data.data);
        if (res.data.status == 1 || res.data.status == "1") {
          this.setState({
            data: res.data.data,
          });
        }
      });
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
    const { visible, loading, data, propertyData } = this.state;
    return (
      <Layout className="register-property-layout">
        <WithAuthHeader />
        <Content>
          <Layout className="site-layout-background">
            <Space direction="vertical" size={"large"}>
              <Content className="content-padding">
                <Row className="">
                  <Col className="cs-main-block">
                    <Row>
                      <Col className="text-center mb-15" span={24}>
                        {/* <h2>Logo</h2> */}
                        <img src={logoRound} />
                      </Col>

                      <Col className="text-center mb-15" span={24}>
                        <div className="cs-contract-title">
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
                        </div>
                        <div className="cs-contract-subtitle">
                          <div className="second-primary-color contact-header-p">
                            {(propertyData.propertyType == "For Sale" ||
                              propertyData.propertyType ==
                                "For Sale,For Rent" ||
                              propertyData.propertyType ==
                                "For Rent,For Sale") && (
                              <>매매 {propertyData.propertyCost}만원 </>
                            )}
                          </div>
                          <div className="second-primary-color contact-header-p">
                            {(propertyData.propertyType == "For Rent" ||
                              propertyData.propertyType ==
                                "For Sale,For Rent" ||
                              propertyData.propertyType ==
                                "For Rent,For Sale") && (
                              <>보증금 {propertyData.propertyDeposite}만원</>
                            )}
                          </div>
                          <div className="second-primary-color contact-header-p">
                            {(propertyData.propertyType == "For Rent" ||
                              propertyData.propertyType ==
                                "For Sale,For Rent" ||
                              propertyData.propertyType ==
                                "For Rent,For Sale") && (
                              <>월세 {propertyData.propertyRent}만원</>
                            )}
                          </div>
                        </div>
                      </Col>
                      <Divider />
                    </Row>
                    {console.log(propertyData)}
                    {console.log(data)}
                    {data.length > 0 &&
                      data.map((contractFile) => {
                        const data = contractFile.contractFile.split("-");
                        // console.log("temp", temp);

                        return (
                          <Row className="cs-contract-wrap">
                            <Col className="" span={12}>
                              <div className="contact-name-title">
                                {" "}
                                {data[2]}
                              </div>
                              <span className="contact-date-title">
                                계약일 :{" "}
                                {moment(Date.now(data[0])).format("YYYY.MM.DD")}
                              </span>
                            </Col>
                            <Col
                              className="text-right"
                              span={12}
                              style={{ marginTop: "16px" }}
                            >
                              <Button
                                shape="round"
                                className="theme-btn-default download-contact-btn"
                              >
                                <svg
                                  width="20"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.87175 1.2959V18.1919"
                                    stroke="#9A86FF"
                                    stroke-width="1.6"
                                    stroke-linecap="square"
                                  />
                                  <path
                                    d="M18.8485 11.2344L9.87248 19.6824L0.896484 11.2344"
                                    stroke="#9A86FF"
                                    stroke-width="1.6"
                                  />
                                </svg>
                                <span
                                  onClick={() => {
                                    util.downloadFileByURL(
                                      "contractfile",
                                      contractFile.contractFile
                                    );
                                  }}
                                >
                                  계약서 다운로드
                                </span>
                              </Button>
                            </Col>
                            <Divider />
                          </Row>
                        );
                      })}
                    {data.length === 0 && <EmptyPhase />}
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

export default ContractHistory;
