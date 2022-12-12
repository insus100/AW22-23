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
              {
                  data: "acciones",//nombre de la columna en la base de datos
                  name: "Acciones",//nombre que saldrá en la cabeza de la tabla
                  roles: [1],
                  render: "accionesTecnico",
              },
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
    }
}
