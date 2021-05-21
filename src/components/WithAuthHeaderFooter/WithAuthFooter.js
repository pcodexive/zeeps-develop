import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Space, Modal, Divider, Button, message } from "antd";
import Cookies from "universal-cookie";
import BaseUrl from "../services/axios-url";
import "./footer.css";

const axios = require("axios");
const { Footer } = Layout;

class WithAuthFooter extends Component {
  state = {
    loading: false,
    visible: false,
    openTCModal: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  openTCModal = () => {
    this.setState({
      openTCModal: true,
    });
  };

  onConfirm = () => {
    if (!this.state.isLoggedIn) {
      window.location = "/register";
    } else {
      this.setState({ openTCModal: false });
    }
  };

  handleOk = () => {
    this.setState({ loading: true });
    const cookies = new Cookies();

    axios
      .get(
        BaseUrl +
          "/memberapi/WithdrawMembershipByMemberId/" +
          cookies.get("UU"),
        {}
      )
      .then((res) => {
        console.log(res);

        if (res.data.status == 1 || res.data.status == "1") {
          var cookieName = btoa("zeeps");
          // console.log('encodedStringBtoA', cookieName);
          var finalCookieName = "";
          finalCookieName = cookieName.replace("=", "aAaA");

          cookies.remove(finalCookieName);
          cookies.remove("UU");
          cookies.remove("UN");
          message.success("회원탈퇴가 되었습니다.");
          this.setState({ loading: false, visible: false });
          window.location = "/";
        } else {
          message.error(res.data.message);
          this.setState({ loading: false, visible: false });
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
        this.setState({ loading: false, visible: false });
      });

    // setTimeout(() => {
    //   this.setState({ loading: false, visible: false });
    // }, 1500);

    // window.location = "/";
  };

  handleCancel = () => {
    this.setState({ visible: false, openTCModal: false });
  };

  componentDidMount() {
    const cookies = new Cookies();
    if (cookies.get("emVlcHMaAaA") == "YXV0aG9yaXplZAaAaA") {
      this.setState({ isLoggedIn: true });
    }
  }

  render() {
    const { visible, openTCModal, loading, isLoggedIn } = this.state;

    return (
      <div
        style={{
          backgroundColor: "#e9e9e9",
        }}
      >
        <Footer className="footer-text-mobile cs-footer cs-new-1080">
          <Row>
            <Col span={24} style={{ marginBottom: "11px" }}>
              <Link to="/">
                <svg
                  width="90"
                  height="50"
                  viewBox="0 0 90 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cs-footer-logo"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.032 37.955L24.9818 26.8823V26.8003H17.4963V23.1094H30.8554V26.6089L22.8782 37.7088V37.7909H30.828V41.4818H17.032V37.955Z"
                    fill="#44358F"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M35.6434 32.9796H39.9053C39.9053 30.9293 39.2222 30.1911 37.8563 30.1911C36.8181 30.1911 35.8347 30.7925 35.6434 32.9796ZM30.9446 34.5653V34.21C30.9446 29.8629 33.6491 27.1289 37.8563 27.1289C42.5824 27.1289 44.3583 29.781 44.3583 34.4014V35.6042H35.6707C35.944 37.819 37.2006 38.4476 39.5773 38.4476C41.2438 38.4476 42.6918 38.0375 43.7844 37.6001V40.4706C42.719 41.0996 40.9706 41.7284 38.3753 41.7284C33.3759 41.7284 30.9446 39.2132 30.9446 34.5653Z"
                    fill="#44358F"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M49.8116 32.9796H54.0733C54.0733 30.9293 53.3904 30.1911 52.0245 30.1911C50.9865 30.1911 50.0029 30.7925 49.8116 32.9796ZM45.1128 34.5653V34.21C45.1128 29.8629 47.8173 27.1289 52.0245 27.1289C56.7508 27.1289 58.5265 29.781 58.5265 34.4014V35.6042H49.8391C50.1123 37.819 51.3689 38.4476 53.7455 38.4476C55.4122 38.4476 56.8598 38.0375 57.9527 37.6001V40.4706C56.8873 41.0996 55.1388 41.7284 52.5436 41.7284C47.5441 41.7284 45.1128 39.2132 45.1128 34.5653Z"
                    fill="#44358F"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M69.411 34.784V34.3465C69.411 31.4212 68.5093 30.7103 66.9249 30.7103C65.9689 30.7103 65.2312 30.9838 64.8213 31.2572V38.0374C65.2312 38.3109 65.9689 38.5569 66.761 38.5569C68.4276 38.5569 69.411 37.8189 69.411 34.784ZM60.1772 27.4022H64.6575V28.578H64.794C65.7228 27.6756 66.9797 27.1562 68.8646 27.1562C71.5964 27.1562 74.1646 28.7692 74.1646 33.9091V34.2372C74.1646 39.7871 71.5146 41.7282 67.6626 41.7282C66.242 41.7282 65.3404 41.455 64.8213 41.2361V45.5831H60.1772V27.4022Z"
                    fill="#44358F"
                  />
                  <mask
                    id="mask0"
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                    x="75"
                    y="27"
                    width="12"
                    height="15"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M75.3237 27.1289H86.4154V41.7283H75.3237V27.1289Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M75.4059 40.7987V37.6819C76.4984 38.0922 77.6734 38.5024 79.5856 38.5024C81.2793 38.5024 81.9622 38.0922 81.9622 37.3266C81.9622 36.6431 81.5523 36.3972 80.3503 36.2603L79.0666 36.0691C76.6623 35.7138 75.3237 34.4013 75.3237 31.6673C75.3237 28.8514 77.1814 27.1289 81.088 27.1289C83.1095 27.1289 84.4757 27.4023 85.5412 27.8671V30.9564C84.6397 30.6832 83.3556 30.3277 81.6892 30.3277C80.296 30.3277 79.6401 30.6832 79.6401 31.4213C79.6401 32.1047 80.132 32.3509 81.252 32.5149L82.5634 32.6789C85.4044 33.0616 86.4155 34.5927 86.4155 37.0259C86.4155 40.1152 84.4757 41.7283 80.2685 41.7283C78.3836 41.7283 76.5258 41.3728 75.4059 40.7987Z"
                      fill="#44358F"
                    />
                  </g>
                  <mask
                    id="mask1"
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                    x="2"
                    y="2"
                    width="41"
                    height="40"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2 2.10156H42.4811V41.4729H2V2.10156Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask1)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M42.4811 13.5491L22.2486 2.10156L2 13.5491V41.4729H13.6992V35.176H8.02327V17.7701L22.2469 9.86215L27.8278 12.793L36.4579 17.3254V21.0811H42.4811V13.5491Z"
                      fill="#44358F"
                    />
                  </g>
                </svg>
              </Link>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <span>서울특별시 마포구 마포대로 78, 10층 1016호</span>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <p>
                대표이사 : <span>고차남</span>
              </p>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <p>
                사업자 등록번호 : <span>828-87-01669 (사업자정보확인)</span>
              </p>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <p>
                통신판매업 신고번호 : <span>2020-서울강남-00000</span>
              </p>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <p>
                고객센터 : <span>02-000-0000</span>{" "}
              </p>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <span>
                {" "}
                &copy; {new Date().getFullYear()} Zeeps Co., Ltd. All rights
                reserved.
              </span>
            </Col>
          </Row>

          <Row className="color-grey">
            {/* <Space size={'large'} className="color-grey"> */}
            {/* <Row> */}
            <Col className="cs-footer-link">
              <Link to="#">집스</Link>
            </Col>
            <Col className="cs-footer-link">
              <Link onClick={this.openTCModal}>이용약관</Link>
            </Col>
            <Col className="cs-footer-link">
              <Link to="#">개인정보처리방침</Link>
            </Col>
            <Col className="cs-footer-link">
              <Link to="#">제휴문의</Link>
            </Col>
            {isLoggedIn ? (
              <Col className="cs-footer-link">
                <Link onClick={this.showModal}>회원탈퇴</Link>
              </Col>
            ) : (
              ""
            )}

            {/* </Row> */}
            {/* </Space> */}
          </Row>

          <Modal
            visible={visible}
            title="정말 회원탈퇴를 하실건가요? :("
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
            closable={false}
            className="cs-popup cs-member-recession-popup"
          >
            <div className="cs-modal-body">
              <Row className="text-left">
                <p>
                  회원탈퇴를 하시면 회원님의 모든 정보가 삭제됩니다. 정말로
                  회원탈퇴를 하실건가요?{" "}
                </p>
                <small className="desc">
                  회원탈퇴 후 회원님의 계약서는 보관할 의무에 의해 5년간
                  소멸되지 않습니다.
                </small>

                <Space direction="vertical" className="width100">
                  <Col span={24}>
                    <Button
                      key="back"
                      className="theme-btn cs-btn3"
                      onClick={this.handleCancel}
                      size={"large"}
                    >
                      아니오, 취소할게요.
                    </Button>
                  </Col>

                  <Col span={24}>
                    <Button
                      className="cs-btn4"
                      key="submit"
                      type="default"
                      loading={loading}
                      onClick={this.handleOk}
                      size={"large"}
                    >
                      네, 회원탈퇴 할게요.
                    </Button>
                  </Col>
                </Space>
              </Row>
            </div>
          </Modal>

          <Modal
            visible={openTCModal}
            title="약관∙개인정보 처리방침"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
            closable={false}
            className="cs-popup cs-term-popup"
          >
            <div className="cs-modal-body">
              <Row>
                <p>제1조(목적)</p>
                <p>
                  표준약관 제10023호 이 약관은 집스가 운영하는 인터넷 관련
                  서비스(이하 "서비스"라 한다)를 이용함에 있어 이용자의
                  권리·의무 및 책임사항을 규정함을 목적으로 합니다. ※
                  「PC통신등을 이용하는 전자거래에 대해서도 그 성질에 반하지
                  않는한 이 약관을 준용합니다」
                </p>
                <p>제2조(정의)</p>

                <Space direction="vertical" className="width100">
                  <Col span={24}>
                    <Button
                      key="back"
                      className="theme-btn cs-btn3"
                      onClick={this.onConfirm}
                    >
                      확인
                    </Button>
                  </Col>
                </Space>
              </Row>
            </div>
          </Modal>
        </Footer>
      </div>
    );
  }
}

export default WithAuthFooter;
