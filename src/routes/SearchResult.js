import React, { useEffect, useState } from 'react';
import MetadataCard from '../components/MetadataCard/MetadataCard';
import Pagination from '../components/Pagination/Pagination';
import { getUrlParam, searchMetaData } from './../store/ManageData';
import Dashboard from './Dashboard';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import ErrorComp from '../components/ErrorComp/ErrorComp';
import NoResult from '../components/NoResult/NoResult';

const SearchResult = () => {

  const { searchValue, searchType } = useParams();

  const credentials = getUrlParam();

  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [metadatasPerPage, setMetadatasPerPage] = useState(20);
  const [indexOfLastMetadata, setIndexOfLastMetadata] = useState(20);
  const [indexOfFirstMetadata, setIndexOfFirstMetadata] = useState(0);

  //Change page
  const paginate = pageNumber => {
    let offset = (pageNumber == 1) ? 0 : pageNumber * 20 - 20;

    console.log('OFFSET :: ', offset);

    setIndexOfFirstMetadata(offset);

    setCurrentPage(pageNumber);

  };


  useEffect(() => {

    let tab = [];

    setLoading(true);

    searchMetaData(credentials.hostname, credentials.sid, searchValue, searchType)
      .then(item => {

        if(item.error){
          tab.push(<ErrorComp message={item.data[0].message} />)
        }else{
            item.data.map(elt => {
            tab.push(<MetadataCard name={elt.Name} Id={elt.Id} categoryName={searchType} type={elt.Type} />);
            console.log('----> search datas <-----', tab);
          })
        }

       (tab.length > 0 ) ? setContent(tab) : setContent(<NoResult />);

        setLoading(false);

      })

  }, [searchValue,searchType]);

  return (
    <>
      <Dashboard UpName="Search" ProperName={searchType+` Metadatas`} />

      <div className='dashboard--card--group'>
        {
          (loading) ? <Spinner /> : content
        }
      </div>
    </>
  )
}

export default SearchResult