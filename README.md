# 💳 Examen Tema 2: Credit Card Checkout (Glassmorphism)

**Tecnológico Nacional de México Campus Pachuca** **Ingeniería en Sistemas Computacionales** * **Autor:** Gael
* **Matrícula:** 22200761
* **Materia:** [Nombre de tu materia, ej. Programación Web / Desarrollo Frontend]

---

## 📝 Descripción del Proyecto
Este proyecto es una aplicación web responsiva que simula una pasarela de pago interactiva. Fue desarrollada utilizando los principios del diseño **Glassmorphism**, implementando manipulación del DOM mediante JavaScript puro (Vanilla JS) y animaciones avanzadas en CSS3 (incluyendo renderizado 3D).

## ✨ Características Principales
* **Estética Glassmorphism:** Interfaz translúcida con desenfoque de fondo (`backdrop-filter`) y un fondo animado (GIF) para simular un panel de cristal sobre un fluido.
* **Tarjeta 3D Interactiva:** Animación completa de 180 grados (`rotateY`) al interactuar con el campo CVV o al hacer clic en la tarjeta.
* **Sincronización en Tiempo Real:** Los datos ingresados en el formulario se reflejan instantáneamente en la tarjeta virtual.
* **Animaciones Personalizadas ("Flying Numbers"):** Al teclear el número de tarjeta, los dígitos se desplazan visualmente desde el input hacia la tarjeta de cristal.
* **Validación de Datos:** El formulario verifica que todos los campos estén completos (16 dígitos de tarjeta, 3 de CVV, fecha y nombre) antes de procesar el pago.
* **Simulación de Carga y Respuestas Aleatorias:** Pantalla de carga simulada con barra de progreso y 15 posibles mensajes de confirmación de compra de carácter humorístico.
* **Diseño Responsivo:** Adaptabilidad total a dispositivos móviles y de escritorio mediante **Bootstrap 5**.

## 🛠️ Tecnologías Utilizadas
* **HTML5:** Semántica y estructura principal.
* **CSS3:** Animaciones (`@keyframes`), Transformaciones 3D, Flexbox y Glassmorphism.
* **JavaScript (ES6):** Manejo de eventos (`EventListener`), temporizadores (`setTimeout`, `setInterval`), modificación de clases y manipulación del DOM.
* **Bootstrap 5:** Sistema de cuadrícula, Navbar y alertas.

## 🔗 Enlaces de Entrega (Evidencias)
A continuación se presentan los enlaces requeridos para la evaluación de la actividad:

* **Repositorio de GitHub:** [Inserta aquí la URL de tu repo]
* **GitHub Pages (Sitio en Vivo):** [Inserta aquí la URL de tu GitHub Pages]
* **Hosting Sincronizado (Hostinger):** [Inserta aquí la URL de tu dominio en Hostinger]
* **Wireframe:** [Inserta aquí el enlace a tu diseño/wireframe]
* **Carpeta de Google Drive (Tema 2):** [Inserta aquí el enlace a tu carpeta con las conversaciones y recursos]

## 💡 Conclusiones de la Actividad
Durante el desarrollo de este examen, logré consolidar mis conocimientos en la integración de tecnologías Frontend. El mayor reto y aprendizaje fue coordinar los eventos del DOM (JavaScript) con las transformaciones en 3D de CSS para lograr que el reverso de la tarjeta y las validaciones del formulario funcionaran de manera fluida. Asimismo, la manipulación de propiedades como `backdrop-filter` junto con `saturate` me permitió crear un efecto de vidrio mucho más realista, logrando una interfaz de usuario moderna y atractiva.