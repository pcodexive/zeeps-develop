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
  Select,
  Upload,
  message,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";
import { Link, withRouter } from "react-router-dom";
import { Row, Col } from "antd";

import BaseUrl from "../../services/axios-url";
import TopNav from "../WithAuthHeaderFooter/TopNav";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";
import PropertySettingsAside from "./property-settings-aside";
import TextArea from "antd/lib/input/TextArea";
import history from "../../RegisterProperty/history";
const axios = require("axios");

const { Header, Content, Footer, Sider } = Layout;
const { RangePicker } = DatePicker;

const { SubMenu } = Menu;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const compLayout = {
  labelCol: { span: 8 },
  wrapperCol: { offset: 0, span: 20 },
};
const fullLayout = {
  labelCol: { span: 4 },
  wrapperCol: { offset: 0, span: 24 },
};
const { Option } = Select;

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
  message.error("에러입니다.");
};

function handleSelectChange(value) {
  console.log(`selected ${value}`);
}

const columns = [
  {
    title: "번호",
    dataIndex: "number",
    // render: text => <a>{text}</a>,
  },
  {
    title: "이름",
    dataIndex: "name",
  },
  {
    title: "지우다",
    dataIndex: "delete",
  },
];
// const data = [
//   {
//     key: '1',
//     number: '1',
//     name: 'file name',
//     delete: <Button><Link to="#">Delete</Link></Button>,
//   },
//   {
//     key: '2',
//     number: '2',
//     name: 'file name',
//     delete: <Button><Link to="#">Delete</Link></Button>,
//   },
// ];

class EditPropertyById extends Component {
  state = {
    maintenance_fee: [],
    options: [],
    selected_maintenance_fee: "",
    selectedOptions: "",
    selectedType: "",
    searchData: [],
    AllData: "",
    fileList: [],
    showAddress: "",
  };

  formRef = React.createRef();

  handleMaintenancefeeChange = (value) => {
    // console.log(`selected ${value}`);
    var mFee = value.join(",");
    this.setState({ selected_maintenance_fee: mFee });
  };

  handleOptionChange = (value) => {
    console.log(`selected ${value}`);
    var opt = value.join(",");
    this.setState({ selectedOptions: opt });
  };
  handleTypeChange = (value) => {
    console.log(`selected ${value}`);
    var type = value.join(",");
    this.setState({ selectedType: type });
  };

  deleteContractById = (e) => {
    console.log("Content: ", e.currentTarget.dataset.id);
    var propertyId = window.location.pathname.split("/").pop();
    axios
      .get(
        BaseUrl +
          "/adminapi/DeleteContractFileById/" +
          e.currentTarget.dataset.id
      )
      .then((response) => {
        // console.log(response.data.data)
        if (response.data.status == 1 || response.data.status == "1") {
          // get contract list
          axios
            .get(
              BaseUrl + "/adminapi/GetAllContractsByPropertyId/" + propertyId
            )
            .then((res) => {
              //this.setState({ searchData: "" });
              // console.log(res)
              if (res.data.status == 1 || res.data.status == "1") {
                var searchData = res.data.data;

                console.log(searchData);

                var searchDataResult = [];

                for (var i = 0; i < searchData.length; i++) {
                  searchDataResult[i] = {
                    key: searchData[i].id,
                    id: searchData[i].id,
                    number: i + 1,
                    name: searchData[i].contractFile,
                    delete: (
                      <Button
                        data-id={searchData[i].id}
                        onClick={this.deleteContractById}
                      >
                        Delete
                      </Button>
                    ),
                  };
                }

                // console.log(searchDataResult)
                this.setState({
                  searchData: searchDataResult,
                  loading: false,
                });
              } else {
                message.error("다시 시도해주세요.");
              }
            })
            .catch((error) => {
              console.log(error);
              message.error("다시 시도해주세요.");
            });
        } else {
          message.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
      });
  };
  handleUpload = ({ fileList }) => {
    //---------------^^^^^----------------
    // this is equivalent to your "const img = event.target.files[0]"
    // here, antd is giving you an array of files, just like event.target.files
    // but the structure is a bit different that the original file
    // the original file is located at the `originFileObj` key of each of this files
    // so `event.target.files[0]` is actually fileList[0].originFileObj
    // console.log("fileList", fileList);

    // you store them in state, so that you can make a http req with them later

    //  const img = this.state.fileList.push(fileList);
    // console.log("fileList", fileList);
    // console.log("index", key);

    // this.setState(key);
    // fileList: [...this.state.fileList, ...fileList]
    this.setState({ fileList });
  };
  onFinish = (values) => {
    // this.setState({ loading: true });
    // console.log("Success:-", values.images);
    // return;

    let formData = new FormData();

    formData.append("propertyId", window.location.pathname.split("/").pop());
    //  formData.append("name", values.property_name);
    formData.append("address", values.address);
    formData.append("detailAddress", values.detail_address);
    // formData.append("showAddress", values.type);   // public, private
    formData.append("areaSquare", values.square);
    formData.append("propertyType", this.state.selectedType); // Sale, rent
    formData.append("elevator", values.elevator);
    formData.append("rooms", values.number_of_rooms);
    formData.append("direction", values.direction);
    formData.append("availableMoveInStatus", values.move_in_status);
    // formData.append("availableMoveInDate", values.available_move_in_date);
    // formData.append("isLandlord", values.house_owner); // -----------------------------pending
    formData.append("isPetAvailable", values.pet);
    formData.append("isMortgage", values.mortgage);
    formData.append("contractName", values.contract_name);
    formData.append("memberContractStatus", values.memberContractStatus);
    formData.append("propertyCost", this.state.AllData.propertyCost);
    formData.append("maintanceFee", values.maintenance_cost);
    formData.append("propertyFeatureId", this.state.selectedOptions); // options ids
    formData.append("propertyFacilityId", this.state.selected_maintenance_fee); //maintainence fee id
    formData.append("managerComment", values.manager_comment); // additional_detail_info

    formData.append("mobile", values.owner_contact_no); //maintainence fee id

    // images
    if (values.images) {
      values.images.fileList.forEach((file) => {
        formData.append("property", file.originFileObj);
      });
    }

    // contract files
    if (values.contract_files) {
      values.contract_files.fileList.forEach((file) => {
        formData.append("contractfile", file.originFileObj);
      });
    }

    axios
      .post(BaseUrl + "/propertyapi/AdminUpdateProperty", formData)
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          message.success("업데이트가 되었습니다.");

          history.goBack();
        } else {
          message.error(res.data.message);
        }
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    // console.log(window.location.pathname.split("/").pop())

    // get maintanence fee / facilities ------------------------------------------
    axios
      .get(BaseUrl + "/adminapi/GetAllPropertyFacilities/")
      .then((response) => {
        // console.log(response.data.data)
        if (response.data.status == 1 || response.data.status == "1") {
          // console.log("dddd: ", data.data.id);
          this.setState({
            maintenance_fee: response.data.data,
          });
        } else {
          message.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
      });

    // get options ----------------------------------------------
    axios
      .get(BaseUrl + "/adminapi/GetAllPropertyFeatures/")
      .then((response) => {
        // console.log(response.data.data)
        if (response.data.status == 1 || response.data.status == "1") {
          // console.log("dddd: ", data.data.id);
          this.setState({
            options: response.data.data,
          });
        } else {
          message.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("다시 시도해주세요.");
      });

    // ----------------------------------------------------

    var propertyId = window.location.pathname.split("/").pop();
    axios
      .get(BaseUrl + "/adminapi/GetPropertyDetailById/" + propertyId)
      .then((response) => {
        if (response.data.status == 1 || response.data.status == "1") {
          // console.log("dddd: ", response);

          var AllData = response.data.data;
          console.log(AllData);

          let optionsArray = [];
          response.data.data.features.forEach((f) => {
            if (f) {
              optionsArray.push(f.toString());
            }
          });

          let maintainenceFeeArray = [];
          response.data.data.facilities.forEach((m) => {
            if (m) {
              maintainenceFeeArray.push(m.toString());
            }
          });

          let propertyTypeArray = [];
          AllData.propertyType.split(",").forEach((t) => {
            propertyTypeArray.push(t.toString());
          });

          this.setState({
            selected_maintenance_fee: maintainenceFeeArray,
            selectedOptions: optionsArray,
            selectedType: propertyTypeArray,
            AllData: AllData,
          });
          this.setState({
            showAddress: AllData.showAddress,
            fileList: AllData.images.map((x, i) => {
              return {
                uid: i + 1,
                name: x,
                url: `${BaseUrl}/property/${x}`,
              };
            }),
          });
          // console.log("object", {
          //   fileList: AllData.images.map((x, i) => {
          //     return {
          //       uid: i + 1,
          //       name: x,
          //       url: `${BaseUrl}/property/${x}`,
          //     };
          //   }),
          // });
          console.log("AlData.images", AllData.images);
          this.formRef.current.setFieldsValue({
            m_name: AllData.member && AllData.member.name,
            email: AllData.member && AllData.member.email,
            phone_no: AllData.phone,
            mobile_number: AllData.member && AllData.member.mobile,
            address: AllData.address,
            detail_address: AllData.detailAddress,
            square: AllData.areaSquare,
            type: propertyTypeArray,
            elevator: AllData.elevator ? "yes" : "no",
            number_of_rooms: AllData.rooms,
            direction: AllData.direction,
            move_in_status: AllData.availableMoveInStatus,
            //  available_move_in_date: AllData.availableMoveInDate,
            landlord_contact: AllData.phone,
            landlord: AllData.isLandlord,
            pet: AllData.isPetAvailable ? "yes" : "no",
            showAddress: AllData.showAddress,
            mortgage: AllData.isMortgage ? "yes" : "no",
            memberContractStatus: AllData.memberContractStatus,
            maintenance_fee: maintainenceFeeArray,
            option: optionsArray,
            manager:
              AllData.manager &&
              `${AllData.manager.name} ${AllData.manager.adminlogin.role}`,
            // property_name: AllData.name,
            contract_name: AllData.contractName,
            manager_comment: AllData.managerComment,
            maintenance_cost: AllData.maintanceFee,
            // images: {
            //   fileList: AllData.images.map((x, i) => {
            //     return {
            //       uid: i + 1,
            //       name: x,
            //       url: `${BaseUrl}/property/${x}`,
            //     };
            //   }),
            // },
            // images:
          });
        } else {
          message.error("다시 시도해주세요.");
        }
      })
      .catch((error) => {
        console.log("error--->", error);
        message.error("다시 시도해주세요.");
      });

    // get contract list
    axios
      .get(BaseUrl + "/adminapi/GetAllContractsByPropertyId/" + propertyId)
      .then((res) => {
        // this.setState({ searchData: "" });
        // console.log(res)
        if (res.data.status == 1 || res.data.status == "1") {
          var data = res.data.data;

          console.log("search data---->", data);

          var searchDataResult = [];

          for (var i = 0; i < data.length; i++) {
            searchDataResult[i] = {
              key: data[i].id,
              id: data[i].id,
              number: i + 1,
              name: data[i].contractFile,
              status: data[i].status,
            };
          }

          // console.log(searchDataResult)
          this.setState({
            searchData: searchDataResult,
            loading: false,
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

  render() {
    const {
      maintenance_fee,
      options,
      selectedOptions,
      selected_maintenance_fee,
      searchData,
      fileList,
    } = this.state;
    console.log(this.state.selectedOptions);
    console.log(this.state.selected_maintenance_fee);
    console.log(this.state.selectedType);

    let data = searchData.filter((item) => item.status == "Ongoing");

    // console.log("data.length", disable_status);
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
                onFinishFailed={onFinishFailed}
                ref={this.formRef}
              >
                <Row>
                  <Col
                    xs={{ span: 20 }}
                    sm={{ span: 20 }}
                    lg={{ span: 20 }}
                    className="flex-center cs-admin-basic-info"
                  >
                    <p className="m-0">부동산 수정</p>
                  </Col>
                  <Col
                    className="flex-center cs-admin-basic-info-button"
                    xs={{ span: 4 }}
                    sm={{ span: 4 }}
                    lg={{ span: 4 }}
                  >
                    <Button
                      type="primary"
                      className="theme-btn float-right"
                      shape="round"
                      htmlType="submit"
                    >
                      부동산 저장
                    </Button>

                    {/* 
                      <Button className="theme-btn-default float-right" shape="round" style={{ 'marginRight': '20px' }}>
                        <Link to="/member-setting" >
                          Back to list
                        </Link>
                      </Button> */}
                  </Col>

                  <Divider className="cs-admin-basic-divider" />

                  <Col className="cs-admin-company" span={24}>
                    부동산 정보
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      className="cs-admin-form-input"
                      {...compLayout}
                      label="이름"
                      name="m_name"
                      rules={[
                        { required: false, message: "Please input name!" },
                      ]}
                    >
                      <Input
                        className="cs-admin-p-l-0 cs-ml20"
                        readOnly
                        placeholder="회원명"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      className="cs-admin-form-input"
                      {...compLayout}
                      label="이메일"
                      name="email"
                      rules={[
                        {
                          required: false,
                          message: "Please input email address!",
                        },
                      ]}
                    >
                      <Input
                        readOnly
                        className="cs-admin-p-l-0 cs-ml20"
                        placeholder="이메일 주소를 입력해주세요."
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      className="cs-admin-form-input"
                      {...compLayout}
                      label="전화번호"
                      name="phone_no"
                      rules={[
                        {
                          required: false,
                          message: "Please input phone number!",
                        },
                      ]}
                    >
                      <Input
                        className="cs-admin-p-l-0 cs-ml20"
                        placeholder="00-000-0000"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      className="cs-admin-form-input"
                      {...compLayout}
                      label="모바일 번호"
                      name="mobile_number"
                      rules={[
                        {
                          required: false,
                          message: "Please input email address!",
                        },
                      ]}
                    >
                      <Input readOnly className="cs-admin-p-l-0 cs-ml20" />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      className="cs-admin-form-input"
                      {...compLayout}
                      label="주소"
                      name="address"
                      rules={[
                        { required: false, message: "Please input address!" },
                      ]}
                    >
                      <Input
                        className="cs-admin-p-l-0 cs-ml20"
                        placeholder="서울시 양천구 목2동 201동"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      className="cs-admin-form-input"
                      {...compLayout}
                      label={`상세주소(${
                        this.state.showAddress == "Private"
                          ? "비공개"
                          : "공공의"
                      })`}
                      name="detail_address"
                      rules={[
                        {
                          required: false,
                          message: "Please input Detail address!",
                        },
                      ]}
                    >
                      <Input
                        className="cs-admin-p-l-0 cs-ml20"
                        placeholder="동 / 층 / 호 를 입력해주세요."
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      className="cs-admin-form-input with-border"
                      {...compLayout}
                      label="전용면적"
                      name="square"
                      rules={[
                        { required: false, message: "Please input square!" },
                      ]}
                    >
                      <Input
                        className="cs-admin-p-l-0 cs-ml20"
                        placeholder="선택해주세요."
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      className="cs-admin-form-input"
                      {...compLayout}
                      label="거래유형"
                      name="type"
                      rules={[
                        {
                          required: false,
                          message: "거래유형을 선택해 주세요!",
                        },
                      ]}
                    >
                      {/* <Select
                        onChange={handleSelectChange}>
                        <Option value="">Select</Option>
                        <Option value="For Sale">For Sale</Option>
                        <Option value="For Rent">For Rent</Option>
                        <Option value="For Sale, For Rent">For Both</Option>
                      </Select> */}

                      <Select
                        placeholder="선택해주세요."
                        mode="tags"
                        onChange={this.handleTypeChange}
                        className="cs-multiple-select cs-ml20"
                      >
                        <Option value="" disabled>
                          거래유형
                        </Option>
                        <Option key="For Sale">판매용</Option>
                        <Option key="For Rent">전/월세</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                    className="cs-admin-real-estate-email no-width "
                  >
                    <Form.Item
                      className="cs-admin-form-input"
                      {...compLayout}
                      label="엘레베이터"
                      name="elevator"
                      rules={[
                        {
                          required: false,
                          message: "엘레베이터 여부를 선택해 주세요!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="선택해주세요."
                        className="cs-ml20"
                        // onChange={handleSelectChange}
                      >
                        <Option value="yes">있어요</Option>
                        <Option value="no">없어요</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                    className="cs-admin-real-estate-email no-width"
                  >
                    <Form.Item
                      className="cs-admin-form-input"
                      {...compLayout}
                      label="구조"
                      name="number_of_rooms"
                      rules={[
                        {
                          required: false,
                          message: "Please input Number of rooms!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="선택해주세요."
                        className="cs-ml20"
                        // onChange={handleSelectChange}
                      >
                        <Option value="" disabled>
                          선택해주세요.
                        </Option>
                        <Option value="원룸">원룸</Option>
                        <Option value="투룸">투룸</Option>
                        <Option value="쓰리룸">쓰리룸</Option>
                        <Option value="포룸">포룸</Option>
                        <Option value="포룸+">포룸+</Option>
                        <Option value="기타">기타</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                    className="cs-admin-real-estate-email no-width"
                  >
                    <Form.Item
                      className="cs-admin-form-input"
                      {...compLayout}
                      label="방향"
                      name="direction"
                      rules={[
                        { required: false, message: "Please input direction!" },
                      ]}
                    >
                      <Select
                        // onChange={handleSelectChange}
                        className="cs-ml20"
                      >
                        <Option value="" disabled>
                          선택해주세요.
                        </Option>
                        <Option value="East">동쪽</Option>
                        <Option value="West">서쪽</Option>
                        <Option value="South">남쪽</Option>
                        <Option value="North">북쪽</Option>
                        <Option value="North-east">북동</Option>
                        <Option value="North-west">북서</Option>
                        <Option value="South-east">남동</Option>
                        <Option value="South-west">남서</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                    className="cs-admin-real-estate-email no-width"
                  >
                    <Form.Item
                      className="cs-admin-form-input"
                      {...compLayout}
                      label="입주가능일"
                      name="move_in_status"
                      rules={[
                        { required: false, message: "Please input status!" },
                      ]}
                    >
                      <Select
                        // onChange={handleSelectChange}
                        className="cs-ml20"
                      >
                        <Option value="" disabled>
                          선택해주세요.
                        </Option>
                        <Option value="Immediately">바로</Option>
                        <Option value="Negotiable">날짜협의</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      className="cs-admin-form-input with-border"
                      {...compLayout}
                      label="집주인 휴대폰 번호"
                      name="landlord_contact"
                      rules={[
                        {
                          required: false,
                          message: "Please enter Landlord contact !",
                        },
                      ]}
                    >
                      <Input placeholder="입력해주세요." className="cs-ml20" />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                    className="cs-admin-real-estate-email no-width"
                  >
                    <Form.Item
                      className="cs-admin-form-input"
                      {...compLayout}
                      label="반려견"
                      name="pet"
                      rules={[
                        {
                          required: false,
                          message: "반려동물 동거 여부를 선택해 주세요!",
                        },
                      ]}
                    >
                      <Select
                        // onChange={handleSelectChange}
                        className="cs-ml20"
                      >
                        <Option value="" disabled>
                          선택해주세요.
                        </Option>
                        <Option value="yes">가능</Option>
                        <Option value="no">불가능</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                    className="cs-admin-real-estate-email no-width"
                  >
                    <Form.Item
                      className="cs-admin-form-input"
                      {...compLayout}
                      label="전세대출"
                      name="mortgage"
                      rules={[
                        {
                          required: false,
                          message: "Please select Mortgage  !",
                        },
                      ]}
                    >
                      <Select
                        // onChange={handleSelectChange}
                        className="cs-ml20"
                      >
                        <Option value="" disabled>
                          선택해주세요.
                        </Option>
                        <Option value="yes">가능</Option>
                        <Option value="no">불가능</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    lg={{ span: 12 }}
                    className="cs-admin-real-estate-email no-width"
                  >
                    <Form.Item
                      className="cs-admin-form-input"
                      {...compLayout}
                      label="매물상태"
                      name="memberContractStatus"
                      rules={[
                        {
                          required: false,
                          message: "Please select Contract status !",
                        },
                      ]}
                    >
                      <Select onChange={handleSelectChange} className="cs-ml20">
                        {/* <Option value="" disabled> */}
                        {/* 선택해주세요
                        </Option> */}
                        <Option value="Pending">확인중</Option>
                        <Option value="Waiting">계약대기</Option>
                        <Option value="Completed">계약완료</Option>
                        <Option value="Ended">종료</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      className="cs-admin-form-input"
                      label="상세설명"
                      name="additional_detail_info"
                      rules={[
                        {
                          required: false,
                          message: "Please select detail info!",
                        },
                      ]}
                    >
                      <Input
                        className="cs-admin-p-l-0 cs-ml20"
                        placeholder="입력해주세요."
                      />
                    </Form.Item>
                  </Col>

                  {/* <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                    className="cs-admin-form-input"
                      {...compLayout}
                      label="부동산 이름"
                      name="property_name"
                      rules={[
                        {
                          required: false,
                          message: "Please input property name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col> */}

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      className="cs-admin-form-input"
                      // {...compLayout}
                      label="옵션"
                      name="option"
                      rules={[
                        { required: false, message: "Please select option !" },
                      ]}
                    >
                      {/* {getFieldDecorator("option", {
                        rules: [
                          {
                            required: false,
                            message: "Selecciona alumnos"
                          }
                        ]
                      })(
                        <Select
                          size="large"
                          mode="multiple"
                          placeholder="Selecciona alumnos"
                        >
                          {
                          options.map((o, i) => {
                            return <Option key={o.id}>{o.propertyFeatures}</Option>
                          })
                        }
                        </Select>
                      )} */}

                      <Select
                        mode="tags"
                        placeholder="선택해주세요."
                        onChange={this.handleOptionChange}
                        className="cs-multiple-select cs-ml20"
                      >
                        {options.map((o, i) => {
                          return (
                            <Option key={o.id}>{o.propertyFeatures}</Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item label="관리비" className="cs-admin-form-input">
                      <Input.Group className="m-0">
                        <Form.Item
                          className="cs-admin-form-input with-border "
                          style={{ borderBottom: "none" }}
                          // {...compLayout}
                          label=""
                          name="maintenance_cost"
                          rules={[
                            {
                              required: false,
                              message: "Please select Maintenance fee !",
                            },
                          ]}
                        >
                          <Input
                            placeholder="관리비 금액을 입력해주세요."
                            className="cs-ml20"
                          />
                        </Form.Item>
                        <Form.Item
                          className="cs-admin-form-input"
                          // {...compLayout}
                          name="maintenance_fee"
                          rules={[
                            {
                              required: false,
                              message: "Please select Maintenance fee !",
                            },
                          ]}
                        >
                          <Select
                            mode="tags"
                            placeholder="선택해주세요."
                            onChange={this.handleMaintenancefeeChange}
                            className="cs-multiple-select cs-ml20"
                            style={{ minWidth: "410px" }}
                          >
                            {maintenance_fee.map((m, i) => {
                              return (
                                <Option key={m.id}>{m.propertyFacility}</Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      className="cs-admin-form-input"
                      label=" 담당자 "
                      name="manager"
                      rules={[
                        {
                          required: false,
                          message: "Please select Manager  !",
                        },
                      ]}
                    >
                      <Input readonly placeholder="김정수 대리" />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      className="cs-admin-form-input cs-admin-upload-images-block"
                      label="사진등록"
                      name="images"
                      rules={[
                        { required: false, message: "이미지를 선택해주세요" },
                      ]}
                    >
                      <Upload
                        multiple
                        maxCount={18}
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={this.handleUpload}
                        placeholder="사진을 첨부해주세요"
                      >
                        <Button
                          icon={<UploadOutlined />}
                          className="cs-admin-upload-image-btn"
                        >
                          첨부파일 등록
                        </Button>
                        <span style={{ color: "#ADADAD" }} className="cs-ml20">
                          {fileList.length == 0 ? "사진을 첨부해주세요" : null}
                        </span>
                      </Upload>
                    </Form.Item>
                  </Col>
                  {this.state.AllData.createdbytype != "non-member" && (
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                      <Form.Item
                        className="cs-admin-form-input cs-admin-upload-images-block"
                        label="계약서 첨부"
                        name="contract_files"
                        rules={[
                          {
                            required: false,
                            message: "Please select Contract files  !",
                          },
                        ]}
                      >
                        <Upload
                          multiple
                          maxCount={20}
                          beforeUpload={() => false}
                          placeholder="계약서를 첨부해주세요."
                        >
                          <Button
                            className="cs-admin-upload-image-btn"
                            icon={<UploadOutlined />}
                          >
                            첨부파일 등록
                          </Button>
                        </Upload>
                      </Form.Item>
                    </Col>
                  )}
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      className="cs-admin-form-input"
                      label="계약서 등록"
                      name="contract_name"
                      rules={[
                        {
                          required: false,
                          message: "Please select contract name  !",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  {/* <img src="https://zeepsapis.herokuapp.com/property/1610955479184-bezkoder-73190697.jpg"/> */}

                  <Col
                    xs={{ span: 4 }}
                    sm={{ span: 4 }}
                    lg={{ span: 4 }}
                    className="ant-col ant-col-4 ant-form-item-label cs-admin-form-input"
                    style={{
                      padding: "15px 20px",
                      justifyContent: "flex-start",
                    }}
                  >
                    <h3
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      계약서 목록{" "}
                    </h3>
                  </Col>
                  <Col
                    xs={{ span: 20 }}
                    sm={{ span: 20 }}
                    lg={{ span: 20 }}
                    className="cs-admin-form-input"
                  >
                    {searchData.map((item) => (
                      <Row className="cs-admin-contract-list">
                        <Col
                          xs={{ span: 18 }}
                          sm={{ span: 18 }}
                          lg={{ span: 18 }}
                          className="cs-admin-contract-name-title"
                        >
                          {item.name}
                        </Col>
                        <Col
                          xs={{ span: 6 }}
                          sm={{ span: 6 }}
                          lg={{ span: 6 }}
                          className="cs-card-block"
                          style={{ border: "none", margin: "0" }}
                        >
                          <Button
                            shape="round"
                            className={
                              item.status == "Completed"
                                ? "theme-btn-default cs-btn-1"
                                : "theme-btn-default cs-btn-4"
                            }
                          >
                            {item.status == "Completed"
                              ? "계약서 컨펌완료"
                              : "계약서 컨펌대기"}
                          </Button>
                        </Col>
                      </Row>
                    ))}
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      className="cs-admin-form-input"
                      label="담당자 메모"
                      name="manager_comment"
                      rules={[
                        {
                          required: false,
                          message: "Please add Manager comment !",
                        },
                      ]}
                    >
                      <TextArea className="cs-admin-textarea-no-border cs-admin-p-l-0 cs-ml20" />
                    </Form.Item>
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

export default EditPropertyById;
