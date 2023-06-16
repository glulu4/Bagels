import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import './Dropdown.css'


function MyDropdown(){
    const [selectedQty, setSelectedQty] = useState(null);

    const handleSelect = (eventKey) => {
        setSelectedQty(eventKey);
    };

    return (
        <div class="select-wrapper">
            <select name="cars" id="cars">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
            </select>
        </div>

    );
}






export default MyDropdown;
