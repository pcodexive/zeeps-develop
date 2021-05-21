import React, { Component } from "react";

import { Layout } from "antd";

import "../css/global.css";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

const { Content } = Layout;

class LoginFormFooter extends Component {
  state = {};

  render() {
    return (
      <Layout className="login-bg">
        <Content className="login-content">
          <Row className="cs-form2-link-wrapper">
            {window.location.pathname == "/register" ? (
              <Link to="/login" className="cs-form2-link">
                {/* Login  */}
                로그인
              </Link>
            ) : (
              <Link to="/register" className="cs-form2-link">
                {/* Register  */}
                회원가입
              </Link>
            )}

            <Link
              to={{
                pathname: "/find-password-and-email",
                state: { mode: 1 },
              }}
              className="cs-form2-link"
            >
              {/* Find password  */}
              비밀번호 찾기
            </Link>

            <Link
              to={{
                pathname: "/find-password-and-email",
                state: { mode: 2 },
              }}
              className="cs-form2-link"
            >
              {/* Find email address  */}
              이메일 찾기
            </Link>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default LoginFormFooter;
