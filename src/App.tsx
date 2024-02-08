import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/protectedRoute.tsx';
import { AuthProvider } from '@/auth/authProvider.tsx';
import PrivateRoutes from '@/routes/private.tsx';
import PublicRoutes from '@/routes/public.tsx';
import { Suspense } from 'react';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
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
    </Router>
  );
};

export default App;
