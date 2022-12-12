"use strict";
module.exports = {
  mysqlConfig: {
    host: "localhost", // Ordenador que ejecuta el SGBD
    user: "root", // Usuario que accede a la BD
    password: "", // Contraseña con la que se accede a la BD
    database: "UCM_CAU", // Nombre de la base de datos
    dateStrings: true
  },
  port: 3000, // Puerto en el que escucha el servidor
  pages: {
      avisos: {//mis avisos
          minRole: 0,
          //daoFunc: ["getMisAvisos", "getAvisosForTecnico"],
          columns: [
            {
              data: "id",
              name: "id",
              show: false,//para que no lo muestre en la tabla
            },
            {
              data: "uniprofile",
              name: "Perfil",
              show: false,//para que no lo muestre en la tabla
            },
            {
              data: "fecha",//nombre de la columna en la base de datos
              name: "Fecha",//nombre que saldrá en la cabeza de la tabla
              roles: [0, 1],
              render: "date",
            },
            {
              data: "tipo",//nombre de la columna en la base de datos
              name: "Tipo",//nombre que saldrá en la cabeza de la tabla
              roles: [0, 1],
            },
            {
              data: "texto",//nombre de la columna en la base de datos
              name: "Texto",//nombre que saldrá en la cabeza de la tabla
              roles: [0, 1],
              searchable: true
            },
            {
                data: "comentario",//nombre de la columna en la base de datos
                name: "Comentario",//nombre que saldrá en la cabeza de la tabla
                show: false,//va en el modal, no en la tabla
                roles: [0, 1],
            },
            {
                data: "tecnico",//nombre de la columna en la base de datos
                name: "Técnico",//nombre que saldrá en la cabeza de la tabla
                roles: [0],
            },
            /*{//se hace al abrir la chingadera
                data: "acciones",//nombre de la columna en la base de datos
                name: "Acciones",//nombre que saldrá en la cabeza de la tabla
                roles: [1],
                render: "accionesTecnico",
            },*/
          ]
      },
      historico: {//historico de avisos
          minRole: 0,
          columns: [
              {
                  data: "tipo",//nombre de la columna en la base de datos
                  name: "Tipo",//nombre que saldrá en la cabeza de la tabla
                  roles: [0, 1],
              },
              {
                  data: "fecha",//nombre de la columna en la base de datos
                  name: "Fecha",//nombre que saldrá en la cabeza de la tabla
                  roles: [0, 1],
                  render: "date",
              },
              {
                  data: "texto",//nombre de la columna en la base de datos
                  name: "Texto",//nombre que saldrá en la cabeza de la tabla
                  roles: [0, 1],
                  searchable: true
              },
          ]
      },
      //solo tecnico:
      entrantes: {//Avisos entrantes
          minRole: 1,
          columns: [
            {
                data: "tipo",//nombre de la columna en la base de datos
                name: "Tipo",//nombre que saldrá en la cabeza de la tabla
                roles: [1],
            },
            {
                data: "fecha",//nombre de la columna en la base de datos
                name: "Fecha",//nombre que saldrá en la cabeza de la tabla
                roles: [1],
                render: "date",
            },
            {
                data: "texto",//nombre de la columna en la base de datos
                name: "Texto",//nombre que saldrá en la cabeza de la tabla
                roles: [1],
                searchable: true
            },
            {
              data: "acciones",//nombre de la columna en la base de datos
              name: "Acciones",//nombre que saldrá en la cabeza de la tabla
              roles: [1],
              render: "accionesEntrantes",
            },
            {
              data: "tecnicoId",//nombre de la columna en la base de datos
              name: "Técnico",//nombre que saldrá en la cabeza de la tabla
              roles: [1],
              show: false,//no lo muestra en la tabla
            },
          ]
      },
      usuarios: {//gestion de usuarios
          minRole: 1,
          columns: [
            {
              data: "fecha",//nombre de la columna en la base de datos
              name: "Fecha",//nombre que saldrá en la cabeza de la tabla
              roles: [1],
              render: "date",
            },
            {
              data: "username",//nombre de la columna en la base de datos
              name: "Nombre",//nombre que saldrá en la cabeza de la tabla
              roles: [1],
              searchable: true
            },
            {
              data: "role",//nombre de la columna en la base de datos
              name: "Rol",//nombre que saldrá en la cabeza de la tabla
              roles: [1],
              render: "role"
            },
            {
              data: "acciones",
              name: "Acciones",//nombre que saldrá en la cabeza de la tabla
              roles: [1],
              render: "accionesUsuarios",
            },
          ]
      }
  },
  nuevoAvisoData: {
    sugerenciasIncidencias: {
      "Administración digital": {
        "Alumno": ["Certificado digital de personal física", "Registro electrónico", "Sede electrónica"],
        "PAS": ["Certificado digital de personal física", "Certificado electrónico de empleado público", "Registro electrónico", "Sede electrónica", "Portafirmas"],
        "PDI": ["Certificado digital de personal física", "Certificado electrónico de empleado público", "Registro electrónico", "Sede electrónica", "Portafirmas"],
        "Antiguo alumno": ["Registro electrónico", "Sede electrónica"]
      },
      "Comunicaciones": {
        "Alumno": ["Correo electrónico", "Google Meet", "Cuenta de Alumno"],
        "PAS": ["Correo electrónico", "Google Meet", "Cuenta de personal", "Cuenta genérica"],
        "PDI": ["Correo electrónico", "Google Meet", "Cuenta de personal", "Cuenta genérica"],
        "Antiguo alumno": ["Correo electrónico", "Google Meet", "Cuenta de Alumno"],
      },
      "Conectividad": {
        "Alumno": ["Cortafuegos corporativo", "VPN Acceso remoto", "Wifi Eduroam (ssid: eduroam)"],
        "PAS": ["Cuenta as la Red SARA", "Conexión por cable en despachos", "Cortafuegos corporativo", "Resolución de nombres de dominio (DNS)", "VPN Acceso remoto", "Wifi Eduroam (ssid: eduroam)", "Wifi para visitantes (ssid: UCM-Visitantes)"],
        "PDI": ["Conexión por cable en despachos", "Cortafuegos corporativo", "VPN Acceso remoto", "Wifi Eduroam (ssid: eduroam)", "Wifi para visitantes (ssid: UCM-Visitantes)"],
        "Antiguo alumno": []
      },
      "Docencia": {
        "Alumno": ["Aula virtual", "Moodle: Aula Global", "Plataforma de cursos online Privados"],
        "PAS": ["Blackboard collaborate", "Listados de clase", "Moodle: Aula Global"],
        "PDI": ["Aula virtual", "Blackboard collaborate", "Listados de clase", "Moodle: Aula Global", "Plataforma de cursos online Privados"],
        "Antiguo alumno": []

      },
      "Web": {
        "Alumno": ["Portal de eventos"],
        "PAS": ["Analítica Web", "Emisión de certificados SSL", "Hosting: alojamiento de páginas web", "Portal de eventos", "Redirecciones web"],
        "PDI": ["Analítica Web", "Emisión de certificados SSL", "Hosting: alojamiento de páginas web", "Portal de eventos", "Redirecciones web"],
        "Antiguo alumno": ["Portal de eventos"]
      },
    },
    felicitaciones: [
      "Archivo Universitario",
      "Asesoría Jurídica",
      "Biblioteca",
      "Centro de Información",
      "Departamentos docentes",
      "Inspección de Servicios",
      "Oficina de Gestión de Infraestructuras y Mantenimiento",
      "Servicio de Administración",
      "Servicios Informáticos",
      "Servicio de Documentación",
      "Servicio de Imprenta",
      "Servicio de Cafetería",
      "Toda la Universidad",
    ]
  }
}
