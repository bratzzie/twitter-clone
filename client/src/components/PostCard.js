import React, { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../app/auth";
import LikeComponent from "./LikeComponent";
//import DeleteComponent from "./DeleteComponent";

const PostCard = ({
  post: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    comments,
  },
}) => {
  const { user } = useContext(AuthContext);

  function commentonPost() {
    //TODO:
  }

  return (
    <div>
      <h1>{username}</h1>
      <Link to={`/posts/${id}`}>
        <h4>{moment(createdAt).fromNow(true)}</h4>
      </Link>
      <p>{body}</p>
      <LikeComponent user={user} post={{ id, likes, likeCount }} />
      <button as={Link} to={`/posts/${id}`}>
        {commentCount}
      </button>
      {/* {user && user.username === username && <DeleteComponent postId={id} />} */}
    </div>
  );
};

export default PostCard;
