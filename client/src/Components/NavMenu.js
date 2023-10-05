import React from 'react';
import {
    Link
} from "react-router-dom";
import { BiHomeAlt, BiMusic } from 'react-icons/bi';
import { BiSearch } from 'react-icons/bi';
import { VscLibrary, VscNote } from 'react-icons/vsc';
import '../styles/NavMenu.scss';

const NavMenu = props => {
    return(
        <nav className="col-sm-2 col-xs-12">
            <Link to="/">
                <span className="route"><BiHomeAlt /><span> Home</span></span>
            </Link>
            <Link to="/search">
                <span className="route"><BiSearch /><span> Search</span></span>
            </Link>
            <Link to="/random">
                <span className="route"><BiMusic /><span> Songs</span></span>
            </Link>
        </nav>
    )
}

export default NavMenu;