import React, { useEffect, useState } from 'react';
import { getBugs } from '../../services/bugService';
import { Bug } from 'lucide-react'; // bug icon
// you can also import more icons like Circle, AlertTriangle, etc.

const BugList = () => {
    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBugs = async () => {
            try {
                const data = await getBugs();
                setBugs(data);
            } catch (error) {
                console.error("Error fetching bugs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBugs();
    }, []);

    if (loading) {
        return <div className="text-center text-yellow-400 font-semibold">Loading...</div>;
    }

    return (
        <div className="p-6 bg-black text-yellow-200 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">🐞 Bug List</h2>
            <div className="grid gap-4">
                {bugs.map((bug) => (
                    <div
                        key={bug.id}
                        className="flex items-center gap-4 bg-gray-900 border border-yellow-400 rounded-lg p-5 shadow hover:shadow-xl hover:border-yellow-300 transition"
                    >
                        {/* Bug Icon */}
                        <div className="flex-shrink-0 bg-yellow-400 text-black p-3 rounded-full shadow">
                            <Bug size={24} />
                        </div>

                        {/* Bug Details */}
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-yellow-300">{bug.bugTitle}</h3>
                            <p className="text-sm text-yellow-200 opacity-80">{bug.bugDescription}</p>

                            <div className="mt-2 flex gap-3 text-sm">
                                <span className="px-2 py-1 bg-yellow-700 rounded-lg text-xs">
                                    Status: {bug.status}
                                </span>
                                <span className="px-2 py-1 bg-yellow-700 rounded-lg text-xs">
                                    Priority: {bug.priority}
                                </span>
                               
                            </div>
                        </div>

                        {/* Assigned To */}
                        <div className="text-right">
                            <p className="text-sm font-semibold text-yellow-300">Assigned To</p>
                            <p className="text-xs text-yellow-200">{bug.assigneeId || "Unassigned"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BugList;
