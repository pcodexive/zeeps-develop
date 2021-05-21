import React, { Component } from "react";

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
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import BaseUrl from "../../services/axios-url";
import TopNav from "../WithAuthHeaderFooter/TopNav";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";
import PropertySettingsAside from "./property-settings-aside";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const axios = require("axios");

const { Content } = Layout;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const onFinish = (values) => {
  console.log("Success:", values);
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
    title: "집 정보",
    dataIndex: "address",
  },
  {
    title: "이름",
    dataIndex: "name",
  },
  {
    title: "회원유무",
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
    // render: () => <Button className="theme-btn-default " >
    //   <Link to="#" >
    //     Edit
    //   </Link>
    // </Button>
  },
];
// const data = [
//   {
//     key: '1',
//     number: '1',
//     address: 'Lorem ipsum',
//     name: 'Some name',
//     member_status: 'member',
//     manager: 'lorem ipsum',
//     status: 'Active',
//     assign_manager: 'here',
//     setting: 'edit'
//   },
//   {
//     key: '2',
//     number: '2',
//     address: 'Lorem ipsum',
//     name: 'Some name',
//     member_status: 'member',
//     manager: 'lorem ipsum',
//     status: 'Active',
//     assign_manager: 'here',
//     setting: 'Edit'
//   }
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
function handleSelectChange(value) {
  console.log(`selected ${value}`);
}

class PropertyList extends Component {
  state = {
    allData: "",
    totalRecords: 0,
    selectedRowKeys: [],
    dataForExcel: [],
    beginExcelDownload: false,
    finalExcelData: [],
  };

  componentDidMount() {
    axios
      .get(BaseUrl + "/adminapi/GetAllProperties")
      .then((response) => {
        if (response.data.status == 1 || response.data.status == "1") {
          // console.log("dddd: ", data.data.id);

          var AllData = response.data.data;

          // console.log(AllData)

          this.setState({ totalRecords: AllData.length });
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
              // member_status: AllData[i].createdbytype,
              manager: AllData[i].manager != null ? AllData[i].manager : "미정",
              // manager: AllData[i].manager,
              status: statustranslate,
              // status:
              //   AllData[i].memberContractStatus == "Pending"
              //     ? ""
              //     : AllData[i].memberContractStatus,
              assign_manager: (
                <Button className="theme-btn-default ">
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
          // console.log(finalData)
          this.setState({
            allData: finalData,
            finalExcelData: finalData,
            dataForExcel: response.data.data,
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
    var selected = [];
    var allData = [];
    var finalArray = [];
    // selected = this.state.selectedRowKeys;
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
            number: i + 1,
            address: allData[j].address,
            name: allData[j].name,
            member_status: allData[j].createdbytype,
            manager: allData[j].manager,
            status: allData[j].status ? "Active" : "Inactive",
          };
        }
      }
    }
    this.setState(
      {
        finalExcelData: finalArray,
        selectedRowKeys,
      },
      () => {}
    );
  };

  deleteRecords = () => {
    this.setState({ delloading: true });
    axios
      .post(BaseUrl + "/adminapi/DeletePropertyDetail", {
        id: this.state.selectedRowKeys,
      })
      .then((res) => {
        console.log(res);
        this.setState({ allData: "" });
        if (res.data.status == 1 || res.data.status == "1") {
          axios
            .get(BaseUrl + "/adminapi/GetAllProperties")
            .then((response) => {
              if (response.data.status == 1 || response.data.status == "1") {
                // console.log("dddd: ", data.data.id);

                var AllData = response.data.data;

                console.log(AllData);

                this.setState({ totalRecords: AllData.length });
                var finalData = [];

                for (var i = 0; i < AllData.length; i++) {
                  finalData[i] = {
                    key: AllData[i].id,
                    id: AllData[i].id,
                    number: i + 1,
                    address: AllData[i].address,
                    name: AllData[i].name,
                    member_status: AllData[i].createdbytype,
                    manager: AllData[i].manager,
                    status: AllData[i].status ? "Active" : "Inactive",
                    assign_manager: (
                      <Button className="theme-btn-default ">
                        <Link
                          to={"/assign-manager-to-property/" + AllData[i].id}
                        >
                          Assign
                        </Link>
                      </Button>
                    ),
                    setting: (
                      <Button className="theme-btn-default ">
                        <Link
                          to={"/admin-get-single-property/" + AllData[i].id}
                        >
                          Setting
                        </Link>
                      </Button>
                    ),
                  };
                }
                // console.log(finalData)
                this.setState({
                  allData: finalData,
                  delloading: false,
                  dataForExcel: response.data.data,
                });
              } else {
                this.setState({ delloading: false });
                message.error("다시 시도해주세요.");
              }
            })
            .catch((error) => {
              console.log(error);
              message.error("다시 시도해주세요.");
              this.setState({ delloading: false });
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
    const { loading, selectedRowKeys, delloading, totalRecords } = this.state;

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
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Row>
                  <Col
                    className="cs-admin-basic-info cs-admin-real-estate-inner flex-center"
                    xs={{ span: 24 }}
                    sm={{ span: 20 }}
                    lg={{ span: 20 }}
                  >
                    <p className="m-0">부동산 리스트 </p>
                    {/* <p>Property List</p> */}
                  </Col>
                  <Col
                    className="cs-admin-basic-info-button cs-admin-real-estate-listing-inner"
                    xs={{ span: 24 }}
                    sm={{ span: 4 }}
                    lg={{ span: 4 }}
                  >
                    <Form.Item>
                      <Button
                        type="primary"
                        className="theme-btn float-right"
                        shape="round"
                      >
                        <Link to="/admin-register-property">부동산 등록</Link>
                      </Button>
                    </Form.Item>
                    {/*  
                      <Button className="theme-btn-default float-right" shape="round" style={{ 'marginRight': '20px' }}>
                        <Link to="/member-setting" >
                          Back to list
                        </Link>
                      </Button> */}
                  </Col>

                  <Divider className="cs-admin-basic-divider" />

                  <Col
                    className="cs-admin-real-estate-listing-title"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 24 }}
                  >
                    <h3>전체 {totalRecords} 개</h3>
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
                      dataSource={this.state.allData}
                    />
                  </Col>

                  <Col
                    className="cs-admin-member-button-inner"
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                  >
                    <Button
                      loading={delloading}
                      onClick={this.deleteRecords}
                      disabled={!this.state.selectedRowKeys.length}
                      className="theme-btn"
                      type="primary"
                      shape="round"
                    >
                      선택 삭제
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
                          className="theme-btn float-right"
                          type="primary"
                          shape="round"
                        >
                          엑셀 다운로드{" "}
                        </Button>
                      }
                    >
                      <ExcelSheet
                        data={this.state.finalExcelData}
                        name="Members"
                      >
                        <ExcelColumn label="S.no" value="number" />
                        <ExcelColumn label="Address" value="address" />
                        <ExcelColumn label="Name" value="name" />
                        <ExcelColumn
                          label="Member status"
                          value="member_status"
                        />
                        <ExcelColumn label="Manager" value="manager" />
                        <ExcelColumn label="Status" value="status" />
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

export default PropertyList;
