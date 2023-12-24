import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Following = ({ currentUser }) => {
  const [followingData, setFollowingData] = useState([]);
  const [followingCount, setFollowingCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowingData = async () => {
      try {
        const response = await axios.get('/friends/');
        const friendsData = response.data.results;

        // Find the authenticated user's data
        const authenticatedUserData = friendsData.find(
          (friend) => friend.owner === currentUser.username
        );

        if (authenticatedUserData) {
          setFollowingCount(authenticatedUserData.following_count);
          setFollowingData(authenticatedUserData.following);
        } else {
          console.error('Authenticated user data not found in the API response.');
          setError('Error fetching following data. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching following data:', error);
        setError('Error fetching following data. Please try again later.');
      }
    };

    fetchFollowingData();
  }, [currentUser.username]);

  return (
    <div>
      <h2>Following</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!error && (
        <>
          <p>Following Count: {followingCount}</p>

          <ul>
            {followingData.map((followed) => (
              <li key={followed.id}>{followed.username}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Following;
