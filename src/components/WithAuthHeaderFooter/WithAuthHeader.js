import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Button,
  Modal,
  Menu,
  Divider,
  Row,
  Col,
  Space,
  message,
  Drawer,
} from "antd";
import {
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../css/global.css";
import { MenuOutlined } from "@ant-design/icons";
import Cookies from "universal-cookie";

const axios = require("axios");
const { Header } = Layout;
const { SubMenu } = Menu;

class WithAuthHeader extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
    visible: false,
    isHomepage: false,
    drawerVisible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  showDrawer = () => {
    this.setState({
      drawerVisible: true,
    });
  };
  onClose = () => {
    this.setState({
      drawerVisible: false,
    });
  };

  handleOk = () => {
    message.warning("로그아웃 되었습니다.");
    // this.setState({ loading: true });

    const cookies = new Cookies();
    var cookieName = btoa("zeeps");
    // console.log('encodedStringBtoA', cookieName);
    var finalCookieName = "";
    finalCookieName = cookieName.replace("=", "aAaA");

    cookies.remove(finalCookieName);
    cookies.remove("UU");
    cookies.remove("UN");

    setTimeout(() => {
      this.setState({ loading: false, visible: false });
      message.success("로그아웃 되었습니다.");
      window.location = "/";
    }, 500);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    const cookies = new Cookies();
    var cookieName = btoa("zeeps");
    var finalCookieName = "";
    finalCookieName = cookieName.replace("=", "aAaA");

    var encodedStringBtoA = btoa("authorized");
    var finalCookieValue = "";
    finalCookieValue = encodedStringBtoA.replace("==", "aAaA");

    if (cookies.get(finalCookieName) == finalCookieValue) {
      if (cookies.get("UN")) {
        var UserName = cookies.get("UN").replace("-", " ");
        this.setState({ UserName: UserName });
      }
    }

    if (window.location.pathname == "/") {
      this.setState({
        isHomepage: true,
      });
    }
  }

  render() {
    const {
      visible,
      loading,
      UserName,
      isHomepage,
      drawerVisible,
    } = this.state;

    const homepageStyle = {
      color: "white",
    };

    return (
      <div style={{ borderBottom: "1px solid #ffffff73" }}>
        <Header className="header landing-header users-header cs-header cs-new-1080">
          <div className="logo" />
          {/* {this.makeActive} */}

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            selectedKeys={[this.state.activeClass]}
            className="cs-menu-main"
          >
            <Link to="/" className="cs-headerlogo">
              {/* <img src="https://dummyimage.com/150x40/" /> */}
              {isHomepage ? (
                <>
                  <svg
                    width="90"
                    height="50"
                    viewBox="0 0 90 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="desktop-logo"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.0322 38.955L24.9821 27.8823V27.8003H17.4965V24.1094H30.8556V27.6089L22.8784 38.7088V38.7909H30.8283V42.4818H17.0322V38.955Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M35.6432 33.9796H39.9051C39.9051 31.9293 39.2219 31.1911 37.856 31.1911C36.8179 31.1911 35.8344 31.7925 35.6432 33.9796ZM30.9443 35.5653V35.21C30.9443 30.8629 33.6488 28.1289 37.856 28.1289C42.5822 28.1289 44.358 30.781 44.358 35.4014V36.6042H35.6705C35.9437 38.819 37.2004 39.4476 39.5771 39.4476C41.2435 39.4476 42.6916 39.0375 43.7842 38.6001V41.4706C42.7188 42.0996 40.9703 42.7284 38.3751 42.7284C33.3756 42.7284 30.9443 40.2132 30.9443 35.5653Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M49.8116 33.9796H54.0733C54.0733 31.9293 53.3904 31.1911 52.0245 31.1911C50.9865 31.1911 50.0029 31.7925 49.8116 33.9796ZM45.1128 35.5653V35.21C45.1128 30.8629 47.8173 28.1289 52.0245 28.1289C56.7508 28.1289 58.5265 30.781 58.5265 35.4014V36.6042H49.8391C50.1123 38.819 51.3689 39.4476 53.7455 39.4476C55.4122 39.4476 56.8598 39.0375 57.9527 38.6001V41.4706C56.8873 42.0996 55.1388 42.7284 52.5436 42.7284C47.5441 42.7284 45.1128 40.2132 45.1128 35.5653Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M69.411 35.784V35.3465C69.411 32.4212 68.5093 31.7103 66.9249 31.7103C65.9689 31.7103 65.2312 31.9838 64.8213 32.2572V39.0374C65.2312 39.3109 65.9689 39.5569 66.761 39.5569C68.4276 39.5569 69.411 38.8189 69.411 35.784ZM60.1772 28.4022H64.6575V29.578H64.794C65.7228 28.6756 66.9797 28.1562 68.8646 28.1562C71.5964 28.1562 74.1646 29.7692 74.1646 34.9091V35.2372C74.1646 40.7871 71.5146 42.7282 67.6626 42.7282C66.242 42.7282 65.3404 42.455 64.8213 42.2361V46.5831H60.1772V28.4022Z"
                      fill="white"
                    />
                    <mask
                      id="mask0"
                      mask-type="alpha"
                      maskUnits="userSpaceOnUse"
                      x="75"
                      y="28"
                      width="12"
                      height="15"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M75.3237 28.1289H86.4154V42.7283H75.3237V28.1289Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M75.4059 41.7987V38.6819C76.4984 39.0922 77.6734 39.5024 79.5856 39.5024C81.2793 39.5024 81.9622 39.0922 81.9622 38.3266C81.9622 37.6431 81.5523 37.3972 80.3503 37.2603L79.0666 37.0691C76.6623 36.7138 75.3237 35.4013 75.3237 32.6673C75.3237 29.8514 77.1814 28.1289 81.088 28.1289C83.1095 28.1289 84.4757 28.4023 85.5412 28.8671V31.9564C84.6397 31.6832 83.3556 31.3277 81.6892 31.3277C80.296 31.3277 79.6401 31.6832 79.6401 32.4213C79.6401 33.1047 80.132 33.3509 81.252 33.5149L82.5634 33.6789C85.4044 34.0616 86.4155 35.5927 86.4155 38.0259C86.4155 41.1152 84.4757 42.7283 80.2685 42.7283C78.3836 42.7283 76.5258 42.3728 75.4059 41.7987Z"
                        fill="white"
                      />
                    </g>
                    <mask
                      id="mask1"
                      mask-type="alpha"
                      maskUnits="userSpaceOnUse"
                      x="2"
                      y="3"
                      width="41"
                      height="40"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 3.10156H42.4811V42.4729H2V3.10156Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask1)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M42.4811 14.5491L22.2486 3.10156L2 14.5491V42.4729H13.6992V36.176H8.02327V18.7701L22.2469 10.8622L27.8278 13.793L36.4579 18.3254V22.0811H42.4811V14.5491Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="45"
                    viewBox="0 0 50 45"
                    className="mobile-logo"
                  >
                    <defs>
                      <path
                        id="ev9b8ep4na"
                        d="M0 0.035L38.017 0.035 38.017 35.469 0 35.469z"
                      />
                    </defs>
                    <g fill="none" fill-rule="evenodd">
                      <g>
                        <g>
                          <g>
                            <g transform="translate(-421 -14) translate(421 14) translate(5.009 3.7) translate(0 .058)">
                              <mask id="w2iv9u332b" fill="#fff">
                                <use href="#ev9b8ep4na" />
                              </mask>
                              <path
                                fill="#FFF"
                                d="M38.017 10.337L19.016 0.035 0 10.337 0 35.469 38.017 35.469 38.017 29.802 5.657 29.802 5.657 14.136 19.014 7.019 24.256 9.657 32.36 13.736 32.36 29.802 38.017 29.802z"
                                mask="url(#w2iv9u332b)"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </>
              ) : (
                <>
                  <svg
                    width="90"
                    height="50"
                    viewBox="0 0 90 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="desktop-logo"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="45"
                    viewBox="0 0 50 45"
                    className="mobile-logo"
                  >
                    <defs>
                      <path
                        id="ev9b8ep4na"
                        d="M0 0.035L38.017 0.035 38.017 35.469 0 35.469z"
                      />
                    </defs>
                    <g fill="none" fill-rule="evenodd">
                      <g>
                        <g>
                          <g>
                            <g transform="translate(-421 -14) translate(421 14) translate(5.009 3.7) translate(0 .058)">
                              <mask id="w2iv9u332b" fill="#fff">
                                <use href="#ev9b8ep4na" />
                              </mask>
                              <path
                                fill="#44358F"
                                d="M38.017 10.337L19.016 0.035 0 10.337 0 35.469 38.017 35.469 38.017 29.802 5.657 29.802 5.657 14.136 19.014 7.019 24.256 9.657 32.36 13.736 32.36 29.802 38.017 29.802z"
                                mask="url(#w2iv9u332b)"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </>
              )}

              {/* <img src={logo} /> */}
            </Link>

            <SubMenu
              className={
                isHomepage
                  ? " text-white float-right cs-menu-link desktopMenu"
                  : "float-right cs-menu-link desktopMenu"
              }
              key="SubMenu"
              title={UserName}
            >
              <Menu.ItemGroup
                title=""
                className="background-white cs-header-menu"
              >
                <Menu.Item key="setting:1">
                  <Link to="/member-change-password"> 환경</Link>
                </Menu.Item>
                <Menu.Item key="setting:2" onClick={this.showModal}>
                  로그 아웃
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>

            <Menu.Item
              key="13"
              className="desktopMenu cs-menu-link float-right"
            >
              <Link to="/faq" className={isHomepage ? "text-white" : ""}>
                자주묻는 질문
              </Link>
            </Menu.Item>
            <Menu.Item
              key="12"
              className="desktopMenu cs-menu-link float-right"
            >
              <Link
                to="/property-processing"
                className={isHomepage ? "text-white" : ""}
              >
                내 부동산
              </Link>
            </Menu.Item>
            <Menu.Item
              key="11"
              className="desktopMenu cs-menu-link float-right"
            >
              <Link
                to="/register-property"
                className={isHomepage ? "text-white" : ""}
              >
                집 내놓기!
              </Link>
            </Menu.Item>
          </Menu>
          {/* <Button className="barsMenu" icon={<MenuOutlined />} onClick={this.showDrawer}>
        </Button> */}

          {/* <Drawer
          title=""
          className="menu-drawer"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={drawerVisible}
        > */}
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            selectedKeys={[this.state.activeClass]}
            className="cs-menu-main barsMenu"
          >
            <Menu.Item key="11" className="cs-menu-link">
              <Link to="/property-processing">
                {isHomepage ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <g>
                        <g>
                          <g transform="translate(-401 -20) translate(401 20) translate(7 9)">
                            <g
                              stroke="#FFF"
                              stroke-linecap="round"
                              stroke-width="4"
                            >
                              <g>
                                <path d="M22.44 7c0 3.866-3.133 7-7 7-3.865 0-7-3.134-7-7s3.135-7 7-7c3.867 0 7 3.134 7 7zM0 29.344c1.447-5.138 7.614-9 15-9s13.551 3.862 15 9" />
                              </g>
                            </g>
                            <circle cx="31.5" cy="14.5" r="2.5" fill="#FFF" />
                            <path
                              stroke="#FFF"
                              stroke-linecap="round"
                              stroke-width="4"
                              d="M31.5 1L31.5 8"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <g>
                        <g>
                          <g transform="translate(-401 -20) translate(401 20) translate(7 9)">
                            <g
                              stroke="#44358f"
                              stroke-linecap="round"
                              stroke-width="4"
                            >
                              <g>
                                <path d="M22.44 7c0 3.866-3.133 7-7 7-3.865 0-7-3.134-7-7s3.135-7 7-7c3.867 0 7 3.134 7 7zM0 29.344c1.447-5.138 7.614-9 15-9s13.551 3.862 15 9" />
                              </g>
                            </g>
                            <circle
                              cx="31.5"
                              cy="14.5"
                              r="2.5"
                              fill="#44358f"
                            />
                            <path
                              stroke="#44358f"
                              stroke-linecap="round"
                              stroke-width="4"
                              d="M31.5 1L31.5 8"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                )}
              </Link>
            </Menu.Item>

            <Menu.Item key="13" className="cs-menu-link">
              <Link to="/faq">
                {isHomepage ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <g>
                        <g transform="translate(-479 -20) translate(479 20)">
                          <circle
                            cx="24"
                            cy="24"
                            r="18"
                            stroke="#FFF"
                            stroke-width="4"
                          />
                          <text
                            fill="#FFF"
                            font-family="NanumSquareRoundOTFB, NanumSquareRoundOTF"
                            font-size="28"
                            font-weight="bold"
                          >
                            <tspan x="16.44" y="34">
                              ?
                            </tspan>
                          </text>
                        </g>
                      </g>
                    </g>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <g>
                        <g transform="translate(-479 -20) translate(479 20)">
                          <circle
                            cx="24"
                            cy="24"
                            r="18"
                            stroke="#44358f"
                            stroke-width="4"
                          />
                          <text
                            fill="#44358f"
                            font-family="NanumSquareRoundOTFB, NanumSquareRoundOTF"
                            font-size="28"
                            font-weight="bold"
                          >
                            <tspan x="16.44" y="34">
                              ?
                            </tspan>
                          </text>
                        </g>
                      </g>
                    </g>
                  </svg>
                )}
              </Link>
            </Menu.Item>

            {UserName && (
              <Menu.Item key="12" className="cs-menu-link">
                <Link to="/member-change-password">
                  {isHomepage ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <g stroke="#FFF" stroke-width="4">
                          <g>
                            <path
                              d="M23.89 28.956c-2.826 0-5.116-2.291-5.116-5.117s2.29-5.117 5.117-5.117c2.826 0 5.116 2.291 5.116 5.117s-2.29 5.117-5.116 5.117zm12.388-6.181l-.638-2.799c-.077-.338.026-.691.272-.934l2.39-2.359c.364-.359.408-.931.104-1.342l-2.43-3.277c-.305-.411-.865-.535-1.314-.291l-2.998 1.629c-.295.16-.65.162-.946.005l-2.607-1.383c-.283-.15-.477-.426-.521-.743l-.48-3.398C27.038 7.377 26.605 7 26.094 7h-4.08c-.511 0-.944.376-1.016.883l-.477 3.376c-.046.331-.256.617-.558.762l-2.621 1.255c-.303.145-.658.128-.946-.045l-2.63-1.575c-.416-.25-.95-.174-1.28.182l-2.632 2.839c-.348.375-.367.949-.044 1.345l2.218 2.725c.196.242.269.561.196.864l-.676 2.833c-.081.337-.33.608-.657.717L7.704 24.22c-.486.161-.778.654-.687 1.157l.728 4.014c.092.502.54.862 1.05.842l3.41-.134c.335-.014.654.142.85.413l1.893 2.621c.185.257.238.586.142.888l-1.04 3.268c-.154.487.074 1.014.535 1.236l3.676 1.766c.46.222 1.014.071 1.298-.355l1.894-2.839c.186-.278.499-.446.834-.445l3.092.007c.33.001.638.164.824.437l1.924 2.823c.288.423.844.569 1.303.343l3.657-1.805c.459-.226.68-.755.52-1.241l-1.066-3.239c-.104-.318-.043-.668.164-.931l1.796-2.284c.207-.264.533-.407.868-.379l3.376.276c.51.042.973-.298 1.085-.797l.897-3.98c.113-.498-.16-1.004-.637-1.185l-3.191-1.209c-.314-.119-.547-.386-.621-.713z"
                              transform="translate(-557 -20) translate(557 20)"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <g stroke="#44358f" stroke-width="4">
                          <g>
                            <path
                              d="M23.89 28.956c-2.826 0-5.116-2.291-5.116-5.117s2.29-5.117 5.117-5.117c2.826 0 5.116 2.291 5.116 5.117s-2.29 5.117-5.116 5.117zm12.388-6.181l-.638-2.799c-.077-.338.026-.691.272-.934l2.39-2.359c.364-.359.408-.931.104-1.342l-2.43-3.277c-.305-.411-.865-.535-1.314-.291l-2.998 1.629c-.295.16-.65.162-.946.005l-2.607-1.383c-.283-.15-.477-.426-.521-.743l-.48-3.398C27.038 7.377 26.605 7 26.094 7h-4.08c-.511 0-.944.376-1.016.883l-.477 3.376c-.046.331-.256.617-.558.762l-2.621 1.255c-.303.145-.658.128-.946-.045l-2.63-1.575c-.416-.25-.95-.174-1.28.182l-2.632 2.839c-.348.375-.367.949-.044 1.345l2.218 2.725c.196.242.269.561.196.864l-.676 2.833c-.081.337-.33.608-.657.717L7.704 24.22c-.486.161-.778.654-.687 1.157l.728 4.014c.092.502.54.862 1.05.842l3.41-.134c.335-.014.654.142.85.413l1.893 2.621c.185.257.238.586.142.888l-1.04 3.268c-.154.487.074 1.014.535 1.236l3.676 1.766c.46.222 1.014.071 1.298-.355l1.894-2.839c.186-.278.499-.446.834-.445l3.092.007c.33.001.638.164.824.437l1.924 2.823c.288.423.844.569 1.303.343l3.657-1.805c.459-.226.68-.755.52-1.241l-1.066-3.239c-.104-.318-.043-.668.164-.931l1.796-2.284c.207-.264.533-.407.868-.379l3.376.276c.51.042.973-.298 1.085-.797l.897-3.98c.113-.498-.16-1.004-.637-1.185l-3.191-1.209c-.314-.119-.547-.386-.621-.713z"
                              transform="translate(-557 -20) translate(557 20)"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  )}
                </Link>
              </Menu.Item>
            )}

            {UserName && (
              <SubMenu
                className="cs-menu-link cs-user-link"
                key="SubMenu"
                title={UserName}
              >
                <Menu.ItemGroup className="cs-header-menu cs-mobile-submenu">
                  <Menu.Item key="setting:2" onClick={this.showModal}>
                    로그 아웃
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            )}
          </Menu>
          {/* </Drawer> */}

          <Modal
            visible={visible}
            title="로그아웃 하실건가요? :("
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            closable={false}
            footer={null}
            className="cs-popup cs-logout-popup"
          >
            <div className="cs-modal-body">
              <Row className="text-left">
                <p>
                  집스에서 로그아웃 됩니다.
                  <br />
                  정말 로그아웃 하실건가요?{" "}
                </p>

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
                      네, 로그아웃 할게요.
                    </Button>
                  </Col>
                </Space>
              </Row>
            </div>
          </Modal>
        </Header>
      </div>
    );
  }
}

export default WithAuthHeader;
