import { BrowserRouter as Router, Route } from "react-router-dom";
import SinglePost from "./pages/SinglePost";
import AuthRoute from "./utils/AuthRoute";
import { AuthProvider } from "./app/auth";

import "./App.css";
import {
  Home,
  Login,
  Register,
  Bookmarks,
  Explore,
  Lists,
  Messages,
  More,
  Notifications,
  Profile,
} from "./pages/";

import { Layout } from "antd";
import SideBar from "./components/SideBar";

const { Content } = Layout;

function App() {
  return (
    <AuthProvider>
      <Layout style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />

        <Router>
          <Layout className="site-layout" style={{ marginLeft: 400 }}>
            <Content style={{ overflow: "initial" }}>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/register" component={Register} />
              <Route exact path="/bookmarks" component={Bookmarks} />
              <Route exact path="/explore" component={Explore} />
              <Route exact path="/lists" component={Lists} />
              <Route exact path="/messages" component={Messages} />
              <Route exact path="/more" component={More} />
              <Route exact path="/notifications" component={Notifications} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/posts/:postId" component={SinglePost} />
            </Content>
          </Layout>
        </Router>
        <div
          style={{
            display: "flex",
            flex: 0.8,
            backgroundColor: "#fff",
            borderLeft: "1px solid #f0f0f0",
          }}
        ></div>
      </Layout>
    </AuthProvider>
  );
}

export default App;
