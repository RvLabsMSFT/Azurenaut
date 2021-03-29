using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ServiceApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public WeatherPayload Get()
        {
            var rng = new Random();
            IEnumerable<WeatherForecast> weatherForecasts = Enumerable.Range(1, 5).Select(index => new WeatherForecast {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });

            WeatherPayload payload = new WeatherPayload {
                Type = "Public endpoint",
                WeatherData = weatherForecasts.ToList()
            };

            return payload;
        }

        [HttpGet]
        public WeatherPayload AuthSecEndpoint()
        {
            var rng = new Random();
            IEnumerable<WeatherForecast> weatherForecasts = Enumerable.Range(1, 5).Select(index => new WeatherForecast {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });

            WeatherPayload payload = new WeatherPayload {
                Type = "Public endpoint",
                WeatherData = weatherForecasts.ToList()
            };

            return payload;
        }

        [HttpGet]
        public WeatherPayload RoleSecEndpoint()
        {
            var rng = new Random();
            IEnumerable<WeatherForecast> weatherForecasts = Enumerable.Range(1, 5).Select(index => new WeatherForecast {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });

            WeatherPayload payload = new WeatherPayload {
                Type = "Role based security",
                WeatherData = weatherForecasts.ToList()
            };

            return payload;
        }
    }
}
