import React, { useState } from 'react';

import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

/* 
DISCLAIMER

if you're going to test with a local database, change fetch request! :) 

*/


import './Payment.css'

function Payment(props){
    // console.log(props.prop.clientSecret);
    // console.log(props )
    // const location = useLocation()
    const { cost, name, email, numPlain, numSeseme, numEv, numPoppy, numCinSug, numCreamBagels, numBagels } = props.state;

    const orderState = {
        cost: cost,
        name: name,
        email: email,
        numPlain: numPlain,
        numSeseme: numSeseme,
        numEv: numEv,
        numPoppy: numPoppy,
        numCinSug: numCinSug,
        numCreamBagels: numCreamBagels,
        numBagels: numBagels
    }
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
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(false);
    const [paymentID, setPaymentID] = useState(null);

    const backendAddress = process.env.REACT_APP_BACKEND_URL;

    console.log(backendAddress);




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
                    numCreamBagels: numCreamBagels,
                    numBagels: numBagels
                }
            })
        
    }

    const submitOrder = (event) => {
        event.preventDefault();


        fetch(`${backendAddress}/order/`, {
        // fetch('http://127.0.0.1:5001/order/', {
            method: "post",
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
                "num_cream_bagels": numCreamBagels,
                "total_cost" : cost,
                "payment_id": paymentID,
            })
        })
            // fetch resolves to
            .then((response) => {
                // console.log(response)
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

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);
        

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
                    return;
                default:
                    setMessage("Something went wrong...");
                    return;
            }
        });






        elements.submit();

        



            const {error} = await stripe.confirmPayment({
                clientSecret,
                elements,
                confirmParams: {
                    // return_url: `${address}/success`,
                    // return_url: navigate('/success', {state: orderState} ),
                    // redirect: 'if_required',
                    receipt_email: email, // add email for reciepyt
                },
                redirect: 'if_required'
            });

            // console.log("confirm payment error", error);

            if (!error) {
                console.log("submitting order");
                setMessage("Payment is GOING thru");
                submitOrder(event);
                navigate('/success', { state: orderState })
            }
            else{

                if (error.type === "card_error" || error.type === "validation_error") {
                    setMessage(error.message);
                    return;
                } else {
                    console.log("The error", error);
                    setMessage("An unexpected error occurred.");
                }
                setIsLoading(false);
                return;


            }














            // This point will only be reached if there is an immediate error when
            // confirming the payment. Otherwise, your customer will be redirected to
            // your `return_url`. For some payment methods like iDEAL, your customer will
            // be redirected to an intermediate site first to authorize the payment, then
            // redirected to the `return_url`.


        


        
        
        



    }


    const paymentElementOptions = {
        layout: "tabs", // accordion or 
        business: {
            name: "Sam's Bagels",
            // other properties related to the business
        }, 
        wallets: {
            applePay: 'auto',     // or 'never' to hide
            googlePay: 'auto',     // or 'never' to hide
            cashappPay: "never"
        }
    };

    return (
        <div className='outerDiv'>
            <div className='payDiv'>
                <h2 className='title'>Payment</h2>

                <form className='payForm' onSubmit={handleSubmit}>
                   
                    <PaymentElement options={paymentElementOptions}/>
                    
                    <br />

                    <div style={{display: "flex",justifyContent: "center"}}>
                        <button style={ProceedButtonStyle} id="button" type="submit" value="Submit" >Pay ${cost}</button>
                        {/* {disabled = { isLoading || !stripe || !elements}} */}
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