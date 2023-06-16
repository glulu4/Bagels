import React from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form.js'
import { useLocation } from 'react-router-dom';



function Order() {
    console.log(sessionStorage )
    const navigate = useNavigate();
    const location = useLocation();
    let props = {}
    console.log(location);

    if ( (location.state) ){
        const { _cost, _name, _email, _numPlain, _numSeseme, _numEv, _numPoppy, _numCinSug, _numBagels } = location.state;
        // console.log('_cost:', _cost);
        // console.log('_name:', _name);
        // console.log('_email:', _email);
        // console.log('_numPlain:', _numPlain);
        // console.log('_numSeseme:', _numSeseme);
        // console.log('_numEv:', _numEv);
        // console.log('_numPoppy:', _numPoppy);
        // console.log('_numCinSug:', _numCinSug);
        // console.log('_numBagels:', _numBagels);
        props = { ...location.state } // destructuring syntax
        console.log("poops", props);
    }





    const handleFormButtonSubmit = (cost, name, email, numPlain, numSeseme, numEv, numPoppy, numCinSug, numBagels) => {
        // Pass the variables as part of the state object while navigating to the target route
        navigate('/confirm-order', {
            state: {
                cost: cost,
                name: name,
                email: email,
                numPlain: numPlain,
                numSeseme: numSeseme,
                numEv: numEv,
                numPoppy: numPoppy,
                numCinSug: numCinSug,
                numBagels: numBagels
            }
        });
    };

    return (

        <Form handleFormButtonSubmit={handleFormButtonSubmit} props={props}>       
        </Form>
    );


}

export default Order;