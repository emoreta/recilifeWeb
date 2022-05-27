import axios from 'axios';
import React, { Component } from 'react';
import logo from '../resources/logot.png';
import {
    Link
} from "react-router-dom";
import menuJ from '../data/menu';

import classes from '../container/index.css';

import 'antd/dist/antd.css';
import './index.css';

import { Menu, Button, Layout, Avatar, Dropdown, Tag, Row, Col, Breadcrumb, Typography } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined, UserOutlined
} from '@ant-design/icons';
import * as icont from '@ant-design/icons';

import {
    BrowserRouter,
    Routes,
    Route,
    //Link,
    useNavigate

} from "react-router-dom";

import Calificacion from '../pages/calificacion/Calification';
import Day from '../pages/dias/Day';
import State from '../pages/estados/State';
import Schedule from '../pages/horarios/Schedule';
import Recyclablematerial from '../pages/materialReciclaje/Recyclablematerial';
import Perfil from '../pages/perfil/Perfil';
import Sessions from '../pages/sesiones/Sessions';
import Request from '../pages/solicitud/Request';
import Templateemail from '../pages/templateEmail/Templateemail';
import Usertype from '../pages/tipoUsuario/Usertype';
import User from '../pages/usuario/User';
import Locationuser from '../pages/usuarioUbicacion/Locationuser';


const { Header, Footer, Sider, Content } = Layout;

const { SubMenu } = Menu;

const { Title } = Typography;

var menuTmp;
class Container extends React.Component {

    state = {
        collapsed: false,
        userName: '',
        role: 0,
        menu: menuJ
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    menu = (
        <Menu>
            <Menu.Item
                onClick={() => this.cerrarSesion()}
            >
                <h4>
                    Salir
                </h4>

            </Menu.Item>
        </Menu>
    );

    componentDidMount() {
        console.log('container');
        console.log(menuJ)
        var datauser = localStorage.getItem('myData');
         var idUser = localStorage.getItem('idUser');
         this.setState({ userName: datauser });
         //this.setState({ role: role });

        //this.getMenuRol('1');
        //console.log('rol:', role)


    }
    cerrarSesion = () => {
        //let navigate = useNavigate();

        console.log('Cerrando Sesion');
        localStorage.removeItem('myData');
        this.setState({ userName: null });
        //this.props.history.push("/");
        //navigate('/')
        this.props.navigation.navigate('/')

    }

    getMenuRol = async (idRole) => {
        /*await axios.get('https://localhost:44315/api/Menu/getMenu?idRole=' + idRole)
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "iconmenu": row.iconmenu,
                        "isavailablemenu": row.isavailablemenu,
                        "namemenu": row.namemenu,
                        "pagemenu": row.pagemenu,
                        "idmenu": row.idmenu,
                        "parentnodemenu": row.parentnodemenu,
                        "childnodemenu": row.childnodemenu,
                        "menuChild": row.menuChild

                    }
                })
                this.setState({ menu: options });
                console.log('options', options);
            }
            )*/

        /*console.log('menu',menuJson);
         var options =  menuJson.map(function (row) {
             return {
                "iconmenu": row.icon,
                "isavailablemenu": true,
                "namemenu": row.Name,
                "pagemenu": row.url,
                "idmenu": row.key,
                "parentnodemenu": '0',
                "childnodemenu": '0',
                "menuChild": row.childrens

            }
        })
         this.setState({ menu:options})
         this.menuTmp=options;
          this.setState({ menu:options }, () => {
            console.log(this.state.menu, 'dealersOverallTotal1');
          }); 
        console.log(this.menuTmp)*/


    };

    handleClick = (path) => {
        console.log('path', path)
        //this.props.history.push(path);
        //this.props.history.push("/container");
    };

    render() {
        //const { collapsed } = this.state;
        return (

            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" >
                        <img src={logo} alt="Logo" height="50px" />

                    </div>
                    <Menu mode="inline"
                        theme="dark" defaultSelectedKeys={['1']} defaultOpenKeys={['1', '2', '3']}
                    >
                        {menuJ && menuJ.map(item =>
                            <SubMenu key={item.id} title={item.Name}  >
                                {item.childrens.map((itemC) =>
                                    <Menu.Item key={itemC.id}  >
                                        <Link to={itemC.url}  >{itemC.Name}</Link>
                                    </Menu.Item>
                                )}
                            </SubMenu>
                        )}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <div>
                        <Header className="site-layout-background" style={{ padding: 0 }}>
                            <Row>
                                <Col span={2}>
                                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                        className: 'trigger',
                                        onClick: this.toggle,
                                    })}
                                </Col>
                                <Col span={6}>
                                    <Title level={3}>Recilife</Title>
                                </Col>
                                <Col span={3} offset={12}>
                                    <Row>

                                        <Col span={8}>
                                            <Tag color="#55acee">
                                                {this.state.userName}
                                            </Tag>
                                        </Col>
                                        <Col>
                                            <Dropdown.Button overlay={this.menu} placement="bottomCenter" icon={<UserOutlined />}>
                                            </Dropdown.Button>
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>
                        </Header>
                    </div>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 780,
                        }}
                    >
                        <Routes>
                            <Route path="calificacion" element={<Calificacion />} />
                            <Route path="dias" element={<Day />} />
                            <Route path="usuario" element={<User />} />
                            <Route path="materialReciclaje" element={<Recyclablematerial />} />
                            <Route path="horarios" element={<Schedule />} />
                            <Route path="templateEmail" element={<Templateemail />} />
                            <Route path="estados" element={<State />} />
                            <Route path="ubicacionUsuarios" element={<Locationuser />} />
                            <Route path="solicitudes" element={<Request />} />
                        </Routes>

                    </Content>
                </Layout>
            </Layout>
        );
    }
}
export default Container;



