import { connectDB } from '@/lib/mongo';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  await connectDB();

  const { email, password } = await request.json();

  if (!email || !password) {
    return Response.json({ error: 'Faltan campos' }, { status: 400 });
  }

  const existe = await User.findOne({ email });

  if (existe) {
    return Response.json({ error: 'El usuario ya existe' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  return Response.json({ message: 'Usuario registrado correctamente' }, { status: 201 });
}
