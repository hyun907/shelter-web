import styles from "./App.module.css";
import { Map } from "@/features/map";
import { Modal } from "@/common/components/Modal";
import { BottomSheet } from "@/common/components/BottomSheet";
import { Login } from "@/features/user";
import { SignUp } from "@/features/user";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.mobileFullscreen}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/map" element={<Map />} />
            {/* <Modal />
            <BottomSheet /> */}
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
