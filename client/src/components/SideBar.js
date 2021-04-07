//styles
import { Button, Menu } from "antd";
import {
  HomeOutlined,
  EllipsisOutlined,
  BellOutlined,
  BorderlessTableOutlined,
  MailOutlined,
  UserOutlined,
  ProfileOutlined,
  BookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const SideBar = () => {
  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={["2"]}
      selectable={false}
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 0.5,
        paddingLeft: "9%",
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        overflowX: "hidden",

        width: 400,
      }}
    >
      <Menu.Item
        key="1"
        icon={<TwitterOutlined style={{ fontSize: "28px", color: "#08c" }} />}
      ></Menu.Item>
      <Menu.Item key="2" icon={<HomeOutlined style={{ fontSize: "28px" }} />}>
        <b>Home</b>
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<BorderlessTableOutlined style={{ fontSize: "28px" }} />}
      >
        <b>Explore</b>
      </Menu.Item>
      <Menu.Item key="4" icon={<BellOutlined style={{ fontSize: "28px" }} />}>
        <b>Notifications</b>
      </Menu.Item>
      <Menu.Item key="5" icon={<MailOutlined style={{ fontSize: "28px" }} />}>
        <b>Messages</b>
      </Menu.Item>
      <Menu.Item key="6" icon={<BookOutlined style={{ fontSize: "28px" }} />}>
        <b>Bookmarks</b>
      </Menu.Item>
      <Menu.Item
        key="7"
        icon={<ProfileOutlined style={{ fontSize: "28px" }} />}
      >
        <b>Lists</b>
      </Menu.Item>
      <Menu.Item key="8" icon={<UserOutlined style={{ fontSize: "28px" }} />}>
        <b>Profile</b>
      </Menu.Item>
      <Menu.Item
        key="9"
        icon={<EllipsisOutlined style={{ fontSize: "28px" }} />}
      >
        <b>More</b>
      </Menu.Item>
      <div style={{ padding: "0px 40px" }}>
        <Button
          type="primary"
          shape="round"
          size={"large"}
          style={{ width: "100%" }}
        >
          <b>Tweet</b>
        </Button>
      </div>
    </Menu>
  );
};

export default SideBar;
