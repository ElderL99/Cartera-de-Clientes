import { connectDB } from '@/lib/mongo';
import Cliente from '@/models/Cliente';
import { verifyToken } from '@/utils/auth';

export async function POST(req, { params }) {
  await connectDB();

  const token = req.headers.get('authorization')?.split(' ')[1];
  const user = verifyToken(token);
  if (!user) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await req.json();

  try {
    const cliente = await Cliente.findOneAndUpdate(
      { _id: params.id, createdBy: user.userId },
      { $push: { creditos: body } },
      { new: true }
    );

    if (!cliente) {
      return Response.json({ error: 'Cliente no encontrado o no autorizado' }, { status: 404 });
    }

    return Response.json({ message: 'Crédito agregado', cliente }, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Error al agregar crédito' }, { status: 500 });
  }
}
