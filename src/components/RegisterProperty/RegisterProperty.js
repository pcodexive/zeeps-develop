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
  InputNumber,
} from "antd";

import {
  UploadOutlined,
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./register-property.css";
import "../css/global.css";
import "./CustomRegisterProperty.css";
import "./EmptyPhase.css";
import { Link, withRouter } from "react-router-dom";
import BaseUrl from "../services/axios-url";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";
import Cookies from "universal-cookie";
import requiredIcon from "../images/required.png";
import metersq from "../images/metersq.png";
import pyeong from "../images/pyeong.png";
import history from "./history";
import MobileNumericInput from "../common/MobileNumericInput";
import moment from "moment";
import UploadImage from "./UploadImage";
import InputMask from "react-input-mask";
import DaumPostcode from "react-daum-postcode";
import KakaoMap from "./KakaoMap";

const axios = require("axios");
// const imageToBase64 = require("image-to-base64");

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Step } = Steps;
const { Option } = Select;
const { CheckableTag } = Tag;
// const tagsData = ['Electricity', 'Gas', 'Water', 'Internet', 'Tv', 'n/a']; // maintainence fee

const DaumPostcodeStyle = {
  cursor: "pointer",
};

const optionData = [
  "A/C",
  "Refrigerator",
  "Washing machine",
  "Stove",
  "Induction",
  "Microwave",
  "Desk",
  "bookshelf",
  "Bed",
  "Closet",
  "Shoe rack",
  "Sink",
]; // options
const typeData = [
  {
    eng: "For Sale",
    korean: "매매",
  },
  {
    eng: "For Rent",
    korean: "전월세",
  },
];

// function onTypeChange(e) {
//     console.log(`radio checked:${e.target.value}`);
// }
function handleStructureChange(value) {
  console.log(`selected ${value}`);
}
function handleDirectionChange(value) {
  console.log(`selected ${value}`);
}
function onChangeAvailableDate(date, dateString) {
  console.log(date, dateString);
}

class RegisterProperty extends Component {
  formRef = React.createRef();
  state = {
    search: "",
    selectedTags: [],
    selectedTagsId: [],
    selectedTagsIdString: "",
    optionTags: [],
    optionTagsId: [],
    optionTagsIdString: "",
    previewVisible: false,
    previewImage: "",
    fileList: [],

    isHouseOwner: false,
    type: "For Sale",
    elevator: "Yes",
    structure: "One Room",
    direction: "East",
    publicPrivate: "",
    pet: "",
    mortgage: "",
    avalDate: "",
    AvalDateChangeDatePicker: "",
    actual_available_date: "",
    AreaInSqm: "",
    loading: false,
    tagsData: [],
    optionData: [],
    showMemberName: false,
    selectedType: [],
    selectedTypeString: "",
    dedicatedArea1: 20,
    dedicatedArea2: 30,
    dedicatedArea3: 36,
    HouseOwner: "",
    owner_contact_no: "",
    openAddressbox: false,
    searchResults: "",
    property_type: "",
    address: "",
    detail_address: "",
    disbleToggle: false,
    searchError: false,
    searchWord: "",
    isSubmited: false,
    area_manual: null,
    areaSqmFlag: false,
    editMode: false,
    editData: {},
    imageList: {
      file1: [],
      file2: [],
      file3: [],
      file3: [],
      file4: [],
      file5: [],
      file6: [],
      file7: [],
      file8: [],
      file9: [],
      file10: [],
      file11: [],
      file12: [],
      file13: [],
      file14: [],
      file15: [],
      file16: [],
      file17: [],
      file18: [],
    },
    imgbtn: false,
    maintainenceFeeDisable: false,
    addressVisible: false,
  };

  onAreaChange = (e) => {
    // console.log(`radio checked:${e.target.value}`);
    var data = e.target.value;

    // console.log(data)
    this.setState({
      //AreaInSqm: data * 3.306,
      area_manual: data,
    });
    this.formRef.current.setFieldsValue({
      area_manual: data,
    });
  };

  onAreaChangeInSqMt = () => {
    let areaSq = "";
    if (this.state.areaSqmFlag) {
      areaSq = this.state.area_manual / 3.306;
      this.setState({
        areaSqmFlag: false,
        area_manual: areaSq,
        dedicatedArea1: 20,
        dedicatedArea2: 30,
        dedicatedArea3: 36,
      });
    } else {
      areaSq = this.state.area_manual * 3.306;
      this.setState({
        areaSqmFlag: true,
        area_manual: areaSq,
        dedicatedArea1: 20 * 3.306,
        dedicatedArea2: 30 * 3.306,
        dedicatedArea3: 36 * 3.306,
      });
    }

    this.formRef.current.setFieldsValue({
      area_manual: areaSq,
    });
  };

  onAreaManualChange = (e) => {
    this.setState({
      area_manual: parseInt(e.target.value),
    });
  };

  handleMaintainenceFeeChange(tag, checked, i) {
    const { selectedTags, selectedTagsId } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    const nextSelectedTagsId = checked
      ? [...selectedTagsId, i]
      : selectedTagsId.filter((qt) => qt !== i);
    if (nextSelectedTagsId.includes(6)) {
      this.setState({
        maintainenceFeeDisable: true,
      });
    } else {
      this.setState({
        maintainenceFeeDisable: false,
      });
    }
    this.setState({
      selectedTags: nextSelectedTags,
      selectedTagsId: nextSelectedTagsId,
    });

    var separator = ",";
    var implodedArray = nextSelectedTagsId.join(separator);
    this.setState({
      selectedTagsIdString: implodedArray,
    });
  }

  handleOptionDataChange(tag, checked, i) {
    const { optionTags, optionTagsId } = this.state;
    const nextSelectedTags = checked
      ? [...optionTags, tag]
      : optionTags.filter((t) => t !== tag);
    const nextSelectedTagsId = checked
      ? [...optionTagsId, i]
      : optionTagsId.filter((wt) => wt !== i);
    this.setState({
      optionTags: nextSelectedTags,
      optionTagsId: nextSelectedTagsId,
    });

    var separator = ",";
    var implodedArray = nextSelectedTagsId.join(separator);
    this.setState({
      optionTagsIdString: implodedArray,
    });
  }

  handleTypeChange(tag, checked) {
    const { selectedType } = this.state;
    const nextSelectedType = checked
      ? [...selectedType, tag]
      : selectedType.filter((t) => t !== tag);
    this.setState({
      selectedType: nextSelectedType,
      selectedTypeString: nextSelectedType.join(","),
    });
    // console.log(nextSelectedType.join(','))
  }

  // file upload code start----------------------------------------------
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    // console.log("file", file);
    // let imageUrl = "";
    // if (this.props.match.params.id) {
    //   imageUrl = file.url;
    // } else {
    //   imageUrl = file.thumbUrl;
    // }

    this.setState({
      previewImage: file.thumbUrl ? file.thumbUrl : file.url,
      previewVisible: true,
    });
  };

  onHouseOwnerChange = (e) => {
    this.setState({
      isHouseOwner: !this.state.isHouseOwner,
      HouseOwner: e.target.value,
    });
  };

  onAvalDateChange = (e) => {
    this.setState({
      avalDate: e.target.value,
    });
  };
  onAvalDateChangeDatePicker = (date, dateString) => {
    this.setState({
      AvalDateChangeDatePicker: dateString,
    });
  };

  onTypeChange = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  onElevatorChange = (e) => {
    this.setState({
      elevator: e.target.value,
    });
  };

  handleStructureChange = (value) => {
    this.setState({
      structure: value,
    });
  };

  handleDirectionChange = (value) => {
    this.setState({
      direction: value,
    });
  };

  onChangePublicPrivate = (e) => {
    this.setState({
      publicPrivate: e.target.value,
    });
  };

  onPetChange = (e) => {
    this.setState({
      pet: e.target.value,
    });
  };
  propertyTypeChange = (e) => {
    this.setState({
      property_type: e.target.value,
    });
  };

  onMortgageChange = (e) => {
    this.setState({
      mortgage: e.target.value,
    });
  };

  onDateChange = (date, dateString) => {
    this.setState({
      actual_available_date: dateString,
    });
  };

  handleUpload = ({ fileList }, item) => {
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

    // }
    const withoutError = fileList.filter(
      (item) => !item.hasOwnProperty("error")
    );
    // console.log("temp", temp);
    this.setState({
      imageList: { ...this.state.imageList, [item]: withoutError },
    });
  };
  onHouseOwnerContactChange = (e) => {
    console.log("input text click");
  };

  isLoggedIn = () => {
    const cookies = new Cookies();
    var cookieName = btoa("zeeps");
    // console.log('encodedStringBtoA', cookieName);
    var finalCookieName = "";
    finalCookieName = cookieName.replace("=", "aAaA");

    if (
      cookies.get(finalCookieName) == undefined ||
      cookies.get(finalCookieName) == "undefined"
    ) {
      // this.setState({ showMemberName: true });
    } else {
      this.setState({ showMemberName: false });
    }

    var encodedStringBtoA = btoa("authorized");
    // console.log('encodedStringBtoA', encodedStringBtoA);
    var finalCookieValue = "";
    finalCookieValue = encodedStringBtoA.replace("==", "aAaA");
  };
  onClickImgBtn = () => {
    this.setState({
      imgbtn: true,
    });
  };
  onClickOK = () => {
    this.setState({ imgbtn: false });
  };
  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };
  onFinish = (values) => {
    this.setState({ loading: true });

    const cookies = new Cookies();
    var cookieName = btoa("zeeps");
    var finalCookieName = "";
    finalCookieName = cookieName.replace("=", "aAaA");

    var encodedStringBtoA = btoa("authorized");
    var finalCookieValue = "";
    finalCookieValue = encodedStringBtoA.replace("==", "aAaA");

    // Form data begins
    let apiEndpoint = "";
    let formData = new FormData();

    // already logged in user
    if (cookies.get(finalCookieName) == finalCookieValue) {
      if (cookies.get("UU")) {
        var LoggedInUserId = "";
        var LoggedInUserId = cookies.get("UU");
        formData.append("memberId", LoggedInUserId);

        apiEndpoint = "MemberInsertProperty";
      } else {
        message.error("다시 시도해주세요.");
        return;
      }
    }
    // Not logged in user
    else if (
      cookies.get(finalCookieName) == undefined ||
      cookies.get(finalCookieName) == "undefined"
    ) {
      formData.append("m_name", values.m_name);
      apiEndpoint = "UnSignedMemberInsertProperty";
    }
    // Not a normal user
    else {
      message.error("다시 시도해주세요.");
      return;
    }
    formData.append("propertyId", this.props.match.params.id || 0);

    formData.append("name", values.name ? values.name : "");
    formData.append("address", values.address || "");
    formData.append("detailAddress", values.detail_address || "");
    formData.append("showAddress", values.property_type || ""); // public, private
    formData.append("areaSquare", values.area_manual); //area
    formData.append("areaUnit", this.state.areaSqmFlag ? "m2" : "Pyeong");
    formData.append("propertyType", this.state.selectedTypeString || ""); // Sale, rent
    formData.append("elevator", values.elevator);
    formData.append("rooms", values.structure || "");
    formData.append("direction", values.direction || "");
    formData.append("availableMoveInStatus", values.available_date || "");
    formData.append(
      "availableMoveInDate",
      this.state.actual_available_date || ""
    );

    formData.append("isLandlord", values.house_owner || "");
    formData.append("isPetAvailable", values.pet || "");
    formData.append("isMortgage", values.mortgage || "");
    formData.append("contractStatus", "no");
    formData.append("propertyCost", 0);
    formData.append("maintanceFee", values.maintanceFee || 0);
    formData.append("propertyFeatureId", this.state.optionTagsIdString || ""); // options ids
    formData.append("propertyFacilityId", this.state.selectedTagsIdString); //maintainence fee id
    formData.append("memberContractStatus", "Pending");
    formData.append("area_manual", values.area_manual);
    //maintainence fee id
    const mobile =
      values.owner_contact_no && values.owner_contact_no.replaceAll("-", "");
    formData.append("mobile", mobile || ""); //maintainence fee id
    // formData.append("maintanceCost", '20,20,20,20,20'); // maintainence fee cost
    // formData.append("property", this.state.fileList[0].originFileObj);
    // console.log("values.images------", values.images);
    let propertyOldImg = [];
    // console.log(
    //   "Object.values(this.state.imageList)",
    //   Object.values(this.state.imageList)
    // );
    Object.values(this.state.imageList).map((file) => {
      if (file && file.length && file[0].url) {
        propertyOldImg.push(file[0].url.split("/").pop());
      } else if (file && file.length) {
        console.log("propertyOldImg", file[0].originFileObj);
        formData.append("property", file[0].originFileObj);
      }
    });
    // console.log("propertyOldImg", propertyOldImg);
    // values.images &&
    // values.images.fileList.forEach((file) => {
    //   if (file.url) {
    //     propertyOldImg.push(file.url.split("/").pop());
    //   } else {
    //     formData.append("property", file.originFileObj);
    //   }
    // });
    propertyOldImg.map((x, i) => {
      formData.append("propertyOldImg[" + i + "]", x);
    });

    axios
      .post(BaseUrl + "/propertyapi/" + apiEndpoint, formData)
      .then((res) => {
        if (res.data.status == 1) {
          message.success("매물이 성공적으로 등록되었습니다.");
          history.push("/register-property-step-two", {
            data: this.state.selectedTypeString,
            editData: this.state.editData,
            id: res.data.data.id,
          });

          // const history = createBrowserHistory();
          // history.push("/register-property-step-two");
          //window.location = "/register-property-step-two";
        } else {
          message.error(res.data.message);
        }
        this.setState({ loading: false });
      })
      .catch((error) => {
        message.error("다시 시도해주세요.");
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    this.isLoggedIn();
    if (this.props.match.params.id) {
      axios
        .get(
          BaseUrl +
            "/adminapi/GetPropertyDetailById/" +
            this.props.match.params.id
        )
        .then((response) => {
          if (response.data.status == 1 || response.data.status == "1") {
            const unit = response.data.data.areaUnit == "m2" ? true : false;
            if (unit) {
              this.setState({
                areaSqmFlag: true,
                dedicatedArea1: 20 * 3.306,
                dedicatedArea2: 30 * 3.306,
                dedicatedArea3: 36 * 3.306,
              });
            }

            response.data.data.images.map((x, i) => {
              this.setState({
                imageList: {
                  ...this.state.imageList,
                  ["file" + (i + 1)]: [
                    {
                      uid: i + 1,
                      name: x,
                      url: `${BaseUrl}/property/${x}`,
                    },
                  ],
                },
              });
            });
            this.setState({
              editMode: true,
              editData: response.data.data,
              selectedTagsId: response.data.data.facilities,
              optionTagsId: response.data.data.features,
              selectedType: response.data.data.propertyType.split(","),
              HouseOwner: response.data.data.isLandlord == true ? "Yes" : "No",
              disbleToggle: true,
              //areaSqmFlag:
              owner_contact_no: response.data.data.ownerPhone,
              selectedTypeString: response.data.data.propertyType,
              optionTagsIdString: response.data.data.features.join(","),
              selectedTagsIdString: response.data.data.facilities.join(","),
              // fileList: response.data.data.images.map((x, i) => {
              //   return {
              //     uid: i + 1,
              //     name: x,
              //     url: `${BaseUrl}/property/${x}`,
              //   };
              // }),

              // previewImage: response.data.data.images.map((x, i) => {
              //   return `${BaseUrl}/property/${x}`

              // }),
              avalDate: response.data.data.availableMoveInStatus,
              actual_available_date: response.data.data.availableMoveInDate,
              detail_address: response.data.data.detailAddress,
            });

            this.formRef.current.setFieldsValue({
              address: this.state.editData.address,
              detail_address: this.state.editData.detailAddress,
              property_type: this.state.editData.showAddress, //public/private,
              area_manual: this.state.editData.areaSquare,
              type: this.state.editData.propertyType, //for sale,for rent
              elevator: this.state.editData.elevator == true ? "Yes" : "No",
              structure: this.state.editData.rooms, //one room
              direction: this.state.editData.direction, //east west...
              // maintainence_fee: "TV",
              maintanceFee: this.state.editData.maintanceFee, //cost
              //option
              available_date: this.state.editData.availableMoveInStatus, //immediate negotiate
              // actual_available_date: this.state.editData.availableMoveInDate, //date
              house_owner:
                this.state.editData.isLandlord == true ? "Yes" : "No",
              owner_contact_no: this.state.editData.ownerPhone,
              pet: this.state.editData.isPetAvailable == true ? "Yes" : "No",
              mortgage: this.state.editData.isMortgage == true ? "Yes" : "No",
              //  images: this.state.editData.images,
            });

            this.setState({
              property_type: this.state.editData.showAddress,
            });
          } else {
            message.error(response.data.message);
          }
        })
        .catch((error) => {
          message.error("다시 시도해주세요.");
        });
    }
    // get maintanence fee / facilities ------------------------------------------
    axios
      .get(BaseUrl + "/adminapi/GetAllPropertyFacilities/")
      .then((response) => {
        if (response.data.status == 1 || response.data.status == "1") {
          this.setState({
            tagsData: response.data.data,
          });
        } else {
          message.error(response.data.message);
        }
      })
      .catch((error) => {
        message.error("다시 시도해주세요.");
      });

    // get options ----------------------------------------------
    axios
      .get(BaseUrl + "/adminapi/GetAllPropertyFeatures/")
      .then((response) => {
        if (response.data.status == 1 || response.data.status == "1") {
          // console.log("dddd: ", data.data.id);
          this.setState({
            optionData: response.data.data,
          });
        } else {
          message.error(response.data.message);
        }
      })
      .catch((error) => {
        message.error("다시 시도해주세요.");
      });
  }

  // onMobileChange = (value) => {
  //   this.setState({ owner_contact_no: value });
  //   console.log("this.state.owner_contact_no", this.state.owner_contact_no);
  // };

  handleComplete = (data) => {
    this.setState({
      search: data.jibunAddress || data.autoJibunAddress,
      addressVisible: false,
    });
    this.formRef.current.setFieldsValue({
      address: data.jibunAddress || data.autoJibunAddress,
    });
  };
  render() {
    // console.log(this.state.optionTagsIdString)
    const {
      type,
      elevator,
      pet,
      loading,
      tagsData,
      optionData,
      showMemberName,
      selectedType,
      imageList,
    } = this.state;
    // const images = [1, 2, 3];
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const requiiredIconStyle = {
      marginTop: "-8px",
      width: "12px",
    };

    const margin24Style = {
      marginBottom: "24px",
    };

    const margin0Style = {
      marginBottom: "0",
    };

    const { selectedTags, selectedTagsId } = this.state;
    const { optionTags, optionTagsId } = this.state;

    // File Upload code start ----------------------------------------------------------------------------
    const {
      previewVisible,
      previewImage,
      fileList,
      imgbtn,
      area_manual,
    } = this.state;
    const uploadButton = (
      <div>
        {/* <Icon type="plus" /> */}
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Layout className="register-property-layout">
        <WithAuthHeader />
        <Content>
          <Layout className="site-layout-background">
            <Space direction="vertical" size={"large"}>
              <Content className="content-padding">
                <Row className="">
                  <Col className="text-center cs-main-block">
                    {!imgbtn ? (
                      <>
                        <Row>
                          <Col className=" mb-15" span={24}>
                            <h2 className="cs-h2">집 내놓기</h2>
                          </Col>

                          <Col className="mb-15 cs-p-80" span={24}>
                            <Steps progressDot current={0} className="cs-step">
                              <Step title="1단계" description="" />
                              <Step title="2단계" subTitle="" description="" />
                              <Step title="3단계" description="" />
                            </Steps>
                          </Col>

                          <Col className=" mb-15" span={24}>
                            <h3 className="cs-h3-change">
                              집 내놓기 정보를 등록해주세요!
                            </h3>
                          </Col>
                        </Row>
                      </>
                    ) : (
                      <>
                        <h2 className="cs-h2 mb-15 csd-h2">사진 등록하기</h2>
                        <h2 className="cs-h2-title">
                          ∙ 사진은 최대 18장까지 등록 가능합니다.
                        </h2>
                        <Divider />
                      </>
                    )}

                    <Form
                      // {...layout}
                      ref={this.formRef}
                      name="basic"
                      initialValues={{ remember: true }}
                      onFinish={this.onFinish}
                      onFinishFailed={onFinishFailed}
                    >
                      <Row>
                        {!imgbtn && (
                          <>
                            <Col className="" span={24}>
                              <Form.Item
                                label=""
                                name="search_address"
                                className="search-address"
                                // onChange={(e) => {
                                //   this.setState({
                                //     searchWord: e.target.value,
                                //   });
                                // }}
                                onClick={() =>
                                  this.setState({
                                    addressVisible: true,
                                  })
                                }
                                //onFocus={this.handleSerachAddressChange}
                                rules={[
                                  {
                                    required: false,
                                    message: "주소를 입력해 주세요!",
                                  },
                                ]}
                              >
                                <Input
                                  type="text"
                                  value="주소를 클릭하여 찾아주세요!"
                                  readOnly
                                  className="Kc-search-address"
                                />

                                <Button
                                  className="theme-btn cs-search"
                                  style={{ marginLeft: "10px" }}
                                >
                                  <svg
                                    width="44"
                                    height="43"
                                    viewBox="0 0 44 43"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      x="-15"
                                      y="-14.125"
                                      width="75"
                                      height="75"
                                      rx="7.5"
                                      fill="#44358F"
                                    />
                                    <circle
                                      cx="19.3751"
                                      cy="20.2493"
                                      r="16.7708"
                                      stroke="white"
                                      stroke-width="1.875"
                                    />
                                    <path
                                      d="M31.7016 32.5751L40.8161 41.6897"
                                      stroke="white"
                                      stroke-width="1.875"
                                      stroke-linecap="square"
                                    />
                                  </svg>
                                </Button>
                              </Form.Item>
                              <Modal
                                closable={false}
                                centered
                                bodyStyle={{
                                  paddingLeft: "0",
                                  paddingRight: "0",
                                }}
                                visible={this.state.addressVisible}
                                okText="확인"
                                cancelText="취소"
                                onOk={() =>
                                  this.setState({ addressVisible: false })
                                }
                                onCancel={() =>
                                  this.setState({ addressVisible: false })
                                }
                                width={600}
                              >
                                <DaumPostcode
                                  onComplete={this.handleComplete}
                                  autoClose={false}
                                  focusInput={false}
                                  {...this.props}
                                />
                              </Modal>
                              {this.state.search && (
                                <KakaoMap searchWord={this.state.search} />
                              )}
                            </Col>

                            <Divider />

                            {showMemberName && (
                              <Col span={24}>
                                <Col span={24} className="text-left">
                                  Member Name
                                </Col>
                                <Col className="" span={24}>
                                  <Form.Item
                                    label=""
                                    name="m_name"
                                    rules={[
                                      {
                                        required: true,
                                        message: "이름을 입력해 주세요!",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="enter your name" />
                                  </Form.Item>
                                </Col>
                              </Col>
                            )}

                            <Col span={24} className="text-left cs-font-28">
                              주소{" "}
                              <img
                                style={requiiredIconStyle}
                                src={requiredIcon}
                                className="cs-validation-dot"
                              />{" "}
                            </Col>
                            <Col className="mb-15 text-left" span={24}>
                              <Form.Item
                                label=""
                                name="address"
                                rules={[
                                  {
                                    required: true,
                                    message: "주소를 입력해 주세요!",
                                  },
                                ]}
                              >
                                <Input placeholder="주소를 입력해주세요." />
                              </Form.Item>
                            </Col>

                            <Col span={24} className="text-left cs-font-28">
                              상세주소{" "}
                              <img
                                style={requiiredIconStyle}
                                src={requiredIcon}
                                className="cs-validation-dot"
                              />
                            </Col>
                            <Col
                              className="mb-15 text-left"
                              style={margin0Style}
                              span={24}
                            >
                              <Form.Item
                                label=""
                                name="detail_address"
                                className="jc-margin-detail"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "상세주소를 입력해 주세요! (동/층/호수 등)",
                                  },
                                ]}
                              >
                                <Input placeholder="상세주소를 입력해주세요." />
                              </Form.Item>
                            </Col>

                            {/* <Col className="text-left cs-font-28" span={24}>
                          Property Type
                        </Col> */}
                            <Col
                              className="text-left cs-mb24"
                              // style={margin24Style}
                              span={24}
                            >
                              <Form.Item
                                className="jc-margin"
                                label=""
                                name="property_type"
                                rules={[
                                  {
                                    required: false,
                                    message: "Please select Property Type !",
                                  },
                                ]}
                              >
                                <Radio.Group
                                  buttonStyle="solid"
                                  className="cs-radio custom-width"
                                  onChange={this.propertyTypeChange}
                                >
                                  <Radio value="Private">비공개</Radio>
                                  <Radio value="Public">공개</Radio>
                                </Radio.Group>
                              </Form.Item>
                              {this.state.property_type == "Private" && (
                                <p class="cs-font-24 cs-rpp">
                                  비공개 시 담당 중개사에게만 노출되니
                                  걱정마세요!
                                </p>
                              )}

                              {/*  <Form.Item
                                                        label=""
                                                        name="public_private"
                                                        rules={[{ required: false, message: 'Please select property type!' }]}
                                                        className="text-left"
                                                    >
                                                        <Radio.Group onChange={this.onChangePublicPrivate} >
                                                            <Radio value="Private">Private</Radio>
                                                            <Radio value="Public">Public</Radio>
                                                        </Radio.Group>
                                                        <div className="text-left"><small>Only exposed to a broker in charge If you choose Private</small></div>
                                                       <Checkbox.Group style={{ width: '100%' }} onChange={this.onChangePublicPrivate}>
                                                            <Row>
                                                                <Col >
                                                                    <Checkbox value="Private">Private</Checkbox>
                                                                </Col>
                                                                <Col >
                                                                    <Checkbox value="Public">Public</Checkbox>
                                                                </Col>
                                                            </Row>
                                                            <div className="text-left"><small>Only exposed to a broker in charge If you choose Private</small></div>
                                                        </Checkbox.Group> 
                                                    </Form.Item>*/}
                            </Col>

                            <Col span={14} className="text-left cs-font-28">
                              전용면적{" "}
                              <img
                                style={requiiredIconStyle}
                                src={requiredIcon}
                                className="cs-validation-dot"
                              />{" "}
                            </Col>
                            <Col span={10} className="text-right">
                              {/* <Button className="btn"> */}
                              {/* <ReloadOutlined onClick={this.onAreaChangeInSqMt} />㎡  */}
                              {this.state.areaSqmFlag ? (
                                <img
                                  src={pyeong}
                                  onClick={this.onAreaChangeInSqMt}
                                  height="46"
                                  style={{ cursor: "pointer" }}
                                  className="cs-exclusive"
                                />
                              ) : (
                                <img
                                  src={metersq}
                                  onClick={this.onAreaChangeInSqMt}
                                  height="46"
                                  style={{ cursor: "pointer" }}
                                  className="cs-exclusive"
                                />
                              )}

                              {/* </Button> */}
                            </Col>
                            <Col
                              span={24}
                              className="text-left mb-15"
                              style={margin0Style}
                            >
                              <Form.Item
                                label=""
                                name="area"
                                className="text-left cs-font-24"
                                rules={[
                                  {
                                    required: false,
                                    message: "집주인 여부를 선택해 주세요!",
                                  },
                                ]}
                              >
                                <Radio.Group
                                  className="cs-radio cs-outer cs-b3-outer"
                                  onChange={this.onAreaChange}
                                  buttonStyle="solid"
                                  // defaultValue={this.state.area_manual}
                                  value={area_manual}
                                >
                                  <Radio.Button
                                    value={this.state.dedicatedArea1}
                                  >
                                    <div className="cs-txt">
                                      {this.state.dedicatedArea1}
                                      {!this.state.areaSqmFlag && "평"}
                                    </div>
                                  </Radio.Button>
                                  <Radio.Button
                                    value={this.state.dedicatedArea2}
                                  >
                                    <div className="cs-txt">
                                      {this.state.dedicatedArea2}
                                      {!this.state.areaSqmFlag && "평"}
                                    </div>
                                  </Radio.Button>
                                  <Radio.Button
                                    value={this.state.dedicatedArea3}
                                  >
                                    <div className="cs-txt">
                                      {this.state.dedicatedArea3}
                                      {!this.state.areaSqmFlag && "평"}
                                    </div>
                                  </Radio.Button>
                                </Radio.Group>
                              </Form.Item>
                            </Col>
                            <Col span={24} className="text-left cs-mb24">
                              <Form.Item
                                label=""
                                onChange={this.onAreaManualChange}
                                name="area_manual"
                                rules={[
                                  {
                                    pattern: /^\d*\.?\d*$/,
                                    message: "숫자만 입력해주세요",
                                  },
                                  {
                                    required: true,
                                    message:
                                      "매물의 기타 면적을 입력해 주세요!",
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                              <span
                                className="right-placeholder"
                                style={{ color: "#CBCBCB" }}
                              >
                                {this.state.areaSqmFlag ? (
                                  <>
                                    m<sup>2</sup>
                                  </>
                                ) : (
                                  "평"
                                )}
                              </span>
                            </Col>

                            <Col span={24} className="text-left cs-font-28">
                              거래유형{" "}
                              <img
                                style={requiiredIconStyle}
                                src={requiredIcon}
                                className="cs-validation-dot"
                              />
                              <label className="cs-red-btn float-right kc-font-weight">
                                중복선택 가능
                              </label>{" "}
                            </Col>
                            <Col span={24} className="text-left mb-15">
                              <Form.Item
                                label=""
                                name="type"
                                rules={
                                  [
                                    // {
                                    //   required: false,
                                    //   message: "거래유형을 선택해 주세요!",
                                    // },
                                    // {
                                    //   validator: (_, value) =>
                                    //     value
                                    //       ? Promise.resolve()
                                    //       : Promise.reject("Should accept agreement"),
                                    // },
                                  ]
                                }
                                className="text-left cs-outer"
                              >
                                {/* <Radio.Group onChange={this.onTypeChange} value={type} buttonStyle="solid" >
                                                                <Radio.Button value="For Sale">For Sale</Radio.Button>
                                                                <Radio.Button value="For Rent">For Rent</Radio.Button>
                                                                <Radio.Button value="For Sale, For Rent">For Both</Radio.Button>
                                                            </Radio.Group> */}

                                {typeData.map((tag, key) => (
                                  <CheckableTag
                                    key={key}
                                    className="tags-custom-width-1 "
                                    key={tag.eng}
                                    checked={selectedType.indexOf(tag.eng) > -1}
                                    onChange={(checked) =>
                                      this.handleTypeChange(tag.eng, checked)
                                    }
                                  >
                                    <div className="cs-txt">{tag.korean}</div>
                                  </CheckableTag>
                                ))}
                                {this.state.isSubmited &&
                                  !this.state.selectedTypeString && (
                                    <p
                                      style={{ color: "red" }}
                                      className="cs-error"
                                      style={{ paddingLeft: "15px" }}
                                    >
                                      거래유형을 선택해 주세요!
                                    </p>
                                  )}
                              </Form.Item>
                            </Col>

                            <Col span={24} className="text-left cs-font-28">
                              엘레베이터{" "}
                              <img
                                style={requiiredIconStyle}
                                src={requiredIcon}
                                className="cs-validation-dot"
                              />{" "}
                            </Col>
                            <Col span={24} className="mb-15 text-left">
                              <Form.Item
                                label=""
                                name="elevator"
                                rules={[
                                  {
                                    required: true,
                                    message: "엘레베이터 여부를 선택해 주세요!",
                                  },
                                ]}
                                className="text-left"
                              >
                                <Radio.Group
                                  className="cs-radio custom-width cs-outer"
                                  onChange={this.onElevatorChange}
                                  value={elevator}
                                  buttonStyle="solid"
                                >
                                  <Radio.Button value="Yes">
                                    <div className="cs-txt">있음</div>
                                  </Radio.Button>
                                  <Radio.Button value="No">
                                    <div className="cs-txt">없음</div>
                                  </Radio.Button>
                                </Radio.Group>
                              </Form.Item>
                            </Col>

                            <Col span={24} className="text-left cs-font-28">
                              구조
                            </Col>
                            <Col span={24} className="mb-15 text-left ">
                              <Form.Item
                                label=""
                                name="structure"
                                rules={[
                                  {
                                    required: false,
                                    message: "Please select structure!",
                                  },
                                ]}
                                className="text-left cs-select"
                              >
                                <Select
                                  placeholder="선택해주세요"
                                  style={{ width: "100%" }}
                                  onChange={this.handleStructureChange}
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

                            <Col span={24} className="text-left cs-font-28">
                              방향
                            </Col>
                            <Col span={24} className="text-left mb-15">
                              <Form.Item
                                label=""
                                name="direction"
                                rules={[
                                  {
                                    required: false,
                                    message: "Please select direction!",
                                  },
                                ]}
                                className="text-left cs-select"
                              >
                                <Select
                                  placeholder="선택해주세요"
                                  style={{ width: "100%" }}
                                  onChange={this.handleDirectionChange}
                                >
                                  <Option value="동쪽">동쪽</Option>
                                  <Option value="서쪽">서쪽</Option>
                                  <Option value="남쪽">남쪽</Option>
                                  <Option value="북쪽">북쪽</Option>
                                  <Option value="북동">북동</Option>
                                  <Option value="북서">북서</Option>
                                  <Option value="남동">남동</Option>
                                  <Option value="남서">남서</Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col
                              span={24}
                              className="text-left cs-font-28 cs-line-height-46"
                            >
                              관리비
                              <label className="cs-red-btn float-right kc-font-weight">
                                중복선택 가능
                              </label>
                            </Col>
                            <Col
                              span={24}
                              className="mb-15"
                              style={margin0Style}
                            >
                              <Form.Item
                                label=""
                                name="maintainence_fee"
                                rules={[
                                  {
                                    required: false,
                                    message: "Please select Maintanence Fee!",
                                  },
                                ]}
                                className="text-left cs-select cs-outer cs-b3-outer"
                                style={margin0Style}
                              >
                                {tagsData.map((tag, i) => (
                                  <CheckableTag
                                    className="tags-custom-width"
                                    key={tag.id}
                                    value={tag.propertyFacility}
                                    // checked={selectedTagsId.indexOf(tag.id) > -1}
                                    checked={
                                      selectedTagsId.indexOf(tag.id) > -1
                                    }
                                    onChange={(checked) =>
                                      this.handleMaintainenceFeeChange(
                                        tag.propertyFacility,
                                        checked,
                                        tag.id
                                      )
                                    }
                                  >
                                    <div className="cs-txt">
                                      {tag.propertyFacility}
                                    </div>
                                  </CheckableTag>
                                ))}
                              </Form.Item>
                            </Col>
                            <Col
                              span={24}
                              className="text-left cs-font-28 mb-15"
                            >
                              <Form.Item
                                label=""
                                name="maintanceFee"
                                rules={[
                                  {
                                    pattern: /^\d*\.?\d*$/,
                                    message: "숫자만 입력해주세요",
                                  },
                                ]}
                              >
                                <Input
                                  disabled={this.state.maintainenceFeeDisable}
                                />
                              </Form.Item>
                              <span
                                className="right-placeholder"
                                style={{ color: "#CBCBCB" }}
                              >
                                만원
                              </span>
                            </Col>

                            <Col
                              span={24}
                              className="text-left cs-font-28 cs-line-height-46"
                            >
                              옵션
                              <label className="cs-red-btn float-right kc-font-weight">
                                중복선택 가능
                              </label>
                            </Col>
                            <Col span={24} className="mb-15">
                              <Form.Item
                                label=""
                                name="option"
                                rules={[
                                  {
                                    required: false,
                                    message: "Please select Option!",
                                  },
                                ]}
                                className="text-left cs-outer cs-b3-outer"
                              >
                                {optionData.map((tags, i) => (
                                  <CheckableTag
                                    className="tags-custom-width"
                                    key={tags.id}
                                    checked={optionTagsId.indexOf(tags.id) > -1}
                                    onChange={(checked) =>
                                      this.handleOptionDataChange(
                                        tags,
                                        checked,
                                        tags.id
                                      )
                                    }
                                  >
                                    <div className="cs-txt">
                                      {tags.propertyFeatures}
                                    </div>
                                  </CheckableTag>
                                ))}
                              </Form.Item>
                            </Col>

                            <Col span={24} className="text-left cs-font-28">
                              입주가능일{" "}
                            </Col>
                            <Col span={24} className="mb-15 text-left">
                              <Form.Item
                                label=""
                                name="available_date"
                                rules={[
                                  {
                                    required: false,
                                    message: "Please select available date!",
                                  },
                                ]}
                              >
                                <Radio.Group
                                  className="cs-radio custom-width cs-outer"
                                  buttonStyle="solid"
                                  onChange={this.onAvalDateChange}
                                >
                                  <Radio.Button value="Immediately">
                                    <div className="cs-txt">즉시입주 </div>
                                  </Radio.Button>
                                  <Radio.Button value="Negotiable">
                                    <div className="cs-txt">날짜협의</div>
                                  </Radio.Button>
                                </Radio.Group>

                                {/* <DatePicker onChange={onChangeAvailableDate} /> */}
                              </Form.Item>
                            </Col>
                            {this.state.avalDate == "Negotiable" && (
                              <Col span={24} className="mb-15 text-left">
                                <Form.Item
                                  label=""
                                  name="actual_available_date"
                                  rules={[
                                    {
                                      required: false,
                                      message: "Please select available date!",
                                    },
                                  ]}
                                >
                                  <DatePicker
                                    onChange={this.onDateChange}
                                    className="cs-datepicker"
                                    placeholder="날짜 선택"
                                    disabledDate={this.disabledDate}
                                    defaultValue={
                                      this.state.actual_available_date &&
                                      moment(
                                        this.state.actual_available_date,
                                        "YYYY/MM/DD"
                                      )
                                    }
                                  />
                                </Form.Item>
                              </Col>
                            )}

                            <Col span={24} className="text-left cs-font-28">
                              집주인이신가요??{" "}
                              <img
                                style={requiiredIconStyle}
                                src={requiredIcon}
                                className="cs-validation-dot"
                              />{" "}
                            </Col>
                            <Col span={24} className="mb-15 text-left">
                              <Form.Item
                                label=""
                                name="house_owner"
                                rules={[
                                  {
                                    required: true,
                                    message: "집주인 여부를 선택해 주세요!",
                                  },
                                ]}
                              >
                                <Radio.Group
                                  className="cs-radio custom-width cs-outer"
                                  onChange={this.onHouseOwnerChange}
                                  buttonStyle="solid"
                                >
                                  <Radio.Button value="Yes">
                                    <div className="cs-txt">집주인입니다</div>
                                  </Radio.Button>
                                  <Radio.Button value="No">
                                    {" "}
                                    <div className="cs-txt">
                                      집주인이 아닙니다.
                                    </div>
                                  </Radio.Button>
                                </Radio.Group>
                              </Form.Item>
                            </Col>

                            {this.state.HouseOwner == "No" && (
                              <>
                                <Col span={24} className="text-left cs-font-28">
                                  집주인 연락처{" "}
                                </Col>
                                <Col span={24} className="mb-15 text-left">
                                  <Form.Item label="" name="owner_contact_no">
                                    <InputMask
                                      className="ant-input"
                                      mask="099-9999-9999"
                                      // onChange={this.onMobileChange}
                                      placeholder="010-1234-5678"
                                      maskChar=""
                                      // value={"01023453554"}
                                    />
                                  </Form.Item>
                                </Col>
                              </>
                            )}
                            {this.state.HouseOwner == "Yes" && (
                              <>
                                <Col span={24} className="text-left cs-font-28">
                                  반려견{" "}
                                  <img
                                    style={requiiredIconStyle}
                                    src={requiredIcon}
                                    className="cs-validation-dot"
                                  />{" "}
                                </Col>
                                <Col span={24} className="mb-15 text-left">
                                  <Form.Item
                                    label=""
                                    name="pet"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "반려동물 동거 여부를 선택해 주세요!",
                                      },
                                    ]}
                                  >
                                    <Radio.Group
                                      className="cs-radio custom-width cs-outer"
                                      buttonStyle="solid"
                                      onChange={this.onPetChange}
                                    >
                                      <Radio.Button value="Yes">
                                        <div className="cs-txt">가능해요! </div>
                                      </Radio.Button>
                                      <Radio.Button value="No">
                                        <div className="cs-txt">
                                          불가능해요!
                                        </div>
                                      </Radio.Button>
                                    </Radio.Group>
                                  </Form.Item>
                                </Col>

                                <Col span={24} className="text-left cs-font-28">
                                  전세대출{" "}
                                  <img
                                    style={requiiredIconStyle}
                                    src={requiredIcon}
                                    className="cs-validation-dot"
                                  />{" "}
                                </Col>
                                <Col span={24} className="mb-15 text-left">
                                  <Form.Item
                                    label=""
                                    name="mortgage"
                                    onChange={this.onMortgageChange}
                                    rules={[
                                      {
                                        required: true,
                                        message: "집주인 여부를 선택해 주세요!",
                                      },
                                    ]}
                                  >
                                    <Radio.Group
                                      buttonStyle="solid"
                                      className="cs-radio custom-width cs-outer"
                                    >
                                      <Radio.Button value="Yes">
                                        <div className="cs-txt">가능해요! </div>
                                      </Radio.Button>
                                      <Radio.Button value="No">
                                        <div className="cs-txt">
                                          불가능해요!
                                        </div>
                                      </Radio.Button>
                                    </Radio.Group>
                                  </Form.Item>
                                </Col>
                              </>
                            )}

                            {/* {this.state.isHouseOwner &&
                                                    <Row>
                                                        <Col span={24} className="text-left">Enter the owner phone number</Col>
                                                        <Col span={24} className="mb-15 text-left">
                                                            <Form.Item
                                                                label=""
                                                                name="owner_contact_no"
                                                                rules={[{ required: true, message: 'Please select owner contact no !' }]}
                                                            >
                                                                <Input />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                } */}

                            <Col span={14} className="text-left cs-font-28">
                              사진등록
                            </Col>
                            <Col span={10} className="text-right cs-font-28">
                              <Button
                                className="cs-red-outline-btn"
                                onClick={this.onClickImgBtn}
                              >
                                사진등록
                              </Button>
                            </Col>
                          </>
                        )}
                        <Col span={24} className="text-left mb-15">
                          <Form.Item
                            label=""
                            name="images"
                            className="cs-file-upload"
                            // onChange={this.onMortgageChange}
                            // rules={[
                            //   {
                            //     pattern: /.(jpe?g|png|gif|bmp)$/i,
                            //     message: "Wrong format!",
                            //   },
                            // ]}
                          >
                            {/* <Upload
                              listType="picture-card"
                              fileList={fileList}
                              onPreview={this.handlePreview}
                              onChange={this.handleUpload}
                              beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                              multiple
                              className="cs-upload"
                              maxCount={18}
                            >
                              {uploadButton}
                            </Upload> */}

                            {/* {console.log("imageList", Object.keys(imageList))} */}
                            {Object.keys(imageList).map((item, key) => {
                              return key < (!imgbtn ? 3 : 18) ? (
                                <>
                                  <UploadImage
                                    handleUpload={(event) =>
                                      this.handleUpload(event, item)
                                    }
                                    handlePreview={this.handlePreview}
                                    fileList={this.state.imageList[item]}
                                  />
                                </>
                              ) : null;
                            })}
                          </Form.Item>
                          {imgbtn && (
                            <>
                              <Divider />
                              <Button
                                className="theme-btn cs-submit-button"
                                style={{ width: "100%" }}
                                type="primary"
                                onClick={() => this.setState({ imgbtn: false })}
                              >
                                확인
                              </Button>
                            </>
                          )}

                          {/* <Button onClick={this.handleSubmit} // this button click will trigger the manual upload
                                                    >
                                                        Submit
                                                        </Button> */}

                          <Modal
                            visible={previewVisible}
                            footer={null}
                            onCancel={this.handleCancel}
                          >
                            <img
                              alt="example"
                              style={{ width: "100%" }}
                              src={previewImage}
                            />
                          </Modal>
                        </Col>
                        {!imgbtn && <Divider />}
                        {!imgbtn && (
                          <Col span={24} className="mb-15 text-left">
                            <Form.Item>
                              <Button
                                loading={loading}
                                className="theme-btn cs-submit-button"
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%", marginTop: "5px" }}
                                onClick={() =>
                                  this.setState({ isSubmited: true })
                                }
                              >
                                {this.props.match.params.id
                                  ? "최신 정보"
                                  : "등록하기"}
                              </Button>
                            </Form.Item>
                          </Col>
                        )}
                      </Row>{" "}
                      {/* Form row end */}
                    </Form>
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

export default RegisterProperty;
