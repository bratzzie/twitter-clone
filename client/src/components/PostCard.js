import React, { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../app/auth";
import LikeComponent from "./LikeComponent";
//import DeleteComponent from "./DeleteComponent";

//styles
import { Card, Row, Col, Button } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  CommentOutlined,
  RetweetOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import AvatarComponent from "./AvatarComponent";

const PostCard = ({
  post: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    comments,
  },
}) => {
  const { user } = useContext(AuthContext);

  return (
    <Card>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
            width: "100%",
          }}
        >
          <Col span={1}>
            <AvatarComponent username={username} />
          </Col>
          <Col span={4}>
            <h1 style={{ paddingLeft: "1em" }}>{username}</h1>
          </Col>
          <Col span={3}>
            <Link to={`/posts/${id}`}>
              <h4 style={{ fontWeight: 400, color: "gray" }}>
                {moment(createdAt).fromNow(true)} ago
              </h4>
            </Link>
          </Col>
        </div>

        <Row style={{ justifyContent: "space-between" }}>
          <Col span={4}>
            <EllipsisOutlined />
          </Col>
        </Row>
      </div>

      <p style={{ paddingTop: "1em" }}>{body}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div>
          <Button
            type="link"
            as={Link}
            to={`/posts/${id}`}
            shape="circle"
            icon={<CommentOutlined style={{ color: "gray" }} />}
          />
          {commentCount}
        </div>
        <LikeComponent user={user} post={{ id, likes, likeCount }} />
        <div>
          <Button
            type="link"
            as={Link}
            to={`/posts/${id}`}
            shape="circle"
            icon={<RetweetOutlined style={{ color: "gray" }} />}
          />
          {"3"}
        </div>
        <Button
          type="link"
          as={Link}
          to={`/posts/${id}`}
          shape="circle"
          icon={<VerticalAlignTopOutlined style={{ color: "gray" }} />}
        />
      </div>
      {/* {user && user.username === username && <DeleteComponent postId={id} />} */}
    </Card>
  );
};

export default PostCard;
