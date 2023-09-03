import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
import './Success.css'

function Success(){

    // const location = useLocation();


    // const { cost, name, email, numPlain, numSeseme, numEv, numPoppy, numCinSug, numCreamBagels, numBagels } = location.state;

    // console.log(location.state);





    
    return (
        
            <div className="div-container">
                <h2 style={{display: 'flex',justifyContent: 'center',marginTop: "20%",}}>
                    Thank you 🎉
                </h2>
                <p className="pTag">A reciept has been emailed </p>
            </div>

        
    );
}

export default Success;