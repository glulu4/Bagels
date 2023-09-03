import React from "react";

import styles from "./ConfirmOrder.module.css"
import { useLocation, useNavigate } from 'react-router-dom';




function ConfirmOrder(){
    window.onload = () => {
        window.scrollTo(0, 0);
    }
    const location = useLocation();
    const navigate = useNavigate();
    const { cost, name, email, numPlain, numSeseme, numEv, numPoppy, numCinSug, numCreamBagels, numBagels } = location.state;



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
                numCreamBagels: numCreamBagels,
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
                _numCreamBagels: numCreamBagels,
                _numBagels: numBagels
            }
        });
    }
    const blue = '#5da2da' // blue
    // const darkpink = '#c96567' // blue
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


    return (
        <div className={styles.recieptDiv}>
            <h2 className={styles.title} >Confirm Order</h2>
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

                {/* <tr className="item">
                    <td>Poppy Seed Bagel</td>
                    <td className={styles.quantityCell} >{numPoppy}</td>
                </tr> */}
                

                <tr className="item">
                    <td>Cinnamon Sugar Bagel</td>
                    <td className={styles.quantityCell} >{numCinSug}</td>
                </tr>

                <tr className="item">
                    <td>Cream Cheese Bagel</td>
                    <td className={styles.quantityCell} >{numCreamBagels}</td>
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
                fontSize:"larger",
                paddingBottom:'2%'
            }}>
                <button onClick={handleButtonClick} style={ProceedButtonStyle}>Proceed to Payment</button>
            </div>
            {/* <br></br> */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop:'2%'
            }}>
                <button style={buttonStyle}  onClick={handleGoBackButtonClick} >Back</button>
            </div>
            <br/>

        </div>
    );
};



export default ConfirmOrder;