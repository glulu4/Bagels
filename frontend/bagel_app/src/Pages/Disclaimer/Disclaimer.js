import React, { useEffect } from 'react'
import navigate, { useNavigate, useLocation } from 'react-router-dom';
import './Disclaimer.css'


function Disclaimer() {
    const h2Style = {
        textAlign: 'center',
        marginTop: '5%',
    }
    const innerDivStyle = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    }
    // const messageStyle = {
    //     textAlign: 'center',
    //     fontSize: 'xx-large',
    //     marginTop: '2%'
    // }
    const contactStyle = {
        textAlign: 'center',
        marginTop: '2%'
    }
    const bigDivStyle = {

        backgroundColor: 'whitesmoke',
        width:"100%",
        borderRadius: 10,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          
    }
    const buttonDivStyle = {
        display: 'flex',
        justifyContent: 'center',
        margin:"5%"
    }
    const buttonStyle = {
        fontSize: 15,
        fontWeight: 'bold'
    }

    const navigate = useNavigate();
    const location = useLocation();






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
            <div style={bigDivStyle} className='bigDivStyle'>
                <h2 style={h2Style} className='h2Style'>Disclaimer</h2>

                <div style={innerDivStyle} className='innerDivStyle'>
                    <p className='messageStyle'>These bagels were baked in a <strong><i>meat</i></strong>  oven</p>
                    <p style={contactStyle} className='contactStyle'>If you have any questions please contact</p>

                </div>

                <div style={buttonDivStyle} className='buttonDivStyle'>
                    <button className='buttonStyle' style={buttonStyle} onClick={handleClick}>Order</button>
             
                </div>
            </div>
            
        </div>


    );

}

export default Disclaimer;