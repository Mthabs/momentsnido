import Avatar from "../../../components/Avatar"

const Comment = (props) => {
    const {id, profile_picture, full_name, comment} = props
    return (
        <div className="d-flex">
            <div>
                {profile_picture && <Avatar src={profile_picture} text={full_name} /> }
            </div>
            <div>
                <span>{comment}</span>
            </div>
            <hr />
        </div>
    )
}

export default Comment