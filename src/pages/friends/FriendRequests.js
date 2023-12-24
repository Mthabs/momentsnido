import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const FriendRequests = () => {
  const currentUser = useCurrentUser();
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get('/friend-requests/', {
          params: { 'friend__friend': currentUser.id },
        });

        setFriendRequests(response.data.results);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    if (currentUser) {
      fetchFriendRequests();
    }
  }, [currentUser]);

  const handleAcceptRequest = async (requestId) => {
    try {
      await axios.post(`/friend-requests/${requestId}/accept/`);
      // After accepting the request, you might want to update the UI accordingly
      // For simplicity, you can re-fetch the friend requests list
      fetchFriendRequests();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await axios.delete(`/friend-requests/${requestId}/`);
      // After rejecting the request, you might want to update the UI accordingly
      // For simplicity, you can re-fetch the friend requests list
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
            {request.owner.username} wants to be friends
            <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
            <button onClick={() => handleRejectRequest(request.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRequests;
