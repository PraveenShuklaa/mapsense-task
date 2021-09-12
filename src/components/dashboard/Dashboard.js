import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import moment from 'moment';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './dashboard.css';

function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [statsData, setStatsData] = useState([]);
    const userData = JSON.parse(localStorage.userLoginData);
    const { fName, lName, pinCode } = userData;
    const history = useHistory();

    useEffect(() => {
        getData();
    }, [])

    const logOut = () => {
        localStorage.clear();
        history.push('/');
    }

    const handleClose = () => {
        setOpen(false);
    };

    const getData = () => {
        setLoading(true);
        setOpen(true);
        setStatsData([])
        let date = moment().format('DD-MM-yyyy').split('T')[0];
        axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinCode}&date=${date}`)
            .then(res => {
                setStatsData(res.data.sessions);
                setLoading(false);
                setOpen(false);
            })
            .catch((err) => {
                console.log(err);
                NotificationManager.error('Something went wrong!');
                setLoading(false);
                setOpen(false);
            })
    }

    const goBack = () => {
        history.goBack();
        logOut();
    }
    const loadMore = () => getData();

    return (
        <div className='dashboardWrapper'>
            <div className='container-fluid'>
                <div className='row header'>
                    <div className='col-6 userdata'>
                        <h3>{`${fName} ${lName}`}, <span>{pinCode}</span></h3>
                    </div>
                    <div className='col-6 dashmapsenselogo'>
                        <img className='mapSenselogo' src='/Assets/MapsenseLogo.png' alt='dashmapsenselogo' />
                    </div>
                </div>
                <div className='row tabledata'>
                    {
                        loading ?
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={open}
                                onClick={handleClose}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                            :
                            <TableContainer>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Pincode</TableCell>
                                            <TableCell>District Name</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Fee Type</TableCell>
                                            <TableCell>State Name</TableCell>
                                            <TableCell>Vaccine</TableCell>
                                            <TableCell>Age Limit</TableCell>
                                            <TableCell>Slots</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            statsData.length
                                                ?
                                                statsData.map((ele, index) => {
                                                    return (
                                                        <TableRow key={index}>
                                                            <TableCell>{ele.pincode}</TableCell>
                                                            <TableCell>{ele.district_name}</TableCell>
                                                            <TableCell>{ele.name}</TableCell>
                                                            <TableCell>{ele.fee_type}</TableCell>
                                                            <TableCell>{ele.state_name}</TableCell>
                                                            <TableCell>{ele.vaccine}</TableCell>
                                                            <TableCell>{ele.min_age_limit}</TableCell>
                                                            <TableCell>
                                                                {ele.slots.map((item, index) => {
                                                                    let slots = '';
                                                                    index < (ele.slots - 1) ? slots += `${item},` : slots += `${item}`;
                                                                    return (
                                                                        <span key={index}>{slots}<br /></span>
                                                                    )
                                                                })}</TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                                :
                                                <TableRow >
                                                    <TableCell colSpan='8' align='center'>No data found!</TableCell>
                                                </TableRow>
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    }
                </div>
                <div className='row back_loadmore'>
                    <div className='col-12'>
                        <Button variant='contained' onClick={goBack}>Go Back</Button>
                        <Button variant='contained' onClick={loadMore}>Update Data</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
