import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

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
  function likePost() {
    //TODO:
  }
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
      <button onClick={likePost}>{likeCount}</button>
      <button onClick={commentonPost}>{commentCount}</button>
    </div>
  );
};

export default PostCard;
