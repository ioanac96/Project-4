import React, {useState, useEffect} from 'react';
import Small from './Small.js';
import './RequestedItems.less';

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
        <div className="container">
            
            
            <Small pages={pages} currentPage={currentPage} onChangePage={onChangePage} onClicked={props.onClicked} /> 
            <div className="big-container-for-icons">
            {
                (items[currentPage]!== undefined) ?
                items[currentPage].map((current) => {
                    return (
                        <div className="small-container">
                            <div className="tags">
                                {
                                    current.tags.map((tag, index)=> {
                                        if(index <= 5) return <div className="tag">#{tag}</div>
                                        else return null;   
                                    })
                                }
                            </div>
                            <div className="down-container">
                                <img src={current.image}></img>
                                <div className="id">{current.id}</div>
                            </div>
                        </div>
                    )
                }) : ''
            }
            </div>
        </div>
    );
}

export default RequestedItems;
