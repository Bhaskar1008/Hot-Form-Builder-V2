import React, { useState } from 'react';
import { FormComponent } from '../../../types/form';
import { Send, Save, Copy } from 'lucide-react';
import { useAPIStorage } from './hooks/useAPIStorage';
import { generateCurlCommand } from './utils/curlGenerator';
import { APIMethod, APIResponse } from './types';
import { MethodSelector } from './components/MethodSelector';
import { HeadersEditor } from './components/HeadersEditor';
import { RequestBody } from './components/RequestBody';
import { ResponseViewer } from './components/ResponseViewer';
import classNames from 'classnames';

interface RestAPITriggerProps {
  component: FormComponent;
  onChange?: (value: any) => void;
}

const RestAPITrigger: React.FC<RestAPITriggerProps> = ({ component, onChange }) => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState<APIMethod>('GET');
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [body, setBody] = useState('');
  const [apiName, setApiName] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<APIResponse | null>(null);
  const { saveAPIDetails, copyToClipboard } = useAPIStorage();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const requestOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        ...(method !== 'GET' && body && { body })
      };

      const res = await fetch(url, requestOptions);
      const data = await res.json();
      
      const apiResponse: APIResponse = {
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data,
        timestamp: new Date().toISOString()
      };
      
      setResponse(apiResponse);
      
      // Generate cURL command
      const curlCommand = generateCurlCommand({
        url,
        method,
        headers: requestOptions.headers,
        body: requestOptions.body
      });

      // Save API details if name is provided
      if (apiName.trim()) {
        saveAPIDetails({
          name: apiName,
          url,
          method,
          headers: requestOptions.headers,
          body: requestOptions.body,
          response: apiResponse,
          curlCommand
        });
      }

      onChange?.(apiResponse);
    } catch (error) {
      setResponse({
        status: 0,
        statusText: 'Error',
        data: { error: error instanceof Error ? error.message : 'Unknown error' },
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCurl = () => {
    const curlCommand = generateCurlCommand({
      url,
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
      body
    });
    copyToClipboard(curlCommand);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="block text-sm font-medium text-gray-700">
          {component.label}
          {component.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>

      <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter API URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <MethodSelector value={method} onChange={setMethod} />
        </div>

        <div className="space-y-4">
          <HeadersEditor headers={headers} onChange={setHeaders} />
          
          {method !== 'GET' && (
            <RequestBody value={body} onChange={setBody} />
          )}
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            value={apiName}
            onChange={(e) => setApiName(e.target.value)}
            placeholder="Enter API name to save"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button
            onClick={handleCopyCurl}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy cURL
          </button>

          <button
            onClick={handleSubmit}
            disabled={!url || loading}
            className={classNames(
              "px-4 py-2 rounded-md flex items-center gap-2",
              loading
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            {loading ? (
              <>Loading...</>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Request
              </>
            )}
          </button>
        </div>

        {response && (
          <ResponseViewer response={response} />
        )}
      </div>
    </div>
  );
};

export default RestAPITrigger;