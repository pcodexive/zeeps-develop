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

const axios = require("axios");

const { Header, Content, Footer, Sider } = Layout;
const { RangePicker } = DatePicker;

const { SubMenu } = Menu;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const compLayout = {
  labelCol: { span: 7 },
  wrapperCol: { offset: 0, span: 20 },
};
const fullLayout = {
  labelCol: { span: 4 },
  wrapperCol: { offset: 0, span: 24 },
};
const { Option } = Select;

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
  message.error("다시 시도해주세요.");
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

class RegisterProperty extends Component {
  state = {
    maintenance_fee: [],
    options: [],
    selected_maintenance_fee: "",
    selectedOptions: "",
    test: "",
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
              this.setState({ searchData: "" });
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

  onFinish = (values) => {
    // this.setState({ loading: true });
    console.log("Success:-", values);

    let formData = new FormData();

    // formData.append("propertyId", window.location.pathname.split("/").pop());
    formData.append("m_name", values.m_name);
    formData.append("name", values.property_name);
    formData.append("address", values.address);
    formData.append("detailAddress", values.detail_address);
    formData.append("showAddress", values.showAddress); // public, private------------------
    formData.append("areaSquare", values.square);
    formData.append("propertyType", values.type); // Sale, rent
    formData.append("elevator", values.elevator);
    formData.append("rooms", values.number_of_rooms);
    formData.append("direction", values.direction);
    // formData.append("availableMoveInStatus", values.available_date);
    formData.append("availableMoveInDate", values.available_move_in_date);
    // formData.append("isLandlord", values.house_owner); // -----------------------------pending
    formData.append("isPetAvailable", values.pet);
    formData.append("isMortgage", values.mortgage);
    formData.append("contractName", values.contract_name);
    formData.append("contractStatus", values.contract_status);
    formData.append("memberContractStatus", "no");
    formData.append("propertyCost", "0");
    formData.append("maintanceFee", "100");
    formData.append("propertyFeatureId", this.state.selectedOptions); // options ids
    formData.append("propertyFacilityId", this.state.selected_maintenance_fee); //maintainence fee id
    formData.append("managerComment", values.manager_comment);

    formData.append("mobile", values.mobile_number);
    formData.append("phone", values.phone_no);
    formData.append("email", values.email);

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
      .post(BaseUrl + "/propertyapi/AdminInsertProperty", formData)
      .then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          message.success("매물이 성공적으로 등록되었습니다.");

          // window.location = '/register-property-step-two';
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
        console.log(response.data.data);
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
        console.log(response.data.data);
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
  }

  render() {
    const {
      maintenance_fee,
      options,
      selectedOptions,
      selected_maintenance_fee,
      searchData,
    } = this.state;
    // console.log(this.state.test)
    return (
      <Layout>
        <TopNav />

        <Content>
          <Layout className="site-layout-background">
            <PropertySettingsAside />

            <Content style={{ padding: "10px 24px" }}>
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={onFinishFailed}
                ref={this.formRef}
              >
                <Row>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 12 }}>
                    <p>부동산 편집</p>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 12 }}>
                    <Button
                      type="primary"
                      className="theme-btn float-right"
                      shape="round"
                      htmlType="submit"
                    >
                      저장
                    </Button>

                    {/* 
                      <Button className="theme-btn-default float-right" shape="round" style={{ 'marginRight': '20px' }}>
                        <Link to="/member-setting" >
                          Back to list
                        </Link>
                      </Button> */}
                  </Col>

                  <Divider />

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <p>부동산 정보 </p>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...compLayout}
                      label="이름"
                      name="m_name"
                      rules={[
                        { required: true, message: "Please input name!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
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
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...compLayout}
                      label="전화 번호"
                      name="phone_no"
                      rules={[
                        {
                          required: false,
                          message: "Please input phone number!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...compLayout}
                      label="모바일 번호"
                      name="mobile_number"
                      rules={[
                        { required: true, message: "Please input mobile no!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...compLayout}
                      label="주소"
                      name="address"
                      rules={[
                        { required: true, message: "Please input address!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...compLayout}
                      label="상세 주소"
                      name="detail_address"
                      rules={[
                        {
                          required: true,
                          message: "Please input Detail address!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...compLayout}
                      label="광장"
                      name="square"
                      rules={[
                        { required: true, message: "Please input square!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...compLayout}
                      label="유형"
                      name="type"
                      rules={[
                        {
                          required: true,
                          message: "거래유형을 선택해 주세요!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="선택해주세요"
                        defaultValue="선택해주세요"
                        onChange={handleSelectChange}
                      >
                        <Option value="For Sale">판매용</Option>
                        <Option value="For Rent">전/월세</Option>
                        <Option value="For Sale, For Rent">판매용,모두</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...compLayout}
                      label="엘리베이터"
                      name="elevator"
                      rules={[
                        {
                          required: true,
                          message: "엘레베이터 여부를 선택해 주세요!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="선택해주세요"
                        defaultValue="선택해주세요"
                        // onChange={handleSelectChange}
                      >
                        <Option value="yes">예</Option>
                        <Option value="no">아니</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...compLayout}
                      label="객실 수"
                      name="number_of_rooms"
                      rules={[
                        {
                          required: true,
                          message: "Please input Number of rooms!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="선택해주세요"
                        defaultValue="선택해주세요"
                        // onChange={handleSelectChange}
                      >
                     <Option value="원룸">원룸</Option>
                    <Option value="투룸">투룸</Option>
                    <Option value="쓰리룸">쓰리룸</Option>
                    <Option value="포룸">포룸</Option>
                    <Option value="포룸+">포룸+</Option>
                    <Option value="기타">기타</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...compLayout}
                      label="방향"
                      name="direction"
                      rules={[
                        { required: true, message: "Please input direction!" },
                      ]}
                    >
                      <Select
                        placeholder="선택해주세요"
                        defaultValue="선택해주세요"
                        // onChange={handleSelectChange}
                      >
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
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...compLayout}
                      label="입주 가능 날짜"
                      name="available_move_in_date"
                      rules={[
                        {
                          required: true,
                          message: "Please select Available move in date !",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...compLayout}
                      label="집주인 연락처"
                      name="landlord_contact"
                      rules={[
                        {
                          required: false,
                          message: "Please enter Landlord contact !",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...compLayout}
                      label="애완 동물"
                      name="pet"
                      rules={[
                        {
                          required: true,
                          message: "반려동물 동거 여부를 선택해 주세요!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="선택해주세요"
                        defaultValue="선택해주세요"
                        // onChange={handleSelectChange}
                      >
                        <Option value="yes">유효한</Option>
                        <Option value="no">사용 불가</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...compLayout}
                      label="주소 표시"
                      name="showAddress"
                      rules={[
                        {
                          required: true,
                          message: "Please select Show address !",
                        },
                      ]}
                    >
                      <Select
                        placeholder="선택해주세요"
                        defaultValue="선택해주세요"
                        // onChange={handleSelectChange}
                      >
                        <Option value="public">공공의</Option>
                        <Option value="private">은밀한</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Divider />

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...compLayout}
                      label="저당"
                      name="mortgage"
                      rules={[
                        {
                          required: true,
                          message: "Please select Mortgage  !",
                        },
                      ]}
                    >
                      <Select
                        placeholder="선택해주세요"
                        defaultValue="선택해주세요"
                        // onChange={handleSelectChange}
                      >
                        <Option value="yes">유효한</Option>
                        <Option value="no">사용 불가e</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
                      {...compLayout}
                      label="계약 상태"
                      name="contract_status"
                      rules={[
                        {
                          required: true,
                          message: "Please select Contract status !",
                        },
                      ]}
                    >
                      <Select
                        placeholder="선택해주세요"
                        defaultValue="선택해주세요"
                        onChange={handleSelectChange}
                      >
                        <Option value="confirmation pending">
                          확인 대기 중
                        </Option>
                        <Option value="confirmed">확인</Option>
                        <Option value="closed">닫은</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <p>세부 정보 (필요한 경우)</p>
                    {/* <Form.Item
                      {...compLayout}
                      label="Detail info(if needs)"
                      name="additional_detail_info"
                      rules={[{ required: false, message: 'Please select detail info!' }]}
                    >
                      <Input />
                    </Form.Item> */}
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
                    <Form.Item
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
                  </Col>

                  <Divider />

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      // {...compLayout}
                      label="선택권"
                      name="option"
                      rules={[
                        { required: true, message: "Please select option !" },
                      ]}
                    >
                      {/* {getFieldDecorator("option", {
                        rules: [
                          {
                            required: true,
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
                        placeholder="Option"
                        onChange={this.handleOptionChange}
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
                    <Form.Item
                      // {...compLayout}
                      label="유지 보수 비용"
                      name="maintenance_fee"
                      rules={[
                        {
                          required: true,
                          message: "Please select Maintenance fee !",
                        },
                      ]}
                    >
                      <Select
                        mode="tags"
                        placeholder="Maintenance fee"
                        onChange={this.handleMaintenancefeeChange}
                      >
                        {maintenance_fee.map((m, i) => {
                          return (
                            <Option key={m.id}>{m.propertyFacility}</Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      {...fullLayout}
                      label="매니저 "
                      name="manager"
                      rules={[
                        {
                          required: false,
                          message: "Please select Manager  !",
                        },
                      ]}
                    >
                      <Input readonly disabled />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      {...fullLayout}
                      label="이미지 업로드 "
                      name="images"
                      rules={[
                        { required: false, message: "이미지를 선택해주세요" },
                      ]}
                    >
                      <Upload multiple maxCount={18} beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>
                          클릭하여 업로드
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      {...fullLayout}
                      label="계약 업로드"
                      name="contract_files"
                      rules={[
                        {
                          required: false,
                          message: "Please select Contract files  !",
                        },
                      ]}
                    >
                      <Upload multiple maxCount={20} beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>
                          클릭하여 업로드
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      {...fullLayout}
                      label="계약 명"
                      name="contract_name"
                      rules={[
                        {
                          required: true,
                          message: "Please select contract name  !",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  {/* <img src="https://zeepsapis.herokuapp.com/property/1610955479184-bezkoder-73190697.jpg"/> */}

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      {...fullLayout}
                      label="계약 목록"
                      name="contract_list"
                      rules={[
                        {
                          required: false,
                          message: "Please select Manager  !",
                        },
                      ]}
                    >
                      <Table
                        // rowSelection={{
                        //   type: 'checkbox',
                        //   ...rowSelection,
                        // }}
                        // rowSelection={rowSelection}
                        columns={columns}
                        dataSource={searchData}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}>
                    <Form.Item
                      {...fullLayout}
                      label="   관리자 코멘트"
                      name="manager_comment"
                      rules={[
                        {
                          required: false,
                          message: "Please add Manager comment !",
                        },
                      ]}
                    >
                      <TextArea rows={4} />
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

export default RegisterProperty;
