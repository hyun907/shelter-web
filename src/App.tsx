import styles from "./App.module.css";
import { Map } from "@/features/map";
import { Modal } from "@/common/components/Modal";

function App() {
  return (
    <div className={styles.mobileFullscreen}>
      <Map />
      <Modal />
    </div>
  );
}

export default App;
