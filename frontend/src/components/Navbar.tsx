import { Menu, LogIn, ShoppingBasket, Search, ArrowLeft, Lock, LogOut, UserPlus } from 'lucide-react'
import logo from '../assets/logo.jpg';
import { Button } from './Button';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';
import { useSidebarContext } from '../contexts/SideBarContexts';
import { SearchBox } from './SearchBox';

export default function Navbar () {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === 'admin';
  const { cart } = useCartStore();
  const navigate = useNavigate();
 
  const handleSearch = (query: string) => {
    // Navigate to search results page with the query parameter
    navigate(`/search?q=${encodeURIComponent(query)}`);
    // On mobile, close the full-width search after searching
    setShowFullWidthSearch(false);
  };

  return(
    <nav className="fixed z-50 top-0 left-0 w-full bg-teal-900 text-amber-700 shadow-md">
      <div className="flex gap-10 lg:gap-20 justify-between items-center h-16 px-8 mb-2 pt-2 z-20">
        <NavbarFirst hidden={showFullWidthSearch} />

        <div className={`flex-grow max-w-[600px] ${showFullWidthSearch ? "flex" : "hidden md:flex"}`}>          
          {showFullWidthSearch && (
            <Button
              onClick={() => setShowFullWidthSearch(false)}
              variant="ghost"
              size="icon"
              className="flex-shrink-0 mr-2"
              type="button"
            >
              <ArrowLeft />
            </Button>
          )}

          <div className="flex-grow">
            <SearchBox onSearch={handleSearch} />
          </div>
        </div>

        <div className={`flex-shrink-0 gap-2 p-2 ${showFullWidthSearch ? "hidden" : "flex"}`}>  
          <Button
            onClick={() => setShowFullWidthSearch(true)}
            variant="ghost"
            size="icon"
            className="md:hidden"
            type="button"
          >
            <Search />
          </Button>

          {user && (
            <Link to="/cart" className="relative inline-block">
              <Button variant="secondary" size="sm" className="flex items-center">
                <div className="relative">
                  <ShoppingBasket className="inline-block" />
                  {cart.length > 0 && (
                    <span
                      className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full px-2 py-0.5 animate-bounce text-xs transition duration-300 ease-in-out"
                    >
                      {cart.length}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline ml-1">cart</span>
              </Button>
            </Link>
          )}

          {isAdmin && (
            <Link
              className="bg-teal-900 hover:bg-amber-100 text-amber-700 px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
              to="/secret-dashboard"
            >
              <Lock className="inline-block mr-1 text-amber-700" size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}

          {user ? (
            <Button
              variant="secondary"
              size="md"
              className="py-2 px-4 rounded-md transition duration-300 ease-in-out"
              onClick={logout}
            >
              <LogOut />
              <span className="hidden sm:inline ml-2">LogOut</span>
            </Button>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-teal-900 hover:bg-amber-100 text-amber-700 py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <UserPlus className="mr-2" size={18} />
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-teal-900 hover:bg-amber-100 text-amber-700 py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <LogIn className="mr-2" size={18} />
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );  
}

type NavbarFirstProps = {
  hidden?: boolean
}

export function NavbarFirst({
  hidden = false,
}: NavbarFirstProps) {
  const { toggleSidebar } = useSidebarContext();

  return (
    <div className={`gap-4 items-center flex-shrink-0 ${hidden ? "hidden" : "flex"}`}>
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <Menu />
      </Button>            
      <a href="/">
        <img src={logo} className="h-16" />
      </a>
      <h1 className="font-bold">MAMA UNCLE</h1>
    </div>
  );
}