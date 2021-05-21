import React, { Component } from "react";

import { Layout, Form, Input, Button, Tabs, message } from "antd";

import "../css/global.css";
import "antd/dist/antd.css";
import "./findpassword.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import { Row, Col } from "antd";
import WithoutAuthHeader from "../WithoutAuthHeaderFooter/WithoutAuthHeader";
import WithoutAuthFooter from "../WithoutAuthHeaderFooter/WithoutAuthFooter";
import LoginFormFooter from "../WithoutAuthHeaderFooter/LoginFormFooter";
import BaseUrl from "../services/axios-url";
import Cookies from "universal-cookie";

const axios = require("axios");

const { Content } = Layout;
const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

function GoBack() {
  window.history.back();
}

class FindPassword extends Component {
  state = {
    mem_name: "",
    mobile_no_for_email_used: "",
    redirectToGetEmail: false,
    userEmail: "",
    mobile_no_for_password: "",
    redirectToChangePassword: false,
    verificationCodeLoadingForEmail: false,
    verificationCodeLoadingForPassword: false,
  };

  getVerificationCodeForEmail = () => {
    console.log(this.state.mem_name);
    console.log(this.state.mobile_no_for_email);

    if (this.state.mem_name == "" || this.state.mobile_no_for_email == "") {
      message.error("이름과 핸드폰 번호를 정확히 입력해주세요");
      return;
    }
    this.setState({
      verificationCodeLoadingForEmail: true,
    });

    axios
      .post(BaseUrl + "/memberapi/SendOTPMember", {
        name: this.state.mem_name,
        mobile: this.state.mobile_no_for_email, // this.state.mobile_no_for_email
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          message.success("인증번호가 발송되었습니다.");
          this.setState({
            showVerification: true, // show the textbox
            // visible: true,           // show the modal
          });
        } else {
          //   console.log("-------------->", res.data.message);
          message.error(res.data.message);
        }
        this.setState({
          verificationCodeLoadingForEmail: false,
        });
      })
      .catch((error) => {
        console.log(error);
        // console.log("-------------->", res.data.message);
        message.error("다시 시도해주세요.");
        this.setState({
          verificationCodeLoadingForEmail: false,
        });
      });
  };

  onFinish = (values) => {
    console.log("Success:", values);

    var mobile = values.mobile_number.toString();
    var verificationcode = values.verify_number.toString();

    axios
      .post(BaseUrl + "/memberapi/ConfirmOTPEmailResetPassword", {
        mobile: mobile,
        verificationcode: verificationcode,
        mode: "2",
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          message.success("인증이 완료되었습니다.");

          this.setState({ userEmail: res.data.data.email }, () => {});

          this.setState({ redirectToGetEmail: true });

          // const cookies = new Cookies();
          // var cookieName = btoa('zeeps');
          // // console.log('encodedStringBtoA', cookieName);
          // var finalCookieName = '';
          // finalCookieName = cookieName.replace('=', 'aAaA')

          // var encodedStringBtoA = btoa('authorized');
          // // console.log('encodedStringBtoA', encodedStringBtoA);
          // var finalCookieValue = '';
          // finalCookieValue = encodedStringBtoA.replace('==', 'aAaA')

          // // already logged in user
          // if (cookies.get(finalCookieName) == finalCookieValue) {
          //     this.setState({
          //         visible: true,           // show the modal
          //     })
          // }
          // // Not logged in user
          // else if (cookies.get(finalCookieName) == undefined || cookies.get(finalCookieName) == 'undefined') {
          //     this.setState({
          //         noRegisteredModalvisible: true,           // show the non member modal
          //     })
          // }
          // // Not a normal user
          // else {
          //     message.error('Unauthenticated User!')
          //     return;
          // }
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

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("에러입니다.");
  };

  getVerificationCodeForPassword = () => {
    //console.log(this.state.mobile_no_for_password);

    if (this.state.mobile_no_for_password == "") {
      message.error("핸드폰 번호를 입력해주세요");
      return;
    }
    this.setState({
      verificationCodeLoadingForPassword: true,
    });

    axios
      .post(BaseUrl + "/memberapi/SendOTPFindPassword", {
        mobile: this.state.mobile_no_for_password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          message.success("인증번호가 발송되었습니다.");
          this.setState({
            showVerification: true, // show the textbox
            // visible: true,           // show the modal
          });
        } else {
          message.error(res.data.message);
        }
        this.setState({
          verificationCodeLoadingForPassword: false,
        });
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
        this.setState({
          verificationCodeLoadingForPassword: false,
        });
      });
  };

  onFinishPassword = (values) => {
    console.log("Success:", values);

    var mobile = values.mobile.toString();
    var verificationcode = values.verify_number.toString();

    axios
      .post(BaseUrl + "/memberapi/ConfirmOTPEmailResetPassword", {
        mobile: mobile,
        verificationcode: verificationcode,
        mode: "1",
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          message.success("인증이 완료되었습니다.");

          this.setState({ userIdForPassReset: res.data.data.id }, () => {});

          this.setState({ redirectToChangePassword: true });
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

  render() {
    console.log("-------------->", this.state);
    const {
      mem_name,
      mobile_no_for_email,
      verificationCodeLoadingForEmail,
      verificationCodeLoadingForPassword,
      mobile_no_for_password,
      userEmail,
      userIdForPassReset,
    } = this.state;
    // {
    //   console.log("this.props", this.props.location.state.mode);
    // }
    if (this.state.redirectToGetEmail) {
      return (
        <Redirect
          to={{
            pathname: "/show-email-addresss",
            state: { userEmail: userEmail },
          }}
        />
      );
    }

    if (this.state.redirectToChangePassword) {
      return (
        <Redirect
          to={{
            pathname: "/change-password",
            state: { userId: userIdForPassReset },
          }}
        />
      );
    }

    return (
      <Layout className="login-bg cs-form2 cs-find-pass-email">
        <WithoutAuthHeader />

        <Content className="login-content cs-content-wrapper">
          <Row className="cs-form-outer">
            <div className="cs-back-btn">
              <Button
                type="default"
                icon={<ArrowLeftOutlined />}
                size="large"
                shape="circle"
                onClick={GoBack}
              />
            </div>

            <div className="form2-main">
              <div className="cs-form2-title-wrapper">
              <svg width="90" height="50" viewBox="0 0 90 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0322 38.957L24.9821 27.8843V27.8022H17.4965V24.1113H30.8556V27.6108L22.8784 38.7108V38.7928H30.8283V42.4837H17.0322V38.957Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M35.6432 33.9806H39.9051C39.9051 31.9303 39.2219 31.1921 37.856 31.1921C36.8179 31.1921 35.8344 31.7934 35.6432 33.9806ZM30.9443 35.5663V35.2109C30.9443 30.8639 33.6488 28.1299 37.856 28.1299C42.5822 28.1299 44.358 30.7819 44.358 35.4023V36.6052H35.6705C35.9437 38.8199 37.2004 39.4486 39.5771 39.4486C41.2435 39.4486 42.6916 39.0385 43.7842 38.6011V41.4716C42.7188 42.1006 40.9703 42.7294 38.3751 42.7294C33.3756 42.7294 30.9443 40.2142 30.9443 35.5663Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M49.8116 33.9806H54.0733C54.0733 31.9303 53.3904 31.1921 52.0245 31.1921C50.9865 31.1921 50.0029 31.7934 49.8116 33.9806ZM45.1128 35.5663V35.2109C45.1128 30.8639 47.8173 28.1299 52.0245 28.1299C56.7508 28.1299 58.5265 30.7819 58.5265 35.4023V36.6052H49.8391C50.1123 38.8199 51.3689 39.4486 53.7455 39.4486C55.4122 39.4486 56.8598 39.0385 57.9527 38.6011V41.4716C56.8873 42.1006 55.1388 42.7294 52.5436 42.7294C47.5441 42.7294 45.1128 40.2142 45.1128 35.5663Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M69.411 35.785V35.3474C69.411 32.4222 68.5093 31.7113 66.9249 31.7113C65.9689 31.7113 65.2312 31.9847 64.8213 32.2581V39.0384C65.2312 39.3119 65.9689 39.5578 66.761 39.5578C68.4276 39.5578 69.411 38.8198 69.411 35.785ZM60.1772 28.4032H64.6575V29.5789H64.794C65.7228 28.6766 66.9797 28.1572 68.8646 28.1572C71.5964 28.1572 74.1646 29.7701 74.1646 34.9101V35.2382C74.1646 40.7881 71.5146 42.7292 67.6626 42.7292C66.242 42.7292 65.3404 42.456 64.8213 42.2371V46.5841H60.1772V28.4032Z" fill="white"/>
                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="75" y="28" width="12" height="15">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M75.3237 28.1299H86.4154V42.7293H75.3237V28.1299Z" fill="white"/>
                </mask>
                <g mask="url(#mask0)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M75.4059 41.7997V38.6829C76.4984 39.0931 77.6734 39.5033 79.5856 39.5033C81.2793 39.5033 81.9622 39.0931 81.9622 38.3276C81.9622 37.6441 81.5523 37.3982 80.3503 37.2613L79.0666 37.0701C76.6623 36.7148 75.3237 35.4022 75.3237 32.6683C75.3237 29.8524 77.1814 28.1299 81.088 28.1299C83.1095 28.1299 84.4757 28.4033 85.5412 28.8681V31.9574C84.6397 31.6842 83.3556 31.3287 81.6892 31.3287C80.296 31.3287 79.6401 31.6842 79.6401 32.4223C79.6401 33.1057 80.132 33.3519 81.252 33.5159L82.5634 33.6799C85.4044 34.0625 86.4155 35.5937 86.4155 38.0268C86.4155 41.1161 84.4757 42.7293 80.2685 42.7293C78.3836 42.7293 76.5258 42.3738 75.4059 41.7997Z" fill="white"/>
                </g>
                <mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="3" width="41" height="40">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 3.10254H42.4811V42.4739H2V3.10254Z" fill="white"/>
                </mask>
                <g mask="url(#mask1)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M42.4811 14.55L22.2486 3.10254L2 14.55V42.4739H13.6992V36.177H8.02327V18.7711L22.2469 10.8631L27.8278 13.794L36.4579 18.3263V22.0821H42.4811V14.55Z" fill="white"/>
                </g>
                </svg>

                <h1 className="cs-form2-title cs-title1">사이트에 오신걸 </h1>
              </div>
              <h1 className="cs-form2-title">환영합니다!</h1>

              <Tabs defaultActiveKey="1" className="findpass-tab" centered>
                <TabPane
                  tab="&nbsp; 비밀번호 찾기 &nbsp;"
                  key={this.props.location.state.mode == 1 ? 1 : 2}
                >
                  <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinishPassword}
                    onFinishFailed={this.onFinishFailed}
                  >
                    {/* <Form.Item
                                            label=""
                                            name="mobile_number"
                                            rules={[{ required: true, message: '핸드폰 번호를 입력해 주세요!' }]}

                                        >
                                            <Input placeholder="Mobile Number" className="login-input" />
                                        </Form.Item> */}
                    <Row className="cs-dcinput-wrapper">
                      <Col xs={24} sm={24} lg={24}>
                        <Form.Item
                          label=""
                          name="mobile"
                          rules={[
                            {
                              required: true,
                              message: "핸드폰 번호를 입력해 주세요!",
                            },
                          ]}
                          value={mobile_no_for_password}
                          onChange={(e) =>
                            this.setState({
                              mobile_no_for_password: e.target.value,
                            })
                          }
                        >
                          <Input
                            placeholder="휴대폰번호를 입력해주세요."
                            className="login-input cs-input2"
                          />
                        </Form.Item>
                        <Button
                          loading={verificationCodeLoadingForPassword}
                          className="theme-btn cs-form2-btn2"
                          onClick={this.getVerificationCodeForPassword}
                        >
                          인증번호 보내기
                        </Button>
                      </Col>
                    </Row>
                    <Form.Item
                      label=""
                      name="verify_number"
                      rules={[
                        {
                          required: true,
                          message: "인증번호를 입력해 주세요!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="인증번호를 입력해주세요."
                        className="login-input cs-input2"
                      />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                      <Button
                        block
                        type="primary"
                        shape="round"
                        htmlType="submit"
                        className="login-btn-bg cs-form2-btn"
                      >
                        비밀번호 찾기
                      </Button>
                    </Form.Item>
                  </Form>
                </TabPane>

                <TabPane
                  tab="&nbsp; 이메일 찾기 &nbsp;"
                  key={this.props.location.state.mode == 2 ? 1 : 2}
                >
                  <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                  >
                    <Form.Item
                      label=""
                      name="name"
                      rules={[
                        { required: true, message: "이름을 입력해 주세요!" },
                      ]}
                      value={mem_name}
                      onChange={(e) =>
                        this.setState({ mem_name: e.target.value })
                      }
                    >
                      <Input
                        placeholder="이름을 입력해주세요."
                        className="login-input cs-input2"
                      />
                    </Form.Item>

                    <Row className="cs-dcinput-wrapper">
                      <Col xs={24} sm={24} lg={24}>
                        <Form.Item
                          label=""
                          name="mobile_number"
                          rules={[
                            {
                              required: true,
                              message: "핸드폰 번호를 입력해 주세요!",
                            },
                          ]}
                          value={mobile_no_for_email}
                          onChange={(e) =>
                            this.setState({
                              mobile_no_for_email: e.target.value,
                            })
                          }
                        >
                          <Input
                            placeholder="휴대폰번호를 입력해주세요."
                            className="login-input cs-input2"
                          />
                        </Form.Item>
                        <Button
                          loading={verificationCodeLoadingForEmail}
                          className="theme-btn cs-form2-btn2"
                          onClick={this.getVerificationCodeForEmail}
                        >
                          인증번호 보내기
                        </Button>
                      </Col>
                    </Row>

                    <Form.Item
                      label=""
                      name="verify_number"
                      rules={[
                        {
                          required: true,
                          message: "인증번호를 입력해 주세요!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="인증번호를 입력해주세요."
                        className="login-input cs-input2"
                      />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                      <Button
                        block
                        type="primary"
                        shape="round"
                        htmlType="submit"
                        className="login-btn-bg cs-form2-btn"
                      >
                        이메일 찾기
                      </Button>
                    </Form.Item>
                  </Form>
                </TabPane>
              </Tabs>

              {/* <LoginFormFooter /> */}
            </div>
          </Row>
        </Content>

        <WithoutAuthFooter />
      </Layout>
    );
  }
}

export default FindPassword;
