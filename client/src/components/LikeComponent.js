import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LikeComponent = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true); //already liked
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });
  const likeButton = user ? (
    liked ? (
      <button onClick={likePost}></button> //TODO: color liked
    ) : (
      <button onClick={likePost}></button> //TODO: not liked
    )
  ) : (
    <button as={Link} to="/login"></button> //TODO: not liked, not authorised
  );

  return (
    <>
      {likeButton}
      {likeCount}
    </>
  );
};

export default LikeComponent;

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
