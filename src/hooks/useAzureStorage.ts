
import { useState, useEffect, useCallback } from 'react';
import AzureStorageService from '@/utils/AzureStorageService';
import { toast } from 'sonner';

interface UseAzureStorageProps {
  onInitialize?: (success: boolean) => void;
}

interface UseAzureStorageReturn {
  isInitialized: boolean;
  connectionString: string;
  setConnectionString: (value: string) => void;
  containerName: string;
  setContainerName: (value: string) => void;
  initialize: () => Promise<boolean>;
  uploadData: <T>(key: string, data: T, metadata?: Record<string, string>) => Promise<string | null>;
  downloadData: <T>(key: string) => Promise<T | null>;
  listFiles: () => Promise<string[]>;
  deleteFile: (key: string) => Promise<boolean>;
}

const useAzureStorage = ({ onInitialize }: UseAzureStorageProps = {}): UseAzureStorageReturn => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [connectionString, setConnectionString] = useState<string>('');
  const [containerName, setContainerName] = useState<string>('metromind-data');

  // Check if already initialized on mount
  useEffect(() => {
    const storedConnectionString = AzureStorageService.getConnectionString();
    if (storedConnectionString) {
      setConnectionString(storedConnectionString);
      
      // Try to initialize with the stored connection string
      const containerName = localStorage.getItem('azureStorageContainerName') || 'metromind-data';
      setContainerName(containerName);
      
      const success = AzureStorageService.initialize(storedConnectionString, containerName);
      setIsInitialized(success);
      
      if (onInitialize) {
        onInitialize(success);
      }
    }
  }, [onInitialize]);

  /**
   * Initialize the Azure Storage Service
   */
  const initialize = useCallback(async (): Promise<boolean> => {
    if (!connectionString) {
      toast.error('Azure Storage connection string is required');
      return false;
    }

    const success = AzureStorageService.initialize(connectionString, containerName);
    setIsInitialized(success);
    
    if (success) {
      toast.success('Azure Storage connected successfully');
    } else {
      toast.error('Failed to connect to Azure Storage');
    }
    
    if (onInitialize) {
      onInitialize(success);
    }
    
    return success;
  }, [connectionString, containerName, onInitialize]);

  /**
   * Upload data to Azure Blob Storage
   */
  const uploadData = useCallback(async <T>(
    key: string, 
    data: T, 
    metadata?: Record<string, string>
  ): Promise<string | null> => {
    if (!isInitialized) {
      const initialized = await initialize();
      if (!initialized) return null;
    }

    return AzureStorageService.uploadData(key, data as any, metadata);
  }, [isInitialized, initialize]);

  /**
   * Download data from Azure Blob Storage
   */
  const downloadData = useCallback(async <T>(key: string): Promise<T | null> => {
    if (!isInitialized) {
      const initialized = await initialize();
      if (!initialized) return null;
    }

    return AzureStorageService.downloadData<T>(key);
  }, [isInitialized, initialize]);

  /**
   * List all files in the Azure Blob Storage container
   */
  const listFiles = useCallback(async (): Promise<string[]> => {
    if (!isInitialized) {
      const initialized = await initialize();
      if (!initialized) return [];
    }

    return AzureStorageService.listBlobs();
  }, [isInitialized, initialize]);

  /**
   * Delete a file from Azure Blob Storage
   */
  const deleteFile = useCallback(async (key: string): Promise<boolean> => {
    if (!isInitialized) {
      const initialized = await initialize();
      if (!initialized) return false;
    }

    return AzureStorageService.deleteBlob(key);
  }, [isInitialized, initialize]);

  return {
    isInitialized,
    connectionString,
    setConnectionString,
    containerName,
    setContainerName,
    initialize,
    uploadData,
    downloadData,
    listFiles,
    deleteFile
  };
};

export default useAzureStorage;
