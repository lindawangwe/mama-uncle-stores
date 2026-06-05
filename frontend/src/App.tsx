import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from 'react';

import { SidebarProvider } from './contexts/SideBarContexts';
import AppLayout from './layouts/AppLayout';

import { useUserStore } from './stores/useUserStore';
import { useCartStore } from './stores/useCartStore';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import PurchaseSuccessPage from './pages/PurchaseSuccessPage';
import PurchaseCancelPage from './pages/PurchaseCancelPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProductDetailsPage from './pages/ProductDetailsPage';
import DealsPage from './pages/DealsPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import RecentPage from './pages/RecentPage';
import PaymentsPage from './pages/PaymentsPage';
import FAQPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import DeliveryPage from './pages/DeliveryPage';

import LoadingSpinner from './components/LoadingSpinner';
import SearchResultsPage from './pages/SearchResultsPage';
import IntroVideo from './components/IntroVideo';

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems} = useCartStore();
  const [showIntro, setShowIntro] = useState<boolean>(true); 

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);


  if (checkingAuth) return <LoadingSpinner />

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />, // AppLayout manages the shared layout (e.g., Navbar, Outlet)
      children: [
        { path: '/', element: <HomePage /> },
        { 
          path: '/signup',
           element: !user ? <SignUpPage /> : <Navigate to ='/' /> 
        },
        { 
          path: '/login', 
          element: !user ? <LoginPage /> : <Navigate to ='/' />
        },
        {
          path: '/secret-dashboard', 
          element: user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />
        },
        {
          path: '/category/:category', 
          element: <CategoryPage />
        },
        {
          path: '/cart', 
          element: user ? <CartPage /> : <Navigate to='/login' />
        },
        {
          path: '/purchase-success',
          element: (
            <ProtectedRoute>
              <PurchaseSuccessPage />
            </ProtectedRoute>
          )
        },
        {
          path: '/purchase-cancel',
          element:(
            <ProtectedRoute>    
              <PurchaseCancelPage />
            </ProtectedRoute>
          ) 
        },
        {
          path: '/products/:id',
          element:<ProductDetailsPage />
        },
        {
          path: '/search',
          element: <SearchResultsPage />
        },
        {
          path: '/deals',
          element: <DealsPage />
        },
        {
          path: '/new-arrivals',
          element: <NewArrivalsPage />
        },
        {
          path:'/recent',
          element:<RecentPage />
        },
        {
          path:'/payments',
          element:<PaymentsPage />
        },
        {
          path:'/FAQ',
          element:<FAQPage />
        },
        {
          path:'/contacts',
          element:<ContactPage />
        },
        {
          path:'/delivery',
          element:<DeliveryPage />
        },

      ],

    },
  ]);

  return (
    <SidebarProvider>

      {/* Add IntroVideo here */}
      {showIntro && <IntroVideo onComplete={() => setShowIntro(false)} />}
      <div className="w-full min-h-screen bg-teal-900">
        <RouterProvider router={router} />
        <Toaster />
    </div>
    </SidebarProvider>
    
  ) 
  
}

export default App;
