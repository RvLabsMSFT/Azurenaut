using System;
using System.Collections.Generic;

namespace ServiceApi
{
    public class WeatherPayload
    {
        public string Type { get; set; }
        public IList<WeatherForecast> WeatherData { get; set; }
    }
    public class WeatherForecast
    {
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary { get; set; }
    }
}
