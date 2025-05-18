import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    const menuItems = [
        { path: '/proyek', label: 'Proyek', icon: '🏗️' },
        { path: '/kontraktor', label: 'Kontraktor', icon: '👷' },
        { path: '/material', label: 'Material', icon: '🏭' },
        { path: '/laporan', label: 'Laporan', icon: '📊' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg fixed h-full">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold text-gray-800">Manajemen Konstruksi</h1>
                </div>
                <nav className="mt-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors
                                ${location.pathname.startsWith(item.path) ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700' : ''}`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="ml-64 flex-1 p-8">
                {children}
            </div>
        </div>
    );
};

export default Layout;