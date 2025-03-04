import Header from "./components/Header";
import Footer from "./components/Footer";
import Routers from "./routers/Routers";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="mx-auto min-h-screen bg-gray-800">
          <ToastContainer />
          <Routers />
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
