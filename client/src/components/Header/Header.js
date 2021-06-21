import { Link } from 'react-router-dom';

import './Header.css';

function Header() {
  return (
    <header>
      <h1>Music Lab</h1>
      <nav>
        <Link to='/'>
          Home
        </Link>
        <Link to='/songs'>
          Songs
        </Link>
      </nav>
    </header>
  );}

export default Header;