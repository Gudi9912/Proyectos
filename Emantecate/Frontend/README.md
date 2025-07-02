# Dulce Pan - E-commerce para Panadería

Este proyecto es un e-commerce responsive para una panadería llamada "Dulce Pan", con enfoque principal en la experiencia móvil. La aplicación permite a los clientes explorar productos, añadirlos al carrito y realizar pedidos a través de WhatsApp.

## Estructura del Proyecto

\`\`\`
dulce-pan/
├── app/                      # Directorio principal de la aplicación Next.js
│   ├── cart/                 # Página del carrito de compras
│   │   └── page.tsx          # Componente de la página de carrito
│   ├── products/             # Páginas relacionadas con productos
│   │   ├── [id]/             # Página de detalle de producto dinámico
│   │   │   └── page.tsx      # Componente de detalle de producto
│   │   └── page.tsx          # Página de listado de productos
│   ├── globals.css           # Estilos globales y configuración de Tailwind
│   ├── layout.tsx            # Layout principal de la aplicación
│   └── page.tsx              # Página de inicio
├── components/               # Componentes reutilizables
│   ├── featured-products.tsx # Componente de productos destacados
│   ├── mobile-nav.tsx        # Navegación móvil (menú hamburguesa)
│   ├── product-carousel.tsx  # Carrusel de productos
│   └── ui/                   # Componentes de UI de shadcn
├── public/                   # Archivos estáticos (imágenes, etc.)
├── package.json              # Dependencias del proyecto
├── tailwind.config.js        # Configuración de Tailwind CSS
├── tsconfig.json             # Configuración de TypeScript
└── README.md                 # Documentación del proyecto
\`\`\`

## Descripción de los Archivos Principales

### Páginas (`app/`)

- **`page.tsx`**: Página de inicio con hero, productos destacados, carrusel de productos y sección "Sobre nosotros".
- **`products/page.tsx`**: Listado de todos los productos con filtros por categoría y precio.
- **`products/[id]/page.tsx`**: Página de detalle de producto individual con información detallada y productos relacionados.
- **`cart/page.tsx`**: Página del carrito de compras con formulario para datos de entrega e integración con WhatsApp.

### Componentes (`components/`)

- **`featured-products.tsx`**: Muestra una selección de productos destacados en la página de inicio.
- **`mobile-nav.tsx`**: Implementa el menú de navegación móvil que se despliega desde el lateral.
- **`product-carousel.tsx`**: Carrusel horizontal de productos con navegación táctil y botones.
- **`ui/`**: Componentes de UI reutilizables de la biblioteca shadcn/ui.

## Características Principales

1. **Diseño Mobile-First**: Optimizado para dispositivos móviles con adaptación a pantallas más grandes.
2. **Navegación Intuitiva**: Menú hamburguesa en móvil y navegación estándar en escritorio.
3. **Carrusel de Productos**: Navegación horizontal táctil para explorar productos.
4. **Carrito de Compras**: Gestión de productos con ajuste de cantidades.
5. **Integración con WhatsApp**: Sistema de pedidos que conecta directamente con WhatsApp.
6. **Responsive**: Se adapta a diferentes tamaños de pantalla manteniendo la usabilidad.

## Dependencias

El proyecto utiliza las siguientes dependencias principales:

- **Next.js**: Framework de React para renderizado del lado del servidor.
- **React**: Biblioteca para construir interfaces de usuario.
- **Tailwind CSS**: Framework de CSS utilitario para estilos.
- **Lucide React**: Biblioteca de iconos.
- **Radix UI**: Componentes primitivos accesibles (utilizados por shadcn/ui).
- **clsx/tailwind-merge**: Utilidades para combinar clases de Tailwind.

## Guía de Ejecución Local

### Requisitos Previos

- Node.js (versión 18.0.0 o superior)
- npm o yarn
- Visual Studio Code (recomendado)

### Pasos para Ejecutar el Proyecto

1. **Clonar o descargar el proyecto**

   \`\`\`bash
   git clone <url-del-repositorio>
   cd dulce-pan
   \`\`\`

2. **Instalar dependencias**

   \`\`\`bash
   npm install
   # o
   yarn install
   \`\`\`

3. **Iniciar el servidor de desarrollo**

   \`\`\`bash
   npm run dev
   # o
   yarn dev
   \`\`\`

4. **Abrir el proyecto en el navegador**

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### Uso con Visual Studio Code

1. **Extensiones recomendadas para VSCode**:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - PostCSS Language Support

2. **Abrir el proyecto en VSCode**:

   \`\`\`bash
   code .
   \`\`\`

3. **Terminal integrado**:
   - Puedes usar el terminal integrado de VSCode (Ctrl+`) para ejecutar comandos.
   - Ejecuta `npm run dev` directamente desde el terminal de VSCode.

## Personalización

### Cambiar el Número de WhatsApp

Para cambiar el número de WhatsApp al que se envían los pedidos:

1. Abre el archivo `app/cart/page.tsx`
2. Busca la función `handleWhatsAppOrder`
3. Modifica la constante `phoneNumber` con el número deseado (sin espacios ni caracteres especiales)

### Modificar Productos

Los productos están definidos como datos de ejemplo en varios archivos:

- `components/featured-products.tsx` - Productos destacados
- `components/product-carousel.tsx` - Todos los productos en el carrusel
- `app/products/page.tsx` - Listado completo de productos

Para modificar o añadir productos, edita los arrays correspondientes en cada archivo.

## Despliegue

Este proyecto puede desplegarse en plataformas como Vercel, Netlify o cualquier otro servicio que soporte aplicaciones Next.js.

Para desplegar en Vercel:

1. Sube tu código a un repositorio de GitHub, GitLab o Bitbucket
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Vercel detectará automáticamente que es un proyecto Next.js y lo configurará adecuadamente

## Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Componentes de shadcn/ui](https://ui.shadcn.com)
