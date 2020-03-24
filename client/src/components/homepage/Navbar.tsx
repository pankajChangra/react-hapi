import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../images/bp.png';

class Navbar extends Component {
    
    logOut = (e:any) => {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        // this.props.history.push(`/`)
    }

    render() {
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link bg-color">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link bg-color">
                        Register
                    </Link>
                </li>
            </ul>
        )
        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link bg-color">
                        User
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="/" onClick={this.logOut} className="nav-link bg-color">
                        Logout
                    </a>
                </li>
            </ul>
        )

        return (
                <div className="hompage-navbar">
                    <nav className="navbar navbar-expand-md navbar-light background-color">
                        <a href="/" className="navbar-brand">
                            <img src={Logo} height="28" alt="CoolBrand" />
                         </a>
                        <button
                        type="button"
                        className="navbar-toggler"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                        >
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav">
                            <a href="/" className="nav-item nav-link active">
                            Home
                            </a>
                            {localStorage.usertoken ? userLink : loginRegLink}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;