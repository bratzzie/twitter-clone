import React from "react";
import gql from "graphql-tag";
import { useMutation } from "apollo-server";
import { FETCH_POSTS_QUERY, FETCH_POST_QUERY } from "../utils/postQuery";

const DeleteComponent = ({ postId, commentId, callback }) => {
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deleteComponent] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      }

      if (callback) callback();
    }, //TODO:
    variables: {
      postId,
      commentId,
    },
  });
  return <button onClick={() => deleteComponent}>Delete</button>;
};
//TODO:confirm post deletion

export default DeleteComponent;

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
