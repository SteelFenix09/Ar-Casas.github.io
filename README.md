# Ar-Casas

Innova Archviz es una aplicación web de Realidad Aumentada (AR) que permite a usuarios, arquitectos y desarrolladores inmobiliarios visualizar modelos 3D de casas sobre superficies reales usando la cámara de su dispositivo móvil.
Construida con tecnologías web estándar (WebXR / A-Frame / AR.js), funciona directamente desde el navegador sin necesidad de descargar ninguna aplicación.

## Caracteristicas

-> AR basada en navegador (sin app requerida)
-> Múltiples modelos de casas disponibles (Casa Moderna, y más)
-> Escaneado de superficie plana para colocación precisa
-> Compatible con dispositivos Android y iOS modernos
-> Deployado en GitHub Pages — acceso público inmediato

## DEMO EN VIVO 

https://steelfenix09.github.io/Ar-Casas.github.io/index2.html

Nota: Requiere un dispositivo móvil con soporte WebXR y acceso a la cámara habilitado.

## TECNOLOGIAS UTILIZADAS

Tecnología:
-> HTML5 / CSS3 / JavaScript       Estructura, estilos e interacción
-> A-Frame                         Motor de escenas 3D en WebXR
-> AR.js / WebXR                   Realidad Aumentada en el navegador
-> GitHub                          Hosting del proyecto

## COMO UTILIZARLO

1. Abre el enlace de la demo desde tu celular
2. Acepta el permiso de cámara cuando se solicite
3. Apunta hacia una superficie plana (piso, mesa, patio)
4. Mueve lentamente el dispositivo para escanear la superficie
4. El modolo se coloca en automatico
6. Explora diferentes modelos desde el carrusel inferior

## MEJORAS PLANEADAS

1. Optimización de modelos 3D (reducción de peso)
Los modelos .glb o .gltf pueden ser muy pesados si no están optimizados, lo que ralentiza la carga, especialmente en redes móviles.

Acciones futuras:

Usar gltf-transform o Blender para reducir polígonos (decimation)
Comprimir texturas con KTX2 / Basis Universal — puede reducir el tamaño hasta un 80%
Aplicar compresión Draco a la geometría del modelo
Eliminar nodos, huesos y animaciones innecesarias del archivo
Meta objetivo: modelos < 2 MB por pieza

2. Optimización del código JavaScript
Reducir el tiempo de carga y mejorar la fluidez de la experiencia AR.
Acciones futuras:

Separar la lógica en módulos ES6 (import/export) para mejor mantenimiento
Eliminar listeners y objetos de escena cuando no estén en uso (evitar memory leaks)
Usar requestAnimationFrame en lugar de setInterval para actualizaciones
Lazy loading: cargar modelos solo cuando el usuario los seleccione, no todos al inicio
Minificar y bundlear con Vite o Parcel para producción

3. Pantalla de carga y feedback visual
Mostrar un indicador de progreso mientras los modelos se descargan, para que el usuario no vea una pantalla en blanco.

4. Escala ajustable del modelo
Permitir al usuario hacer pinch-to-zoom para redimensionar el modelo y adaptarlo a las dimensiones reales del terreno que está evaluando.

5. Captura de pantalla / grabación de video
Agregar un botón para tomar screenshot o grabar la experiencia AR con el modelo superpuesto. Esto permite compartir el render con clientes o familiares.

6. Modo de comparación
Poder alternar entre dos modelos de casa sin abandonar la experiencia AR, para comparar visualmente cuál encaja mejor en el terreno.

7. Compatibilidad y fallback
Detectar si el navegador no soporta WebXR y mostrar un mensaje amigable con instrucciones alternativas (ej. vista 3D sin AR).

8. PWA (Progressive Web App)
Convertir el proyecto en una PWA para que funcione offline y pueda "instalarse" en la pantalla de inicio del celular, mejorando la retención de usuarios.

9. Información por modelo
Mostrar ficha técnica de cada casa al seleccionarla: metros cuadrados, número de habitaciones, estilo arquitectónico, materiales sugeridos.

10. Analytics de uso
Integrar una herramienta ligera (ej. Umami o Plausible) para saber qué modelos se visualizan más, desde qué dispositivos y qué pasos del flujo generan abandono.

## COMPATIBILIDAD

Android (Chrome)        Recomendado
iOS (Safari 15+)        Soporte parcial WebXR
Desktop (Chrome)        No soporta AR (sin cámara móvil)

## CONTRIBUCIONES

Las contribuciones son bienvenidas

## AUTOR

SteelFenix09

GitHub: @steelfenix09