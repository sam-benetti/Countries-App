using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CountriesApp.Models
{
    public class Country
    {
        public string Name { get; set; }

        [Newtonsoft.Json.JsonProperty("alpha3Code")]
        public string Code { get; set; }

        public string Capital { get; set; }

        public string Region { get; set; }

        public string SubRegion { get; set; }

        public int Population { get; set; }

        public string[] Borders { get; set; }

        public List<Currency> Currencies { get; set; }

        public List<Language> Languages { get; set; }
    }
}
