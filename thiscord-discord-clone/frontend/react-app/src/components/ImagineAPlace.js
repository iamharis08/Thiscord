import React from 'react';
import '../css/ImagineAPlace.css'
import channelsHomeSvg from '../css/images/thiscord-channel-img.svg'
import voiceChannelImg from '../css/images/voice-channel-img.svg'
import membersHomeImg from '../css/images/members-home-img.svg'
import voiceCallImg from '../css/images/voice-call-img.svg'


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
                    <img src={voiceChannelImg} alt=''/>
                </div>
            </div>
            <div className='members-section-container'>
                <div className='members-home-image'>
                    <img src={membersHomeImg} alt=''/>
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
                    <img src={voiceCallImg} alt=''/>
                </div>
            </div>
        </main>
    )
}


export default ImagineAPlace
