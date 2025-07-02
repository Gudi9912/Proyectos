const { Sequelize, DataTypes } = require("sequelize");
const path = require('path');
const dbPath = path.join(__dirname, '..', '..', '.data', 'Emantecate.db');
const { Op } = require('sequelize');

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath
});


const Rellenos = sequelize.define(
  "Rellenos",
  {
    IDRelleno: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    Activo: { 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, 
      comment: 'Soft delete: false significa eliminado lógicamente'
    }
  },
  {
    tableName: "Rellenos",
    timestamps: false,
    paranoid: true
  }
);


const Productos = sequelize.define(
    "Productos",
    {
      IDProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Identificador único del producto'
      },
      Nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El nombre no puede estar vacío'
          },
          len: {
            args: [2, 100],
            msg: 'El nombre debe tener entre 2 y 100 caracteres'
          }
        }
      },
      Descripcion: {
        type: DataTypes.TEXT, 
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [5, 150] 
        }
      },
      Precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          isDecimal: {
            msg: 'El precio debe ser un número decimal válido'
          },
          min: {
            args: [0.01],
            msg: 'El precio debe ser mayor a 0'
          }
        }
      },
      Imagen: {
        type: DataTypes.STRING(255), 
        allowNull: false,
        validate: {
          isUrl: {
            msg: 'La imagen debe ser una URL válida'
          }
        }
      },
      Stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isInt: true,
          min: 0
        }
      },
      Activo: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, 
        comment: 'Soft delete: false significa eliminado lógicamente'
      },
      Destacado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      IDRelleno: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Rellenos',
          key: 'IDRelleno'
        },
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL' 
      }
    },
    {
      tableName: "Productos",
      timestamps: false, 
      paranoid: true, 
      indexes: [
        {
          fields: ['Activo'],
          name: 'idx_productos_activos'
        },
        {
          fields: ['Destacado'],
          name: 'idx_productos_destacados'
        },
        {
            fields: ['Stock'],
            name: 'idx_productos_stock',
            where: {
                Stock: {
                    [Op.gt]: 0
                }
            }
        }
      ],
      comment: 'Tabla de productos del sistema'
    }
  )


const Admin = sequelize.define(
  "Admin",
  {
    Usuario: {
      type: DataTypes.STRING,
      primaryKey: true 
    },
    Contraseña: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "Admin",
    timestamps: false
  }
);


// Un Relleno puede estar en muchos Productos
Rellenos.hasMany(Productos, {
  foreignKey: 'IDRelleno', 
  as: 'Productos' 
});

// Un Producto pertenece a un Relleno
Productos.belongsTo(Rellenos, {
  foreignKey: 'IDRelleno',
  as: 'Relleno', 
  onDelete: 'SET NULL' 
});

// Exportar modelos y sequelize
module.exports = {
  sequelize,
  Productos,
  Rellenos,
  Admin
};