import React from 'react';
import { Inventory } from './Inventory'

export class Equipment extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange() {
        this.props.onDBUpdate()
    }
    render() {
        return (
            <div className="main-body w3-container">
                <h1>Inventory</h1>
                <table className="w3-table w3-bordered w3-border w3-hoverable w3-white">
                    <thead>
                        <tr>
                            <th>Control Number</th>
                            <th>Type</th>
                            <th>Manufacturer</th>
                            <th>Model</th>
                            <th>Serial Number</th>
                            <th>Owner</th>
                            <th>Location</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <Inventory onDBUpdate={this.handleChange} />
                </table>
            </div>
        );
    }
}
