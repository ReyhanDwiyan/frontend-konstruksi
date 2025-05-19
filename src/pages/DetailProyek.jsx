import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const DetailProyek = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [proyek, setProyek] = useState(null);
    const [kontraktor, setKontraktor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetchProyek();
    }, [id]);

    const fetchProyek = async () => {
    try {
        console.log("Fetching project with ID:", id);
        
        // Add headers explicitly
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const proyekRes = await API.get(`/proyek/${id}`, config);
        console.log("Project response:", proyekRes.data);

        if (!proyekRes.data) {
            throw new Error("No data received");
        }

        setProyek(proyekRes.data);
        setStatus(proyekRes.data.status);

        // Fetch kontraktor data
        const kontraktorRes = await API.get("/kontraktor");
        const kontraktorList = Array.isArray(kontraktorRes.data) ? kontraktorRes.data : [];
        const matchingKontraktor = kontraktorList.find(
            k => k.id === proyekRes.data.kontraktor_id
        );
        setKontraktor(matchingKontraktor);
    } catch (err) {
        console.error("Error fetching data:", err);
        console.error("Error response:", err.response);
    } finally {
        setLoading(false);
    }
};

    const handleStatusUpdate = async () => {
        try {
            await API.put(`/proyek/${id}`, {
                ...proyek,
                status: status
            });
            setIsEditing(false);
            fetchProyek();
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Gagal mengupdate status proyek");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!proyek) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-xl text-red-600 mb-4">Proyek tidak ditemukan</p>
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Kembali ke Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-black min-h-screen">
            <div className="bg-gray-900 rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Detail Proyek</h1>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Kembali
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-gray-300 mb-2">Nama Proyek</h3>
                        <p className="text-xl font-semibold text-white">{proyek.nama}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-300 mb-2">Lokasi</h3>
                        <p className="text-xl text-white">{proyek.lokasi}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-300 mb-2">Tanggal Mulai</h3>
                        <p className="text-xl text-white">{proyek.tanggal_mulai}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-300 mb-2">Tanggal Selesai</h3>
                        <p className="text-xl text-white">{proyek.tanggal_selesai}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-300 mb-2">Kontraktor</h3>
                        <p className="text-xl text-white">{kontraktor?.nama || 'Tidak ada kontraktor'}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-300 mb-2">Status</h3>
                        {isEditing ? (
                            <div className="flex items-center space-x-4">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full p-2 border rounded bg-gray-800 text-white"
                                >
                                    <option value="Belum Dimulai">Belum Dimulai</option>
                                    <option value="Dalam Pengerjaan">Dalam Pengerjaan</option>
                                    <option value="Selesai">Selesai</option>
                                </select>
                                <button
                                    onClick={handleStatusUpdate}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                >
                                    Simpan
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setStatus(proyek.status);
                                    }}
                                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                >
                                    Batal
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold
                                    ${status === "Selesai" ? "bg-green-200 text-green-900" :
                                    status === "Dalam Pengerjaan" ? "bg-yellow-200 text-yellow-900" :
                                        "bg-gray-700 text-gray-200"}`}>
                                    {status}
                                </span>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    Ubah Status
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default DetailProyek;