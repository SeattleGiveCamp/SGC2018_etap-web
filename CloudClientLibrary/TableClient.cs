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
<<<<<<< HEAD
        public async Task AddTrashData(TrashData trashData)
        {
            TableBatchOperation batch = new TableBatchOperation();
            batch.InsertOrMerge(trashData);
=======
        public async Task AddFormData(FormDataEntity formData)
        {
            TableBatchOperation batch = new TableBatchOperation();
            batch.InsertOrMerge(formData);
>>>>>>> c6231927e428249400e31704535002b075afda6d

            try
            {
                CloudStorageAccount account = CloudStorageAccount.Parse(CloudClient.ConnectionString);
                CloudTableClient serviceClient = account.CreateCloudTableClient();
<<<<<<< HEAD
                var table = serviceClient.GetTableReference(TrashDataTableName);
                await table.ExecuteBatchAsync(batch);
                return;
            }
            catch (Exception ex)
            {
                Trace.WriteLine(ex.Message);

                return;
            }
        }

        public async Task AddEvent(EventEntity evt)
        {
            TableBatchOperation batch = new TableBatchOperation();
            batch.InsertOrMerge(evt);

            try
            {
                CloudStorageAccount account = CloudStorageAccount.Parse(CloudClient.ConnectionString);
                CloudTableClient serviceClient = account.CreateCloudTableClient();
                var table = serviceClient.GetTableReference(EventTableName);
=======
                var table = serviceClient.GetTableReference(FormTableName);
>>>>>>> c6231927e428249400e31704535002b075afda6d
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
<<<<<<< HEAD
        private readonly string EventTableName = "Events";
        private readonly string TrashDataTableName = "TrashData";
=======
        private readonly string FormTableName = "FormData";
>>>>>>> c6231927e428249400e31704535002b075afda6d
        #endregion
    }
}
