# 🧾 CRM de Clientes - Portal de Cartera

Un sistema web de cartera de clientes con autenticación y gestión de créditos para entidades como Pemex, IMSS, Gobierno CDMX, entre otros.

---

## 🚀 Tecnologías usadas

- **Next.js 14 (App Router + Server Actions)**
- **MongoDB** + Mongoose
- **JWT para autenticación**
- **TailwindCSS** (modo oscuro)
- **Recharts** (para gráficas del dashboard)
- **Cookies + LocalStorage** (manejo de sesión)

---

## 📦 Instalación

1. Clonar el proyecto:

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio


Instalar dependencias:

bash
Copiar
Editar
npm install
Crear archivo .env.local:

env
Copiar
Editar
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/mi_crm
JWT_SECRET=una_clave_secreta_segura
Iniciar el servidor:

bash
Copiar
Editar
npm run dev


🔐 Autenticación
Login con email y contraseña

Token guardado en LocalStorage y Cookie

Redirección automática si el token se borra o expira

Rutas privadas protegidas por PrivateLayout

👥 Gestión de Clientes
Campos del cliente:
Nombre

Dirección

Teléfono

Convenios múltiples

Tipo de retiro: Pensionado | Jubilado

Créditos (múltiples)

Filtros:
🔍 Buscar por nombre

📑 Filtrar por tipo de crédito: Domiciliado / Nómina

📎 Filtrar por convenio (Pemex, IMSS, GEM, etc.)

💳 Créditos
Cada cliente puede tener múltiples créditos.

Campos de un crédito:

Tipo: Domiciliado / Nómina

Fecha de venta

Fecha primer descuento

Plazo

Financiera

Se pueden editar y eliminar créditos

Créditos renovables:

Domiciliados a los 6 meses

Nómina a los 2 años

📊 Dashboard
Total de clientes

Clientes con créditos

Clientes renovables

Pensionados

Jubilados

Incluye gráficas profesionales con Recharts

📁 Estructura de carpetas
bash
Copiar
Editar
/app
  /dashboard
    /clientes
    /[clienteId]
    layout.jsx
  /login
  /register
  /api
    /clientes
    /auth
/components
/hooks
/lib
/models
/utils
✅ Pendiente / Mejoras futuras
Exportar datos a PDF/Excel

Roles de usuarios (admin / user)

Subida de documentos por cliente

Notificaciones de renovación próximas

👤 Desarrollado por
Adán @LugoCabral
💡 Proyecto personal con enfoque real en cartera de clientes con filtros, seguridad y claridad visual.
