import React from 'react';
import './Menu.css';
import logo from './logo.svg';
import home from './home.svg';
import arrow from './arrow_left.svg';
import Searchbar from '../Searchbar/Searchbar';
import { Link,useNavigate } from 'react-router-dom';


const Menu = () => {

    const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}

    return (
        <header className='navheader'>
            <div className="navheader--logo">
                <img src={logo} alt="logo" />
            </div>
            <nav className='navheader--navbar'>
                <ul className='navheader--navbar--ul'>

                    <Link to="/">
                        <li className='navheader--navbar--ul--li active--li'>
                            <div className="home--icon">
                                <img src={home} alt="home" />
                            </div>
                            Home
                        </li>
                    </Link>

                    <li className='navheader--navbar--ul--li back--li' onClick={goBack}>
                        <div className="back--icon">
                            <img src={arrow} alt="back" />
                        </div>
                        <p>Go back</p>
                    </li>
                </ul>
            </nav>
            <div className="searchbar-container">
                <Searchbar />
            </div>
        </header>
    )
}

export default Menu;