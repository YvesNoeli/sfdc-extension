import React from 'react';
import ErrorComp from '../components/ErrorComp/ErrorComp';
import Dashboard from './Dashboard';

const Error = () => {
  return (
    <>
      <Dashboard UpName="404 Not found" ProperName="This page doesn't exist" />
      <br />
      <br />
      <ErrorComp message="You are lost in the navigation" />
    </>
  )
}

export default Error