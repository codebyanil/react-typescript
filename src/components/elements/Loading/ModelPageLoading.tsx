import React from 'react';

interface Props {
  isLoading: boolean
}

const ModalPageLoading = ({ isLoading }: Props) => {
  return (
    <div className="text-center">
      <div
        className={isLoading ? 'spinner-border spinner-border' : 'd-none'}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
export default ModalPageLoading;
