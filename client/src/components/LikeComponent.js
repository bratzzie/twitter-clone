import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//styles
import { Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";
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
      <Button
        type="link"
        as="button"
        onClick={likePost}
        shape="circle"
        icon={<HeartOutlined style={{ color: "gray" }} />}
      />
    ) : (
      //TODO: color liked
      <Button
        type="link"
        as="button"
        onClick={likePost}
        shape="circle"
        icon={<HeartOutlined style={{ color: "gray" }} />}
      /> //TODO: not liked
    )
  ) : (
    <Button
      type="link"
      as={Link}
      to="/login"
      onClick={likePost}
      shape="circle"
      icon={<HeartOutlined style={{ color: "gray" }} />}
    /> //TODO: not liked, not authorised
  );

  return (
    <div>
      {likeButton}
      {likeCount}
    </div>
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
