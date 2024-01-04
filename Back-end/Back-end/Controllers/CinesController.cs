using AutoMapper;
using Back_end.DTOs;
using Back_end.Entidades;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Back_end.Controllers
{
    [Route("api/cines")]
    [ApiController]
    public class CinesController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public CinesController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        /// <summary>
        /// Se crea un cine en BD
        /// </summary>
        /// <param name="cineCreacionDTO"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CineCreacionDTO cineCreacionDTO)
        {
            var cine = mapper.Map<Cine>(cineCreacionDTO);
            context.Add(cine);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
