////////////////////////////////////////////////////////
// Copyright (c) 2018 Sameer Khandekar                //
// License: MIT License.                              //
////////////////////////////////////////////////////////
using System;
using System.Diagnostics;

namespace Etap.Web.CloudClientLibrary
{
    public class CloudClient
    {
        /// <summary>
        /// Create table, if it does not exist
        /// </summary>
        /// <returns></returns>
        public static bool EnsureCreated(string connectionString)
        {
            try
            {
                ConnectionString = connectionString;
                TableClient.Init(new string[] { "Events", "TrashData" }).Wait();
                ImageClient.Init().Wait();
                return true;
            }
            catch (Exception ex)
            {
                Trace.WriteLine(ex.Message);
            }

            return false;
        }

        internal static string ConnectionString { get; set; }
    }
}
