using System.ComponentModel.DataAnnotations;

namespace Back_end.DTOs
{
    public class CineCreacionDTO
    {
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(maximumLength: 75, ErrorMessage = "El campo {0} no puede tener más de {1} caracteres")]
        public string Nombre { get; set; }

        [Range(-90, 90, ErrorMessage = "El rango de {0} debe estar entre {1} y {2}")]
        public double Latitud { get; set; }

        [Range(-180, 180, ErrorMessage = "El rango de {0} debe estar entre {1} y {2}")]
        public double Longitud { get; set; }
    }
}
