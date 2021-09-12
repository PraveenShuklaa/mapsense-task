import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router';
import { isLogin } from '../../utility/Utils';
import './login.css';

function Login() {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [pinCode, setPinCode] = useState('');
    const history = useHistory();

    useEffect(() => {
        isLogin() && history.push('/dashboard');
    }, [])

    const login = () => {

        if (fName && lName && pinCode) {
            const validPincode = /^[0-9]{6,6}$/.test(parseInt(pinCode));
            if (validPincode) {
                const data = { fName, lName, pinCode };
                localStorage.setItem('userLoginData', JSON.stringify(data));
                history.push('/dashboard');
            } else {
                NotificationManager.error('Please enter valid pincode!');
            }
        } else {
            NotificationManager.error('Please fill all fields!');
        }
    }

    const resetForm = () => {
        setFName('');
        setLName('');
        setPinCode('');
    }

    return (
        <div className='loginWrapper'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-7 loginBanner' style={{
                        // background: 'url("/vaccinetracker/Assets/CovidBackground.png") 0% 0% / cover' 
                        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("/Assets/CovidBackground.png") 0% 0% / cover'
                    }}>
                        <h2>Vaccine Tracker</h2>
                        <p>Find all the important information and <br />all the things related to Covid Virus <br />and Vaccine Here</p>
                    </div>
                    <div className='col-5 formSection'>
                        <div className='row mapSenselogorow'>
                            <div className='col-12 px-0'>
                                <img className='mapSenselogo' src='/Assets/MapsenseLogo.png' alt='mapSenseLogo' />
                            </div>
                        </div>
                        <div className='formDiv'>
                            <div className="mb-4">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="First Name" value={fName} onChange={e => setFName(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="lastName" placeholder="Last Name" value={lName} onChange={e => setLName(e.target.value)} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="pinCode" className="form-label">Pin Code</label>
                                <input type="text" className="form-control" id="pinCode" placeholder="Pin Code" value={pinCode} onChange={e => setPinCode(e.target.value)} />
                            </div>
                            <div className='mb-4'>
                                <Button variant="contained" className='submitButton form-control' onClick={login}>Show Statistics</Button>
                            </div>
                            <div >
                                <Button variant="contained" className='resetButton form-control' onClick={resetForm}>Reset Form</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
