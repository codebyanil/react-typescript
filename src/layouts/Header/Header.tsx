import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;

  [key: string]: any;
}

const Header = () => {
  return (
    <div className="hero-layout">
      <div>
        <span className="text-bold text-center m-4"><h3>Replay APP</h3></span>
        <ul className="wrap-list">
          <li>
            <Link to="/">
              <i className="fa fa-chart-bar mr-2" />
              <span className="ml-1">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <i className="fa fa-mobile mr-2" />
              <span className="ml-1">Contact</span>
            </Link>
          </li>
          <li>
            <Link to="/story">
              <i className="fa fa-book mr-2" />
              <span className="ml-1">Story</span>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <i className="fa fa-cog mr-2" />
              <span className="ml-1">Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/logout">
              <i className="fa fa-sign-out-alt mr-2" />
              <span className="ml-1">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
