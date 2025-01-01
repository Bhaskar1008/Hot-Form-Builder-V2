import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FormDndProvider } from './context/DndContext';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <FormDndProvider>
        <AppRoutes />
      </FormDndProvider>
    </BrowserRouter>
  );
};

export default App;