import { Carousel, Card } from "react-bootstrap"
import styles from "../../styles/Post.module.css";
import { useEffect, useState } from "react";
import { customaxios } from "../../api/axiosDefaults";
import {Image} from "react-bootstrap";
import appStyles from "../../App.module.css"; 
// import Card from 'react-bootstrap/Card';

const Post = (props) => {
    const {id, user, content, image, video, created_at } = props
    const [like, setLike] = useState(false)

    const initialLike = () => {
        // Create Initial Like api and Integrate here: gets user like this post from api
    }

    const handleLike = (value) => {
        setLike(value)
        // Create api to handle users like and total count
     }
    return(
            <Card >
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-between">
                            <a href={"/profile/"+user.id} >
                                <span className="mx-2"> 
                                    {user.profile_picture && <img src={user.profile_picture} alt="Profile Picture" height={55} width={55} />}
                                    {!user.profile_picture && <img src="https://res.cloudinary.com/dnt7oro5y/image/upload/v1/media/../default_profile_qdjgyp" alt="Profile Picture" height={55} width={55} />}
                                </span>
                                {user.full_name}
                            </a>
                            <span ></span>
                        </div>
                        <div className="d-flex justify-content-center">
                            <span className="mt-3">{created_at}</span>
                        </div>

                    </div>
                </Card.Body>
                {image && <Card.Img src={image} alt="Image Post"/>}
                   {!image && video &&<Card.Body>
                        <video className="d-block w-100" controls>
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                         </video>                       
                    </Card.Body>}
                <Card.Body>
                {content}
                    <div className="d-flex justify-content-start">
                        {like && <i className={`fas fa-heart ${styles.Heart}`} onClick={()=>{handleLike(false)}}/>}
                        {!like && <i className="far fa-heart" onClick={()=>{handleLike(true)}}/> }
                        <i className="far fa-comments" />
                    </div>
                </Card.Body>               
            </Card>

    )
}

export default Post;