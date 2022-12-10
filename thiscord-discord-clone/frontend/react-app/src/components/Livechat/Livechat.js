import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import "./Livechat.css"

const LiveChat = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();



    return (
        <>
            <head>
                <title>Socket.IO chat</title>
            </head>
            <body>
                <ul className='messages'></ul>
                <form className="form" action="">
                    <input className="input" autocomplete="off" /><button>Send</button>
                </form>
            </body>
        </>
    )
};

export default LiveChat;
