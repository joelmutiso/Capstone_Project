import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-purple-600 text-white p-4 shadow-md">
      <ul className="flex justify-start space-x-6">
        <li>
          <Link to="/" className="font-semibold text-lg hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/menu" className="font-semibold text-lg hover:underline">Menu</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

