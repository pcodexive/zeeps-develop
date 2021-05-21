import React, { Component } from 'react';

import { Layout } from 'antd';

const { Footer } = Layout;


class WithoutAuthFooter extends Component {
    
    state = {  }
    render() { 
        return ( 
            <Footer className="text-center copyright-bg text-white">
                &copy; { (new Date().getFullYear()) } zeeps Co., All rights reserverd.
            </Footer>
         );
    }
}
 
export default WithoutAuthFooter;