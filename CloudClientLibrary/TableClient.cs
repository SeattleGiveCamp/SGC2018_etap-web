////////////////////////////////////////////////////////
// Copyright (c) 2018 Sameer Khandekar                //
// License: MIT License.                              //
////////////////////////////////////////////////////////
using System;
using System.Diagnostics;
using System.Threading.Tasks;
using CloudClientLibrary.Models;

using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;

namespace CloudClientLibrary
{
    public class TableClient : ITableClient
    {
        public async Task AddFormData(FormDataEntity formData)
        {
            TableBatchOperation batch = new TableBatchOperation();
            batch.InsertOrMerge(formData);

            try
            {
                CloudStorageAccount account = CloudStorageAccount.Parse(CloudClient.ConnectionString);
                CloudTableClient serviceClient = account.CreateCloudTableClient();
                var table = serviceClient.GetTableReference(FormTableName);
                await table.ExecuteBatchAsync(batch);
                return;
            }
            catch (Exception ex)
            {
                Trace.WriteLine(ex.Message);

                return;
            }
        }

        /// <summary>
        /// Ensure that the container is created
        /// </summary>
        public static async Task<bool> Init(string[] tableNames)
        {
            CloudStorageAccount account = CloudStorageAccount.Parse(CloudClient.ConnectionString);
            CloudTableClient serviceClient = account.CreateCloudTableClient();
            bool result = false;
            try
            {
                foreach (var tableName in tableNames)
                {
                    var table = serviceClient.GetTableReference(tableName);
                    result = await table.CreateIfNotExistsAsync();
                    if (!result)
                    {
                        break;
                    }
                }
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
        private readonly string FormTableName = "FormData";
        #endregion
    }
}
