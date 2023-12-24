import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const Followers = () => {
  const currentUser = useCurrentUser();
  const [followersList, setFollowersList] = useState([]);

  useEffect(() => {
    const fetchFollowersList = async () => {
      try {
        const response = await axios.get('/friends/', {
          params: { 'owner__followed__owner__friend': currentUser.id },
        });

        setFollowersList(response.data.results);
      } catch (error) {
        console.error('Error fetching followers list:', error);
      }
    };

    if (currentUser) {
      fetchFollowersList();
    }
  }, [currentUser]);

  return (
    <div>
      <h2>Followers</h2>
      <ul>
        {followersList.map((friend) => (
          <li key={friend.id}>{friend.friend_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Followers;
