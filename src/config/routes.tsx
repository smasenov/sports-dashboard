import { Route, Outlet } from 'react-router-dom';
import { Dashboard, Scoreboard, Teams } from '../pages';
import { Layout } from '../components';

export const routes = (
  <Route
    element={
      <Layout>
        <Outlet />
      </Layout>
    }
  >
    <Route index element={<Dashboard />} />
    <Route path="scoreboard" element={<Scoreboard />} />
    <Route path="teams" element={<Teams />} />
  </Route>
);
