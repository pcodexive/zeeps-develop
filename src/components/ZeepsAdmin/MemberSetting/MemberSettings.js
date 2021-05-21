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
import ReactExport from "react-export-excel";
import moment from "moment";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
  labelCol: { span: 10 },
  wrapperCol: { offset: 0, span: 20 },
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
    title: "이메일",
    dataIndex: "email",
  },
  {
    title: "이름",
    dataIndex: "name",
  },
  {
    title: "핸드폰 번호 ",
    dataIndex: "mobile",
  },
  {
    title: "회원 가입일",
    dataIndex: "sign_up_date",
  },
  {
    title: "최종 로그인",
    dataIndex: "last_login",
  },
  {
    title: "정보수정",
    dataIndex: "setting",
  },
];
const data = [
  {
    key: "1",
    number: "1",
    email: "someone@gmail.com",
    name: "someone",
    mobile: "123456789",
    sign_up_date: "01-01-2020",
    last_login: "20-01-2020",
    setting: "setting",
  },
  {
    key: "2",
    number: "2",
    email: "someone@gmail.com",
    name: "someone",
    mobile: "123456789",
    sign_up_date: "01-01-2020",
    last_login: "20-01-2020",
    setting: "setting",
  },
];

// rowSelection object indicates the need for row selection
// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   getCheckboxProps: record => ({
//     disabled: record.name === 'Disabled User', // Column configuration not to be checked
//     name: record.name,
//   }),
// };

class MemberSettings extends Component {
  state = {
    allData: "",
    minDate: "",
    maxDate: "",
    totalrecord: 0,
    selectedRowKeys: [],
    loading: false,
    delloading: false,
    dataForExcel: [],
    beginExcelDownload: false,
    finalExcelData: [],
    size: "large",
  };

  // rowSelection = selectedRowKeys => {
  //   // console.log('selectedRowKeys changed: ', selectedRowKeys);
  //   this.setState({
  //      selectedRowKeys: selectedRowKeys
  //   }, () => {

  //     console.log(this.state.selectedRowKeys)
  //   });

  // };

  onDateChange = (date, dateString) => {
    // console.log(dateString[0]);
    this.setState({
      minDate: dateString[0],
      maxDate: dateString[1],
    });
  };

  componentDidMount() {
    console.log("API calll----------------");
    axios
      .post(BaseUrl + "/adminapi/SeachMemberDetail", {
        name: "",
        minDate: "",
        maxDate: "",
      })
      .then((response) => {
        console.log("Got responce-----------");
        console.log(response);
        this.setState({ allData: "" });

        if (response.data.status == 1 || response.data.status == "1") {
          // console.log("dddd: ", data.data.id);

          var AllData = response.data.data.members || [];

          console.log("AllData----------", AllData);
          this.setState({ dataForExcel: response.data.data.members });

          var finalData = [];

          for (var i = 0; i < AllData.length; i++) {
            finalData[i] = {
              key: AllData[i].id,
              id: AllData[i].id,
              number: i + 1,
              email: AllData[i].email,
              name: AllData[i].name,
              mobile: AllData[i].mobile,
              sign_up_date: moment(AllData[i].signupdate).format("YYYY.MM.DD"),
              last_login: moment(new Date(AllData[i].lastlogindate)).format(
                "YYYY.MM.DD"
              ),
              setting: (
                <Button className="jc-cs-editlink">
                  {" "}
                  <Link to={"edit-member/" + AllData[i].id}>수정</Link>
                </Button>
              ),
            };
          }

          // console.log(finalData)
          this.setState({
            allData: finalData,
            totalrecord: response.data.data.total,
            finalExcelData: finalData,
            loading: false,
          });

          console.log("this.state.finalExcelData", this.state.finalExcelData);
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

  onFinish = (values) => {
    this.setState({ loading: true });
    // console.log('Success:', values);
    axios
      .post(BaseUrl + "/adminapi/SeachMemberDetail", {
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
          this.setState({ dataForExcel: res.data.data.members });
          var finalData = [];

          for (var i = 0; i < AllData.length; i++) {
            finalData[i] = {
              key: AllData[i].id,
              id: AllData[i].id,
              number: i + 1,
              email: AllData[i].email,
              name: AllData[i].name,
              mobile: AllData[i].mobile,
              sign_up_date: AllData[i].signupdate,
              last_login: AllData[i].lastlogindate,
              setting: (
                <Button className="jc-cs-editlink">
                  {" "}
                  <Link to={"edit-member/" + AllData[i].id}>수정</Link>
                </Button>
              ),
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
  };

  onSelectChange = (selectedRowKeys) => {
    var selected = [];
    var allData = [];
    var finalArray = [];

    allData = this.state.dataForExcel;

    if (this.state.selectedRowKeys.length >= 0) {
      selected = selectedRowKeys;
    } else {
      selected = allData.map((x) => x.id);
    }

    for (var i = 0; i < selected.length; i++) {
      for (var j = 0; j < allData.length; j++) {
        if (selected[i] == allData[j].id) {
          finalArray[i] = {
            key: allData[j].id,
            id: allData[j].id,
            number: i + 1,
            email: allData[j].email,
            name: allData[j].name,
            mobile: allData[j].mobile,
            sign_up_date: allData[j].signupdate,
            last_login: allData[j].lastlogindate,
          };
        }
      }
    }

    finalArray.length
      ? this.setState(
          {
            finalExcelData: finalArray,
            selectedRowKeys,
          },
          () => {}
        )
      : this.setState(
          {
            finalExcelData: this.state.allData,
            selectedRowKeys,
          },
          () => {}
        );
  };

  deleteRecords = () => {
    this.setState({ delloading: true });
    axios
      .post(BaseUrl + "/adminapi/DeleteMemberDetail", {
        id: this.state.selectedRowKeys,
      })
      .then((res) => {
        console.log(res);
        this.setState({ allData: "" });
        if (res.data.status == 1 || res.data.status == "1") {
          axios
            .get(BaseUrl + "/adminapi/GetAllMembers")
            .then((response) => {
              if (response.data.status == 1 || response.data.status == "1") {
                // console.log("dddd: ", data.data.id);

                var AllData = response.data.data;

                // console.log(AllData)

                var finalData = [];

                for (var i = 0; i < AllData.length; i++) {
                  finalData[i] = {
                    key: AllData[i].id,
                    id: AllData[i].id,
                    number: i + 1,
                    email: AllData[i].email,
                    name: AllData[i].name,
                    mobile: AllData[i].mobile,
                    sign_up_date: AllData[i].signupdate,
                    last_login: AllData[i].lastlogindate,
                    setting: <Button>Setting</Button>,
                  };
                }

                // console.log(finalData)
                this.setState({
                  allData: finalData,
                  delloading: false,
                });

                message.success("삭제되었습니다");
              } else {
                this.setState({ delloading: false });
                message.error("다시 시도해주세요.");
              }
            })
            .catch((error) => {
              this.setState({ delloading: false });
              console.log(error);
              message.error("다시 시도해주세요.");
            });
        } else {
          this.setState({ delloading: false });
          message.error("다시 시도해주세요.");
        }
      })
      .catch((error) => {
        this.setState({ delloading: false });
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  };

  render() {
    // console.log(this.state.selectedRowKeys)
    const { loading, selectedRowKeys, delloading, size } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

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
                    {/* <p>Member list  </p> */}
                    <p className="m-0">회원 리스트</p>
                  </Col>
                  <Col
                    className="cs-admin-basic-info-button"
                    xs={{ span: 24 }}
                    sm={{ span: 4 }}
                    lg={{ span: 4 }}
                  >
                    <Button
                      type="primary"
                      className="theme-btn float-right"
                      shape="round"
                      size={size}
                    >
                      <Link to="/register-member">회원 등록</Link>
                    </Button>
                  </Col>

                  <Divider className="cs-admin-basic-divider" />
                  <Col className="cs-admin-company" xs={{ span: 24 }}>
                    회원 검색
                  </Col>

                  <Col
                    className="cs-admin-member"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Form.Item
                      {...compLayout}
                      label="검색"
                      name="search_keyword"
                      rules={
                        [
                          // { required: true, message: '담당자이름을 검색해주세요.' }
                        ]
                      }
                    >
                      <Input
                        placeholder="검색어를 입력해주세요."
                        className="cs-ml20"
                      />
                    </Form.Item>
                  </Col>

                  <Col
                    className="cs-admin-member cs-admin-member-range"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Form.Item
                      {...compLayout}
                      label="회원 가입일"
                      name="sign_up_date"
                      rules={
                        [
                          // { required: true, message: 'Please select date!' }
                        ]
                      }
                    >
                      {/* <Space direction="vertical" size={12}> */}
                      <RangePicker
                        onChange={this.onDateChange}
                        placeholder={["YYYY.MM.DD", "YYYY.MM.DD"]}
                        className="cs-ml20"
                      />
                      {/* </Space> */}
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 20 }} lg={{ span: 20 }}>
                    {/* <p>Member list  </p> */}
                  </Col>
                  <Col
                    className="cs-admin-member-button"
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
                        size={size}
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
                      rowSelection={rowSelection}
                      columns={columns}
                      dataSource={this.state.allData}
                    />
                  </Col>

                  <Col
                    className="cs-admin-member-button-inner"
                    xs={{ span: 24 }}
                    sm={{ span: 12 }}
                    lg={{ span: 12 }}
                  >
                    <Button
                      loading={delloading}
                      type="primary"
                      className="theme-btn "
                      disabled={!this.state.selectedRowKeys.length}
                      size={size}
                      shape="round"
                      onClick={this.deleteRecords}
                    >
                      선택 탈퇴처리
                    </Button>
                  </Col>

                  <Col
                    className="cs-admin-member-button-inner"
                    xs={{ span: 24 }}
                    sm={{ span: 12 }}
                    lg={{ span: 12 }}
                  >
                    <ExcelFile
                      filename="members-list"
                      element={
                        <Button
                          type="primary"
                          size={size}
                          className="theme-btn float-right"
                          shape="round"
                        >
                          엑셀 다운로드
                        </Button>
                      }
                    >
                      <ExcelSheet
                        data={this.state.finalExcelData}
                        name="Members"
                      >
                        <ExcelColumn label="S.no" value="number" />
                        <ExcelColumn label="Email" value="email" />
                        <ExcelColumn label="Name" value="name" />
                        <ExcelColumn label="Mobile" value="mobile" />
                        <ExcelColumn
                          label="Sign Up Date"
                          value="sign_up_date"
                        />
                        <ExcelColumn label="Last Login" value="last_login" />
                      </ExcelSheet>
                    </ExcelFile>
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

export default MemberSettings;
