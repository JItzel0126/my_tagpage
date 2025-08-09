import {Link, NavLink} from "react-router-dom"

export default function NavBar() {
  const navItem = "px-3 py-2 rounded-md text-sm font-medium";
  const active = "bg-gray-900 text-white";
  const idle = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" className="text-lime-300 font-bold">my_tagpage</Link>
          <div className="flex gap-1">
            <NavLink to="/" end className={({isActive}) => `${navItem} ${isActive?active:idle}`}>홈</NavLink>
            <NavLink to="/board" className={({isActive}) => `${navItem} ${isActive?active:idle}`}>게시판</NavLink>
            <NavLink to="/practice" className={({isActive}) => `${navItem} ${isActive?active:idle}`}>DesignExam</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}