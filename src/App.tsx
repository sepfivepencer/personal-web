import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { ScrollToTop } from './components/ScrollToTop';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const WritingPage = lazy(() => import('./pages/WritingPage').then((module) => ({ default: module.WritingPage })));
const PostPage = lazy(() => import('./pages/PostPage').then((module) => ({ default: module.PostPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

function RouteFallback() {
  return (
    <div className="rounded-[2rem] border border-stone-900/10 bg-white/70 p-8 text-sm font-medium text-stone-600 shadow-sm">
      Loading…
    </div>
  );
}

function LegacyPostRedirect() {
  const { slug } = useParams();

  return <Navigate to={slug ? `/writing/${slug}` : '/writing'} replace />;
}

function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="writing" element={<Outlet />}>
            <Route index element={<WritingPage />} />
            <Route path=":slug" element={<PostPage />} />
          </Route>
          <Route path="about" element={<AboutPage />} />
          <Route path="blog" element={<Navigate to="/writing" replace />} />
          <Route path="posts/:slug" element={<LegacyPostRedirect />} />
          <Route path="contact" element={<Navigate to="/about" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}
