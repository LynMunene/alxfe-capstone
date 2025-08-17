import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Fixed Mobile Header at Top */}
      <div className="md:hidden bg-[#111315] p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-40">
        <h1 className="text-2xl font-bold">🍹 POS</h1>
        <button 
          onClick={toggleMobileMenu}
          className="text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`bg-[#111315] text-white w-64 min-h-screen p-4 flex-col
        ${isMobileMenuOpen 
          ? 'flex fixed inset-0 z-30 mt-16' // Add mt-16 to account for header height
          : 'hidden md:flex'}`}
      >
        {/* Logo - hidden on mobile */}
        <div className="mb-6 hidden md:block">
          <h1 className="text-2xl font-bold">🍹 POS</h1>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2 mb-80">
          {[
            { path: "/menu", label: "Menu" },
            { path: "/orders", label: "Orders" },
            { path: "/admin", label: "Admin" }
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
              className={`text-left p-2 rounded-md ${
                isActive(item.path)
                  ? "text-white bg-[#1e1e1e]"
                  : "text-[#ababab] hover:text-white hover:bg-[#1e1e1e]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Employee List */}
        <div>
          <p className="mb-4 font-semibold">Employees</p>
          <div className="flex flex-col gap-2">
            {[
              { initial: 'L', name: 'Lyn .G', color: 'purple' },
              { initial: 'M', name: 'Mark .K', color: 'pink' }
            ].map((employee) => (
              <button 
                key={employee.initial}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1e1e1e] transition-colors w-full text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className={`p-0.5 border-2 border-${employee.color}-500 rounded-full hover:border-white transition`}>
                  <div className={`bg-${employee.color}-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold`}>
                    {employee.initial}
                  </div>
                </div>
                <span>{employee.name}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;