import React, { Component } from "react";
import WithAuthHeader from "../WithAuthHeaderFooter/WithAuthHeader";
import {
  Layout,
  Form,
  Input,
  Button,
  Checkbox,
  Menu,
  Divider,
  Row,
  Col,
  Space,
  Modal,
  Steps,
  Radio,
  Select,
  Tag,
  DatePicker,
  Upload,
  message,
  Card,
  Collapse,
} from "antd";

import {
  UploadOutlined,
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
// import './register-property.css';
import "../css/global.css";
import { Link, withRouter } from "react-router-dom";
import BaseUrl from "../services/axios-url";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";
const axios = require("axios");
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Step } = Steps;
const { Panel } = Collapse;

class Faq extends Component {
  state = {
    allData: [],
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
              question: AllData[i].question,
              answer: AllData[i].answer,
            };
          }

          // console.log(finalData)
          this.setState({
            allData: finalData,
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
    const { allData } = this.state;

    return (
      <Layout className="register-property-layout">
        <WithAuthHeader />

        <Content style={{ minHeight: "500px" }}>
          <Layout className="site-layout-background">
            <Space direction="vertical" size={"large"}>
              <Content className="content-padding">
                <Row className="">
                  <Col className="cs-main-block">
                    <Row>
                      <Col className="text-center mb-15" span={24}>
                        <h2 class="cs-h2 cs-faq-title">자주묻는 질문</h2>
                      </Col>
                      <Col span={24}>
                        <Collapse
                          accordion
                          expandIconPosition="right"
                          className="faq-collapse"
                        >
                          {allData.map((data, i) => {
                            {
                              var a = i + 1;
                            }
                            return (
                              <Panel
                                header={"Q" + a + ". " + data.question}
                                key={i}
                              >
                                {" "}
                                {data.answer}{" "}
                              </Panel>
                            );
                          })}
                        </Collapse>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Content>
            </Space>
          </Layout>
        </Content>

        <WithAuthFooter />
      </Layout>
    );
  }
}

export default Faq;
