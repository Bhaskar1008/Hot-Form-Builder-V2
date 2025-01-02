import React, { useState } from 'react';
import { FormComponent } from '../../../types/form';
import { MethodSelector } from './components/MethodSelector';
import { HeadersEditor } from './components/HeadersEditor';
import { RequestBody } from './components/RequestBody';
import { ResponseViewer } from './components/ResponseViewer';
import { useAPITesting } from './hooks/useAPITesting';
import { APIMethod } from './types';
import { Network } from 'lucide-react';

interface RestAPITriggerProps {
  component: FormComponent;
  onChange?: (value: any) => void;
}

const RestAPITrigger: React.FC<RestAPITriggerProps> = ({ component, onChange }) => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState<APIMethod>('GET');
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [body, setBody] = useState('');
  
  const { loading, error, testResult, testAPI } = useAPITesting();

  const handleTest = async () => {
    if (!url.trim()) {
      return;
    }

    await testAPI({
      url,
      method,
      headers,
      body: method !== 'GET' ? body : undefined
    });
  };

  return (
    <div className="space-y-6 p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Network className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-900">{component.label}</h3>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter API URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <MethodSelector value={method} onChange={setMethod} />
        </div>

        <HeadersEditor headers={headers} onChange={setHeaders} />
        
        {method !== 'GET' && (
          <RequestBody value={body} onChange={setBody} />
        )}

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleTest}
            disabled={!url || loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test API'}
          </button>
        </div>

        {testResult && (
          <ResponseViewer response={testResult.response} />
        )}
      </div>
    </div>
  );
};

export default RestAPITrigger;