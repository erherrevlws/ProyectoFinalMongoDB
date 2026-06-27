//usuarios
use("inventario_ventas");

db.usuarios.insertMany([
  {
    _id: ObjectId('6a2c7d726f92884295b04cec'),
    nombre_completo: 'Erick Herrera',
    correo: 'admin@empresa.com',
    password_hash: 'Admin123456',
    id_rol: ObjectId('6a2c4f21071c5df88b9abbd9'),
    estado: true
  },
  {
    _id: ObjectId('6a2c7d726f92884295b04ced'),
    nombre_completo: 'Brayant Sosa',
    correo: 'ventas@empresa.com',
    password_hash: 'Ventas123456',
    id_rol: ObjectId('6a2c4f21071c5df88b9abbda'),
    estado: true
  },
  {
    _id: ObjectId('6a2c7d726f92884295b04cee'),
    nombre_completo: 'Edenilson Escamilla',
    correo: 'auditor@empresa.com',
    password_hash: 'Auditor123456',
    id_rol: ObjectId('6a2c4f21071c5df88b9abbdb'),
    estado: true
  }
])



//roles
use("inventario_ventas");

db.createRole({
   role: "permisos_vendedor",
   privileges: [
      { resource: { db: "inventario_ventas", collection: "ventas" }, actions: [ "find", "insert", "update" ] },
      { resource: { db: "inventario_ventas", collection: "clientes" }, actions: [ "find", "insert", "update" ] },
      { resource: { db: "inventario_ventas", collection: "productos" }, actions: [ "find" ] } 
   ],
   roles: []
});

//  Consultor (Solo reportes)
db.createRole({
   role: "permisos_consultor",
   privileges: [
      { resource: { db: "inventario_ventas", collection: "ventas" }, actions: [ "find" ] },
      { resource: { db: "inventario_ventas", collection: "productos" }, actions: [ "find" ] },
      { resource: { db: "inventario_ventas", collection: "clientes" }, actions: [ "find" ] }
   ],
   roles: []
});

// Administrador (Control total de la BD)
db.createRole({
   role: "permisos_administrador",
   privileges: [
      { resource: { db: "inventario_ventas", collection: "" }, actions: [ "find", "insert", "update", "remove", "createCollection", "dropCollection", "createIndex" ] }
   ],
   roles: []
});

// Creación de usuarios del motor de base de datos con sus permisos asignados
db.createUser({ user: "ErickAdmin", pwd: "AdminPassword123", roles: [ { role: "permisos_administrador", db: "inventario_ventas" } ] });
db.createUser({ user: "BrayantVentas", pwd: "VentasPassword123", roles: [ { role: "permisos_vendedor", db: "inventario_ventas" } ] });
db.createUser({ user: "EdenilsonAuditor", pwd: "AuditorPassword123", roles: [ { role: "permisos_consultor", db: "inventario_ventas" } ] });
