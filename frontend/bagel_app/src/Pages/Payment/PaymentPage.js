import React, { useEffect, useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from './Payment';
import { useLocation } from 'react-router-dom';


function PaymentPage() {

    const location = useLocation();
    const { cost, name, email, numPlain, numSeseme, numEv, numPoppy, numCinSug, numBagels } = location.state;

    const state = {
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

    // const [publishableKey, setPublishableKey] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [options, setOptions] = useState({});
    const [stripePromise, setStripePromise] = useState(null);
    // let primaryAddress = "http://127.0.0.1:5001";
    // let backupAddress = "http://10.0.0.153:5001";


    // "http://127.0.0.1:5001/config"
    const backendAddress = process.env.REACT_APP_BACKEND_URL;

    
   

    useEffect(() => {
        const fetchData = async () => {
            try {

                // let address = "http://127.0.0.1:5001"

                // if (isMobile) {
                //     address = "http://10.0.0.153:5001" // the nextwork one, for testing use 
                //     console.log("on mobile");
                //     console.log(address);
                // }


                const configResponse = await fetch(`${backendAddress}/config`);
                const { publishableKey } = await configResponse.json();

                // console.log("publishableKey",publishableKey);

                if (!publishableKey) {
                    console.log("publishable key is null");
                    return;
                }

                // setPublishableKey(publishableKey);

                const paymentIntentResponse = await fetch(`${backendAddress}/create-payment-intent/`, {
                    method: "post",
                    headers: { "Content-Type": "application/json; charset=UTF-8" },
                    body: JSON.stringify({
                        // paymentMethodType: "card",
                        // payment_method: "card",
                        currency: "usd",
                        amount: cost,
                    })
                });
                const { clientSecret } = await paymentIntentResponse.json();

                if (! clientSecret ){
                    console.log("cleint secret came back null:", clientSecret);
                    return;
                }
                setClientSecret(clientSecret);





                const appearance = {
                    theme: 'stripe',
                };
                setOptions({
                    clientSecret,
                    appearance,
                });

                const stripe = await loadStripe(publishableKey);
                setStripePromise(() => Promise.resolve(stripe));
            } catch (error) {
                console.log(error);
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, );

    if (!stripePromise) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={options}>
                    <Payment prop={options} cost={cost} state={state} />

                </Elements>
            )}
        </div>
    );
}

export default PaymentPage;


// disabled={isLoading || !stripe || !elements}