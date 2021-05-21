import React, { Component } from "react";
import WithAuthHeader from "../WithAuthHeaderFooter/WithAuthHeader";
import util from "../../util/Util";
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
import docIcon from "../images/doc-icon.png";
import history from "./history";
import moment from "moment";
import KakaoMap from "./KakaoMap";

const axios = require("axios");
const { Content } = Layout;

// /property-detail/:id
class PropertyConfirmContract extends Component {
  state = {
    showVerification: false,
    loading: false,
    visible: false,
    propertyData: [],
    propertyImages: [],
    CCLoading: false,
    redirectTo404: false,
    actualMaintainenceArray: [],
    actualOptionsArray: [],
    showPriceModal: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  confirmContract = (id) => {
    console.log(id);
    this.setState({ CCLoading: true });
    axios
      .post(BaseUrl + "/memberapi/UpdatePropertyStatusByPropertyId", {
        id: id,
        memberContractStatus: "Completed",
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          message.success("확인 되었습니다.");

          var propertyId = window.location.pathname.split("/").pop();
          axios
            .get(BaseUrl + "/adminapi/GetPropertyDetailById/" + propertyId)
            .then((response) => {
              if (response.data.status == 1 || response.data.status == "1") {
                // console.log("dddd: ", data.data.id);

                //   var AllData = response.data.data;
                console.log(response.data.data);

                this.setState({
                  propertyData: response.data.data,
                  propertyImages: response.data.data.images,
                });
              } else {
                message.error("다시 시도해주세요.");
              }
            })
            .catch((error) => {
              console.log(error);
              message.error("다시 시도해주세요.");
            });
        } else {
          message.error(res.data.message);
        }
        this.setState({ CCLoading: false });
        // 계약서 컨펌하기 request here
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
        this.setState({ CCLoading: false });
      });
  };

  componentDidMount() {
    var propertyId = window.location.pathname.split("/").pop();
    axios
      .get(BaseUrl + "/adminapi/GetPropertyDetailById/" + propertyId)
      .then((response) => {
        if (response.data.status == 1 || response.data.status == "1") {
          // console.log("dddd: ", data.data.id);

          //   var AllData = response.data.data;
          console.log(response.data.data);

          const cookies = new Cookies();
          var cookieName = btoa("zeeps");
          // console.log('encodedStringBtoA', cookieName);
          var finalCookieName = "";
          finalCookieName = cookieName.replace("=", "aAaA");

          var encodedStringBtoA = btoa("authorized");
          // console.log('encodedStringBtoA', encodedStringBtoA);
          var finalCookieValue = "";
          finalCookieValue = encodedStringBtoA.replace("==", "aAaA");

          // already logged in user
          if (cookies.get(finalCookieName) == finalCookieValue) {
            if (cookies.get("UU")) {
              if (response.data.data.memberId == cookies.get("UU")) {
                this.setState({
                  propertyData: response.data.data,
                  propertyImages: response.data.data.images,
                });

                var maintanceFeeOfProperty = response.data.data.facilities;
                var optionsOfProperty = response.data.data.features;

                // get maintanence fee / facilities ------------------------------------------
                var allMaintanenceData = [];
                var allOptionsData = [];
                var i = 0;
                var j = 0;
                var actualMaintainenceArray = [];
                var actualOptionsArray = [];

                axios
                  .get(BaseUrl + "/adminapi/GetAllPropertyFacilities/")
                  .then((resp) => {
                    console.log(resp.data.data);
                    if (resp.data.status == 1 || resp.data.status == "1") {
                      allMaintanenceData = resp.data.data;

                      for (i = 0; i < maintanceFeeOfProperty.length; i++) {
                        for (j = 0; j < allMaintanenceData.length; j++) {
                          if (
                            maintanceFeeOfProperty[i] ==
                            allMaintanenceData[j].id
                          ) {
                            actualMaintainenceArray[i] = {
                              id: allMaintanenceData[j].id,
                              image: allMaintanenceData[j].FacilityImage,
                              name: allMaintanenceData[j].propertyFacility,
                            };
                          }
                        }
                      }
                      //   console.log(
                      //     "actualMaintainenceArray",
                      //     actualMaintainenceArray
                      //   );
                      this.setState({
                        actualMaintainenceArray: actualMaintainenceArray,
                      });
                    } else {
                      message.error(resp.data.message);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    message.error("관리비 항목을 불러오는데에 실패하였습니다.");
                  });

                // get options ----------------------------------------------
                axios
                  .get(BaseUrl + "/adminapi/GetAllPropertyFeatures/")
                  .then((res) => {
                    console.log(res.data.data);
                    if (res.data.status == 1 || res.data.status == "1") {
                      allOptionsData = res.data.data;

                      for (i = 0; i < optionsOfProperty.length; i++) {
                        for (j = 0; j < allOptionsData.length; j++) {
                          if (optionsOfProperty[i] == allOptionsData[j].id) {
                            actualOptionsArray[i] = {
                              id: allOptionsData[j].id,
                              image: allOptionsData[j].FeatureImage,
                              name: allOptionsData[j].propertyFeatures,
                            };
                          }
                        }
                      }
                      console.log(actualOptionsArray);
                      this.setState({
                        actualOptionsArray: actualOptionsArray,
                      });
                    } else {
                      message.error(res.data.message);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    message.error("정보를 불러 오는데에 실패하였습니다.");
                  });
              } else {
                message.error("정보를 불러오지 못하였습니다.");
                this.setState({ redirectTo404: true });
                return;
              }
            } else {
              message.error("정보를 불러오지 못하였습니다.");
              this.setState({ redirectTo404: true });
              return;
            }
          }
          // Not logged in user
          else if (
            cookies.get(finalCookieName) == undefined ||
            cookies.get(finalCookieName) == "undefined"
          ) {
            message.error("정보를 불러오지 못하였습니다.");
            this.setState({ redirectTo404: true });
            return;
          }
          // Not a normal user
          else {
            message.error("정보를 불러오지 못하였습니다.");
            this.setState({ redirectTo404: true });
            return;
          }
        } else {
          message.error("다시 시도해주세요.");
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  }

  render() {
    const {
      visible,
      loading,
      propertyData,
      propertyImages,
      CCLoading,
    } = this.state;

    console.log(this.state.showVerification);
    // File Upload code end ------------------------------------------------------------------------------
    const contentStyle = {
      height: "280px",
      // color: '#fff',
      lineHeight: "280px",
      textAlign: "center",
      // backgroundImage: url('https://dummyimage.com/350x40/'),
    };

    if (this.state.redirectTo404 === true) {
      return (
        <Redirect
          to={{
            pathname: "/not-found",
          }}
        />
      );
    }

    return (
      <Layout className="register-property-layout cs-confirm-contract">
        <WithAuthHeader />

        <Content>
          <Layout className="site-layout-background">
            <Space direction="vertical" size={"large"}>
              <Content className="content-padding">
                <Row className="">
                  <Col className="cs-main-block">
                    <Row>
                      <Col className="text-center mb-15" span={24}>
                        <img src={logoRound} className="csd-round-logo" />
                      </Col>
                      <Col className="text-center mb-15" span={24}>
                        <div className="cs-contract-title">
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
                          <h2 className="contact-header-h2">
                            {propertyData.address}
                          </h2>
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

                      {propertyImages && propertyImages.length > 0 && (
                        <>
                          <Col span={24} className="mb-15 cs-img-carosel">
                            <Carousel autoplay effect="fade">
                              {propertyImages.map((img, i) => (
                                <div className="cs-img-wrap">
                                  <img
                                    src={`${BaseUrl}/property/${img}`}
                                    style={{ height: 300 }}
                                  />
                                </div>
                              ))}
                            </Carousel>
                          </Col>
                          <Divider />
                        </>
                      )}
                      {propertyData.manager && (
                        <>
                          <Col className="mb-15 cs-row2" span={24}>
                            <h4>
                              <div className="cs-manager-label">
                                담당자 <br />{" "}
                              </div>
                              <div className="cs-manager-name">
                                {propertyData.manager.name}{" "}
                                {/* {propertyData.manager.adminlogin.role} */}
                              </div>{" "}
                            </h4>
                            <Link
                              onClick={this.showModal}
                              to="#"
                              className="cs-next-btn"
                            >
                              <svg
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
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
                            </Link>

                            {/* contact buttons for responsive */}
                            <Space className="cs-contatct-btn-main">
                              <Row className="cs-ctbtn-wrapper">
                                <div className="cs-ctbtn2-main">
                                  <a
                                    href={"tel:" + propertyData.manager.mobile}
                                  >
                                    <Button
                                      block
                                      className="cs-ctbtn cs-ctbtn-2"
                                    >
                                      <svg
                                        width="19"
                                        height="19"
                                        viewBox="0 0 19 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M17.6296 12.963C16.3333 12.963 15.0889 12.7556 13.9274 12.3719C13.5644 12.2578 13.16 12.3407 12.8696 12.6207L10.5881 14.9022C7.65333 13.4089 5.24741 11.0133 3.75407 8.06815L6.03556 5.7763C6.32593 5.50667 6.40889 5.10222 6.29481 4.73926C5.91111 3.57778 5.7037 2.33333 5.7037 1.03704C5.7037 0.466667 5.23704 0 4.66667 0H1.03704C0.466667 0 0 0.466667 0 1.03704C0 10.7748 7.89185 18.6667 17.6296 18.6667C18.2 18.6667 18.6667 18.2 18.6667 17.6296V14C18.6667 13.4296 18.2 12.963 17.6296 12.963Z"
                                          fill="white"
                                        />
                                      </svg>
                                      <span>전화하기 </span>
                                    </Button>
                                  </a>
                                </div>
                                <div className="cs-ctbtn3-main">
                                  <Button
                                    block
                                    className="cs-ctbtn cs-ctbtn-3"
                                    onClick={() =>
                                      this.confirmContract(propertyData.id)
                                    }
                                  >
                                    <svg
                                      width="20"
                                      height="19"
                                      viewBox="0 0 20 19"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M20 9.15276C20 4.09775 15.5229 0 9.9999 0C4.47713 0 0 4.09775 0 9.15276C0 14.2076 4.47713 18.3055 9.9999 18.3055C11.4948 18.3055 12.912 18.0032 14.1855 17.4651L17.5442 18.9781C17.7184 19.0565 17.9103 18.9137 17.8917 18.7201L17.5458 15.1551C19.0732 13.5481 20 11.4501 20 9.15276Z"
                                        fill="white"
                                      />
                                    </svg>

                                    <span>계약서 컨펌하기</span>
                                  </Button>
                                </div>
                              </Row>
                            </Space>
                          </Col>
                        </>
                      )}
                    </Row>
                    {propertyData.manager && (
                      <>
                        <Modal
                          visible={visible}
                          title="담당자 정보"
                          onOk={this.handleOk}
                          onCancel={this.handleCancel}
                          closable={false}
                          footer={null}
                          className="cs-popup cs-manager-popup"
                        >
                          <div className="cs-modal-body">
                            <Row className="text-center">
                              <p style={{ width: "100%" }}>
                                담당자 <br />
                                <b>
                                  {propertyData.manager.name}{" "}
                                  {/* {propertyData.manager.adminlogin.role} */}
                                </b>{" "}
                                <br />
                                <b>{propertyData.manager.mobile}</b>
                              </p>

                              <Space direction="vertical" className="width100">
                                <Col span={24}>
                                  <Button
                                    key="back"
                                    className="theme-btn cs-btn3"
                                    onClick={this.handleCancel}
                                    size={"large"}
                                  >
                                    확인했습니다.
                                  </Button>
                                </Col>
                              </Space>
                            </Row>
                          </div>
                        </Modal>
                      </>
                    )}

                    <Row
                      className="cs-card-block cs-card-detail-block mb-15"
                      style={{ position: "relative" }}
                    >
                      <div className="cs-card-block-top">
                        <div className="cs-row1">
                          <div className="cs-label-o">매물정보 </div>
                          <div className="cs-btn1-main">
                            <Button
                              shape="round"
                              className="theme-btn-default cs-btn-1"
                              onClick={() =>
                                this.props.history.push(
                                  `/contract-history/${propertyData.id}`
                                )
                              }
                            >
                              <img src={docIcon} />
                              계약서 히스토리{" "}
                            </Button>
                          </div>
                        </div>
                        <Col className="cs-field-outer" span={24}>
                          <div className="cs-left-label">주소 </div>
                          <div className="cs-right-val address">
                            {propertyData.address}
                          </div>
                        </Col>

                        <Col className="cs-field-outer" span={24}>
                          <div className="cs-left-label">거래유형 </div>
                          <div className="cs-right-val">
                            {propertyData.propertyType == "For Rent" &&
                              "전/월세"}
                            {propertyData.propertyType == "For Sale" && "매매"}
                            {propertyData.propertyType == "For Sale,For Rent" &&
                              "매매,전/월세"}
                            {propertyData.propertyType == "For Rent,For Sale" &&
                              "전/월세,매매"}
                          </div>
                        </Col>

                        <Col className="cs-field-outer" span={24}>
                          <div className="cs-left-label">관리비</div>
                          <div className="cs-right-val">
                            {propertyData.maintanceFee}
                          </div>
                        </Col>

                        <Col className="cs-field-outer" span={24}>
                          <div className="cs-left-label">구조 </div>
                          <div className="cs-right-val">
                            {propertyData.rooms}
                          </div>
                        </Col>

                        <Col className="cs-field-outer" span={24}>
                          <div className="cs-left-label">방향 </div>
                          <div className="cs-right-val">
                            {propertyData.direction}
                          </div>
                        </Col>

                        <Col className="cs-field-outer" span={24}>
                          <div className="cs-left-label">전용면적 </div>
                          <div className="cs-right-val">
                            {Math.round(
                              (Number(propertyData.areaSquare) +
                                Number.EPSILON) *
                                100
                            ) / 100}
                            {propertyData.areaUnit == "Pyeong" ? (
                              "평"
                            ) : (
                              <span>
                                m<sup>2</sup>
                              </span>
                            )}
                          </div>
                        </Col>

                        <Col className="cs-field-outer" span={24}>
                          <div className="cs-left-label">엘레베이터 </div>
                          <div className="cs-right-val">
                            {propertyData.elevator ? "있음" : "결석"}
                          </div>
                        </Col>

                        <Col className="cs-field-outer" span={24}>
                          <div className="cs-left-label">입주가능일 </div>
                          <div className="cs-right-val">
                            {propertyData.availableMoveInStatus ==
                              "Immediately" && <>즉시입주</>}
                            {propertyData.availableMoveInStatus ==
                              "Negotiable" &&
                              propertyData.availableMoveInDate &&
                              moment(propertyData.availableMoveInDate).format(
                                "YYYY.MM.DD"
                              )}
                          </div>
                        </Col>

                        {propertyData.memberContractStatus == "Waiting" ? (
                          <Space className="cs-block-btn-main">
                            <Row className="cs-btn-wrapper">
                              <div className="cs-btn2-main">
                                {/* <Button block shape="round" icon={<DownloadOutlined />} className="theme-btn-default">Download Contract </Button> */}
                                <Button
                                  block
                                  shape="round"
                                  className="cs-btn-2 cs-btn-2-hover"
                                  onClick={() => {
                                    util.downloadFileByURL(
                                      "contractfile",
                                      propertyData.PropertyContracts[0]
                                        .contractFile
                                    );
                                  }}
                                >
                                  <div className="cs-icon-hover">
                                    <svg
                                      width="25"
                                      height="27"
                                      viewBox="0 0 25 26"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M12.8612 1.44531V22.5653"
                                        stroke="#9A86FF"
                                        stroke-width="2"
                                        stroke-linecap="square"
                                      />
                                      <path
                                        d="M24.0806 13.8691L12.8606 24.4291L1.64062 13.8691"
                                        stroke="#9A86FF"
                                        stroke-width="2"
                                      />
                                    </svg>
                                  </div>
                                  <span>계약 다운로드 </span>
                                </Button>
                              </div>
                              <div className="cs-btn3-main">
                                <Button
                                  loading={CCLoading}
                                  block
                                  shape="round"
                                  className="cs-btn-3 cs-btn-3-hover"
                                  onClick={() =>
                                    this.confirmContract(propertyData.id)
                                  }
                                >
                                  <div className="cs-icon">
                                    {!CCLoading && (
                                      <svg
                                        width="26"
                                        height="20"
                                        viewBox="0 0 26 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M25.0472 1L9.26621 17.8L1 9.4"
                                          stroke="white"
                                          stroke-width="2"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                  <span>계약서 컨펌하기</span>
                                </Button>
                              </div>
                            </Row>
                          </Space>
                        ) : (
                          <Space className="cs-block-btn-main">
                            <Row className="cs-btn-wrapper">
                              <div className="cs-btn2-main">
                                <Button
                                  shape="round"
                                  className="disabled-btn-default cs-btn-2"
                                  disabled="disabled"
                                >
                                  <div className="cs-icon">
                                    <svg
                                      width="25"
                                      height="27"
                                      viewBox="0 0 24 27"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M12.0018 1.87109V22.9911"
                                        stroke="#CBCBCB"
                                        stroke-width="2"
                                        stroke-linecap="square"
                                      />
                                      <path
                                        d="M23.2213 14.2949L12.0013 24.8549L0.78125 14.2949"
                                        stroke="#CBCBCB"
                                        stroke-width="2"
                                      />
                                    </svg>
                                  </div>
                                  <span>계약 다운로드 </span>
                                </Button>
                              </div>
                              <div className="cs-btn3-main">
                                <Button
                                  shape="round"
                                  className="disabled-btn  cs-btn-3"
                                  disabled="disabled"
                                >
                                  <div className="cs-icon">
                                    <svg
                                      width="26"
                                      height="20"
                                      viewBox="0 0 26 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M25.0472 1L9.26621 17.8L1 9.4"
                                        stroke="white"
                                        stroke-width="2"
                                      />
                                    </svg>
                                  </div>
                                  <span>계약서 컨펌하기</span>
                                </Button>
                              </div>
                            </Row>
                          </Space>
                        )}
                      </div>
                      {/* <Col className=" mb-15" span={12} >
                                                <Button shape="round" icon={<DownloadOutlined />} className="theme-btn-default">Download Contract </Button>
                                            </Col>
                                            <Col className="text-right mb-15" span={12} >
                                                <Button shape="round" icon={<CheckOutlined />} className="theme-btn">Confirm Contract </Button>
                                            </Col> */}

                      <Col span={24} className="cs-editbtn">
                        <Link to={`/register-property/${propertyData.id}`}>
                          수정하기
                        </Link>
                      </Col>
                    </Row>

                    <Row>
                      <Divider />
                      <Col className="cs-font-24  cs-mb10 cs-mt20" span={24}>
                        옵션{" "}
                      </Col>
                      <Col className="" span={24}>
                        <Row className="cs-option-item-outer">
                          {this.state.actualOptionsArray.map((o, i) => {
                            return (
                              <Col
                                span={6}
                                key={o.id}
                                className="text-center cs-option-item"
                              >
                                {/* <img src=" https://placeimg.com/80/80/tech" /> */}
                                <img src={BaseUrl + o.image} />
                                <br />
                                <span className="cs-font-24">{o.name}</span>
                              </Col>
                            );
                          })}
                        </Row>
                      </Col>

                      <Divider />

                      <Col className="cs-font-24 cs-mb10 cs-mt20" span={24}>
                        관리비 포함 항목
                      </Col>
                      <Col className="" span={24}>
                        <Row className="cs-option-item-outer">
                          {this.state.actualMaintainenceArray.map((m, i) => {
                            if (!m.image) {
                              return;
                            }
                            return (
                              <Col
                                span={6}
                                key={m.id}
                                className="text-center cs-option-item"
                              >
                                <img src={BaseUrl + m.image} />
                                <br />
                                {/* <img src={BaseUrl+m.image} /> */}
                                <span className="cs-font-24">{m.name}</span>
                              </Col>
                            );
                          })}
                        </Row>
                      </Col>

                      <Divider />

                      <Col
                        className="cs-font-24"
                        style={{ marginTop: "20px" }}
                        span={24}
                      >
                        상세위치 정보
                      </Col>

                      <Col className="mb-15" span={24}>
                        {/* <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3411.9914896658825!2d75.76701051462322!3d31.220965168989835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391af4e636b784dd%3A0xd8f1509263158c8a!2sProtolabz%20Eservices!5e0!3m2!1sen!2sin!4v1611820347886!5m2!1sen!2sin"
                          width="100%"
                          height="200"
                          className="cs-address-map"
                          frameborder="0"
                          style={{ border: "0" }}
                          allowfullscreen=""
                          aria-hidden="false"
                          tabindex="0"
                        ></iframe> */}
                        <KakaoMap searchWord={propertyData.address} />
                      </Col>
                      <Divider />
                      {/* <Button
                        className="cs-secondary-button mb-15"
                        size={"large"}
                        type="primary"
                        block
                        danger
                        onClick={() => {
                          history.push(`/PropertyPrice/${propertyData.id}`);
                        }}
                      >
                        국토교통부 실거래가 보기
                      </Button> */}
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

export default PropertyConfirmContract;
