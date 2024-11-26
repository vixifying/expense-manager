import React from 'react';
import { LayoutDashboard, Receipt, DollarSign, Settings, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Sidebar = ({ activeTab, setActiveTab }: { 
  activeTab: string; 
  setActiveTab: (tab: string) => void 
}) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'expenses', icon: Receipt, label: 'Expenses' },
    { id: 'income', icon: DollarSign, label: 'Income' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="bg-indigo-900 dark:bg-gray-800 text-white w-64 min-h-screen p-4 transition-colors">
      <div className="flex items-center justify-between mb-8 p-2">
        <div className="flex items-center gap-2">
          <Receipt className="w-8 h-8" />
          <h1 className="text-xl font-bold">ExpenseManager</h1>
        </div>
        <ThemeToggle />
      </div>
      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-2 p-3 rounded-lg mb-2 transition-colors ${
                activeTab === item.id
                  ? 'bg-indigo-800 dark:bg-gray-700'
                  : 'hover:bg-indigo-800/50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <button className="w-full flex items-center gap-2 p-3 rounded-lg mt-auto hover:bg-indigo-800/50 dark:hover:bg-gray-700/50 absolute bottom-4">
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;