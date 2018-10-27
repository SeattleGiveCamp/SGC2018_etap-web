////////////////////////////////////////////////////////
// Copyright (c) 2018 Sameer Khandekar                //
// License: MIT License.                              //
////////////////////////////////////////////////////////

using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;

namespace CloudClientLibrary
{
    public class ImageClient : IImageClient
    {
        public async Task<string> UploadImage(Stream imageStream)
        {
            // create a GUID for the image name
            // find the container
            // create blob container
            // upload the image
            // return URL
            try
            {
                string imageName = Guid.NewGuid().ToString();
                CloudStorageAccount account = CloudStorageAccount.Parse(CloudClient.ConnectionString);
                CloudBlobClient serviceClient = account.CreateCloudBlobClient();

                var container = serviceClient.GetContainerReference(ImageContainerName);

                // write a blob to the container
                CloudBlockBlob blob = container.GetBlockBlobReference(imageName);
                await blob.UploadFromStreamAsync(imageStream);

                return blob.Uri.AbsoluteUri;
            }
            catch (Exception ex)
            {
                Trace.WriteLine(ex.Message);
            }

            return null;
        }

        /// <summary>
        /// Ensure that the container is created
        /// </summary>
        public static async Task<bool> Init()
        {
            CloudStorageAccount account = CloudStorageAccount.Parse(CloudClient.ConnectionString);
            CloudBlobClient serviceClient = account.CreateCloudBlobClient();
            bool result = false;
            try
            {
                var container = serviceClient.GetContainerReference(ImageContainerName);
                result = await container.CreateIfNotExistsAsync();
            }
            catch (Exception ex)
            {
                Trace.WriteLine(ex.Message);
            }
            finally
            {
            }
            return result;
        }

        #region constants
        private const string ImageContainerName = "images";
        #endregion
    }
}
