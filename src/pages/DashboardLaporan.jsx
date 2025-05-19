import React, { useState } from 'react';

const DashboardLaporan = () => {
    const [laporan] = useState([
        {
            id: 'LP001',
            judul: 'Laporan Progres Mingguan',
            tanggal: '12/05/2023',
            proyek: 'Gedung A',
            status: 'Selesai'
        },
        {
            id: 'LP002',
            judul: 'Laporan Penggunaan Material',
            tanggal: '15/05/2023',
            proyek: 'Jalan B',
            status: 'Proses'
        },
        {
            id: 'LP003',
            judul: 'Laporan Keuangan Bulanan',
            tanggal: '01/06/2023',
            proyek: 'Jembatan C',
            status: 'Draft'
        },
    ]);

    return (
        <div className="container mx-auto">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Laporan</h1>
                <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center">
                    <span className="mr-2">+</span>
                    Tambah Laporan
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
                <div className="px-4 py-5 sm:px-6">
                    <h2 className="text-lg font-medium">Daftar Laporan</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proyek</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {laporan.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.judul}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tanggal}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.proyek}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                            ${item.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                                            item.status === 'Proses' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                                        <button>Lihat</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardLaporan;