import React, { Component } from "react";
import { Layout, Button, Divider, Row, Col, Space } from "antd";
import { PicCenterOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./landing.css";
import "../css/global.css";
import { Link } from "react-router-dom";
import WithAuthFooter from "../WithAuthHeaderFooter/WithAuthFooter";
import WithAuthHeader from "../WithAuthHeaderFooter/WithAuthHeader";
import Cookies from "universal-cookie";
import main1 from "../images/main1.png";
import main2 from "../images/main2.png";
import main3 from "../images/main3.png";
import main4 from "../images/main4.png";

import slider1 from "../images/slider1.png";
import slider2 from "../images/slider2.png";
import slider3 from "../images/slider3.svg";
import slider4 from "../images/slider4.svg";
import { Carousel, WingBlank } from 'antd-mobile';

const { Content } = Layout;

class LandingPage extends Component {
  state = {
    isLoggedIn: false,
    splashScreen: true,
    isMobileView: ( window.innerWidth <= 768 ) && !localStorage.getItem('splashScreen')
  }

  componentDidMount() {
      if (localStorage.getItem('splashScreen')) {
        this.setState({ isMobileView: false })
      }
      
    const cookies = new Cookies();
    var cookieName = btoa('zeeps');
    var finalCookieName = '';
    finalCookieName = cookieName.replace('=', 'aAaA')

    var encodedStringBtoA = btoa('authorized');
    var finalCookieValue = '';
    finalCookieValue = encodedStringBtoA.replace('==', 'aAaA')

    if (cookies.get('emVlcHMaAaA') == 'YXV0aG9yaXplZAaAaA') {
      this.setState({ isLoggedIn: true })
    }
    setTimeout(
        function() {
            this.setState({ splashScreen: false});
        }
        .bind(this),
        3000
    );
  }

  render() {
    const { isLoggedIn, splashScreen, isMobileView } = this.state;


    return (
      <Layout className="cs-homepage">
        {!isMobileView && (<div>
          <div className={isLoggedIn ? 'landing-banner-auth cs-slider-banner' : 'landing-banner-without-auth cs-slider-banner'}>
              <WithAuthHeader />

              <div className="cs-slider-content cs-new-1080">
                <div style={{display: 'flex'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="120" height="66" viewBox="0 0 120 66" className="cs-home-logo">
                        <defs>
                            <path id="lmyyy2at0a" d="M0.007 0.106L14.58 0.106 14.58 19.381 0.007 19.381z"/>
                            <path id="6n7rbno8lc" d="M0 0.051L53.187 0.051 53.187 52.033 0 52.033z"/>
                        </defs>
                        <g fill="none" fill-rule="evenodd" opacity=".8">
                            <g>
                                <g>
                                    <g>
                                        <g>
                                            <path fill="#FFF" d="M19.75 47.473L30.195 32.854 30.195 32.746 20.36 32.746 20.36 27.872 37.912 27.872 37.912 32.493 27.431 47.148 27.431 47.256 37.876 47.256 37.876 52.13 19.75 52.13z" transform="translate(-421 -178) translate(421 178) translate(0 .887) translate(4.138 3.119)"/>
                                            <g>
                                                <path fill="#FFF" d="M44.203 40.819h5.6c0-2.707-.898-3.682-2.692-3.682-1.364 0-2.657.794-2.908 3.682m-6.174 2.093v-.469c0-5.74 3.554-9.349 9.082-9.349 6.21 0 8.542 3.502 8.542 9.602v1.588H44.24c.359 2.924 2.01 3.754 5.133 3.754 2.19 0 4.092-.541 5.527-1.119v3.79c-1.4.83-3.697 1.66-7.106 1.66-6.57 0-9.764-3.32-9.764-9.457M62.819 40.819h5.599c0-2.707-.897-3.682-2.692-3.682-1.364 0-2.656.794-2.907 3.682m-6.174 2.093v-.469c0-5.74 3.553-9.349 9.081-9.349 6.21 0 8.543 3.502 8.543 9.602v1.588H62.855c.359 2.924 2.01 3.754 5.132 3.754 2.19 0 4.092-.541 5.528-1.119v3.79c-1.4.83-3.697 1.66-7.107 1.66-6.569 0-9.763-3.32-9.763-9.457M88.57 43.201v-.577c0-3.863-1.185-4.801-3.267-4.801-1.256 0-2.225.36-2.764.722v8.952c.539.36 1.508.686 2.549.686 2.19 0 3.481-.975 3.481-4.982zm-12.132-9.746h5.886v1.553h.18c1.22-1.192 2.871-1.878 5.348-1.878 3.589 0 6.963 2.13 6.963 8.916v.433c0 7.328-3.482 9.89-8.543 9.89-1.866 0-3.05-.36-3.733-.649v5.74h-6.101V33.454z" transform="translate(-421 -178) translate(421 178) translate(0 .887) translate(4.138 3.119) translate(0 .084)"/>
                                                <g transform="translate(-421 -178) translate(421 178) translate(0 .887) translate(4.138 3.119) translate(0 .084) translate(96.331 32.988)">
                                                    <mask id="y0bbsvjksb" fill="#fff">
                                                        <use href="#lmyyy2at0a"/>
                                                    </mask>
                                                    <path fill="#FFF" d="M.115 18.154v-4.115c1.435.542 2.98 1.083 5.491 1.083 2.226 0 3.123-.541 3.123-1.552 0-.903-.539-1.227-2.118-1.408l-1.687-.252C1.766 11.44.007 9.707.007 6.098.007 2.38 2.447.106 7.58.106c2.656 0 4.451.36 5.851.974v4.08c-1.184-.362-2.871-.83-5.06-.83-1.831 0-2.693.468-2.693 1.443 0 .902.646 1.227 2.118 1.444l1.723.216c3.733.506 5.061 2.527 5.061 5.74 0 4.079-2.549 6.208-8.076 6.208-2.477 0-4.918-.469-6.39-1.227" mask="url(#y0bbsvjksb)"/>
                                                </g>
                                                <g transform="translate(-421 -178) translate(421 178) translate(0 .887) translate(4.138 3.119) translate(0 .084)">
                                                    <mask id="7v7pkbn2ld" fill="#fff">
                                                        <use href="#6n7rbno8lc"/>
                                                    </mask>
                                                    <path fill="#FFF" d="M53.187 15.165L26.604 0.051 0 15.165 0 52.033 15.371 52.033 15.371 43.719 7.914 43.719 7.914 20.738 26.602 10.297 33.935 14.167 45.273 20.151 45.273 25.109 53.187 25.109z" mask="url(#7v7pkbn2ld)"/>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                
                  <h2 className="text-white cs-title" style={{marginBottom: '0px'}}>사이트에 오신걸 </h2>
                </div>
                  <h2 className="text-white cs-subtitle" style={{lineHeight: '55px'}}>환영합니다!</h2>
                  <p className="text-white cs-desc">분양 매물 신청 관리, 분양 계약 관리 등 이 모든 것을 <br />집스에서 더욱 편리하게 관리하세요.  </p>

                  <Space>
                      <Button type="primary" className="theme-btn cs-sliderbtn" shape="" htmlType="submit">
                          <Link to="/register-property">집 내놓기</Link>
                      </Button>

                      {isLoggedIn ? '' : <Button className="btn-default cs-sliderbtn cs-loginbtn" shape="" >
                          <Link to="/login" >
                              로그인
                          </Link>
                      </Button>

                      }
                  </Space>
              </div>
          </div>
          <Content>
              <Layout className="site-layout-background" >
                  <Content className="content-padding cs-services-main" >
                      <Row className="landing-services-section cs-service-wrapper cs-sec-1">
                          <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                              <div className="text-center">
                                  {/* <h3>Cras ultricies ligula sed Donec sollicitudin  </h3> */}
                                  {/* <i> <PicCenterOutlined /></i> */}
                                  <h3 className="cs-title">임대인 중개수수료가 무료에요!</h3>
                                  <img src={main1} width="119px" className="cs-service-img" />
                                  <p className="cs-desc">집스를 통해 집을 임대하는 모든 고객은<br />
                                  임대인 중개수수료가 무료에요!</p>
                              </div>
                          </Col>
                          <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                              <div className="text-center">
                                  {/* <h3>Cras ultricies ligula sed Donec sollicitudin </h3> */}
                                  <h3 className="cs-title">실시간 중개 정보를 알려드려요!</h3>
                                  <img src={main2} width="119px" className="cs-service-img"/>
                                  <p className="cs-desc"> 집스 서비스를 이용하는 고객에게<br />
                                  중개 정보를 실시간으로 알려드려요!</p>
                              </div>
                          </Col>
                          <Col xs={{ span: 24 }} sm={{ span: 4 }} lg={{ span: 4 }} >
                          </Col>
                      </Row>
                      < Divider />
                      <Row className="landing-services-section cs-service-wrapper cs-sec-2">
                          <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} className="cs-service-block" >
                              <div className="text-center">
                                  {/* <h3>Cras ultricies ligula sed Donec sollicitudin  </h3> */}
                                  <h3 className="cs-title">모든 법률 서비스가 무료에요!</h3>
                                  <img src={main3} width="119px" className="cs-service-img" />
                                  <p className="cs-desc">집스 서비스를 이용하는 고객에게 <br />
                                  모든 법률 서비스를 무료로 제공해 드려요! </p>
                              </div>
                          </Col>
                          <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} className="cs-service-block">
                              <div className="text-center">
                                  {/* <h3>Cras ultricies ligula sed Donec sollicitudin </h3> */}
                                  <h3 className="cs-title">집 내놓기가 간편해졌어요!</h3>
                                  <img src={main4} width="119px" className="cs-service-img" />
                                  <p className="cs-desc">집을 내놓을때 생기는 번거로운 과정을 <br />
                                  생략한 계약서 작성이 가능해요! </p>
                              </div>
                          </Col>
                      </Row>

                  </Content>
              </Layout>
          </Content>

          <WithAuthFooter />
        </div>)}
        {isMobileView && (<div className={splashScreen ? 'mobile-dashboard login-bg': 'mobile-dashboard'}>
            {splashScreen &&
                (<div className="logo-div">
                <div className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="93" height="50" viewBox="0 0 120 60">
                        <defs>
                            <path id="lmyyy2at0a" d="M0.007 0.106L14.58 0.106 14.58 19.381 0.007 19.381z"/>
                            <path id="6n7rbno8lc" d="M0 0.051L53.187 0.051 53.187 52.033 0 52.033z"/>
                        </defs>
                        <g fill="none" fill-rule="evenodd" opacity=".8">
                            <g>
                                <g>
                                    <g>
                                        <g>
                                            <path fill="#FFF" d="M19.75 47.473L30.195 32.854 30.195 32.746 20.36 32.746 20.36 27.872 37.912 27.872 37.912 32.493 27.431 47.148 27.431 47.256 37.876 47.256 37.876 52.13 19.75 52.13z" transform="translate(-421 -178) translate(421 178) translate(0 .887) translate(4.138 3.119)"/>
                                            <g>
                                                <path fill="#FFF" d="M44.203 40.819h5.6c0-2.707-.898-3.682-2.692-3.682-1.364 0-2.657.794-2.908 3.682m-6.174 2.093v-.469c0-5.74 3.554-9.349 9.082-9.349 6.21 0 8.542 3.502 8.542 9.602v1.588H44.24c.359 2.924 2.01 3.754 5.133 3.754 2.19 0 4.092-.541 5.527-1.119v3.79c-1.4.83-3.697 1.66-7.106 1.66-6.57 0-9.764-3.32-9.764-9.457M62.819 40.819h5.599c0-2.707-.897-3.682-2.692-3.682-1.364 0-2.656.794-2.907 3.682m-6.174 2.093v-.469c0-5.74 3.553-9.349 9.081-9.349 6.21 0 8.543 3.502 8.543 9.602v1.588H62.855c.359 2.924 2.01 3.754 5.132 3.754 2.19 0 4.092-.541 5.528-1.119v3.79c-1.4.83-3.697 1.66-7.107 1.66-6.569 0-9.763-3.32-9.763-9.457M88.57 43.201v-.577c0-3.863-1.185-4.801-3.267-4.801-1.256 0-2.225.36-2.764.722v8.952c.539.36 1.508.686 2.549.686 2.19 0 3.481-.975 3.481-4.982zm-12.132-9.746h5.886v1.553h.18c1.22-1.192 2.871-1.878 5.348-1.878 3.589 0 6.963 2.13 6.963 8.916v.433c0 7.328-3.482 9.89-8.543 9.89-1.866 0-3.05-.36-3.733-.649v5.74h-6.101V33.454z" transform="translate(-421 -178) translate(421 178) translate(0 .887) translate(4.138 3.119) translate(0 .084)"/>
                                                <g transform="translate(-421 -178) translate(421 178) translate(0 .887) translate(4.138 3.119) translate(0 .084) translate(96.331 32.988)">
                                                    <mask id="y0bbsvjksb" fill="#fff">
                                                        <use href="#lmyyy2at0a"/>
                                                    </mask>
                                                    <path fill="#FFF" d="M.115 18.154v-4.115c1.435.542 2.98 1.083 5.491 1.083 2.226 0 3.123-.541 3.123-1.552 0-.903-.539-1.227-2.118-1.408l-1.687-.252C1.766 11.44.007 9.707.007 6.098.007 2.38 2.447.106 7.58.106c2.656 0 4.451.36 5.851.974v4.08c-1.184-.362-2.871-.83-5.06-.83-1.831 0-2.693.468-2.693 1.443 0 .902.646 1.227 2.118 1.444l1.723.216c3.733.506 5.061 2.527 5.061 5.74 0 4.079-2.549 6.208-8.076 6.208-2.477 0-4.918-.469-6.39-1.227" mask="url(#y0bbsvjksb)"/>
                                                </g>
                                                <g transform="translate(-421 -178) translate(421 178) translate(0 .887) translate(4.138 3.119) translate(0 .084)">
                                                    <mask id="7v7pkbn2ld" fill="#fff">
                                                        <use href="#6n7rbno8lc"/>
                                                    </mask>
                                                    <path fill="#FFF" d="M53.187 15.165L26.604 0.051 0 15.165 0 52.033 15.371 52.033 15.371 43.719 7.914 43.719 7.914 20.738 26.602 10.297 33.935 14.167 45.273 20.151 45.273 25.109 53.187 25.109z" mask="url(#7v7pkbn2ld)"/>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="always-zeeps">
                    Always Zeeps!
                </div>
                </div>)}
            {!splashScreen && (<WingBlank>
                    <Carousel
                    autoplay={false}
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                    >
                     <div className="text-center">
                         <div className="image-slider login-bg">
                            <img src={slider1} className="image-slider-img" />
                         </div>
                        <div className="slider-description">
                            <h3 className="title">임대인 중개수수료가 무료에요!</h3>
                            <p className="desc">집스를 통해 집을 임대하는 모든 고객은<br />
                            임대인 중개수수료가 무료에요!</p>
                        </div>   
                            
                        </div>
                            <div className="text-center">
                              <div className="image-slider login-bg">
                                <img src={slider2} className="image-slider-img" />
                              </div>
                              <div className="slider-description">
                                  <h3 className="title">실시간 중개 정보를 알려드려요!</h3>
                                  <p className="desc"> 집스 서비스를 이용하는 고객에게<br />
                                  중개 정보를 실시간으로 알려드려요!</p>
                                </div>
                            </div>
                              <div className="text-center">
                                <div className="image-slider login-bg">
                                    <img src={slider3} className="image-slider-img" />
                                </div>
                                <div className="slider-description">
                                  <h3 className="title">모든 법률 서비스가 무료에요!</h3>
                                  <p className="desc">집스 서비스를 이용하는 고객에게 <br />
                                  모든 법률 서비스를 무료로 제공해 드려요! </p>
                                </div>
                              </div>
                              <div className="text-center">
                              <div className="image-slider login-bg">
                                    <img src={slider4} className="image-slider-img" />
                                </div>
                                <div className="slider-description">
                                  <h3 className="title">집 내놓기가 간편해졌어요!</h3>
                                  <p className="desc">집을 내놓을때 생기는 번거로운 과정을 <br />
                                  생략한 계약서 작성이 가능해요! </p>
                                  <Button type="primary" className="theme-btn cs-sliderbtn" shape="" htmlType="submit" style={{width: '285px'}}>
                                        <Link onClick={() => {this.setState({isMobileView:false}); localStorage.setItem('splashScreen', true)}}>집스 시작하기</Link>
                                    </Button>

                                </div>
                              </div>
                    </Carousel>
                </WingBlank>)}
        </div> )}
      </Layout>

  );
    // state = {
    //   isLoggedIn: false,
    // };

    // componentDidMount() {
    //   const cookies = new Cookies();
    //   var cookieName = btoa("zeeps");
    //   var finalCookieName = "";
    //   finalCookieName = cookieName.replace("=", "aAaA");

    //   var encodedStringBtoA = btoa("authorized");
    //   var finalCookieValue = "";
    //   finalCookieValue = encodedStringBtoA.replace("==", "aAaA");

    //   if (cookies.get("emVlcHMaAaA") == "YXV0aG9yaXplZAaAaA") {
    //     this.setState({ isLoggedIn: true });
    //   }
    // }

    // render() {
    //   const { isLoggedIn } = this.state;
    //   return (
    //     <Layout>
    //       <div className="landing-banner">
    //         <WithAuthHeader />

    //         <div style={{ padding: "70px 50px 80px 50px" }}>
    //           <h2 className="text-white">Welcome to Zeeps!</h2>
    //           <p className="text-white">
    //             Nulla quis lorem ut libero. <br /> Cras ultricies ligula sed magna
    //             dictum porta.{" "}
    //           </p>

    //           <Space>
    //             <Button
    //               type="primary"
    //               className="theme-btn"
    //               shape=""
    //               htmlType="submit"
    //             >
    //               <Link to="/register-property">Register Property</Link>
    //             </Button>

    //             {isLoggedIn ? (
    //               ""
    //             ) : (
    //               <Button className="btn-default landing-page-btn" shape="">
    //                 <Link to="/login">Login</Link>
    //               </Button>
    //             )}
    //           </Space>
    //         </div>
    //       </div>
    //       <Content>
    //         <Layout className="site-layout-background">
    //           <Content className="content-padding">
    //             <Row className="landing-services-section">
    //               <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
    //                 <div className="text-center">
    //                   <h3>Cras ultricies ligula sed Donec sollicitudin </h3>
    //                   <i>
    //                     <PicCenterOutlined />
    //                   </i>
    //                   <p>
    //                     Vestibulum ante ipsum primis in faucibus orci luctus{" "}
    //                     <br />
    //                     et ultrices Donec rutrum congue leo eget malesuada{" "}
    //                   </p>
    //                 </div>
    //               </Col>
    //               <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
    //                 <div className="text-center">
    //                   <h3>Cras ultricies ligula sed Donec sollicitudin </h3>
    //                   <i>
    //                     <PicCenterOutlined />
    //                   </i>
    //                   <p>
    //                     Vestibulum ante ipsum primis in faucibus orci luctus{" "}
    //                     <br />
    //                     et ultrices Donec rutrum congue leo eget malesuada{" "}
    //                   </p>
    //                 </div>
    //               </Col>
    //               <Col xs={{ span: 24 }} sm={{ span: 4 }} lg={{ span: 4 }}></Col>
    //             </Row>
    //             <Divider />
    //             <Row className="landing-services-section">
    //               <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
    //                 <div className="text-center">
    //                   <h3>Cras ultricies ligula sed Donec sollicitudin </h3>
    //                   <i>
    //                     <PicCenterOutlined />
    //                   </i>
    //                   <p>
    //                     Vestibulum ante ipsum primis in faucibus orci luctus{" "}
    //                     <br />
    //                     et ultrices Donec rutrum congue leo eget malesuada{" "}
    //                   </p>
    //                 </div>
    //               </Col>
    //               <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }}>
    //                 <div className="text-center">
    //                   <h3>Cras ultricies ligula sed Donec sollicitudin </h3>
    //                   <i>
    //                     <PicCenterOutlined />
    //                   </i>
    //                   <p>
    //                     Vestibulum ante ipsum primis in faucibus orci luctus{" "}
    //                     <br />
    //                     et ultrices Donec rutrum congue leo eget malesuada{" "}
    //                   </p>
    //                 </div>
    //               </Col>
    //             </Row>
    //           </Content>
    //         </Layout>
    //       </Content>

    //       <WithAuthFooter />
    //     </Layout>
    //   );
    // }
  }
}

export default LandingPage;
