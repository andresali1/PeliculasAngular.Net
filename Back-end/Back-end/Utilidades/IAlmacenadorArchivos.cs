using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Back_end.Utilidades
{
    public interface IAlmacenadorArchivos
    {
        Task<string> GuardarArchivo(string contenedor, IFormFile archivo);
        Task<string> EditaArchivo(string contenedor, IFormFile archivo, string ruta);
        Task BorrarArchivo(string ruta, string contenedor);
    }
}
