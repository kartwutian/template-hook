import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';
import { useStore } from '@/store/index';
import Loading from 'components/Loading';
import Exception from 'components/Exception/index.js';
import App from 'layouts/App/index';

import loginUtil from 'utils/login';
import auth from 'utils/auth';

// /**
//  * 模拟延时加载组件
//  * @param {} value
//  * @param {*} ms
//  */
// function slowImport(value, ms = 1000) {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(value), ms);
//   });
// }

export const appHistory = createHashHistory();

const renderRouter = (routes) => {
  const children = [];

  function renderRoutes(arr) {
    arr.forEach((route) => {
      if (!route.path) {
        children.push(null);
      } else {
        const curRoute = (
          <Route
            key={route.route}
            exact
            path={route.route}
            render={(props) => {
              let isAuth = true;
              if (route.authority) {
                isAuth = auth(route.authority);
              }
              const Temp = lazy(() => import(`../../${route.path}`)); // 有变量的情况不能使用别名
              return isAuth ? (
                <Suspense fallback={<Loading />}>
                  <div className="animated faster fadeInRight">
                    <Temp {...props} />
                  </div>
                </Suspense>
              ) : (
                <Exception type="403"></Exception>
              );
            }}
          />
        );
        children.push(curRoute);
      }

      console.log(route.routes.length);
      if (route.routes.length) {
        renderRoutes(route.routes);
      }
    });
  }
  renderRoutes(routes);
  console.log(children);
  return children;
};

export default function AppRouter() {
  const globalStore = useStore('globalModel');

  const routerOut = globalStore.router.filter(
    (item) => item.isInLayout === false,
  );

  console.log(routerOut);
  const routerInner = globalStore.router.filter(
    (item) => item.isInLayout !== false,
  );
  return (
    <Router history={appHistory}>
      <>
        <Switch>
          {renderRouter(routerOut)}
          {loginUtil.isLogin() ? (
            <App>
              <Switch>
                {renderRouter(routerInner)}
                <Route
                  render={(props) => {
                    return <Exception type="404" />;
                  }}
                />
              </Switch>
            </App>
          ) : (
            <Route
              render={(props) => {
                const Temp = lazy(() => import('pages/Login'));
                return (
                  <Suspense fallback={<Loading />}>
                    <div className="animated faster fadeInRight">
                      <Temp {...props} />
                    </div>
                  </Suspense>
                );
              }}
            />
          )}
        </Switch>
      </>
    </Router>
  );
}
