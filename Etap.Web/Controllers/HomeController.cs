
using System.IO;
using Microsoft.AspNetCore.Mvc;
namespace Etap.Web.Controllers
{
    namespace Etap.Web.Controllers
    {
        public class HomeController : Controller
        {
            [Route("/")]
            public IActionResult Index()
            {
                return PhysicalFile(
                    Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/dist/index.html"),
                    "text/html"
                );
            }

            [Route("/formSubmit")]
            public IActionResult SubmitForm(dynamic form) => SaveForm(form);

            private static async void SaveForm(dynamic form)
            {
                /* 
                const string connectionString = "mongodb://localhost:27017";

                // Create a MongoClient object by using the connection string
                var client = new MongoClient(connectionString);

                //Use the MongoClient to access the server
                var database = client.GetDatabase("ETAP-Site-Cleanup-Data");

                //get mongodb collection
                var collection = database.GetCollection<dynamic>("form-data");
                await collection.InsertOneAsync(form);
                */
            }
        }
    }
}