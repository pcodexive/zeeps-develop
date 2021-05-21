import React, { Component } from "react";

import {
  Layout,
  Form,
  Input,
  Button,
  Checkbox,
  Menu,
  Divider,
  message,
  Select,
} from "antd";

import "antd/dist/antd.css";
import { Link, withRouter } from "react-router-dom";
import { Row, Col } from "antd";

import BaseUrl from "../../services/axios-url";
import TopNav from "../WithAuthHeaderFooter/TopNav";
import BasicSettingsAside from "./basic-settings-aside";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";
import Cookies from "universal-cookie";

const axios = require("axios");
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const compLayout = {
  labelCol: { span: 8 },
  wrapperCol: { offset: 0, span: 20 },
};
const regLayout = {
  labelCol: { span: 10 },
  wrapperCol: { offset: 0, span: 20 },
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
  message.error("S에러입니다.");
};

function GoBack() {
  window.history.back();
}

class BasicSettings extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    size: "large",
    email_front: "",
    email_domain: "@",
    email_extension: "",
  };

  formRef = React.createRef();
  onEmailExtensionChange = (value) => {
    console.log("e.target", value);
    // this.setState({
    //   email_domain: this.state.email_domain + value,
    // });

    this.formRef.current.setFieldsValue({
      email_domain: "@" + value,
    });
  };
  componentDidMount() {
    axios
      .get(BaseUrl + "/adminapi/GetCompanydetail/1")
      .then((response) => {
        var data = response.data;
        // console.log('data->', data.data)
        if (data.status == 1 || data.status == "1") {
          console.log("dddd: ", data.data.email);

          const email = data.data.email.split("@");
          this.formRef.current.setFieldsValue({
            company_name: data.data.companyname,
            registration_number: data.data.businesslicencenumber,
            ceo: data.data.ownername,
            email_front: email[0],
            email_domain: "@" + email[1],
            email_extension: email[1],
            company_address: data.data.companyaddress,
            postcode: data.data.postcode,
            mail_report_no: data.data.telemarketingregisternumber,
            service_center_number: data.data.servicecenternumber,
          });
        } else {
          message.error("다시 시도해주세요.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onFinish = (values) => {
    console.log("Success:", values);
    const email = values.email_front + values.email_domain;
    axios
      .post(BaseUrl + "/adminapi/UpdateCompanyDetail", {
        id: 1,
        companyname: values.company_name,
        email: email,
        businesslicencenumber: values.registration_number,
        ownername: values.ceo,
        telemarketingregisternumber: values.mail_report_no,
        servicecenternumber: values.service_center_number,
        companyaddress: values.company_address,
        postcode: values.postcode,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          message.success("업데이트가 되었습니다.");
        }
      });
  };

  render() {
    const { size } = this.state;
    const { Option } = Select;
    return (
      <Layout>
        <TopNav />
        <Content>
          <Layout className="site-layout-background">
            <BasicSettingsAside />

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
                    xs={{ span: 20 }}
                    sm={{ span: 20 }}
                    lg={{ span: 20 }}
                    className="flex-center cs-admin-basic-info"
                  >
                    <p className="m-0">기본정보 설정</p>
                  </Col>

                  <Col
                    className="flex-center cs-admin-basic-info-button"
                    xs={{ span: 4 }}
                    sm={{ span: 4 }}
                    lg={{ span: 4 }}
                  >
                    <Form.Item>
                      <Button
                        type="primary"
                        className="theme-btn float-right"
                        htmlType="submit"
                        shape="round"
                        size={size}
                      >
                        저장
                      </Button>
                    </Form.Item>
                  </Col>

                  <Divider className="cs-admin-basic-divider" />

                  <Col className="cs-admin-company" span={24}>
                    회사 정보
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 12 }}>
                    <Form.Item
                      className="cs-admin-form-input"
                      {...compLayout}
                      label="상호(회사명)"
                      name="company_name"
                      rules={[
                        {
                          required: false,
                          message: "Please input your Company Name!",
                        },
                      ]}
                    >
                      <Input placeholder="(주)집스" />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 12 }}>
                    <Form.Item
                      className="cs-admin-form-input"
                      {...regLayout}
                      label="사업자등록번호"
                      name="registration_number"
                      rules={[
                        {
                          required: false,
                          message: "Please input your Registarion number!",
                        },
                      ]}
                    >
                      <Input placeholder="000-00-0000" />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      className="cs-admin-form-input"
                      label="대표자명"
                      name="ceo"
                      rules={[
                        { required: false, message: "Please input CEO!" },
                      ]}
                    >
                      <Input placeholder="고차남" />
                    </Form.Item>
                  </Col>

                  <Col
                    className="cs-admin-form-input cs-admin-registermember-email-input"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Form.Item className="" label="이메일">
                      <Input.Group compact style={{ paddingLeft: "20px" }}>
                        <Form.Item
                          style={{ paddingLeft: "5px", margin: "35px 0 0 0" }}
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
                          style={{
                            paddingLeft: "5px",
                            margin: "35px 35px 0 35px",
                          }}
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
                          name="email_extension"
                          style={{ paddingLeft: "5px", margin: "35px 0 0 0" }}
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
                    <Row
                      style={{
                        width: "100%",
                        bottom: "1px",
                      }}
                    >
                      <Col
                        className="ant-col ant-col-4 ant-form-item-label"
                        xs={{ span: 0 }}
                        sm={{ span: 0 }}
                        lg={{ span: 4 }}
                      ></Col>
                      <Col
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        lg={{ span: 20 }}
                      >
                        <p class="input-description cs-mt15">
                          발송자 이메일 정보가 없으면 자동메일 발송이 되지
                          않으니, 대표 이메일 정보를 반드시 입력해주세요.
                        </p>
                      </Col>
                    </Row>
                  </Col>

                  <Col
                    className="cs-admin-form-input with-border"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Form.Item label="사업장 주소" className="m-0">
                      <Input.Group
                        style={{ display: "flex", paddingLeft: "20px" }}
                      >
                        <Form.Item
                          className="m-0"
                          name="postcode"
                          style={{ paddingLeft: "5px", margin: "35px 0" }}
                          rules={[
                            {
                              required: false,
                              message: "Please input your Company address!",
                            },
                          ]}
                        >
                          <Input
                            placeholder="우편번호"
                            maxLength="10"
                            className="cs-admin-width-180"
                          />
                        </Form.Item>
                        <Form.Item
                          className="cs-admin-address m-0"
                          style={{ paddingLeft: "5px", margin: "35px" }}
                          name="company_address"
                          rules={[
                            {
                              required: false,
                              message: "Please input your Company address!",
                            },
                          ]}
                        >
                          <Input placeholder="주소를 입력해주세요." />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      label="통신판매 신고번호"
                      className="cs-admin-form-input"
                      name="mail_report_no"
                      rules={[
                        {
                          required: false,
                          message: "Please input your Mail report number!",
                        },
                      ]}
                    >
                      <Input placeholder="2020-강남-0000" />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      label="고객센터 전화번호"
                      className="cs-admin-form-input"
                      name="service_center_number"
                      rules={[
                        {
                          required: false,
                          message: "Please input your Service center number!",
                        },
                      ]}
                    >
                      <Input placeholder="0000-0000" />
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

export default BasicSettings;
