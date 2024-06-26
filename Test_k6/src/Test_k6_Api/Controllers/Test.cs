using Microsoft.AspNetCore.Mvc;

namespace Test_k6_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Test : ControllerBase
    {
        private readonly ILogger<Test> _logger;

        public Test(ILogger<Test> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "Test")]
        public async Task<IActionResult> Get()
        {
            await Task.Delay(TimeSpan.FromSeconds(1));
            _logger.LogInformation("Passei");
            return Ok();
        }

        [HttpGet("Teste1")]
        public async Task<IActionResult> Get1()
        {
            await Task.Delay(TimeSpan.FromSeconds(1));
            
            _logger.LogInformation("Passei 1");

            return Ok();
        }
    }
}
