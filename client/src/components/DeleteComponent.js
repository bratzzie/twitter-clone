import React from "react";
import gql from "graphql-tag";
import { useMutation } from "apollo-server";
import { FETCH_POSTS_QUERY, FETCH_POST_QUERY } from "../utils/postQuery";

const DeleteComponent = ({ postId, callback }) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = data.getPosts.filter((p) => p.id !== postId);
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      if (callback) callback();
    }, //TODO:
    variables: {
      postId,
    },
  });
  return <button onClick={deletePost}>Delete</button>;
};
//TODO:confirm post deletion

export default DeleteComponent;

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
