using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CountriesApp.Models
{
    public class Language
    {
        public string ISO639_1 { get; set; }

        public string ISO639_2 { get; set; }

        public string Name { get; set; }

        public string NativeName { get; set; }
    }
}
