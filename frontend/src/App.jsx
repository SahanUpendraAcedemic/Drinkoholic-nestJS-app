import Header from "./components/Header";
import Footer from "./components/Footer";
import Routers from "./routers/Routers";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="mx-auto min-h-screen bg-gray-800">
          <Routers />
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
