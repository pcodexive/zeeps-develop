import React, { Component } from "react";
import { Link } from "react-router-dom";
import RedirectIfNotAuthenticated from "../RedirectIfNotAuthenticated/RedirectIfNotAuthenticated";
import Cookies from "universal-cookie";
import { Layout, Menu, message } from "antd";
import { Redirect } from "react-router-dom";
import "./global.css";
const { Header } = Layout;

class TopNav extends Component {
  constructor(props) {
    super(props);

    console.log(
      "window.location.pathname",
      "/" + window.location.pathname.split("/")[1]
    );
    let route = "/" + window.location.pathname.split("/")[1];

    let basicSetting = [
      "/basic-settings",
      "/terms-conditions-privacy",
      "/kakaotalk-notification-setting",
    ];
    let memberSetting = [
      "/member-setting",
      "/register-member",
      "/managing-member",
      "/managing-manager",
      "/edit-member",
      "/register-manager",
    ];
    let propertySetting = [
      "/search-property",
      "/property-list",
      "/assign-manager-to-property",
      "/admin-get-single-property",
    ];
    let mySetting = ["/manage-faq", "/register-faq"];

    if (basicSetting.indexOf(route) !== -1) {
      this.state = {
        activeClass: "/basic-settings",
        redirectToLogin: false,
      };
    } else if (memberSetting.indexOf(route) !== -1) {
      this.state = {
        activeClass: "/member-setting",
        redirectToLogin: false,
      };
    } else if (propertySetting.indexOf(route) !== -1) {
      this.state = {
        activeClass: "/search-property",
        redirectToLogin: false,
      };
    } else if (mySetting.indexOf(route) !== -1) {
      this.state = {
        activeClass: "/manage-faq",
        redirectToLogin: false,
      };
    } else {
      this.state = {
        activeClass: "",
        redirectToLogin: false,
      };
    }
  }

  logout = () => {
    const cookies = new Cookies();
    cookies.remove("SXNBdXRob3JpemVkQWRtaW4aS");

    message.success("로그아웃 되었습니다.");
    console.log("ok");
    this.setState({ redirectToLogin: true });
  };

  render() {
    // console.log(this.state.activeClass)
    const { redirectToLogin } = this.state;
    if (redirectToLogin) {
      return (
        <Redirect
          to={{
            pathname: "/admin-login",
          }}
        />
      );
    }

    return (
      <Header className="header admin-top-navigation cs-admin-header">
        <RedirectIfNotAuthenticated />
        <div className="logo" />
        {/* {this.makeActive} */}

        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={["/basic-settings"]}
          selectedKeys={[this.state.activeClass]}
        >
          <Menu.Item
            className="cs-admin-logo"
            key="logo"
            style={{ marginRight: "15px", paddingleft: "0px" }}
          >
            <Link to="/basic-settings">
            <svg width="90" height="50" viewBox="0 0 90 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0322 38.957L24.9821 27.8843V27.8022H17.4965V24.1113H30.8556V27.6108L22.8784 38.7108V38.7928H30.8283V42.4837H17.0322V38.957Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M35.6432 33.9806H39.9051C39.9051 31.9303 39.2219 31.1921 37.856 31.1921C36.8179 31.1921 35.8344 31.7934 35.6432 33.9806ZM30.9443 35.5663V35.2109C30.9443 30.8639 33.6488 28.1299 37.856 28.1299C42.5822 28.1299 44.358 30.7819 44.358 35.4023V36.6052H35.6705C35.9437 38.8199 37.2004 39.4486 39.5771 39.4486C41.2435 39.4486 42.6916 39.0385 43.7842 38.6011V41.4716C42.7188 42.1006 40.9703 42.7294 38.3751 42.7294C33.3756 42.7294 30.9443 40.2142 30.9443 35.5663Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M49.8116 33.9806H54.0733C54.0733 31.9303 53.3904 31.1921 52.0245 31.1921C50.9865 31.1921 50.0029 31.7934 49.8116 33.9806ZM45.1128 35.5663V35.2109C45.1128 30.8639 47.8173 28.1299 52.0245 28.1299C56.7508 28.1299 58.5265 30.7819 58.5265 35.4023V36.6052H49.8391C50.1123 38.8199 51.3689 39.4486 53.7455 39.4486C55.4122 39.4486 56.8598 39.0385 57.9527 38.6011V41.4716C56.8873 42.1006 55.1388 42.7294 52.5436 42.7294C47.5441 42.7294 45.1128 40.2142 45.1128 35.5663Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M69.411 35.785V35.3474C69.411 32.4222 68.5093 31.7113 66.9249 31.7113C65.9689 31.7113 65.2312 31.9847 64.8213 32.2581V39.0384C65.2312 39.3119 65.9689 39.5578 66.761 39.5578C68.4276 39.5578 69.411 38.8198 69.411 35.785ZM60.1772 28.4032H64.6575V29.5789H64.794C65.7228 28.6766 66.9797 28.1572 68.8646 28.1572C71.5964 28.1572 74.1646 29.7701 74.1646 34.9101V35.2382C74.1646 40.7881 71.5146 42.7292 67.6626 42.7292C66.242 42.7292 65.3404 42.456 64.8213 42.2371V46.5841H60.1772V28.4032Z" fill="white"/>
              <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="75" y="28" width="12" height="15">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M75.3237 28.1299H86.4154V42.7293H75.3237V28.1299Z" fill="white"/>
              </mask>
              <g mask="url(#mask0)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M75.4059 41.7997V38.6829C76.4984 39.0931 77.6734 39.5033 79.5856 39.5033C81.2793 39.5033 81.9622 39.0931 81.9622 38.3276C81.9622 37.6441 81.5523 37.3982 80.3503 37.2613L79.0666 37.0701C76.6623 36.7148 75.3237 35.4022 75.3237 32.6683C75.3237 29.8524 77.1814 28.1299 81.088 28.1299C83.1095 28.1299 84.4757 28.4033 85.5412 28.8681V31.9574C84.6397 31.6842 83.3556 31.3287 81.6892 31.3287C80.296 31.3287 79.6401 31.6842 79.6401 32.4223C79.6401 33.1057 80.132 33.3519 81.252 33.5159L82.5634 33.6799C85.4044 34.0625 86.4155 35.5937 86.4155 38.0268C86.4155 41.1161 84.4757 42.7293 80.2685 42.7293C78.3836 42.7293 76.5258 42.3738 75.4059 41.7997Z" fill="white"/>
              </g>
              <mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="3" width="41" height="40">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2 3.10254H42.4811V42.4739H2V3.10254Z" fill="white"/>
              </mask>
              <g mask="url(#mask1)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M42.4811 14.55L22.2486 3.10254L2 14.55V42.4739H13.6992V36.177H8.02327V18.7711L22.2469 10.8631L27.8278 13.794L36.4579 18.3263V22.0821H42.4811V14.55Z" fill="white"/>
              </g>
              </svg>

            </Link>
          </Menu.Item>
          <Menu.Item
            key="/basic-settings"
            style={{ marginLeft: "55px", color: "red" }}
          >
            <Link to="/basic-settings">기본설정</Link>
          </Menu.Item>
          <Menu.Item key="/member-setting">
            <Link to="/member-setting">회원설정</Link>
          </Menu.Item>
          <Menu.Item key="/search-property">
            <Link to="/search-property">부동산설정</Link>
          </Menu.Item>
          <Menu.Item key="/manage-faq">
            <Link to="/manage-faq">마이설정</Link>
          </Menu.Item>

          <Menu.Item
            key="13"
            onClick={() => this.logout()}
            style={{ float: "right" }}
          >
            <Link to="#">로그아웃</Link>
          </Menu.Item>
          <Menu.Item key="12" style={{ float: "right" }}>
            |
          </Menu.Item>
          <Menu.Item
            key="11"
            className="cs-admin-admin"
            style={{ float: "right" }}
          >
            <Link to="#">관리자님(admin)</Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default TopNav;
