using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using CountriesApp.Models;

namespace CountriesApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        public async Task<List<Country>> GetCountries()
        {
            List<Country> countryList = new List<Country>();

            using (var client = new HttpClient())
            {
                using var response = await client.GetAsync("https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;capital;region;subregion;population;borders;currencies;languages");
                string apiResponse = await response.Content.ReadAsStringAsync();
                countryList = JsonConvert.DeserializeObject<List<Country>>(apiResponse);
            }

            return countryList;
        }
    }
}
