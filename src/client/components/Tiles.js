import React from "react";
import { getRecordsByCategory } from '../controller/api'
// Fucntion for creating tiles elements
export class Tiles extends React.Component {
    render() {
        return this.props.categories.map(x => (<Tile key={x.key} category={x.key} name={x.name} color={x.color} symbol={x.symbol} />));
    }
}
class Tile extends React.Component {
    constructor(props) {
        super()
        this.state = { in: 0, out: 0 }
    }


    componentDidMount() {
        this.updateCategories()
    }

    componentWillReceiveProps() {
        this.updateCategories()
    }

    updateCategories() {
        getRecordsByCategory(this.props.category).then(data => {
            let checkedOut = data.filter(record => record.checked_out).length
            let checkedIn = Math.abs(data.length - checkedOut)
            this.setState({ in: checkedIn, out: checkedOut })
        })
    }

    render() {
        return (<div className="w3-quarter" key={this.props.name}>
            <div className={`w3-container w3-${this.props.color} w3-padding-16 text-white`}>
                <div className="w3-left w3-half">
                    <i className={`fa ${this.props.symbol} w3-xxxlarge`}></i>
                </div>
                <div className="w3-left">
                    <h6>Devices IN: {this.state.in}</h6>
                    <h6>Devices OUT: {this.state.out}</h6>
                </div>
                <div className="w3-clear w3-center">
                    <h4>{this.props.name}</h4>
                </div>
            </div>
        </div>)
    }
}