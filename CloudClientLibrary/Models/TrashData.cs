////////////////////////////////////////////////////////
// Copyright (c) 2018 Sameer Khandekar                //
// License: MIT License.                              //
////////////////////////////////////////////////////////
using System;
using Microsoft.WindowsAzure.Storage.Table;

namespace CloudClientLibrary.Models
{
    public class TrashData : TableEntity
    {
        public TrashData()
        {
            PartitionKey = "West";
            RowKey = Guid.NewGuid().ToString();
        }

        public string EventID { get; set; }

        public int ETapCategory { get; set; }

        public int Count { get; set; }

        public float Weight { get; set; }

        public int ShinyCount { get; set; }

        public int CloseCount { get; set; }

        public int OpenCount { get; set; }

        public int FouledCount { get; set; }

        public string ImageURI { get; set; }

        public string Notes { get; set; }
    }
}
