import React, {useEffect, useState} from 'react';
import './App.less';
import Loader from './Loader.js';
import RequestedItems from './RequestedItems.js';
import {getIcons, request} from './requests.js';

function App() {

  const [searchValue, setSearch] = useState('');
  const [numberPages, setPages] = useState(0);
  const [itemsPerPage, setWanted] = useState(10);
  const [items, setItems] = useState({});
  const [loader, setLoader] = useState(false);


  useEffect(()=>{
    if(searchValue !== '') makeRequest();
  },[itemsPerPage]);

  const makeRequest = () => {
    request(searchValue, itemsPerPage).then(data => {
      let newI = {
        0: getIcons(data)
      };
      setItems(newI);      
      setPages(Math.ceil(data.total_count/itemsPerPage));
      setLoader(false);
    });
    setLoader(true);
  }

  const takePage = (page) => {
    request(searchValue, itemsPerPage, itemsPerPage*(page-1)).then(data => {  
      let newItems = {
        ...items,
      }
      newItems[page] = getIcons(data);
      setItems(newItems);
      setLoader(false);
      
    });
    setLoader(true);    
  }


  const changeSearchValue = (event) => {
    setSearch(event.target.value);
  }

  const onClicked = (value) => {
    setWanted(value);
  }

console.log(itemsPerPage);
  
  return (
    <div className="search-portion">
      <div className="search-up">
        <input type='text' onChange={changeSearchValue}/>
        <button onClick={makeRequest}>Search</button>
      </div>
      <RequestedItems pages={numberPages} items={items} onPageReq={takePage} onClicked={onClicked}/>
      {
        (loader) ? <Loader /> : null
      }
      
    </div>
  );
}

export default App;
