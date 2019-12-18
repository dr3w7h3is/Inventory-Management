import React from "react";
import { editItem, deleteItem, getDataDump } from '../controller/api'
import { confirmBox } from '../common'

export class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.updateDatabase = this.updateDatabase.bind(this)
        this.state = { database: [] };
    }

    handleChange() {
        this.props.onDBUpdate()
        this.updateDatabase()
    }

    updateDatabase() {
        getDataDump().then(data => {
            this.setState(data);
        });
    }

    componentDidMount() {
        this.updateDatabase()
    }


    render() {
        return this.state.database.map(x => (
            <RecordItem key={x.ctrl} record={x} handleChange={this.handleChange} />
        ));
    }
}

class RecordItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.state = { edit: false, record: props.record }
    }

    handleEditClick() {
        this.setState({ edit: !this.state.edit })
    }

    handleEdit(e) {
        let newRecord = {}
        Object.assign(newRecord, this.state.record)
        newRecord[e.target.id] = e.target.value
        this.setState({ record: newRecord })
    }

    handleSubmit(e) {
        if (e.charCode === 13) {
            this.setState({ edit: false })
            let jstr = JSON.stringify(this.state.record)
            editItem(jstr).then(e => this.props.handleChange())
        }
    }
    render() {
        let fields = (
            <tr>
                <td>{this.props.record.ctrl}</td>
                <td>{this.props.record.type}</td>
                <td>{this.props.record.manufacturer}</td>
                <td>{this.props.record.model}</td>
                <td>{this.props.record.serial}</td>
                <td>{this.props.record.owner}</td>
                <td>{this.props.record.location}</td>
                <td>
                    <button onClick={this.handleEditClick}>Edit</button>
                    <button onClick={() => {
                        confirmBox('Delete?',
                            'Are you sure you want to delete?',
                            () => {
                                deleteItem(this.state.record.ctrl).then(() => this.props.handleChange())
                            }
                        )
                    }}>Delete</button>
                </td>
            </tr>
        )
        if (this.state.edit) {
            fields = (
                <tr>
                    <td>{this.props.record.ctrl}</td>
                    <td>{this.props.record.type}</td>
                    <td>{this.props.record.manufacturer}</td>
                    <td>{this.props.record.model}</td>
                    <td>{this.props.record.serial}</td>
                    <td><input type="text" onChange={this.handleEdit} onKeyPress={this.handleSubmit}
                        name="owner" id="owner" value={this.state.record.owner} /></td>
                    <td><input type="text" onChange={this.handleEdit} onKeyPress={this.handleSubmit}
                        name="location" id="location" value={this.state.record.location} /></td>
                    <td>
                        <button onClick={this.handleEditClick}>Edit</button>
                        <button onClick={() => {
                            confirmBox('Delete?',
                                'Are you sure you want to delete?',
                                () => {
                                    deleteItem(this.state.record.ctrl).then(() => this.props.handleChange())
                                }
                            )
                        }}>Delete</button>
                    </td>
                </tr>)
        }
        return (
            <tbody className="w3-striped" key={this.state.ctrl}>
                {fields}

            </tbody>
        )
    }
}
