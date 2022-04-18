import React from 'react';
import {  Link } from "react-router-dom";
const NavBar= () =>{
  return (
  <div>
    <li className='navBar'>
      <Link className = 'navLink' to="/trades">Trades</Link>
    </li>
    <li className='navBar'>
      <Link  className = 'navLink' to="/positions">Positions</Link>
    </li>

  </div>
  );
}
export default NavBar;