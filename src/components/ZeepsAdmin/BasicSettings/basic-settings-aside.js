import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Layout, Menu, Divider } from "antd";
import "../css/admin-global.css";
const { Sider } = Layout;

class BasicSettingsAside extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };
  state = {};
  render() {
    const { location } = this.props;
    console.log(location.pathname);
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        {/* <div className="zeeps-logo" /> */}
        <Menu
          theme="dark"
          mode="inline"
          className="cs-admin-left-side"
          defaultSelectedKeys={["2"]}
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="1" className="admin-aside-main-menu">
            <Link to="/basic-settings">기본설정</Link>
          </Menu.Item>
          <Divider plain></Divider>
          <Menu.Item key="/basic-settings" className="admin-aside-submenu">
            <Link to="/basic-settings">기본정보 설정</Link>
          </Menu.Item>
          <Menu.Item key="/terms-conditions-privacy" className="admin-aside-submenu">
            <Link to="/terms-conditions-privacy">약관∙개인정보 처리방침</Link>
          </Menu.Item>
          <Menu.Item key="/kakaotalk-notification-setting" className="admin-aside-submenu">
            <Link to="/kakaotalk-notification-setting">카카오 알림톡 설정</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(BasicSettingsAside);
