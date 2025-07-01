import { connectDB } from '@/lib/mongo';
import Cliente from '@/models/Cliente';
import { verifyToken } from '@/utils/auth';

export async function GET(req) {
  await connectDB();

  const token = req.headers.get('authorization')?.split(' ')[1];
  const user = verifyToken(token);
  if (!user) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const userId = user.userId;

  // Total clientes
  const totalClientes = await Cliente.countDocuments({ createdBy: userId });

  // Clientes con créditos
  const clientesConCreditos = await Cliente.countDocuments({
    createdBy: userId,
    creditos: { $exists: true, $not: { $size: 0 } }
  });

  // Pensionados
  const pensionados = await Cliente.countDocuments({
    createdBy: userId,
    tipoRetiro: 'Pensionado'
  });

  // Jubilados
  const jubilados = await Cliente.countDocuments({
    createdBy: userId,
    tipoRetiro: 'Jubilado'
  });

  // Renovables
  const hoy = new Date();
  const clientes = await Cliente.find({ createdBy: userId });
  const renovables = clientes.filter(cliente =>
    cliente.creditos.some(credito => {
      const fecha = new Date(credito.fechaPrimerDescuento);
      if (credito.tipo === 'Domiciliado') fecha.setMonth(fecha.getMonth() + 6);
      if (credito.tipo === 'Nomina') fecha.setFullYear(fecha.getFullYear() + 2);
      return fecha <= hoy;
    })
  );

  return Response.json({
    totalClientes,
    clientesConCreditos,
    pensionados,
    jubilados,
    renovables: renovables.length
  });
}
