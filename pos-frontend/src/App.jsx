import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-[#111315] text-white">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path ="/orders" element= {<Orders />}/>

            
            {/* Optional: 404 page */}
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;