import React, { Component, useState } from 'react';

import {
  Layout, Form, Input, Button, Checkbox, Menu, Divider, DatePicker, Space, Table, Radio, Select, Upload, message
} from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';

import BaseUrl from '../../services/axios-url';
import TopNav from '../WithAuthHeaderFooter/TopNav';
import WithAuthFooter from '../WithAuthHeaderFooter/WithAuthFooter';
import PropertySettingsAside from './property-settings-aside';

const axios = require('axios');

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
}
const { Option } = Select;

const onFinish = values => {
  console.log('Success:', values);

  const data = new FormData()
  data.append('email', values.email)
  data.append('password', values.password)

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

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};



function handleSelectChange(value) {
  console.log(`selected ${value}`);
}

function handleMaintenancefeeChange(value) {
  console.log(`selected ${value}`);
}


class EditPropertyById extends Component {

  state = {}

  componentDidMount() {

    // console.log(window.location.pathname.split("/").pop())
    var propertyId = window.location.pathname.split("/").pop();

    axios
      .get(BaseUrl + '/adminapi/GetPropertyDetailById/' + propertyId)
      .then((response) => {

        if (response.data.status == 1 || response.data.status == '1') {
          // console.log("dddd: ", data.data.id);

          var AllData = response.data.data;

          console.log(AllData)
          // this.setState({ totalRecords: AllData.length })
          // var finalData = [];

          // for (var i = 0; i < AllData.length; i++) {
          //   finalData[i] = {
          //     key: AllData[i].id,
          //     id: AllData[i].id,
          //     number: i + 1,
          //     address: AllData[i].address,
          //     name: AllData[i].name,
          //     member_status: AllData[i].createdbytype,
          //     manager: AllData[i].managerId,
          //     status: AllData[i].status ? 'Active' : 'Inactive',
          //     assign_manager: <Button>assign</Button>,
          //     setting: <Button className="theme-btn-default ">
          //       <Link to={'/admin-get-single-property/' + AllData[i].id}>
          //         Setting
          //                 </Link>
          //     </Button>
          //   };
          // }
          // // console.log(finalData)
          // this.setState({
          //   allData: finalData
          // })

        } else {
          message.error('Sorry!! Unable to fetch data from server..');
        }

      })
      .catch((error) => {
        console.log(error);
        message.error('Sorry!! Something went wrong');
      })

  }

  render() {

    return (
      <Layout>

        <TopNav />

        <Content >
          <Layout className="site-layout-background" >

            < PropertySettingsAside />

            <Content style={{ padding: '10px 24px' }}>


              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Row>

                  <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 12 }} >
                    <p>Property edit</p>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 12 }} >

                    <Button type="primary" className="theme-btn float-right" shape="round" htmlType="submit" >
                      Save
                      </Button>

                    {/* 
                      <Button className="theme-btn-default float-right" shape="round" style={{ 'marginRight': '20px' }}>
                        <Link to="/member-setting" >
                          Back to list
                        </Link>
                      </Button> */}


                  </Col>


                  <Divider />

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }}  >
                    <p>Property information </p>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...compLayout}
                      label="Name"
                      name="name"
                      rules={[{ required: true, message: 'Please input name!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...compLayout}
                      label="Email"
                      name="email"
                      rules={[{ required: true, message: 'Please input email address!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...compLayout}
                      label="Phone no"
                      name="phone_no"
                      rules={[{ required: true, message: 'Please input phone number!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...compLayout}
                      label="Mobile no"
                      name="mobile_number"
                      rules={[{ required: true, message: 'Please input email address!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...compLayout}
                      label="Address"
                      name="address"
                      rules={[{ required: true, message: 'Please input address!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...compLayout}
                      label="Detail add."
                      name="detail_address"
                      rules={[{ required: true, message: 'Please input Detail address!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...compLayout}
                      label="Square"
                      name="square"
                      rules={[{ required: true, message: 'Please input square!' }]}
                    >
                      <Select defaultValue="lorem"
                        onChange={handleSelectChange}>
                        <Option value="lorem">lorem</Option>
                        <Option value="ipsum">ipsum</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...compLayout}
                      label="Type"
                      name="type"
                      rules={[{ required: true, message: 'Please input square!' }]}
                    >
                      <Select defaultValue="lorem"
                        onChange={handleSelectChange}>
                        <Option value="lorem">lorem</Option>
                        <Option value="ipsum">ipsum</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...compLayout}
                      label="Elevator"
                      name="elevator"
                      rules={[{ required: true, message: 'Please input square!' }]}
                    >
                      <Select defaultValue="lorem"
                        onChange={handleSelectChange}>
                        <Option value="lorem">lorem</Option>
                        <Option value="ipsum">ipsum</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...compLayout}
                      label="Number of rooms"
                      name="number_of_rooms"
                      rules={[{ required: true, message: 'Please input square!' }]}
                    >
                      <Select defaultValue="lorem"
                        onChange={handleSelectChange}>
                        <Option value="lorem">lorem</Option>
                        <Option value="ipsum">ipsum</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...compLayout}
                      label="Direction"
                      name="direction"
                      rules={[{ required: true, message: 'Please input square!' }]}
                    >
                      <Select defaultValue="lorem"
                        onChange={handleSelectChange}>
                        <Option value="lorem">lorem</Option>
                        <Option value="ipsum">ipsum</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...compLayout}
                      label="Available move in date "
                      name="available_move_in_date "
                      rules={[{ required: true, message: 'Please select Available move in date !' }]}
                    >
                      <Select defaultValue="lorem"
                        onChange={handleSelectChange}>
                        <Option value="lorem">lorem</Option>
                        <Option value="ipsum">ipsum</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...compLayout}
                      label="Landlord "
                      name="landlord"
                      rules={[{ required: true, message: 'Please select Landlord !' }]}
                    >
                      <Select defaultValue="lorem"
                        onChange={handleSelectChange}>
                        <Option value="lorem">lorem</Option>
                        <Option value="ipsum">ipsum</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...compLayout}
                      label="Pet"
                      name="pet"
                      rules={[{ required: true, message: '반려동물 동거 여부를 선택해 주세요!' }]}
                    >
                      <Select defaultValue="lorem"
                        onChange={handleSelectChange}>
                        <Option value="lorem">lorem</Option>
                        <Option value="ipsum">ipsum</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...compLayout}
                      label="Mortgage  "
                      name="mortgage"
                      rules={[{ required: true, message: 'Please select Mortgage  !' }]}
                    >
                      <Select defaultValue="lorem"
                        onChange={handleSelectChange}>
                        <Option value="lorem">lorem</Option>
                        <Option value="ipsum">ipsum</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...compLayout}
                      label="Contract status"
                      name="contract_status"
                      rules={[{ required: true, message: 'Please select Contract status !' }]}
                    >
                      <Select defaultValue="lorem"
                        onChange={handleSelectChange}>
                        <Option value="lorem">lorem</Option>
                        <Option value="ipsum">ipsum</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }} >
                    <p>Detail information(if needs)</p>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }} >
                    <Form.Item
                      // {...compLayout}
                      label="Maintenance fee"
                      name="maintenance_fee"
                      rules={[{ required: true, message: 'Please select Maintenance fee !' }]}
                    >
                      <Select mode="tags" placeholder="Maintenance fee" onChange={handleMaintenancefeeChange}>
                        <Option key="Electricity">Electricity</Option>
                        <Option key="Gas">Gas</Option>
                        <Option key="Water">Water</Option>
                        <Option key="Internet">Internet</Option>
                        <Option key="TV">TV</Option>
                        <Option key="n/a">n/a</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }} >
                    <Form.Item
                      {...fullLayout}
                      label="Manager "
                      name="manager"
                      rules={[{ required: true, message: 'Please select Manager  !' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }} >
                    <Form.Item
                      {...fullLayout}
                      label="Manager "
                      name="manager"
                      rules={[{ required: true, message: 'Please select Manager  !' }]}
                    >
                      <Upload >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                      </Upload>
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }} >
                    <Form.Item
                      {...fullLayout}
                      label="Contract List "
                      name="contract_list"
                      rules={[{ required: true, message: 'Please select Manager  !' }]}
                    >
                      {/* <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                          </Upload> */}
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }} >
                    <Form.Item
                      {...fullLayout}
                      label="Manager Comment"
                      name="manager_comment"
                      rules={[{ required: true, message: 'Please add Manager comment !' }]}
                    >
                      <Input />
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