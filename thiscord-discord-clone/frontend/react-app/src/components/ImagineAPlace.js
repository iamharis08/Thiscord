import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/ImagineAPlace.css'


const ImagineAPlace = () => {
    return (
        <main>
            <div className='hero-container'>
                <img id='hero-image' src='https://theme.zdassets.com/theme_assets/678183/b7e9dce75f9edb23504e13b4699e208f204e5015.png' alt=''></img>
                <div className='hero-text'>
                    <h1 className='hero-h1-text'>IMAGINE A PLACE...</h1>
                    <div className='hero-body-text'>
                        ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often
                    </div>
                </div>
            </div>
            <div className='channels-section-container'>
                <div className='channels-home-image'>
                    <img src='https://res.cloudinary.com/drybvuzux/image/upload/v1671038950/thiscord-channel-img_rjweka.svg' alt='something in there' />
                </div>
                <div className='channels-home-text'>
                    <h2 id='channels-home-h2'>Create an invite-only place where you belong</h2>
                    <span className='channels-home-body-text'>
                    Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.
                    </span>
                </div>
            </div>
            <div className='voice-channels-section-container'>
                <div className='voice-channels-home-text'>
                    <h2 id='voice-channels-home-h2'>Where hanging out is easy</h2>
                    <span className='voice-channels-home-body-text'>
                    Grab a seat in a voice channel when you're free. Friends in your server can see you're around and instantly pop in to talk without having to call.
                    </span>
                </div>
                <div className='voice-channels-home-image'>
                    <img src='https://res.cloudinary.com/drybvuzux/image/upload/v1671038884/voice-channel-img_umaobg.svg' alt=''/>
                </div>
            </div>
            <div className='members-section-container'>
                <div className='members-home-image'>
                    <img src='https://res.cloudinary.com/drybvuzux/image/upload/v1671038805/members-home-img_n7oomh.svg' alt=''/>
                </div>
                <div className='members-home-text'>
                    <h2 id='members-home-h2'>From few to a fandom</h2>
                    <span className='members-home-body-text'>
                    Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.
                    </span>
                </div>
            </div>
            <div className='voice-call-section-container'>
                <div className='voice-call-home-text'>
                    <h2 id='voice-call-home-h2'>RELIABLE TECH FOR STAYING CLOSE</h2>
                    <span className='voice-call-home-body-text'>
                    Low-latency voice and video feels like you're in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.
                    </span>
                </div>
                <div className='voice-call-home-image'>
                    <img src='https://res.cloudinary.com/drybvuzux/image/upload/v1671037592/voice-call-img_e0hjeu.svg' alt=''/>
                </div>
            </div>
            <div className='journey-container'>
                <div className='sparkles'>
                    <img src='https://res.cloudinary.com/drybvuzux/image/upload/v1671057856/sprakles-home-img_ymbgaa.svg' alt=''></img>
                </div>
                    <i className="fa-regular fa-arrow-down-to-bracket"></i>
                <div className='start-your-journey-text'>
                    Ready to start your journey?
                </div>
                <NavLink to='/login'>
                    <button className='download-btn'>
                        <img alt='' src='https://res.cloudinary.com/drybvuzux/image/upload/v1671061757/download-btn-img_1_l8p4b0.svg'></img>
                        Download for Windows
                    </button>
                </NavLink>
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


export default ImagineAPlace
