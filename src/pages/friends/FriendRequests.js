import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get('/friend-requests/');
      setFriendRequests(response.data);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      await axios.post(`/friend-requests/${requestId}/accept/`);
      fetchFriendRequests();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await axios.delete(`/friend-requests/${requestId}/`);
      fetchFriendRequests();
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      <ul>
        {friendRequests.map((request) => (
          <li key={request.id}>
            {request.friend_name} wants to be your friend
            <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
            <button onClick={() => handleRejectRequest(request.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRequests;
