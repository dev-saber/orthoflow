import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Users,
  Calendar,
  Boxes,
  Settings,
  LayoutDashboard,
  CreditCard,
  NotepadText,
} from "lucide-react";
import { toggleSidebar } from "../../data/sidebarSlice";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarVariants = {
    open: { width: "256px" },
    closed: { width: "64px" },
  };

  const contentVariants = {
    open: { opacity: 1, display: "block" },
    closed: { opacity: 0, display: "none" },
  };

  const navLinks = [
    { path: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "appointments", label: "Appointments", icon: Calendar },
    { path: "patients", label: "Patients", icon: Users },
    { path: "stock", label: "Stock", icon: Boxes },
    { path: "bills", label: "Bills", icon: CreditCard },
    { path: "medical-history", label: "Medical History", icon: NotepadText },
    { path: "settings", label: "Settings", icon: Settings },
  ];

  const handleNavigation = (path) => {
    navigate(`/${path}`);
  };

  return (
    <motion.div
      className="fixed top-0 left-0 h-full bg-white border-r border-gray-200 overflow-hidden z-10"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex flex-col h-full">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-4 w-full flex justify-center focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <motion.div
          className="px-6 pt-4 flex-grow"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={contentVariants}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-center mb-6">
            <a className="font-semibold text-xl text-black focus:outline-none focus:opacity-80">
              Orthoflow
            </a>
          </div>
          <nav className="mt-6">
            <ul className="space-y-1.5">
              {navLinks.map((link) => {
                const isActive = location.pathname.includes(`/${link.path}`);
                return (
                  <li key={link.path}>
                    <a
                      className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg cursor-pointer transition-colors duration-200 ${
                        isActive
                          ? "bg-blue text-white font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => handleNavigation(link.path)}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
