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
} from "antd";

import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

import BaseUrl from "../../services/axios-url";
import TopNav from "../WithAuthHeaderFooter/TopNav";
import BasicSettingsAside from "./basic-settings-aside";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";

const axios = require("axios");

const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const compLayout = {
  labelCol: { span: 4 },
  wrapperCol: { offset: 0, span: 20 },
};
const regLayout = {
  labelCol: { span: 10 },
  wrapperCol: { offset: 0, span: 20 },
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function GoBack() {
  window.history.back();
}

class TermsAndConditions extends Component {
  state = { size: "large" };

  formRef = React.createRef();

  componentDidMount() {
    axios
      .get(BaseUrl + "/adminapi/GetCompanyAgreementdetail/1")
      .then((response) => {
        console.log("data->", response.data.data);

        if (response.data.status == 1 || response.data.status == "1") {
          // console.log("dddd: ", data.data.id);

          this.formRef.current.setFieldsValue({
            terms_and_conditions: response.data.data.termsOfService,
            aggreement: response.data.data.thirdPartyOffer,
            event_news: response.data.data.eventNews,
          });
        } else {
          message.error("다시 시도해주세요.");
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  }

  onFinish = (values) => {
    console.log("Success:", values);

    axios
      .post(BaseUrl + "/adminapi/UpdateAgreementContents", {
        id: 1,
        termsOfService: values.terms_and_conditions,
        thirdPartyOffer: values.aggreement,
        eventNews: values.event_news,
      })
      .then((res) => {
        // console.log(res)
        if (res.data.status == 1) {
          message.success("업데이트가 되었습니다.");
        }
      });
  };

  render() {
    const { size } = this.state;
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
                    className="cs-admin-basic-info flex-center"
                    xs={{ span: 24 }}
                    sm={{ span: 20 }}
                    lg={{ span: 20 }}
                  >
                    <p className="m-0">약관∙개인정보 처리방침</p>
                  </Col>
                  <Col
                    className="cs-admin-basic-info-button"
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
                    약관∙개인정보 처리방침 문구 설정
                  </Col>

                  <Col
                    className="cs-admin-terms"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Row>
                      <Col
                        xs={{ span: 6 }}
                        sm={{ span: 6 }}
                        lg={{ span: 6 }}
                      ></Col>
                      <Col
                        xs={{ span: 18 }}
                        sm={{ span: 18 }}
                        lg={{ span: 18 }}
                        className="cs-admin-terms-des"
                      ></Col>
                    </Row>
                    <Form.Item
                      {...compLayout}
                      label="이용약관∙개인정보 동의 내용"
                      className="m-0"
                      name="terms_and_conditions"
                      rules={[
                        {
                          required: true,
                          message: "이용및 개인정보를 확인해주세요",
                        },
                      ]}
                    >
                      {/* <div class="cs-admin-terms-des"><p>표준약관 - 표준약관 제 10023호</p></div> */}
                      <Input.TextArea rows={8} className="cs-ml20" />
                    </Form.Item>
                  </Col>

                  <Col
                    className="cs-admin-terms"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Form.Item
                      {...compLayout}
                      label="제3자 정보 제공 동의 내용"
                      name="aggreement"
                      type="email"
                      rules={[
                        {
                          required: true,
                          message: "동의사항을 확인해주세요",
                        },
                      ]}
                    >
                      <Input.TextArea rows={8} className="cs-ml20"/>
                    </Form.Item>
                  </Col>

                  <Col
                    className="cs-admin-terms"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Form.Item
                      {...compLayout}
                      label="혜택성 정보 수신 동의 내용"
                      name="event_news"
                      rules={[
                        {
                          required: true,
                          message: "혜택성 정보수신동의내용을 입력해주세요",
                        },
                      ]}
                    >
                      <Input.TextArea rows={8} className="cs-ml20" />
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

export default TermsAndConditions;
