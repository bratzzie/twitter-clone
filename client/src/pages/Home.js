import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

import PostCard from "../components/PostCard";
import { AuthContext } from "../app/auth";
import AddPost from "../components/AddPost";
import { FETCH_POSTS_QUERY } from "../utils/postQuery";

const Home = () => {
  const { user } = useContext(AuthContext);

  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <div>
      {user && <AddPost />}
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
