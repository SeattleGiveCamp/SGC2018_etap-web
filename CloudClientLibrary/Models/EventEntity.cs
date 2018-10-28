////////////////////////////////////////////////////////
// Copyright (c) 2018 Sameer Khandekar                //
// License: MIT License.                              //
////////////////////////////////////////////////////////
using System;

using Microsoft.WindowsAzure.Storage.Table;

namespace CloudClientLibrary.Models
{
    public class EventEntity : TableEntity
    {
        public EventEntity()
        {
            PartitionKey = "West";
            RowKey = Guid.NewGuid().ToString();
        }

        public float Lat { get; set; }

        public float Lon { get; set; }

        public DateTime Date { get; set; }

        public string TeamLead { get; set; }

        public string Organization { get; set; }

        public string SiteName { get; set; }

        public string Weather { get; set; }

        public int NumberOfPickUps { get; set; }

        public int NumberOfCount { get; set; }

        public int HoursToPick { get; set; }

        public string Comments { get; set; }
    }
}
