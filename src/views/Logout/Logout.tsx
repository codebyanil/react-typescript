import React, { useEffect } from 'react';
import { History } from 'history';
import { logout } from '../../api/auth';
import { getToken } from '../../library/auth';


interface Props {
  history: History;
}

const Logout = ({ history }: Props) => {
  useEffect(() => {
    if (!getToken()) {
      history.push('/login');
    }
    logout().then(() => {
      localStorage.removeItem('X-Auth-Token');
      history.push('/login');
    });
  }, [history]);

  return (
    <div>&nbsp;</div>

  );
};

export default Logout;
