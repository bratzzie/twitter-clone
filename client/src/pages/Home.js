import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import PostCard from "../components/PostCard";

const Home = () => {
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        posts &&
        posts.map((post) => (
          <div key={post.id}>
            <PostCard post={post} />
          </div>
        ))
      )}
    </div>
  );
};

export default Home;

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
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
