import React, { useState } from 'react';

import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom';
// import { isMobile } from 'react-device-detect';


import './Payment.css'

function Payment(props){
    // console.log(props.prop.clientSecret);
    // console.log(props )
    // const location = useLocation()
    const { cost, name, email, numPlain, numSeseme, numEv, numPoppy, numCinSug, numBagels } = props.state;
    // console.log("cost: ", cost);
    // console.log("name: ", name);
    // console.log("email: ", email);
    // console.log("numPlain: ", numPlain);
    // console.log("numSeseme: ", numSeseme);
    // console.log("numEv: ", numEv);
    // console.log("numPoppy: ", numPoppy);
    // console.log("numCinSug: ", numCinSug);
    // console.log("numBagels: ", numBagels);




    const elements = useElements();
    const stripe = useStripe();
    const navigate = useNavigate()

    const clientSecret = props.prop.clientSecret
    // console.log(clientSecret);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentID, setPaymentID] = useState(null);

    const backendAddress = 'https://bagel-app-11c1ad484767.herokuapp.com'


    const blue = '#5da2da' // blue
    const green = '#87C38F'



    const buttonStyle = {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: blue,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        alignSelf: 'center',
    }

    const ProceedButtonStyle = {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: green,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        alignSelf: 'center',
    }
    // console.log(props.prop.clientSecret); // 

    const handleGoBackButtonClick = () => {

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
            })
        
    }

    const submitOrder = (event) => {
        event.preventDefault();


        // let address = "http://127.0.0.1:5001"

        // if (isMobile) {
        //     address = "http://10.0.0.153:5001" // the nextwork one, for testing use 
        //     console.log("on mobile");
        //     console.log(address);
        // }


        fetch(`${backendAddress}/order/`, {
            method: "post",
            // mode: 'no-cors',
            headers: { "Content-Type": "application/json; charset=UTF-8" }, //"Content-Type: application/json"
            body: JSON.stringify({
                'name': name,
                'email': email,
                'num_bagels': numBagels,
                'num_plain': numPlain,
                "num_seseme": numSeseme,
                "num_everything": numEv,
                "num_poppy_seed": numPoppy,
                "num_cin_sugar": numCinSug,
                "total_cost" : cost,
                "payment_id": paymentID,
            })
        })
            // fetch resolves to
            .then((response) => {
                console.log(response)
                return response.json();
            })
            // needed because above then returns
            .then((result) => {
                console.log(result);
            })
            .catch(() => {
                console.log("Error posting new order");
            });


    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            // console.log("pay intent",paymentIntent);
            setPaymentID(paymentIntent.id )
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong...");
                    break;
            }

            // console.log(paymentIntent);
        });


        submitOrder(event);





        
        elements.submit()


        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        // const paymentElement = elements.getElement('payment');
        // console.log("payment element", paymentElement);


        // if im accessing it from mobile

    

        
        const { error } = await stripe.confirmPayment({
            clientSecret,
            elements,
            confirmParams: {
                // return_url: `${address}/success`,
                return_url: `${window.location.origin}/success`,
                receipt_email: email, // add email for reciepyt
            },
        });




        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            console.log(error);
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);




    }

    const paymentElementOptions = {
        layout: "tabs" // accordian or 
    }

    return (
        <div className='outerDiv'>
            <div className='payDiv'>
                <h2 className='title'>Payment</h2>

                <form className='payForm' onSubmit={handleSubmit}>
                   
                    <PaymentElement options={paymentElementOptions}/>
                    
                    <br />

                    <div style={{
                        display: "flex",
                        justifyContent: "center"}}
                        >
                        <button style={ProceedButtonStyle} id="button" type="submit" value="Submit" disabled={isLoading || !stripe || !elements}>Pay ${cost}</button>
                    </div>

                    <br />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <button style={buttonStyle} onClick={handleGoBackButtonClick}>Back</button>
                    </div>
                    {message && <div id="payment-message">{message}</div>}

                    
                </form>
            </div>
        </div>

    );
}

export default Payment;