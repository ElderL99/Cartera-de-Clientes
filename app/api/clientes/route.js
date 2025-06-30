import { connectDB } from '@/lib/mongo';
import Cliente from '@/models/Cliente';
import { verifyToken } from '@/utils/auth';

// 👁️ GET: Listar clientes (con filtros)
export async function GET(req) {
  await connectDB();

  const token = req.headers.get('authorization')?.split(' ')[1];
  const user = verifyToken(token);
  if (!user) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const nombre = searchParams.get('nombre');
  const tipo = searchParams.get('tipo');
  const convenio = searchParams.get('convenio');
  const financiera = searchParams.get('financiera');

  const query = { createdBy: user.userId };

  if (nombre) {
    query.nombre = { $regex: nombre, $options: 'i' };
  }

  if (convenio) {
    query.convenios = convenio;
  }

  if (tipo || financiera) {
    query.creditos = {
      $elemMatch: {}
    };

    if (tipo) query.creditos.$elemMatch.tipo = tipo;
    if (financiera) query.creditos.$elemMatch.financiera = financiera;
  }

  const clientes = await Cliente.find(query);

  return Response.json(clientes, { status: 200 });
}

// 📝 POST: Crear nuevo cliente
export async function POST(req) {
  await connectDB();

  const token = req.headers.get('authorization')?.split(' ')[1];
  const user = verifyToken(token);
  if (!user) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await req.json();

  try {
    const nuevoCliente = new Cliente({
      ...body,
      createdBy: user.userId
    });

    await nuevoCliente.save();

    return Response.json({ message: 'Cliente creado', cliente: nuevoCliente }, { status: 201 });
  } catch (err) {
    return Response.json({ error: 'Error al crear cliente' }, { status: 500 });
  }
}
