import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <AppBar position="static"
                title="My AppBar"
                children={
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login/">Login</Link>
                        </li>
                    </ul>
                }
            />
        )
    }
}

export default Header;