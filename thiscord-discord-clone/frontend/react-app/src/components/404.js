import React from "react";
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import '../css/404.css'

function NotFound() {

    return (
        <main>
            <div className="wrong-turn-container">
                <NavBar />
                <div className="wrong-turn-content">
                    <div className="wrong-turn-text">
                        <div className="wrong-turn-title">
                            <h1>
                                WRONG TURN?
                            </h1>
                        </div>
                        <div className="wrong-turn-body">
                            You look lost, stranger. You know what helps when you're lost? A piping hot bowl of noodles. Take a seat, we're frantically at work here cooking up something good.
                        </div>
                    </div>
                    <div className="wrong-turn-image">
                        <img id= 'wrong-turn-gif' src="https://res.cloudinary.com/drybvuzux/image/upload/v1671424551/404thiscord_pm2eha.gif" alt=""></img>
                    </div>
                </div>
            </div>
            <div className='footer-container'>
                <div className='imagine-a-place-footer'>
                    <h4 className='imagine-text'>
                        IMAGINE A PLACE
                    </h4>
                    <span className='language-footer'>
                        <img id='usa-footer-img' alt='' src='https://res.cloudinary.com/drybvuzux/image/upload/v1671077047/Screenshot_2022-12-14_220217_i21w2w.png'></img>
                        English, USA
                    </span>
                </div>
                <div className='jacob-developer-footer'>
                    <a href='https://github.com/jacoblauxman'>
                        <img id='github-logo' src='https://www.shareicon.net/data/2015/09/15/101512_logo_512x512.png' alt=''></img>
                        Jacob Lauxman
                    </a>
                </div>
                <div className='tyler-developer-footer'>
                    <a href='https://github.com/Cahzzm'>
                    <img id='github-logo' src='https://www.shareicon.net/data/2015/09/15/101512_logo_512x512.png' alt=''></img>
                        Tyler Short
                    </a>
                </div>
                <div className='trevor-developer-footer'>
                    <a href='https://github.com/Trevor-Walton-Moore'>
                    <img id='github-logo' src='https://www.shareicon.net/data/2015/09/15/101512_logo_512x512.png' alt=''></img>
                        Trevor Moore
                    </a>
                </div>
                <div className='haris-developer-footer'>
                    <a href='https://github.com/iamharis08'>
                    <img id='github-logo' src='https://www.shareicon.net/data/2015/09/15/101512_logo_512x512.png' alt=''></img>
                        Haris Ahmed
                    </a>
                </div>
            </div>
            <div className='logo-signup-container'>
                <div className='footer-line-seperator'></div>
                <div id='logo-signup'>
                    <NavLink to='/'>
                        <div className='logo-footer'>
                            <img id='thiscord-logo-footer' alt='' src='https://pnggrid.com/wp-content/uploads/2021/05/Black-and-white-Discord-Logo.png'></img>
                            This.cord
                        </div>
                    </NavLink>
                    <NavLink to='/sign-up'>
                        <button className='signup-footer'>
                            Signup
                        </button>
                    </NavLink>
                </div>
            </div>
        </main>
    )
}


export default NotFound
