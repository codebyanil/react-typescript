import React, {useEffect, useState} from 'react';
import MainLayout from '../../layouts/MainLayout';
import {RequestData} from '../../types';
import PageLoading from '../../components/elements/Loading';
import {fetchUserMeta} from '../../api/auth';
import ChangePassword from './ChangePassword';
import EditProfile from './EditProfile';

const Profile = () => {
  const [member, setMember] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const profileData = () => {
    setIsLoading(true);
    fetchUserMeta()
      .then((response: RequestData) => {
        setMember(response || {});
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editProfile = () => {
    profileData();
  };

  const password = () => {
    profileData();
  };

  useEffect(() => {
    profileData();
  }, [setMember, setIsLoading]);

  return (
    <div>
      <MainLayout/>
      <div className="wrapper-main-content">
        <div className="container main-content color-gray-light pt-4">
          <section className="section-project-list mt-3">
            <div className="card rounded-0 border-top-color">
              <div className={member ? '' : 'hide-element'}>
                <div className="card-header bg-white border-0">
                  <div className="mt-2 float-left">
                    <h3>Profile Information</h3>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary py-2 px-3 mx-0 float-right"
                    data-toggle="modal"
                    data-target="#editProfileModal"
                  >
                    <span>Edit Profile</span>
                  </button>
                </div>

                <div className="card-body pt-0">
                  <PageLoading isLoading={isLoading}/>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <tbody>
                      <tr>
                        <th
                          scope="row"
                          className="p-2"
                        >
                          {' '}
                          First Name:
                        </th>
                        <td className="p-2">{member.first_name}</td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="p-2"
                        >
                          {' '}
                          Last Name:
                        </th>
                        <td className="p-2">{member.last_name}</td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="p-2"
                        >
                          Email:
                        </th>
                        <td className="p-2">{member.email}</td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="p-2"
                        >
                          Phone:
                        </th>
                        <td className="p-2">{member.phone}</td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="p-2"
                        >
                          Address:
                        </th>
                        <td className="p-2">{member.address}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="card-footer com-card-footer">
                <button
                  type="button"
                  className="btn btn-danger py-2 px-3 mx-0 float-right mr-2"
                  data-toggle="modal"
                  data-target="#changePasswordModal"
                >
                  <span>Change Password</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <EditProfile
        contact={member}
        profile={editProfile}
      />
      <ChangePassword password={password}/>
    </div>
  );
};
export default Profile;
