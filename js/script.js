document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ELEMENTOS DE LA TARJETA ---
    const cardInput = document.getElementById('cardNumberInput');
    const cardDisplay = document.getElementById('cardNumberDisplay');
    const cardInner = document.getElementById('creditCard');
    const cardScene = document.getElementById('cardScene');
    const cvvInput = document.getElementById('cvvInput');
    
    // Girar al hacer click en la tarjeta
    cardScene.addEventListener('click', () => {
        cardInner.classList.toggle('is-flipped');
        // Ajustamos la animación de flotación para que no se rompa visualmente al girar
        if(cardInner.classList.contains('is-flipped')) {
            cardInner.style.setProperty('--rot', '180deg');
        } else {
            cardInner.style.setProperty('--rot', '0deg');
        }
    });

    // Girar automáticamente al entrar/salir del campo CVV
    cvvInput.addEventListener('focus', () => {
        cardInner.classList.add('is-flipped');
        cardInner.style.setProperty('--rot', '180deg');
    });

    cvvInput.addEventListener('blur', () => {
        cardInner.classList.remove('is-flipped');
        cardInner.style.setProperty('--rot', '0deg');
    });

    // Actualizar CVV
    cvvInput.addEventListener('input', function() {
        let val = this.value.replace(/\D/g, ''); // Solo números
        this.value = val;
        document.getElementById('cvvDisplay').innerText = val;
    });

    // --- 2. LOGICA DE NÚMEROS VOLADORES Y MASCARA ---
    cardInput.addEventListener('input', (e) => {
        let val = cardInput.value.replace(/\D/g, '');
        let formattedVal = val.replace(/(.{4})/g, '$1 ').trim();
        cardInput.value = formattedVal; // Se actualiza el input permitiendo los espacios

        if (e.inputType === 'insertText' && /\d/.test(e.data)) {
            let numChar = e.data;
            let flyingEl = document.createElement('div');
            flyingEl.innerText = numChar;
            flyingEl.classList.add('flying-number');
            
            let rectStart = cardInput.getBoundingClientRect();
            let rectEnd = cardDisplay.getBoundingClientRect();
            
            flyingEl.style.left = (rectStart.left + 20) + 'px';
            flyingEl.style.top = rectStart.top + 'px';
            document.body.appendChild(flyingEl);
            
            void flyingEl.offsetWidth;
            
            flyingEl.style.left = (rectEnd.left + (val.length * 12)) + 'px'; 
            flyingEl.style.top = rectEnd.top + 'px';
            flyingEl.style.opacity = '0';
            flyingEl.style.transform = 'scale(1.5)';
            
            setTimeout(() => {
                flyingEl.remove();
                let padVal = formattedVal.padEnd(19, '#');
                cardDisplay.innerText = padVal;
            }, 500);
        } else {
            let padVal = formattedVal.padEnd(19, '#');
            cardDisplay.innerText = padVal;
        }
    });

    // Nombre y Expiración
    document.getElementById('cardNameInput').addEventListener('input', function() {
        document.getElementById('cardNameDisplay').innerText = this.value.toUpperCase() || 'NOMBRE APELLIDO';
    });
    
    document.getElementById('cardExpiryInput').addEventListener('input', function(e) {
        let val = this.value.replace(/\D/g, '');
        if (val.length > 2) val = val.substring(0,2) + '/' + val.substring(2,4);
        this.value = val;
        document.getElementById('cardExpiryDisplay').innerText = val || 'MM/YY';
    });

    // --- 3. CAMBIO DE LOGOS VISA / MASTERCARD ---
    const radios = document.querySelectorAll('input[name="cardType"]');
    const brandLogoImg = document.getElementById('brandLogoImg');
    const brandLogoImgBack = document.getElementById('brandLogoImgBack');
    
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            // Animación de desvanecimiento
            brandLogoImg.style.opacity = '0';
            brandLogoImgBack.style.opacity = '0';
            
            setTimeout(() => {
                if (e.target.value === 'VISA') {
                    brandLogoImg.src = 'assets/visa-logo.png';
                    brandLogoImgBack.src = 'assets/visa-logo.png';
                } else {
                    brandLogoImg.src = 'assets/mastercard-logo.png';
                    brandLogoImgBack.src = 'assets/mastercard-logo.png';
                }
                brandLogoImg.style.opacity = '1';
                brandLogoImgBack.style.opacity = '0.5'; // El de atrás es semi-transparente
            }, 300);
        });
    });

    // --- 4. LÓGICA DE PAGO (MENSAJES GRACIOSOS) ---
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
        
        document.getElementById('checkoutForm').style.display = 'none';
        document.getElementById('loadingScreen').style.display = 'block';
        
        let barra = document.getElementById('progressBar');
        let progreso = 0;
        
        let intervaloCarga = setInterval(() => {
            progreso += Math.floor(Math.random() * 20) + 10; 
            if (progreso > 100) progreso = 100;
            barra.style.width = progreso + '%';
            
            if (progreso === 100) {
                clearInterval(intervaloCarga);
                setTimeout(() => {
                    document.getElementById('loadingScreen').style.display = 'none';
                    document.getElementById('successScreen').style.display = 'block';
                    
                    let randomIndex = Math.floor(Math.random() * mensajesGraciosos.length);
                    document.getElementById('successMessage').innerText = mensajesGraciosos[randomIndex];
                }, 500);
            }
        }, 500);
    });
});