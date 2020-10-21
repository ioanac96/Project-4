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

    return (
        <div>
            {pagesShowing.map(page => (<span style={{marginLeft: '5px'}}>{page + 1}</span>))}
        </div>
    )

}
export default Small;
