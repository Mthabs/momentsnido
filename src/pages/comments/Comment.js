import React, { useState } from "react";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";

import styles from "../../styles/Comment.module.css";


const Comment = (props) => {
  const {id} = props
  const user = JSON.parse(sessionStorage.getItem("user"))

  const [showEditForm, setShowEditForm] = useState(false);
  const handleDelete = async () => {
   
  };

  return (
    <div style={{backgroundColor:"white"}}>
      <hr />
      <div className="d-flex">
        <a href={`/profile/${user.id}`}>
          <Avatar src={user.profile_picture} />
        </a>
        <div >
          <span className={styles.Owner}>{user.full_name}</span>
        </div>
        { !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </div>
      <div className="mx-5 px-5">
        <p>Hello There</p>
      </div>
      <hr />
    </div>
  );
};

export default Comment;