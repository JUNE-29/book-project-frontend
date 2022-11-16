import { Outlet } from "react-router-dom";
import styles from "./app.module.css";
import Header from "./components/header/header";

function App({ authService }) {
  return (
    <div className={styles.app}>
      <Header authService={authService} />
      <Outlet />
    </div>
  );
}

export default App;
