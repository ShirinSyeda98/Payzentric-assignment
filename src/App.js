import { Outlet } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <main className="main-container">
      <Outlet />
    </main>
  );
};

export default App;
