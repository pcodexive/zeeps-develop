import React, { Component } from "react";
import WithAuthHeader from "../WithAuthHeaderFooter/WithAuthHeader";
import {
  Layout,
  Form,
  Input,
  Button,
  Checkbox,
  Menu,
  Divider,
  Row,
  Col,
  Space,
  Modal,
  Steps,
  Radio,
  Select,
  Tag,
  DatePicker,
  Upload,
  message,
  Card,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./register-property.css";
import "../css/global.css";
import { Link } from "react-router-dom";

import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";
import nationalLogo from "../images/national.png";
import history from "./history";
import Cookies from "universal-cookie";
import BaseUrl from "../services/axios-url";

const axios = require("axios");
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Step } = Steps;

class RegisterPropertyStepTwo extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
  }

  state = {
    selectedTags: ["Electricity"],
    optionTags: ["Refrigerator"],
    previewVisible: false,
    previewImage: "",
    fileList: [],
    forSale: false,
    forRent: false,
  };

  componentDidMount() {
    if (!this.props.location.state) {
      // console.log("this.state", this.state);
      history.push("/register-property");
      return;
    }
    // console.log("this.props.location", this.props.location);
    if (this.props.location.state.data != "undefined") {
      console.log("data", this.props.location.state.data);
      var str = this.props.location.state.data;

      console.log(str.search("For Sale"));

      if (str.search("For Rent") != "-1" && str.search("For Sale") == "-1") {
        console.log("componentdidmount ----> for rent");
        this.setState({ forRent: true, forSale: false }, () => {});
      } else if (
        str.search("For Sale") != "-1" &&
        str.search("For Rent") == "-1"
      ) {
        console.log("componentdidmount ----> for sale");
        this.setState({ forRent: false, forSale: true }, () => {});
      } else if (
        str.indexOf("For Sale") != "-1" &&
        str.indexOf("For Rent") != "-1"
      ) {
        this.setState({ forRent: true, forSale: true });
      } else {
        return "";
      }
      // str.search("For Rent");
    }
    if (this.props.location.state.editData) {
      this.formRef.current.setFieldsValue({
        rent_price: this.props.location.state.editData.propertyRent,
        deposit: this.props.location.state.editData.propertyDeposite,
        sales_price: this.props.location.state.editData.propertyCost,
      });
    }
  }

  onFinish = (values) => {
    this.setState({ loading: true });
    console.log("Success:", values);

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
      if (cookies.get("UU")) {
        var LoggedInUserId = "";
        var LoggedInUserId = cookies.get("UU");
        formData.append("memberId", LoggedInUserId);

        apiEndpoint = "MemberInsertProperty";
      } else {
        message.error("확인이 되지 않은 회원입니다.");
        return;
      }
    }
    // Not logged in user
    else if (
      cookies.get(finalCookieName) == undefined ||
      cookies.get(finalCookieName) == "undefined"
    ) {
      formData.append("m_name", values.m_name);
      apiEndpoint = "UnSignedMemberInsertProperty";
    }
    // Not a normal user
    else {
      message.error("확인이 되지 않은 회원입니다.");
      return;
    }

    // formData.append("propertyCost", values.sales_price);
    // formData.append("propertyRent", values.deposit);
    // formData.append("propertyDeposite", values.rent_price);
    //console.log("formData", formData);
    console.log("this.props.location.state.id", this.props.location.state.id);

    const data = {
      propertyId: this.props.location.state.id,
      propertyCost: values.sales_price,
      propertyRent: values.rent_price,
      propertyDeposite: values.deposit,
    };
    axios
      .post(BaseUrl + "/propertyapi/addPropertySecondStep", data)
      .then((res) => {
        console.log("register property", res);
        if (res.data.status == 1) {
          message.success("매물이 성공적으로 등록되어있습니다.");
          history.push("/register-property-step-three", {
            id: this.props.location.state.id,
            editData: this.props.location.state.editData,
          });
        } else {
          message.error(res.data.message);
        }
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        message.error("Sorry!! Something went wrong");
        this.setState({ loading: false });
      });
  };

  showtextboxes = () => {
    if (this.state.forSale == false && this.state.forRent == true) {
      console.log("this.state.forRent");
      return (
        <React.Fragment>
          <Col className="" span={24}>
            <Form.Item
              label=""
              name="rent_price"
              className="cs-rpst"
              rules={[
                { required: true, message: "월세가를 입력해 주세요!" },
                {
                  pattern: /^\d*\.?\d*$/,
                  message: "숫자만 입력해주세요",
                },
              ]}
            >
              <Input placeholder="월세가를 입력하세요" maxLength={10} />
            </Form.Item>
            <span className="right-placeholder">만원</span>
          </Col>

          <Col className="" span={24}>
            <Form.Item
              label=""
              name="deposit"
              className="cs-rpst"
              rules={[
                { required: true, message: "전세가를 입력해 주세요!" },
                {
                  pattern: /^\d*\.?\d*$/,
                  message: "숫자만 입력해주세요",
                },
              ]}
            >
              <Input placeholder="보증금을 입력하세요" maxLength={10} />
            </Form.Item>
            <span className="right-placeholder">만원</span>
          </Col>
        </React.Fragment>
      );
    } else if (this.state.forSale == true && this.state.forRent == false) {
      console.log("this.state.forSale");
      return (
        <React.Fragment>
          <Col className="" span={24}>
            <Form.Item
              label=""
              name="sales_price"
              className="cs-rpst"
              rules={[
                { required: true, message: "매매가를 입력해 주세요!" },
                {
                  pattern: /^\d*\.?\d*$/,
                  message: "숫자만 입력해주세요",
                },
              ]}
            >
              <Input placeholder="매매가를 입력하세요" maxLength={10} />
            </Form.Item>
            <span className="right-placeholder">만원</span>
          </Col>
        </React.Fragment>
      );
    } else if (this.state.forSale == true && this.state.forRent == true) {
      console.log("forboth");
      return (
        <React.Fragment>
          <Col className="" span={24}>
            <Form.Item
              label=""
              name="sales_price"
              className="cs-rpst"
              rules={[
                { required: true, message: "매매가를 입력해 주세요!" },
                {
                  pattern: /^\d*\.?\d*$/,
                  message: "숫자만 입력해주세요",
                },
              ]}
            >
              <Input placeholder="매매가를 입력하세요" maxLength={10} />
            </Form.Item>
            <span className="right-placeholder">만원</span>
          </Col>

          <Col className="" span={24}>
            <Form.Item
              label=""
              name="deposit"
              className="cs-rpst"
              rules={[
                { required: true, message: "전세가를 입력해 주세요!" },
                {
                  pattern: /^\d*\.?\d*$/,
                  message: "숫자만 입력해주세요",
                },
              ]}
            >
              <Input placeholder="보증금을 입력하세요" maxLength={10} />
            </Form.Item>
            <span className="right-placeholder">만원</span>
          </Col>

          <Col className="" span={24}>
            <Form.Item
              label=""
              name="rent_price"
              className="cs-rpst"
              rules={[
                { required: true, message: "월세가를 입력해 주세요!" },
                {
                  pattern: /^\d*\.?\d*$/,
                  message: "숫자만 입력해주세요",
                },
              ]}
            >
              <Input placeholder="월세가를 입력하세요" maxLength={10} />
            </Form.Item>
            <span className="right-placeholder">만원</span>
          </Col>
        </React.Fragment>
      );
    } else {
      console.log("else");
      return "";
    }
  };

  render() {
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
      // message.error(errorInfo);
    };

    return (
      <Layout className="register-property-layout cs-step-2">
        <WithAuthHeader />

        <Content>
          <Layout className="site-layout-background">
            <Space direction="vertical" size={"large"}>
              <Content className="content-padding">
                <Row className="">
                  <Col className="text-center cs-main-block">
                    <Row>
                      <Col className=" mb-15" span={24}>
                        <h2 className="cs-h2">집 내놓기</h2>
                      </Col>

                      <Col className="mb-15 cs-p-80" span={24}>
                        <Steps progressDot current={1} className="cs-step">
                          <Step title="1단계" description="" />
                          <Step title="2단계" subTitle="" description="" />
                          <Step title="3단계" description="" />
                        </Steps>
                      </Col>

                      <Col className=" mb-15" span={24}>
                        <h3 className="cs-h3">
                          내놓으실 집의 금액을 등록해주세요!
                        </h3>
                      </Col>
                    </Row>

                    <Form
                      // {...layout}
                      name="basic"
                      ref={this.formRef}
                      initialValues={{ remember: true }}
                      onFinish={this.onFinish}
                      onFinishFailed={onFinishFailed}
                    >
                      <Row>
                        {this.showtextboxes()}
                        {/* <Divider /> */}
                        {/* <Col className="text-left mb-15 cs-dc-img-wrap" span={24}>
                          <img
                            src={nationalLogo}
                            height="50"
                            className="cs-dc-img"
                          />
                        </Col>

                        <Col
                          span={24}
                          className="text-left cs-font-28 font-bold"
                        >
                          <p style={{ margin: "0" }}>
                            국토교통부 최근 실거래가 정보{" "}
                          </p>
                        </Col> */}

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
                          {/* <Col
                            className="text-left cs-address-block-list"
                            span={24}
                          >
                            <Card>
                              <p className="cs-font-26 cs-block-add-desc">
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
                          </Col> */}
                          {/* <Col
                            className="text-left cs-address-block-list"
                            span={24}
                          >
                            <Card>
                              <p className="cs-font-26 cs-block-add-desc">
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
                          </Col> */}
                          {/* <Col
                            className="text-left cs-address-block-list"
                            span={24}
                          >
                            <Card>
                              <p className="cs-font-26 cs-block-add-desc">
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
                          </Col> */}
                          {/* <Col
                            className="text-left cs-address-block-list"
                            span={24}
                          >
                            <Card>
                              <p className="cs-font-26 cs-block-add-desc">
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
                          </Col> */}
                        </Space>

                        {/* <Divider /> */}

                        <Col span={24} className="mb-15 text-left">
                          <Form.Item>
                            <Button
                              className="theme-btn  cs-submit-button"
                              type="primary"
                              htmlType="submit"
                              style={{ width: "100%" }}
                            >
                              등록하기
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>{" "}
                      {/* Form row end */}
                    </Form>
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

export default RegisterPropertyStepTwo;
