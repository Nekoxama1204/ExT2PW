document.addEventListener("DOMContentLoaded", () => {
    
    const cardInput = document.getElementById('cardNumberInput');
    const cardDisplay = document.getElementById('cardNumberDisplay');
    const cardInner = document.getElementById('creditCard');
    const cardScene = document.getElementById('cardScene');
    const cvvInput = document.getElementById('cvvInput');
    const nameInput = document.getElementById('cardNameInput');
    const expiryInput = document.getElementById('cardExpiryInput');
    const formError = document.getElementById('formError');
    
    // 1. Gira al darle clic a la tarjeta
    cardScene.addEventListener('click', () => {
        cardInner.classList.toggle('is-flipped');
    });

    // 2. Gira al darle clic al input del CVV
    cvvInput.addEventListener('focus', () => {
        cardInner.classList.add('is-flipped');
    });

    // 3. Regresa al frente cuando sales del input del CVV
    cvvInput.addEventListener('blur', () => {
        cardInner.classList.remove('is-flipped');
    });

    cvvInput.addEventListener('input', function() {
        let val = this.value.replace(/\D/g, ''); 
        this.value = val;
        document.getElementById('cvvDisplay').innerText = val;
    });

    // --- NÚMEROS VOLADORES Y MÁSCARA ---
    cardInput.addEventListener('input', (e) => {
        let val = cardInput.value.replace(/\D/g, '');
        let formattedVal = val.replace(/(.{4})/g, '$1 ').trim();
        cardInput.value = formattedVal; 

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

    nameInput.addEventListener('input', function() {
        document.getElementById('cardNameDisplay').innerText = this.value.toUpperCase() || 'NOMBRE APELLIDO';
    });
    
    expiryInput.addEventListener('input', function(e) {
        let val = this.value.replace(/\D/g, '');
        if (val.length > 2) val = val.substring(0,2) + '/' + val.substring(2,4);
        this.value = val;
        document.getElementById('cardExpiryDisplay').innerText = val || 'MM/YY';
    });

    // --- CAMBIO DE LOGOS ---
    const radios = document.querySelectorAll('input[name="cardType"]');
    const brandLogoImg = document.getElementById('brandLogoImg');
    
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            brandLogoImg.style.opacity = '0';
            setTimeout(() => {
                if (e.target.value === 'VISA') {
                    brandLogoImg.src = 'assets/visa-logo.png';
                } else {
                    brandLogoImg.src = 'assets/mastercard-logo.png';
                }
                brandLogoImg.style.opacity = '1';
            }, 300);
        });
    });

    // --- LÓGICA DE PAGO Y VALIDACIÓN ---
    const mensajesGraciosos = [
        "¡Compra confirmada! Tus 100 kilos de basura van en camino.",
        "¡Felicidades! Te acabamos de robar tus datos, lol.",
        "Pago exitoso. Tu alma ahora nos pertenece.",
        "Transacción aprobada. Enviaremos un mimo a tu casa a mirarte fijamente.",
        "¡Listo! Has comprado un boleto de ida a Tlaxcala.",
        "Pago procesado. Gracias por financiar mi caguama.",
        "Aprobado. El FBI ya no te está buscando... tanto.",
        "Compra exitosa. Espera tu piedra mascota de 50kg mañana."
    ];

    document.getElementById('payButton').addEventListener('click', (e) => {
        e.preventDefault();
        
        // Validación estricta
        if (cardInput.value.length < 19 || nameInput.value.trim() === '' || expiryInput.value.length < 5 || cvvInput.value.length < 3) {
            formError.classList.remove('d-none'); // Muestra el error
            document.getElementById('checkoutForm').animate([
                { transform: 'translateX(0)' }, { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' }, { transform: 'translateX(0)' }
            ], { duration: 300 });
            return;
        }

        // Si pasa la validación
        formError.classList.add('d-none');
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

    // --- RESETEAR FORMULARIO ---
    document.getElementById('resetBtn').addEventListener('click', () => {
        // Limpiar inputs
        cardInput.value = '';
        nameInput.value = '';
        expiryInput.value = '';
        cvvInput.value = '';
        
        // Limpiar display de la tarjeta
        cardDisplay.innerText = '#### #### #### ####';
        document.getElementById('cardNameDisplay').innerText = 'NOMBRE APELLIDO';
        document.getElementById('cardExpiryDisplay').innerText = 'MM/YY';
        document.getElementById('cvvDisplay').innerText = '';
        
        // Asegurar que la tarjeta esté de frente
        cardInner.classList.remove('is-flipped');
        
        // Resetear barra de progreso y pantallas
        document.getElementById('progressBar').style.width = '0%';
        document.getElementById('successScreen').style.display = 'none';
        document.getElementById('checkoutForm').style.display = 'block';
    });
});