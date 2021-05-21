import React, { Component } from "react";

import {
  Layout,
  Form,
  Input,
  Button,
  message,
  Divider,
  Table,
  Select,
  Tag,
} from "antd";

import "antd/dist/antd.css";
import { Link, withRouter } from "react-router-dom";
import { Row, Col } from "antd";

import BaseUrl from "../../services/axios-url";
import TopNav from "../WithAuthHeaderFooter/TopNav";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";
import PropertySettingsAside from "./property-settings-aside";

const axios = require("axios");

const { Content } = Layout;
const { CheckableTag } = Tag;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const { Option } = Select;

const columns = [
  {
    title: "번호",
    dataIndex: "number",
    // render: text => <a>{text}</a>,
  },
  {
    title: "집 정보",
    dataIndex: "address",
  },
  {
    title: "이름",
    dataIndex: "name",
  },
  {
    title: "회원 상태",
    dataIndex: "member_status",
  },
  {
    title: "담당자",
    dataIndex: "manager",
  },
  {
    title: "상태",
    dataIndex: "status",
  },
  {
    title: "담당자",
    dataIndex: "assign_manager",
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
    address: "Lorem ipsum",
    name: "Some name",
    manager: "lorem ipsum",
    member_status: "member",
    status: "Active",
    assign_manager: "here",
    setting: "edit",
  },
  {
    key: "2",
    number: "2",
    address: "Lorem ipsum",
    name: "Some name",
    manager: "lorem ipsum",
    member_status: "member",
    status: "Active",
    assign_manager: "here",
    setting: "Edit",
  },
];
const tagsData = ["Member", "Non-Member"];
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

class SearchProperty extends Component {
  state = {
    showStatusOptions: false,
    allData: [],
    total: 0,
    loading: false,
    dataForFilters: [],
    selected: ["Member"],
    isNonMember: false,
    isMember: true,
  };

  handleSelectChange = (value) => {
    console.log(`selected ${value}`);
    if (value == "status") {
      this.setState({ showStatusOptions: true });
    } else {
      this.setState({ showStatusOptions: false });
    }
  };
  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    // const nextSelectedTags = checked
    //   ? [...selectedTags, tag]
    //   : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", checked);
    // this.setState({ selectedTags: nextSelectedTags });
  }
  componentDidMount() {
    axios
      .post(BaseUrl + "/adminapi/SearchProperty", {
        filtertype: "",
        keyword: "",
      })
      .then((res) => {
        // console.log(res)
        if (res.data.status == 1) {
          var AllData = res.data.data.property;

          this.setState({ total: res.data.data.total });

          console.log(AllData);

          var finalData = [];

          for (var i = 0; i < AllData.length; i++) {
            let statustranslate =
              AllData[i].memberContractStatus == "Waiting" && "계약대기"
                ? "계약대기"
                : AllData[i].memberContractStatus == "Completed" && "계약완료"
                ? "계약완료"
                : AllData[i].memberContractStatus == "Ended" && "종료"
                ? "종료"
                : "보류 중";
            finalData[i] = {
              key: AllData[i].id,
              id: AllData[i].id,
              number: i + 1,
              address: AllData[i].address,
              name: AllData[i].name,
              member_status:
                AllData[i].createdbytype == "member" ? "회원" : "비회원",
              manager: AllData[i].manager != null ? AllData[i].manager : "미정",
              status: statustranslate,
              // AllData[i].memberContractStatus == "Pending"
              //   ? ""
              //   : AllData[i].memberContractStatus,
              assign_manager: (
                <Button
                  className="theme-btn-default "
                  disabled={AllData[i].memberContractStatus == "Ended"}
                >
                  <Link to={"/assign-manager-to-property/" + AllData[i].id}>
                    배정
                  </Link>
                </Button>
              ),
              setting: (
                <Button className="theme-btn-default ">
                  <Link to={"/admin-get-single-property/" + AllData[i].id}>
                    수정
                  </Link>
                </Button>
              ),
            };
          }
          console.log("finalData-----", finalData);
          this.setState({
            allData: finalData,
            loading: false,
            dataForFilters: finalData,
          });
        } else {
          message.error("다시 시도해주세요.");
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  }

  onFinish = (values) => {
    console.log("Success:", values);
    this.setState({ loading: true });

    axios
      .post(BaseUrl + "/adminapi/SearchProperty", {
        filtertype: values.search_keyword,
        keyword: values.search,
        isMember: this.state.isMember,
        isNonMember: this.state.isNonMember,
      })
      .then((res) => {
        // console.log(res)
        if (res.data.status == 1) {
          var AllData = res.data.data.property;

          console.log(AllData);

          this.setState({
            total: res.data.data.total,
          });
          var finalData = [];

          for (var i = 0; i < AllData.length; i++) {
            let statustranslate =
              AllData[i].memberContractStatus == "Waiting"
                ? "계약대기"
                : AllData[i].memberContractStatus == "Completed"
                ? "계약완료"
                : AllData[i].memberContractStatus == "Ended"
                ? "종료"
                : "보류 중";
            finalData[i] = {
              key: AllData[i].id,
              id: AllData[i].id,
              number: i + 1,
              address: AllData[i].address,
              name: AllData[i].name,
              member_status:
                AllData[i].createdbytype == "member" ? "회원" : "비회원",
              manager: AllData[i].manager != null ? AllData[i].manager : "미정",
              status: statustranslate,
              assign_manager: (
                <Button
                  className="theme-btn-default "
                  disabled={AllData[i].memberContractStatus == "Ended"}
                >
                  <Link to={"/assign-manager-to-property/" + AllData[i].id}>
                    배정
                  </Link>
                </Button>
              ),
              setting: (
                <Button className="theme-btn-default ">
                  <Link to={"/admin-get-single-property/" + AllData[i].id}>
                    환경
                  </Link>
                </Button>
              ),
            };
          }
          console.log(finalData);
          this.setState({
            allData: finalData,
            loading: false,
            dataForFilters: finalData,
          });
        } else {
          message.error("다시 시도해주세요.");
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);

    message.error("에러입니다.");
  };

  handleFilter(val) {
    console.log("val---", val);
    if (this.state.dataForFilters.length == "") {
      message.error("검색어를 입력하여 주세요.");
    }
    var updatedList = this.state.dataForFilters;
    console.log(this.state.allData);

    updatedList = updatedList.filter(function (item) {
      console.log("item.member_status", item.member_status);
      if (item.member_status) {
        return item.member_status.toLowerCase() === val;
      }
    });

    console.log(updatedList);
    this.setState({ allData: updatedList });
  }

  render() {
    const { showStatusOptions, allData, loading, selectedTags } = this.state;

    return (
      <Layout>
        <TopNav />

        <Content>
          <Layout className="site-layout-background">
            <PropertySettingsAside />

            <Content className="cs-admin-basic-block">
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                <Row>
                  <Col
                    className="cs-admin-basic-info cs-admin-real-estate-inner flex-center"
                    xs={{ span: 24 }}
                    sm={{ span: 20 }}
                    lg={{ span: 20 }}
                  >
                    {/* <p className="m-0">Search property</p> */}
                  </Col>
                  <Col
                    className="cs-admin-basic-info-button cs-admin-real-estate-inner"
                    xs={{ span: 24 }}
                    sm={{ span: 4 }}
                    lg={{ span: 4 }}
                  >
                    {/*  <Button type="primary" className="theme-btn float-right" shape="round" >
                        <Link to="/register-manager">
                        Register manager
                        </Link>
                      </Button>

                      
                      <Button className="theme-btn-default float-right" shape="round" style={{ 'marginRight': '20px' }}>
                        <Link to="/member-setting" >
                          Back to list
                        </Link>
                      </Button> */}
                  </Col>

                  <Divider className="cs-admin-basic-divider" />

                  <div
                    class="cs-admin-real-estate-email-block"
                    style={{ marginTop: "-15px" }}
                  >
                    <Col className="cs-admin-real-estate-email">
                      <Form.Item
                        // {...compLayout}
                        label="검색"
                        name="search_keyword"
                        rules={
                          [
                            // {
                            //   required: true,
                            //   message: "담당자이름을 검색해주세요.",
                            // },
                          ]
                        }
                      >
                        <Select
                          placeholder="선택해주세요"
                          defaultValue="선택해주세요"
                          onChange={this.handleSelectChange}
                        >
                          {/* <Option value="">선택해주세요</Option> */}
                          <Option value="name">이름</Option>
                          <Option value="manager">담당자</Option>
                          <Option value="status">상태</Option>
                        </Select>
                        {/* <Input /> */}
                      </Form.Item>
                    </Col>
                    {showStatusOptions ? (
                      <Col className="cs-admin-real-estate-email email-input">
                        <Form.Item
                          className="mr-10 ml-10"
                          // {...compLayout}
                          label=""
                          name="search"
                          rules={
                            [
                              // {
                              //   required: true,
                              //   message: "Please select from this list !",
                              // },
                            ]
                          }
                        >
                          <Select defaultValue="">
                            <Option value="">선택해주세요.</Option>
                            <Option value="Pending">보류 중</Option>
                            <Option value="Waiting">계약대기</Option>
                            <Option value="Completed">계약완료</Option>
                            <Option value="Ended">종료</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    ) : (
                      <Col className="cs-admin-real-estate-email email-input">
                        <Form.Item
                          className="ml-10 "
                          // {...compLayout}
                          label=""
                          name="search"
                          rules={
                            [
                              // { required: true, message: "Please input keyword!" },
                            ]
                          }
                        >
                          <Input placeholder="검색어를 입력해주세요" />
                        </Form.Item>
                      </Col>
                    )}
                    <Col className="cs-admin-real-estate-email">
                      <CheckableTag
                        className="cs-admin-search-property-btn"
                        checked={this.state.isMember}
                        onChange={() =>
                          this.setState({
                            isMember: !this.state.isMember,
                          })
                        }
                      >
                        회원
                      </CheckableTag>
                      <CheckableTag
                        className="cs-admin-search-property-btn"
                        checked={this.state.isNonMember}
                        onChange={() =>
                          this.setState({
                            isNonMember: !this.state.isNonMember,
                          })
                        }
                      >
                        비회원{" "}
                      </CheckableTag>
                    </Col>
                  </div>

                  <Col
                    className="cs-admin-real-esta-button"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <Button
                      loading={loading}
                      type="primary"
                      className="theme-btn float-right"
                      shape="round"
                      htmlType="submit"
                    >
                      검색
                    </Button>
                  </Col>

                  <Divider />
                  <div class="cs-admin-real-title">
                    <h3>
                      검색 {this.state.allData.length}개 / 전체{" "}
                      {this.state.total}개
                    </h3>
                  </div>
                  <Col
                    class="cs-admin-member-table"
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
                      dataSource={allData}
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

export default SearchProperty;
