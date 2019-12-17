import React from "react";
import { editItem, deleteItem, getDataDump } from '../controller/api'
import { confirmBox } from '../common'

export class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { database: [] };
    }

    handleChange() {
        this.props.onDBUpdate()
        this.componentDidMount()
    }
    componentDidMount() {
        getDataDump().then(data => {
            this.setState(data);
        });
    }

    render() {
        return this.state.database.map(x => (
            <tbody className="w3-striped" key={x.ctrl_num}>
                <tr>
                    <td>{x.ctrl_num}</td>
                    <td>{x.type}</td>
                    <td>{x.manufacturer}</td>
                    <td>{x.model}</td>
                    <td>{x.serial_num}</td>
                    <td>{x.owner}</td>
                    <td>{x.location}</td>
                    <td>
                        <button onClick={editItem(x.ctrl_num)}>Edit</button>
                        <button onClick={() => {
                            confirmBox('Delete?',
                                'Are you sure you want to delete?',
                                () => {
                                    deleteItem(x.ctrl_num).then(() => this.handleChange())
                                }
                            )
                        }}>Delete</button>
                    </td>
                </tr>
            </tbody>
        ));
    }
}

