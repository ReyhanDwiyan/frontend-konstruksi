import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
    { path: '/laporan', label: 'Laporan', icon: null },
    { path: '/kontraktor', label: 'Kontraktor', icon: null },
    { path: '/material', label: 'Material', icon: null },
    { path: '/proyek', label: 'Proyek', icon: null },
];

const Layout = ({ children }) => {
    const location = useLocation();

    // Ambil judul halaman dari menu aktif
    const activeMenu = menuItems.find(item => location.pathname.startsWith(item.path));
    const pageTitle = activeMenu ? activeMenu.label : '';

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col">
                <div className="px-6 py-6 border-b border-gray-200">
                    <h1 className="text-lg font-bold text-gray-800">Sistem Konstruksi</h1>
                </div>
                <nav className="flex-1 mt-4">
                    {menuItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-6 py-2 mb-1 rounded-l-lg transition
                                    ${isActive
                                        ? 'bg-gray-100 font-semibold text-gray-900'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                {item.icon && <span className="mr-3">{item.icon}</span>}
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-h-screen">
                {/* Header */}
                <header className="h-16 flex items-center border-b border-gray-200 bg-white px-8">
                    <span className="text-lg font-semibold text-gray-800">{pageTitle}</span>
                </header>
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
};

export default Layout;