import React, { useEffect } from 'react'
import navigate, { useNavigate, useLocation } from 'react-router-dom';
import './Disclaimer.css'


function Disclaimer() {



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
            <div  className='bigDivStyle'>
                <h2  className='h2Style'>Disclaimer</h2>
                

                <div  className='innerDivStyle'>
                    <p className='messageStyle'>These bagels were baked in a <strong><i>meat</i></strong> oven </p>

                    <p className='messageStyle'>Parve oven coming soon</p>
                    <br/>

                    <p  className='contactStyle'>If you have any questions please contact Rabbi Shmueli Rothstein</p>
                    <p  className='contactStyle'>443-525-4212 | glulu4444@gmail.com</p>

                </div>

                <div  className='buttonDivStyle'>
                    <button className='buttonStyle' onClick={handleClick}>Order</button>
             
                </div>
            </div>
            
        </div>


    );

}

export default Disclaimer;