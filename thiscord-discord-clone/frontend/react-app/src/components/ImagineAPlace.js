import React from 'react';
import '../css/ImagineAPlace.css'
import channelsHomeSvg from '../css/images/thiscord-channel-img.svg'


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
                    <img src={channelsHomeSvg} alt='something in there' />
                </div>
                <div className='channels-home-text'>
                    <h3 id='channels-home-h3'>Create an invite-only place where you belong</h3>
                    <span className='channels-home-body-text'>
                    Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.
                    </span>
                </div>
            </div>

        </main>
    )
}


export default ImagineAPlace
