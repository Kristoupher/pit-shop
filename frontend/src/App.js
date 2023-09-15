import { Outlet} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="page">
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
        <ToastContainer />
    </div>
  );
}

export default App;
