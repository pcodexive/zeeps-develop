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
  message,
  Collapse,
  Tabs,
  Alert,
} from "antd";

import { DownloadOutlined, CheckOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./register-property.css";
import "../css/global.css";
import { Link } from "react-router-dom";
import BaseUrl from "../services/axios-url";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";
import Cookies from "universal-cookie";
import logoRound from "../images/logo-round.svg";
import docIcon from "../images/doc-icon.png";
import moment from "moment";
const axios = require("axios");
const { Content } = Layout;

const { Panel } = Collapse;
const { TabPane } = Tabs;

class PropertyProcessing extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    showVerification: false,
    loading: false,
    visible: false,
    ongoingPropertyData: [],
    confirmPropertyData: [],
    CCLoading: false,
    notLoggenInUser: false,
    userName: "",
    numOfProperty: 0,
  };

  componentDidMount() {
    const cookie = new Cookies();
    const memberId = cookie.get("UU");

    // Ongoing property list
    const cookies = new Cookies();
    var cookieName = btoa("zeeps");
    // console.log('encodedStringBtoA', cookieName);
    var finalCookieName = "";
    finalCookieName = cookieName.replace("=", "aAaA");

    var encodedStringBtoA = btoa("authorized");
    // console.log('encodedStringBtoA', encodedStringBtoA);
    var finalCookieValue = "";
    finalCookieValue = encodedStringBtoA.replace("==", "aAaA");

    // Form data begins
    let apiEndpoint = "";
    let formData = new FormData();

    // already logged in user
    if (cookies.get(finalCookieName) == finalCookieValue) {
      this.setState({ userName: cookies.get("UN") });
      axios
        .get(
          BaseUrl + "/memberapi/GetOnGoingPropertyDeatilByMemberId/" + memberId
        )
        .then((res) => {
          // console.log(res)
          if (res.data.status == 1 || res.data.status == "1") {
            this.setState({
              ongoingPropertyData: res.data.data,
              numOfProperty: this.state.numOfProperty + res.data.data.length,
            });
          } else {
            message.error("다시 시도해주세요.");
          }
        })
        .catch((error) => {
          console.log(error);
          message.error("다시 시도해주세요.");
        });

      // get confirmed contract list
      this.confirmPropertyData(memberId);
    }
    // Not logged in user
    else if (
      cookies.get(finalCookieName) == undefined ||
      cookies.get(finalCookieName) == "undefined"
    ) {
      this.props.history.push("/login");

      this.setState({
        ongoingPropertyData: [],
        confirmPropertyData: [],
        notLoggenInUser: true,
      });
    }
    // Not a normal user
    else {
      message.error("확인이 되지 않은 회원입니다.");
      return;
    }
  }

  // 계약서 컨펌하기
  confirmContract = (id, managername) => {
    console.log(id);
    this.setState({ CCLoading: true });

    axios
      .post(BaseUrl + "/memberapi/UpdatePropertyStatusByPropertyId", {
        id: id,
        memberContractStatus: "Completed",
      })
      .then(async (res) => {
        console.log(res);
        if (res.data.status == 1) {
          message.success("확인 되었습니다.");

          const { data } = await axios.get(
            `http://${process.env.REACT_APP_KAKAO_HOST}:${process.env.REACT_APP_BACKEND_PORT}/contractConfirm`,
            {
              params: {
                username: res.data.data.name,
                phone: res.data.data.phone,
                manager: managername,
              },
            }
          );
          console.log(data);

          const cookie = new Cookies();
          const memberId = cookie.get("UU");

          axios
            .get(
              BaseUrl +
                "/memberapi/GetOnGoingPropertyDeatilByMemberId/" +
                memberId
            )
            .then((res) => {
              // console.log(res)
              if (res.data.status == 1 || res.data.status == "1") {
                this.setState({ ongoingPropertyData: res.data.data });
              } else {
                message.error("다시 시도해주세요.");
              }
            })
            .catch((error) => {
              console.log(error);
              message.error("다시 시도해주세요.");
            });
          this.confirmPropertyData(memberId);
        } else {
          message.error(res.data.message);
        }
        this.setState({ CCLoading: false });
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
        this.setState({ CCLoading: false });
      });
  };

  downloadFile = (folder, file) => {
    axios({
      url: `${BaseUrl}/${folder}/${file}`,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file);
      document.body.appendChild(link);
      link.click();
    });
  };

  confirmPropertyData = (memberId) => {
    axios
      .get(
        BaseUrl + "/memberapi/GetConfirmedClosedPropertyByMemberId/" + memberId
      )
      .then((res) => {
        // console.log(res)
        if (res.data.status == 1 || res.data.status == "1") {
          this.setState({
            confirmPropertyData: res.data.data,
            numOfProperty: this.state.numOfProperty + res.data.data.length,
          });
        } else {
          message.error("다시 시도해주세요.");
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  };

  render() {
    const {
      loading,
      ongoingPropertyData,
      confirmPropertyData,
      CCLoading,
      notLoggenInUser,
    } = this.state;

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    console.log(this.state.confirmPropertyData);
    // File Upload code end ------------------------------------------------------------------------------

    return (
      <Layout className="register-property-layout cs-property-processing">
        <WithAuthHeader />

        <Content>
          <Layout className="site-layout-background">
            <Space direction="vertical" size={"large"}>
              <Content>
                <div className="cs-main-block">
                  <div className="cs-form-main-logo">
                    <img src={logoRound} />
                  </div>

                  <div className="cs-form-title-wrapper">
                    <h2 className="cs-h2 cs-form-title">
                      {this.state.userName}
                    </h2>
                    <p className="color-them">{this.state.numOfProperty}건</p>
                  </div>

                  <Button className="property-btn">
                    <Link to="/register-property">집 내놓기</Link>
                  </Button>

                  <Divider />

                  <Tabs
                    defaultActiveKey="1"
                    className="width100 mb-15 property-tab"
                    style={{ marginTop: "16px" }}
                  >
                    <TabPane tab="중개중 부동산" key="1">
                      {ongoingPropertyData.map((d, i) => {
                        return (
                          // <Link to={`/property-detail/${d.id}`}>
                          <Row
                            key={i}
                            className="cs-card-block"
                            style={{ position: "relative" }}
                          >
                            {/* <Col span={24}>
                                  <Link to={"/property-detail/" + d.id}>
                                    <h2 className="theme-color">Edit</h2>
                                  </Link>
                                </Col> */}
                            <div className="cs-card-block-top">
                              <div className="cs-row1">
                                <div className="cs-label-o">
                                  <span style={{ marginRight: "4px" }}>
                                    계약정보
                                  </span>{" "}
                                  <span
                                    style={{
                                      position: "absolute",
                                      margin: "-6px",
                                    }}
                                  >
                                    .
                                  </span>
                                  {/* {d.memberContractStatus == "Pending" ? (
                                    ""
                                  ) : ( */}
                                  <span
                                    className="blur-primary-color"
                                    style={{ marginLeft: "4px" }}
                                  >
                                    {d.memberContractStatus == "Waiting"
                                      ? "계약 대기"
                                      : d.memberContractStatus === "Completed"
                                      ? "계약완료"
                                      : d.memberContractStatus === "Ended"
                                      ? "종료"
                                      : ""}
                                  </span>
                                  {/* )} */}
                                </div>

                                <div className="cs-btn1-main">
                                  <Button
                                    shape="round"
                                    className="theme-btn-default cs-btn-1"
                                    onClick={() =>
                                      this.props.history.push(
                                        `/contract-history/${d.id}`
                                      )
                                    }
                                  >
                                    <img src={docIcon} />
                                    계약서 히스토리
                                  </Button>
                                </div>
                              </div>
                              <Link to={"/property-detail/" + d.id}>
                                <Col span={24} className="cs-label-main">
                                  <div className="cs-label-t">
                                    {(d.propertyType === "For Sale" ||
                                      d.propertyType === "For Sale,For Rent" ||
                                      d.propertyType ===
                                        "For Rent,For Sale") && (
                                      <>매매 {d.propertyCost}만원 </>
                                    )}
                                  </div>
                                  <div className="cs-label-t">
                                    {(d.propertyType === "For Rent" ||
                                      d.propertyType === "For Sale,For Rent" ||
                                      d.propertyType ===
                                        "For Rent,For Sale") && (
                                      <>보증금 {d.propertyDeposite}만원</>
                                    )}
                                  </div>
                                  <div className="cs-label-t">
                                    {(d.propertyType === "For Rent" ||
                                      d.propertyType === "For Sale,For Rent" ||
                                      d.propertyType ===
                                        "For Rent,For Sale") && (
                                      <>월세 {d.propertyRent}만원</>
                                    )}
                                  </div>
                                </Col>

                                <Col className="cs-field-outer" span={24}>
                                  <div className="cs-left-label">담당자 </div>
                                  {d.manager ? (
                                    <div className="cs-right-val cs-val">
                                      {d.manager.name}{" "}
                                    </div>
                                  ) : (
                                    <div className="cs-right-val cs-val1">
                                      담당자 배정중
                                    </div>
                                  )}
                                </Col>

                                <Col className="cs-field-outer" span={24}>
                                  <div className="cs-left-label">주소 </div>
                                  <div className="cs-right-val address">
                                    {d.address}
                                  </div>
                                </Col>

                                <Col className="cs-field-outer" span={24}>
                                  <div className="cs-left-label">거래유형 </div>
                                  <div className="cs-right-val">
                                    {d.propertyType === "For Rent" && "전/월세"}
                                    {d.propertyType === "For Sale" && "매매"}
                                    {d.propertyType === "For Sale,For Rent" &&
                                      "매매,전/월세"}
                                    {d.propertyType === "For Rent,For Sale" &&
                                      "전/월세,매매"}
                                  </div>
                                </Col>

                                {/* <Col className=" mb-15" span={12} >Maintenance fee </Col> */}
                                <Col className="cs-field-outer" span={24}>
                                  <div className="cs-left-label">관리비 </div>
                                  <div className="cs-right-val">
                                    {d.maintanceFee}
                                  </div>
                                </Col>
                              </Link>
                              {d.memberContractStatus === "Waiting" ? (
                                <Space className="cs-block-btn-main">
                                  <Row className="cs-btn-wrapper">
                                    <div className="cs-btn2-main">
                                      <Button
                                        block
                                        shape="round"
                                        className="cs-btn-2 cs-btn-2-hover"
                                        onClick={() => {
                                          util.downloadFileByURL(
                                            "contractfile",
                                            d.PropertyContracts[0].contractFile
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
                                        {d.PropertyContracts.length ? (
                                          <span>계약서 다운로드</span>
                                        ) : (
                                          <span> 계약서 다운로드 </span>
                                        )}
                                      </Button>
                                    </div>
                                    <div className="cs-btn3-main">
                                      <Button
                                        block
                                        shape="round"
                                        className="cs-btn-3 cs-btn-3-hover"
                                        onClick={() => {
                                          console.log(d);
                                          this.confirmContract(
                                            d.id,
                                            d.manager.name
                                          );
                                        }}
                                        loading={CCLoading}
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
                                        block
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
                                        <span>계약서 다운로드 </span>
                                      </Button>
                                    </div>
                                    <div className="cs-btn3-main">
                                      <Button
                                        block
                                        shape="round"
                                        className="disabled-btn cs-btn-3"
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
                                        <span>계약서 컨펌하기 </span>
                                      </Button>
                                    </div>
                                  </Row>
                                </Space>
                              )}
                            </div>
                            <div className="cs-card-block-bottom">
                              <Collapse
                                className="cs-collapse-section"
                                defaultActiveKey=""
                              >
                                <Panel header="&nbsp;" key="1">
                                  <Row>
                                    <Col className="cs-field-outer" span={24}>
                                      <div className="cs-left-label">구조 </div>
                                      <div className="cs-right-val">
                                        {d.rooms}
                                      </div>
                                    </Col>

                                    <Col className="cs-field-outer" span={24}>
                                      <div className="cs-left-label">방향 </div>
                                      <div className="cs-right-val">
                                        {d.direction}
                                      </div>
                                    </Col>

                                    <Col className="cs-field-outer" span={24}>
                                      <div className="cs-left-label">
                                        전용면적{" "}
                                      </div>
                                      <div className="cs-right-val">
                                        {Math.round(
                                          (Number(d.areaSquare) +
                                            Number.EPSILON) *
                                            100
                                        ) / 100}
                                        {d.areaUnit == "Pyeong" ? (
                                          "평"
                                        ) : (
                                          <span>
                                            m<sup>2</sup>
                                          </span>
                                        )}
                                      </div>
                                    </Col>

                                    <Col className="cs-field-outer" span={24}>
                                      <div className="cs-left-label">
                                        엘레베이터{" "}
                                      </div>
                                      <div className="cs-right-val">
                                        {d.elevator ? "있음" : "결석"}
                                      </div>
                                    </Col>

                                    <Col className="cs-field-outer" span={24}>
                                      <div className="cs-left-label">
                                        입주가능일{" "}
                                      </div>
                                      <div className="cs-right-val">
                                        {d.availableMoveInStatus ==
                                          "Immediately" && <>즉시입주</>}
                                        {d.availableMoveInStatus ==
                                          "Negotiable" &&
                                          d.availableMoveInDate &&
                                          moment(d.availableMoveInDate).format(
                                            "YYYY.MM.DD"
                                          )}
                                      </div>
                                    </Col>
                                  </Row>
                                </Panel>
                              </Collapse>
                            </div>
                          </Row>
                          // </Link>
                        );
                      })}
                    </TabPane>

                    <TabPane tab="마이 부동산" key="2" className="cs-pptab2">
                      {notLoggenInUser && (
                        <Row>
                          <Col span={24}>
                            <Alert
                              showIcon
                              message="Please Login"
                              description="Please login to view your property list"
                              type="info"
                              type="info"
                            />
                          </Col>
                        </Row>
                      )}
                      {confirmPropertyData.map((d, i) => {
                        return (
                          // <Link to={`/property-detail/${d.id}`}>
                          <Row
                            key={i}
                            className="cs-card-block"
                            style={{ position: "relative" }}
                          >
                            {/* <Col span={24}>
                                  <Link to={"/property-detail/" + d.id}>
                                    <h2 className="theme-color">Edit</h2>
                                  </Link>
                                </Col> */}

                            <div className="cs-card-block-top pb-0">
                              <div className="cs-row1">
                                <div className="cs-label-o">
                                  계약정보∙
                                  {d.memberContractStatus == "Completed" && (
                                    <span className="second-primary-color">
                                      계약완료
                                    </span>
                                  )}
                                  {d.memberContractStatus == "Ended" && (
                                    <span className="color-red">종료</span>
                                  )}
                                </div>

                                <div className="cs-btn1-main">
                                  <Button
                                    shape="round"
                                    className="theme-btn-default cs-btn-1"
                                    onClick={() =>
                                      this.props.history.push(
                                        `/contract-history/${d.id}`
                                      )
                                    }
                                  >
                                    <img src={docIcon} />
                                    계약서 히스토리
                                  </Button>
                                </div>
                              </div>
                              <Link to={"/property-detail/" + d.id}>
                                <Col span={24} className="cs-label-main">
                                  <div className="cs-label-t">
                                    {(d.propertyType == "For Sale" ||
                                      d.propertyType == "For Sale,For Rent" ||
                                      d.propertyType ==
                                        "For Rent,For Sale") && (
                                      <>매매 {d.propertyCost}만원</>
                                    )}
                                  </div>
                                  <div className="cs-label-t">
                                    {(d.propertyType == "For Rent" ||
                                      d.propertyType == "For Sale,For Rent" ||
                                      d.propertyType ==
                                        "For Rent,For Sale") && (
                                      <>보증금 {d.propertyDeposite}만원</>
                                    )}
                                  </div>
                                  <div className="cs-label-t">
                                    {(d.propertyType == "For Rent" ||
                                      d.propertyType == "For Sale,For Rent" ||
                                      d.propertyType ==
                                        "For Rent,For Sale") && (
                                      <>월세 {d.propertyRent}만원</>
                                    )}
                                  </div>
                                </Col>
                                <Col className="cs-field-outer" span={24}>
                                  <div className="cs-left-label">담당자 </div>
                                  {d.manager ? (
                                    <div className="cs-right-val cs-val">
                                      {d.manager.name}{" "}
                                    </div>
                                  ) : (
                                    <div className="cs-right-val cs-val1">
                                      담당자 배정중
                                    </div>
                                  )}
                                </Col>

                                <Col className="cs-field-outer" span={24}>
                                  <div className="cs-left-label">주소 </div>
                                  <div className="cs-right-val address">
                                    {d.address}
                                  </div>
                                </Col>

                                <Col className="cs-field-outer" span={24}>
                                  <div className="cs-left-label">거래유형 </div>
                                  <div className="cs-right-val">
                                    {d.propertyType == "For Rent" && "전/월세"}
                                    {d.propertyType == "For Sale" && "매매"}
                                    {d.propertyType == "For Sale,For Rent" &&
                                      "매매,전/월세"}
                                    {d.propertyType == "For Rent,For Sale" &&
                                      "전/월세,매매"}
                                  </div>
                                </Col>

                                {/* <Col className=" mb-15" span={12} >Maintenance fee </Col> */}
                                <Col className="cs-field-outer" span={24}>
                                  <div className="cs-left-label">관리비 </div>
                                  <div className="cs-right-val">
                                    <b>{d.maintanceFee}</b>
                                  </div>
                                </Col>
                              </Link>
                            </div>

                            <div className="cs-card-block-bottom mt-0">
                              <Collapse
                                className="cs-collapse-section"
                                defaultActiveKey=""
                              >
                                <Panel header="&nbsp;" key="1">
                                  <Row>
                                    <Col className="cs-field-outer" span={24}>
                                      <div className="cs-left-label">구조 </div>
                                      <div className="cs-right-val">
                                        {d.rooms}
                                      </div>
                                    </Col>

                                    <Col className="cs-field-outer" span={24}>
                                      <div className="cs-left-label">방향 </div>
                                      <div className="cs-right-val">
                                        {d.direction}
                                      </div>
                                    </Col>

                                    <Col className="cs-field-outer" span={24}>
                                      <div className="cs-left-label">
                                        전용면적{" "}
                                      </div>
                                      <div className="cs-right-val">
                                        {Math.round(
                                          (Number(d.areaSquare) +
                                            Number.EPSILON) *
                                            100
                                        ) / 100}
                                        {d.areaUnit == "Pyeong" ? (
                                          "평"
                                        ) : (
                                          <span>
                                            m<sup>2</sup>
                                          </span>
                                        )}
                                      </div>
                                    </Col>

                                    <Col className="cs-field-outer" span={24}>
                                      <div className="cs-left-label">
                                        엘레베이터{" "}
                                      </div>
                                      <div className="cs-right-val">
                                        {d.elevator ? "있음" : "결석"}
                                      </div>
                                    </Col>

                                    <Col className="cs-field-outer" span={24}>
                                      <div className="cs-left-label">
                                        입주가능일{" "}
                                      </div>
                                      <div className="cs-right-val">
                                        {d.availableMoveInStatus ==
                                          "Immediately" && <>즉시입주</>}
                                        {d.availableMoveInStatus ==
                                          "Negotiable" &&
                                          d.availableMoveInDate &&
                                          moment(d.availableMoveInDate).format(
                                            "YYYY.MM.DD"
                                          )}
                                      </div>
                                    </Col>
                                  </Row>
                                </Panel>
                              </Collapse>
                            </div>
                          </Row>
                          // </Link>
                        );
                      })}
                      {/*                                                     
                                                    <Row className="border-light p-10">
                                                        <Col className=" mb-15" span={12} >
                                                            <b>Contract info </b>
                                                        </Col>
                                                        <Col className="text-right mb-15" span={12} >
                                                            <Button shape="round" className="theme-btn-default">Contract history </Button>
                                                        </Col>

                                                        <Col span={24}>
                                                            <h2 className="theme-color">Lorem Ipsum Dollar sit amet</h2>
                                                        </Col>

                                                        <Col className=" mb-15" span={12} >Manager </Col>
                                                        <Col className="text-right mb-15" span={12} >
                                                            <b>lorem ipsum</b>
                                                        </Col>

                                                        <Col className=" mb-15" span={12} >Address   </Col>
                                                        <Col className="text-right mb-15" span={12} >
                                                            <b>lorem ipsum</b>
                                                        </Col>

                                                        <Col className=" mb-15" span={12} >Type </Col>
                                                        <Col className="text-right mb-15" span={12} >
                                                            <b>lorem ipsum</b>
                                                        </Col>

                                                        <Col className=" mb-15" span={12} >Maintenance fee </Col>
                                                        <Col className="text-right mb-15" span={12} >
                                                            <b>lorem ipsum</b>
                                                        </Col>

                                                        <Col className=" mb-15" span={12} >Floor </Col>
                                                        <Col className="text-right mb-15" span={12} >
                                                            <b>7th</b>
                                                        </Col>

                                                       
                                                        <Collapse className=" mb-15" defaultActiveKey={['1']} style={{ width: '100%' }} >
                                                            <Panel header="&nbsp;" key="1">
                                                                <Row>
                                                                    <Col className=" mb-15" span={12} >
                                                                    방 번호</Col>
                                                                    <Col className="text-right mb-15" span={12} >
                                                                        <b>lorem ipsum</b>
                                                                    </Col>

                                                                    <Col className=" mb-15" span={12} >Direction </Col>

                                                                    <Col className="text-right mb-15" span={12} >
                                                                        <b>lorem ipsum</b>
                                                                    </Col>
                                                                    <Col className=" mb-15" span={12} >전용 구역</Col>
                                                                    <Col className="text-right mb-15" span={12} >
                                                                        <b>lorem ipsum</b>
                                                                    </Col>
                                                                    <Col className=" mb-15" span={12} >엘리베이터 </Col>
                                                                    <Col className="text-right mb-15" span={12} >
                                                                        <b>lorem ipsum</b>
                                                                    </Col>
                                                                    <Col className=" mb-15" span={12} >입주 가능 날짜  </Col>
                                                                    <Col className="text-right mb-15" span={12} >
                                                                        <b>lorem ipsum</b>
                                                                    </Col>
                                                                </Row>
                                                            </Panel>
                                                        </Collapse>

                                                    </Row> */}
                    </TabPane>
                  </Tabs>
                </div>
              </Content>
            </Space>
          </Layout>
        </Content>

        <WithAuthFooter />
      </Layout>
    );
  }
}

export default PropertyProcessing;
