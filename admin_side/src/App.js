
import { React, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PRIVATE_ROUTES_ADMIN, PRIVATE_ROUTES_STAFF } from '~/routes';
import { Result } from 'antd';
import { DefaultLayout } from '~/layout';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Login from '~/pages/LoginPage/Login';


function App() {
  const token = localStorage.getItem('token');   // get the token from local storage
  const role = localStorage.getItem('role');     // get the token from local storage

  if (!token || !role) {
    if (window.location.href === 'http://localhost:3000/') {
      return <Login />;
    } else {
      return (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
        />
      );
    }
  }
  else
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
                        <LayoutComponent>
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
                        <LayoutComponent>
                          <PageComponent />
                        </LayoutComponent>
                      }
                    />
                  );
                })}
              <Route path="*" element={
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                />}
              />
            </Routes>
          </div>
        </Router>
      </ProSidebarProvider>
    );

}

export default App;
