import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './Small.less';

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
    if (pages === 0) return null;

    return (
        <div className="small">
            <ArrowBackIosIcon  className="arrow" onClick={() => {
                currentPage !== 0 && props.onChangePage(currentPage-1)
            }} /> 
            {pagesShowing.map(page => (<span onClick={()=>{props.onChangePage(page)}} style={{marginLeft: '5px'}} className={`small-page ${page === currentPage ? 'current-page' : ''}`}>{page + 1}</span>))}
            <ArrowForwardIosIcon className="arrow" onClick={() => {
                pages !== 0 && currentPage !== pages-1 && props.onChangePage(currentPage+1)
            }}/>
        </div>
    )

}
export default Small;
