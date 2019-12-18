import React from 'react';
import { getCategories, postNewRecord } from '../controller/api'
export class Manage extends React.Component {
    constructor(props) {
        super(props)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.submit = this.submit.bind(this)
        this.clearForm = this.clearForm.bind(this)
        this.state = { categories: [] }
    }

    componentDidMount() {
        getCategories().then(categories => {
            this.setState({ categories: categories })
        })
    }


    handleFormChange(e) {
        let value = e.target.value
        if (e.target.type === 'checkbox') {
            value = e.target.checked
        }
        this.setState({ [e.target.id]: value })
    }

    clearForm() {
        let copy = {}
        Object.assign(copy, this.state)
        let categories = this.state.categories
        Object.keys(copy).map(key => copy[key] = '')
        copy.categories = categories
        this.setState(copy)
    }

    submit(e) {
        e.preventDefault()
        let stateCopy = {}
        Object.assign(stateCopy, this.state)
        delete stateCopy.categories
        //newItem = addHash(newItem);
        let jstr = JSON.stringify(stateCopy);
        postNewRecord(jstr).then(t => this.clearForm())
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
                                <select value={this.state.type} onChange={this.handleFormChange} id="type" name="type_name">
                                    {this.state.categories.map(category => {
                                        return (<option value={category.key} key={category.key}>{category.name}</option>)
                                    })}
                                </select>
                            </li>
                            <li>
                                <label form="type">Manufacturer: </label>
                                <input value={this.state.manufacturer} onChange={this.handleFormChange} type="text" id="manufacturer" name="man_name"></input>
                            </li>
                            <li>
                                <label form="type">Model: </label>
                                <input value={this.state.model} onChange={this.handleFormChange} type="text" id="model" name="model"></input>
                            </li>
                            <li>
                                <label form="type">Serial Number: </label>
                                <input value={this.state.serial} onChange={this.handleFormChange} type="text" id="serial" name="serial"></input>
                            </li>
                            <li>
                                <label form="type">Owner: </label>
                                <input value={this.state.owner} onChange={this.handleFormChange} type="text" id="owner" name="owner"></input>
                            </li>
                            <li>
                                <label form="type">Location: </label>
                                <input value={this.state.location} onChange={this.handleFormChange} type="text" id="location" name="location"></input>
                            </li>
                            <li>
                                <label form="type">Description: </label>
                                <input value={this.state.description} onChange={this.handleFormChange} type="text" id="description" name="description"></input>
                            </li>
                            <li>
                                <label>Checked Out?
                  <input id="checked_out" onChange={this.handleFormChange} type="checkbox" name="checked_out" checked={this.state.checked_out} />
                                </label>
                            </li>
                            <li className="w3-center">
                                <button type="submit" onClick={this.submit}>
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