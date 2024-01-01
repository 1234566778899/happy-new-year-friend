const globo = document.querySelector('.globo');
const actual = document.querySelector('.actual');
const antes = document.querySelector('.antes');
const message = document.querySelector('.message');
const gift = document.querySelector('.gift');
const tapa = document.querySelector('.tapa');
const boxGift = document.querySelector('.box-gift');
const box = document.querySelector('.box');

const urlActual = window.location.href;

const parametrosURL = new URLSearchParams(window.location.search);
const _name = parametrosURL.get('name');

let arr = _name.split('');
arr[0] = arr[0].toUpperCase();
let friend = arr.join('');
message.innerHTML = `Feliz año nuevo ${friend}`

function moverGlobo(x) {
    if (x > 165) {
        globo.style.transform = `translate(${x}px, -75px)`;
        actual.style.transform = `translateX(${x - 5}px)`;
        requestAnimationFrame(() => moverGlobo(x - 2));
    } else {
        alejar(166, 166);
    }
}

function alejar(n, g) {
    if (n < 185 || g > 110) {
        actual.style.transform = `translateX(${n - 5}px)`;
        globo.style.transform = `translate(${g}px, -75px)`;
        requestAnimationFrame(() => alejar(n + 0.2, g - 0.5));
    } else {
        subir(184, -75);
    }
}

function subir(n, g) {
    if (g > -600) {
        globo.style.transform = `translate(111px, ${g}px)`;
        antes.style.transform = `translateY(${g + 75}px)`;
        actual.style.transform = `translateX(${n}px)`;
        requestAnimationFrame(() => subir(n > 125 ? n - 1 : n, g - 3));
    } else {
        message.classList.add('activo');
        globo.remove();
        antes.remove();
        animarEstrellas();
    }
}

function agregarEstrellas() {
    const pos = [-290, 290, -350, 350, -320, 320, -230, 230];
    for (let i = 0; i < pos.length; i++) {
        $('.box').append(`
        <div class="estrella" style="transform: translate(${pos[i]}px, ${310}px);">
        <div class="centro"></div>
        <div class="aspa aspa1"></div>
        <div class="aspa aspa2"></div>
        <div class="aspa aspa3"></div>
        <div class="aspa aspa4"></div>
        <div class="aspa aspa5"></div>
        <div class="aspa aspa6"></div>
        <div class="bolita bolita1"></div>
        <div class="bolita bolita2"></div>
        <div class="bolita bolita3"></div>
        <div class="bolita bolita4"></div>
        <div class="bolita bolita5"></div>
        <div class="bolita bolita6"></div>
        </div>`);
    }
}
function animarEstrellas() {
    const posY = [200, 200, 50, 50, -100, -100, -200, -200];
    const posX = [-290, 290, -350, 350, -320, 320, -230, 230];
    const estrellas = document.querySelectorAll('.estrella');
    for (let i = 0; i < estrellas.length; i++) {
        estrellas[i].style.visibility = 'visible';
        estrellas[i].style.transform = `translate(${posX[i]}px,${posY[i]}px)`;
    }
    setTimeout(() => {
        message.style.opacity = '0';
        setInterval(() => {
            message.innerHTML = 'Éxitos en este 2024 :)';
            message.style.opacity = '1';
        }, 2000);
    }, 3000);
}

function abrir() {
    tapa.classList.add('abierto');
    gift.classList.add('desaparecido');
    document.getElementById('cancionFondo').play();
    setTimeout(() => {
        boxGift.remove();
        box.style.display = 'flex';
        agregarEstrellas();
        moverGlobo(410);
    }, 2000);
}

