import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './Small.css';

function Small(props) {
    let {pages, currentPage} = props;
    let pagesShowing = [];
    for (let i = 0; i < pages; ++i) {
        if (i < 3 || i > pages - 4) pagesShowing.push(i);
        else if (Math.abs(i - currentPage) <= 1) pagesShowing.push(i);
    }

    // const onChangePage =  (page) => {
    //     console.log("Vreau la pagina:", page);
    // }

    return (
        <div>
            <ArrowBackIosIcon onClick={() => {
                currentPage !== 0 && props.onChangePage(currentPage-1)
            }} /> 
            {pagesShowing.map(page => (<span onClick={()=>{props.onChangePage(page)}} style={{marginLeft: '5px'}} className={`small-page ${page === currentPage ? 'current-page' : ''}`}>{page + 1}</span>))}
            <ArrowForwardIosIcon onClick={() => {
                currentPage !== pages-1 && props.onChangePage(currentPage+1)
            }}/>
        </div>
    )

}
export default Small;
