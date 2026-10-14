# Café Andino

## Descripción del proyecto

Café Andino es una aplicación web desarrollada con Angular para mostrar productos de una cafetería y permitir a los clientes realizar pedidos en línea. Cuenta con un catálogo de productos, ofertas, carrito de compras, registro de usuarios y un panel para consultar y administrar los pedidos.

Para el desarrollo se utiliza JSON Server como API local, que permite trabajar con los datos almacenados en el archivo `db.json`.

## Tecnologías utilizadas

- **Angular:** desarrollo de la interfaz web.
- **TypeScript:** lógica de la aplicación.
- **HTML y CSS:** estructura y estilos de las páginas.
- **Bootstrap:** diseño adaptable a celulares, tabletas y computadoras.
- **Node.js y npm:** ejecución del entorno de desarrollo e instalación de dependencias.
- **JSON Server:** API REST para consultar y modificar los datos.
- **LocalStorage:** almacenamiento local de información de sesión y datos de la aplicación, según la configuración utilizada.

## Requisitos previos

Antes de ejecutar el proyecto, es necesario tener instalado:

- Node.js 20.19 o superior de la versión 20, o una versión compatible de la rama 22.
- npm, incluido con Node.js.
- Visual Studio Code u otro editor de código.

Se puede comprobar la instalación desde la terminal:

```bash
node -v
npm -v
```

## Instalación y ejecución

### 1. Abrir el proyecto

Abre una terminal en la carpeta principal del proyecto, donde se encuentra el archivo `package.json`.

### 2. Instalar las dependencias

Ejecuta el siguiente comando. Este paso se realiza la primera vez que se configura el proyecto.

```bash
npm install
```

### 3. Iniciar la API

Abre una terminal y ejecuta:

```bash
npx json-server --watch db.json --port 3000
```

La API estará disponible en:

`http://localhost:3000`

Es importante dejar esta terminal abierta mientras se utiliza la aplicación.

### 4. Iniciar Angular

Abre una segunda terminal en la carpeta principal del proyecto y ejecuta:

```bash
npx ng serve
```

Cuando termine la compilación, ingresa desde el navegador a:

`http://localhost:4200`

También se puede utilizar el comando `npm run dev` para iniciar los servicios juntos, si está configurado en el archivo `package.json`.

## Funcionalidades principales

### Página principal y catálogo

La página principal presenta información de Café Andino y permite navegar por las diferentes secciones del sitio.

Entre las funcionalidades disponibles se encuentran:

- Visualización de productos.
- Consulta de ofertas y descuentos.
- Información de la cafetería.
- Sección de contacto.
- Diseño adaptable a diferentes tamaños de pantalla.

### Registro e inicio de sesión

Los usuarios pueden crear una cuenta e iniciar sesión para acceder a las opciones disponibles para clientes.

El proyecto utiliza autenticación simulada para las pruebas y almacena información en el navegador. Por ello, no debe considerarse un sistema de autenticación listo para producción.

### Tienda y pedidos

Los clientes pueden agregar productos al carrito, revisar las cantidades y confirmar sus pedidos.

El cálculo de los importes considera el IGV del 18 %. Al confirmar un pedido, se descuenta el stock correspondiente. Si el administrador cancela el pedido, el stock se devuelve.

Los pedidos pueden pasar por los siguientes estados:

- Pendiente.
- En preparación.
- Entregado.
- Cancelado.

### Panel de usuario

El panel cambia según el tipo de usuario que inicia sesión.

El cliente puede consultar su información y revisar sus pedidos anteriores, mientras que el administrador dispone de opciones para gestionar los pedidos, actualizar sus estados, revisar clientes y modificar el stock y los descuentos.

## Usuarios de prueba

Para probar las funcionalidades, se pueden utilizar las siguientes cuentas:

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@cafeandino.pe | admin123 |
| Cliente | cliente@cafeandino.pe | cliente123 |
| Cliente | marco@correo.com | marco123 |

Estas credenciales son para el entorno de demostración y no deben utilizarse en una aplicación publicada con información real.

## Estructura del proyecto

La carpeta principal contiene los archivos de configuración, los datos de prueba y el código fuente de la aplicación.

```text
cafe-andino/
├── angular.json
├── package.json
├── package-lock.json
├── db.json
├── public/
│   └── images/
├── backend/
│   ├── pom.xml
│   └── src/
│       └── main/
│           └── java/
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.css
    ├── environments/
    └── app/
        ├── app.ts
        ├── app.html
        ├── app.css
        ├── app.routes.ts
        ├── navbar/
        ├── footer/
        ├── home/
        ├── productos/
        ├── ofertas/
        ├── tienda/
        ├── login/
        ├── registro/
        ├── mi-cuenta/
        ├── mis-pedidos/
        ├── dashboard/
        ├── admin-pedidos/
        ├── models/
        ├── services/
        └── guards/
```

**Descripción de las carpetas principales:**

- `public/images/`: contiene el logo y las imágenes utilizadas en las páginas.
- `src/app/`: contiene los componentes que forman la interfaz.
- `src/app/services/`: contiene los servicios para gestionar las peticiones, la sesión, el carrito y los pedidos.
- `src/app/guards/`: contiene las protecciones de las rutas.
- `src/app/models/`: contiene los modelos y tipos de datos.
- `src/environments/`: contiene la configuración de los entornos.
- `db.json`: almacena los datos utilizados por JSON Server.
- `backend/`: contiene una alternativa de API desarrollada con Java y Spring Boot.

El backend de Spring Boot es opcional y no es necesario para ejecutar la aplicación con Angular y JSON Server.

## Diseño adaptable

La interfaz utiliza Bootstrap para organizar los elementos y facilitar su visualización en distintos dispositivos.

El menú de navegación se adapta a pantallas pequeñas, los productos se distribuyen según el espacio disponible y las tablas de pedidos y clientes cuentan con una presentación adecuada para dispositivos móviles.

## Pruebas del sistema

Para comprobar el funcionamiento general, se recomienda seguir estos pasos:

1. Iniciar JSON Server y Angular.
2. Crear una cuenta de cliente o ingresar con una de las cuentas de prueba.
3. Ingresar a la tienda y agregar productos al carrito.
4. Confirmar el pedido y revisar que aparezca en la sección Mis pedidos.
5. Cerrar sesión e ingresar con la cuenta de administrador.
6. Buscar el pedido registrado y modificar su estado.
7. Volver a ingresar con la cuenta del cliente para comprobar el estado actualizado.

También se puede compilar el proyecto con:

```bash
npm run build
```

Para ejecutar las pruebas unitarias, si están configuradas, se puede utilizar:

```bash
npm test
```

## Consideraciones para publicar la aplicación

En el entorno local, Angular se comunica con JSON Server para consultar y modificar los datos.

Si se publica la aplicación como un sitio estático, el funcionamiento dependerá de la configuración del entorno de producción. En la modalidad basada en datos estáticos, algunos cambios se guardan en el LocalStorage del navegador y no se comparten automáticamente con otros usuarios o dispositivos.

Para trabajar con pedidos compartidos entre diferentes clientes, se necesita una API publicada y una base de datos común. El backend alternativo de Spring Boot puede utilizarse como punto de partida para implementar esta parte.

Antes de publicar el sistema, también se deben revisar la autenticación, los permisos de acceso, la validación de los pedidos y el control de stock en el servidor.

## Autoría

Proyecto académico de desarrollo web para la cafetería Café Andino.
