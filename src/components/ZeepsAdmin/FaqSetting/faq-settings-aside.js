import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Layout, Menu, Divider
} from 'antd';
import '../css/admin-global.css'
const { Sider } = Layout;

class FaqSettingsAside extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired
    }
    state = {}
    render() {
        const { location } = this.props;
        console.log(location.pathname);
        return (
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >

                <Menu
                    theme="dark"
                    mode="inline"
                    className="cs-admin-left-side"
                    // defaultSelectedKeys={['2']}
                    selectedKeys={[location.pathname]}
                >
                    <Menu.Item key="21" className="admin-aside-main-menu" >
                        <Link to="/manage-faq">마이 설정 </Link>
                    </Menu.Item>

                    <Divider plain></Divider>

                    <Menu.Item key="/manage-faq" className="admin-aside-submenu">
                        <Link to="/manage-faq">FAQ 관리</Link>
                    </Menu.Item>

                    <Menu.Item key="/register-faq" className="admin-aside-submenu">
                        <Link to="/register-faq">
                        FAQ 등록
                    </Link>
                    </Menu.Item>

                </Menu>
            </Sider>
        );
    }
}

export default withRouter(FaqSettingsAside);