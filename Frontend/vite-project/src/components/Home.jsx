// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { LogOut, Plus, Home as HomeIcon, Hamburger } from 'lucide-react';

// const Home = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     toast.success('Logged out successfully');
//     navigate('/login');
//   };

//   const toggleSidebar = ()=>{
//     setIsSidebarOpen(!isSidebarOpen);
//   }

//   return (
//     <div className="flex h-screen bg-gray-950 text-white">
//       {/* Sidebar */}
//       {isSidebarOpen && (
//       <aside className="w-64 bg-gray-900 p-6 flex flex-col justify-between">
//         <div>
//           <h2 className="text-2xl font-bold mb-8 text-green-400">DreamzTracker</h2>

//           <nav className="space-y-4">
//             <Link
//               to="/"
//               className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 transition"
//             >
//               <HomeIcon size={18} />
//               Dashboard
//             </Link>
//              <Link
//               to="/view-notes"
//               className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 transition"
//             >
//               <HomeIcon size={18} />
//               View Notes
//             </Link>

//             {/* <Link
//               to="/create"
//               className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 transition"
//             >
//               <Plus size={18} />
//               Create Note
//             </Link> */}
//           </nav>
//         </div>

//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 px-4 py-2 rounded text-red-400 hover:bg-red-900 hover:text-white transition"
//         >
//           <LogOut size={18} />
//           Logout
//         </button>
//       </aside>
//       )}

//       {/* Main Content */}
//         <h1 className="text-4xl font-bold mb-6">Welcome to DreamzTracker 👋</h1>
//         <p className="text-gray-400 mb-4">
//           Start organizing your ideas by creating your first note.
//         </p>

//         <Link
//           to="/create"
//           className="inline-block bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-white font-medium transition"
//         >
//           + Create New Note
//         </Link>
//       </main>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogOut, Plus, Home as HomeIcon, Hamburger, HamburgerIcon, ArrowBigRight, NotebookTabsIcon } from 'lucide-react';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-950 text-white">
        <button onClick={toggleSidebar} className="mb-6 text-white">
          <NotebookTabsIcon size={24} />
        </button>
      
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="w-64 bg-gray-900 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-8 text-green-400">DreamzTracker</h2>

            <nav className="space-y-4">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                <HomeIcon size={18} />
                Dashboard
              </Link>

              <Link
                to="/view-notes"
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                <HomeIcon size={18} />
                View Notes
              </Link>
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded text-red-400 hover:bg-red-900 hover:text-white transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {/* Hamburger Toggle Button */}

        <h1 className="text-4xl font-bold mb-6">Welcome to DreamzTracker 👋</h1>
        <p className="text-gray-400 mb-4">
          Start organizing your ideas by creating your first note.
        </p>

        <Link
          to="/create"
          className="inline-block bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-white font-medium transition"
        >
          + Create New Note
        </Link>
      </main>
    </div>
  );
};

export default Home;
