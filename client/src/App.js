import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import { AuthProvider } from "./app/auth";
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
//import SinglePost from "./pages/SinglePost";
import AuthRoute from "./utils/AuthRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
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
        {/* <Route exact path="/posts/:postId" component={SinglePost} /> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
