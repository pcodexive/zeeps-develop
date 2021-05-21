import React, { Component } from "react";

import { Layout } from "antd";

const { Footer } = Layout;

class WithAuthFooter extends Component {
  state = {};
  render() {
    return (
      <Footer
        className="footer-abc"
        style={{
          position: "relative",
          bottom: "0",
          width: "-webkit-fill-available",
          textAlign: "center",
        }}
      >
        &copy; {new Date().getFullYear()} zeeps Co., Ltd. All rights reserverd.
      </Footer>
    );
  }
}

export default WithAuthFooter;
