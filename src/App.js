import AppRouter from "components/utils/AppRouter/AppRouter";
import Footer from "components/utils/Footer/Footer";
import NavBar from "components/utils/NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";

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
