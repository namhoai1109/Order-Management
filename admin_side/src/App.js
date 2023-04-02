import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PUBLIC_ROUTES } from '~/routes';
import { DefaultLayout } from '~/layout';
import { ProSidebarProvider } from 'react-pro-sidebar';

function App() {
  return (
    <ProSidebarProvider>
      <Router>
        <div className="App">
          <Routes>
            {PUBLIC_ROUTES.map((route, index) => {
              const PAGE = route.component;   // <Login /> or <Staff />
  
              let Layout = DefaultLayout;   // set default layout
  
              // Check layout
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              } 
  
              return (
                <Route
                  key={index} 
                  path={route.path}
                  element={
                    <Layout>
                      <PAGE />
                    </Layout>
                  }
                />
              )
            })}
          </Routes>
        </div>
      </Router>
    </ProSidebarProvider>
  );
}

export default App;
