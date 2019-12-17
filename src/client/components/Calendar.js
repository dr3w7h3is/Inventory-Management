import React from "react";
//Calendar Page Content
export class Calendar extends React.Component {
    render() {
        return (<div className="main-body w3-container">
            <h1>Calendar</h1>
            <div className="month">
                <ul>
                    <li className="prev">&#10094;</li>
                    <li className="next">&#10095;</li>
                    <li>
                        November<br></br>
                        <span>2019</span>
                    </li>
                </ul>
            </div>
            <ul className="weekdays">
                <li>Mon</li>
                <li>Tues</li>
                <li>Wed</li>
                <li>Thurs</li>
                <li>Fri</li>
                <li>Sat</li>
                <li>Sun</li>
            </ul>
            <ul className="days">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
            </ul>
        </div>);
    }
}
