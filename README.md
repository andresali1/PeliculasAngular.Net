# PeliculasAngular.Net
Proyecto WebApi que contiene un sistema de gestión de Peliculas, actores, cinemas y reseñas. Tiene un sistema de Autenticación y de autorización. Usa SQL Server como motor de base de datos. Adicionalmente hay un cliente en Angular que consume el web API desde un front end.

### Tecnologías Utilizadas
:keyboard: C# 9  
:keyboard: .Net 5  
:computer: Visual Studio 2022  
:file_cabinet: Sql Server 2019 - 15.0.2000.5  
:window: Angular CLI: 12.2.2  
:keyboard: Node: 12.14.1  
:keyboard: NPM: 6.13.4

### :open_book: Configuración  
1. En una carpeta del sistema ejecutar el comando :arrow_forward: git clone https://github.com/andresali1/PeliculasAngular.Net.git
2. Ubicarse dentro de la carpeta "Front-end" y abrir la solución
3. Verificar lass cadenas configuración en los archivos "appsettings.json" y colocar la cadena de conexión propia a SQL Server
4. Abrir la Consola del administrado de paquetes y ejecutar el comando :arrow_forward: Update-Database, o si se usa dotnet cli usar el comando "dotnet ef database update"
5. Ejecutar el Proyecto Back-end
6. Ubicarse dentro de la carpeta "Front-end"
7. Ejecutar el comando :arrow_forward: npm install
8. Verificar la carpeta "environments" dentro del proyecto y colocar la URL que tenga el proyecto Back-end
9. Ejecutar el proyecto Front-end con el comando :arrow_forward: ng serve -open

