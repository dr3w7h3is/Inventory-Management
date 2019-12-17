import React from 'react';
import { getCategories, postNewRecord } from '../controller/api'
export class Manage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { categories: [] }
    }
    componentDidMount() {
        getCategories().then(categories => {
            this.setState({ categories: categories })
        })
    }
    submit(e) {
        e.preventDefault()
        var type = document.getElementById("type").value;
        var man = document.getElementById("man").value;
        var model = document.getElementById("model").value;
        var serial = document.getElementById("serial").value;
        var owner = document.getElementById("owner").value;
        var loc = document.getElementById("loc").value;
        var desc = document.getElementById("desc").value;
        var checked_out = document.getElementById("checked_out").checked;
        var newItem = {
            ctrl_num: "",
            type: type,
            manufacturer: man,
            model: model,
            serial_num: serial,
            owner: owner,
            location: loc,
            description: desc,
            checked_out: checked_out,
            check_out: " "
        };
        //newItem = addHash(newItem);
        newItem = JSON.stringify(newItem);
        postNewRecord(newItem)
        return false
    }
    render() {
        return (
            <div className="main-body w3-container">
                <h1>Manage</h1>
                <div className="add-items">
                    <form id="items">
                        <ul className="no-bullet w3-center">
                            <li>
                                <label form="type">Type: </label>
                                <select id="type" name="type_name">
                                    {this.state.categories.map(category => {
                                        return (<option value={category.key}>{category.name}</option>)
                                    })}
                                </select>
                            </li>
                            <li>
                                <label form="type">Manufacturer: </label>
                                <input type="text" id="man" name="man_name"></input>
                            </li>
                            <li>
                                <label form="type">Model: </label>
                                <input type="text" id="model" name="model"></input>
                            </li>
                            <li>
                                <label form="type">Serial Number: </label>
                                <input type="text" id="serial" name="serial"></input>
                            </li>
                            <li>
                                <label form="type">Owner: </label>
                                <input type="text" id="owner" name="owner"></input>
                            </li>
                            <li>
                                <label form="type">Location: </label>
                                <input type="text" id="loc" name="location"></input>
                            </li>
                            <li>
                                <label form="type">Description: </label>
                                <input type="text" id="desc" name="desctription"></input>
                            </li>
                            <li>
                                <label>Checked Out?
                  <input id="checked_out" type="checkbox" name="checked_out" value="Check Out" />
                                </label>
                            </li>
                            <li className="w3-center">
                                <button onClick={this.submit}>
                                    Add
              </button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        );
    }
}