import React from 'react';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

const Header = props => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" style={{'fontWeight':'500'}} to="/">
          <img src={logo} alt="ScholarBlock" width="24" style={{
            'marginTop': '-7px',
            'marginRight': '7px'
          }} />
          ScholarBlock
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#top">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#top">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#top">How it Works</a>
            </li>
          </ul>
          <span className="navbar-text">
            <button className="btn btn-outline-success my-2 my-sm-0">Create Scholarship</button>
          </span>
        </div>
      </nav>
)

export default Header;