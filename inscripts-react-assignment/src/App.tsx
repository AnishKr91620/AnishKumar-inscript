import React from 'react';
import { BasicTable } from './components/BasicTable.tsx';
import OrderTabs from './components/OrderTabs.tsx';
import Toolbar from './components/Toolbar.tsx';
import SpreadsheetHeader from './components/SpreadsheetHeader.tsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
const App: React.FC = () => {
  return (
    <div style={{ minHeight: '100%', width: '100%', height: '100%', padding: 0, overflow: 'hidden' }}>
      <div style={{ width: '100%', padding: 0 }}>
        <SpreadsheetHeader />
        <Toolbar />
        <BasicTable />
        <OrderTabs />
      </div>
    </div>
  );
};

export default App;
