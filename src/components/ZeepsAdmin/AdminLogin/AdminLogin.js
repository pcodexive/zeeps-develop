import React, { Component } from "react";

import { Layout, Form, Input, Button, message } from "antd";

import "../css/login.css";
import "antd/dist/antd.css";
import "./adminlogin.css";
import { Row, Col } from "antd";

import WithoutAuthHeader from "../WithoutAuthHeaderFooter/WithoutAuthHeader";
import WithoutAuthFooter from "../WithoutAuthHeaderFooter/WithoutAuthFooter";
import BaseUrl from "../../services/axios-url";
import Cookies from "universal-cookie";
import logo from "../../images/admin-portal-logo.png";

const axios = require("axios");

const { Content } = Layout;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function GoBack() {
  window.history.back();
}

class AdminLogin extends Component {
  constructor(props) {
    super(props);

    const cookies = new Cookies();

    if (cookies.get("SXNBdXRob3JpemVkQWRtaW4aS") == "SXRzVHJ1ZQSaA") {
      // console.log('encodedStringtrue')
      this.props.history.push("/basic-settings");
    }
  }

  state = {
    loading: false,
  };

  onFinish = (values) => {
    this.setState({ loading: true });
    // const data = new FormData()
    // data.append('email', values.email)
    // data.append('password', values.password)

    axios
      .post(BaseUrl + "/adminapi/login", {
        // axios.post("https://zeepsapis.herokuapp.com/adminapi/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log(res);

        this.setState({ loading: false });

        // console.log(cookiess.get('QXV0aA'))

        if (res.data.status == 0 || res.data.status == "0") {
          message.error("잘못된 비밀번호입니다.");
          return;
        }

        if (res.data.status == 1 || res.data.status == "1") {
          message.success("로그인 되었습니다.");
          const cookiess = new Cookies();

          var name = window.btoa("IsAuthorizedAdmin");
          var value = window.btoa("ItsTrue");
          var cookName = name.replace("=", "aS");
          var valueName = value.replace("==", "SaA");

          cookiess.set(cookName, valueName, { path: "/" });

          if (cookiess.get("SXNBdXRob3JpemVkQWRtaW4aS") == "SXRzVHJ1ZQSaA") {
            console.log("okoko");
          }

          this.props.history.push("/basic-settings");
        }
      });
  };

  componentDidMount() {}

  render() {
    const { loading } = this.state;

    return (
      <Layout className="login-bg cs-form2 cs-admin-login">
        <WithoutAuthHeader />

        <Content className="login-content cs-content-wrapper">
          <Row>
            {/* <Col xs={{ span: 24 }} sm={{ span:12, offset:6 }} lg={{ span: 2, offset: 6 }} >
                            <Button type="default" icon={<ArrowLeftOutlined />} size='large' shape="circle" onClick={GoBack} />
                            
                        </Col> */}

            <div className="form2-main">
              {/* <h1 className="text-white">Zeeps</h1> */}
              <img src={logo} className="cs-site-logo" />

              <h3 className="cs-aform-title">관리자 로그인</h3>
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label=""
                  name="email"
                  rules={[
                    { required: true, message: "이메일을 입력해 주세요!" },
                  ]}
                >
                  <Input
                    placeholder="이메일을 입력해주세요."
                    className="login-input cs-input2"
                  />
                </Form.Item>

                <Form.Item
                  label=""
                  name="password"
                  rules={[
                    { required: true, message: "비밀번호를 입력해 주세요!" },
                  ]}
                >
                  <Input.Password
                    placeholder="비밀번호를 입력해주세요."
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
                    로그인하기
                  </Button>
                </Form.Item>
              </Form>
              {/* <LoginFormFooter /> */}
            </div>
          </Row>
        </Content>

        {/* <WithoutAuthFooter /> */}
      </Layout>
    );
  }
}

export default AdminLogin;
