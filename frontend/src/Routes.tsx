import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Landing from "./pages/landing/landing";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Landing />} />
      <Route path="signin" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  )
);

export default router;
