import React, { Component } from 'react';

import { Layout } from 'antd';

const { Header } = Layout;

class WithoutAuthHeader extends Component {

    state = {  }

    render() { 
        return ( 

                <Header className="login-bg "> 
              
                 </Header>
         );
    }
}
 
export default WithoutAuthHeader;