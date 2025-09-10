import styles from "./App.module.css";
import { Map } from "@/features/map";

function App() {
  return (
    <div className={styles.mobileFullscreen}>
      <Map />
    </div>
  );
}

export default App;
