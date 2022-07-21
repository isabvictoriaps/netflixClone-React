import React from 'react';
import './Header.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">

                <a href="/">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix"/>
                </a>

            </div>

            <div className="header--user">
            <a href="/">
                <img src="https://i.pinimg.com/originals/c0/8e/6c/c08e6c9595e03202a46a95f66578799f.png" alt="usuario"/>
                </a>
            </div>

        </header>
    );
}