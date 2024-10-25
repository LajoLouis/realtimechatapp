import Body from "./components/Body";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { XhatProvider } from "./context/XhatContext";
import { AuthProvider } from "./context/AuthContext";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const { getItem } = useLocalStorage("auth-token");
  const token = getItem();
  let authInitialState = { accessToken: token ?? null };
  return (
    <>
      <div className="bg-slate-300">
        <AuthProvider defaultState={authInitialState}>
        <XhatProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element= {<Body/>}/>
            <Route path="/login" element= {<Login/>}/>
            <Route path="/register" element= {<Register/>}/>
          </Routes>
        </Router>
        </XhatProvider>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
