import React, { Component } from 'react';
import { Result, Button } from 'antd';
import '../css/global.css';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    state = {}
    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={ <Link to="/" ><Button className="theme-btn">Back to Home</Button> </Link>}
            />
        );
    }
}

export default NotFound;