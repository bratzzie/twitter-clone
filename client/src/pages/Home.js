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
    <div style={{ backgroundColor: "#fff" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1
          style={{
            fontWeight: 800,
            fontSize: 23,
            paddingLeft: 15,
            paddingTop: 5,
            cursor: "pointer",
          }}
        >
          Home
        </h1>
        <h1
          style={{
            fontWeight: 800,
            fontSize: 23,
            paddingRight: 15,
            paddingTop: 5,
            cursor: "pointer",
          }}
        >
          ✨
        </h1>
      </div>

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
