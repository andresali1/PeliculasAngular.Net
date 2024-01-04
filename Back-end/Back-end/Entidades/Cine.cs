using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace Back_end.Entidades
{
    public class Cine
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(maximumLength: 75, ErrorMessage = "El campo {0} no puede tener más de {1} caracteres")]
        public string Nombre { get; set; }

        public Point Ubicacion { get; set; }
    }
}
