import React, { Component } from "react";

import { Layout, Form, Input, Button, Checkbox, Menu, Divider } from "antd";

import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

import BaseUrl from "../../services/axios-url";
import TopNav from "../WithAuthHeaderFooter/TopNav";
import BasicSettingsAside from "./basic-settings-aside";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";

const axios = require("axios");
const KAKAO_ALIMTALK_STATE = {
  ON: true,
  OFF: false,
};
const { Header, Content, Footer, Sider } = Layout;

// const layout = {
//     labelCol: { span: 0 },
//     wrapperCol: { span: 24 },
// };

// import { Layout, Menu, Breadcrumb } from 'antd';

const { SubMenu } = Menu;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const compLayout = {
  labelCol: { span: 6 },
  wrapperCol: { offset: 0, span: 20 },
};
const regLayout = {
  labelCol: { span: 10 },
  wrapperCol: { offset: 0, span: 20 },
};

const onFinish = (values) => {
  console.log("Success:", values);

  const data = new FormData();
  data.append("email", values.email);
  data.append("password", values.password);

  // axios.post(BaseUrl+"collectionImageUpload", data, {
  //     // receive two    parameter endpoint url ,form data
  // })
  //  .then(res => {
  //      console.log(res.data)
  //      if(res.data.responseCode === 200){
  //          this.setState({ collectionImage: res.data.data.image })
  //      }
  //  })
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function GoBack() {
  window.history.back();
}

const handleOnOffRadioButtonClick = async (e) => {
  //
  const {
    target: { value },
  } = e;
  console.log(value);
  // to alimtalk server
  try {
    // companyinformation table colmum에 alimtalk(boolean) 추가
    // 79 ~ 84 코드는 companyinformation - kakao_noti_state on / off 설정 코드임
    await axios(BaseUrl + "/adminapi/UpdateKakaoNotiState", {
      method: "get",
      params: {
        state: value,
      },
    });
    // 아래 코드는 (매니저 배정시, 계약 완료시) 사용할 코드

    // 매니저 배정시 or 계약 완료시
    // companyinformation - kakao_noti_state
    // on / off 인지 먼저 확인
    // on 이면 아래 코드 실행
    // off 이면 코드 실행하지 않음

    // await axios("http://34.64.239.189:4000/matchManager", {
    //   method: "get",
    //   params: {
    //     pathname: "bar",
    //   },
    // });
  } catch (error) {}
};

class KakaotalkSetting extends Component {
  state = { size: "large" };

  render() {
    const { size } = this.state;
    return (
      <Layout>
        <TopNav />

        <Content>
          <Layout className="site-layout-background">
            <BasicSettingsAside />
            <div style={{ width: "100%" }}>
              <a
                href="https://center.biztalk.co.kr/#/login"
                target="_blank"
                rel="noreferrer"
              >
                비즈톡으로 이동합니다.
              </a>
              <div>
                <div>알림톡 on/off</div>
                <div>
                  <input
                    type="radio"
                    name="chk_input"
                    value={KAKAO_ALIMTALK_STATE.ON}
                    onClick={handleOnOffRadioButtonClick}
                  />
                  On
                  <input
                    type="radio"
                    name="chk_input"
                    value={KAKAO_ALIMTALK_STATE.OFF}
                    onClick={handleOnOffRadioButtonClick}
                  />
                  Off
                </div>
              </div>
            </div>
            {/* <Content className="cs-admin-basic-block">
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Row>
                  <Col className="cs-admin-basic-info flex-center" xs={{ span: 24 }} sm={{ span: 20 }} lg={{ span: 20 }}>
                    <p className="m-0">카카오 톡 알림 설정</p>
                  </Col>
                  <Col className="cs-admin-basic-info-button"  xs={{ span: 24 }} sm={{ span: 4 }} lg={{ span: 4 }}>
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
                  <Divider className="cs-admin-basic-divider"/>
                  <Col className="cs-admin-company" span={24}>약관∙개인정보 처리방침 문구 설정</Col>
                  <Col className="cs-admin-Kakao" xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      {...compLayout}
                      label="플러스친구 아이디"
                      name="kakaotalk_friend_id"
                      rules={[
                        {
                          required: true,
                          message:
                            "플러스 친구 ID 를 입력해주세요 ",
                        },
                      ]}
                    >
                      <Input placeholder="아이디를 입력해주세요."/>
                    </Form.Item>
                  </Col>

                  <Col className="cs-admin-Kakao" xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      {...compLayout}
                      label="발신프로필키"
                      name="aggreement"
                      type="email"
                      rules={[
                        {
                          required: true,
                          message: "발신프로필 키를 입력해주세요",
                        },
                      ]}
                    >
                      <Input placeholder="발신프로필키를 입력해주세요."/>
                    </Form.Item>
                  </Col>

                  <Col className="cs-admin-Kakao cs-admin-Kakao-text" xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <p>- 알림톡을 사용하시려면 발신프로필키가 필요합니다.</p>
                    <p>
                    - 발신프로필키는 카카오톡 플러스친구 아이디 등록을 하여 발급받을 수 있습니다.
                    </p>
                    <p>
                    - 카카오톡 플러스친구 아이디가 없다면 [카카오톡 플러스 친구 관리자]에서 발급받은 후 등록해주세요.
                    </p>
                  </Col>

                  <Col className="cs-admin-Kakao-checkbox" xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>

                    <h3>
                    알림톡 사용 설정
                    </h3>
                    <div class="cs-admin-Kakao-checkbox-inner">
                        <Form.Item name="notification_use" valuePropName="checked">
                          <Checkbox>사용함</Checkbox>
                        </Form.Item>

                        <Form.Item
                          name="notification_message"
                          valuePropName="checked"
                        >
                          <Checkbox>사용안함</Checkbox>
                        </Form.Item>
                    </div>
                  </Col>
                  <Col className="cs-admin-Kakao cs-admin-Kakao-text" xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <p>- 카카오 알림톡 발신프로필키를 받은 후 최소 1시간이 경과해야 정상적으로 사용이 가능합니다.</p>
                  </Col>

                 <div class="cs-admin-kakao-title">
                   <h3>알림톡 문구 설정</h3>
                 </div>

                  <Col className="cs-admin-Kakao-checkbox-input-block" xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      {...{
                        labelCol: { span: 4 },
                        wrapperCol: { offset: 0, span: 20 },
                      }}
                      label="담당자 배정 완료 문구"
                      name="manager_arrangement"
                      rules={[
                        {
                          required: true,
                          message:
                            "담당자 배정완료 문구를 입력해주세요 ",
                        },
                      ]}
                    >
                      <Checkbox className="cs-ml20">자동발송</Checkbox>
                      <Input.TextArea rows={8} className="cs-ml20" placeholder="[#{-}]
#{orderName}님의 집 내놓기가 접수되었습니다
□주문 
곧 담당자가 배정되어 연락드릴 예정입니다.
감사합니다.

▷[#{-}] 바로가기 :
#{Url}" />
                    </Form.Item>
                  </Col>
                  <Col className="cs-admin-Kakao-checkbox-input-block" xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      {...{
                        labelCol: { span: 4 },
                        wrapperCol: { offset: 0, span: 20 },
                      }}
                      label="컨펌 완료 문구"
                      name="confirm_complete_message"
                      rules={[
                        {
                          required: true,
                          message:
                            "컨펌완료문구를 입력해주세요",
                        },
                      ]}
                    >
                      <Checkbox className="cs-ml20">자동발송</Checkbox>
                      <Input.TextArea rows={8} className="cs-ml20" placeholder="[#{-}]
#{orderName}님의 계약서 컨펌이 완료되었습니다
□주문번호 : #{orderNo}
□결제금액 : #{settlePrice}원

담당자 김건우님이 계약서 컨펌 내용에 대해 연락드릴 예정입니다.
감사합니다.

▷[#{-}] 바로가기 :
#{Url}" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Content> */}
          </Layout>
        </Content>

        <WithAuthFooter />
      </Layout>
    );
  }
}

export default KakaotalkSetting;
