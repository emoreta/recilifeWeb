import axios from 'axios';
import React, { Component } from 'react';
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
    TreeSelect, Divider, Row, Col, Modal, notification
} from 'antd';
import { SearchOutlined, BarsOutlined, CloseOutlined, SaveOutlined, DeleteFilled, EditFilled, ExclamationCircleOutlined } from '@ant-design/icons';
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
class User extends Component {
    state = {
        selectedRowKeys: [],
        data: [],
        columns: [],
        editNew: 0,//1 nuevo ,2 editar
        flagModal: false,
        flagModalEliminar: false,
        fields: {},
        errors: {},
        active: false,
        bussinesname: "",
        calification: 0,
        email: "",
        field1: "",
        field2: "",
        idsessiontype: 0,
        idusertype: 0,
        identificationruc: "",
        image: "",
        lastname: "",
        mobilenumber: "",
        name: "",
        password: "",
        telephone: "",
        token: "",
        userid: "",
        disableControl: false,
        disableNuevo: false,
        disableEditar: false,
        disableGuardar: false,
        disableEliminar: false,
        disableCancelar: false,
        flagNuevo: false,
        nameUserLogin: ''

    };
    componentDidMount() {
        this.getInformation();

    };
    handleOk = async e => {
        if (this.handleValidationDetail()) {
            this.guardarRegistro();
            await this.getInformation();
            this.setState({
                flagModal: false,
            });
        }
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
    editUser = (record) => {
        console.log('seleccion:', record);
        this.setState({ flagModal: true });
        this.setState({ editNew: 2 });//editar
        this.setFields(record);
    };
    eliminarUser = (record) => {
        this.setFields(record);
        console.log('eliminar:', record);
        this.setState({ flagModalEliminar: true });

    };
    columns = [
        {
            title: 'Activo',
            dataIndex: 'active',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Nombre Negocio',
            dataIndex: 'bussinesname',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Calificación',
            dataIndex: 'calification',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Creado',
            dataIndex: 'created',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Campo 1',
            dataIndex: 'field1',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Campo 2',
            dataIndex: 'field2',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Id',
            dataIndex: 'id',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'idsessiontype',
            dataIndex: 'idsessiontype',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tipo Usuario',
            dataIndex: 'idusertype',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Identificación',
            dataIndex: 'identificationruc',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Imagen',
            dataIndex: 'image',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Apellido',
            dataIndex: 'lastname',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Movil',
            dataIndex: 'mobilenumber',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'name',
            dataIndex: 'name',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'password',
            dataIndex: 'password',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'Telefono',
            dataIndex: 'telephone',
            //render: (text) => <a>{text}</a>,
        },
        /*{
            title: 'token',
            dataIndex: 'token',
            render: (text) => <a>{text}</a>,
        },*/
        {
            title: 'Actualizado',
            dataIndex: 'updated',
            //render: (text) => <a>{text}</a>,
        },
        {
            title: 'userid',
            dataIndex: 'userid',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Editar',
            dataIndex: 'iduser',
            render: (text, record) => {
                let control = ''
                return <Button type="primary" size="small" shape="circle" icon={<EditFilled
                    onClick={() =>
                        this.editUser(record)
                    }
                />} />
            },
            //render: (text, record) => <Link to={'user/' + record.name}>{text}</Link>
        },
        {
            title: 'Eliminar',
            dataIndex: 'iduser',
            render: (text, record) => {
                let control = ''
                return <Button type="primary" size="small" shape="circle" icon={<DeleteFilled
                    onClick={() =>
                        this.eliminarUser(record)
                    }
                />} />
            },
            //render: (text, record) => <Link to={'user/' + record.name}>{text}</Link>
        },
    ];
    handleValidationDetail() {
        console.log('en validacion');
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        /*if (!fields["active"]) {
            formIsValid = false;
            errors["active"] = "Campo obligatorio";
        }*/
        if (!fields["bussinesname"]) {
            formIsValid = false;
            errors["bussinesname"] = "Campo obligatorio";
        }
        if (!fields["calification"]) {
            formIsValid = false;
            errors["calification"] = "Campo obligatorio";
        }
        /*if (!fields["created"]) {
            formIsValid = false;
            errors["created"] = "Campo obligatorio";
        }*/
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Campo obligatorio";
        }
        /*if (!fields["field1"]) {
            formIsValid = false;
            errors["field1"] = "Campo obligatorio";
        }
        if (!fields["field2"]) {
            formIsValid = false;
            errors["field2"] = "Campo obligatorio";
        }
        if (!fields["id"]) {
            formIsValid = false;
            errors["id"] = "Campo obligatorio";
        }*/
        if (!fields["idsessiontype"]) {
            formIsValid = false;
            errors["idsessiontype"] = "Campo obligatorio";
        }
        if (!fields["idusertype"]) {
            formIsValid = false;
            errors["idusertype"] = "Campo obligatorio";
        }
        if (!fields["identificationruc"]) {
            formIsValid = false;
            errors["identificationruc"] = "Campo obligatorio";
        }
        /*if (!fields["image"]) {
            formIsValid = false;
            errors["image"] = "Campo obligatorio";
        }*/
        if (!fields["lastname"]) {
            formIsValid = false;
            errors["lastname"] = "Campo obligatorio";
        }
        if (!fields["mobilenumber"]) {
            formIsValid = false;
            errors["mobilenumber"] = "Campo obligatorio";
        }
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Campo obligatorio";
        }
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Campo obligatorio";
        }
        /*if (!fields["telephone"]) {
            formIsValid = false;
            errors["telephone"] = "Campo obligatorio";
        }
        if (!fields["token"]) {
            formIsValid = false;
            errors["token"] = "Campo obligatorio";
        }
        if (!fields["updated"]) {
            formIsValid = false;
            errors["updated"] = "Campo obligatorio";
        }
        if (!fields["userid"]) {
            formIsValid = false;
            errors["userid"] = "Campo obligatorio";
        }*/
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
        fields['active'] = false;
        fields['bussinesname'] = '';
        fields['calification'] = 0;
        fields['created'] = '';
        fields['email'] = '';
        fields['field1'] = '';
        fields['field2'] = '';
        fields['id'] = 0;
        fields['idsessiontype'] = 0;
        fields['idusertype'] = 0;
        fields['identificationruc'] = '';
        fields['image'] = '';
        fields['lastname'] = '';
        fields['mobilenumber'] = '';
        fields['name'] = '';
        fields['password'] = '';
        fields['telephone'] = '';
        fields['token'] = '';
        fields['updated'] = '';
        fields['userid'] = '';
        this.setState({ fields });
    }
    setFields = (record) => {
        let fields = this.state.fields;
        fields['active'] = record.active;
        fields['bussinesname'] = record.bussinesname;
        fields['calification'] = record.calification;
        fields['created'] = record.created;
        fields['email'] = record.email;
        fields['field1'] = record.field1;
        fields['field2'] = record.field2;
        fields['id'] = record.id;
        fields['idsessiontype'] = record.idsessiontype;
        fields['idusertype'] = record.idusertype;
        fields['identificationruc'] = record.identificationruc;
        fields['image'] = record.image;
        fields['lastname'] = record.lastname;
        fields['mobilenumber'] = record.mobilenumber;
        fields['name'] = record.name;
        fields['password'] = record.password;
        fields['telephone'] = record.telephone;
        fields['token'] = record.token;
        fields['updated'] = record.updated;
        fields['userid'] = record.userid;
        this.setState({ fields });
    }
    getInformation = async () => {
        await axios.get('http://localhost:3001/api/users')
            .then(response => {
                console.log(response)
                var options = response.data.map(function (row) {
                    return {
                        "key": row.id,
                        "active": row.active,
                        "bussinesname": row.bussines_name,
                        "calification": row.calification,
                        "created": row.created,
                        "email": row.email,
                        "field1": row.field1,
                        "field2": row.field2,
                        "id": row.id,
                        "idsessiontype": row.id_session_type,
                        "idusertype": row.id_user_type,
                        "identificationruc": row.identification_ruc,
                        "image": row.image,
                        "lastname": row.last_name,
                        "mobilenumber": row.mobile_number,
                        "name": row.name,
                        "password": row.password,
                        "telephone": row.telephone,
                        "token": row.token,
                        "updated": row.updated,
                        "userid": row.userid,
                    }
                })
                this.setState({ data: options });
                console.log('data', options);
            }
            )
    };
    editInformation = async (active, bussinesname, calification, created, email, field1, field2, id, idsessiontype, idusertype, identificationruc, image, lastname, mobilenumber, name, password, telephone, token, updated, userid) => {
        const param = {
            "active": active,
            "bussinesname": bussinesname,
            "calification": calification,
            "created": created,
            "email": email,
            "field1": field1,
            "field2": field2,
            "id": id,
            "idsessiontype": idsessiontype,
            "idusertype": idusertype,
            "identificationruc": identificationruc,
            "image": image,
            "lastname": lastname,
            "mobilenumber": mobilenumber,
            "name": name,
            "password": password,
            "telephone": telephone,
            "token": token,
            "updated": updated,
            "userid": this.state.nameUserLogin,
        }
        console.log('param', param);
        await axios.put('https://localhost:44315/api/Iva/update', param)
            .then(response => {
                console.log('data', response);
            }
            )
    };
    insertInformation = async (active, bussinesname, calification, created, email, field1, field2, id, idsessiontype, idusertype, identificationruc, image, lastname, mobilenumber, name, password, telephone, token, updated, userid) => {
        const param = {
            "active": active,
            "bussines_name": bussinesname,
            "calification": calification,
            "created": created,
            "email": email,
            "field1": field1,
            "field2": field2,
            "id": id,
            "id_session_type": idsessiontype,
            "id_usertype": idusertype,
            "identification_ruc": identificationruc,
            "image": image,
            "last_name": lastname,
            "mobile_number": mobilenumber,
            "name": name,
            "password": password,
            "telephone": telephone,
            "token": token,
            "updated": updated,
            "userid": this.state.nameUserLogin,
        }
        console.log('parametros insert',param)
        await axios.post('https://emma.apis.guabastudio.com/api/users', param)
            .then(response => {
                this.setState({ infoContract: response.data });
                console.log('data insert', response);
            }
            )
    };
    guardarRegistro = async () => {//nuevo y editar

        if (this.state.editNew == 1) {
            await this.insertInformation(this.state.fields["active"], this.state.fields["bussinesname"], this.state.fields["calification"], this.state.fields["created"], this.state.fields["email"], this.state.fields["field1"], this.state.fields["field2"], this.state.fields["id"], this.state.fields["idsessiontype"], this.state.fields["idusertype"], this.state.fields["identificationruc"], this.state.fields["image"], this.state.fields["lastname"], this.state.fields["mobilenumber"], this.state.fields["name"], this.state.fields["password"], this.state.fields["telephone"], this.state.fields["token"], this.state.fields["updated"], this.state.fields["userid"]);
            openNotificationGuardar('topRight');
            await this.getInformation();
            this.resetFields();

        }
        else if (this.state.editNew == 2) {
            await this.editInformation(this.state.fields["active"], this.state.fields["bussinesname"], this.state.fields["calification"], this.state.fields["created"], this.state.fields["email"], this.state.fields["field1"], this.state.fields["field2"], this.state.fields["id"], this.state.fields["idsessiontype"], this.state.fields["idusertype"], this.state.fields["identificationruc"], this.state.fields["image"], this.state.fields["lastname"], this.state.fields["mobilenumber"], this.state.fields["name"], this.state.fields["password"], this.state.fields["telephone"], this.state.fields["token"], this.state.fields["updated"], this.state.fields["userid"]);
            openNotificationEditar('topRight');
            await this.getInformation();
            this.resetFields();

        }

    }
    eliminarRegistro = async () => {
        await this.editInformation(this.state.fields["active"], this.state.fields["bussinesname"], this.state.fields["calification"], this.state.fields["created"], this.state.fields["email"], this.state.fields["field1"], this.state.fields["field2"], this.state.fields["id"], this.state.fields["idsessiontype"], this.state.fields["idusertype"], this.state.fields["identificationruc"], this.state.fields["image"], this.state.fields["lastname"], this.state.fields["mobilenumber"], this.state.fields["name"], this.state.fields["password"], this.state.fields["telephone"], this.state.fields["token"], this.state.fields["updated"], this.state.fields["userid"]);
        openNotificationEliminar('topRight');
        await this.getInformation();
    }
    clickNuevo = () => {
        this.resetFields();
        this.setState({ flagModal: true });
        this.setState({ editNew: 1 });
    };
    modalForm = () => {
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
                < Modal title="user"
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
                                Guardar
                            </ Button >,
                            < Button key="submit"
                                type="primary"
                                onClick={this.handleCancel}>
                                Cancelar
                            </ Button >,
                        ]}
                >
                    < Form >
                        <Form.Item label="Activo" valuePropName="checked">
                            <Switch
                                onChange={this.handleChangeDinamycBool.bind(this, "active")}
                                checked={this.state.active}
                                disabled={this.state.disableControl}
                            />
                        </Form.Item>
                        <Form.Item label="bussinesname">
                            <Input
                                ref="bussinesname"
                                value={this.state.fields["bussinesname"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "bussinesname")} />
                            < span style={{ color: "red" }}>{this.state.errors["bussinesname"]}</ span >
                        </Form.Item>
                        <Form.Item label="calification">
                            <Input
                                ref="calification"
                                value={this.state.fields["calification"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "calification")} />
                            < span style={{ color: "red" }}>{this.state.errors["calification"]}</ span >
                        </Form.Item>
                        {/*< Form.Item label="created">
                            < DatePicker
                                ref="created"
                                onChange={this.handleChangeDinamycDate.bind(this, "created")}
                            value ={moment(this.state.fields["created"], 'YYYY-MM-DD')} />
                            < span style={{ color: "red" }}>{this.state.errors["created"]}</ span >
                    </ Form.Item >*/}
                        <Form.Item label="email">
                            <Input
                                ref="email"
                                value={this.state.fields["email"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "email")} />
                            < span style={{ color: "red" }}>{this.state.errors["email"]}</ span >
                        </Form.Item>
                        <Form.Item label="field1">
                            <Input
                                ref="field1"
                                value={this.state.fields["field1"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "field1")} />
                            < span style={{ color: "red" }}>{this.state.errors["field1"]}</ span >
                        </Form.Item>
                        <Form.Item label="field2">
                            <Input
                                ref="field2"
                                value={this.state.fields["field2"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "field2")} />
                            < span style={{ color: "red" }}>{this.state.errors["field2"]}</ span >
                        </Form.Item>
                        <Form.Item label="id">
                            <Input
                                ref="id"
                                value={this.state.fields["id"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "id")} />
                            < span style={{ color: "red" }}>{this.state.errors["id"]}</ span >
                        </Form.Item>
                        <Form.Item label="idsessiontype">
                            <Input
                                ref="idsessiontype"
                                value={this.state.fields["idsessiontype"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "idsessiontype")} />
                            < span style={{ color: "red" }}>{this.state.errors["idsessiontype"]}</ span >
                        </Form.Item>
                        <Form.Item label="idusertype">
                            <Input
                                ref="idusertype"
                                value={this.state.fields["idusertype"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "idusertype")} />
                            < span style={{ color: "red" }}>{this.state.errors["idusertype"]}</ span >
                        </Form.Item>
                        <Form.Item label="identificationruc">
                            <Input
                                ref="identificationruc"
                                value={this.state.fields["identificationruc"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "identificationruc")} />
                            < span style={{ color: "red" }}>{this.state.errors["identificationruc"]}</ span >
                        </Form.Item>
                        <Form.Item label="image">
                            <Input
                                ref="image"
                                value={this.state.fields["image"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "image")} />
                            < span style={{ color: "red" }}>{this.state.errors["image"]}</ span >
                        </Form.Item>
                        <Form.Item label="lastname">
                            <Input
                                ref="lastname"
                                value={this.state.fields["lastname"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "lastname")} />
                            < span style={{ color: "red" }}>{this.state.errors["lastname"]}</ span >
                        </Form.Item>
                        <Form.Item label="mobilenumber">
                            <Input
                                ref="mobilenumber"
                                value={this.state.fields["mobilenumber"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "mobilenumber")} />
                            < span style={{ color: "red" }}>{this.state.errors["mobilenumber"]}</ span >
                        </Form.Item>
                        <Form.Item label="name">
                            <Input
                                ref="name"
                                value={this.state.fields["name"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "name")} />
                            < span style={{ color: "red" }}>{this.state.errors["name"]}</ span >
                        </Form.Item>
                        <Form.Item label="password">
                            <Input
                                ref="password"
                                value={this.state.fields["password"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "password")} />
                            < span style={{ color: "red" }}>{this.state.errors["password"]}</ span >
                        </Form.Item>
                        <Form.Item label="telephone">
                            <Input
                                ref="telephone"
                                value={this.state.fields["telephone"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "telephone")} />
                            < span style={{ color: "red" }}>{this.state.errors["telephone"]}</ span >
                        </Form.Item>
                        <Form.Item label="token">
                            <Input
                                ref="token"
                                value={this.state.fields["token"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "token")} />
                            < span style={{ color: "red" }}>{this.state.errors["token"]}</ span >
                        </Form.Item>
                        {/* < Form.Item label="updated">
                            < DatePicker
                                ref="updated"
                                onChange={this.handleChangeDinamycDate.bind(this, "updated")} 
                            value ={moment(this.state.fields["updated"], 'YYYY-MM-DD')} />
                            < span style={{ color: "red" }}>{this.state.errors["updated"]}</ span >
                    </ Form.Item >*/}
                        <Form.Item label="userid">
                            <Input
                                ref="userid"
                                value={this.state.fields["userid"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "userid")} />
                            < span style={{ color: "red" }}>{this.state.errors["userid"]}</ span >
                        </Form.Item>
                    </ Form >
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
                    < Form.Item >
                        < Button
                            onClick={() => this.clickNuevo()}
                        > +Nuevo </ Button >
                    </ Form.Item >
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
export default User;
