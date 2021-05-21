import React, { Component } from "react";

import {
  Layout,
  Form,
  Input,
  Button,
  Divider,
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
import PropertySettingsAside from "./property-settings-aside";
import history from "../../RegisterProperty/history";
const axios = require("axios");

const { Header, Content, Footer, Sider } = Layout;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const compLayout = {
  labelCol: { span: 6 },
  wrapperCol: { offset: 0, span: 20 },
};
const fullLayout = {
  labelCol: { span: 3 },
  wrapperCol: { offset: 0, span: 24 },
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
    dataIndex: "name",
  },
  {
    title: "핸드폰 번호",
    dataIndex: "mobile",
  },
  {
    title: "담당중인 집",
    dataIndex: "cases",
  },
];
const data = [
  {
    key: "1",
    number: "1",
    name: "Some name",
    mobile: "01111111",
    cases: "01",
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

class AssignManagerToProperty extends Component {
  state = {
    allData: "",
    searchData: "",
    selectedRowKeys: "",
    loading: false,
    saveLoading: false,
  };
  onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState(
      {
        selectedRowKeys,
      },
      () => {
        console.log(this.state.selectedRowKeys);
      }
    );
  };

  onFinish = (values) => {
    this.setState({ loading: true });
    // console.log('Success:', values);
    axios
      .post(BaseUrl + "/adminapi/searchManagerDetail", {
        name: values.search_keyword,
      })
      .then((res) => {
        this.setState({ searchData: "" });
        // console.log(res)
        if (res.data.status == 1 || res.data.status == "1") {
          var searchData = res.data.data;

          console.log(searchData);

          var searchDataResult = [];

          for (var i = 0; i < searchData.length; i++) {
            searchDataResult[i] = {
              key: searchData[i].roleId,
              id: searchData[i].roleId,
              number: i + 1,
              name: searchData[i].name,
              mobile: searchData[i].mobile,
              cases: searchData[i].propertyCount,
            };
          }

          // console.log(searchDataResult)
          this.setState({
            searchData: searchDataResult,
            loading: false,
          });
        } else {
          message.error(res.data.message);
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  };

  assignManager = () => {
    this.setState({ saveLoading: true });

    var propertyId = window.location.pathname.split("/").pop();
    axios
      .post(BaseUrl + "/adminapi/AssignManager", {
        id: propertyId,
        roleId: this.state.selectedRowKeys,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 1 || res.data.status == "1") {
          message.success(res.data.message);
          this.setState({ saveLoading: false });
          history.push("/property-list");

          console.log("-------------------> success");
        } else {
          message.error(res.data.message);
          this.setState({ saveLoading: false });
        }
      })
      .catch((error) => {
        this.setState({ saveLoading: false });
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  };

  componentDidMount() {
    var propertyId = window.location.pathname.split("/").pop();
    axios
      .get(BaseUrl + "/adminapi/GetPropertyDetailById/" + propertyId)
      .then((response) => {
        if (response.data.status == 1 || response.data.status == "1") {
          // console.log("dddd: ", data.data.id);

          var AllData = response.data.data;
          console.log(AllData);

          this.setState({
            address: AllData.address,
            property_name: AllData.name,
          });
        } else {
          message.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
      });

    this.setState({ loading: true });
    // console.log('Success:', values);
    axios
      .post(BaseUrl + "/adminapi/searchManagerDetail", {
        name: "",
      })
      .then((res) => {
        this.setState({ searchData: "" });
        // console.log(res)
        if (res.data.status == 1 || res.data.status == "1") {
          var searchData = res.data.data;

          console.log(searchData);

          var searchDataResult = [];

          for (var i = 0; i < searchData.length; i++) {
            searchDataResult[i] = {
              key: searchData[i].roleId,
              id: searchData[i].roleId,
              number: i + 1,
              name: searchData[i].name,
              mobile: searchData[i].mobile,
              cases: searchData[i].propertyCount,
            };
          }

          // console.log(searchDataResult)
          this.setState({
            searchData: searchDataResult,
            loading: false,
          });
        } else {
          message.error(res.data.message);
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  }

  render() {
    const {
      loading,
      selectedRowKeys,
      address,
      property_name,
      saveLoading,
    } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Layout>
        <TopNav />

        <Content>
          <Layout className="site-layout-background">
            <PropertySettingsAside />

            <Content className="cs-admin-basic-block">
              <Row>
                <Col
                  className="cs-admin-basic-info cs-admin-real-estate-inner flex-center"
                  xs={{ span: 24 }}
                  sm={{ span: 20 }}
                  lg={{ span: 20 }}
                >
                  <p className="m-0">담당자 배정</p>
                </Col>
                <Col
                  className="cs-admin-basic-info-button cs-admin-member-registration"
                  xs={{ span: 24 }}
                  sm={{ span: 4 }}
                  lg={{ span: 4 }}
                >
                  <Button
                    type="primary"
                    onClick={this.assignManager}
                    className="theme-btn float-right"
                    shape="round"
                    loading={saveLoading}
                  >
                    담당자 저장
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
                  부동산 정보
                </Col>

                <Col
                  className="cs-admin-company cs-admin-assign-manager-label"
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  lg={{ span: 12 }}
                >
                  <label> 집정보: {address}</label>
                </Col>

                <Col
                  className="cs-admin-company cs-admin-assign-manager-label"
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  lg={{ span: 12 }}
                >
                  <label> 이름: {property_name}</label>
                </Col>
              </Row>

              <Divider className="cs-admin-assign-manager-block-line" />

              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Row>
                  <Col className="cs-admin-company" span={24}>
                    담당자 선택
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      {...fullLayout}
                      className="cs-admin-form-input"
                      label="담당자"
                      name="search_keyword"
                      rules={
                        [
                          // { required: true, message: '담당자이름을 검색해주세요.' }
                        ]
                      }
                    >
                      <Input placeholder="담당자 이름" />
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
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 20 }}
                    lg={{ span: 20 }}
                  ></Col>
                  <Col
                    className="cs-admin-member-button assign-button"
                    xs={{ span: 24 }}
                    sm={{ span: 4 }}
                    lg={{ span: 4 }}
                  >
                    <Form.Item {...compLayout}>
                      <Button
                        loading={loading}
                        htmlType="submit"
                        type="primary"
                        className="theme-btn float-right"
                        shape="round"
                      >
                        검색
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <Divider />
              <Row>
                <div class="cs-admin-assign-manager ">
                  {/* <h3>결과</h3> */}
                </div>
                <Col
                  className="cs-admin-member-table"
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  lg={{ span: 24 }}
                >
                  <Table
                    rowSelection={{
                      type: "radio",
                      ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={this.state.searchData}
                  />
                </Col>
              </Row>
            </Content>
          </Layout>
        </Content>

        <WithAuthFooter />
      </Layout>
    );
  }
}

export default AssignManagerToProperty;
