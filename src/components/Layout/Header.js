// import React from 'react';

// const Header = ({ currentUser, onLogout }) => (
//     <header className="bg-black shadow flex items-center justify-between px-6 py-4">
//        <h1 className="text-2xl font-bold" style={{ color: '#FFD600' }}>Bug Tracker</h1><div className="flex items-center space-x-4">
//             {currentUser && (
//                 <>
//                     <span className="text-yellow-400">Welcome, {currentUser.name}</span>
//                     <button
//                         className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-600 transition"
//                         onClick={onLogout}
//                     >
//                         Logout
//                     </button>
//                 </>
//             )}
//         </div>
//     </header>
// );

// export default Header;
import React from 'react';

const Header = ({ currentUser, onLogout }) => (
    <header className="bg-black shadow flex items-center justify-between px-6 py-5">
        <h1 className="text-2xl font-bold" style={{ color: '#FFC107' }}>Bug Tracker</h1>
        <div className="flex items-center space-x-4">
            {currentUser && (
                <>
                    <span className="text-yellow-400">Welcome, {currentUser}</span>
                    <button
                        className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-600 transition"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </>
            )}
        </div>
    </header>
);

export default Header;