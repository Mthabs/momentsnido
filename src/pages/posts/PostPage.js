import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { customaxios } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Post from "./Post"
import { Row, Col } from 'react-bootstrap';

const PostDetail = () =>{
    const navigate = useHistory()
    const { id } = useParams();
    const [auth, setAuth] = useState(false);
    const [data, setData] = useState(null);

    useEffect(()=>{
        setAuth(JSON.parse(sessionStorage.getItem("loggedIn")));
    },[])

    useEffect(()=>{
        if(auth){
            loaddata()
        }
    },[auth])

    const loaddata = async() =>{
        try {
            const response = await customaxios.get("post/"+id+"/")
            if(response.status === 200){
                setData(response.data)
            }
        }
        catch(e){
            if(e.code === "ERR_NETWORK"){
                alert("You're not connected to Internet. Please Check your network Connection")
              }
              else{
                alert(e.response.status);
              }
        }
        
    }

    return(
        <Row>
            <Col md={3}></Col>
            <Col>
                <Post {...data} />
            </Col>
            <Col md={3}></Col>
            
        </Row>
    )
}

export default PostDetail;