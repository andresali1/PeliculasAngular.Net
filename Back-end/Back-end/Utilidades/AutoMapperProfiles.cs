using AutoMapper;
using Back_end.DTOs;
using Back_end.Entidades;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;

namespace Back_end.Utilidades
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(GeometryFactory geometryFactory)
        {
            CreateMap<Genero, GeneroDTO>().ReverseMap();
            CreateMap<GeneroCreacionDTO, Genero>();

            CreateMap<Actor, ActorDTO>().ReverseMap();
            CreateMap<ActorCreacionDTO, Actor>()
                .ForMember(x => x.Foto, options => options.Ignore());

            CreateMap<CineCreacionDTO, Cine>()
                .ForMember(x => x.Ubicacion, x => x.MapFrom(dto =>
                geometryFactory.CreatePoint(new Coordinate(dto.Longitud, dto.Latitud))));

            CreateMap<Cine, CineDTO>()
                .ForMember(x => x.Latitud, dto => dto.MapFrom(campo => campo.Ubicacion.Y))
                .ForMember(x => x.Longitud, dto => dto.MapFrom(campo => campo.Ubicacion.X));

            CreateMap<PeliculaCreacionDTO, Pelicula>()
                .ForMember(x => x.Poster, opciones => opciones.Ignore())
                .ForMember(x => x.PeliculasGeneros, opciones => opciones.MapFrom(MapearPeliculasGeneros))
                .ForMember(x => x.PeliculasCines, opciones => opciones.MapFrom(MapearPeliculasCines))
                .ForMember(x => x.PeliculasActores, opciones => opciones.MapFrom(MapearPeliculasActores));

            CreateMap<Pelicula, PeliculaDTO>()
                .ForMember(x => x.Generos, options => options.MapFrom(MapearPeliculasGeneros))
                .ForMember(x => x.Actores, options => options.MapFrom(MapearPeliculasActores))
                .ForMember(x => x.Cines, options => options.MapFrom(MapearPeliculasCines));
        }

        /// <summary>
        /// Método para mapear PeliculasActores en Pelicula
        /// </summary>
        /// <param name="peliculaCreacionDTO"></param>
        /// <param name="pelicula"></param>
        /// <returns></returns>
        private List<PeliculasActores> MapearPeliculasActores(PeliculaCreacionDTO peliculaCreacionDTO, Pelicula pelicula)
        {
            var resultado = new List<PeliculasActores>();

            if (peliculaCreacionDTO.Actores == null) { return resultado; }

            foreach (var actor in peliculaCreacionDTO.Actores)
            {
                resultado.Add(new PeliculasActores { ActorId = actor.Id, Personaje = actor.Personaje });
            }

            return resultado;
        }

        /// <summary>
        /// Método para mapear Peliculas Genero en Peliculas
        /// </summary>
        /// <param name="peliculaCreacionDTO"></param>
        /// <param name="pelicula"></param>
        /// <returns></returns>
        private List<PeliculasGeneros> MapearPeliculasGeneros(PeliculaCreacionDTO peliculaCreacionDTO, Pelicula pelicula)
        {
            var resultado = new List<PeliculasGeneros>();

            if (peliculaCreacionDTO.GenerosIds == null) { return resultado; }

            foreach (var id in peliculaCreacionDTO.GenerosIds)
            {
                resultado.Add(new PeliculasGeneros { GeneroId = id });
            }

            return resultado;
        }

        /// <summary>
        /// Método para mapear PeliculasCines en Peliculas
        /// </summary>
        /// <param name="peliculaCreacionDTO"></param>
        /// <param name="pelicula"></param>
        /// <returns></returns>
        private List<PeliculasCines> MapearPeliculasCines(PeliculaCreacionDTO peliculaCreacionDTO, Pelicula pelicula)
        {
            var resultado = new List<PeliculasCines>();

            if (peliculaCreacionDTO.CinesIds == null) { return resultado; }

            foreach (var id in peliculaCreacionDTO.CinesIds)
            {
                resultado.Add(new PeliculasCines { CineId = id });
            }

            return resultado;
        }

        /// <summary>
        /// Método para mapear generos en PeliculaDTO
        /// </summary>
        /// <param name="pelicula"></param>
        /// <param name="peliculaDTO"></param>
        /// <returns></returns>
        private List<GeneroDTO> MapearPeliculasGeneros(Pelicula pelicula, PeliculaDTO peliculaDTO)
        {
            var resultado = new List<GeneroDTO>();

            if (pelicula.PeliculasGeneros == null) { return resultado; }

            foreach (var genero in pelicula.PeliculasGeneros)
            {
                resultado.Add(new GeneroDTO { Id = genero.GeneroId, Nombre = genero.Genero.Nombre });
            }

            return resultado;
        }

        /// <summary>
        /// Método para mapear Actores en PeliculaDTO
        /// </summary>
        /// <param name="pelicula"></param>
        /// <param name="peliculaDTO"></param>
        /// <returns></returns>
        private List<PeliculaActorDTO> MapearPeliculasActores(Pelicula pelicula, PeliculaDTO peliculaDTO)
        {
            var resultado = new List<PeliculaActorDTO>();

            if (pelicula.PeliculasActores == null) { return resultado; }

            foreach (var actorPeliculas in pelicula.PeliculasActores)
            {
                resultado.Add(new PeliculaActorDTO
                {
                    Id = actorPeliculas.ActorId,
                    Nombre = actorPeliculas.Actor.Nombre,
                    Foto = actorPeliculas.Actor.Foto,
                    Orden = actorPeliculas.Orden,
                    Personaje = actorPeliculas.Personaje
                });
            }

            return resultado;
        }

        /// <summary>
        /// Método para mapear cines en PeliculaDTO
        /// </summary>
        /// <param name="pelicula"></param>
        /// <param name="peliculaDTO"></param>
        /// <returns></returns>
        private List<CineDTO> MapearPeliculasCines(Pelicula pelicula, PeliculaDTO peliculaDTO)
        {
            var resultado = new List<CineDTO>();

            if (pelicula.PeliculasCines == null) { return resultado; }

            foreach (var cinePelicula in pelicula.PeliculasCines)
            {
                resultado.Add(new CineDTO
                {
                    Id = cinePelicula.CineId,
                    Nombre = cinePelicula.Cine.Nombre,
                    Latitud = cinePelicula.Cine.Ubicacion.Y,
                    Longitud = cinePelicula.Cine.Ubicacion.X
                });
            }

            return resultado;
        }
    }
}
