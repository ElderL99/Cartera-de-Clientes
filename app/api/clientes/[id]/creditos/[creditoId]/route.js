import { connectDB } from '@/lib/mongo';
import Cliente from '@/models/Cliente';
import { verifyToken } from '@/utils/auth';

export async function PUT(req, { params }) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  const user = verifyToken(token);
  if (!user) return Response.json({ error: 'No autorizado' }, { status: 401 });

  const body = await req.json();

  try {
    const cliente = await Cliente.findOne({
      _id: params.id,
      createdBy: user.userId
    });

    if (!cliente) {
      return Response.json({ error: 'Cliente no encontrado' }, { status: 404 });
    }

    const index = cliente.creditos.findIndex(
      (c) => c._id.toString() === params.creditoId
    );

    if (index === -1) {
      return Response.json({ error: 'Crédito no encontrado' }, { status: 404 });
    }

    // Actualizar el crédito específico
    cliente.creditos[index] = {
      ...cliente.creditos[index].toObject(),
      ...body,
    };

    await cliente.save();

    return Response.json({ message: 'Crédito actualizado', cliente }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Error al actualizar crédito' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const token = req.headers.get('authorization')?.split(' ')[1];
  const user = verifyToken(token);
  if (!user) return Response.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const cliente = await Cliente.findOne({
      _id: params.id,
      createdBy: user.userId
    });

    if (!cliente) {
      return Response.json({ error: 'Cliente no encontrado' }, { status: 404 });
    }

    // Filtrar fuera el crédito que quieres eliminar
    cliente.creditos = cliente.creditos.filter(
      (c) => c._id.toString() !== params.creditoId
    );

    await cliente.save();

    return Response.json({ message: 'Crédito eliminado', cliente }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Error al eliminar crédito' }, { status: 500 });
  }
}
