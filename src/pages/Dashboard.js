import { Link } from "react-router-dom";

const Dashboard = ({ children }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-1/5 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/users" className="hover:underline">Users</Link>
            </li>
            <li className="mb-4">
              <Link to="/comments" className="hover:underline">Comments</Link>
            </li>
            <li className="mb-4">
              <Link to="/albums" className="hover:underline">Albums</Link>
            </li>
            <li className="mb-4">
              <Link to="/photos" className="hover:underline">Photos</Link>
            </li>
            <li className="mb-4">
              <Link to="/posts" className="hover:underline">Posts</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
};

export default Dashboard;
