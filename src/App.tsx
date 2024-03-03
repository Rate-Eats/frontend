import { headerExcludedRoutes } from '@routes/headerExcludedRoutes.ts';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/protectedRoute.tsx';
import { AuthProvider } from '@/auth/authProvider.tsx';
import Navbar from '@components/navbar/Navbar.tsx';
import PrivateRoutes from '@/routes/private.tsx';
import PublicRoutes from '@/routes/public.tsx';
import { lazy, Suspense } from 'react';

const Toaster = lazy(() => import('@shared/ui/sonner.tsx'));

const App = () => {
  const { pathname } = useLocation();

  return (
    <AuthProvider>
      <Suspense>
        {!headerExcludedRoutes.includes(pathname) && <Navbar />}
        <Routes>
          {PrivateRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={<ProtectedRoute>{route.element}</ProtectedRoute>} />
          ))}
          {PublicRoutes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Routes>
        <Toaster />
      </Suspense>
    </AuthProvider>
  );
};

export default App;
