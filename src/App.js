import * as React from 'react';
import { styled } from '@mui/material/styles';

// import Paper from '@mui/material/Paper';
import MiniDrawer from './component/homeComponent/drawer/drawer';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css'
import DrawerReponsive from './component/homeComponent/drawer/drawerReponsive';
// import RouteConfigExample from './routers/router';



// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

function App() {
  return (
    <div className="App">
      <NotificationContainer />
      {/* <MiniDrawer /> */}
      <DrawerReponsive />
      {/* <RouteConfigExample /> */}

    </div>
  );
}

export default App;
