import React from 'react';
import Dashboard from './Dashboard';
import MetadataTree from '../components/MetadataTree/MetadataTree';
import { useParams } from 'react-router-dom';

const Tree = () => {

  const { categoryName,metadataName,metadataId } = useParams(); 
  let ids = {"ids": []}

  return (
    <>
      <Dashboard UpName={categoryName} ProperName={metadataName} />
      <MetadataTree Id={metadataId} parentIds={ids}/>
    </>
  )
}

export default Tree;