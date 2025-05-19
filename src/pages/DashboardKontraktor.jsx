import React, { useEffect, useState } from "react";
import API from "../services/api";

const DashboardKontraktor = () => {
    const [kontraktor, setKontraktor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        nama: "",
        alamat: "",
        telepon: "",
        email: ""
    });

    useEffect(() => {
        fetchKontraktor();
    }, []);

    const fetchKontraktor = async () => {
        try {
            const response = await API.get("/kontraktor");
            setKontraktor(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching kontraktor:", err);
            setKontraktor([]);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await API.put(`/kontraktor/${editingId}`, formData);
                alert("Kontraktor berhasil diupdate!");
            } else {
                await API.post("/kontraktor", formData);
                alert("Kontraktor berhasil ditambahkan!");
            }
            setShowForm(false);
            setEditingId(null);
            setFormData({
                nama: "",
                alamat: "",
                telepon: "",
                email: ""
            });
            fetchKontraktor();
        } catch (err) {
            console.error("Error saving kontraktor:", err);
            alert(editingId ? "Gagal mengupdate kontraktor" : "Gagal menambah kontraktor");
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({
            nama: item.nama,
            alamat: item.alamat,
            telepon: item.telepon,
            email: item.email
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus kontraktor ini?")) {
            try {
                await API.delete(`/kontraktor/${id}`);
                alert("Kontraktor berhasil dihapus!");
                fetchKontraktor();
            } catch (err) {
                console.error("Error deleting kontraktor:", err);
                alert("Gagal menghapus kontraktor");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Daftar Kontraktor</h1>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingId(null);
                        setFormData({
                            nama: "",
                            alamat: "",
                            telepon: "",
                            email: ""
                        });
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {showForm ? "Tutup Form" : "Tambah Kontraktor"}
                </button>
            </div>

            {showForm && (
                <div className="mb-8 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingId ? "Edit Kontraktor" : "Form Tambah Kontraktor"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Nama Kontraktor</label>
                            <input
                                type="text"
                                value={formData.nama}
                                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Alamat</label>
                            <textarea
                                value={formData.alamat}
                                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                                className="w-full p-2 border rounded"
                                rows="3"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Telepon</label>
                            <input
                                type="tel"
                                value={formData.telepon}
                                onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className={`${
                                    editingId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
                                } text-white px-4 py-2 rounded`}
                            >
                                {editingId ? "Update" : "Simpan"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingId(null);
                                        setFormData({
                                            nama: "",
                                            alamat: "",
                                            telepon: "",
                                            email: ""
                                        });
                                    }}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                >
                                    Batal
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telepon</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {kontraktor.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nama}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.alamat}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.telepon}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardKontraktor;