using Back_end.Entidades;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Back_end.Controllers
{
    [Route("api/generos")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class GenerosController : ControllerBase
    {
        [HttpGet]
        public ActionResult<List<Genero>> Get()
        {
            return new List<Genero>()
            {
                new Genero {Id = 1, Nombre = "Acción"},
                new Genero {Id = 2, Nombre = "Comedia"}
            };
        }

        [HttpGet("{id:int}")]
        public ActionResult<Genero> Get(int id)
        {
            return new Genero() { Id = 1, Nombre = "Acción"};
        }

        [HttpPost]
        public ActionResult Post([FromBody] Genero genero)
        {
            return NoContent();
        }

        [HttpPut]
        public ActionResult Put()
        {
            return NoContent();
        }

        [HttpDelete]
        public ActionResult Delete()
        {
            return NoContent();
        }
    }
}
