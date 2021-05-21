import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Layout, Menu, Divider
} from 'antd';
import '../css/admin-global.css'
const { Sider } = Layout;

class MemberSettingsAside extends Component {
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
                    className="cs-admin-left-side"
                    mode="inline"
                    // defaultSelectedKeys={['2']}
                    selectedKeys={[location.pathname]}
                >
                    <Menu.Item key="21" className="admin-aside-main-menu" >
                        <Link to="/member-setting">회원 설정</Link>
                    </Menu.Item>

                    <Divider plain></Divider>

                    <Menu.Item key="/member-setting"  className="admin-aside-submenu">
                        <Link to="/member-setting">회원 리스트</Link>
                    </Menu.Item>

                    <Menu.Item key="/register-member" className="admin-aside-submenu">
                        <Link to="/register-member">
                            회원 등록
                    </Link>
                    </Menu.Item>
                    <Menu.Item key="/managing-member" className="admin-aside-submenu">
                        <Link to="/managing-member">
                            회원 탈퇴∙삭제 관리
                    </Link>
                    </Menu.Item>
                    <Menu.Item key="/managing-manager" className="admin-aside-submenu">
                        <Link to="/managing-manager">
                            담당자 관리
                    </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(MemberSettingsAside);