import React from 'react';
import { useProfileData } from '../../contexts/ProfileDataContext';

const Followers = () => {
  const { followers_Count } = useProfileData();

  return (
    <div>
      <div>{followers_Count}</div>
      <div>followers</div>
    </div>
  );
};

export default Followers;