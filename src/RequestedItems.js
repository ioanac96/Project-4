import React, {useState, useEffect} from 'react';
import Small from './Small.js';

function RequestedItems(props) {
    const {pages, items} = props;
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setCurrentPage(0);
    }, [pages])

    const onChangePage = (page) => {
        setCurrentPage(page);
        if(items[page] === undefined) props.onPageReq(page);
    }

    return (
        <div className="big-container-for-icons">
            <Small pages={pages} currentPage={currentPage} onChangePage={onChangePage}  />
            {
                (items[currentPage]!== undefined) ?
                items[currentPage].map((current) => {
                    return (
                        <div className="small-container">
                            <img src={current.image}></img>
                        </div>
                    )
                }) : ''
            }
        </div>
    );
}

export default RequestedItems;
