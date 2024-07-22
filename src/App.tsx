import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { paths } from "@/utils/constants";
import Layout from "@/pages/routes/Layout";
import Home from "@/pages/both/Home";
import Login from "@/pages/outer/Login";
import Register from "@/pages/outer/Register";
import ForgotPassword from "@/pages/outer/ForgotPassword";
import VerifyCode from "@/pages/outer/VerifyCode";
import ResetPassword from "@/pages/outer/ResetPassword";
import Profile from "@/pages/inner/Profile";
import Tasks from "@/pages/inner/Tasks";
import Notes from "@/pages/inner/Notes";
import Contact from "@/pages/inner/Contact";
import Note from "@/pages/inner/Note";
import NotFound from "@/pages/routes/NotFound";
import AuthGaurd from "@/pages/routes/AuthGaurd";
import RememberUser from "@/pages/routes/RemeberUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RememberUser />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />

            {/* Outer Pages */}
            <Route element={<AuthGaurd requireLoggedIn={false} />}>
              <Route path={paths.login} element={<Login />} />
              <Route path={paths.register} element={<Register />} />
              <Route path={paths.forgotPassword} element={<ForgotPassword />} />
              <Route path={paths.verifyCode} element={<VerifyCode />} />
              <Route path={paths.resetPassword} element={<ResetPassword />} />
            </Route>

            {/* Inner Pages */}
            <Route element={<AuthGaurd requireLoggedIn={true} />}>
              <Route path={paths.profile} element={<Profile />} />
              <Route path={paths.tasks} element={<Tasks />} />
              <Route path={paths.notes} element={<Notes />} />
              <Route path={paths.notes + "/:id"} element={<Note />} />
              <Route path={paths.contact} element={<Contact />} />
            </Route>

            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
