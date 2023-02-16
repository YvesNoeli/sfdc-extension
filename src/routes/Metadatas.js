import React, { useEffect, useState } from 'react';
import MetadataCard from '../components/MetadataCard/MetadataCard';
import Pagination from '../components/Pagination/Pagination';
import { getData, getUrlParam } from './../store/ManageData';
import Dashboard from './Dashboard';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import DialogBox from '../components/DialogBox/DialogBox';
import ConfirmBox from '../components/ConfirmBox/ConfirmBox';

const Metadatas = () => {

  const { categoryName, categoryOccurencies } = useParams();

  const credentials = getUrlParam();

  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [metadatasPerPage, setMetadatasPerPage] = useState(20);
  const [indexOfLastMetadata, setIndexOfLastMetadata] = useState(20);
  const [indexOfFirstMetadata, setIndexOfFirstMetadata] = useState(0);

  /**
   * confirm box
   */
  const [confirm, setConfirm] = useState({
    message: "",
    isLoading: false,
  })

  const handleConfirmation = (message) => {

    console.log('My error message ===> ',message); 

    setConfirm({
      message: message,
      isLoading: true      
    })

    console.log('Loading ===> ',confirm.isLoading); 

  }

  const closeConfirmation = () => {
    setConfirm({
      message: "",
      isLoading: false,
    })
  }

  /**
   * Dialog Box
   */

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    metadataName: "",
    metadataId: ""
  });

  const abortDelete = () => {
    setDialog({
      message: "",
      isLoading: false,
      metadataName: "",
      metadataId: ""
    });
  }

  const handleDialog = (e) => {
    let Id = e.target.id;
    let Name = e.target.name;
    let trgt  = e.target;
    if(trgt.tagName == 'IMG' || trgt.tagName == 'P'){
      Id = e.target.parentNode.id;
      Name = e.target.parentNode.name;
    }
    console.log(trgt.tagName);
    

    let message = `Are you sure you want to delete ${Name} with Id : ${Id}`;

    console.log("event Id === > " +Id);
    console.log("event Name === > " +Name);
    console.log(message);


    setDialog({
       message : message,
       isLoading : true,
       metadataName : Name,
       metadataId : Id
    })

    console.log(dialog.isLoading);
    

  }

  /**
   * Pagination
   */

  //Change page
  const paginate = pageNumber => {
    let offset = (pageNumber == 1) ? 0 : pageNumber * 20 - 20;

    console.log('OFFSET :: ', offset);
    
    setIndexOfFirstMetadata(offset);

    console.log('first index ==*=>', indexOfFirstMetadata);
    console.log('last index ==*=>', indexOfLastMetadata);


    setCurrentPage(pageNumber);

  };

  const paginatePrev = () => {
    (currentPage > 1) ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  }

  const paginateNext = (lastPage) => {
    (currentPage == lastPage) ? setCurrentPage(1) : setCurrentPage(currentPage + 1);
  }


  /**
   * Page Loading
   */

  useEffect(() => {


    let tab = [];

    setLoading(true);

    getData(credentials.hostname, credentials.sid, categoryName, 20, indexOfFirstMetadata)
      .then(item => {
        item.data.map(elt => {

          tab.push(<MetadataCard handleDialog={handleDialog} name={elt.Name} Id={elt.Id} categoryName={categoryName} />);
          console.log('----> Reload <-----')

        })
        setContent(tab);
        setLoading(false);
      })

  }, [indexOfFirstMetadata]);


  return (
    <>
      <Dashboard UpName="Category" ProperName={categoryName} />

      <div className='dashboard--card--group'>
        {
          (loading) ? <Spinner /> : content
        }

        {dialog.isLoading && <DialogBox handleConfirmation={handleConfirmation} categoryName={categoryName} abort={abortDelete} message={dialog.message} nameMetadata={dialog.metadataName} id={dialog.metadataId} />}
        {confirm.isLoading && <ConfirmBox message={confirm.message} close={closeConfirmation} />}

      </div>

      {

        <Pagination
          elementPerPage={metadatasPerPage}
          totalElements={categoryOccurencies}
          currentPage={currentPage}
          paginate={paginate}
          paginateNext={paginateNext}
          paginatePrev={paginatePrev}
        />
      }

     

    </>
  )
}

export default Metadatas;