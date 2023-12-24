import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Followers = ({ currentUser }) => {
  const [followersData, setFollowersData] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowersData = async () => {
      try {
        const response = await axios.get('/friends/');
        const friendsData = response.data.results;

        // Find the authenticated user's data
        const authenticatedUserData = friendsData.find(
          (friend) => friend.owner === currentUser.username
        );

        if (authenticatedUserData) {
          setFollowersCount(authenticatedUserData.followers_count);
          setFollowersData(authenticatedUserData.followers);
        } else {
          console.error('Authenticated user data not found in the API response.');
          setError('Error fetching followers data. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching followers data:', error);
        setError('Error fetching followers data. Please try again later.');
      }
    };

    fetchFollowersData();
  }, [currentUser.username]); 

  return (
    <div>
      <h2>Followers</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!error && (
        <>
          <p>Followers Count: {followersCount}</p>

          <ul>
            {followersData.map((follower) => (
              <li key={follower.id}>{follower.username}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Followers;
