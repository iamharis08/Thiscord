import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/ComingSoon.css'


const ComingSoon = () => {
    return (
        <main>
            <div className='hero-container'>
                <img id='hero-image' src='https://theme.zdassets.com/theme_assets/678183/b7e9dce75f9edb23504e13b4699e208f204e5015.png' alt='' />
                <div className='hero-text'>
                    <h1 className='coming-soon-h1-text'>Coming soon!</h1>
                    <div className='hero-body-text'>
                        Our team is working hard to make you a website better than Michael's group's website
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
        </main>
    )
}


export default ComingSoon
