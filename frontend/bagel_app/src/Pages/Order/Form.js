import styles from './Form.module.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';





function Form({ handleFormButtonSubmit, props } ) {
    // console.log("from form, porps", props);
    // console.log(props);

    const [name, setName] = useState(props._name || '');
    const [email, setEmail] = useState(props._email || '');
    const [numPlain, setNumPlain] = useState(props._numPlain || 0);
    const [numSeseme, setNumSeseme] = useState(props._numSeseme || 0);
    const [numEv, setNumEv] = useState(props._numEv || 0);
    // eslint-disable-next-line
    const [numPoppy, setNumPoppy] = useState(props._numPoppy || 0);
    const [numCinSug, setNumCinSug] = useState(props._numCinSug || 0);

    const [numCreamBagels, setNumCreamBagels] = useState(props._numCreamBagels || 0); // set this

    const [numBagels, setNumBagels] = useState(props._numBagels || 0);
    const [showError, setShowError] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")
    let [cost, setCost] = useState(0)
    const navigate = useNavigate()


    const blue = '#5da2da' // blue
    // const darkpink = '#c96567' // blue
    // const pink = '#f78888'
    const grey = '#96ACB7'
    const green = '#87C38F'
    const [buttonColor, setButtonColor] = useState(grey)


    let buttonStyle = {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: blue,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        alignSelf: 'center',
    }

    let proceedButtonStyle = {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: buttonColor,
        // backgroundColor: validButtonColor ? green : pink,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        alignSelf: 'center',
    }
    
    // runs whenever any bagel amount is updated
    useEffect(() =>  {



        let parsedNumPlain = parseInt(numPlain);
        let parsedNumSeseme = parseInt(numSeseme);
        let parsedNumEv = parseInt(numEv);
        let parsedNumPoppy = parseInt(numPoppy);
        let parsedNumCinSug = parseInt(numCinSug);
        let parsedCreamBagels = parseInt(numCreamBagels)

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

        if (isNaN(parsedCreamBagels))
            parsedCreamBagels = 0;

        const numBagels = parsedNumPlain + parsedNumSeseme + parsedNumEv + parsedNumPoppy + parsedNumCinSug + parsedCreamBagels;
        setNumBagels(numBagels);

        let numBagelsWithoutCCBagels = numBagels - parsedCreamBagels


        let groupsOfThree = Math.floor(numBagelsWithoutCCBagels / 3);
        let remainder = numBagelsWithoutCCBagels % 3;

        let tempCost = (groupsOfThree * 5) + (remainder * 2) + (parsedCreamBagels * 3);

        if (isNaN(tempCost)) {
            setNumBagels(0)
        }
        setCost(tempCost);




    }, [numPlain, numSeseme, numEv, numPoppy, numCinSug, numCreamBagels ]) 

    useEffect( () => {

        if ((name && email && cost)) {
            setButtonColor(green);
        }
        else{
            setButtonColor(grey);


        }
    }, [name,email,cost])


    


    const handleButtonSubmit = (event) => {
        event.preventDefault();

        if ( !(name && email && cost ) ){
            setShowError(true)
            
            if (!name && email && cost)
                setErrorMessage("name")
            else if (!name && !email && cost)
                setErrorMessage("name and email")
            else if (!name && !email && !cost)
                setErrorMessage("name, email, and desired amount")
            else if (name && !email && cost)
                setErrorMessage("email")
            else if (name && !email && !cost)
                setErrorMessage("email and desired amount")
            else if (name && email && !cost)
                setErrorMessage("desired amount")
            else if ( !name && email && !cost)
                setErrorMessage("name and desired amount")
        }

        else{
            handleFormButtonSubmit(cost, name, email, numPlain, numSeseme, numEv, numPoppy, numCinSug, numCreamBagels, numBagels);
            

        }




        // navigate('/payment');
    }



    const handleNameChange = (event) => {
        event.preventDefault();
        setName(event.target.value)
        // console.log(name);
        
    }

    
    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value)

    }
    const handleGoBackButtonClick = () => {
        // navigate('/disclaimer')

        navigate('/', {
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
        })
    }




    

    return (

        <div className={styles.orderPage}>
        
            <div className={styles.formcontainer} >
                <form method="post" className={styles.actualForm}>
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

                    <div >
                        <label>Total: {numBagels} bagel's for ${cost}</label>
                        <p>Bagels: 1 for $2 | 3 for $5 </p>
                        
                        <ul className={styles.bagelList}> 



                        <div className={styles.divItems}>
                            <label>Plain</label>
                            <li>
                                <input
                                className={styles.inputNumberBox}
                                type='number'
                                min={0}
                                value={numPlain}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setNumPlain(event.target.value)
                                }}
                                />
                            </li>
                        </div>
                            <div className={styles.divItems}>
                                <label>Sesame</label>
                                <li>
                                    <input
                                        className={styles.inputNumberBox}
                                        type='number'
                                        min={0}
                                        value={numSeseme}
                                        onChange={(event) => {
                                            event.preventDefault();
                                            setNumSeseme(event.target.value)
                                        }}
                                    />
                                </li>
                            </div>

                            <div className={styles.divItems}>
                                <label>Everything</label>
                                <li>
                                    <input
                                        className={styles.inputNumberBox}
                                        type='number'
                                        min={0}
                                        value={numEv}
                                        onChange={(event) => {
                                            event.preventDefault();
                                            setNumEv(event.target.value)
                                        }}
                                    />
                                </li>
                            </div>

                            {/* <div className={styles.divItems}>
                                <label>Poppy Seed</label>
                                <li>
                                    <input
                                        className={styles.inputNumberBox}
                                        type='number'
                                        min={0}
                                        value={numPoppy}
                                        onChange={(event) => {
                                            event.preventDefault();
                                            setNumPoppy(event.target.value) // !(name && email && cost)
                                        }}
                                    />
                                </li>
                            </div> */}
                            <div className={styles.divItems}>
                                <label>Cinnamon Sugar</label>
                                    <li>
                                        <input
                                            className={styles.inputNumberBox}
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
                            </div>
                            <div className={styles.divItems}>
                                <label>Cream Cheese Bagel $3</label>
                                <li>
                                    <input
                                        className={styles.inputNumberBox}
                                        type='number'
                                        min={0}
                                        placeholder=""
                                        value={numCreamBagels}
                                        onChange={(event) => {
                                            event.preventDefault();
                                            setNumCreamBagels(event.target.value)
                                        }}
                                    />
                                </li>
                            </div>





                        </ul>
                        {/* <br /> */}
                        {/* <br /> */}
                        { showError && (
                            <>
                                <p style={{ textAlign: 'center', fontWeight:'bold' }}>Please enter your</p>
                                <p style={{ textAlign: 'center', paddingBottom: '5%', fontWeight: 'bold' }}>{errorMessage}</p>
                                {/* {color: 'red'} */}
                            </>
                        )}

                        <div className={styles.buttonContainer}>
                            <button style={proceedButtonStyle} id="button" type="submit" value="Submit" onClick={handleButtonSubmit}>Proceed to Checkout</button> 
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
            <p className={styles.disclaimer}>DISCLAIMER: Bagels were baked in a <strong> <i>meat</i></strong> oven <br/> parve oven coming soon</p>
        </div>

         

    );  



}

export default Form;