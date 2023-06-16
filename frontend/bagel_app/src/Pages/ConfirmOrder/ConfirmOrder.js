import React from "react";

import styles from "./ConfirmOrder.module.css"
import { useLocation, useNavigate } from 'react-router-dom';




function ConfirmOrder(){
    console.log(sessionStorage)
    const location = useLocation();
    const navigate = useNavigate();
    const { cost, name, email, numPlain, numSeseme, numEv, numPoppy, numCinSug, numBagels } = location.state;



    const handleButtonClick = () => {
        navigate('/payment', {
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

    const handleGoBackButtonClick = () => {
        navigate('/order', {
            state: {
                _cost: cost,
                _name: name,
                _email: email,
                _numPlain: numPlain,
                _numSeseme: numSeseme,
                _numEv: numEv,
                _numPoppy: numPoppy,
                _numCinSug: numCinSug,
                _numBagels: numBagels
            }
        });
    }
    const buttonStyle = {
        fontSize: 15,
        fontWeight: 'bold'
    }


    return (
        <div className={styles.recieptDiv}>
            <h3 className={styles.title} >Bagel Order Receipt</h3>
            <table cellPadding="1" cellSpacing="0">
                {/* <tr className="top">
                    <td colSpan="2">
                        <table>
                            <tr>
                                <td className="title">
                                    <h3>Bagel Order Receipt</h3>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr> */}
                
                <tr className="information">
                    <td colSpan="2">
                        {/* <table>
                            <tr> */}
                                <td>
                                    <strong>Name:</strong> {name}
                                    <br />
                                    <strong>Email:</strong> {email}
                                </td>
                            {/* </tr>
                        </table> */}
                    </td>
                </tr>
                <br/>
                       
                <tr className={styles.heading}>
                    <td colSpan="1" >Bagel Type</td>
                    <td className={styles.quantityCell}>Quantity</td>
                    
                </tr>

                <tr className="item">
                    
                    <td>Plain Bagel</td>
                    <td className={styles.quantityCell}>{numPlain}</td>
                   
                </tr>

                <tr className="item">
                    <td>Sesame Bagel</td>
                    <td className={styles.quantityCell} >{numSeseme}</td>
                </tr>

                <tr className="item">
                    <td>Everything Bagel</td>
                    <td className={styles.quantityCell} >{numEv}</td>
                </tr>

                <tr className="item">
                    <td>Poppy Seed Bagel</td>
                    <td className={styles.quantityCell} >{numPoppy}</td>
                </tr>

                <tr className="item">
                    <td>Cinnamon Sugar Bagel</td>
                    <td className={styles.quantityCell} >{numCinSug}</td>
                </tr>
                
                
               
                <tr className="item" id="bagelTotal" >
                    <td> <strong>Bagel Qty: </strong>{numBagels}  </td>
                    {/* <td>{numBagels}</td> */}
                </tr>

                <tr className="total">
                    
                    <td>
                        <strong>Total: </strong>${cost}
                    </td>
                </tr>
            </table>
            <div style = {{
                display: 'flex',
                justifyContent:'center',
                fontSize:"larger"
            }}>
                <button onClick={handleButtonClick} style={buttonStyle}>Proceed to Payment</button>
            </div>
            <br></br>
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <button style={buttonStyle}  onClick={handleGoBackButtonClick} >Back</button>
            </div>
            <br/>

        </div>
    );
};



export default ConfirmOrder;