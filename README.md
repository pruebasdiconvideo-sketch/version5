# Café Andino · E-commerce (PC2 JavaScript Avanzado)

Tienda online de la cafetería cusqueña **Café Andino**: **Angular 20 (standalone + SSR/prerender) · Bootstrap 5 · JSON Server · TypeScript**.

La aplicación permite explorar productos y ofertas, crear una cuenta, armar un carrito y gestionar pedidos. Los datos de desarrollo se guardan en `db.json`, que JSON Server expone como API REST. La interfaz está construida con componentes Angular, plantillas HTML, estilos CSS y clases de Bootstrap.

## Inicio rápido (2 terminales)

```bash
# 1) Solo la primera vez: instala dependencias
npm install

# 2) Terminal 1 — API REST (db.json en http://localhost:3000)
json-server --watch db.json --port 3000

# 3) Terminal 2 — App Angular (http://localhost:4200)
ng serve
```

> Si `json-server` o `ng` no están instalados de forma global, antepón `npx`:
> `npx json-server --watch db.json --port 3000` y `npx ng serve`. Ambos funcionan tras `npm install`.

| Servicio | URL | Comando |
|---|---|---|
| Angular (front) | http://localhost:4200 | `ng serve` |
| JSON Server (API) | http://localhost:3000 | `json-server --watch db.json --port 3000` |

O ejecuta ambos en una sola terminal con: `npm run dev`

## Roles y funcionalidades

| | Visitante | Cliente | Administrador |
|---|---|---|---|
| Ver Home, Productos, Ofertas, Contacto | ✅ | ✅ | ✅ |
| Crear cuenta (`/registro`) | ✅ | – | – |
| Comprar en la Tienda (carrito, IGV 18%) | ve el carrito; debe iniciar sesión | ✅ | ❌ (solo gestiona) |
| **Mis pedidos** (historial, estado, productos comprados) | – | ✅ | – |
| **Dashboard** | redirige al Home | resumen personal | **panel completo** |
| Ver **todos** los pedidos y cambiar su estado | – | – | ✅ |
| Editar stock y descuentos | – | – | ✅ |
| Ver clientes y sus compras | – | – | ✅ |

- Al confirmar un pedido se **descuenta el stock**; si el admin lo **cancela**, el stock se devuelve.
- Estados del pedido: Pendiente → En preparación → Entregado (o Cancelado).

### Usuarios de prueba
| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@cafeandino.pe` | `admin123` |
| Cliente | `cliente@cafeandino.pe` | `cliente123` |
| Cliente | `marco@correo.com` | `marco123` |

## Ejecutar el proyecto

Requisitos: **Node.js 20.19+ o 22** y npm. La primera vez, instala las dependencias:

```bash
npm install
```

Para iniciar los servicios manualmente, abre dos terminales en la carpeta raíz del proyecto (`cafe-andino`). Instala las dependencias solo la primera vez:

```bash
npm install
```

En la primera terminal, inicia la API local:

```bash
json-server --watch db.json --port 3000
```

> Si `json-server` no está instalado de forma global, usa `npx json-server --watch db.json --port 3000` (es equivalente y funciona después de `npm install`).

Déjala abierta. En la segunda terminal, inicia Angular:

```bash
ng serve
```

> Si `ng` no está instalado de forma global, usa `npx ng serve` (también equivalente tras `npm install`).

Cuando Angular indique que terminó de compilar, abre **http://localhost:4200**. JSON Server sirve los datos de `db.json` en **http://localhost:3000**. El comando de Angular es `ng serve`, no `ng server`.

También puedes iniciar ambos servicios juntos desde una sola terminal con el script incluido:

```bash
npm run dev
```

Bootstrap ya está incluido en `angular.json` y sus clases se usan en las plantillas para la cuadrícula responsive, navegación, botones y formularios.

## Comandos opcionales

No son necesarios para iniciar la tienda. Úsalos solo para verificar el proyecto:

```bash
npm run build  # compilar
npm test       # pruebas unitarias (requiere Google Chrome)
```

**Flujo de prueba sugerido**
1. `Crear cuenta` → se registra un cliente nuevo y entra al Dashboard.
2. Tienda → agregar productos → *Confirmar pedido* → aparece en **Mis pedidos** con su detalle.
3. Cerrar sesión → entrar como **admin** → Dashboard → pestaña **Pedidos**: ahí está el pedido del cliente; cambia su estado.
4. Entrar de nuevo como el cliente: el estado se ve actualizado en *Mis pedidos*.

## Estructura

```
cafe-andino/
├── angular.json              Configuración de Angular; incluye Bootstrap y los recursos
├── package.json              Dependencias y comandos npm, incluido `npm run dev`
├── package-lock.json         Versiones instaladas de dependencias
├── tsconfig*.json             Configuración de TypeScript
├── db.json                   Datos que consume JSON Server durante el desarrollo
├── public/
│   └── images/                Logo, portada, productos e imágenes del sitio
├── backend/                  API alternativa opcional en Java y Spring Boot
│   ├── pom.xml                Dependencias y configuración de Maven
│   └── src/main/java/         Clases Java de la API (no requeridas para `npm run dev`)
└── src/
    ├── index.html             Documento HTML de entrada
    ├── main.ts                Inicio de Angular en el navegador
    ├── main.server.ts         Entrada de Angular para renderizado en servidor
    ├── server.ts              Servidor de renderizado SSR
    ├── styles.css             Estilos globales y ajustes de Bootstrap
    ├── environments/          URL de API y configuración por entorno
    └── app/
        ├── app.ts, app.html, app.css  Componente raíz de la aplicación
        ├── app.routes.ts              Rutas y navegación entre páginas
        ├── navbar/, footer/           Navegación y pie reutilizables
        ├── hero/, categorias/         Portada y navegación por categorías
        ├── about/                     Historia y presentación de Café Andino
        ├── skills/                    Especialidades y capacidades de la cafetería
        ├── projects/                  Selección destacada del catálogo
        ├── contact/                   Contacto y reservas
        ├── testimonios/               Opiniones de clientes
        ├── producto-card/             Tarjeta reutilizable para productos
        ├── pedido-detalle/            Presentación del detalle de un pedido
        ├── home/                      Página principal
        ├── productos/, ofertas/       Catálogo y productos con descuento
        ├── tienda/                    Carrito y confirmación de compra
        ├── login/, registro/          Acceso y creación de cuenta
        ├── mi-cuenta/                 Datos de la cuenta del cliente
        ├── mis-pedidos/               Historial de compras del cliente
        ├── dashboard/                 Panel de cliente o administrador
        ├── admin-pedidos/             Gestión administrativa de pedidos
        ├── not-found/                 Página para rutas inexistentes
        ├── models/                    Tipos y modelos de datos TypeScript
        ├── services/                  Acceso a API, autenticación, carrito y pedidos
        └── guards/                    Protección de rutas según la sesión
```

    Las rutas `/nosotros` y `/contacto` se mantienen como alias para compatibilidad con enlaces anteriores; las rutas principales son `/about` y `/contact`.

Los archivos `.java` pertenecen únicamente al backend alternativo Spring Boot. El funcionamiento normal usa Angular y JSON Server con `npm run dev`; no se necesita ejecutar Maven ni Java.

## Diseño responsive
Construido con el grid de Bootstrap (móvil → tablet → escritorio):
- **Navbar** colapsable con menú hamburguesa; los botones de sesión se apilan en móvil.
- **Catálogo**: 1 columna en móvil, 2 en tablet, 3–4 en escritorio; categorías como *chips* con scroll horizontal.
- **Tablas** (pedidos, inventario, clientes): en móvil cada fila se convierte en una **tarjeta** (clase `.tabla-cards`, `styles.css`).
- **Tienda**: el pedido queda fijo a la derecha en escritorio y en móvil aparece el botón flotante **“Ver pedido”**.
- Imágenes con `loading="lazy"`, proporción fija (sin saltos de diseño) e imagen de respaldo si alguna falla.

## Imágenes
Todas están en `public/images/` y se referencian desde `db.json` (`"imagen": "images/product-xxx.jpg"`).

| Archivo | Uso | Tipo |
|---|---|---|
| `product-espresso.jpg`, `hero-cup.jpg` | Producto Espresso y portada | **Fotografía real** (CC0, dominio público) |
| `product-*.jpg` (11), `about.jpg`, `hero.jpg`, `logo.png` | Resto de productos, sección Nosotros, fondo y logo | Ilustraciones generadas para el proyecto |
| `placeholder.jpg` | Respaldo si una imagen no carga | — |

**Para usar tus propias fotos** (por ejemplo las de la PC1): cópialas en `public/images/` con **el mismo nombre**
(recomendado 1000×750 px, JPG, menos de 200 KB) o cambia la ruta en `db.json`. No hay que tocar el código.

## Cumplimiento de la rúbrica

| Requisito | Dónde |
|---|---|
| Navbar / Footer reutilizables, arquitectura por componentes | `navbar/`, `footer/`, `app.html` |
| Home, Productos, Ofertas, Tienda, Contacto, Mi Cuenta, Login, Dashboard, 404 | `app.routes.ts` |
| Redirección al Home si se entra a `/dashboard` sin sesión | `guards/auth.guard.ts` |
| Login simulado con ngModel, validaciones y LocalStorage; cerrar sesión | `login/`, `services/auth.service.ts` |
| Interpolación, property/event binding, `[(ngModel)]` | todos los componentes |
| `*ngFor`, `*ngIf`, `[ngClass]`, `[ngStyle]` | todos los componentes (`[ngStyle]` en `hero`, `producto-card`) |
| Pipes (`currency`, `date`, `uppercase`, `titlecase`) | tarjetas, pedidos, dashboard |
| Bootstrap: grid, cards, navbar, formularios, botones, tablas | toda la interfaz (responsive) |
| `db.json` con nombre, imagen, categoría, precio y stock | `db.json` |
| Servicios REST en Angular + productos dinámicos | `services/api.service.ts`, `productos/` |
| Dashboard protegido con bienvenida, datos del usuario y estadísticas | `dashboard/` |

## Despliegue

`npm run build` → `dist/cafe-andino/browser`. Subir el repo a **Vercel** o **Netlify** (ya traen `vercel.json` / `netlify.toml`).

**Importante:** en un hosting estático no existe JSON Server. En producción la app usa `db.json` como base inicial y guarda
usuarios, pedidos y cambios de stock en el **LocalStorage de cada navegador** (`environment.prod.ts`, `usarDbEstatica: true`).
Sirve para la demo, pero el administrador solo verá los pedidos hechos en su mismo navegador. Para pedidos compartidos entre
dispositivos, publica la API (JSON Server o el backend Spring Boot) en un servicio como Render y pon su URL en
`environment.prod.ts` con `usarDbEstatica: false`.

- Servidor Node SSR: `npm run build && npm run start:ssr` (para otro dominio define `ALLOWED_HOSTS="midominio.com"`).
- GitHub Pages: `ng build --base-href /<repo>/` y copiar `index.csr.html` como `404.html`.

## Backend alternativo con Spring Boot (opcional)

```bash
cd backend && mvn spring-boot:run   # puerto 3000, Java 17+; reemplaza a `npm run api`
```
