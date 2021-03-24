import { BrowserRouter as Router, Route } from "react-router-dom";

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

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/bookmarks" component={Bookmarks} />
      <Route exact path="/explore" component={Explore} />
      <Route exact path="/lists" component={Lists} />
      <Route exact path="/messages" component={Messages} />
      <Route exact path="/more" component={More} />
      <Route exact path="/notifications" component={Notifications} />
      <Route exact path="/profile" component={Profile} />
    </Router>
  );
}

export default App;
