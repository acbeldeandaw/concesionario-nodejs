const mongoose = require('mongoose');
const AutomovilSchema = mongoose.Schema({
        categoria: {
            type: String,
            required: [true, 'La categoria es obligatoria']
        },
        precio: {
            type: Number,
            required: [true, 'El precio es obligatorio']
        },
        marca: {
            type: String,
            required: [true, 'La marca es obligatoria']
        },
        modelo: {
            type: String,
            required: [true, 'El modelo es obligatorio']
        },
        fab: {
            type: Number,
            required: [true, 'El año es obligatorio']
        },
        foto: {
            type: String,
            required: [true, 'La foto es obligatoria']
        },
    })
    //sobreescribimos un método del Schema para modificar el objeto que exporta
AutomovilSchema.methods.toJSON = function() {
    const { _id, ...automovil } = this.toObject();
    automovil.id = _id;
    return automovil;
}

let Automovil = mongoose.model('Automovil', AutomovilSchema);
module.exports = Automovil;