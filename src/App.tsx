import { headerExcludedRoutes } from '@routes/headerExcludedRoutes.ts';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/protectedRoute.tsx';
import { AuthProvider } from '@/auth/authProvider.tsx';
import Navbar from '@components/navbar/Navbar.tsx';
import PrivateRoutes from '@/routes/private.tsx';
import 'simplebar-react/dist/simplebar.min.css';
import PublicRoutes from '@/routes/public.tsx';
import SimpleBar from 'simplebar-react';
import { lazy, Suspense } from 'react';

const Toaster = lazy(() => import('@shared/ui/sonner.tsx'));

const App = () => {
  const { pathname } = useLocation();

  return (
    <AuthProvider>
      <Suspense>
        {!headerExcludedRoutes.includes(pathname) && <Navbar />}
        <SimpleBar style={{ maxHeight: 'calc(100vh - 72px)' }}>
          <Routes>
            {PrivateRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={<ProtectedRoute>{route.element}</ProtectedRoute>} />
            ))}
            {PublicRoutes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
          </Routes>
        </SimpleBar>
        <Toaster />
      </Suspense>
    </AuthProvider>
  );
};

export default App;
