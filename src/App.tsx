import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { FormDndProvider } from './context/DndContext';
import { FormBuilder } from './components/HotFormBuilder';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <FormDndProvider>
        <div className="min-h-screen bg-gray-100">
          <FormBuilder />
        </div>
      </FormDndProvider>
    </Provider>
  );
};

export default App;