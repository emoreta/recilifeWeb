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
class Calification extends Component {
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
        id: 0,
        punctuation: 0,
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
    editCalification = (record) => {
        console.log('seleccion:', record);
        this.setState({ flagModal: true });
        this.setState({ editNew: 2 });//editar
        this.setFields(record);
    };
    eliminarCalification = (record) => {
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
            title: 'created',
            dataIndex: 'created',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'id',
            dataIndex: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'punctuation',
            dataIndex: 'punctuation',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Editar',
            dataIndex: 'iduser',
            render: (text, record) => {
                let control = ''
                return <Button type="primary" size="small" shape="circle" icon={<EditFilled
                    onClick={() =>
                        this.editCalification(record)
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
                        this.eliminarCalification(record)
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
        if (!fields["created"]) {
            formIsValid = false;
            errors["created"] = "Campo obligatorio";
        }
        if (!fields["id"]) {
            formIsValid = false;
            errors["id"] = "Campo obligatorio";
        }
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Campo obligatorio";
        }
        if (!fields["punctuation"]) {
            formIsValid = false;
            errors["punctuation"] = "Campo obligatorio";
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
        fields['created'] = '';
        fields['id'] = 0;
        fields['punctuation'] = 0;
        this.setState({ fields });
    }
    setFields = (record) => {
        let fields = this.state.fields;
        fields['active'] = record.active;
        fields['created'] = record.created;
        fields['id'] = record.id;
        fields['punctuation'] = record.punctuation;
        this.setState({ fields });
    }
    getInformation = async () => {
        await axios.get('http://localhost:3001/api/Calification')
            .then(response => {
                var options = response.data.map(function (row) {
                    return {
                        "key": row.id,
                        "active": row.active,
                        "created": row.created,
                        "id": row.id,
                        "name": row.name,
                        "punctuation": row.punctuation,
                    }
                })
                this.setState({ data: options });
                console.log('data', options);
            }
            )
    };
    editInformation = async (active, created, id, name, punctuation) => {
        const param = {
            "active": active,
            "created": created,
            "id": id,
            "name": name,
            "punctuation": punctuation,
        }
        console.log('param', param);
        await axios.put('https://localhost:44315/api/Iva/update', param)
            .then(response => {
                console.log('data', response);
            }
            )
    };
    insertInformation = async (active, created, id, name, punctuation) => {
        const param = {
            "active": active,
            "created": created,
            "id": id,
            "name": name,
            "punctuation": punctuation,
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
            await this.insertInformation(this.state.fields["active"], this.state.fields["created"], this.state.fields["id"], this.state.fields["name"], this.state.fields["punctuation"]);
            openNotificationGuardar('topRight');
            await this.getInformation();
            this.resetFields();

        }
        else if (this.state.editNew == 2) {
            await this.editInformation(this.state.fields["active"], this.state.fields["created"], this.state.fields["id"], this.state.fields["name"], this.state.fields["punctuation"]);
            openNotificationEditar('topRight');
            await this.getInformation();
            this.resetFields();

        }

    }
    eliminarRegistro = async () => {
        await this.editInformation(this.state.fields["active"], this.state.fields["created"], this.state.fields["id"], this.state.fields["name"], this.state.fields["punctuation"]);
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
                < Modal title="calification"
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
                        {/*< Form.Item label="created">
                            < DatePicker
                                ref="created"
                                onChange={this.handleChangeDinamycDate.bind(this, "created")} 
                                value ={moment(this.state.fields["created"], 'YYYY-MM-DD')} />
                            < span style={{ color: "red" }}>{this.state.errors["created"]}</ span >
                    </ Form.Item >*/}
                        <Form.Item label="id">
                            <Input
                                ref="id"
                                value={this.state.fields["id"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "id")} />
                            < span style={{ color: "red" }}>{this.state.errors["id"]}</ span >
                        </Form.Item>
                        <Form.Item label="punctuation">
                            <Input
                                ref="punctuation"
                                value={this.state.fields["punctuation"] || ''}
                                onChange={this.handleChangeDinamyc.bind(this, "punctuation")} />
                            < span style={{ color: "red" }}>{this.state.errors["punctuation"]}</ span >
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
export default Calification;
