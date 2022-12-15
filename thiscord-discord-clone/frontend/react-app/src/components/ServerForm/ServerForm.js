import React, { useState } from 'react';
import { createServer } from '../../store/server'
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import '../button.css';
// import '../input.css';
// import exMark from '../Errors/exMark.png'
// import '../Errors/Errors.css';

function ServerForm({ setShowModal }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [serverName, setServerName] = useState('');
    const [errors, setErrors] = useState([]);

    // if (user) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(createServer({ serverName }))
            .then(() => setShowModal(false))
            .catch(async (res) => {
                const data = await res.json();
                if (data) setErrors(Object.values(data));
                else return (<Redirect to="/servers" />);
            });
    }

    // const handleCancel = () => {

    // }

    return (
        <form onSubmit={handleSubmit}>
            {errors[0] ? (<ul className='errors'>
                <li>{errors[0]}</li>
            </ul>) : ''}
            <div className='container'>
                <div>
                    <label>
                        <input
                            className="input top"
                            placeholder={`${user.userName}'s server`}
                            type="text"
                            value={serverName}
                            onChange={(e) => setServerName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                {/* <div className='signupLogInButtonDiv'>
                    <button className='submitForm' type="button" onClick={handleCancel()}>
                        Back
                    </button>
                </div> */}
                <div className='signupLogInButtonDiv'>
                    <button className='submitForm' type="submit">
                        Create
                    </button>
                </div>
            </div>
        </form >
    );
}

export default ServerForm;
