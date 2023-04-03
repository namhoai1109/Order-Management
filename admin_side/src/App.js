import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PRIVATE_ROUTES_ADMIN, PRIVATE_ROUTES_STAFF } from '~/routes';
import { DefaultLayout } from '~/layout';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Login from '~/pages/LoginPage/Login';

function getToken() {
  return localStorage.getItem('token');
}



function App() {
  const token = getToken();
  const [auth, setAuth] = useState(null);

  console.log('token APP: ' + token);
  console.log('auth APP: ' + auth);

  if (!token || !auth) {
    return <Login setAuth={setAuth} />; // show the Login component if there is no token or no auth object

  } else
    return (
      <ProSidebarProvider>
        <Router>
          <div className="App">
            <Routes>
              {auth.role === 'admin' &&
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
                        <LayoutComponent>
                          <PageComponent />
                        </LayoutComponent>
                      }
                    />
                  );
                })}
              {auth.role === 'staff' &&
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
                        <LayoutComponent>
                          <PageComponent />
                        </LayoutComponent>
                      }
                    />
                  );
                })}
              <Route path="**" element={<h1>404 Not Found</h1>} />
            </Routes>
          </div>
        </Router>
      </ProSidebarProvider>
    );
}

export default App;
