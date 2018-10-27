////////////////////////////////////////////////////////
// Copyright (c) 2018 Sameer Khandekar                //
// License: MIT License.                              //
////////////////////////////////////////////////////////
using System;
using System.Collections.Generic;
using Microsoft.WindowsAzure.Storage.Table;

namespace CloudClientLibrary.Models
{
    public class FormDataEntity : TableEntity
    {
        public FormDataEntity()
        {
            PartitionKey = "West";
            RowKey = Guid.NewGuid().ToString();
        }
        public Summary Summary { get; set; }
        public SiteInfo SiteInfo { get; set; }
        public SiteConditions SiteConditions { get; set; }
        public WeightAssessment WeightAssessment { get; set; }
        public List<Category> Categories { get; set; }
    }
    public class Summary
    {
        public string Leader { get; set; }
        public string Organization { get; set; }
        public string Weather { get; set; }
        public string Date { get; set; }
        public string HoursSpent { get; set; }
        public int LitterPickupVolunteers { get; set; }
        public int LitterCountingVolunteers { get; set; }
    }
    public class SiteInfo
    {
        public string SiteName { get; set; }
        public List<Dictionary<int, int>> OverallSiteBoundary { get; set; }
        public string BoundaryNotes { get; set; }
        public int TotalSiteArea { get; set; }
    }
    public class SiteConditions
    {
        public string Trash { get; set; }
    }
    public class WeightAssessment
    {
        public int TotalWeight { get; set; }
        public int GarbageWeight { get; set; }
        public int RecycleWeight { get; set; }
    }
    public class Category
    {
        public string Group { get; set; }
        public int Number { get; set; }
        public string Name { get; set; }
        public int TotalCount { get; set; }
        public ThreatAssessmentCounts ThreatAssessmentCounts { get; set; }
        public string Notes { get; set; }
        public int Weight { get; set; }
        public string WeightUnit { get; set; }
    }
    public class ThreatAssessmentCounts
    {
        public int ShinyCount { get; set; }
        public int ClosedLoopCount { get; set; }
        public int OpenContainerCount { get; set; }
        public int FouledCount { get; set; }
    }
}
    
