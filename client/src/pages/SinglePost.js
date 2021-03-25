import gql from "graphql-tag";
import React, { useContext } from "react";
import { useQuery } from "apollo-server";
import moment from "moment";

import { AuthContext } from "../app/auth";
import LikeComponent from "../components/LikeComponent";
//import DeleteComponent from "../components/DeleteComponent";
const SinglePost = (props) => {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;

  const {
    data: { getPost },
  } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  function deletePostCallback() {
    props.history.push("/");
  }
  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;
    postMarkup = (
      <div>
        <h1>{username}</h1>
        <h4>{moment(createdAt).fromNow()}</h4>
        <p>{body}</p>
        <LikeComponent user={user} post={{ id, likeCount, likes }} />
        {/* {user && user.username === username && (
          <DeleteComponent postId={id} callback={deletePostCallback} />
        )} */}
        <span>{commentCount}</span>
      </div>
    );
  }

  return postMarkup;
};

export default SinglePost;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
