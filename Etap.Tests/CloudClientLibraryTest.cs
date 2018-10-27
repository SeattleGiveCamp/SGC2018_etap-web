////////////////////////////////////////////////////////
// Copyright (c) 2018 Sameer Khandekar                //
// License: MIT License.                              //
////////////////////////////////////////////////////////
using CloudClientLibrary;
using CloudClientLibrary.Models;
using System;
using System.IO;
using System.Threading.Tasks;

namespace TestApp
{
    class Program
    {
        static void Main(string[] args)
        {
            CloudClient.EnsureCreated(StorageConnectionString);
            TestImageUpload().Wait();
            TestEventCreate().Wait();
            TestTrashDataCreate().Wait();
            Console.ReadKey();
        }

        private async static Task TestTrashDataCreate()
        {
            try
            {
                var tableClient = new TableClient();
                TrashData td = new TrashData();
                td.EventID = _eventID;
                td.ImageURI = _imageURI;

                td.OpenCount = 10;
                td.ETapCategory = 23;
                td.Count = 52;
                td.CloseCount = 1;
                td.Weight = 2.3f;


                await tableClient.AddTrashData(td);

                Console.WriteLine($"Trash Id {td.RowKey}");

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        private static async Task TestEventCreate()
        {
            try
            {
                var tableClient = new TableClient();
                EventEntity evt = new EventEntity();
                evt.Date = DateTime.UtcNow;
                evt.SiteName = "Test";
                evt.TeamLead = "Give";
                evt.Organization = "Give Camp";
                evt.Lat = 45.23f;
                evt.Lon = -122.11f;

                await tableClient.AddEvent(evt);
                _eventID = evt.RowKey;
                Console.WriteLine($"Event Id {evt.RowKey}");

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        private async static Task TestImageUpload()
        {
            try
            {
                var imageClient = new ImageClient();
                using (FileStream fs = File.OpenRead(TestFilePath))
                {
                    string uri = await imageClient.UploadImage(fs);
                    _imageURI = uri;
                    Console.WriteLine(uri);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        private static string _imageURI;
        private static string _eventID;
        private static string _trashID;

        private const string TestFilePath = @"C:\GiveCamp2018\ImageClient\TestData\Beach_pano.jpg";
        private const string StorageConnectionString = "DefaultEndpointsProtocol=https;AccountName=eetap;AccountKey=QarB658f2OD14RUTgj+71c8DARomve0LJr7bduWLEqjCUlPS3Eh9HMp7P7BAhmEHTIz6EURevXKP5EP346t7CA==;EndpointSuffix=core.windows.net";
    }
}
