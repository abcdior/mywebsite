import { Routes, Route } from "react-router-dom";
import PhoneSignIn from "./pages/PhoneSignIn";
import VerifyCode from "./pages/VerifyCode";
import CodeLogs from "./pages/CodeLogs"; // New Page

function App() {
  return (
    <Routes>
      <Route path="/" element={<PhoneSignIn />} />
      <Route path="/verify" element={<VerifyCode />} />
      <Route path="/logs" element={<CodeLogs />} />
    </Routes>
  );
}

export default App;