//inserccion a la coleccion roles
use("inventario_ventas")

db.roles.insertMany([
  {
    nombre: "Administrador",
    descripcion: "Acceso total a todos los módulos y configuraciones del sistema.",
    permisos: ["usuarios", "roles", "categorias", "productos", "clientes", "ventas", "reportes"],
    estado: true,
    creado_en: new Date()
  },
  {
    nombre: "Vendedor",
    descripcion: "Acceso exclusivo para facturación, clientes y visualización de inventario.",
    permisos: ["ventas", "clientes", "productos_ver"],
    estado: true,
    creado_en: new Date()
  },
  {
    nombre: "Consultor",
    descripcion: "Acceso de solo lectura para auditoría y generación de reportes.",
    permisos: ["ventas_ver", "productos_ver", "clientes_ver", "reportes"],
    estado: true,
    creado_en: new Date()
  }
]);

//inserccion a la coleccion usuario
use("inventario_ventas");

db.usuarios.insertMany([
  {
    nombre_completo: "Erick Herrera",
    correo: "admin@empresa.com",
    password_hash: "Admin123456",
    id_rol: db.roles.findOne({ nombre: "Administrador" })._id, // este viene siendo el campo que consultara a la tabla roles que roles obtendra este usuario
    estado: true
  },
  {
    nombre_completo: "Brayant Sosa",
    correo: "ventas@empresa.com",
    password_hash: "Ventas123456",
    id_rol: db.roles.findOne({ nombre: "Vendedor" })._id,
    estado: true
  },
  {
    nombre_completo: "Edenilson Escamilla",
    correo: "auditor@empresa.com",
    password_hash: "Auditor123456",
    id_rol: db.roles.findOne({ nombre: "Consultor" })._id,
    estado: true
  }
]);


//inserccion a la colleccion clientes
use("inventario_ventas");

db.clientes.insertMany([
  {
    nombre_completo: "Carlos Antonio Mendoza",
    correo: "carlos.mendoza@gmail.com",
    telefono: "7123-4567",
    direccion: {
      sector: "Barrio El Convento",
      ciudad: "Santa Rosa de Lima",
      departamento: "La Unión"
    },
    estado: true,
    creado_en: new Date()
  },
  {
    nombre_completo: "Glenda María Benítez",
    correo: "glenda.benitez@gmail.com",
    telefono: "6098-7654",
    direccion: {
      sector: "Colonia Ventura Perla, Calle Principal #12",
      ciudad: "Santa Rosa de Lima",
      departamento: "La Unión"
    },
    estado: true,
    creado_en: new Date()
  }
]);

//inserccion a la colleccion categorias
use("inventario_ventas");

db.categorias.insertMany([
  {
    nombre: "Laptops y Computadoras",
    description: "Equipos portátiles y de escritorio para uso general y alto rendimiento.",
    estado: true,
    creado_en: new Date()
  },
  {
    nombre: "Smartphones y Telefonía",
    description: "Teléfonos móviles, accesorios y dispositivos de comunicación.",
    estado: true,
    creado_en: new Date()
  }
]);


//inserccion a la colleccion productos
use("inventario_ventas");

db.productos.insertMany([
  {
    codigo: "LAP-MAC-AIR",
    nombre: "MacBook Air M2",
    descripcion: "Laptop ultraligera de 13.6 pulgadas, chip M2 de Apple, 8GB RAM, 256GB SSD.",
    id_categoria: db.categorias.findOne({ nombre: "Laptops y Computadoras" })._id, 
    precio: 1099.00,
    stock: NumberInt(15), 
    estado: true,
    creado_en: new Date()
  },
  {
    codigo: "CEL-IPH-15",
    nombre: "iPhone 15 Pro",
    descripcion: "Smartphone con chasis de titanio, chip A17 Pro, cámara de 48MP y 256GB de almacenamiento.",
    id_categoria: db.categorias.findOne({ nombre: "Smartphones y Telefonía" })._id,
    precio: 1199.00,
    stock: NumberInt(25), 
    estado: true,
    creado_en: new Date()
  }
]);


//realizacion de una venta
use("inventario_ventas");

// 1. Obtenemos los documentos reales para extraer sus IDs
const cliente = db.clientes.findOne({ nombre_completo: "Carlos Antonio Mendoza" });
const vendedor = db.usuarios.findOne({ correo: "ventas@empresa.com" });
const macbook = db.productos.findOne({ codigo: "LAP-MAC-AIR" });
const iphone = db.productos.findOne({ codigo: "CEL-IPH-15" });

// 2. Definimos las cantidades a vender
const cantMac = 1;
const cantIphone = 2;

// 3. Cálculos matemáticos
const subtotalMac = macbook.precio * cantMac;
const subtotalIphone = iphone.precio * cantIphone;
const subtotalFactura = subtotalMac + subtotalIphone;

// Calculamos el IVA al 13%
const ivaFactura = subtotalFactura * 0.13; 
const totalFactura = subtotalFactura + ivaFactura;

// Inserción de la venta
db.ventas.insertOne({
  id_cliente: cliente._id,
  id_usuario: vendedor._id,
  detalle_ventas: [
    {
      id_producto: macbook._id,
      codigo: macbook.codigo,
      nombre: macbook.nombre,
      cantidad: NumberInt(cantMac),
      precio_unitario: macbook.precio,
      subtotal_linea: subtotalMac
    },
    {
      id_producto: iphone._id,
      codigo: iphone.codigo,
      nombre: iphone.nombre,
      cantidad: NumberInt(cantIphone),
      precio_unitario: iphone.precio,
      subtotal_linea: subtotalIphone
    }
  ],
  subtotal: subtotalFactura,
  iva: ivaFactura,
  total: totalFactura,
  estado: "completada",
  fecha: new Date()
});




