import React, { Component, useState } from "react";

import {
  Layout,
  Form,
  Button,
  Menu,
  Divider,
  DatePicker,
  Table,
  Select,
  message,
} from "antd";

import "antd/dist/antd.css";
import { Link, withRouter } from "react-router-dom";
import { Row, Col } from "antd";

import BaseUrl from "../../services/axios-url";
import TopNav from "../WithAuthHeaderFooter/TopNav";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";
import FaqSettingsAside from "./faq-settings-aside";

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
const { Option } = Select;

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
    width: 100,
    className: "txt-center",
    // render: text => <a>{text}</a>,
  },
  {
    title: "",
    dataIndex: "content",
  },
  {
    title: "정보수정",
    dataIndex: "setting",
    width: 100,
    className: "txt-right",
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
function handleSelectChange(value) {
  console.log(`selected ${value}`);
}

class ManageFaq extends Component {
  state = {
    allData: "",
    selectedRowKeys: "",
    delloading: false,
    size: "large",
  };

  componentDidMount() {
    axios
      .get(BaseUrl + "/adminapi/GetAllFAQ")
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
              content: AllData[i].question,
              setting: (
                <Button>
                  <Link to={"edit-faq/" + AllData[i].id}> 수정 </Link>
                </Button>
              ),
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

  deleteRecords = () => {
    if (
      this.state.selectedRowKeys.length == 0 ||
      this.state.selectedRowKeys == ""
    ) {
      message.error("Please select any row first..");
      return;
    }

    this.setState({ delloading: true });
    axios
      .post(BaseUrl + "/adminapi/DeleteFAQdetail", {
        ids: this.state.selectedRowKeys,
      })
      .then((res) => {
        console.log(res);
        this.setState({ allData: "" });
        if (res.data.status == 1 || res.data.status == "1") {
          axios
            .get(BaseUrl + "/adminapi/GetAllFAQ")
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
                    content: AllData[i].question,
                    setting: (
                      <Button>
                        <Link to={"edit-faq/" + AllData[i].id}> Edit </Link>
                      </Button>
                    ),
                  };
                }

                // console.log(finalData)
                this.setState({
                  allData: finalData,
                });

                message.success("삭제되었습니다");
              } else {
                message.error("다시 시도해주세요.");
              }
              this.setState({ delloading: false });
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
    const { allData, selectedRowKeys, delloading, size } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Layout>
        <TopNav />

        <Content>
          <Layout className="site-layout-background">
            <FaqSettingsAside />

            <Content className="cs-admin-basic-block">
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Row>
                  <Col
                    xs={{ span: 20 }}
                    sm={{ span: 20 }}
                    lg={{ span: 20 }}
                    className="flex-center cs-admin-basic-info"
                  >
                    <p className="m-0">FAQ 관리</p>
                  </Col>
                  <Col
                    className="flex-center cs-admin-basic-info-button"
                    xs={{ span: 4 }}
                    sm={{ span: 4 }}
                    lg={{ span: 4 }}
                  >
                    <Form.Item>
                      <Button
                        type="primary"
                        className="theme-btn float-right"
                        shape="round"
                        size={size}
                      >
                        <Link to="/register-faq">FAQ 등록</Link>
                      </Button>

                      {/*  
                      <Button className="theme-btn-default float-right" shape="round" style={{ 'marginRight': '20px' }}>
                        <Link to="/member-setting" >
                          Back to list
                        </Link>
                      </Button> */}
                    </Form.Item>
                  </Col>

                  <Divider className="cs-admin-basic-divider" />

                  <Col className="cs-admin-company" span={24}>
                    FAQ 목록
                  </Col>

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
                      dataSource={allData}
                    />
                    <div
                      class="cs-admin-manage-faq-button"
                      style={{ position: "absolute", bottom: "10px" }}
                    >
                      <Button
                        loading={delloading}
                        className="theme-btn"
                        type="primary"
                        shape="round"
                        disabled={!this.state.selectedRowKeys.length}
                        onClick={this.deleteRecords}
                      >
                        선택 삭제
                      </Button>
                    </div>
                  </Col>

                  {/* 
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Button className="theme-btn float-right" type="primary" shape="round" >Excel download </Button>
                  </Col> */}
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

export default ManageFaq;
