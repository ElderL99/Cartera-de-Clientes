import { connectDB } from '@/lib/mongo';
import Cliente from '@/models/Cliente';
import { verifyToken } from '@/utils/auth';


// GET → Ver un cliente por su ID
export async function GET(req, context) {
  const { params } = context; // ✅ destructura correctamente
  const id =  params.id;

  const token = req.headers.get('authorization')?.split(' ')[1];
  const user = verifyToken(token);
  if (!user) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  await connectDB();

  try {
    const cliente = await Cliente.findOne({
      _id: id,
      createdBy: user.userId
    });

    if (!cliente) {
      return Response.json({ error: 'Cliente no encontrado' }, { status: 404 });
    }

    return Response.json({ cliente }, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'ID inválido' }, { status: 400 });
  }
}



// PUT → Actualizar cliente completo
export async function PUT(req, { params }) {
  await connectDB();

  const token = req.headers.get('authorization')?.split(' ')[1];
  const user = verifyToken(token);
  if (!user) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await req.json();

  try {
    const cliente = await Cliente.findOneAndUpdate(
      {
        _id: params.id,
        createdBy: user.userId
      },
      { $set: body },
      { new: true }
    );

    if (!cliente) {
      return Response.json({ error: 'Cliente no encontrado o no autorizado' }, { status: 404 });
    }

    return Response.json({ message: 'Cliente actualizado', cliente }, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Error al actualizar el cliente' }, { status: 500 });
  }
}
