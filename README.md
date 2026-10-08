# tp-06-salas-modular
Refactorización modular de reservas

# Proyecto de partida y cambios

El proyecto comenzó como una única aplicación Express implementada en un solo archivo (index.js), donde coexistían:

Configuración del servidor.
Definición de middlewares.
Gestión de datos de reservas.
Validaciones.
Definición de rutas.
Arranque de la aplicación.

Posteriormente se realizó una refactorización orientada a la modularización del código, separando responsabilidades en distintos módulos:

   * Estructura inicial
        index.js

   * Estructura modularizada
        src/
        ├── app.js
        ├── configuracion.js
        ├── main.js
        ├── middlewares/
        ├── rutas/
        ├── servicios/
        │ └── reservas.js
        ├── controladores/
        └── vistas/

## Instalación
1. Clonar este repositorio en la máquina local:
   git clone + URL del proyecto
2. Instala todas las dependencias requeridas:
   npm install (ya que el proyecto esta heredado de un proyecto anteriro con npm instal instalara todas las dependencias que esten en package.json)
3. npm install --save-dev prettier eslint @eslint/js   
   
 
## Ejecución
  Se agrega linea "start": "node --watch src/index.js",  en package.json
  Se ejecuta en una Nueva Terminal el comando "npm start"

  El servidor estará disponible en "http://localhost:3000".

# Configuración del entorno

    La configuración se centraliza mediante el módulo:

        - leerConfiguracion()

        Este módulo permite obtener parámetros de ejecución para la aplicación.

        Variables soportadas
        Variable	Descripción	Valor por defectoPORT	Puerto HTTP del servidor	3000
        LOG_FORMAT	Formato de registro de Morgan	dev

# Mapa de Modulos y Dependencias
    src
    │
    ├── index.js
         └── Punto de entrada de la aplicación
    │
    ├── configuracion.js
         └── Lectura de variables de entorno
    │
    ├── app.js
         └── Configuración de Express y montaje de rutas
    │
    ├── rutas
         └── reservas.js
    │
    ├── controladores
         └── reservas.js
    │
    ├── servicios
         └── reservas.js
    │
    ├── middleware
         ├── solicitudes.js
         └── reservas.js
    │
    └── views
        ├── layouts
        ├── partials
        └── reservas


## Pipeline y Contrato de Rutas

    1- Morgan (tercero)
    2- identificarSolicitud (personalizado, global)
    3- medirDuracion (personalizado, global)
    4- expressLayouts (tercero)
    5- express.static (incorporado)
    6- express.urlencoded (incorporado)
    7- express.json (incorporado)
    8- Rutas de aplicación
    9- Router de reservas con middleware de área
    10- Página 404


# Matriz antes/después

     * Estructura del proyecto	
          Antes: Un único archivo principal con toda la lógica.	
          Despues: Código dividido en módulos según responsabilidades.
     * Punto de entrada	
          Antes: main() contenía configuración, datos, rutas y lógica.	
          Despues: index.js se limita a iniciar la aplicación y sus dependencias.
     * Configuración	
          Antes: Valores definidos directamente en el código.	
          Despues: Configuración centralizada en configuracion.js.
     * Rutas	
          Antes: Declaradas dentro del archivo principal.	
          Despues: Rutas agrupadas en rutas/reservas.js.
     * Controladores	
          Antes: Mezclados con las definiciones de rutas.	
          Despues: Separados en controladores/reservas.js.
     * Lógica de negocio	
          Antes: Funciones como crearReserva() dentro del archivo principal.	
          Despues: Encapsulada en servicios/reservas.js.
     * Validaciones	
          Antes: Definidas junto a la configuración del servidor.	
          Despues: Agrupadas en middleware/reservas.js.
     * Middlewares generales	
          Antes: Integrados en el mismo archivo de la aplicación.	
          Reutilizables desde middleware/solicitudes.js.
     * Acoplamiento	
          Antes: Alto, todos los componentes dependían del mismo archivo.	
          Despues: Bajo, cada módulo tiene una responsabilidad específica.
     * Mantenimiento	
          Antes: Más difícil localizar errores o realizar cambios.	
          Despues: Más sencillo modificar componentes aislados.
     * Reutilización	
          Antes: Escasa reutilización de código.	
          Despues: Servicios y middlewares reutilizables.
     * Escalabilidad	
          Antes: Agregar nuevas funcionalidades implicaba modificar el archivo principal.	
          Se pueden agregar nuevos módulos, rutas o servicios sin afectar el resto.
     * Testabilidad	
          Antes: Compleja por la mezcla de responsabilidades.	
          Despues: Más sencilla al poder probar módulos individualmente.
     * Organización de vistas	
          Antes: Existían, pero estaban vinculadas directamente a las rutas.	
          Despues: Las vistas quedan desacopladas mediante controladores.
     * Flujo de dependencias	
          Antes: Ruta → lógica → vista dentro del mismo archivo.	
          Despues: Ruta → Middleware → Controlador → Servicio → Vista.

# Persistencia temporal y límites
    Actualmente el sistema utiliza almacenamiento en memoria.
        const reservasIniciales = [...]

    Las reservas se mantienen en una colección administrada por:
    crearServicioReservas()

    Los datos se pierden al reiniciar la aplicación.
    No existe persistencia en base de datos.
    No se realiza sincronización entre múltiples instancias.
    Los IDs se generan de forma incremental en memoria.
******************************************************************************************

# Este código no utiliza res por una razón arquitectura de software: es un servicio puro de lógica de negocio (o capa de datos), no un controlador de rutas.
     *Este archivo solo se encarga de guardar, buscar y listar reservas en la memoria. No sabe (ni le importa) si los datos vienen de una página web, de una aplicación móvil, etc
     *Al no depender de res.send(), res.json() o códigos de estado HTTP (como 200 o 400), se puede reutilizar esta función en cualquier parte de tla  aplicación sin estar atado a Express.


# El Controlador Renderiza y muestra las paginas Web (lista,detalle,nueva,error)

# El ruter declara caminos relativos para que el código funcione exactamente igual sin importar el dominio o el puerto. No es necesarios cambiar el código si corre localmente en localhost:3000, en un servidor de pruebas, o en producción. El servidor web asume automáticamente su propia dirección base.

# El unico arreglo de reservas convive donde fue declarado (o en Datos/reservas.json o como esta definido aqui en un arreglo en indesx.js)