// Almacenamiento de usuarios
let usuarios = [];

// Función para mostrar el modal de inicio de sesión
function mostrarInicioSesion() {
    const modal = document.getElementById('modal-inicio-sesion');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Función para cerrar el modal de inicio de sesión
function cerrarInicioSesion() {
    const modal = document.getElementById('modal-inicio-sesion');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Función para mostrar el modal de registro
function mostrarRegistro() {
    const modal = document.getElementById('modal-registro');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Función para cerrar el modal de registro
function cerrarRegistro() {
    const modal = document.getElementById('modal-registro');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Función para mostrar la página principal (inicio)
function mostrarInicio() {
    document.querySelector('.contenedor-principal').style.display = 'flex';
    document.querySelector('.sobre-nosotros-seccion').style.display = 'none';
    document.querySelector('.contenido-principal-seccion').style.display = 'none';
}

// Función para mostrar la sección Sobre Nosotros
function mostrarSobreNosotros() {
    document.querySelector('.contenedor-principal').style.display = 'none';
    document.querySelector('.sobre-nosotros-seccion').style.display = 'flex';
    document.querySelector('.contenido-principal-seccion').style.display = 'none';
}

// Nueva función para mostrar la sección de contenido principal
function mostrarContenidoPrincipal() {
    document.querySelector('.contenedor-principal').style.display = 'none';
    document.querySelector('.sobre-nosotros-seccion').style.display = 'none';
    document.querySelector('.contenido-principal-seccion').style.display = 'block';
}

// Función para cambiar entre tabs en la sección de contenido principal
function cambiarTab(tabId) {
    // Remover clase active de todos los botones y contenidos
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Agregar clase active al botón y contenido seleccionado
    document.querySelector(`button[onclick="cambiarTab('${tabId}')"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Función para iniciar sesión
function iniciarSesion() {
    const usuario = document.getElementById('input-usuario').value;
    const contrasena = document.querySelector('#modal-inicio-sesion input[type="password"]').value;

    // Buscar usuario en el array
    const usuarioEncontrado = usuarios.find(u =>
        (u.usuario === usuario || u.email === usuario) && u.contrasena === contrasena
    );

    if (usuarioEncontrado) {
        localStorage.setItem('nombreUsuario', usuarioEncontrado.usuario);
        document.getElementById('nombre-usuario').textContent = usuarioEncontrado.usuario;
        cerrarInicioSesion();

        // Mostrar contenedor de usuario y ocultar botones de login/registro
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

// Función para registrar usuario
function registrarUsuario() {
    const usuario = document.getElementById('input-registro-usuario').value;
    const email = document.querySelector('#modal-registro input[type="email"]').value;
    const contrasena = document.querySelector('#modal-registro input[type="password"]').value;
    const confirmarContrasena = document.querySelectorAll('#modal-registro input[type="password"]')[1].value;

    if (usuario && email && contrasena && confirmarContrasena) {
        // Verificar si el usuario ya existe
        if (usuarios.find(u => u.usuario === usuario || u.email === email)) {
            alert('El usuario o email ya está registrado');
            return;
        }

        if (contrasena === confirmarContrasena) {
            // Agregar usuario al array
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

// Actualizar la función toggleBarraLateral
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

// Función para alternar modo oscuro (agregar nueva)
function toggleModoOscuro() {
    document.body.classList.toggle('modo-oscuro');
    const modoOscuroActivo = document.body.classList.contains('modo-oscuro');
    localStorage.setItem('modoOscuro', modoOscuroActivo);
}

// Función para mostrar barra lateral de ajustes
function mostrarBarraAjustes() {
    // Asegurarse de que la barra lateral principal esté activa
    document.getElementById('barra-lateral').classList.add('activa');

    // Mostrar la barra de ajustes
    const barraAjustes = document.getElementById('barra-ajustes');
    barraAjustes.classList.add('activa');
}

// Función para manejar opciones de ajustes
function mostrarOpcionAjuste(opcion) {
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-pronta-funcion';
    mensaje.textContent = 'Próxima función';

    // Remover mensajes anteriores si existen
    const mensajesAnteriores = document.querySelectorAll('.mensaje-pronta-funcion');
    mensajesAnteriores.forEach(m => m.remove());

    // Agregar el nuevo mensaje
    document.getElementById('barra-ajustes').appendChild(mensaje);

    // Eliminar el mensaje después de 2 segundos
    setTimeout(() => {
        mensaje.remove();
    }, 2000);
}

// Función para cerrar sesión
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

    // Cerrar barras laterales
    document.getElementById('barra-lateral').classList.remove('activa');
    document.getElementById('barra-ajustes').classList.remove('activa');

    // Volver a la página de inicio
    mostrarInicio();
}


// Función para mostrar información en el modal
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

// Función para cerrar el modal de información
function cerrarModalInformacion() {
    document.getElementById('modal-informacion').style.display = 'none';
}

// Función para mostrar secciones y manejar la barra lateral secundaria
function mostrarSeccion(seccion) {
    // Ocultar todas las secciones primero
    document.querySelectorAll('.seccion').forEach(s => {
        s.classList.remove('activa');
    });

    // Si la sección es "ajustes", mostrar la barra lateral secundaria
    const barraAjustes = document.getElementById('barra-ajustes');
    if (seccion === 'ajustes') {
        barraAjustes.classList.add('activa');
    } else {
        barraAjustes.classList.remove('activa');
        // Mostrar la sección seleccionada
        const seccionActual = document.getElementById(seccion);
        if (seccionActual) {
            seccionActual.classList.add('activa');
        }
    }
}

// Función para cerrar barras laterales
function cerrarBarrasLaterales() {
    document.getElementById('barra-lateral').classList.remove('activa');
    document.getElementById('barra-ajustes').classList.remove('activa');
}

// Función para manejar el cierre de barras laterales al hacer clic fuera
document.addEventListener('click', function(event) {
    const barraLateral = document.getElementById('barra-lateral');
    const barraAjustes = document.getElementById('barra-ajustes');
    const contenedorUsuario = document.querySelector('.contenedor-usuario');

    // Si el clic no fue en las barras laterales ni en el contenedor de usuario
    if (!barraLateral.contains(event.target) &&
        !barraAjustes.contains(event.target) &&
        !contenedorUsuario.contains(event.target)) {
        cerrarBarrasLaterales();
    }
});

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Limpiar localStorage al inicio
    localStorage.clear();
    const contenedorUsuario = document.querySelector('.contenedor-usuario');
    contenedorUsuario.style.display = 'none';

    // Mostrar botones de inicio de sesión y registro
    document.querySelectorAll('.boton-nav').forEach(btn => {
        if (btn.textContent === 'Iniciar sesión' || btn.textContent === 'Registrarse') {
            btn.style.display = 'block';
        }
    });

    // Asignar evento al botón comenzar
    document.querySelector('.boton-comenzar').addEventListener('click', mostrarContenidoPrincipal);

    // Mostrar página de inicio por defecto
    mostrarInicio();
});

// Event listeners para cerrar modales al hacer clic fuera
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

// Event Listeners (agregar al final del archivo JavaScript)
/*document.addEventListener('DOMContentLoaded', () => {
    // Verificar modo oscuro guardado
    const modoOscuro = localStorage.getItem('modoOscuro');
    if (modoOscuro === 'true') {
        document.body.classList.add('modo-oscuro');
    }

    // Configurar toggle de modo oscuro
    const toggleModoOscuroCheckbox = document.getElementById('toggle-modo-oscuro');
    if (toggleModoOscuroCheckbox) {
        toggleModoOscuroCheckbox.checked = modoOscuro === 'true';
        toggleModoOscuroCheckbox.addEventListener('change', toggleModoOscuro);
    }
});*/
// Event Listener para el checkbox de modo oscuro
document.addEventListener('DOMContentLoaded', () => {
    const toggleModoOscuroCheckbox = document.getElementById('toggle-modo-oscuro');
    if (toggleModoOscuroCheckbox) {
        // Verificar el estado guardado del modo oscuro
        const modoOscuro = localStorage.getItem('modoOscuro') === 'true';
        toggleModoOscuroCheckbox.checked = modoOscuro;
        document.body.classList.toggle('modo-oscuro', modoOscuro);

        // Agregar event listener para el cambio
        toggleModoOscuroCheckbox.addEventListener('change', toggleModoOscuro);
    }
});
