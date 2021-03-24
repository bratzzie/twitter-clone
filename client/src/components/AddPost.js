import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../utils/hooks";
import { FETCH_POSTS_QUERY } from "../utils/postQuery";

const AddPost = () => {
  const { values, onChange, onSubmit } = useForm(createPostCallBack, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
  });

  function createPostCallBack() {
    createPost();
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="What's happening?"
          name="body"
          onChange={onChange}
          value={values.body}
        />
        <button type="submit"> Submit</button>
      </form>
    </div>
  );
};

export default AddPost;

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
