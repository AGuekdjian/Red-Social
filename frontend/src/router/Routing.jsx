import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PublicLayout from "../components/layout/public/PublicLayout";
import { Login } from "../components/user/login/Login";
import Register from "../components/user/register/Register";
import PrivateLayout from "../components/layout/private/PrivateLayout";
import Feed from "../components/layout/private/publication/Feed";
import Error404 from "../components/layout/Error404/Error404";
import { AuthProvider } from "../context/AuthProvider";
import { Logout } from "../components/user/Logout";
import { Setting } from "../components/user/Setting";
import People from '../components/layout/private/people/People'
import Following from "../components/follow/Following";
import Followers from "../components/follow/Followers";
import Profile from "../components/user/profile/Profile";

const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/social" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="people" element={<People />} />
            <Route path="settings" element={<Setting />} />
            <Route path="logout" element={<Logout />} />
            <Route path="following/:userId" element={<Following />} />
            <Route path="followers/:userId" element={<Followers />} />
            <Route path="profile/:userId" element={<Profile />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routing;
