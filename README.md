# ESC Boletera | DEMO

**Estatus del Proyecto:** Demo Técnico de Portafolio / Sandbox Frontend.  
Un entorno práctico e interactivo diseñado para demostrar habilidades avanzadas en el ecosistema **Vue 3**, tipado estricto con **TypeScript**, manipulación dinámica de vectores para interfaces de usuario y abstracción de lógica en el cliente.

Este proyecto simula el flujo de una boletera digital. Al operar de forma **offline/standalone** (sin conexión activa a un servidor), toda la persistencia de datos, el procesamiento de reglas de negocio, la validación de estados y las integraciones de pasarelas de pago se gestionan de manera reactiva e independiente en la capa del cliente.


## Puntos Fuertes del Demo 
Si estás revisando este repositorio para evaluar mis habilidades técnicas, te recomiendo prestar especial atención a los siguientes módulos:
*   **Manipulación Interactiva de Mapas SVG:** El sistema renderiza layouts de zonas y mapas de asientos mediante archivos vectoriales estructurados de manera interna. A través de eventos nativos del DOM (`click`, `hover`), se capturan los IDs únicos de los elementos para mutar dinámicamente sus estados visuales con clases y procesar la lógica de cálculos de montos en tiempo real.
*   **Simulación Completa de Checkout con Sandboxes Reales:** Integración a nivel de cliente con los SDKs oficiales de **PayPal** y **MercadoPago**. Configurado para interactuar mediante credenciales de prueba, permitiendo emular respuestas asíncronas exitosas o de error para bifurcar el flujo de la UI de forma realista.(PENDIENTE)
*   **Generación de Boletos:** Una vez aprobada la transacción simulada, el sistema genera un token/payload único basado en los metadatos de la compra (ID del boleto, zona, asiento). Este payload se inyecta en un generador dinámico de códigos QR embebido en una plantilla HTML estructurada, la cual es exportada directamente por el navegador a un documento PDF limpio y listo para impresión. (PENDIENTE)
*   **Arquitectura de Datos Estática con TS:** Validación de eventos, zonas y disponibilidad mediante funciones puras que consultan archivos locales fuertemente tipados, emulando la latencia y comportamiento de una API REST.


## Stack Tecnológico
*   **Core:** Vue 3 (Composition API) + TypeScript (Estructuras y tipado).
*   **Diseño y Estilos:** Tailwind CSS + Flexbox + CSS Gradients para un diseño moderno y responsive.
*   **Gestión de Estado y Rutas:** Vuex (Centralización de flujos de compra y eventos seleccionados) + Vue Router.
*   **Bundler y Herramientas:** Vite.
*   **Dependencias de UI y Utilidades:** Axios (Instancia pre-configurada), Lodash, Moment.js, Vue SweetAlert2, Vue Good Table Next.
*   **Generación de Archivos:** Qrcode-vue3 + Vue-html2pdf.
## Estructura de Carpetas
Basado en las mejores prácticas de modularidad, el código se organiza separando la lógica del core de la aplicación de la capa de presentación visual:

```text
src/
├── app/                  # Capa Core e Infraestructura de la Aplicación
│   ├── backend/          # Configuración e instancia aislada de Axios (Client API lista)
│   ├── configuration/    # Setups del entorno y variables del sistema
│   ├── router/           # Gestión del enrutado web y protección de vistas
│   └── storage/          # Módulos y estados centralizados de Vuex
├── assets/               # Recursos estáticos (imágenes, fuentes, estilos globales)
├── components/           # Componentes atómicos y globales reutilizables
├── layout/               # Contenedores estructurales de la interfaz de usuario
├── views/                # Vistas de página completa de la aplicación
│   ├── ticketing/        # Módulo core: Proceso de selección de asientos, mapas y checkout
│   ├── preview/          # Vistas de validación, generación y visualización de boletos
│   └── TLandingPage.vue  # Página de acceso principal y catálogo de eventos disponibles
├── main.ts               # Punto de entrada de la aplicación (Inyección de plugins y arranque)
└── TDisplayer.vue        # Componente raíz u orquestador principal de layouts


*Existe una instancia personalizada de Axios configurada con interceptores de peticiones y respuestas dentro de src/app/backend/.

*Actualmente, el flujo de datos consume mocks locales tipados en TypeScript que simulan de manera exacta las estructuras JSON esperadas.

Migración Inmediata: Si el día de mañana se requiere conectar este sistema a una API real de producción, únicamente se debe actualizar la variable VITE_API_BASE_URL en el entorno .env y enlazar los servicios de Axios al Store de Vuex, ya que los componentes de la interfaz de usuario consumen exclusivamente el estado global.