import React from 'react';

interface Props{
  isLoading: any
}

const PageLoading = ({ isLoading }:Props) => {
  return (
    <div className="text-center">
      <div
        className={isLoading ? 'spinner-border' : 'd-none'}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
export default PageLoading;
