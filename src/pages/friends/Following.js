import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const Following = () => {
  const currentUser = useCurrentUser();
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        const response = await axios.get('/friends/', {
          params: { 'owner__following__followed__friend': currentUser.id },
        });

        setFollowingList(response.data.results);
      } catch (error) {
        console.error('Error fetching following list:', error);
      }
    };

    if (currentUser) {
      fetchFollowingList();
    }
  }, [currentUser]);

  return (
    <div>
      <h2>Following</h2>
      <ul>
        {followingList.map((friend) => (
          <li key={friend.id}>{friend.friend_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Following;