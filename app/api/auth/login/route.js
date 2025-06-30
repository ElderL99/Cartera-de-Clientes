import { connectDB } from '@/lib/mongo';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  await connectDB();

  const { email, password } = await request.json();

  if (!email || !password) {
    return Response.json({ error: 'Faltan campos' }, { status: 400 });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return Response.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return Response.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return Response.json({ token }, { status: 200 });
}
