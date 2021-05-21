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

const columns = [
  {
    title: "번호",
    dataIndex: "number",
    // render: text => <a>{text}</a>,
  },
  {
    title: "담당자",
    dataIndex: "manager",
  },
  {
    title: "담당중인 집",
    dataIndex: "cases",
  },
  // {
  //   title: 'Withdrawal date ',
  //   dataIndex: 'withdrawal_date',
  // },
];
// const data = [
//   {
//     key: '1',
//     number: '1',
//     manager: 'someone',
//     cases: '01'
//   },
//   {
//     key: '2',
//     number: '2',
//     manager: 'someone',
//     cases: '01'
//   },
// ];

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

class ManagingManager extends Component {
  state = {
    allData: "",
    minDate: "",
    maxDate: "",
    searchData: "",
    selectedRowKeys: [],
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

  onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState(
      {
        selectedRowKeys,
      },
      () => {
        // console.log(this.state.selectedRowKeys)
      }
    );
  };

  componentDidMount() {
    axios
      .get(BaseUrl + "/adminapi/GetAllManager")
      .then((response) => {
        if (response.data.status == 1 || response.data.status == "1") {
          // console.log("dddd: ", data.data.id);

          var AllData = response.data.data;

          console.log(AllData);

          var finalData = [];

          for (var i = 0; i < AllData.length; i++) {
            finalData[i] = {
              key: AllData[i].roleId,
              id: AllData[i].roleId,
              number: i + 1,
              manager: AllData[i].name,
              cases: AllData[i].propertyCount,
              // setting: <Button>Setting</Button>
            };
          }

          // console.log(finalData)
          this.setState({
            allData: finalData,
          });
        } else {
          message.error("다시 시도해주세요.");
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  }

  onFinish = (values) => {
    this.setState({ loading: true });
    // console.log('Success:', values);
    axios
      .post(BaseUrl + "/adminapi/searchManagerDetail", {
        name: values.search_keyword,
        // "minDate": this.state.minDate,
        // "maxDate": this.state.maxDate
      })
      .then((res) => {
        this.setState({ searchData: "" });
        // console.log(res)
        if (res.data.status == 1 || res.data.status == "1") {
          var searchData = res.data.data;

          console.log(searchData.length);

          var searchDataResult = [];

          for (var i = 0; i < searchData.length; i++) {
            searchDataResult[i] = {
              key: searchData[i].roleId,
              id: searchData[i].roleId,
              number: i + 1,
              manager: searchData[i].name,
              cases: searchData[i].propertyCount,
            };
          }

          console.log(searchDataResult);
          this.setState({
            searchData: searchDataResult,
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

  deleteRecords = () => {
    this.setState({ delloading: true });
    axios
      .post(BaseUrl + "/adminapi/DeleteManagerDetail", {
        roleId: this.state.selectedRowKeys,
      })
      .then((res) => {
        console.log(res);
        this.setState({ allData: "" });
        if (res.data.status == 1 || res.data.status == "1") {
          axios
            .get(BaseUrl + "/adminapi/GetAllManager")
            .then((response) => {
              if (response.data.status == 1 || response.data.status == "1") {
                // console.log("dddd: ", data.data.id);

                var AllData = response.data.data;

                // console.log(AllData)

                var finalData = [];

                for (var i = 0; i < AllData.length; i++) {
                  finalData[i] = {
                    key: AllData[i].roleId,
                    id: AllData[i].roleId,
                    number: i + 1,
                    manager: AllData[i].name,
                    cases: "01",
                    // setting: <Button>Setting</Button>
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
    const { loading, selectedRowKeys, delloading } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    console.log(this.state.searchData);

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
                    {/* <p>Managing manager </p> */}
                    <p className="m-0">담당자 관리 </p>
                  </Col>
                  <Col
                    className="cs-admin-basic-info-button"
                    xs={{ span: 24 }}
                    sm={{ span: 4 }}
                    lg={{ span: 4 }}
                  >
                    <Button
                      type="primary"
                      className="theme-btn float-right border-radius"
                      shape="round"
                    >
                      <Link to="/register-manager">담당자 등록</Link>
                    </Button>

                    {/* 
                      <Button className="theme-btn-default float-right" shape="round" style={{ 'marginRight': '20px' }}>
                        <Link to="/member-setting" >
                          Back to list
                        </Link>
                      </Button> */}
                  </Col>

                  <Divider className="cs-admin-basic-divider" />

                  <Col className="cs-admin-company" xs={{ span: 24 }}>
                    <p className="m-0">전체 {this.state.allData.length}</p>
                  </Col>

                  <Col
                    className="cs-admin-member-table cs-admin-managing-member-table"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Table
                      rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                      }}
                      columns={columns}
                      dataSource={this.state.allData}
                    />
                    <div class="cs-admin-managing-member-table-button">
                      <Button
                        loading={delloading}
                        disabled={!this.state.selectedRowKeys.length}
                        onClick={this.deleteRecords}
                        type="primary"
                        className="theme-btn"
                        shape="round"
                      >
                        선택 삭제
                      </Button>
                    </div>
                  </Col>

                  <Divider />
                  <Space />
                  <Col
                    className="cs-admin-company cs-admin-managing-manager"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    {/* <h3>Search manager </h3> */}
                    <h3>담당자 검색 </h3>
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
                      rules={[
                        {
                          required: true,
                          message: "담당자이름을 검색해주세요.",
                        },
                      ]}
                    >
                      <Input placeholder="검색어를 입력해주세요." />
                    </Form.Item>
                  </Col>

                  {/* <Col xs={{ span: 24 }} sm={{ span:24 }} lg={{ span:24 }} >
                      <Form.Item 
                        {...compLayout}
                        label="Withdrawal date" 
                        name="withdrawal_date"
                        rules={[{ required: true, message: 'Please select date!' }]}
                      >
                        <Space direction="vertical" size={12}>
                          <RangePicker />
                        </Space>
                      </Form.Item>
                    </Col> */}
                  <Col xs={{ span: 24 }} sm={{ span: 20 }} lg={{ span: 20 }}>
                    {/* <p>Member list  </p> */}
                  </Col>
                  <Col
                    className="cs-admin-member-button cs-admin-managing-manager-button"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 4 }}
                  >
                    <Form.Item {...compLayout}>
                      <Button
                        loading={loading}
                        type="primary"
                        className="theme-btn float-right"
                        shape="round"
                        htmlType="submit"
                      >
                        검색
                      </Button>
                    </Form.Item>
                  </Col>

                  <Divider />

                  {/* <h3>Result</h3> */}
                  <div class="cs-admin-managing-manager-text">
                    <h3>
                      검색 {this.state.searchData.length} / 전체{" "}
                      {this.state.allData.length}
                    </h3>
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
                      dataSource={this.state.searchData}
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

export default ManagingManager;
