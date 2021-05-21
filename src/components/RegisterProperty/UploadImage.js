import React, { Component } from "react";
import { message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
class UploadImage extends Component {
  beforeUpload = (file) => {
    const img = file.type.split("/");
    if (img[0] == "image") {
      return false;
    } else {
      message.error("이미지를 선택해주세요");
      return true;
    }
  };
  render() {
    const { fileList, handleUpload, handlePreview } = this.props;
    const uploadButton = (
      <div>
        {/* <Icon type="plus" /> */}
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleUpload}
        beforeUpload={(file) => this.beforeUpload(file)} // return false so that antd doesn't upload the picture right away
        className="cs-upload"
        maxCount={1}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
    );
  }
}

export default UploadImage;
