import React, { useEffect } from 'react';
import './Pagination.css';
// import Icon from './play.svg';

const Pagination = ({elementPerPage,totalElements,currentPage,paginate,paginateNext,paginatePrev}) => {

  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalElements / elementPerPage); i++ ) {
    pageNumbers.push(i)
  }

  return (
    <div className='Pagination'>
        <ul className='Pagination--ul'>


            {pageNumbers.map(number => (
              <li key={number} id={number} className={ (number == 1) ? `Pagination--ul--liNumber li--active` : `Pagination--ul--liNumber` } 
                  onClick={(e) => {

                    console.log('currentPage ==>',currentPage);

                    let pageBtns = document.querySelectorAll('.Pagination--ul--liNumber');

                    if(e.target.id == number && !e.target.classList.contains('li--active')) {
                      e.target.classList.add('li--active');
                    }

                    console.log('pageBtns ==> ',pageBtns);

                    console.log('target ===> ',e.target);

                    pageBtns.forEach(pageBtn => {
                      
                      if(pageBtn.id != number && pageBtn.classList.contains('li--active')){
                        pageBtn.classList.remove('li--active')
                      }

                    });

                    paginate(number);
                  

                  }}>
                  {number}
              </li>
            ))}

        </ul>
    </div>
  )
}

export default Pagination