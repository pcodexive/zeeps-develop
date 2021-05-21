import React, { Component } from "react";

import { Layout, Form, Input, Button, Checkbox, Divider } from "antd";

import "../css/global.css";
import "antd/dist/antd.css";
import "./showemailaddress.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import WithoutAuthHeader from "../WithoutAuthHeaderFooter/WithoutAuthHeader";
import WithoutAuthFooter from "../WithoutAuthHeaderFooter/WithoutAuthFooter";
import LoginFormFooter from "../WithoutAuthHeaderFooter/LoginFormFooter";
import history from "../RegisterProperty/history";
const { Content } = Layout;

function GoBack() {
  window.history.back();
}

class ShowEmailAddress extends Component {
  state = {
    email: "",
  };

  componentDidMount(props) {
    if (this.props.location.state.userEmail != "undefined") {
      console.log("property_id", this.props.location.state.userEmail);
      this.setState({
        email: this.props.location.state.userEmail,
      });
    }
  }

  render() {
    return (
      <Layout className="login-bg cs-show-email">
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
              <h1 className="cs-form2-title">
              고객님의 이메일정보입니다.
                <br />
                로그인 해주세요!
              </h1>

              <p className="cs-email-value">
                {this.state.email ? this.state.email : "-"}
              </p>

              <Button
                block
                type="primary"
                shape="round"
                htmlType="submit"
                className="login-btn-bg cs-form2-btn"
                onClick={() => history.push("/login")}
              >
                로그인하기
              </Button>

              {/* <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        >
                        <Form.Item
                            label=""
                            name="mobile_number"
                            rules={[{ required: true, message: '핸드폰 번호를 입력해 주세요!' }]}

                        >
                            <Input placeholder="Mobile Number" className="login-input" />
                        </Form.Item>

                        <Form.Item
                            label=""
                            name="verify_number"
                            rules={[{ required: true, message: '인증번호를 입력해 주세요!' }]}
                        >
                            <Input placeholder="Verify Number" className="login-input" />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button block type="primary" shape="round" htmlType="submit" className="login-btn-bg">
                            Find Password
                            </Button>
                        </Form.Item>
                    </Form> */}

              {/* <LoginFormFooter /> */}
            </div>
          </Row>
        </Content>

        <WithoutAuthFooter />
      </Layout>
    );
  }
}

export default ShowEmailAddress;
