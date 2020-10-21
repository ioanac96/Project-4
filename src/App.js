import React, {useState} from 'react';
import './App.css';
import Small from './Small.js';


function App() {

  const [searchValue, setSearch] = useState('');
  const [images, setImages]= useState([]);
  const [numberPages, setPages] = useState(1);
  const [itemsPerPage, setWanted] = useState(50);

  const makeRequest = () => {
    const request = new Request(`http://localhost:3001/v4/icons/search?query=${searchValue}&count=${itemsPerPage}`, 
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
          image: current.raster_sizes[min].formats[0].preview_url
        }
      });
      setImages(iconsArray);

      setPages(Math.ceil(data.total_count/itemsPerPage));
    });
  }

  const takePage = (page) => {
    return () => {
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
            image: current.raster_sizes[min].formats[0].preview_url
          }
        });
        setImages(iconsArray);
      });
    }
  }



  const changeSearchValue = (event) => {
    setSearch(event.target.value);
  }


  const rowOfPages = () => {
    let array = [];
    for(let i = 1; i <= numberPages; i++) {
       array.push(<div className='small-page' onClick={takePage(i)}>{i}</div>);
    }
    return array;
  }

  const createPagesArray = (number) => {
    let pagesArray = [];
    for(let i = 1; i <= number; i++) {
      pagesArray.push(i);
      console.log(pagesArray)
    }

    return pagesArray;
  }
 


  return (
    <div>
      <input type='text' onChange={changeSearchValue}/>
      <button onClick={makeRequest}>Search</button>
      <div className="pages">
      {
        rowOfPages()
      }
      </div>
      <div>
      {
        images.map(current => {
          return (<img key={current.image} src={current.image}></img>)
        })
      }

      </div>
      <Small pages={10} currentPage={2} /> 
    </div>
  );
}

export default App;
