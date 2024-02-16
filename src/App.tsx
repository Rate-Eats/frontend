import { headerExcludedRoutes } from '@routes/headerExcludedRoutes.ts';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/protectedRoute.tsx';
import { AuthProvider } from '@/auth/authProvider.tsx';
import Navbar from '@components/navbar/Navbar.tsx';
import PrivateRoutes from '@/routes/private.tsx';
import PublicRoutes from '@/routes/public.tsx';
import { Suspense } from 'react';

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
      </Suspense>
    </AuthProvider>
  );
};

export default App;
