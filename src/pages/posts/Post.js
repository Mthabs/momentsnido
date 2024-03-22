import { Card } from "react-bootstrap"
import styles from "../../styles/Post.module.css";
import { useEffect, useState } from "react";
import { customaxios } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";

// import Card from 'react-bootstrap/Card';

const Post = (props) => {
    const navigate = useHistory()
    const {id, user, content, image, video, created_at } = props
    const [like, setLike] = useState(false)
    const [editForm, setEditForm] = useState(false);
    const [options, setOptions] = useState(false);
    const currentUser = JSON.parse(sessionStorage.getItem("user"))

    useEffect(()=>{
        if(currentUser.id === user.id){
            setOptions(true);
        }
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
                 await customaxios.post("/post/like/"+id+"/")
            }
            else{
                 await customaxios.delete("/post/like/"+id+"/")
            }
        }
        catch(e){
            console.log(e)
        }
     }

     const handleDelete = async () =>{
        const response = await customaxios.delete("/post/"+id+"/")
        if(response.status === 204){
            alert("Post deleted successfully !!")
            navigate.push("/")
            window.location.reload()
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
                        </div>
                        <div className="d-flex justify-content-center">
                            { options&& !editForm && (
                                <MoreDropdown
                                    handleEdit={() => setEditForm(true)}
                                    handleDelete={handleDelete}
                                />
                                )}
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
                    <div className="d-flex justify-content-start">
                        {like && <i className={`fas fa-heart ${styles.Heart}`} onClick={()=>{handleLike(false)}}/>}
                        {!like && <i className="far fa-heart" onClick={()=>{handleLike(true)}}/> }
                        <i className="far fa-comments" onClick={()=>{detailPostView()}} />
                    </div>
                    <div><span><strong style={{color:"purple"}}>{user.full_name}: {' '}</strong>{content}</span></div>
                    <span className="mt-3"><small>{created_at}</small></span>
                </Card.Body>               
            </Card>

    )
}

export default Post;