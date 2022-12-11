import React from 'react';
import '../css/ImagineAPlace.css'


const ImagineAPlace = () => {
    return (
        <main>
            <div className='hero-container'>
                <div className='hero-body'>
                    <div className='hero-text'>
                        <h1 className='hero-h1-text'>Imagine A Place...</h1>
                        <div className='hero-body-text'>
                            ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often
                        </div>
                    </div>
                </div>
            </div>
            <div className='hero-image-container'>
                <img id='hero-image' src='https://theme.zdassets.com/theme_assets/678183/b7e9dce75f9edb23504e13b4699e208f204e5015.png' alt=''></img>
            </div>
        </main>
    )
}


export default ImagineAPlace
