import { BrowserRouter } from "react-router-dom";
import AppRouter from "@/AppRouter";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-dvh">
        <NavBar></NavBar>
        <div className="flex-grow">
          <AppRouter></AppRouter>
        </div>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
