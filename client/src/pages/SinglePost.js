import gql from "graphql-tag";
import React, { useContext, useRef, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";

import { AuthContext } from "../app/auth";
import LikeComponent from "../components/LikeComponent";
import { ArrowLeftOutlined } from "@ant-design/icons";
import AvatarComponent from "../components/AvatarComponent";
import { Row } from "antd";
//import DeleteComponent from "../components/DeleteComponent";
const SinglePost = (props) => {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);
  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
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
      <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            paddingTop: 5,
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <ArrowLeftOutlined
            onClick={deletePostCallback}
            style={{
              fontSize: 17,
              color: "#08c",
              cursor: "pointer",
            }}
          />
          <h1
            style={{
              fontWeight: 800,
              fontSize: 23,
              paddingLeft: 30,
              cursor: "pointer",
            }}
          >
            Tweet
          </h1>
        </div>
        <div style={{ padding: "1em" }}>
          <Row>
            <AvatarComponent username={username} />
            <h1 style={{ paddingLeft: "1em" }}>{username}</h1>
          </Row>
          <p style={{ paddingTop: "1em" }}>{body}</p>
          <h4>{moment(createdAt).fromNow()}</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid #f0f0f0",
              borderBottom: "1px solid #f0f0f0",
              padding: 10,
            }}
          >
            <LikeComponent user={user} post={{ id, likeCount, likes }} />
            {/* {user && user.username === username && (
          <DeleteComponent postId={id} callback={deletePostCallback} />
        )} */}
            <span>{commentCount}</span>
          </div>

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
                <Row style={{ alignItems: "center" }}>
                  <AvatarComponent username={comment.username} />
                  <h1 style={{ paddingLeft: "1em" }}>{comment.username}</h1>
                  <h4
                    style={{
                      paddingLeft: "1em",
                      fontWeight: 400,
                      color: "gray",
                    }}
                  >
                    {moment(comment.createdAt).fromNow()}
                  </h4>
                </Row>

                <p style={{ paddingTop: "1em" }}>{comment.body}</p>
              </div>
            ))}
          </div>
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
