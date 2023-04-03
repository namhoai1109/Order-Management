import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PRIVATE_ROUTES_ADMIN, PRIVATE_ROUTES_STAFF } from '~/routes';
import { DefaultLayout } from '~/layout';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Login from '~/pages/LoginPage/Login';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  const handleTokenChange = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleRoleChange = (role) => {
    localStorage.setItem('role', role);
    setRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  };

  if (!token) {
    return (
      <ProSidebarProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Login setToken={handleTokenChange} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </ProSidebarProvider>
    );
  }

  return (
    <ProSidebarProvider>
      <Router>
        <div className="App">
          <Routes>
            {role === 'admin' &&
              PRIVATE_ROUTES_ADMIN.map((route, index) => {
                const PageComponent = route.component;
                let LayoutComponent = DefaultLayout;

                if (route.layout === null) {
                  LayoutComponent = Fragment;
                } else if (route.layout) {
                  LayoutComponent = route.layout;
                }

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <LayoutComponent handleLogout={handleLogout} handleRoleChange={handleRoleChange}>
                        <PageComponent />
                      </LayoutComponent>
                    }
                  />
                );
              })}
            {role === 'staff' &&
              PRIVATE_ROUTES_STAFF.map((route, index) => {
                const PageComponent = route.component;
                let LayoutComponent = DefaultLayout;

                if (route.layout === null) {
                  LayoutComponent = Fragment;
                } else if (route.layout) {
                  LayoutComponent = route.layout;
                }

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <LayoutComponent handleLogout={handleLogout} handleRoleChange={handleRoleChange}>
                        <PageComponent />
                      </LayoutComponent>
                    }
                  />
                );
              })}
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="404" element={<h1>404 NOT FOUND</h1>} />
          </Routes>
        </div>
      </Router>
    </ProSidebarProvider>
  );
}

export default App;
