import React, { useState } from 'react';
import './Searchbar.css';
import metadataTab from '../../metadataTab';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {

  const navigate = useNavigate();
  const[inputValue,setInputValue] = useState('');
  const[optionValue,setOptionValue] = useState('');


  const handlInputChange = (event) => {
    setInputValue(event.target.value);
    console.log('input change === ', inputValue)
  }

  const handleOptionChange = (event) => {
    setOptionValue(event.target.value);
    console.log('option change === ', optionValue)
  }

  const options = () => {

    let content = [];
  
    metadataTab.map(mtdt => {
      if(mtdt.IsSearchable)
        content.push(<option value={mtdt.metadata}>{mtdt.metadata}</option>)
    })
  
    return content;
  
  }
  
  
  const launchSearch = () => {
    
    let searchTerm = (inputValue == '') ? ' ' : inputValue;

    (optionValue == 'all') ?
    navigate(`/SearchResult/${searchTerm}`)
    : navigate(`/SearchResult/${searchTerm}/${optionValue}`);
  }

  return (
    <div class="searchbar-component">
      <div className="searchbar-component--select">
        <select name="categories-dropdown" id="categories-dropdown" className="searchbar-component--dropdown" onChange={handleOptionChange}>
          <option value="all">All</option>
          { options() }
        </select>
      </div>
      <input type="text" className="searchbar-component--input" onChange={handlInputChange} />
      <button className="searchbar-component--btn" onClick={launchSearch}>
        search
      </button>
    </div>
  )
}

export default Searchbar;