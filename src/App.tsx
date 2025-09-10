import styles from "./App.module.css";
import Map from "./components/Map";

function App() {
  return (
    <div className={styles.mobileFullscreen}>
      <Map />
    </div>
  );
}

export default App;
