using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        private static List<Country> countryList = new List<Country>();

        [Route("getcountries")]
        public async Task<List<Country>> GetCountries()
        {
            using (var client = new HttpClient())
            {
                using var response = await client.GetAsync("https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;capital;region;subregion;population;borders;currencies;languages");
                string apiResponse = await response.Content.ReadAsStringAsync();
                countryList = JsonConvert.DeserializeObject<List<Country>>(apiResponse);
            }
            return countryList;
        }

        [Route("getregioncountries")]
        public List<Country> GetRegionCountries(string region)
        {
            return countryList.Where(c => c.Region == region).ToList();
        }

        [Route("getregionsubregions")]
        public List<string> GetRegionSubregions(string region)
        {
            return countryList.Where(c => c.Region == region).Select(s => s.SubRegion).Distinct().ToList();
        }

        [Route("getsubregions")]
        public List<Country> GetSubregions(string subregion)
        {
            return countryList.Where(c => c.SubRegion == subregion).ToList();
        }
    }
}
