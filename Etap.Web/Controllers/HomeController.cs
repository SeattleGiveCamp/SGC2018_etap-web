
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
                Path.Combine(
                    Directory.GetCurrentDirectory(), "wwwroot/dist/index.html"), "text/html"
                );
        }
    }
}
}