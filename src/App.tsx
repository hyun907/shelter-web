import styles from "./App.module.css";
import { Map } from "@/features/map";
import { Modal } from "@/common/components/Modal";
import { BottomSheet } from "@/common/components/BottomSheet";

function App() {
  return (
    <div className={styles.mobileFullscreen}>
      <Map />
      <Modal />
      <BottomSheet />
    </div>
  );
}

export default App;
