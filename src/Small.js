import React, {useState, useCallback, useEffect} from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './Small.less';
import Select from 'react-select';

const options = [
    {value: 10, label: '10'},
    {value: 20, label: '20'},
    {value: 30, label: '30'},
    {value: 50, label: '50'},
    {value: 100, label: '100'}
]

function Small(props) {
    let {pages, currentPage, itemsPerPage} = props;

    const found = options.find((current) => current.value === itemsPerPage);

    const [pagesNumber, setPages] = useState(found);
    console.log('asasasa');

  
    let pagesShowing = [];
    for (let i = 0; i < pages; ++i) {
        if (i < 3 || i > pages - 4) pagesShowing.push(i);
        else if (Math.abs(i - currentPage) <= 1) pagesShowing.push(i);
    }

   
    const handleChange = (selectedOption) => {
        setPages(selectedOption);
        props.onClicked(selectedOption.value);
    }

    console.log("small", pagesNumber);

    if (pages === 0) return null;

    return (
        <div className="entire-region">
            
        <div className="small">
            <ArrowBackIosIcon  className="arrow" onClick={() => {
                currentPage !== 0 && props.onChangePage(currentPage-1)
            }} /> 
            {pagesShowing.map(page => (<span onClick={()=>{props.onChangePage(page)}} style={{marginLeft: '5px'}} className={`small-page ${page === currentPage ? 'current-page' : ''}`}>{page + 1}</span>))}
            <ArrowForwardIosIcon className="arrow" onClick={() => {
                pages !== 0 && currentPage !== pages-1 && props.onChangePage(currentPage+1)
            }}/>
        </div>
        <div className="select-region">
            <Select  className="select" placeholder="number of pages" classNamePrefix="react-select" options={options} value={pagesNumber} onChange={handleChange}/>
            </div>
        </div>
    )

}
export default Small;
