import React, { useEffect, useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { customaxios } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FindFriends from './FindFriends';
import FriendRequests from './FriendRequests'
import styles from "../../styles/Avatar.module.css";


const Friends = () => {
  const navigate = useHistory();
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState([])
  const [activeKey, setActiveKey] = useState("Followers")

  useEffect(()=>{
    let temp = JSON.parse(sessionStorage.getItem("loggedIn"));
    setAuth(temp);
    if(!temp){
      navigate.push("/signin")
      document.location.reload()
    }
    getFollowers();
  }, [])

  const getFollowers = async()=>{
    try{
      const response = await customaxios.get("friends/follower/")
      if(response.status === 200){
        setData(response.data)
      }
    }
    catch(e){
      if(e.code === "ERR_NETWORK"){
        alert("You're not connected to Internet. Please Check your network Connection")
      }
      else{
        alert(e);
      }
    }
  }

  const getFollowing = async()=>{
    try{
      const response = await customaxios.get("friends/following/")
      if(response.status === 200){
        console.log(response.data)
        setData(response.data)
      }
    }
    catch(e){
      if(e.code === "ERR_NETWORK"){
        alert("You're not connected to Internet. Please Check your network Connection")
      }
      else{
        alert(e);
      }
    }
  }

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey)
    if(selectedKey === "Followers"){
      getFollowers();
    }
    else if(selectedKey === "Following"){
      getFollowing();
    }
  };

  return (
    <>
    {auth &&<Container>
      <h2>Friends</h2>

      {/* Navigation Links */}
      <Nav
        variant="tabs"
        activeKey={activeKey}
        onSelect={handleSelect}
        className="mb-3"
      >
        <Nav.Item>
          <Nav.Link  eventKey="Followers">
            Followers
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  eventKey="Following">
            Following
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link disabled>
            Friend Requests
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="findfriends" >
            Find Friends
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <ListGroup variant="flush">
        { data.map((instance)=>{
          const user = instance.user
          return(
            <ListGroup.Item>
              <div className='d-flex'>
                {!user.profile_picture && <img src='https://res.cloudinary.com/dnt7oro5y/image/upload/v1/default_profile_qdjgyp' alt="Profile Picture" className={styles.Avatar} style={{ width: '50px', height: '50px', marginRight: '10px' }}  /> }
                {user.profile_picture && <img src='' alt="Profile Picture" style={{ width: '50px', height: '50px', marginRight: '10px' }} className={styles.Avatar}  /> }
                <a href={'/profile/' + user.id} ><span className='mt-2'>{user.full_name}</span></a>
              </div>
            </ListGroup.Item>
          )
        })}
    </ListGroup>
    {(activeKey=== "follower" || activeKey === "following") && data.length === 0 && <span>No {activeKey} of your Profile</span>}
     {activeKey === "friendrequest" && <FriendRequests />}
     {activeKey === "findfriends" && <FindFriends />}
    </Container>}
    </>
  );
};

export default Friends;
