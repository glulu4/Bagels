import styles from './Form.module.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyDropdown from './Dropdown.js';





function Form({ handleFormButtonSubmit, props } ) {
    console.log("from form, porps", props);
    console.log(props);

    const [name, setName] = useState(props._name || '');
    const [email, setEmail] = useState(props._email || '');
    const [numPlain, setNumPlain] = useState(props._numPlain || 0);
    const [numSeseme, setNumSeseme] = useState(props._numSeseme || 0);
    const [numEv, setNumEv] = useState(props._numEv || 0);
    const [numPoppy, setNumPoppy] = useState(props._numPoppy || 0);
    const [numCinSug, setNumCinSug] = useState(props._numCinSug || 0);
    const [numBagels, setNumBagels] = useState(props._numBagels || 0);
    const [showError, setShowError] = useState(false)
    let [cost, setCost] = useState(0)
    const navigate = useNavigate()


    const buttonStyle = {
        fontSize: 15,
        fontWeight: 'bold'
    }
    
    // runs whenever any bagel amount is updated
    useEffect(() =>  {


        // if (isNaN(parseInt(numPlain)))
        //     setNumPlain(0)
        
        // if (isNaN(parseInt(numSeseme)))
        //     setNumPlain(0)
        
        // if (isNaN(parseInt(numEv)))
        //     setNumPlain(0)

        // if (isNaN(parseInt(numPoppy)))
        //     setNumPlain(0)

        // if (isNaN(parseInt(numCinSug)))
        //     setNumPlain(0)
            
        // const numBagels = parseInt(numPlain) + parseInt(numSeseme) + parseInt(numEv) + parseInt(numPoppy) + parseInt(numCinSug);
        // setNumBagels(numBagels)

        let parsedNumPlain = parseInt(numPlain);
        let parsedNumSeseme = parseInt(numSeseme);
        let parsedNumEv = parseInt(numEv);
        let parsedNumPoppy = parseInt(numPoppy);
        let parsedNumCinSug = parseInt(numCinSug);

        if (isNaN(parsedNumPlain))
            parsedNumPlain = 0;

        if (isNaN(parsedNumSeseme))
            parsedNumSeseme = 0;

        if (isNaN(parsedNumEv))
            parsedNumEv = 0;

        if (isNaN(parsedNumPoppy))
            parsedNumPoppy = 0;

        if (isNaN(parsedNumCinSug))
            parsedNumCinSug = 0;

        const numBagels = parsedNumPlain + parsedNumSeseme + parsedNumEv + parsedNumPoppy + parsedNumCinSug;
        setNumBagels(numBagels);


        let groupsOfThree = Math.floor(numBagels / 3);
        let remainder = numBagels % 3;

        cost = (groupsOfThree * 5) + (remainder * 2);
        if (isNaN(cost)) {
            setNumBagels(0)
        }
        setCost(cost);




    }, [numPlain, numSeseme, numEv, numPoppy, numCinSug ]) 


    


    const handleButtonSubmit = (event) => {
        event.preventDefault();

        if ( !(name && email && cost ) ){
            setShowError(true)
        }

        else{
            handleFormButtonSubmit(cost, name, email, numPlain, numSeseme, numEv, numPoppy, numCinSug, numBagels);

        }



        // navigate('/payment');
    }



    const handleNameChange = (event) => {
        event.preventDefault();
        setName(event.target.value)
        console.log(name);
        
    }

    
    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value)

    }
    const handleGoBackButtonClick = () => {
        // navigate('/disclaimer')

        navigate('/disclaimer', {
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
        })
    }




    

    return (
        <div className={styles.orderPage}>
        
            <div className={styles.formcontainer} >
                <form method="post">
                    <br />
                    <div>
                        <label htmlFor=''>Name</label>
                        <br />
                        <input
                            required
                            id="name"
                            placeholder='  Enter Name'
                            type='text'
                            value={name}
                            onChange={handleNameChange}
                            className={styles.inputBox}
                            
                        />
                    </div>
                    <br />

                    <div>
                        <label>Email</label>
                        <br />
                        <input
                            placeholder='  Enter Email'
                            id="email"
                            value={email}
                            type='text'
                            onChange={handleEmailChange}
                            className={styles.inputBox}
                            required
                        />
                    </div>
                    <br />

                    <div>
                        <label>Total: {numBagels} bagel's for ${cost}</label>
                        <p>Bagels: 3 for $5 | 12 for $20 </p>
                        
                        <ul className={styles.bagelList}> 


                            <li>                         
                                Plain <input 
                                    type='number' 
                                    min={0} 
                                    value={numPlain}
                                    onChange={(event) => {
                                        event.preventDefault();
                                        setNumPlain(event.target.value)
                                    }}
                                />
                            </li>

                            <li>
                                Seseme <input
                                    type='number'
                                    min={0}
                                    value={numSeseme}
                                    onChange={(event) => {
                                        event.preventDefault();
                                        setNumSeseme(event.target.value)
                                    }}
                                />
                            </li>
                            <li>
                                Everything <input
                                    type='number'
                                    min={0}
                                    value={numEv}
                                    onChange={(event) => {
                                        event.preventDefault();
                                        setNumEv(event.target.value)
                                    }}
                                />
                            </li>

                            <li>
                                Poppy Seed <input
                                    type='number'
                                    min={0}
                                    value={numPoppy}
                                    onChange={(event) => {
                                        event.preventDefault();
                                        setNumPoppy(event.target.value) // !(name && email && cost)
                                    }}
                                />
                            </li>
                            <li>
                                Cinnamon Sugar <input
                                    type='number'
                                    min={0}
                                    placeholder=""
                                    value={numCinSug}
                                    onChange={(event) => {
                                        event.preventDefault();
                                        setNumCinSug(event.target.value)
                                    }}
                                />
                            </li>
                        </ul>
                        {/* <br /> */}
                        {/* <br /> */}
                        { showError && (
                            <>
                                <p style={{ textAlign: 'center', fontWeight:'bold' }}>Please enter your</p>
                                <p style={{ textAlign: 'center', paddingBottom: '5%', fontWeight: 'bold' }}>name, email, and desired amount</p>
                                {/* {color: 'red'} */}
                            </>
                        )}

                        <div className={styles.buttonContainer}>
                            <button style={buttonStyle} id="button" type="submit" value="Submit" onClick={handleButtonSubmit}>Proceed to Checkout</button> 
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop:"4%"
                        }}>
                            <button style={buttonStyle} onClick={handleGoBackButtonClick} >Back</button>
                            
                        </div>

  
                        <br />           
                    </div>
                    


                </form>
            </div>

        </div>

         

    );  



}

export default Form;