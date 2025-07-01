// 🔐 Login
export async function login(email, password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return await res.json();
}
// 🧾 Registrar cliente
export async function crearCliente(token, clienteData) {
  const res = await fetch('/api/clientes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(clienteData)
  });
  return await res.json();
}

// 📋 Obtener todos los clientes (con filtros opcionales)
export async function getClientes(token, filtros = {}) {
  const params = new URLSearchParams(filtros).toString();
  const res = await fetch(`/api/clientes?${params}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await res.json();
}

// 🔍 Obtener cliente por ID
export async function getClienteById(token, id) {
  const res = await fetch(`/api/clientes/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await res.json();
}

// 🔁 Obtener clientes renovables
export async function getRenovables(token) {
  const res = await fetch('/api/clientes/renovables', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await res.json();
}

// ➕ Agregar crédito
export async function agregarCredito(token, clienteId, creditoData) {
  const res = await fetch(`/api/clientes/${clienteId}/add-credito`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(creditoData)
  });
  return await res.json();
}

// ✏️ Editar crédito
export async function editarCredito(token, clienteId, creditoId, data) {
  const res = await fetch(`/api/clientes/${clienteId}/creditos/${creditoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return await res.json();
}

// ❌ Eliminar crédito
export async function eliminarCredito(token, clienteId, creditoId) {
  const res = await fetch(`/api/clientes/${clienteId}/creditos/${creditoId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await res.json();
}
