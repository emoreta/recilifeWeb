import axios from 'axios';
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
    Table, Switch, Space,
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect, Divider, Modal, notification, Rate
} from 'antd';
import { Map, GoogleApiWrapper, Marker, InfoWindow, Polyline, lineSymbol } from 'google-maps-react';
import Geocode from "react-geocode";
import { SearchOutlined, BarsOutlined, CloseOutlined, SaveOutlined, DeleteFilled, EditFilled, ExclamationCircleOutlined, FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
const mapStyles = {
    width: '90%',
    height: '40%',
};

const openNotificationGuardar = placement => {
    notification.info({
        message: `Notification `,
        description:
            'Registro ingresado correctamente.',
        placement,
    });
};
const openNotificationEditar = placement => {
    notification.info({
        message: `Notification `,
        description:
            'Registro editado correctamente.',
        placement,
    });
};
const openNotificationEliminar = placement => {
    notification.info({
        message: `Notification `,
        description:
            'Registro eliminado correctamente.',
        placement,
    });
};
const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
};
class Request extends Component {
    state = {
        selectedRowKeys: [],
        data: [],
        columns: [],
        editNew: 0,//1 nuevo ,2 editar
        flagModal: false,
        flagModalEliminar: false,
        fields: {},
        errors: {},
        calification: 0,
        commentary: "",
        distance: "",
        idstate: 0,
        idstaterecycler: 0,
        disableControl: false,
        disableNuevo: false,
        disableEditar: false,
        disableGuardar: false,
        disableEliminar: false,
        disableCancelar: false,
        flagNuevo: false,
        latitudeRecycler: 0,
        longitudeRecycler: 0,

        latitudeUser: 0,
        longitudeUser: 0,

        address: '',
        city: '',
        area: '',
        state: '',
        zoom: 15,
        height: 200,
        mapPosition: {
            lat: 0,
            lng: 0,
        },
        markerPosition: {
            lat: 0,
            lng: 0,
        },
        Building: '',
        pincode: '',
        infoUser:{}
    };

    componentDidMount() {
        this.getInformation();

        var idUser = localStorage.getItem('idUser');
        this.setState({ id: idUser });
        console.log('iduser', idUser)


        /*navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            this.latitudeTmp=position.coords.latitude;
            this.longitudeTmp=position.coords.longitude;

        });*/
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({ latitudeRecycler: position.coords.latitude })
            this.setState({ longitudeRecycler: position.coords.longitude })
            this.getAdressRecycler(position.coords.latitude, position.coords.longitude);
        }
        )

    };
    getAdressCli = (lat, lng) => {
        console.log('consultando informacion cliente',lat);
        Geocode.setApiKey("AIzaSyCRF7-l7eBdub_gu1dLN3ApUew7b2SEj1o");
        Geocode.fromLatLng(lat, lng).then(
            (response) => {
                const address = response.results[0].formatted_address;
                let city, state, country;
                for (let i = 0; i < response.results[0].address_components.length; i++) {
                    for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                        switch (response.results[0].address_components[i].types[j]) {
                            case "locality":
                                city = response.results[0].address_components[i].long_name;
                                break;
                            case "administrative_area_level_1":
                                state = response.results[0].address_components[i].long_name;
                                break;
                            case "country":
                                country = response.results[0].address_components[i].long_name;
                                break;
                        }
                    }
                }
                console.log(city, state, country);
                console.log(address);
                this.setState({ addressCliente: address });

            },
            (error) => {
                console.error(error);
            }
        );
    }
    getAdressRecycler = (lat, lng) => {
        Geocode.setApiKey("AIzaSyCRF7-l7eBdub_gu1dLN3ApUew7b2SEj1o");
        Geocode.fromLatLng(lat, lng).then(
            (response) => {
                const address = response.results[0].formatted_address;
                let city, state, country;
                for (let i = 0; i < response.results[0].address_components.length; i++) {
                    for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                        switch (response.results[0].address_components[i].types[j]) {
                            case "locality":
                                city = response.results[0].address_components[i].long_name;
                                break;
                            case "administrative_area_level_1":
                                state = response.results[0].address_components[i].long_name;
                                break;
                            case "country":
                                country = response.results[0].address_components[i].long_name;
                                break;
                        }
                    }
                }
                console.log(city, state, country);
                console.log(address);
                this.setState({ addressRecycler: address });

            },
            (error) => {
                console.error(error);
            }
        );
    }
    onMarkerDragEnd = (event) => {
        console.log(newLat + '-aqui' + newLng);
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();



        Geocode.fromLatLng(newLat, newLng).then(
            response => {

                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);
                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                })
            },
            error => {
                console.error(error);
            }
        );
    };

    handleOk = async e => {

        this.guardarRegistro();
        await this.getInformation();
        this.setState({
            flagModal: false,
        });

    };
    handleCancel = e => {
        console.log(e);
        this.setState({
            flagModal: false,
        });
    };
    handleOkEliminar = async e => {
        console.log(e);
        this.setState({
            flagModalEliminar: false,
        });
        this.eliminarRegistro();
        await this.getInformation();
    };
    handleCancelEliminar = e => {
        console.log(e);
        this.setState({
            flagModalEliminar: false,
        });
    };
    editRequest = async (record) => {
        console.log('id user request:', record.iduserrequest);
        this.setState({ flagModal: true });
        this.setState({ editNew: 2 });//editar
        this.setFields(record);
        await this.getInformationUser(record.iduserrequest);
        console.log("infoUser",this.state.latitudeUser);
        
    };
    eliminarRequest = (record) => {
        this.setFields(record);
        console.log('eliminar:', record);
        this.setState({ flagModalEliminar: true });
    };
    columns = [
        {
            title: 'id',
            dataIndex: 'id',
            render: (text) => <a>{text}</a>,
        },
        /*{
            title: 'amount',
            dataIndex: 'amount',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'calification',
            dataIndex: 'calification',
            render: (text) => <a>{text}</a>,
        },*/
        {
            title: 'Creado',
            dataIndex: 'created',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Comentario',
            dataIndex: 'commentary',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Cliente',
            dataIndex: 'namecliente',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Reciclador',
            dataIndex: 'namerecycler',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Estado',
            dataIndex: 'stateuser',
            render: (text) => <a>{text}</a>,
        },

        /*{
            title: 'distance',
            dataIndex: 'distance',
            render: (text) => <a>{text}</a>,
        },*/

        /* {
             title: 'idstate',
             dataIndex: 'idstate',
             render: (text) => <a>{text}</a>,
         },
         {
             title: 'idstaterecycler',
             dataIndex: 'idstaterecycler',
             render: (text) => <a>{text}</a>,
         },
         {
             title: 'iduserrecycler',
             dataIndex: 'iduserrecycler',
             render: (text) => <a>{text}</a>,
         },*/
        /*{
            title: 'iduserrequest',
            dataIndex: 'iduserrequest',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'updated',
            dataIndex: 'updated',
            render: (text) => <a>{text}</a>,
        },*/
        {
            title: 'Ver',
            dataIndex: 'iduser',
            render: (text, record) => {
                let control = ''
                return <Button type="primary" size="small" shape="circle" icon={<EditFilled
                    onClick={() =>
                        this.editRequest(record)
                    }
                />} />
            },
            //render: (text, record) => <Link to={'user/' + record.name}>{text}</Link>
        },
        {/*{
            title: 'Eliminar',
            dataIndex: 'iduser',
            render: (text, record) => {
                let control = ''
                return <Button type="primary" size="small" shape="circle" icon={<DeleteFilled
                    onClick={() =>
                        this.eliminarRequest(record)
                    }
                />} />
            },

        },*/}
    ];
    handleValidationDetail() {
        console.log('en validacion');
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["amount"]) {
            formIsValid = false;
            errors["amount"] = "Campo obligatorio";
        }
        if (!fields["calification"]) {
            formIsValid = false;
            errors["calification"] = "Campo obligatorio";
        }
        if (!fields["commentary"]) {
            formIsValid = false;
            errors["commentary"] = "Campo obligatorio";
        }
        if (!fields["created"]) {
            formIsValid = false;
            errors["created"] = "Campo obligatorio";
        }
        if (!fields["distance"]) {
            formIsValid = false;
            errors["distance"] = "Campo obligatorio";
        }
        if (!fields["id"]) {
            formIsValid = false;
            errors["id"] = "Campo obligatorio";
        }
        if (!fields["idstate"]) {
            formIsValid = false;
            errors["idstate"] = "Campo obligatorio";
        }
        if (!fields["idstaterecycler"]) {
            formIsValid = false;
            errors["idstaterecycler"] = "Campo obligatorio";
        }
        if (!fields["iduserrecycler"]) {
            formIsValid = false;
            errors["iduserrecycler"] = "Campo obligatorio";
        }
        if (!fields["iduserrequest"]) {
            formIsValid = false;
            errors["iduserrequest"] = "Campo obligatorio";
        }
        if (!fields["updated"]) {
            formIsValid = false;
            errors["updated"] = "Campo obligatorio";
        }
        this.setState({ errors: errors });

        console.log('errores', this.state.errors);
        return formIsValid;
    }
    handleChangeDinamyc(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        console.log('handleChangeDinamyc', e.target.value)
        this.setState({ fields });
    }
    handleChangeDinamycSelect(field, selectedOption) {
        let fields = this.state.fields;
        fields[field] = selectedOption;
        console.log('handleChangeDinamycSelect', selectedOption)
        this.setState({ fields });
    }
    handleChangeDinamycDate(field, date, dateString) {
        let fields = this.state.fields;
        fields[field] = date;
        console.log('handleChangeDinamycDate', date)
        this.setState({ fields });
    }
    handleChangeDinamycBool(field, stateSwitch) {
        let fields = this.state.fields;
        fields[field] = stateSwitch;
        console.log('handleChangeDinamycBool', stateSwitch)
        this.setState({ fields });
    }
    resetFields = () => {
        let fields = this.state.fields;
        fields['amount'] = 0;
        fields['calification'] = 0;
        fields['created'] = '';
        fields['id'] = 0;
        fields['idstate'] = 0;
        fields['idstaterecycler'] = 0;
        fields['iduserrecycler'] = 0;
        fields['iduserrequest'] = 0;
        fields['updated'] = '';
        this.setState({ fields });
    }
    setFields = (record) => {
        let fields = this.state.fields;
        fields['amount'] = record.amount;
        fields['calification'] = record.calification;
        fields['created'] = record.created;
        fields['id'] = record.id;
        fields['idstate'] = record.idstate;
        fields['idstaterecycler'] = record.idstaterecycler;
        fields['iduserrecycler'] = record.iduserrecycler;
        fields['iduserrequest'] = record.iduserrequest;
        fields['updated'] = record.updated;

        fields["stateuser"] = record.stateuser;
        fields["namecliente"] = record.namecliente;
        fields["namerecycler"] = record.namerecycler;
        this.setState({ fields });
    }
    getInformation = async () => {
        await axios.get('http://localhost:3001/api/RequestInformationProcess')
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "key": row.id,
                        "amount": row.amount,
                        "calification": row.calification,
                        "commentary": row.commentary,
                        "created": row.created,
                        "distance": row.distance,
                        "id": row.id,
                        "idstate": row.id_state,
                        "idstaterecycler": row.id_state_recycler,
                        "iduserrecycler": row.id_user_recycler,
                        "iduserrequest": row.id_user_request,
                        "updated": row.updated,

                        "commentary": row.commentary,
                        "stateuser": row.stateuser,
                        "namecliente": row.namecliente,
                        "namerecycler": row.namerecycler,

                    }
                })
                this.setState({ data: options });
                console.log('data', options);
            }
            )
    };
    getInformationUser = async (id) => {
        const param = {
            "id": id
        }
        await axios.post('https://emma.apis.guabastudio.com/api/InformationUserLocation', param)
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "key": row.id,
                        "latitude": row.latitude,
                        "longitude": row.longitude,
                        "reference": row.reference,
                        "description": row.description,
                        "id_user": row.id_user,
                    }
                })
                console.log(options)
                this.setState({ longitudeUser: options[0].longitude }, () => {
                    console.log(this.state.longitudeUser, 'longitudeUser');
                  }); 

                //this.setState({ latitudeUser: options[0].latitude});
                this.setState({ latitudeUser: options[0].latitude }, () => {
                    console.log(this.state.latitudeUser, 'latitudeUser');
                  }); 
                //this.setState({ longitudeUser: options[0].longitude});

                this.getAdressCli(options[0].latitude,options[0].longitude)
                
                
            }
            )
    };
    toIsoString(date) {
        var tzo = -date.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function (num) {
                var norm = Math.floor(Math.abs(num));
                return (norm < 10 ? '0' : '') + norm;
            };

        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            dif + pad(tzo / 60) +
            ':' + pad(tzo % 60);
    };
    updateRequest = async (id, id_state, id_user_recycler) => {
        var today = new Date();
        const param = {
            "id": id,
            "id_state": id_state,
            "id_user_recycler": id_user_recycler,
            "updated": this.toIsoString(today)
        }

        await axios.post('http://localhost:3001/api/updateRequestUser', param)
            .then(response => {
                this.setState({ infoUserUpdate: response.data });
                console.log('infoUserUpdate', response);
            }
            )
    };
    editInformation = async (amount, calification, commentary, created, distance, id, idstate, idstaterecycler, iduserrecycler, iduserrequest, updated) => {
        const param = {
            "amount": amount,
            "calification": calification,
            "commentary": commentary,
            "created": created,
            "distance": distance,
            "id": id,
            "idstate": idstate,
            "idstaterecycler": idstaterecycler,
            "iduserrecycler": iduserrecycler,
            "iduserrequest": iduserrequest,
            "updated": updated,
        }
        console.log('param', param);
        await axios.put('https://localhost:44315/api/Iva/update', param)
            .then(response => {
                console.log('data', response);
            }
            )
    };
    insertInformation = async (amount, calification, commentary, created, distance, id, idstate, idstaterecycler, iduserrecycler, iduserrequest, updated) => {
        const param = {
            "amount": amount,
            "calification": calification,
            "commentary": commentary,
            "created": created,
            "distance": distance,
            "id": id,
            "idstate": idstate,
            "idstaterecycler": idstaterecycler,
            "iduserrecycler": iduserrecycler,
            "iduserrequest": iduserrequest,
            "updated": updated,
        }
        await axios.post('https://localhost:44315/api/Iva/insert', param)
            .then(response => {
                this.setState({ infoContract: response.data });
                console.log('data', response);
            }
            )
    };
    guardarRegistro = async () => {//nuevo y editar

        /*if (this.state.editNew == 1) {
            await this.insertInformation(this.state.fields["amount"], this.state.fields["calification"], this.state.fields["commentary"], this.state.fields["created"], this.state.fields["distance"], this.state.fields["id"], this.state.fields["idstate"], this.state.fields["idstaterecycler"], this.state.fields["iduserrecycler"], this.state.fields["iduserrequest"], this.state.fields["updated"]);
            openNotificationGuardar('topRight');
            await this.getInformation();
            this.resetFields();

        }*/
        console.log('en edit');
        if (this.state.editNew == 2) {
            console.log('en edit');
            await this.updateRequest(this.state.fields["id"], 6, this.state.id);
            openNotificationEditar('topRight');
            await this.getInformation();
            this.resetFields();
        }

    }
    eliminarRegistro = async () => {
        await this.editInformation(this.state.fields["amount"], this.state.fields["calification"], this.state.fields["commentary"], this.state.fields["created"], this.state.fields["distance"], this.state.fields["id"], this.state.fields["idstate"], this.state.fields["idstaterecycler"], this.state.fields["iduserrecycler"], this.state.fields["iduserrequest"], this.state.fields["updated"]);
        openNotificationEliminar('topRight');
        await this.getInformation();
    }
    clickNuevo = () => {
        this.resetFields();
        this.setState({ flagModal: true });
        this.setState({ editNew: 1 });
    };
    modalForm = () => {
        const pathCoordinates = [
            { lat: this.state.latitudeUser, lng: this.state.longitudeUser },
            { lat: this.state.latitudeRecycler, lng: this.state.longitudeRecycler}
        ];
        console.log('coordenas',pathCoordinates)
        return (
            < div >
                <Modal
                    title="Confirmación"
                    visible={this.state.flagModalEliminar}
                    onOk={this.handleOkEliminar}
                    onCancel={this.handleCancelEliminar}
                    okText="Confirmar"
                    cancelText="Cancelar"
                    icon={ExclamationCircleOutlined}

                >
                    <p>Esta seguro de eliminar el registro!!</p>
                </Modal>
                < Modal title="request"
                    visible={this.state.flagModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={800}
                    footer={
                        [
                            < Button
                                type="primary"
                                onClick={this.handleOk}
                            >
                                Aceptar
                            </ Button >,
                            < Button key="submit"
                                type="primary"
                                onClick={this.handleCancel}>
                                Rechazar
                            </ Button >,
                        ]}
                >
                    <Container>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={6}>
                                < Form >
                                    <Form.Item style={{ "justify-content": "space-between" }} label="Id">
                                        <Input
                                            ref="id"
                                            value={this.state.fields["id"] || ''}
                                            onChange={this.handleChangeDinamyc.bind(this, "id")} />
                                        < span style={{ color: "red" }}>{this.state.errors["id"]}</ span >
                                    </Form.Item>
                                    <Form.Item label="Monto">
                                        <Input
                                            ref="amount"
                                            value={this.state.fields["amount"] || ''}
                                            onChange={this.handleChangeDinamyc.bind(this, "amount")} />
                                        < span style={{ color: "red" }}>{this.state.errors["amount"]}</ span >
                                    </Form.Item>
                                    <Form.Item label="Calificación">
                                        {/*<Input
                                ref="calification"
                                value={this.state.fields["calification"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "calification")} />
                            < span style={{ color: "red" }}>{this.state.errors["calification"]}</ span >*/}
                                        <Rate defaultValue={3} character={({ index }) => customIcons[index + 1]} />
                                    </Form.Item>

                                    {/*< Form.Item label="created">
                            < DatePicker
                                ref="created"
                                onChange={this.handleChangeDinamycDate.bind(this, "created")}
                                value ={moment(this.state.fields["created"], 'YYYY-MM-DD')} />
                            < span style={{ color: "red" }}>{this.state.errors["created"]}</ span >
                    </ Form.Item >*/}

                                    <Form.Item label="Estado">
                                        <Input
                                            ref="stateuser"
                                            value={this.state.fields["stateuser"] || ''}
                                            onChange={this.handleChangeDinamyc.bind(this, "stateuser")} />
                                        < span style={{ color: "red" }}>{this.state.errors["stateuser"]}</ span >
                                    </Form.Item>
                                    {/*<Form.Item label="Estado">
                                        <Select
                                            ref="idstate"
                                            showSearch
                                            style={{ width: 602 }}
                                            placeholder="Search to Select"
                                            optionFilterProp="children"
                                            options={this.state.dataCuentasContables}
                                            //onChange={this.onChangeAsientoContable}
                                            value={this.state.fields["idstate"] || ''}
                                            onChange={this.handleChangeDinamycSelect.bind(this, "idstate")}
                                        ></Select>
                                        <span style={{ color: "red" }}>{this.state.errors["idstate"]}</span>
            </Form.Item>*/}

                                    {/*<Form.Item label="idstaterecycler">
                            <Input
                                ref="idstaterecycler"
                                value={this.state.fields["idstaterecycler"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "idstaterecycler")} />
                            < span style={{ color: "red" }}>{this.state.errors["idstaterecycler"]}</ span >
            </Form.Item>*/}
                                    {/*<Form.Item label="">
                                        <Select
                                            ref="idstaterecycler"
                                            showSearch
                                            style={{ width: 602 }}
                                            placeholder="Search to Select"
                                            optionFilterProp="children"
                                            options={this.state.dataCuentasContables}
                                            //onChange={this.onChangeAsientoContable}
                                            value={this.state.fields["idstaterecycler"] || ''}
                                            onChange={this.handleChangeDinamycSelect.bind(this, "idstaterecycler")}
                                        ></Select>
                                        <span style={{ color: "red" }}>{this.state.errors["idstaterecycler"]}</span>
        </Form.Item>*/}

                                    <Form.Item label="Cliente">
                                        <Input
                                            ref="namecliente"
                                            value={this.state.fields["namecliente"] || ''}
                                            onChange={this.handleChangeDinamyc.bind(this, "namecliente")} />
                                        < span style={{ color: "red" }}>{this.state.errors["namecliente"]}</ span >
                                    </Form.Item>
                                    <Form.Item label="Reciclador">
                                        <Input
                                            ref="namerecycler"
                                            value={this.state.fields["namerecycler"] || ''}
                                            onChange={this.handleChangeDinamyc.bind(this, "namerecycler")} />
                                        < span style={{ color: "red" }}>{this.state.errors["namerecycler"]}</ span >
                                    </Form.Item>

                                    <Form.Item label="Ubicación Cliente">
                                        <Input
                                            ref="addressCliente"
                                            value={this.state.addressCliente || ''}
                                            //onChange={this.handleChangeDinamyc.bind(this, "namerecycler")} 
                                            />
                                        < span style={{ color: "red" }}>{this.state.errors["addressCliente"]}</ span >
                                    </Form.Item>

                                    <Form.Item label="Ubicación Reciclador">
                                        <Input
                                            ref="addressRecycler"
                                            value={this.state.addressRecycler || ''}
                                        //onChange={this.handleChangeDinamyc.bind(this, "namerecycler")} 
                                        />
                                        < span style={{ color: "red" }}>{this.state.errors["namerecycler"]}</ span >
                                    </Form.Item>
                                    {/*< Form.Item label="updated">
                            < DatePicker
                                ref="updated"
                                onChange={this.handleChangeDinamycDate.bind(this, "updated")} 
                            value ={moment(this.state.fields["updated"], 'YYYY-MM-DD')} />
                            < span style={{ color: "red" }}>{this.state.errors["updated"]}</ span >
                </ Form.Item >*/}
                                </ Form >
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div style={{ height: '50vh', width: '50%' }}>
                                    <Map
                                        google={this.props.google}
                                        zoom={12}
                                        style={mapStyles}
                                        initialCenter={{ lat: -0.181740, lng: -78.48696 }}


                                    >
                                        <Marker
                                            google={this.props.google}
                                            name={'Usuario'}
                                            //draggable={true}
                                            //onDragEnd={() => this.onMarkerDragEnd}
                                            position={{ lat: this.state.latitudeUser, lng: this.state.longitudeUser }}
                                        />
                                        <InfoWindow options={{ pixelOffset: new window.google.maps.Size(0, -40) }}></InfoWindow>
                                        <Marker
                                            google={this.props.google}
                                            name='Recycler'
                                            //draggable={true}
                                            //onDragEnd={() => this.onMarkerDragEnd}
                                            position={{ lat: this.state.latitudeRecycler, lng: this.state.longitudeRecycler }}
                                        />

                                        <Polyline
                                            path={pathCoordinates}
                                            geodesic={true}
                                            options={{
                                                strokeColor: "#ff2527",
                                                strokeOpacity: 0.75,
                                                strokeWeight: 2,
                                                icons: [
                                                    {
                                                        icon: lineSymbol,
                                                        offset: "0",
                                                        repeat: "20px"
                                                    }
                                                ]
                                            }}
                                        />

                                    </Map>
                                </div>
                            </Col>
                        </Row>

                    </Container>
                </ Modal >
            </ div >
        )
    }
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    size="default"
                >
                    {/*< Form.Item >
                        < Button
                            onClick={() => this.clickNuevo()}
                        > +Nuevo </ Button >
                    </ Form.Item >*/}
                    <Table
                        columns={this.columns}
                        dataSource={this.state.data}
                        pagination={3}
                        size={5}
                    />
                    <Divider />
                    {this.modalForm()}
                </Form>
            </ div >
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCRF7-l7eBdub_gu1dLN3ApUew7b2SEj1o'
})(Request);
