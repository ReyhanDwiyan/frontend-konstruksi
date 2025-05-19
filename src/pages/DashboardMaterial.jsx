import React, { useEffect, useState } from "react";
import API from "../services/api";

const DashboardMaterial = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        nama: "",
        stok: 0,
        satuan: "",
        harga_per_unit: 0,
        proyek_id: "",
        image_url: ""
    });

    useEffect(() => {
        console.log("DashboardMaterial mounted");
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            console.log("Fetching materials...");
            const response = await API.get("/material");
            console.log("Materials response:", response);

            if (!response.data) {
                throw new Error("No data received");
            }

            setMaterials(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching materials:", err);
            console.error("Error response:", err.response);
            setMaterials([]);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                console.log("Updating material:", editingId, formData);
                const response = await API.put(`/material/${editingId}`, formData);
                if (response.status === 200) {
                    alert("Material berhasil diupdate!");
                }
            } else {
                console.log("Creating new material:", formData);
                const response = await API.post("/material", formData);
                if (response.status === 201) {
                    alert("Material berhasil ditambahkan!");
                }
            }
            setShowForm(false);
            setEditingId(null);
            setFormData({
                nama: "",
                stok: 0,
                satuan: "",
                harga_per_unit: 0,
                proyek_id: "",
                image_url: ""
            });
            setImagePreview(null);
            fetchMaterials();
        } catch (err) {
            console.error("Error saving material:", err);
            alert(editingId ? "Gagal mengupdate material" : "Gagal menambah material");
        }
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        setFormData({
            nama: item.nama,
            stok: item.stok,
            satuan: item.satuan,
            harga_per_unit: item.harga_per_unit,
            proyek_id: item.proyek_id || "",
            image_url: item.image_url || ""
        });
        setImagePreview(item.image_url);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus material ini?")) {
            try {
                console.log("Deleting material with ID:", id);
                const response = await API.delete(`/material/${id}`);

                if (response.status === 200) {
                    alert("Material berhasil dihapus!");
                    fetchMaterials();
                }
            } catch (err) {
                console.error("Error deleting material:", err);
                alert("Gagal menghapus material");
            }
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData({ ...formData, image_url: reader.result });
            };
            reader.readAsDataURL(file);
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
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Daftar Material</h1>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        if (!showForm) {
                            setEditingId(null);
                            setFormData({
                                nama: "",
                                stok: 0,
                                satuan: "",
                                harga_per_unit: 0,
                                proyek_id: "",
                                image_url: ""
                            });
                            setImagePreview(null);
                        }
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {showForm ? "Tutup Form" : "Tambah Material"}
                </button>
            </div>

            {showForm && (
                <div className="mb-8 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingId ? "Edit Material" : "Form Tambah Material"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Nama Material</label>
                                <input
                                    type="text"
                                    value={formData.nama}
                                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Stok</label>
                                <input
                                    type="number"
                                    value={formData.stok}
                                    onChange={(e) => setFormData({ ...formData, stok: parseInt(e.target.value) })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Satuan</label>
                                <input
                                    type="text"
                                    value={formData.satuan}
                                    onChange={(e) => setFormData({ ...formData, satuan: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Harga per Unit</label>
                                <input
                                    type="number"
                                    value={formData.harga_per_unit}
                                    onChange={(e) => setFormData({ ...formData, harga_per_unit: parseInt(e.target.value) })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gray-700 mb-2">Foto Material</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="w-full p-2 border rounded"
                                />
                                {imagePreview && (
                                    <div className="mt-2">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className={`${editingId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
                                    } text-white px-4 py-2 rounded`}
                            >
                                {editingId ? "Update Material" : "Simpan Material"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingId(null);
                                        setFormData({
                                            nama: "",
                                            stok: 0,
                                            satuan: "",
                                            harga_per_unit: 0,
                                            proyek_id: "",
                                            image_url: ""
                                        });
                                        setImagePreview(null);
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satuan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga/Unit</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {materials.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.image_url ? (
                                        <img
                                            src={item.image_url}
                                            alt={item.nama}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    ) : (
                                        <span className="text-gray-400 italic">Tidak ada gambar</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.nama}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.stok}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.satuan}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    Rp {item.harga_per_unit.toLocaleString("id-ID")}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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

export default DashboardMaterial;