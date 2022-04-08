import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import {Link} from 'react-router-dom';

const MobileMenu = (props) => {
    return(
    <Menu 
        right
        outerContainerId='outer-wrapper'
        pageWrapId='content-cotainer'
    >
        <Link  to="/" className="menu-item">
            <span>Dashboard</span>
        </Link>
        <Link  to="/mission-pools" className="menu-item">
            <span>Mission Pools</span>
        </Link>
        <Link  to="/single-asset-staking" className="menu-item">
            <span>Single Asset Staking</span>
        </Link>
        <Link  to="/Swap" className="menu-item">
            <span>Swap</span>
        </Link>
        <Link  to="/rewards" className="menu-item">
            <span>Rewards</span>
        </Link>
        <Link  to="/warchest" className="menu-item">
            <span>Warchest</span>
        </Link>
        <Link  to="/rankings" className="menu-item">
            <span>Rankings</span>
        </Link>
        
      </Menu>
    );
}

export default MobileMenu;