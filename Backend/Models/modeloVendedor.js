import mongoose from "mongoose";

const Schema = mongoose.Schema

const EsquemaVendedor = new Schema({

    identificacion: {
        required: true,
        type: Number
    },

    nombre: {
        required: true,
        type: String
    },

    apellido: {
        required: true,
        type: String
    },

    correo: {
        required: true,
        type: String
    },

    password: {
        required: true,
        type: String
    },

    totalComision: {
        type: Number
    }
})

export const modeloVendedor = mongoose.model('Vendedores', EsquemaVendedor)