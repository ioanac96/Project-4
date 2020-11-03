import React, {useEffect, useState} from 'react';
import './App.less';
import Loader from './Loader.js';
import RequestedItems from './RequestedItems.js';

function App() {

  const [searchValue, setSearch] = useState('');
  const [numberPages, setPages] = useState(0);
  const [itemsPerPage, setWanted] = useState(50);
  const [items, setItems] = useState({});
  const [loader, setLoader] = useState(false);


  const makeRequest = () => {
    const request = new Request(`http://localhost:3001/v4/icons/search?query=${searchValue}&count=${itemsPerPage}`, 
    {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer G3zkEbRdjqJ23BMXDvuN211zaw2CSa0nIKAtqQ8rCvc37lMZVkCouRrW6gaG3Ev3'
      }
    });
    setPages(0);
    setItems({});
    fetch(request).then((response) =>{
      return response.json();
    }).then(data => {
      let iconsArray = data.icons.map((current, index) => {
        let sizeLength = current.raster_sizes.length;
        let min = Math.min(5,sizeLength-1);
        return {
          image: current.raster_sizes[min].formats[0].preview_url,
          id: current.icon_id,
          tags: current.tags
        }
      });
      let newI = {
        0: iconsArray
      };
      setItems(newI);      
      setPages(Math.ceil(data.total_count/itemsPerPage));
      setLoader(false);
    });
    setLoader(true);
  }



  const takePage = (page) => {
  
    const request = new Request(`http://localhost:3001/v4/icons/search?query=${searchValue}&count=${itemsPerPage}&offset=${itemsPerPage*(page-1)}`,
    {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer G3zkEbRdjqJ23BMXDvuN211zaw2CSa0nIKAtqQ8rCvc37lMZVkCouRrW6gaG3Ev3'
      }
    });
    fetch(request).then((response) =>{
      return response.json();
    }).then(data => {
    
      let iconsArray = data.icons.map((current, index) => {
        let sizeLength = current.raster_sizes.length;
        let min = Math.min(5,sizeLength-1);
        return {
          image: current.raster_sizes[min].formats[0].preview_url,
          id: current.icon_id,
          tags: current.tags
        }
      });
      
      let newItems = {
        ...items,
      }
      newItems[page] = iconsArray;
      setItems(newItems);
      setLoader(false);
      
    });
    setLoader(true);


    
  }

  console.log(numberPages);



  const changeSearchValue = (event) => {
    setSearch(event.target.value);
  }

  
  return (
    <div className="search-portion">
      <div className="search-up">
        <input type='text' onChange={changeSearchValue}/>
        <button onClick={makeRequest}>Search</button>
      </div>
      <RequestedItems pages={numberPages} items={items} onPageReq={takePage}/>
      {
        (loader) ? <Loader /> : null
      }
      
    </div>
  );
}

export default App;
