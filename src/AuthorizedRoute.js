import { Routes, Route } from "react-router-dom";
import LandingPage from "./routes/LandingPage";

const AuthorizedRoute = () => {
  return (
    <main className="main-container">
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
      </Routes>
    </main>
  );
};

export default AuthorizedRoute;
