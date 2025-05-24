
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

class AzureStorageService {
  private static connectionString: string = '';
  private static isInitialized: boolean = false;
  private static containerName: string = 'metromind-data';
  private static containerClient: ContainerClient | null = null;
  private static blobServiceClient: BlobServiceClient | null = null;

  /**
   * Initialize the Azure Storage Service with connection string
   */
  static initialize(connectionString: string, containerName?: string): boolean {
    if (!connectionString) {
      console.error('Azure Storage connection string is required');
      return false;
    }

    try {
      this.connectionString = connectionString;
      
      if (containerName) {
        this.containerName = containerName;
      }
      
      // Create the BlobServiceClient
      this.blobServiceClient = BlobServiceClient.fromConnectionString(this.connectionString);
      
      // Get a reference to the container
      this.containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      
      this.isInitialized = true;
      console.log('Azure Storage Service initialized successfully');
      
      // Store connection string in localStorage for persistence
      localStorage.setItem('azureStorageConnectionString', connectionString);
      if (containerName) {
        localStorage.setItem('azureStorageContainerName', containerName);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to initialize Azure Storage Service:', error);
      return false;
    }
  }

  /**
   * Check if the service is initialized
   */
  static isInitializedStatus(): boolean {
    return this.isInitialized;
  }

  /**
   * Get stored connection string from localStorage
   */
  static getConnectionString(): string {
    if (this.connectionString) {
      return this.connectionString;
    }
    
    const storedString = localStorage.getItem('azureStorageConnectionString');
    if (storedString) {
      this.connectionString = storedString;
      
      // Also restore container name if available
      const storedContainer = localStorage.getItem('azureStorageContainerName');
      if (storedContainer) {
        this.containerName = storedContainer;
      }
      
      return storedString;
    }
    
    return '';
  }

  /**
   * Ensure container exists, creating it if necessary
   */
  static async ensureContainer(): Promise<boolean> {
    if (!this.isInitialized || !this.containerClient) {
      console.error('Azure Storage Service not initialized');
      return false;
    }

    try {
      // Check if container exists
      const exists = await this.containerClient.exists();
      
      // Create container if it doesn't exist
      if (!exists) {
        console.log(`Container "${this.containerName}" does not exist, creating...`);
        await this.blobServiceClient!.createContainer(this.containerName);
        console.log(`Container "${this.containerName}" created successfully`);
      }
      
      return true;
    } catch (error) {
      console.error('Error ensuring container exists:', error);
      return false;
    }
  }

  /**
   * Upload data (string or object) to Azure Blob Storage
   */
  static async uploadData(
    blobName: string, 
    data: string | object, 
    metadata?: Record<string, string>
  ): Promise<string | null> {
    if (!this.isInitialized || !this.containerClient) {
      console.error('Azure Storage Service not initialized');
      return null;
    }

    try {
      // Ensure container exists
      await this.ensureContainer();
      
      // Convert object to string if needed
      const contentToUpload = typeof data === 'string' ? 
        data : JSON.stringify(data);
      
      // Get a block blob client
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      
      // Upload data
      const uploadOptions = {
        blobHTTPHeaders: {
          blobContentType: 'application/json'
        },
        metadata
      };
      
      await blockBlobClient.upload(contentToUpload, contentToUpload.length, uploadOptions);
      console.log(`Data uploaded successfully to "${blobName}"`);
      
      // Return the URL to the uploaded blob
      return blockBlobClient.url;
    } catch (error) {
      console.error('Error uploading data to Azure Blob Storage:', error);
      return null;
    }
  }

  /**
   * Download data from Azure Blob Storage
   */
  static async downloadData<T = any>(blobName: string): Promise<T | null> {
    if (!this.isInitialized || !this.containerClient) {
      console.error('Azure Storage Service not initialized');
      return null;
    }

    try {
      // Get a block blob client
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      
      // Check if blob exists
      const exists = await blockBlobClient.exists();
      if (!exists) {
        console.log(`Blob "${blobName}" does not exist`);
        return null;
      }
      
      // Download the blob content
      const downloadResponse = await blockBlobClient.download(0);
      
      // Convert the downloaded content to text
      const content = await this.streamToText(downloadResponse.readableStreamBody!);
      
      // Parse the content as JSON if it's a JSON string
      try {
        return JSON.parse(content) as T;
      } catch {
        // If not JSON, return as is
        return content as unknown as T;
      }
    } catch (error) {
      console.error('Error downloading data from Azure Blob Storage:', error);
      return null;
    }
  }

  /**
   * List all blobs in the container
   */
  static async listBlobs(): Promise<string[]> {
    if (!this.isInitialized || !this.containerClient) {
      console.error('Azure Storage Service not initialized');
      return [];
    }

    try {
      const blobs: string[] = [];
      
      // Ensure container exists
      const containerExists = await this.ensureContainer();
      if (!containerExists) {
        return blobs;
      }
      
      // List all blobs in the container
      for await (const blob of this.containerClient.listBlobsFlat()) {
        blobs.push(blob.name);
      }
      
      return blobs;
    } catch (error) {
      console.error('Error listing blobs from Azure Blob Storage:', error);
      return [];
    }
  }

  /**
   * Delete a blob from the container
   */
  static async deleteBlob(blobName: string): Promise<boolean> {
    if (!this.isInitialized || !this.containerClient) {
      console.error('Azure Storage Service not initialized');
      return false;
    }

    try {
      // Get a block blob client
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      
      // Check if blob exists
      const exists = await blockBlobClient.exists();
      if (!exists) {
        console.log(`Blob "${blobName}" does not exist`);
        return true; // Consider it a success if it doesn't exist
      }
      
      // Delete the blob
      await blockBlobClient.delete();
      console.log(`Blob "${blobName}" deleted successfully`);
      
      return true;
    } catch (error) {
      console.error('Error deleting blob from Azure Blob Storage:', error);
      return false;
    }
  }

  /**
   * Helper method to convert a readable stream to text
   */
  private static async streamToText(readable: NodeJS.ReadableStream): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      readable.on('data', (data) => {
        chunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
      });
      readable.on('end', () => {
        resolve(Buffer.concat(chunks).toString());
      });
      readable.on('error', reject);
    });
  }
}

export default AzureStorageService;
