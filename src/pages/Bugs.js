import React, { useEffect, useState } from 'react';
import BugList from '../components/Bug/BugList';
import BugForm from '../components/Bug/BugForm';
import { getBugs } from '../services/bugService';

const Bugs = () => {
    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        const loadBugs = async () => {
            try {
                const data = await getBugs(); // ✅ imported function
                setBugs(data);
            } catch (err) {
                console.error("Error fetching bugs:", err);
            }
        };
        loadBugs();
    }, []);


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Bug Management</h1>
            <BugForm />
            <BugList bugs={bugs} />
        </div>
    );
};

export default Bugs;