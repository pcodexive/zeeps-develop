import React, { Component, useState } from "react";

import {
  Layout,
  Form,
  Input,
  Button,
  Checkbox,
  Menu,
  Divider,
  DatePicker,
  Space,
  Table,
  Radio,
  message,
} from "antd";

import "antd/dist/antd.css";
import { Link, withRouter } from "react-router-dom";
import { Row, Col } from "antd";

import BaseUrl from "../../services/axios-url";
import TopNav from "../WithAuthHeaderFooter/TopNav";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";
import MemberSettingsAside from "./member-settings-aside";

const axios = require("axios");

const { Header, Content, Footer, Sider } = Layout;
const { RangePicker } = DatePicker;

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
  labelCol: { span: 8 },
  wrapperCol: { offset: 0, span: 23 },
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function GoBack() {
  window.history.back();
}

const columns = [
  {
    title: "번호",
    dataIndex: "number",
    // render: text => <a>{text}</a>,
  },
  {
    title: "아이디",
    dataIndex: "email",
  },
  {
    title: "이름",
    dataIndex: "name",
  },
  {
    title: "출금일",
    dataIndex: "membershipexpiredate",
  },
];
const data = [
  {
    key: "1",
    number: "1",
    email: "someone@gmail.com",
    name: "someone",
    withdrawal_date: "2020-01-01",
  },
  {
    key: "1",
    number: "1",
    email: "someone@gmail.com",
    name: "someone",
    withdrawal_date: "2020-01-01",
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
  }),
};

class ManagingMember extends Component {
  state = {
    allData: "",
    minDate: "",
    maxDate: "",
    selectedRowKeys: [],
    totalrecord: 0,
    loading: false,
    delloading: false,
  };

  onDateChange = (date, dateString) => {
    // console.log(dateString[0]);
    this.setState({
      minDate: dateString[0],
      maxDate: dateString[1],
    });
  };

  onFinish = (values) => {
    this.setState({ loading: true });
    // console.log('Success:', values);
    axios
      .post(BaseUrl + "/adminapi/SeachWithdrawMemberDetail", {
        name: values.search_keyword,
        minDate: this.state.minDate,
        maxDate: this.state.maxDate,
      })
      .then((res) => {
        this.setState({ allData: "" });
        console.log(res);
        if (res.data.status == 1 || res.data.status == "1") {
          var AllData = res.data.data.members;

          // console.log(AllData)

          var finalData = [];

          for (var i = 0; i < AllData.length; i++) {
            finalData[i] = {
              key: AllData[i].id,
              id: AllData[i].id,
              number: i + 1,
              email: AllData[i].email,
              name: AllData[i].name,
              membershipexpiredate: AllData[i].membershipexpiredate,
              // sign_up_date: AllData[i].signupdate,
              // last_login: AllData[i].lastlogindate,
              // setting: <Button>Setting</Button>
            };
          }

          // console.log(finalData)
          this.setState({
            allData: finalData,
            loading: false,
          });
        } else {
          message.error("다시 시도해주세요.");
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  };

  componentDidMount() {
    axios
      .post(BaseUrl + "/adminapi/SeachWithdrawMemberDetail", {
        name: "",
        minDate: "",
        maxDate: "",
      })
      .then((res) => {
        this.setState({ allData: "" });
        console.log(res);
        if (res.data.status == 1 || res.data.status == "1") {
          var AllData = res.data.data.members;
          // console.log(AllData)

          var finalData = [];

          for (var i = 0; i < AllData.length; i++) {
            finalData[i] = {
              key: AllData[i].id,
              id: AllData[i].id,
              number: i + 1,
              email: AllData[i].email,
              name: AllData[i].name,
              membershipexpiredate: AllData[i].membershipexpiredate,
              // sign_up_date: AllData[i].signupdate,
              // last_login: AllData[i].lastlogindate,
              // setting: <Button>Setting</Button>
            };
          }

          // console.log(finalData)
          this.setState({
            allData: finalData,
            totalrecord: res.data.data.total,
            loading: false,
          });
        } else {
          message.error("다시 시도해주세요.");
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  }

  render() {
    const { loading } = this.state;

    return (
      <Layout>
        <TopNav />

        <Content>
          <Layout className="site-layout-background">
            <MemberSettingsAside />

            <Content className="cs-admin-basic-block">
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Row>
                  <Col
                    className="cs-admin-basic-info flex-center"
                    xs={{ span: 24 }}
                    sm={{ span: 20 }}
                    lg={{ span: 20 }}
                  >
                    <p className="m-0">회원 탈퇴∙삭제 관리</p>
                  </Col>
                  <Col
                    className="cs-admin-basic-info-button"
                    xs={{ span: 24 }}
                    sm={{ span: 4 }}
                    lg={{ span: 4 }}
                  >
                    {/* <Button type="primary" className="theme-btn float-right" shape="round" htmlType="submit">
                        Save
                      </Button>


                      <Button className="theme-btn-default float-right" shape="round" style={{ 'marginRight': '20px' }}>
                        <Link to="/member-setting" >
                          Back to list
                        </Link>
                      </Button> */}
                  </Col>

                  <Divider className="cs-admin-button-without-spacing" />

                  <Col className="cs-admin-company" xs={{ span: 24 }}>
                    탈퇴내역 검색
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 4 }}
                    lg={{ span: 4 }}
                  ></Col>

                  <Col
                    className="cs-admin-member"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Form.Item
                      {...compLayout}
                      label="이름"
                      name="search_keyword"
                      rules={
                        [
                          // { required: true, message: '담당자이름을 검색해주세요.' }
                        ]
                      }
                    >
                      <Input placeholder="김정아" className="cs-ml20" />
                    </Form.Item>
                  </Col>

                  <Col
                    className="cs-admin-member cs-admin-managing-member"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Form.Item
                      {...compLayout}
                      label="탈퇴일"
                      name="withdrawal_date"
                      rules={
                        [
                          // { required: true, message: 'Please select date!' }
                        ]
                      }
                    >
                      <RangePicker
                        onChange={this.onDateChange}
                        placeholder={["YYYY.MM.DD", "YYYY.MM.DD"]}
                        className="cs-ml20"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 20 }} lg={{ span: 20 }}>
                    {/* <p>Member list  </p> */}
                  </Col>
                  <Col
                    className="cs-admin-member-button cs-admin-managing-member-button"
                    xs={{ span: 24 }}
                    sm={{ span: 4 }}
                    lg={{ span: 4 }}
                  >
                    <Form.Item {...compLayout}>
                      <Button
                        loading={loading}
                        type="primary"
                        className="theme-btn float-right"
                        htmlType="submit"
                        shape="round"
                        // size={size}
                      >
                        검색
                      </Button>
                    </Form.Item>
                  </Col>

                  <Divider />
                  <div class="cs-admin-member-des">
                    <p>
                      검색 {this.state.allData.length}개 / 전체{" "}
                      {this.state.totalrecord}개
                    </p>
                  </div>
                  <Col
                    className="cs-admin-member-table"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Table
                      // rowSelection={{
                      //   type: 'checkbox',
                      //   ...rowSelection,
                      // }}
                      columns={columns}
                      dataSource={this.state.allData}
                    />
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

export default ManagingMember;
