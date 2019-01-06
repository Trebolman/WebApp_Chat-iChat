"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    agregar(usuario) {
        this.lista.push(usuario);
        console.log("[UsuarioLista|agregar] Usuario agregado");
        console.log("[UsuarioLista|agregar] Nueva lista de Usuarios => ", this.lista);
    }
    getLista() {
        return this.lista;
    }
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                console.log("[UsuarioLista|actualizarNombre] Modificando de: ", usuario.nombre);
                usuario.nombre = nombre;
                console.log("[UsuarioLista|actualizarNombre] a: ", usuario.nombre);
                break;
            }
        }
        console.log("[UsuarioLista|actualizarNombre] Nueva lista de Usuarios => ", this.lista);
    }
    getUsuario(id) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                return usuario;
            }
        }
        console.log("[UsuarioLista|getUsuario] No se encontró al usuario con ID => ", id);
    }
    borrarUsuario(id) {
        this.lista = this.lista.filter((usuario) => {
            if (usuario.id !== id) {
                return usuario;
            }
        });
        console.log("[UsuarioLista|borrarUsuario] Usuario borrado");
        console.log("[UsuarioLista|borrarUsuario] Nueva lista de Usuarios => ", this.lista);
    }
}
exports.UsuariosLista = UsuariosLista;
