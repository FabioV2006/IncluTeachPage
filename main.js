// Almacenamiento de usuarios
let usuarios = [];

function mostrarInicioSesion() {
    const modal = document.getElementById('modal-inicio-sesion');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function cerrarInicioSesion() {
    const modal = document.getElementById('modal-inicio-sesion');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function mostrarRegistro() {
    const modal = document.getElementById('modal-registro');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function cerrarRegistro() {
    const modal = document.getElementById('modal-registro');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function mostrarInicio() {
    document.querySelector('.contenedor-principal').style.display = 'flex';
    document.querySelector('.sobre-nosotros-seccion').style.display = 'none';
    document.querySelector('.contenido-principal-seccion').style.display = 'none';
}

function mostrarSobreNosotros() {
    document.querySelector('.contenedor-principal').style.display = 'none';
    document.querySelector('.sobre-nosotros-seccion').style.display = 'flex';
    document.querySelector('.contenido-principal-seccion').style.display = 'none';
}

function mostrarContenidoPrincipal() {
    document.querySelector('.contenedor-principal').style.display = 'none';
    document.querySelector('.sobre-nosotros-seccion').style.display = 'none';
    document.querySelector('.contenido-principal-seccion').style.display = 'block';
}

function cambiarTab(tabId) {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    document.querySelector(`button[onclick="cambiarTab('${tabId}')"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function iniciarSesion() {
    const usuario = document.getElementById('input-usuario').value;
    const contrasena = document.querySelector('#modal-inicio-sesion input[type="password"]').value;

    const usuarioEncontrado = usuarios.find(u =>
        (u.usuario === usuario || u.email === usuario) && u.contrasena === contrasena
    );

    if (usuarioEncontrado) {
        localStorage.setItem('nombreUsuario', usuarioEncontrado.usuario);
        document.getElementById('nombre-usuario').textContent = usuarioEncontrado.usuario;
        cerrarInicioSesion();

        document.querySelector('.contenedor-usuario').style.display = 'flex';
        document.querySelectorAll('.boton-nav').forEach(btn => {
            if (btn.textContent === 'Iniciar sesión' || btn.textContent === 'Registrarse') {
                btn.style.display = 'none';
            }
        });
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

function registrarUsuario() {
    const usuario = document.getElementById('input-registro-usuario').value;
    const email = document.querySelector('#modal-registro input[type="email"]').value;
    const contrasena = document.querySelector('#modal-registro input[type="password"]').value;
    const confirmarContrasena = document.querySelectorAll('#modal-registro input[type="password"]')[1].value;

    if (usuario && email && contrasena && confirmarContrasena) {
        if (usuarios.find(u => u.usuario === usuario || u.email === email)) {
            alert('El usuario o email ya está registrado');
            return;
        }

        if (contrasena === confirmarContrasena) {
            usuarios.push({
                usuario: usuario,
                email: email,
                contrasena: contrasena
            });

            alert('Registro exitoso. Por favor inicie sesión.');
            cerrarRegistro();
            mostrarInicioSesion();
        } else {
            alert('Las contraseñas no coinciden');
        }
    } else {
        alert('Por favor, complete todos los campos');
    }
}

function toggleBarraLateral() {
    const barraLateral = document.getElementById('barra-lateral');
    const barraAjustes = document.getElementById('barra-ajustes');

    if (barraLateral.classList.contains('activa')) {
        barraLateral.classList.remove('activa');
        barraAjustes.classList.remove('activa');
    } else {
        barraLateral.classList.add('activa');
    }
}

function toggleModoOscuro() {
    document.body.classList.toggle('modo-oscuro');
    const modoOscuroActivo = document.body.classList.contains('modo-oscuro');
    localStorage.setItem('modoOscuro', modoOscuroActivo);
}

function mostrarBarraAjustes() {
    document.getElementById('barra-lateral').classList.add('activa');

    const barraAjustes = document.getElementById('barra-ajustes');
    barraAjustes.classList.add('activa');
}

function mostrarOpcionAjuste(opcion) {
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-pronta-funcion';
    mensaje.textContent = 'Próxima función';

    const mensajesAnteriores = document.querySelectorAll('.mensaje-pronta-funcion');
    mensajesAnteriores.forEach(m => m.remove());

    document.getElementById('barra-ajustes').appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 2000);
}

function cerrarSesion() {
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('modoOscuro');
    document.body.classList.remove('modo-oscuro');
    document.querySelector('.contenedor-usuario').style.display = 'none';
    document.querySelectorAll('.boton-nav').forEach(btn => {
        if (btn.textContent === 'Iniciar sesión' || btn.textContent === 'Registrarse') {
            btn.style.display = 'block';
        }
    });

    document.getElementById('barra-lateral').classList.remove('activa');
    document.getElementById('barra-ajustes').classList.remove('activa');

    mostrarInicio();
}


function mostrarInformacion(tipo) {
    const modal = document.getElementById('modal-informacion');
    const titulo = document.getElementById('titulo-modal-informacion');
    const contenido = document.getElementById('contenido-modal-informacion');

    const informacion = {
        'quienes-somos': {
            titulo: '¿Quiénes somos?',
            contenido: 'Contenido pendiente...'
        },
        'que-buscamos': {
            titulo: '¿Qué buscamos?',
            contenido: 'Contenido pendiente...'
        },
        'como-trabajamos': {
            titulo: '¿Cómo trabajamos?',
            contenido: 'Contenido pendiente...'
        }
    };

    titulo.textContent = informacion[tipo].titulo;
    contenido.textContent = informacion[tipo].contenido;
    modal.style.display = 'flex';
}

function cerrarModalInformacion() {
    document.getElementById('modal-informacion').style.display = 'none';
}

function mostrarSeccion(seccion) {
    document.querySelectorAll('.seccion').forEach(s => {
        s.classList.remove('activa');
    });

    const barraAjustes = document.getElementById('barra-ajustes');
    if (seccion === 'ajustes') {
        barraAjustes.classList.add('activa');
    } else {
        barraAjustes.classList.remove('activa');
        const seccionActual = document.getElementById(seccion);
        if (seccionActual) {
            seccionActual.classList.add('activa');
        }
    }
}

function cerrarBarrasLaterales() {
    document.getElementById('barra-lateral').classList.remove('activa');
    document.getElementById('barra-ajustes').classList.remove('activa');
}

document.addEventListener('click', function(event) {
    const barraLateral = document.getElementById('barra-lateral');
    const barraAjustes = document.getElementById('barra-ajustes');
    const contenedorUsuario = document.querySelector('.contenedor-usuario');

    if (!barraLateral.contains(event.target) &&
        !barraAjustes.contains(event.target) &&
        !contenedorUsuario.contains(event.target)) {
        cerrarBarrasLaterales();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    localStorage.clear();
    const contenedorUsuario = document.querySelector('.contenedor-usuario');
    contenedorUsuario.style.display = 'none';

    document.querySelectorAll('.boton-nav').forEach(btn => {
        if (btn.textContent === 'Iniciar sesión' || btn.textContent === 'Registrarse') {
            btn.style.display = 'block';
        }
    });

    document.querySelector('.boton-comenzar').addEventListener('click', mostrarContenidoPrincipal);

    mostrarInicio();
});

document.getElementById('modal-inicio-sesion').addEventListener('click', function(event) {
    if (event.target === this) {
        cerrarInicioSesion();
    }
});

document.getElementById('modal-registro').addEventListener('click', function(event) {
    if (event.target === this) {
        cerrarRegistro();
    }
});

document.getElementById('modal-informacion').addEventListener('click', function(event) {
    if (event.target === this) {
        cerrarModalInformacion();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleModoOscuroCheckbox = document.getElementById('toggle-modo-oscuro');
    if (toggleModoOscuroCheckbox) {
        const modoOscuro = localStorage.getItem('modoOscuro') === 'true';
        toggleModoOscuroCheckbox.checked = modoOscuro;
        document.body.classList.toggle('modo-oscuro', modoOscuro);

        toggleModoOscuroCheckbox.addEventListener('change', toggleModoOscuro);
    }
});
/*AÑADIENDO*/
// Datos simulados para foros, anuncios, videos y cursos
const forosData = [
    {
        id: 1,
        titulo: "Foro de Matemáticas",
        descripcion: "Discusiones sobre métodos de enseñanza en matemáticas",
        comentarios: [],
        autor: "Admin",
        imagen: "https://img.freepik.com/vector-gratis/ilustracion-concepto-matemticas_114360-4573.jpg"
    },
    {
        id: 2,
        titulo: "Foro de Lenguaje",
        descripcion: "Estrategias para la enseñanza de lectura y escritura",
        comentarios: [],
        autor: "Admin",
        imagen: "https://img.freepik.com/vector-gratis/ilustracion-concepto-libro-lectura_114360-8261.jpg"
    }
];

const anunciosData = [
    {
        id: 1,
        titulo: "Nuevo Curso Disponible",
        descripcion: "Aprende nuevas metodologías de enseñanza",
        detalles: "Este curso te proporcionará herramientas innovadoras para mejorar tus estrategias de enseñanza.",
        fecha: "15 de noviembre de 2024",
        imagen: "./assets/images/logo.png"  // Usa tu logo actual
    },
    {
        id: 2,
        titulo: "Próximo Evento",
        descripcion: "Conferencia sobre educación inclusiva",
        detalles: "Únete a nosotros para explorar las últimas tendencias en educación inclusiva y accesibilidad.",
        fecha: "20 de diciembre de 2024",
        imagen: "./assets/images/logo.png"  // Usa tu logo actual
    }
];

const cursosData = [
    {
        id: 1,
        titulo: "Educación Inclusiva",
        descripcion: "Curso completo sobre estrategias para una educación más inclusiva",
        enlace: "https://ejemplo.com/curso-educacion-inclusiva",
        temario: [
            "Introducción a la educación inclusiva",
            "Identificación de necesidades especiales",
            "Estrategias de adaptación curricular",
            "Herramientas y recursos"
        ],
        imagen: "https://img.freepik.com/vector-gratis/ilustracion-concepto-educacion-inclusiva_114360-9607.jpg"
    },
    {
        id: 2,
        titulo: "Tecnología en el Aula",
        descripcion: "Herramientas digitales para la educación moderna",
        enlace: "https://ejemplo.com/curso-tecnologia-educativa",
        temario: [
            "Introducción a herramientas digitales",
            "Plataformas de aprendizaje en línea",
            "Integración de tecnología en el aula",
            "Recursos digitales para educación"
        ],
        imagen: "https://img.freepik.com/vector-gratis/ilustracion-concepto-tecnologia-educativa_114360-5217.jpg"
    }
];
const videosData = [
    {
        id: 1,
        titulo: "Tutorial de Matemáticas",
        descripcion: "Estrategias para enseñar conceptos matemáticos complejos",
        youtubeLink: "https://www.youtube.com/embed/ejemplo1",
        duracion: "45 minutos"
    },
    {
        id: 2,
        titulo: "Estrategias de Enseñanza",
        descripcion: "Metodologías innovadoras en el aula",
        youtubeLink: "https://www.youtube.com/embed/ejemplo2",
        duracion: "60 minutos"
    }
];

// Función para cargar foros
function cargarForos() {
    const forosContainer = document.getElementById('foros');
    forosContainer.innerHTML = `
        <h2>Foros de Discusión</h2>
        <div class="grid-contenido">
            ${forosData.map(foro => `
                <div class="tarjeta-contenido">
                    <img src="${foro.imagen}" alt="${foro.titulo}" class="imagen-contenido">
                    <div class="contenido-tarjeta">
                        <h3>${foro.titulo}</h3>
                        <p>${foro.descripcion}</p>
                        <button onclick="abrirForo(${foro.id})" class="boton-accion">Entrar al foro</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}


// Función para abrir un foro específico
function abrirForo(idForo) {
    const foro = forosData.find(f => f.id === idForo);
    const modalForo = document.createElement('div');
    modalForo.className = 'modal-foro';
    modalForo.innerHTML = `
        <div class="contenido-modal-foro">
            <button class="boton-cerrar" onclick="cerrarModalForo()">&times</button>
            <h2>${foro.titulo}</h2>
            <p>${foro.descripcion}</p>
            <div class="seccion-comentarios">
                <h3>Comentarios</h3>
                <div id="lista-comentarios">
                    ${foro.comentarios.map(comentario => `
                        <div class="comentario">
                            <strong>${comentario.autor}:</strong> ${comentario.texto}
                        </div>
                    `).join('') || 'No hay comentarios aún.'}
                </div>
                <div class="nuevo-comentario">
                    <textarea id="texto-comentario" placeholder="Escribe tu comentario..."></textarea>
                    <button onclick="agregarComentario(${idForo})">Enviar</button>
                </div>
            </div>
            <button onclick="cerrarModalForo()">Cerrar</button>
        </div>
    `;
    document.body.appendChild(modalForo);
}

// Función para agregar comentario
function agregarComentario(idForo) {
    const textoComentario = document.getElementById('texto-comentario').value;
    if (textoComentario.trim()) {
        const foro = forosData.find(f => f.id === idForo);
        foro.comentarios.push({
            autor: 'Usuario',
            texto: textoComentario
        });
        abrirForo(idForo);
    }
}

// Función para cerrar modal de foro
function cerrarModalForo() {
    const modalForo = document.querySelector('.modal-foro');
    if (modalForo) {
        modalForo.remove();
    }
}

// Función para cargar anuncios
function cargarAnuncios() {
    const anunciosContainer = document.getElementById('anuncios');
    anunciosContainer.innerHTML = `
        <h2>Anuncios Importantes</h2>
        <div class="grid-contenido">
            ${anunciosData.map(anuncio => `
                <div class="tarjeta-contenido">
                    <img src="${anuncio.imagen}" alt="${anuncio.titulo}" class="logo-anuncio">
                    <div class="contenido-tarjeta">
                        <h3>${anuncio.titulo}</h3>
                        <p>${anuncio.descripcion}</p>
                        <button onclick="mostrarDetallesAnuncio(${anuncio.id})" class="boton-accion">Ver más</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Función para mostrar detalles de anuncio
function mostrarDetallesAnuncio(idAnuncio) {
    const anuncio = anunciosData.find(a => a.id === idAnuncio);
    const modalAnuncio = document.createElement('div');
    modalAnuncio.className = 'modal-anuncio';
    modalAnuncio.innerHTML = `
        <div class="contenido-modal-anuncio">
            <button class="boton-cerrar" onclick="cerrarModalAnuncio()">&times</button>
            <h2>${anuncio.titulo}</h2>
            <p>${anuncio.descripcion}</p>
            <div class="detalles-anuncio">
                <p>${anuncio.detalles}</p>
                <small>Fecha: ${anuncio.fecha}</small>
            </div>
            <button onclick="cerrarModalAnuncio()">Cerrar</button>
        </div>
    `;
    document.body.appendChild(modalAnuncio);
}

// Función para cerrar modal de anuncio
function cerrarModalAnuncio() {
    const modalAnuncio = document.querySelector('.modal-anuncio');
    if (modalAnuncio) {
        modalAnuncio.remove();
    }
}

// Función para cargar videos
function cargarVideos() {
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = `
        <h2>Videos Educativos</h2>
        <div class="grid-contenido">
            ${videosData.map(video => `
                <div class="tarjeta-contenido" onclick="mostrarDetallesVideo(${video.id})">
                    <iframe 
                        width="100%" 
                        height="200" 
                        src="${video.youtubeLink}" 
                        frameborder="0" 
                        allowfullscreen
                    ></iframe>
                    <h3>${video.titulo}</h3>
                    <button class="boton-accion">Ver detalles</button>
                </div>
            `).join('')}
        </div>
    `;
}

// Función para mostrar detalles de video
function mostrarDetallesVideo(idVideo) {
    const video = videosData.find(v => v.id === idVideo);
    const modalVideo = document.createElement('div');
    modalVideo.className = 'modal-video';
    modalVideo.innerHTML = `
        <div class="contenido-modal-video">
            <button class="boton-cerrar" onclick="cerrarModalVideo()">&times</button>
            <h2>${video.titulo}</h2>
            <iframe 
                width="100%" 
                height="400" 
                src="${video.youtubeLink}" 
                frameborder="0" 
                allowfullscreen
            ></iframe>
            <div class="detalles-video">
                <p>${video.descripcion}</p>
                <small>Duración: ${video.duracion}</small>
            </div>
            <button onclick="cerrarModalVideo()">Cerrar</button>
        </div>
    `;
    document.body.appendChild(modalVideo);
}

// Función para cerrar modal de video
function cerrarModalVideo() {
    const modalVideo = document.querySelector('.modal-video');
    if (modalVideo) {
        modalVideo.remove();
    }
}

// Función para cargar cursos
function cargarCursos() {
    const cursosContainer = document.getElementById('cursos');
    cursosContainer.innerHTML = `
        <h2>Cursos Disponibles</h2>
        <div class="grid-contenido">
            ${cursosData.map(curso => `
                <div class="tarjeta-contenido">
                    <img src="${curso.imagen}" alt="${curso.titulo}" class="imagen-contenido">
                    <div class="contenido-tarjeta">
                        <h3>${curso.titulo}</h3>
                        <p>${curso.descripcion}</p>
                        <button onclick="mostrarDetallesCurso(${curso.id})" class="boton-accion">Ver curso</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Modificar la función de mostrar detalles de curso
function mostrarDetallesCurso(idCurso) {
    const curso = cursosData.find(c => c.id === idCurso);
    const modalCurso = document.createElement('div');
    modalCurso.className = 'modal-curso';
    modalCurso.innerHTML = `
        <div class="contenido-modal-curso">
            <button class="boton-cerrar" onclick="cerrarModalCurso()">&times</button>
            <img src="${curso.imagen}" alt="${curso.titulo}" class="imagen-modal">
            <div class="contenido-modal">
                <h2>${curso.titulo}</h2>
                <div class="detalles-curso">
                    <p>${curso.descripcion}</p>
                    <h3>Temario del Curso:</h3>
                    <ul>
                        ${curso.temario.map(tema => `<li>${tema}</li>`).join('')}
                    </ul>
                    <div class="botones-modal">
                        <a href="${curso.enlace}" target="_blank" class="boton-accion">Ir al Curso</a>
                        <button onclick="cerrarModalCurso()" class="boton-cerrar-modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalCurso);
}

// Función para cerrar modal de curso
function cerrarModalCurso() {
    const modalCurso = document.querySelector('.modal-curso');
    if (modalCurso) {
        modalCurso.remove();
    }
}

// Eventos de carga iniciales
document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos en pestañas
    cargarForos();
    cargarAnuncios();
    cargarVideos();
    cargarCursos();
});
