import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './Disclaimer.css'



function Disclaimer() {

// 5da2da

    const blue = '#5da2da' // blue
    // const darkpink = '#c96567' // blue
    const pink = '#f78888'

    const navigate = useNavigate();
    const location = useLocation();
    const buttonStyle = {
        fontSize: 15,
        fontWeight: 'bold',
        width: '70px',
        color: 'white',
        backgroundColor: blue,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        alignSelf: 'center',
       
    }

    const orderButtonStyle = {
        fontSize: 15,
        fontWeight: 'bold',
        width: '70px',
        color: 'white',
        backgroundColor: pink,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        alignSelf: 'center',

    }

    const handleGoBackButtonClick = () => {
        navigate("/")
    }






    const handleClick = () => {
        if ( location.state ){
            const { _cost, _name, _email, _numPlain, _numSeseme, _numEv, _numPoppy, _numCinSug, _numBagels } = location.state;
            console.log('from disclaimer', location.state);
            navigate('/order', {
                state: {
                    _cost: _cost,
                    _name: _name,
                    _email: _email,
                    _numPlain: _numPlain,
                    _numSeseme: _numSeseme,
                    _numEv: _numEv,
                    _numPoppy: _numPoppy,
                    _numCinSug: _numCinSug,
                    _numBagels: _numBagels
                }
            });
        }
        else{
            navigate('/order')

        }
    }


    return (
        <div style={{

            display: 'flex',
            justifyContent: 'center',
            margin:'10%',
           
            
        }}>
            <div  className='bigDivStyle'>
                <h2 style={{ textAlign: "center"}}className='h2Style'>Disclaimer</h2>
                

                <div  className='innerDivStyle'>
                    <p className='messageStyle'>These bagels were baked in a <strong><i>meat</i></strong> oven </p>

                    <p className='messageStyle'>Parve oven coming soon</p>
                    <br/>

                    <p  className='contactStyle'>If you have any questions please contact Rabbi Shmueli Rothstein</p>
                    <p  className='contactStyle'>443-525-4212 | glulu4444@gmail.com</p>

                </div>

            <div className='button-container'>
                {/* <div className='backButtonDivStyle'> */}
                    <button style={buttonStyle} onClick={handleGoBackButtonClick}>Back</button>
                {/* </div> */}

                {/* <div className='orderButtonStyle'> */}
                    <button style={orderButtonStyle} onClick={handleClick}>Order</button>
                {/* </div> */}


            </div>

            </div>
            
        </div>


    );

}

export default Disclaimer;