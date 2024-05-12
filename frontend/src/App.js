import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import UserBlog from "./components/Blogs/UserBlog";
import Login from "./components/authenticaltion/Login";
import Signup from "./components/authenticaltion/Signup";
import AuthState from "./context/auth/AuthState";
import BlogState from "./context/blog/BlogState";
import ViewBlog from "./components/Blogs/ViewBlog";
import AddBlog from "./components/Blogs/AddBlog";
import UpdateBlog from "./components/Blogs/UpdateBlog";
import Profile from "./components/User/Profile";
import EditProfile from "./components/User/EditProfile";

// import Toast from "./components/Toast";

function App() {
  return (
    <AuthState>
      <BlogState>
        <BrowserRouter>
          <Navbar />
          {/* <Toast /> */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/userprofile" element={< Profile />} />
            <Route exact path="/editprofile" element={<EditProfile />} />
            <Route exact path="/userblog" element={<UserBlog />} />
            <Route path="/viewblog/:id" element={<ViewBlog />} />
            <Route path="/updateblog/:id" element={<UpdateBlog />} />
            <Route path="/addblog" element={<AddBlog />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </BlogState>
    </AuthState>
  );
}

export default App;
