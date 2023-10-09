import { Outlet} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {
  return (
    <div className="page">
        <ScrollToTop>
        <Header />
        <main className="container">
            <Outlet />
        </main>
        <Footer />
        <ToastContainer />
        </ScrollToTop>
    </div>
  );
}

export default App;
