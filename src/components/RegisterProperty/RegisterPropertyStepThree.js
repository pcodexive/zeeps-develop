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
  InputNumber,
} from "antd";

import {
  UploadOutlined,
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./register-property.css";
import "../css/global.css";
import { Link, withRouter } from "react-router-dom";
import BaseUrl from "../services/axios-url";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";
import Cookies from "universal-cookie";
import history from "./history";
import requiredIcon from "../images/required.png";
// import NumericInput from "../common/NumericInput";
import MobileNumericInput from "../common/MobileNumericInput";
import InputMask from "react-input-mask";
import dotenv from "dotenv";
dotenv.config();

const axios = require("axios");

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Step } = Steps;
const requiiredIconStyle = {
  marginTop: "-8px",
  width: "12px",
};

class RegisterPropertyStepThree extends Component {
  formRef = React.createRef();

  state = {
    showVerification: false,
    loading: false,
    visible: false,
    noRegisteredModalvisible: false,
    mem_name: "",
    mobile_no_used: "",
    verificationBtn: "인증번호 받기",
    okBtn: "확인",
    mobile_no: "",
    btndisable: true,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  // onMobileChange = (e) => {
  //   this.setState({ mobile_no: mobileNumber });
  // };
  noRegisteredModalvisible = () => {
    this.setState({
      noRegisteredModalvisible: true,
    });
  };

  handleOkMember = () => {
    this.setState({ loading: true });
    axios
      .post(BaseUrl + "/propertyapi/confirmProperty", {
        //name: this.state.mem_name,
        propertyId: this.props.location.state.id, // this.state.mobile_no '9888295279'
        status: true,
      })
      .then(async (res) => {
        console.log(res);
        if (res.data.status == 1) {
          message.success("매물이 성공적으로 등록되었습니다.");
          // setTimeout(() => {
          this.setState({ loading: false, visible: false });
          history.push("/property-processing");

          //window.location = "/register-property";
          // }, 1500);

          // biztalk 내놓기 접수 requset here
          const { data } = await axios.get(
            `http://${process.env.REACT_APP_KAKAO_HOST}:${process.env.REACT_APP_BACKEND_PORT}/register`,
            {
              params: {
                username: this.state.mem_name,
                phone: this.state.mobile_no,
              },
            }
          );
          console.log(data);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  };

  handleOkNonMember = () => {
    this.setState({ loading: true });
    axios
      .post(BaseUrl + "/propertyapi/confirmProperty", {
        //name: this.state.mem_name,
        propertyId: this.props.location.state.id, // this.state.mobile_no '9888295279'
        status: true,
      })
      .then(async (res) => {
        console.log(res);
        if (res.data.status == 1) {
          message.success("매물이 성공적으로 등록되었습니다.");
          // setTimeout(() => {
          this.setState({ loading: false, visible: false });
          history.push("/");

          //window.location = "/register-property";
          // }, 1500);

          // biztalk 내놓기 접수 requset here
          const { data } = await axios.get(
            `http://${process.env.REACT_APP_KAKAO_HOST}:${process.env.REACT_APP_BACKEND_PORT}/register`,
            {
              params: {
                username: this.state.mem_name,
                phone: this.state.mobile_no,
              },
            }
          );
          console.log(data);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      noRegisteredModalvisible: false,
    });
    history.push("/register-property");
  };

  getVerificationCode = () => {
    console.log("????", this.state.mobile_no);
    if (this.state.mobile_no == 0 || !this.state.mobile_no) {
      // console.log("hello");
      message.warning("핸드폰 번호를 입력해주세요");
      return;
    }

    this.setState({
      verificationCodeLoading: true,
    });
    // this.setState({
    //
    //   showVerification: true, // show the textbox
    //   // visible: true,           // show the modal
    // });

    axios
      .post(BaseUrl + "/propertyapi/sendOTPOnMobile", {
        //name: this.state.mem_name,
        mobile: this.state.mobile_no, // this.state.mobile_no '9888295279'
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          message.success("인증번호가 발송되었습니다.");
          this.setState({
            //verificationBtn: "receive verification code",
            showVerification: true,
            verificationBtn: "인증번호 재전송", // show the textbox
            // visible: true,           // show the modal
          });
        } else {
          message.error(res.data.message);
        }
        this.setState({
          verificationCodeLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
        this.setState({
          verificationCodeLoading: false,
        });
      });
  };

  onFinish = (values) => {
    console.log("Success:", values);

    this.setState({ loading: true });

    // if (this.state.mobile_no_used != values.mobile_no) {
    //   message.error(
    //     "Sorry!! Your mobile number is changed from the previous one"
    //   );
    //   return;
    // }

    // var mobile = values.mobile_no.toString();
    // var verificationcode = values.verification_code.toString();

    axios
      .post(BaseUrl + "/propertyapi/addPropertyThirdStep", {
        phone: this.state.mobile_no,
        otp: values.verification_code,
        name: values.name,
        propertyId: this.props.location.state.id,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          message.success("인증이 완료되었습니다.");

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
            console.log(
              "this.props.location.state.editData.length",
              this.props.location.state.editData
            );
            console.log(
              "----------------->",
              this.props.location.state.editData
            );
            if (this.props.location.state.editData.phone) {
              history.push("/property-processing");
            }
            this.setState({
              visible: true, // show the modal
            });
          }
          // Not logged in user
          else if (
            cookies.get(finalCookieName) == undefined ||
            cookies.get(finalCookieName) == "undefined"
          ) {
            this.setState({
              noRegisteredModalvisible: true, // show the non member modal
            });
          }
          // Not a normal user
          else {
            message.error("확인이 되지 않은 회원입니다.");
            return;
          }
        } else {
          message.error(res.data.message);
        }
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
        this.setState({ loading: false });
      });
  };
  componentDidMount() {
    console.log("this.props", this.props);
    console.log("this.props.location.state", this.props.location.state);
    // this.formRef.current.setFieldsValue({
    //   mobile_no: "00123456789",
    // });
    // return;
    if (!this.props.location.state) {
      // console.log("this.state", this.state);
      history.push("/register-property");
      return;
    }
    if (this.props.location.state.editData) {
      this.setState({ mobile_no: this.props.location.state.editData.phone });
      this.formRef.current.setFieldsValue({
        name: this.props.location.state.editData.name,
        mobile_no: this.props.location.state.editData.phone,
      });
    }

    // if (this.props.location.state.editData) {
    //   this.formRef.current.setFieldsValue({
    //     rent_price: this.props.location.state.editData.propertyRent,
    //     deposit: this.props.location.state.editData.propertyDeposite,
    //     sales_price: this.props.location.state.editData.propertyCost,
    //   });
    //}
  }

  render() {
    console.log("this.formRef", this.state);

    const {
      visible,
      noRegisteredModalvisible,
      loading,
      mem_name,
      mobile_no,
      verificationCodeLoading,
    } = this.state;

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <Layout className="register-property-layout">
        <WithAuthHeader />

        <Content>
          <Layout className="site-layout-background">
            <Space direction="vertical" size={"large"}>
              <Content className="content-padding">
                <Row className="">
                  <Col className="text-center cs-main-block">
                    <Row>
                      <Col className=" mb-15" span={24}>
                        <h2 className="cs-h2">본인인증</h2>
                      </Col>

                      <Col className="mb-15 cs-p-80" span={24}>
                        <Steps progressDot current={2} className="cs-step">
                          <Step title="1단계" description="" />
                          <Step title="2단계" subTitle="" description="" />
                          <Step title="3단계" description="" />
                        </Steps>
                      </Col>

                      <Col className=" mb-15" span={24}>
                        <h3 className="cs-h3">
                          마지막으로 본인 인증을 완료해주세요!
                        </h3>
                      </Col>
                    </Row>

                    <Divider />

                    <Form
                      // {...layout}
                      name="basic"
                      initialValues={{ remember: true }}
                      onFinish={this.onFinish}
                      onFinishFailed={onFinishFailed}
                      ref={this.formRef}
                    >
                      <Row>
                        <Col span={24} className="text-left cs-font-28 mb-15">
                          이름{" "}
                          <img
                            style={requiiredIconStyle}
                            src={requiredIcon}
                            className="cs-validation-dot"
                          />{" "}
                        </Col>
                        <Col className="text-left" span={24}>
                          <Form.Item
                            label=""
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "이름을 입력해 주세요!",
                              },
                            ]}
                            value={mem_name}
                            onChange={(e) =>
                              this.setState({ mem_name: e.target.value })
                            }
                          >
                            <Input placeholder="회원명" />
                          </Form.Item>
                        </Col>

                        <Col span={24} className="text-left cs-font-28 mb-15">
                          휴대폰 번호{" "}
                          <img
                            style={requiiredIconStyle}
                            src={requiredIcon}
                            className="cs-validation-dot"
                          />{" "}
                        </Col>
                        <Col className="text-left" span={24}>
                          <Form.Item
                            label=""
                            name="mobile_no"
                            rules={[
                              {
                                required: true,
                                message: "핸드폰 번호를 입력해 주세요!",
                              },
                            ]}
                            onChange={(e) => {
                              const mobileNumber = e.target.value.replaceAll(
                                "-",
                                ""
                              );
                              this.setState({ mobile_no: mobileNumber });
                            }}
                          >
                            {/* <MobileNumericInput
                              
                             
                              value={this.state.mobile_no}
                              placeholder="010-1234-5678"
                             
                              maxLength={11}
                            /> */}
                            <InputMask
                              style={{
                                width: "100%",
                                position: "relative",
                              }}
                              className="ant-input"
                              mask="099-9999-9999"
                              // onChange={this.onMobileChange}
                              placeholder="010-1234-5678"
                              maskChar=""
                              // value={"01023453554"}
                            />
                          </Form.Item>
                          <Button
                            loading={verificationCodeLoading}
                            className="cs-verification-button"
                            type="link"
                            onClick={this.getVerificationCode}
                            disabled={this.state.mobile_no == "" ? true : false}
                          >
                            {this.state.verificationBtn}
                          </Button>
                        </Col>

                        {/* <Col span={9} className="text-right"> */}

                        {/* </Col> */}

                        {this.state.showVerification ? (
                          <Col className="" span={24}>
                            <Col
                              span={24}
                              className="text-left cs-font-28 mb-15"
                            >
                              인증번호{" "}
                              <img
                                style={requiiredIconStyle}
                                src={requiredIcon}
                                className="cs-validation-dot"
                              />{" "}
                            </Col>
                            <Col
                              span={24}
                              className="text-left cs-font-28 mb-15"
                            >
                              <Form.Item
                                label=""
                                name="verification_code"
                                rules={[
                                  {
                                    required: true,
                                    message: "인증번호를 입력해 주세요!",
                                  },
                                ]}
                              >
                                <Input
                                  style={{
                                    width: "100%",
                                    position: "relative",
                                  }}
                                  className="cs-pr180"
                                  onChange={() =>
                                    this.setState({
                                      btndisable: false,
                                    })
                                  }
                                />
                              </Form.Item>
                              <Button
                                className="cs-verification-button"
                                style={{ width: "100px" }}
                                type="link"
                              >
                                {this.state.okBtn}
                              </Button>
                            </Col>
                          </Col>
                        ) : (
                          ""
                        )}

                        <Col span={24} className="mb-15 text-left">
                          <Form.Item>
                            <Button
                              loading={loading}
                              disabled={this.state.btndisable}
                              className="theme-btn cs-submit-button"
                              type="primary"
                              htmlType="submit"
                              style={{ width: "100%" }}
                            >
                              인증하기
                            </Button>
                          </Form.Item>
                        </Col>

                        {/* <Col span={24} className="mb-15 text-left">
                                                    <Form.Item >
                                                        <Button onClick={this.noRegisteredModalvisible} className="theme-btn" type="primary" style={{ 'width': '100%' }}>
                                                            Non Registered Modal
                                                        </Button>
                                                    </Form.Item>
                                                </Col> */}
                      </Row>{" "}
                      {/* Form row end */}
                    </Form>
                  </Col>
                </Row>

                <Modal
                  visible={visible}
                  title="매물등록에 동의하시나요?"
                  onOk={this.handleOkMember}
                  onCancel={this.handleCancel}
                  footer={null}
                  closable={false}
                  className="cs-popup cs-contract-agree-popup"
                >
                  <Row>
                    <p>
                      매물등록에 동의하시면 매물이 최종적으로 등록됩니다. 정말
                      매물등록에 동의하시나요?
                    </p>

                    <Space direction="vertical" className="width100">
                      <Col span={24}>
                        <Button
                          className="theme-btn cs-btn3"
                          key="submit"
                          type="default"
                          loading={loading}
                          onClick={this.handleOkMember}
                        >
                          모든 사항을 확인 후 동의합니다.
                        </Button>
                      </Col>

                      <Col span={24}>
                        <Button
                          key="back"
                          className="cs-btn4"
                          onClick={this.handleCancel}
                        >
                          아니오, 취소할게요.
                        </Button>
                      </Col>
                    </Space>
                  </Row>
                </Modal>

                {/* non-sign up user pop up  */}
                <Modal
                  visible={noRegisteredModalvisible}
                  title="매물등록이 완료되었습니다."
                  onOk={this.handleOkNonMember}
                  onCancel={this.handleCancel}
                  closable={false}
                  footer={null}
                  className="cs-popup cs-nm-contract-agree-popup"
                >
                  <Row>
                    <p>
                      담당자가 배정될 예정입니다.
                      <br />
                      배정이 완료되면 연락을 드리오니 기다려 주세요. :){" "}
                    </p>
                    <div className="desc">
                      *회원가입을 하시면 내가 등록한 매물의 정보와 진행상황을
                      확인하실 수 있습니다.*{" "}
                    </div>
                    <Space direction="vertical" className="width100">
                      <Col span={24}>
                        <Button
                          className="theme-btn cs-btn3"
                          key="submit"
                          type="default"
                          loading={loading}
                          onClick={this.handleOkNonMember}
                        >
                          네, 확인했습니다. 홈으로 돌아가기
                        </Button>
                      </Col>

                      <Col span={24}>
                        <Button
                          key="back"
                          className="cs-btn4"
                          onClick={this.handleCancel}
                        >
                          아니오, 취소할게요.
                        </Button>
                      </Col>
                    </Space>
                  </Row>
                </Modal>
              </Content>
            </Space>
          </Layout>
        </Content>

        <WithAuthFooter />
      </Layout>
    );
  }
}

export default RegisterPropertyStepThree;
