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
class Schedule extends Component {
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
        description: "",
        id: 0,
        idday: 0,
        disableControl: false,
        disableNuevo: false,
        disableEditar: false,
        disableGuardar: false,
        disableEliminar: false,
        disableCancelar: false,
        flagNuevo: false

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
    editSchedule = (record) => {
        console.log('seleccion:', record);
        this.setState({ flagModal: true });
        this.setState({ editNew: 2 });//editar
        this.setFields(record);
    };
    eliminarSchedule = (record) => {
        this.setFields(record);
        console.log('eliminar:', record);
        this.setState({ flagModalEliminar: true });

    };
    columns = [
        {
            title: 'active',
            dataIndex: 'active',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'description',
            dataIndex: 'description',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'endschedule',
            dataIndex: 'endschedule',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'id',
            dataIndex: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'idday',
            dataIndex: 'idday',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'iduser',
            dataIndex: 'iduser',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'startschedule',
            dataIndex: 'startschedule',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Editar',
            dataIndex: 'iduser',
            render: (text, record) => {
                let control = ''
                return <Button type="primary" size="small" shape="circle" icon={<EditFilled
                    onClick={() =>
                        this.editSchedule(record)
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
                        this.eliminarSchedule(record)
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
        if (!fields["active"]) {
            formIsValid = false;
            errors["active"] = "Campo obligatorio";
        }
        if (!fields["description"]) {
            formIsValid = false;
            errors["description"] = "Campo obligatorio";
        }
        if (!fields["endschedule"]) {
            formIsValid = false;
            errors["endschedule"] = "Campo obligatorio";
        }
        if (!fields["id"]) {
            formIsValid = false;
            errors["id"] = "Campo obligatorio";
        }
        if (!fields["idday"]) {
            formIsValid = false;
            errors["idday"] = "Campo obligatorio";
        }
        if (!fields["iduser"]) {
            formIsValid = false;
            errors["iduser"] = "Campo obligatorio";
        }
        if (!fields["startschedule"]) {
            formIsValid = false;
            errors["startschedule"] = "Campo obligatorio";
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
        fields['active'] = false;
        fields['id'] = 0;
        fields['idday'] = 0;
        fields['iduser'] = 0;
        this.setState({ fields });
    }
    setFields = (record) => {
        let fields = this.state.fields;
        fields['active'] = record.active;
        fields['id'] = record.id;
        fields['idday'] = record.idday;
        fields['iduser'] = record.iduser;
        this.setState({ fields });
    }
    getInformation = async () => {
        await axios.get('http://localhost:3001/api/Schedule')
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "key": row.id,
                        "active": row.active,
                        "description": row.description,
                        "endschedule": row.end_schedule,
                        "id": row.id,
                        "idday": row.id_day,
                        "iduser": row.id_user,
                        "startschedule": row.start_schedule,
                    }
                })
                this.setState({ data: options });
                console.log('data', options);
            }
            )
    };
    editInformation = async (active, description, endschedule, id, idday, iduser, startschedule) => {
        const param = {
            "active": active,
            "description": description,
            "endschedule": endschedule,
            "id": id,
            "idday": idday,
            "iduser": iduser,
            "startschedule": startschedule,
        }
        console.log('param', param);
        await axios.put('https://localhost:44315/api/Iva/update', param)
            .then(response => {
                console.log('data', response);
            }
            )
    };
    insertInformation = async (active, description, endschedule, id, idday, iduser, startschedule) => {
        const param = {
            "active": active,
            "description": description,
            "endschedule": endschedule,
            "id": id,
            "idday": idday,
            "iduser": iduser,
            "startschedule": startschedule,
        }
        await axios.post('https://localhost:44315/api/Iva/insert', param)
            .then(response => {
                this.setState({ infoContract: response.data });
                console.log('data', response);
            }
            )
    };
    guardarRegistro = async () => {//nuevo y editar

        if (this.state.editNew == 1) {
            await this.insertInformation(this.state.fields["active"], this.state.fields["description"], this.state.fields["endschedule"], this.state.fields["id"], this.state.fields["idday"], this.state.fields["iduser"], this.state.fields["startschedule"]);
            openNotificationGuardar('topRight');
            await this.getInformation();
            this.resetFields();

        }
        else if (this.state.editNew == 2) {
            await this.editInformation(this.state.fields["active"], this.state.fields["description"], this.state.fields["endschedule"], this.state.fields["id"], this.state.fields["idday"], this.state.fields["iduser"], this.state.fields["startschedule"]);
            openNotificationEditar('topRight');
            await this.getInformation();
            this.resetFields();

        }

    }
    eliminarRegistro = async () => {
        await this.editInformation(this.state.fields["active"], this.state.fields["description"], this.state.fields["endschedule"], this.state.fields["id"], this.state.fields["idday"], this.state.fields["iduser"], this.state.fields["startschedule"]);
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
                < Modal title="schedule"
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
                        <Form.Item label="id">
                            <Input
                                ref="id"
                                value={this.state.fields["id"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "id")} />
                            < span style={{ color: "red" }}>{this.state.errors["id"]}</ span >
                        </Form.Item>
                        <Form.Item label="idday">
                            <Input
                                ref="idday"
                                value={this.state.fields["idday"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "idday")} />
                            < span style={{ color: "red" }}>{this.state.errors["idday"]}</ span >
                        </Form.Item>
                        <Form.Item label="iduser">
                            <Input
                                ref="iduser"
                                value={this.state.fields["iduser"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "iduser")} />
                            < span style={{ color: "red" }}>{this.state.errors["iduser"]}</ span >
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
export default Schedule;
