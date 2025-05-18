import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const DashboardProyek = () => {
    const [proyek, setProyek] = useState([]);
    const [kontraktor, setKontraktor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nama: "",
        lokasi: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
        kontraktor_id: "",
        status: "Belum Dimulai"
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [proyekRes, kontraktorRes] = await Promise.all([
                API.get("/proyek"),
                API.get("/kontraktor")
            ]);
            setProyek(proyekRes.data);
            setKontraktor(kontraktorRes.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/proyek", formData);
            setShowForm(false);
            setFormData({
                nama: "",
                lokasi: "",
                tanggal_mulai: "",
                tanggal_selesai: "",
                kontraktor_id: "",
                status: "Belum Dimulai"
            });
            fetchData();
        } catch (err) {
            console.error(err);
            alert("Gagal menambah proyek");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Daftar Proyek</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {showForm ? "Tutup Form" : "Tambah Proyek"}
                </button>
            </div>

            {showForm && (
                <div className="mb-8 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Form Tambah Proyek</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Nama Proyek</label>
                            <input
                                type="text"
                                value={formData.nama}
                                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Lokasi</label>
                            <input
                                type="text"
                                value={formData.lokasi}
                                onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Tanggal Mulai</label>
                            <input
                                type="date"
                                value={formData.tanggal_mulai}
                                onChange={(e) => setFormData({ ...formData, tanggal_mulai: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Tanggal Selesai</label>
                            <input
                                type="date"
                                value={formData.tanggal_selesai}
                                onChange={(e) => setFormData({ ...formData, tanggal_selesai: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Kontraktor</label>
                            <select
                                value={formData.kontraktor_id}
                                onChange={(e) => setFormData({ ...formData, kontraktor_id: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Pilih Kontraktor</option>
                                {kontraktor.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nama}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                            Simpan
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Mulai</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Selesai</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kontraktor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {proyek.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nama}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lokasi}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tanggal_mulai}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tanggal_selesai}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {kontraktor.find(k => k.id === item.kontraktor_id)?.nama || 'Tidak ada kontraktor'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${item.status === "Selesai" ? "bg-green-100 text-green-800" :
                                        item.status === "Dalam Pengerjaan" ? "bg-yellow-100 text-yellow-800" :
                                            "bg-gray-100 text-gray-800"}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Link
                                        to={`/proyek/${item.id}`}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Detail
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardProyek;