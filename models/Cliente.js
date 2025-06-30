import mongoose from 'mongoose';

const creditoSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['Domiciliado', 'Nomina'], required: true },
  fechaVenta: { type: Date, required: true },
  fechaPrimerDescuento: { type: Date, required: true },
  plazo: { type: Number, required: true },
  financiera: {type: String, require:true}
});

const clienteSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  telefono: String,
  convenios: [String],
  creditos: [creditoSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.models.Cliente || mongoose.model('Cliente', clienteSchema);
