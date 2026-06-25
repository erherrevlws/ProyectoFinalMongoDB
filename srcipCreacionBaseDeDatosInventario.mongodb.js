// Sistema de Control de Inventario y Ventas
// Base de datos: MongoDB
//



use("inventario_ventas");


db.createCollection("roles", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Validación de Roles",
      required: ["nombre", "descripcion", "permisos", "estado"],
      properties: {
        nombre: {
          bsonType: "string",
          minLength: 3,
          maxLength: 50,
          description: "Nombre del rol "
        },
        descripcion: {
          bsonType: "string",
          minLength: 5,
          description: "Descripción del rol "
        },
        permisos: {
          bsonType: "array",
          minItems: 1,
          description: "Módulos a los que tiene acceso — mínimo 1",
          items: {
            bsonType: "string"
          }
        },
        estado: {
          bsonType: "bool",
          description: "true = activo, false = inactivo "
        },
        creado_en: {
          bsonType: "date",
          description: "Fecha de creación del rol"
        }
      }
    }
  },
  validationAction: "error",
  validationLevel: "strict"
});

// COLECCIÓN: usuarios
// REFERENCIA a roles mediante id_rol 
db.createCollection("usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Validación de Usuarios",
      required: ["nombre_completo", "correo", "password_hash", "id_rol", "estado"],
      properties: {
        nombre_completo: {
          bsonType: "string",
          minLength: 3,
          maxLength: 100,
          description: "Nombre completo — obligatorio"
        },
        correo: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$",
          description: "Correo con formato válido"
        },
        password_hash: {
          bsonType: "string",
          minLength: 10,
          description: "Contraseña encriptada"
        },
        id_rol: {
          bsonType: "objectId",
          description: "REFERENCIA a roles._id"
        },
        estado: {
          bsonType: "bool",
          description: "true = activo, false = inactivo"
        },
        creado_en: {
          bsonType: "date",
          description: "Fecha de registro"
        },
        actualizado_en: {
          bsonType: "date",
          description: "Fecha de última actualización"
        }
      }
    }
  },
  validationAction: "error",
  validationLevel: "strict"
});

// 
// COLECCIÓN: categorias

db.createCollection("categorias", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Validación de Categorías",
      required: ["nombre", "estado"],
      properties: {
        nombre: {
          bsonType: "string",
          minLength: 2,
          maxLength: 80,
          description: "Nombre de la categoría"
        },
        descripcion: {
          bsonType: "string",
          description: "Descripción opcional"
        },
        estado: {
          bsonType: "bool",
          description: "true = activa, false = inactiva"
        },
        creado_en: {
          bsonType: "date",
          description: "Fecha de creación"
        }
      }
    }
  },
  validationAction: "error",
  validationLevel: "strict"
});

// COLECCIÓN: productos



db.createCollection("productos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Validación de Productos",
      required: ["codigo", "nombre", "id_categoria", "precio", "stock", "estado"],
      properties: {
        codigo: {
          bsonType: "string",
          minLength: 2,
          maxLength: 50,
          description: "Código único del producto"
        },
        nombre: {
          bsonType: "string",
          minLength: 2,
          maxLength: 150,
          description: "Nombre del producto"
        },
        descripcion: {
          bsonType: "string",
          maxLength: 500,
          description: "Descripción detallada del producto"
        },
        id_categoria: {
          bsonType: "objectId",
          description: "REFERENCIA a categorias._id"
        },
        precio: {
          bsonType: "number", 
          minimum: 0.01,
          description: "Precio unitario mayor a 0"
        },
        stock: {
          bsonType: "int",
          minimum: 0,
          description: "Stock disponible, no puede ser negativo"
        },
        stock_minimo: {
          bsonType: "int",
          minimum: 0,
          description: "Umbral mínimo para alerta de bajo stock"
        },
        estado: {
          bsonType: "bool",
          description: "true = activo, false = inactivo"
        },
        creado_en: {
          bsonType: "date",
          description: "Fecha de registro"
        },
        actualizado_en: {
          bsonType: "date",
          description: "Fecha de última modificación"
        }
      }
    }
  },
  validationAction: "error",
  validationLevel: "strict"
});


db.createCollection("clientes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Validación de Clientes",
      required: ["nombre_completo"],
      properties: {
        nombre_completo: {
          bsonType: "string",
          minLength: 3,
          maxLength: 100,
          description: "Nombre completo del cliente"
        },
        telefono: {
          bsonType: "string",
          maxLength: 20,
          description: "Número de teléfono"
        },
        correo: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$",
          description: "Correo con formato válido"
        },
        direccion: {
          bsonType: "object",
          description: "OBJETO EMBEBIDO con datos de dirección",
          properties: {
            sector:  {
                 bsonType: "string", 
                 description : "Colonia, barrio, canton o caserio"

            },
            ciudad:  { 
                bsonType: "string",
                 description : "Ciudad al que pertenece"

            },
            departamento: { 
                bsonType: "string",
                 description : "Departemento al que pertenece"

             }
   
          }
        },
        creado_en: {
          bsonType: "date",
          description: "Fecha de registro"
        }
      }
    }
  },
  validationAction: "error",
  validationLevel: "strict"
});


// COLECCIÓN: ventas


db.createCollection("ventas",{

  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Validación de Ventas",
      required: [
        "id_cliente", "id_usuario", "detalle_ventas", 
        "subtotal", "iva", "total", "estado", "fecha"
      ],
      properties: {
        id_cliente: { bsonType: "objectId" },
        id_usuario: { bsonType: "objectId" },
        detalle_ventas: {
          bsonType: "array",
          minItems: 1,
          items: {
            bsonType: "object",
            required: [
              "id_producto", "codigo", "nombre",
              "cantidad", "precio_unitario", "subtotal_linea"
            ],
            properties: {
              id_producto: {
                 bsonType: "objectId"
               },
              codigo: { 
                bsonType: "string" 
              },
              nombre: { 
                bsonType: "string" 
              },
              cantidad: { 
                
                bsonType: "int", minimum: 1 },
              precio_unitario: { 
                bsonType: "number", 
                minimum: 0.01
               },
              subtotal_linea: {
                 bsonType: "number", 
                 minimum: 0.01 
                }   
            }
          }
        },
        subtotal: { bsonType: "number", minimum: 0 }, 
        iva: { bsonType: "number", minimum: 0 },      
        total: { bsonType: "number", minimum: 0.01 }, 
        estado: {
          bsonType: "string",
          enum: ["completada", "anulada"] 
        },
        fecha: { bsonType: "date" }
      }
    }
  },
  validationAction: "error",
  validationLevel: "strict"
});



// indices

db.roles.createIndex(
  { nombre: 1 },
  { unique: true, name: "idx_roles_nombre" }
);

db.usuarios.createIndex(
  { correo: 1 },
  { unique: true, name: "idx_usuarios_correo" }
);
db.usuarios.createIndex(
  { id_rol: 1 },
  { name: "idx_usuarios_rol" }
);
db.usuarios.createIndex(
  { estado: 1 },
  { name: "idx_usuarios_estado" }
);

db.categorias.createIndex(
  { nombre: 1 },
  { unique: true, name: "idx_categorias_nombre" }
);
db.categorias.createIndex(
  { estado: 1 },
  { name: "idx_categorias_estado" }
);

db.productos.createIndex(
  { codigo: 1 },
  { unique: true, name: "idx_productos_codigo" }
);
db.productos.createIndex(
  { id_categoria: 1 },
  { name: "idx_productos_categoria" }
);
db.productos.createIndex(
  { nombre: "text" },
  { name: "idx_productos_texto_completo" }
);
db.productos.createIndex(
  { stock: 1 },
  { name: "idx_productos_stock" }
);
db.productos.createIndex(
  { estado: 1 },
  { name: "idx_productos_estado" }
);
db.productos.createIndex(
  { etiquetas: 1 },
  { name: "idx_productos_etiquetas" }
);

// --- clientes ---
db.clientes.createIndex(
  { nombre_completo: 1 },
  { name: "idx_clientes_nombre" }
);
db.clientes.createIndex(
  { correo: 1 },
  { sparse: true, name: "idx_clientes_correo" }
);
db.clientes.createIndex(
  { "direccion.ciudad": 1 },
  { name: "idx_clientes_ciudad" }
);

// --- ventas ---
db.ventas.createIndex(
  { id_cliente: 1 },
  { name: "idx_ventas_cliente" }
);
db.ventas.createIndex(
  { id_usuario: 1 },
  { name: "idx_ventas_usuario" }
);
db.ventas.createIndex(
  { fecha: -1 },
  { name: "idx_ventas_fecha_desc" }
);
db.ventas.createIndex(
  { estado: 1 },
  { name: "idx_ventas_estado" }
);
db.ventas.createIndex(
  { comprobante_nro: 1 },
  { unique: true, sparse: true, name: "idx_ventas_comprobante" }
);
db.ventas.createIndex(
  { "items.id_producto": 1 },
  { name: "idx_ventas_items_producto" }
);
db.ventas.createIndex(
  { fecha: -1, estado: 1 },
  { name: "idx_ventas_fecha_estado" }
);


