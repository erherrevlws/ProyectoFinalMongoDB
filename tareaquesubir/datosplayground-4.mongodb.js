// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("inventario_ventas");

db.categorias.insertMany([
  {
    _id: ObjectId("600000000000000000000001"),
    nombre: "Calzado Deportivo",
    descripcion: "Zapatillas para correr o entrenamiento",
    estado: true,
    creado_en: new Date()
  },
  {
    _id: ObjectId("600000000000000000000002"),
    nombre: "Calzado Formal",
    descripcion: "Zapatos de vestir y Zapatillas de cuero",
    estado: true,
    creado_en: new Date()
  },
  {
    _id: ObjectId("600000000000000000000003"),
    nombre: "Calzado Urbano/Casual",
    descripcion: "Tenis casuales, sandalias y botas de uso diario",
    estado: true,
    creado_en: new Date()
  }
]);

use("inventario_ventas");

db.productos.insertMany([
  {
    _id: ObjectId("700000000000000000000001"),
    codigo: "ZAP-DEP-001",
    nombre: "Zapatillas Running Speed Pro",
    descripcion: "Amortiguacion avanzada para corredores",
    id_categoria: ObjectId("600000000000000000000001"),
    precio: 85.00,
    stock: 25,
    stock_minimo: 5,
    estado: true,
    creado_en: new Date(),
    actualizado_en: new Date()
  },
  {
    _id: ObjectId("700000000000000000000002"),
    codigo: "ZAP-FOR-002",
    nombre: "Zapatillas  Oxford Piel",
    descripcion: "Zapatos formales de cuero genuino",
    id_categoria: ObjectId("600000000000000000000002"),
    precio: 110.00,
    stock: 4,
    stock_minimo: 5,
    estado: true,
    creado_en: new Date(),
    actualizado_en: new Date()
  },
  {
    _id: ObjectId("700000000000000000000003"),
    codigo: "ZAP-URB-003",
    nombre: "Tenis Blancos Streetwear",
    descripcion: "Estilo casual urbano con suela de goma",
    id_categoria: ObjectId("600000000000000000000003"),
    precio: 55.00,
    stock: 40,
    stock_minimo: 10,
    estado: true,
    creado_en: new Date(),
    actualizado_en: new Date()
  }
]);

use("inventario_ventas");
db.clientes.insertMany([
  {
    _id: ObjectId('6a2c805fec18b9edae76f444'),
    nombre_completo: 'Carlos Antonio Mendoza',
    correo: 'carlos.mendoza@gmail.com',
    telefono: '7123-4567',
    direccion: {
      sector: 'Barrio El Convento',
      ciudad: 'Santa Rosa de Lima',
      departamento: 'La Unión'
    },
    estado: true,
    creado_en: ISODate('2026-06-12T21:55:43.657Z')
  },
  {
    _id: ObjectId('6a2c805fec18b9edae76f555'),
    nombre_completo: 'Gabriela María Sosa',
    correo: 'gabriela.sosa@gmail.com',
    telefono: '2661-3399',
    direccion: {
      sector: 'Barrio El Centro',
      ciudad: 'San Miguel',
      departamento: 'San Miguel'
    },
    estado: true,
    creado_en: ISODate('2026-06-14T10:30:00.000Z')
  },
  {
    _id: ObjectId('6a2c805fec18b9edae76f666'),
    nombre_completo: 'Carlos René Martínez',
    correo: 'carlos.martinez@gmail.com',
    telefono: '7522-8844',
    direccion: {
      sector: 'Colonia Escalón',
      ciudad: 'San Salvador',
      departamento: 'San Salvador'
    },
    estado: true,
    creado_en: ISODate('2026-06-14T11:15:00.000Z')
  }
]);

use("inventario_ventas");
db.ventas.insertMany([
  {

    id_cliente: ObjectId('6a2c805fec18b9edae76f444'),
    id_usuario: ObjectId('900000000000000000000001'),
    detalle_ventas: [
      {
        id_producto: ObjectId('700000000000000000000001'),
        codigo: 'ZAP-DEP-001',
        nombre: 'Zapatillas Running Speed Pro',
        cantidad: 1,
        precio_unitario: 85.00,
        subtotal_linea: 85.00
      },
      {
        id_producto: ObjectId('700000000000000000000003'),
        codigo: 'ZAP-URB-003',
        nombre: 'Tenis Blancos Streetwear',
        cantidad: 2,
        precio_unitario: 55.00,
        subtotal_linea: 110.00
      }
    ],
    subtotal: 195.00,
    iva: 25.35,
    total: 220.35,
    estado: 'completada',
    fecha: ISODate('2026-06-14T14:10:00.000Z'),
    comprobante_nro: 'FAC-0002'
  },
  {
  
    id_cliente: ObjectId('6a2c805fec18b9edae76f555'),
    id_usuario: ObjectId('900000000000000000000001'),
    detalle_ventas: [
      {
        id_producto: ObjectId('700000000000000000000002'),
        codigo: 'ZAP-FOR-002',
        nombre: 'Zapatillas  Oxford Piel',
        cantidad: 1,
        precio_unitario: 110.00,
        subtotal_linea: 110.00
      }
    ],
    subtotal: 110.00,
    iva: 14.30,
    total: 124.30,
    estado: 'completada',
    fecha: ISODate('2026-06-14T14:25:00.000Z'),
    comprobante_nro: 'FAC-0003'
  }
]);

use("inventario_ventas");
// Consulta 1: Listar todas las categorías de calzado que se encuentran activas
db.categorias.find({ estado: true });

// Consulta 2: Buscar un producto específico mediante su código de inventario
db.productos.find({ codigo: "ZAP-DEP-001" });

// Consulta 3: Mostrar todas las ventas registradas con el estado de "completada"
db.ventas.find({ estado: "completada" });

// Consulta 1: Productos cuyo precio unitario sea mayor o igual a $85.00 ($gte)
db.productos.find({ precio: { $gte: 85.00 } });

// Consulta 2: Productos cuyo stock en inventario sea menor o igual a 10 unidades ($lte)
db.productos.find({ stock: { $lte: 10 } });

// Consulta 3: Ventas cuyo monto total cobrado sea estrictamente superior a $200.00 ($gt)
db.ventas.find({ total: { $gt: 200.00 } });


// Consulta 1: Productos activos cuyo precio sea menor a $100.00 ($and)
db.productos.find({ $and: [ { estado: true }, { precio: { $lt: 100.00 } } ] });

// Consulta 2: Clientes ubicados en la ciudad de 'Santa Rosa de Lima' O en 'San Miguel' ($or)
db.clientes.find({ $or: [ { "direccion.ciudad": "Santa Rosa de Lima" }, { "direccion.ciudad": "San Miguel" } ] });

// Consulta 3: Filtrar ventas cuyo estado actual NO sea igual a "anulada" ($ne)
db.ventas.find({ estado: { $ne: "anulada" } });



// Consulta 1: Mostrar solo el codigo, nombre y precio de los productos (ocultando el _id)
db.productos.find({}, { codigo: 1, nombre: 1, precio: 1, _id: 0 });

// Consulta 2: Obtener únicamente el nombre completo y el correo de todos los clientes
db.clientes.find({}, { nombre_completo: 1, correo: 1, _id: 0 });

// Consulta 3: Listar el número de comprobante y el total de las ventas ejecutadas
db.ventas.find({}, { comprobante_nro: 1, total: 1, _id: 0 });



// Consulta 1: Listar los productos ordenados por precio de mayor a menor (descendente)
db.productos.find({}).sort({ precio: -1 });

// Consulta 2: Listar los clientes ordenados alfabeticamente por su nombre (ascendente)
db.clientes.find({}).sort({ nombre_completo: 1 });


// Consulta 1: Obtener los 2 productos mas economicos del catalogo de calzado
db.productos.find({}).sort({ precio: 1 }).limit(2);

// Consulta 2: Obtener la ultima venta que ha sido registrada en el sistema
db.ventas.find({}).sort({ fecha: -1 }).limit(1);



// Consulta 1: Buscar clientes que residan específicamente en el 'Barrio El Convento'
db.clientes.find({ "direccion.sector": "Barrio El Convento" });

// Consulta 2: Filtrar todos los clientes que pertenecen al departamento de 'La Unión'
db.clientes.find({ "direccion.departamento": "La Unión" });



// Consulta 1: Buscar las ventas que incluyan el ID del producto 'Zapatillas Running'
db.ventas.find({ "detalle_ventas.id_producto": ObjectId("700000000000000000000001") });

// Consulta 2: Filtrar ventas donde se hayan comprado 2 o mas unidades en una sola linea
db.ventas.find({ "detalle_ventas.cantidad": { $gte: 2 } });





// Pipeline 1: Reporte de los Clientes Top
use("inventario_ventas");
db.ventas.aggregate([
  { $match: { estado: "completada" } },
  { $group: { _id: "$id_cliente", totalGastado: { $sum: "$total" }, facturas: { $sum: 1 } } }, // $sum acumula el dinero total y suma 1 por cada factura
  { $lookup: { from: "clientes", localField: "_id", foreignField: "_id", as: "info_cliente" } }, // Cruza el _id agrupado con la colección clientes
  { $sort: { totalGastado: -1 } },
  { $limit: 3 }
]);

// Pipeline 2: Rendimiento del Inventario por Categoría
use("inventario_ventas");
db.productos.aggregate([
  { $match: { estado: true } },
  { $group: { _id: "$id_categoria", stockTotal: { $sum: "$stock" }, precioProm: { $avg: "$precio" } } }, // $avg saca automáticamente el promedio matemático del precio
  { $lookup: { from: "categorias", localField: "_id", foreignField: "_id", as: "info_categoria" } },
  { $sort: { stockTotal: -1 } },
  { $limit: 3 }
]);

// Pipeline 3: Auditoría de Ventas por Vendedor
use("inventario_ventas");
db.ventas.aggregate([
  { $match: { total: { $gt: 0 } } },
  { $group: { _id: "$id_usuario", totalRecaudado: { $sum: "$subtotal" }, emitidas: { $sum: 1 } } },
  { $lookup: { from: "usuarios", localField: "_id", foreignField: "_id", as: "info_usuario" } }, // Trae los datos del vendedor desde la colección usuarios
  { $sort: { totalRecaudado: -1 } },
  { $limit: 5 }
]);

// Pipeline 4: AnAlisis GeogrAfico de Ventas
use("inventario_ventas");
db.clientes.aggregate([
  { $match: { estado: true } },
  { $lookup: { from: "ventas", localField: "_id", foreignField: "id_cliente", as: "historial" } }, // Mete todas las compras del cliente juntas dentro del arreglo "historial"
  { $group: { _id: "$direccion.departamento", totalVentasDep: { $sum: { $size: "$historial" } } } }, // $size cuenta cuantas compras hay exactamente dentro de ese arreglo
  { $sort: { totalVentasDep: -1 } },
  { $limit: 5 }
]);

// Pipeline 5: Analisis de Variedad de Productos
use("inventario_ventas");
db.productos.aggregate([
  { $match: { estado: true } },
  { $lookup: { from: "categorias", localField: "id_categoria", foreignField: "_id", as: "categoria_doc" } }, // Cruzamos primero para tener disponible el nombre real de la categoría
  { $group: { _id: "$categoria_doc.nombre", variedad: { $sum: 1 }, stockMinimo: { $min: "$stock" } } }, // $min escanea y te devuelve el número más bajo de stock de ese grupo
  { $sort: { variedad: -1 } },
  { $limit: 5 }
]);