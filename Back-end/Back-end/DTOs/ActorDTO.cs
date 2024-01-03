using System.ComponentModel.DataAnnotations;
using System;

namespace Back_end.DTOs
{
    public class ActorDTO
    {
        public string Nombre { get; set; }
        public string Biografia { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Foto { get; set; }
    }
}
