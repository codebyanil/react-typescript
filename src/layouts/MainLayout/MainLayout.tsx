import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  [key: string]: any;
}

const Dashboard = ({ children }: Props) => {
  return (
    <div className="main-layout">
      { children }
    </div>
  );
};

export default Dashboard;
