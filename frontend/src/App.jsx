import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { Provider } from "react-redux";
import store from "./states/store";
import { AppProvider } from "./states/Contet";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Search from "./components/Search/Search";
import ArticleDetail from "./components/ArticleDetail/ArticleDetail";

const App = () => {
  return (
      <Provider store={store}>
        <AppProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/article/:articleId" element={<ArticleDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </Router>
          <ToastContainer position="bottom-right" theme="dark" />
        </AppProvider>
      </Provider>
  );
};

export default App;
