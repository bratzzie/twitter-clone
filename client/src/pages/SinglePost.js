import gql from "graphql-tag";
import React, { useContext, useRef, useState } from "react";
import { useQuery, useMutation } from "apollo-server";
import moment from "moment";

import { AuthContext } from "../app/auth";
import LikeComponent from "../components/LikeComponent";
//import DeleteComponent from "../components/DeleteComponent";
const SinglePost = (props) => {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);
  const {
    data: { getPost },
  } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
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
        {user && (
          <div>
            <p>Post a comment</p>
            <form>
              <input
                type="text"
                placeholder="Comment..."
                name="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                ref={commentInputRef}
              />
              <button
                type="submit"
                onClick={submitComment}
                disabled={comment.trim() === ""}
              >
                Submit
              </button>
            </form>
          </div>
        )}
        <div>
          {comments.map((comment) => (
            <div key={comment.id}>
              {/* {<DeleteComponent postId={id}
                commentId={comment.id} />} */}
              <h1>{comment.username}</h1>
              <h4>{moment(comment.createdAt).fromNow()}</h4>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
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

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        iid
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;
