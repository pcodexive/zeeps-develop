import React, { Component } from "react";
import WithAuthHeader from "../WithAuthHeaderFooter/WithAuthHeader";
import {
  Layout,
  Form,
  Input,
  Button,
  Menu,
  Divider,
  Row,
  Col,
  Space,
  Steps,
  message,
} from "antd";
import "antd/dist/antd.css";
import "../css/global.css";
import "./Resetpassword.css";
import { Redirect } from "react-router-dom";
import BaseUrl from "../services/axios-url";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";
import Cookies from "universal-cookie";
// import coloredLogo from '../images/color-logo.svg';
import logoRound from "../images/logo-round.svg";

const axios = require("axios");
const { Content } = Layout;

class ResetPasswordAfterLogin extends Component {
  state = {
    loading: false,
    visible: false,
    redirectToLoginPage: false,
    username: "",
  };

  onFinish = (values) => {
    console.log("Success:", values);

    this.setState({ loading: true });

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
    var LoggedInUserId = "";
    if (cookies.get(finalCookieName) == finalCookieValue) {
      if (cookies.get("UU")) {
        var LoggedInUserId = cookies.get("UU");
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
      message.error("비밀번호 변경을 위해 로그인 해주세요.");
      return;
    }
    // Not a normal user
    else {
      message.error("로그인 해주세요.");
      return;
    }

    axios
      .post(BaseUrl + "/memberapi/ChangePassword", {
        id: LoggedInUserId,
        oldpassword: values.old_password,
        password: values.password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          message.success("비밀번호가 변경되었습니다.");

          cookies.remove(finalCookieName);
          cookies.remove("UU");
          cookies.remove("UN");

          this.setState({ redirectToLoginPage: true });
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
    const cookies = new Cookies();
    this.setState({
      username: cookies.get("UN"),
    });
  }

  render() {
    if (this.state.redirectToLoginPage) {
      return (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      );
    }

    const { loading, username } = this.state;

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
                        <img
                          src={logoRound}
                          width="90"
                          className="csd-round-logo"
                        />
                      </Col>

                      <Col className="cs-username-p mb-15" span={24}>
                        {username}
                      </Col>
                    </Row>

                    <Form
                      // {...layout}
                      name="basic"
                      initialValues={{ remember: true }}
                      onFinish={this.onFinish}
                      className="manage-password-form"
                      onFinishFailed={onFinishFailed}
                    >
                      <Divider />
                      <Form.Item
                        className="text-left mb-15"
                        label=""
                        name="old_password"
                        rules={[
                          {
                            required: true,
                            message: "이전 비밀번호를 입력해주세요",
                          },
                        ]}
                      >
                        <Input.Password placeholder="현재 비밀번호를 입력해주세요." />
                      </Form.Item>

                      <Form.Item
                        className="text-left mb-15"
                        label=""
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "새로운 비밀번호를 입력해주세요",
                          },
                        ]}
                      >
                        <Input.Password placeholder="새 비밀번호를 입력해주세요." />
                      </Form.Item>

                      <Form.Item
                        className="text-left mb-15"
                        name="confirm"
                        label=""
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "새로운 비밀번호를 확인해주세요",
                          },
                          ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                "비밀번호가 일치하지 않습니다!"
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password placeholder="새 비밀번호를 확인해주세요." />
                      </Form.Item>

                      <Divider />
                      <Button
                        loading={loading}
                        block
                        type="primary"
                        htmlType="submit"
                        className="theme-btn cs-submit-button"
                      >
                        정보 변경하기
                      </Button>
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

export default ResetPasswordAfterLogin;
