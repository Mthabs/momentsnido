import { Card } from "react-bootstrap"
import styles from "../../styles/Post.module.css";
import { useEffect, useState } from "react";
import { customaxios } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";

// import Card from 'react-bootstrap/Card';

const Post = (props) => {
    const navigate = useHistory()
    const {id, user, content, image, video, created_at } = props
    const [like, setLike] = useState(false)

    useEffect(()=>{
        initialLike()
    },[id])

    const initialLike = async() => {
        // Create Initial Like api and Integrate here: gets user like this post from api
        try{
            const response = await customaxios.get("/post/like/"+id+"/")
            if(response.status === 200){
                setLike(response.data.like);
            }
        }
        catch(e){
            console.log(e)
        }
        
    }

    const handleLike = async (value) => {
        setLike(value)
        try{
            if(value){
                const response = await customaxios.post("/post/like/"+id+"/")
            }
            else{
                const response = await customaxios.delete("/post/like/"+id+"/")
            }
        }
        catch(e){
            console.log(e)
        }
     }

     const detailPostView = () =>{
        navigate.push("/post/"+id)
        document.location.reload()
     }
    return(
            <Card >
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-between">
                            <a href={"/profile/"+user.id} >
                                <span className="mx-2"> 
                                    {user.profile_picture && <Avatar src={user.profile_picture}  text={user.full_name} />}
                                    {!user.profile_picture && <Avatar src="https://res.cloudinary.com/dnt7oro5y/image/upload/v1/media/../default_profile_qdjgyp" text={user.full_name} />}
                                </span>
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
                        <i className="far fa-comments" onClick={()=>{detailPostView()}} />
                    </div>
                </Card.Body>               
            </Card>

    )
}

export default Post;