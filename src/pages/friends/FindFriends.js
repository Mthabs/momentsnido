import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from "../../styles/Avatar.module.css";
import axios from 'axios';


const FindFriends = () => {
  const [data, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/friends/search/', {
          params: { query: searchQuery },
        });

        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    if(searchQuery !== ''){
      fetchUsers();
    }
  }, [searchQuery]);



  return (
    <div>
      <h2>Find Friends</h2>
      <input
        type="text"
        placeholder="Search for friends"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
       <ListGroup variant="flush">
        { data.map((user)=>{
          return(
            <ListGroup.Item>
              <div className='d-flex'>
                {!user.profile_picture && <img src='https://res.cloudinary.com/dnt7oro5y/image/upload/v1/default_profile_qdjgyp'  className={styles.Avatar}  alt="Profile Picture" style={{ width: '50px', height: '50px', marginRight: '10px' }}  /> }
                {user.profile_picture && <img src={user.profile_picture} alt="Profile Picture" className={styles.Avatar} style={{ width: '50px', height: '50px', marginRight: '10px' }} /> }
                <a href={'/profile/' + user.id} ><span className='mt-2'>{user.full_name}</span></a>
              </div>
            </ListGroup.Item>
          )
        })}
    </ListGroup>
    </div>
  );
};

export default FindFriends;
