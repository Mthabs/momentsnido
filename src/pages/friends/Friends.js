import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FindFriends from './FindFriends';
import Followers from './Followers';
import Following from './Following';
import FriendRequests from './FriendRequests';

const Friends = () => {
  return (
    <div>
      <Switch>
        <Route path="/friends/find" component={FindFriends} />
        <Route path="/friends/followers" component={Followers} />
        <Route path="/friends/following" component={Following} />
        <Route path="/friends/requests" component={FriendRequests} />
      </Switch>
    </div>
  );
};

export default Friends;