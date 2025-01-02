import { useState } from 'react';
import { APIConfig, APIResponse, TestResult } from '../types';

export const useAPITesting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const testAPI = async (config: APIConfig): Promise<void> => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await fetch(config.url, {
        method: config.method,
        headers: {
          'Content-Type': 'application/json',
          ...config.headers
        },
        ...(config.body && { body: config.body })
      });

      const data = await response.json();
      const apiResponse: APIResponse = {
        status: response.status,
        statusText: response.statusText,
        data,
        timestamp: new Date().toISOString()
      };

      setTestResult({
        response: apiResponse,
        isSuccess: response.status >= 200 && response.status < 300
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to test API';
      setError(errorMessage);
      setTestResult({
        response: {
          status: 0,
          statusText: 'Error',
          data: { error: errorMessage },
          timestamp: new Date().toISOString()
        },
        isSuccess: false,
        error: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    testResult,
    testAPI
  };
};