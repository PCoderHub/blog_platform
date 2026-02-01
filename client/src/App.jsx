import { Outlet } from "react-router";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-red-50 md:bg-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
