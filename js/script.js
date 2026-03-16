document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LÓGICA DE TARJETA Y ANIMACIÓN DE NÚMEROS QUE "VUELAN" ---
    const cardInput = document.getElementById('cardNumberInput');
    const cardDisplay = document.getElementById('cardNumberDisplay');
    
    cardInput.addEventListener('input', (e) => {
        // Formatear a espacios cada 4 números
        let val = cardInput.value.replace(/\D/g, '');
        let formattedVal = val.replace(/(.{4})/g, '$1 ').trim();
        cardInput.value = formattedVal;

        // Detectar si se agregó un número (para la animación)
        if (e.inputType === 'insertText' && /\d/.test(e.data)) {
            let numChar = e.data;
            
            // Crear el elemento que va a volar
            let flyingEl = document.createElement('div');
            flyingEl.innerText = numChar;
            flyingEl.classList.add('flying-number');
            
            // Obtener coordenadas de inicio (input) y fin (tarjeta)
            let rectStart = cardInput.getBoundingClientRect();
            let rectEnd = cardDisplay.getBoundingClientRect();
            
            // Posición inicial
            flyingEl.style.left = (rectStart.left + 20) + 'px';
            flyingEl.style.top = rectStart.top + 'px';
            document.body.appendChild(flyingEl);
            
            // Forzar un "reflow" para que la transición CSS funcione
            void flyingEl.offsetWidth;
            
            // Posición final (hacia la tarjeta) y efecto de desvanecimiento
            flyingEl.style.left = (rectEnd.left + (val.length * 15)) + 'px'; // Aproximación de la posición
            flyingEl.style.top = rectEnd.top + 'px';
            flyingEl.style.opacity = '0';
            flyingEl.style.transform = 'scale(1.5)';
            
            // Limpiar el DOM y actualizar el texto de la tarjeta
            setTimeout(() => {
                flyingEl.remove();
                // Actualizar texto real de la tarjeta (rellenando con #)
                let padVal = formattedVal.padEnd(19, '#');
                cardDisplay.innerText = padVal;
            }, 500);
        } else {
            // Si borran números, solo actualizamos normal
            let padVal = formattedVal.padEnd(19, '#');
            cardDisplay.innerText = padVal;
        }
    });

    // --- Otros campos básicos a la tarjeta ---
    document.getElementById('cardNameInput').addEventListener('input', function() {
        document.getElementById('cardNameDisplay').innerText = this.value.toUpperCase() || 'NOMBRE APELLIDO';
    });
    
    document.getElementById('cardExpiryInput').addEventListener('input', function(e) {
        let val = this.value.replace(/\D/g, '');
        if (val.length > 2) val = val.substring(0,2) + '/' + val.substring(2,4);
        this.value = val;
        document.getElementById('cardExpiryDisplay').innerText = val || 'MM/YY';
    });

    // --- 2. ANIMACIÓN DE CAMBIO VISA / MASTERCARD ---
    const radios = document.querySelectorAll('input[name="cardType"]');
    const brandLogo = document.getElementById('cardBrandLogo');
    
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            // Animación de salida
            brandLogo.classList.remove('logo-slide-in');
            brandLogo.classList.add('logo-slide-out');
            
            setTimeout(() => {
                // Cambiar el texto y el color dependiendo de la marca
                if (e.target.value === 'VISA') {
                    brandLogo.innerText = 'VISA';
                    brandLogo.style.color = '#fff';
                } else {
                    brandLogo.innerText = 'Mastercard';
                    brandLogo.style.color = '#ffb600'; // Color característico
                }
                
                // Animación de entrada
                brandLogo.classList.remove('logo-slide-out');
                brandLogo.classList.add('logo-slide-in');
            }, 300); // 300ms = tiempo de la animación CSS
        });
    });

    // --- 3. LÓGICA DE PAGO (15 MENSAJES GRACIOSOS) ---
    const mensajesGraciosos = [
        "¡Compra confirmada! Tus 100 kilos de basura van en camino.",
        "¡Felicidades! Te acabamos de robar tus datos, lol.",
        "Pago exitoso. Tu alma ahora nos pertenece.",
        "Transacción aprobada. Enviaremos un mimo a tu casa a mirarte fijamente.",
        "¡Listo! Has comprado un boleto de ida a Tlaxcala.",
        "Pago procesado. Gracias por financiar mi caguama.",
        "¡Éxito! Tu suscripción mensual a 'Datos Inútiles' está activa.",
        "Aprobado. El FBI ya no te está buscando... tanto.",
        "Compra exitosa. Espera tu piedra mascota de 50kg mañana.",
        "Pago aceptado. Has adoptado virtualmente a un mosquito.",
        "¡Hecho! Tus créditos sociales han disminuido en 50 puntos.",
        "Transacción completada. Tu historial de búsqueda será publicado.",
        "Aprobado. Un mariachi fantasma te cantará a las 3 AM.",
        "Pago exitoso. Has comprado un NFT de un pixel negro.",
        "¡Felicidades! Pagaste la colegiatura de mi perro."
    ];

    document.getElementById('payButton').addEventListener('click', (e) => {
        e.preventDefault();
        
        // Ocultar form, mostrar barra de carga
        document.getElementById('checkoutForm').style.display = 'none';
        document.getElementById('loadingScreen').style.display = 'block';
        
        let barra = document.getElementById('progressBar');
        let progreso = 0;
        
        // Simular carga bancaria
        let intervaloCarga = setInterval(() => {
            progreso += Math.floor(Math.random() * 20) + 10; 
            if (progreso > 100) progreso = 100;
            barra.style.width = progreso + '%';
            
            if (progreso === 100) {
                clearInterval(intervaloCarga);
                setTimeout(() => {
                    // Mostrar mensaje gracioso aleatorio
                    document.getElementById('loadingScreen').style.display = 'none';
                    document.getElementById('successScreen').style.display = 'block';
                    
                    let randomIndex = Math.floor(Math.random() * mensajesGraciosos.length);
                    document.getElementById('successMessage').innerText = mensajesGraciosos[randomIndex];
                }, 500); // Pequeña pausa al llegar al 100%
            }
        }, 500);
    });
});