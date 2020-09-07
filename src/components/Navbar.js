import React, {useState} from "react";
import {NavLink} from "react-router-dom";

export const Navbar = () =>{

    const [visible, toggleVisibility] = useState(false);

    return (
            <nav className={"navbar navbar-dark navbar-expand-lg bg-primary"}>
                <div className={"navbar-brand"}>
                    Velidoss
                </div>
                <button className="navbar-toggler" type="button" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={"collapse navbar-collapse"} id="navbarSupportedContent">
                    <ul className="navbar-nav " >
                        <li className="nav-item ">
                            <NavLink className="nav-link" to="/" exact>Головна </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/completed">Виконані</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/cancelled">Відмінені</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">Інформація</NavLink>
                        </li>
                    </ul>
                </div>

            </nav>
        )

}