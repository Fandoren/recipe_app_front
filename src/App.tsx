import { BrowserRouter } from "react-router-dom";
import AppRouter from "@/AppRouter";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <AppRouter></AppRouter>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
