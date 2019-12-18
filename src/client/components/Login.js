import React from 'react'

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { user: '', password: '' }
        this.handleUserChange = this.handleUserChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }
    handleUserChange(e) {
        this.setState({ user: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleLogin(e) {
        e.preventDefault()
    }

    render() {
        return (<div className="main-body w3-container">
            <h4>hi</h4>
            <form id="login">
                <ul className="no-bullet w3-center">
                    <li>
                        <label>Username: </label>
                        <input type="text" id="user" name="username" value={this.state.user} onChange={this.handleUserChange} />
                    </li>
                    <li>
                        <label>Login: </label>
                        <input type="password" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    </li>
                    <li>
                        <button type="submit" onClick={this.handleLogin}>Submit</button>
                    </li>
                </ul>
            </form>
        </div >)
    }
}