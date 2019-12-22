import React from 'react';
import MainLayout from '../../layouts/MainLayout';

interface Props {
  [key: string]: any;
}

const Dashboard = () => {
  return (
    <MainLayout>
      <p>This is Dashboard</p>
    </MainLayout>
  );
};

export default Dashboard;
