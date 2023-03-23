import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import metadataTab from '../metadataTab';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import Pagination from '../components/Pagination/Pagination';
import Spinner from '../components/Spinner/Spinner';


const Categories = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage, setCategoriesPerPage] = useState(20);
  //const [currentCategories, setCurrentCategories] = useState([]);

  useEffect(() => {


    setLoading(true);

    let content = [];

    metadataTab.map(mtdt => {
      content.push(<CategoryCard key={mtdt.metadata} name={mtdt.metadata} />)
    })

    setLoading(false);

    setCategories(content);


  }, [])

  //Get current categories
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
  //setCurrentCategories(categories.slice(indexOfFirstCategory, indexOfLastCategory));
  //Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const paginatePrev = () => {
    (currentPage > 1) ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  }

  const paginateNext = (lastPage) => {
    (currentPage == lastPage) ? setCurrentPage(1) : setCurrentPage(currentPage + 1);
  }

  return (
    <>

      <Dashboard UpName="Overview" ProperName="Categories" />

      <div className='dashboard--card--group'>
        {
          (loading) ? <Spinner /> : currentCategories
        }
      </div>


      {
        (!loading) ?
          <Pagination
            elementPerPage={categoriesPerPage}
            totalElements={categories.length}
            currentPage={currentPage}
            paginate={paginate}
            paginateNext={paginateNext}
            paginatePrev={paginatePrev}
          /> : ' '
      }
    </>
  )
}

export default Categories;