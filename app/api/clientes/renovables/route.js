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

  const hoy = new Date();
  const clientes = await Cliente.find({ createdBy: user.userId });

  const renovables = clientes.filter(cliente => {
    return cliente.creditos.some(credito => {
      const fecha = new Date(credito.fechaPrimerDescuento);

      if (credito.tipo === 'Domiciliado') {
        fecha.setMonth(fecha.getMonth() + 6);
      } else if (credito.tipo === 'Nomina') {
        fecha.setFullYear(fecha.getFullYear() + 2);
      } else {
        return false;
      }

      return fecha <= hoy;
    });
  });

  return Response.json({ clientes: renovables }, { status: 200 });
}
