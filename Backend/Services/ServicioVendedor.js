import { modeloVendedor } from '../Models/modeloVendedor.js'

export class ServicioVendedor {

    async buscarVendedores() {
        let vendedores = await modeloVendedor.find()
        return vendedores
    }

    async buscarVendedorPorId(id) {
        let vendedor = await modeloVendedor.findById(id)
        return vendedor
    }

    async agregarVendedorEnBD(datos) {
        let datosValidados = new modeloVendedor(datos)
        return await datosValidados.save()
    }

    async editarVendedor(id, datos) {
        return await modeloVendedor.findByIdAndUpdate(id, datos)
    }
}