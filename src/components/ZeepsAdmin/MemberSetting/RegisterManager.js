import React, { Component, useState } from "react";

import {
  Layout,
  Form,
  Input,
  Button,
  Menu,
  message,
  DatePicker,
  Divider,
  Switch,
  Select,
} from "antd";

import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

import BaseUrl from "../../services/axios-url";
import TopNav from "../WithAuthHeaderFooter/TopNav";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";
import MemberSettingsAside from "./member-settings-aside";

const axios = require("axios");

const { Content } = Layout;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const compLayout = {
  labelCol: { span: 4 },
  wrapperCol: { offset: 0, span: 20 },
};
const regLayout = {
  labelCol: { span: 8 },
  wrapperCol: { offset: 0, span: 23 },
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function GoBack() {
  window.history.back();
}

class RegisterManager extends Component {
  formRef = React.createRef();

  state = {
    loading: false,
    status: true,
    email_front: "",
    email_domain: "@",
    email_extension: "",
  };

  onStatusChange = (checked) => {
    // console.log(`switch to ${checked}`);
    this.setState({
      status: checked,
    });
  };
  onEmailExtensionChange = (value) => {
    console.log("e.target", value);
    // this.setState({
    //   email_domain: this.state.email_domain + value,
    // });

    this.formRef.current.setFieldsValue({
      email_domain: "@" + value,
    });
  };
  onFinish = (values) => {
    this.setState({ loading: true });
    console.log("Success:", values);
    const email = values.email_front + values.email_domain;
    axios
      .post(BaseUrl + "/adminapi/InsertNewManager", {
        name: values.name,
        mobile: values.mobile,
        email: email,
        password: values.password,
        status: this.state.status,
        address: values.address,
        detailAddress: values.detailAddress,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          message.success("매물이 성공적으로 등록되었습니다.");
          this.formRef.current.resetFields();
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  };

  render() {
    const { loading } = this.state;
    const { Option } = Select;

    return (
      <Layout>
        <TopNav />

        <Content>
          <Layout className="site-layout-background">
            <MemberSettingsAside />

            <Content className="cs-admin-basic-block">
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={onFinishFailed}
                ref={this.formRef}
              >
                <Row>
                  <Col
                    className="cs-admin-basic-info flex-center"
                    xs={{ span: 24 }}
                    sm={{ span: 12 }}
                    lg={{ span: 12 }}
                  >
                    <p className="m-0">담당자 등록 </p>
                    {/* <p>Register manager </p> */}
                  </Col>

                  <Col
                    className="cs-admin-basic-info-button cs-admin-member-registration"
                    xs={{ span: 24 }}
                    sm={{ span: 12 }}
                    lg={{ span: 12 }}
                  >
                    <Button
                      loading={loading}
                      type="primary"
                      className="theme-btn float-right"
                      shape="round"
                      htmlType="submit"
                    >
                      담당자 저장
                    </Button>

                    <Button
                      className="theme-btn-default float-right"
                      shape="round"
                      style={{ marginRight: "20px" }}
                    >
                      <Link to="/managing-manager">담당자 목록</Link>
                    </Button>
                  </Col>

                  <Divider className="cs-admin-basic-divider" />

                  <Col className="cs-admin-company" xs={{ span: 24 }}>
                    기본 정보
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      className="cs-admin-form-input"
                      {...compLayout}
                      label="담당자 이름"
                      name="name"
                      rules={[
                        { required: true, message: "이름을 입력해 주세요!" },
                      ]}
                    >
                      <Input placeholder="이름을 입력해주세요." />
                    </Form.Item>
                  </Col>

                  <Col
                    className="manage-password-form"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                  >
                    <Form.Item
                      className="cs-admin-form-input ant-input-password"
                      style={{ borderRadius: 0 }}
                      {...regLayout}
                      label="비밀번호(필수)"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "비밀번호를 입력해 주세요!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="비밀번호를 입력해주세요."
                        className="cs-admin-password-input"
                      />
                    </Form.Item>
                  </Col>

                  <Col
                    className="manage-password-form"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                  >
                    <Form.Item
                      {...regLayout}
                      className="cs-admin-form-input ant-input-password"
                      style={{ borderRadius: 0 }}
                      name="confirm"
                      label="비밀번호 확인"
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "비밀번호를 확인해주세요",
                        },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              "비밀번호가 일치하지 않습니다!"
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        placeholder="비밀번호를 확인해주세요."
                        className="cs-admin-password-input"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...regLayout}
                      className="cs-admin-form-input"
                      label="휴대폰 번호"
                      name="mobile"
                      rules={[
                        {
                          required: true,
                          message: "핸드폰 번호를 입력해 주세요!",
                        },
                      ]}
                    >
                      <Input placeholder="입력해주세요." />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...regLayout}
                      className="cs-admin-form-input"
                      label="담당자 활성화"
                      name="activation_status"
                      rules={[
                        {
                          required: true,
                          message: "계약상태를 선택해주세요",
                        },
                      ]}
                    >
                      <Switch
                        onChange={this.onStatusChange}
                        style={{ margin: "15px 20px" }}
                      />
                    </Form.Item>
                  </Col>

                  <Col
                    className="cs-admin-form-input cs-admin-registermember-email-input"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Form.Item label="이메일">
                      <Input.Group compact style={{ paddingLeft: "20px" }}>
                        <Form.Item
                          {...compLayout}
                          style={{ margin: "35px 0" }}
                          name="email_front"
                          rules={[
                            {
                              required: true,
                              message: "이메일 주소를 입력해주세요 ",
                            },
                          ]}
                        >
                          <Input placeholder="이메일" />
                        </Form.Item>
                        <Form.Item
                          {...compLayout}
                          style={{ paddingLeft: "5px", margin: "35px" }}
                          name="email_domain"
                          // onChange={this.onEmailDomainChange}
                          rules={[
                            {
                              required: true,
                              message: "이메일 주소를 입력해주세요 ",
                            },
                          ]}
                        >
                          <Input placeholder="선택해주세요." defaultValue="@" />
                        </Form.Item>
                        <Form.Item
                          style={{ paddingLeft: "5px", margin: "35px 0" }}
                          name="email_extension"
                          rules={[
                            {
                              required: true,
                              message: "선택해주세요",
                            },
                          ]}
                        >
                          <Select
                            placeholder="선택해주세요."
                            onChange={this.onEmailExtensionChange}
                          >
                            <Option value="naver.com">naver.com</Option>
                            <Option value="hanmail.com">hanmail.com</Option>
                            <Option value="gmail.com">gmail.com</Option>
                          </Select>
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>

                  <Col
                    className="cs-admin-form-input with-border cs-admin-register-inner"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Form.Item label="주소">
                      <Input.Group
                        style={{ display: "flex", paddingLeft: "20px" }}
                      >
                        <Form.Item
                          {...compLayout}
                          name="address"
                          className="m-0"
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          className="m-0"
                          {...compLayout}
                          name="detailAddress"
                          style={{ paddingLeft: "5px", margin: "35px" }}
                          // onChange={this.onEmailDomainChange}
                        >
                          <Input />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Content>
          </Layout>
        </Content>

        <WithAuthFooter />
      </Layout>
    );
  }
}

export default RegisterManager;
