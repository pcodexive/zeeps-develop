import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Layout, Menu, Divider
} from 'antd';
import '../css/admin-global.css'
const { Sider } = Layout;

class PropertySettingsAside extends Component {
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
                    // console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    // console.log(collapsed, type);
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
                        <Link to="/search-property">부동산 설정 </Link>
                    </Menu.Item>

                    <Divider plain></Divider>

                    <Menu.Item key="/search-property" className="admin-aside-submenu">
                        <Link to="/search-property">부동산 검색</Link>
                    </Menu.Item>

                    <Menu.Item key="/property-list" className="admin-aside-submenu">
                        <Link to="/property-list">
                            부동산 리스트
                    </Link>
                    </Menu.Item>

                </Menu>
            </Sider>
        );
    }
}

export default withRouter(PropertySettingsAside);