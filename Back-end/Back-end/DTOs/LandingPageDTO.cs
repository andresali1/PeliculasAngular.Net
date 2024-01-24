using System.Collections.Generic;

namespace Back_end.DTOs
{
    public class LandingPageDTO
    {
        public List<PeliculaDTO> EnCines { get; set; }
        public List<PeliculaDTO> ProximosEstrenos { get; set; }
    }
}
