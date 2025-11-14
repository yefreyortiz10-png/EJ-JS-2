document.addEventListener('DOMContentLoaded', () => {
    const tableroJuego = document.getElementById("tablero-juego");
    const imagenesMounstruos = [
        "monstruo1.png",
        "monstruo2.png",
        "monstruo3.png",
        "monstruo4.png",
        "monstruo5.png",
        "monstruo6.png"
    ];

    let cartasArray = [...imagenesMounstruos, ...imagenesMounstruos];
    cartasArray.sort(() => 0.5 - Math.random());

    let cartasVolteadas = [];
    let idsCartsVolteadas = [];
    let paresEncontrados = 0;

    function crearTablero() {
        for (let i = 0; i < cartasArray.length; i++) {
            const carta = document.createElement('div');
            carta.classList.add('carta');
            carta.setAttribute("data-id", i);

            const caraFrontal = document.createElement("div");
            caraFrontal.classList.add('cara', 'frontal');
            const imgFrontal = document.createElement('img');
            imgFrontal.setAttribute('src', 'img/cover.png');
            caraFrontal.appendChild(imgFrontal);

            const caraTrasera = document.createElement('div');
            caraTrasera.classList.add('cara', 'trasera');
            const imgTrasera = document.createElement('img');
            imgTrasera.setAttribute('src', 'img/' + cartasArray[i]);
            caraTrasera.appendChild(imgTrasera);

            carta.appendChild(caraFrontal);
            carta.appendChild(caraTrasera);

            tableroJuego.appendChild(carta);
            carta.addEventListener('click', voltearCarta)

        }
    }

    function voltearCarta() {
        const idCarta = this.getAttribute('data-id');
        console.log(idCarta);

        if (idsCartsVolteadas.includes(idCarta)) return;

        if (cartasVolteadas.length < 2) {
            this.classList.add('volteada');

            cartasVolteadas.push(cartasArray[idCarta]);
            idsCartsVolteadas.push(idCarta);

            if (cartasVolteadas.length === 2) {
                setTimeout(comprobarPareja, 1500);
            }
        }
    }

    function comprobarPareja() {
        const todasLasCartas = document.querySelectorAll('.carta');
        const idPrimeraCarta = idsCartsVolteadas[0];
        const idSegundaCarta = idsCartsVolteadas[1];

        if (cartasVolteadas[0] === cartasVolteadas[1]
            &&
            idPrimeraCarta !== idSegundaCarta
        ) {
            //Encontramos una pareja
            todasLasCartas[idPrimeraCarta].classList.add('acertada');
            todasLasCartas[idSegundaCarta].classList.add('acertada');

            todasLasCartas[idPrimeraCarta].removeEventListener('click', voltearCarta);
            todasLasCartas[idSegundaCarta].removeEventListener('click', voltearCarta);

            paresEncontrados++;
        } else {
            todasLasCartas[idPrimeraCarta].classList.remove('volteada');
            todasLasCartas[idSegundaCarta].classList.remove('volteada');
        }

        cartasVolteadas = [];
        idsCartsVolteadas = [];

        if (paresEncontrados === imagenesMounstruos.length) {
            alert('Felicitaciones... Has encontrado todos los mounstruos');
        }
    }

    crearTablero();
});