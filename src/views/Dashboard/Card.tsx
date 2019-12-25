import React from 'react';

interface Props {
  count:any
}

const Card = ({ count }: Props) => {
  return (
    <div className="row">
      {/* <!--Contacts--!> */}
      <div className="col-md">
        <div className="card border-dark bg-danger py-2 mb-3">
          <div className="card-body text-white">
            <h3 className="text-right">
              <span className="count" />
              {count.contact}
              <small className="d-block">Contact</small>
            </h3>
          </div>
        </div>
      </div>

      {/* <!--Storys--!> */}
      <div className="col-md">
        <div className="card bg-warning border-dark py-2">
          <div className="card-body text-white">
            <h3 className="text-right">
              <span className="count">
                {count.story}
              </span>
              <small className="d-block">Story</small>
            </h3>
          </div>
        </div>
      </div>

      {/* <!--Total--!> */}
      <div className="col-md">
        <div className="card bg-info py-2">
          <div className="card-body border-dark text-white">
            <h3 className="text-right">
              <span className="count">
                {count.total}
              </span>
              <small className="d-block">Total</small>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
