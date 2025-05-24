
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Database } from 'lucide-react';

interface AzureStorageSettingsProps {
  connectionString: string;
  setConnectionString: (value: string) => void;
  containerName: string;
  setContainerName: (value: string) => void;
  isInitialized: boolean;
  handleInitialize: () => void;
  handleReset: () => void;
}

const AzureStorageSettings = ({
  connectionString,
  setConnectionString,
  containerName,
  setContainerName,
  isInitialized,
  handleInitialize,
  handleReset
}: AzureStorageSettingsProps) => {
  if (!isInitialized) {
    return (
      <div className="mb-4 p-4 bg-primary/5 rounded-lg dark:bg-black/20">
        <p className="text-sm mb-2 dark:text-white flex items-center">
          <Database className="h-4 w-4 mr-2" />
          Connect to Azure Blob Storage:
        </p>
        <div className="space-y-2">
          <Input
            type="password"
            value={connectionString}
            onChange={(e) => setConnectionString(e.target.value)}
            placeholder="Azure Storage Connection String"
            className="w-full dark:bg-black/20 dark:border-metro-dark-border"
          />
          <Input
            type="text"
            value={containerName}
            onChange={(e) => setContainerName(e.target.value)}
            placeholder="Container Name (default: metromind-data)"
            className="w-full dark:bg-black/20 dark:border-metro-dark-border"
          />
          <Button 
            onClick={handleInitialize} 
            className="w-full"
            disabled={!connectionString}
          >
            Connect to Azure
          </Button>
        </div>
        <p className="text-xs mt-2 text-muted-foreground">
          Your connection string will be stored locally in your browser.
        </p>
      </div>
    );
  }
  
  return (
    <div className="mb-4 p-3 bg-primary/5 rounded-lg dark:bg-black/20">
      <div className="flex justify-between items-center">
        <p className="text-xs dark:text-green-400 flex items-center">
          <Database className="h-3 w-3 mr-1" />
          Connected to Azure Storage
        </p>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleReset}
          className="text-xs h-8"
        >
          <RefreshCw className="h-3 w-3 mr-1" /> Change
        </Button>
      </div>
      <p className="text-xs mt-1 text-muted-foreground">
        Container: {containerName}
      </p>
    </div>
  );
};

export default AzureStorageSettings;
