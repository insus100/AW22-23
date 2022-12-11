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
                modal: {
                  "editable":false,
                  "type":"text"
                }
              },
              {
                data: "tipo",//nombre de la columna en la base de datos
                name: "Tipo",//nombre que saldrá en la cabeza de la tabla
                roles: [0, 1],
                modal: {
                  "editable":false,
                  "type":"text"
                }
              },
              {
                data: "texto",//nombre de la columna en la base de datos
                name: "Texto",//nombre que saldrá en la cabeza de la tabla
                roles: [0, 1],
                modal: {
                  "editable":false,
                  "type":"text"
                }
              },
              {
                  data: "comentario",//nombre de la columna en la base de datos
                  name: "Comentario",//nombre que saldrá en la cabeza de la tabla
                  show: false,//va en el modal, no en la tabla
                  roles: [0, 1],
                  modal: {
                    "editable":false,
                    "type":"text"
                  }
              },
              {
                  data: "tecnico",//nombre de la columna en la base de datos
                  name: "Técnico",//nombre que saldrá en la cabeza de la tabla
                  roles: [0],
                  modal: {
                    "editable":false,
                    "type":"text"
                  }
              },
              {
                  data: "acciones",//nombre de la columna en la base de datos
                  name: "Acciones",//nombre que saldrá en la cabeza de la tabla
                  roles: [1],
                  render: "accionesTecnico",
                  modal: {
                    "editable":false,
                    "type":"text"
                  }
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
                    modal: {
                      "editable":false,
                      "type":"text"
                    }
                },
                {
                    data: "fecha",//nombre de la columna en la base de datos
                    name: "Fecha",//nombre que saldrá en la cabeza de la tabla
                    roles: [0, 1],
                    render: "date",
                    modal: {
                      "editable":false,
                      "type":"text"
                    }
                },
                {
                    data: "texto",//nombre de la columna en la base de datos
                    name: "Texto",//nombre que saldrá en la cabeza de la tabla
                    roles: [0, 1],
                    modal: {
                      "editable":false,
                      "type":"text"
                    }
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
                  modal: {
                    "editable":false,
                    "type":"text"
                  }
              },
              {
                  data: "fecha",//nombre de la columna en la base de datos
                  name: "Fecha",//nombre que saldrá en la cabeza de la tabla
                  roles: [1],
                  render: "date",
                  modal: {
                    "editable":false,
                    "type":"text"
                  }
              },
              {
                  data: "texto",//nombre de la columna en la base de datos
                  name: "Texto",//nombre que saldrá en la cabeza de la tabla
                  roles: [1],
                  modal: {
                    "editable":false,
                    "type":"text"
                  }
              },
              {
                data: "acciones",//nombre de la columna en la base de datos
                name: "Acciones",//nombre que saldrá en la cabeza de la tabla
                roles: [1],
                render: "accionesEntrantes",
                modal: {
                  "editable":false,
                  "type":"text"
                }
            },
            {
              data: "tecnicoId",//nombre de la columna en la base de datos
              name: "Técnico",//nombre que saldrá en la cabeza de la tabla
              roles: [1],
              show: false,
              modal: {
                "editable":false,
                "type":"text"
              }
          },
          ]
        },
        usuarios: {//gestion de usuarios
            minRole: 1
        }
    }
}
