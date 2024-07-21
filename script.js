class Alumno {
    constructor(nombre, apellidos, edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materiasInscritas = [];
        this.calificaciones = {};
    }

    inscribirMateria(materia) {
        if (!this.materiasInscritas.includes(materia)) {
            this.materiasInscritas.push(materia);
            this.calificaciones[materia] = null; // Inicializa las calificaciones como null
        }
    }

    asignarCalificacion(materia, calificacion) {
        if (this.materiasInscritas.includes(materia)) {
            this.calificaciones[materia] = calificacion;
        } else {
            console.log(`El alumno no está inscrito en ${materia}`);
        }
    }

    obtenerPromedio() {
        const calificaciones = Object.values(this.calificaciones).filter(c => c !== null);
        if (calificaciones.length === 0) return 0;
        const suma = calificaciones.reduce((a, b) => a + b, 0);
        return suma / calificaciones.length;
    }
}

let alumnos = []; // Lista de alumnos

// Función para guardar en LocalStorage
function guardarEnLocalStorage() {
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

// Función para cargar desde LocalStorage
function cargarDesdeLocalStorage() {
    const datos = localStorage.getItem('alumnos');
    if (datos) {
        alumnos = JSON.parse(datos);
    }
}

// Inicializar desde LocalStorage
cargarDesdeLocalStorage();

// Agregar alumno
document.getElementById('altaAlumnoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = document.getElementById('edad').value;

    const nuevoAlumno = new Alumno(nombre, apellidos, parseInt(edad));
    alumnos.push(nuevoAlumno);
    guardarEnLocalStorage();
    alert('Alumno agregado exitosamente.');
});

// Inscribir a materia
document.getElementById('inscribirMateriaForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const nombre = document.getElementById('alumno').value;
    const materia = document.getElementById('materia').value;

    const alumno = alumnos.find(a => a.nombre === nombre);
    if (alumno) {
        alumno.inscribirMateria(materia);
        guardarEnLocalStorage();
        alert('Materia inscrita exitosamente.');
    } else {
        alert('Alumno no encontrado.');
    }
});

// Asignar calificación
document.getElementById('asignarCalificacionForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const nombre = document.getElementById('alumnoCalificacion').value;
    const materia = document.getElementById('materiaCalificacion').value;
    const calificacion = parseFloat(document.getElementById('calificacion').value);

    const alumno = alumnos.find(a => a.nombre === nombre);
    if (alumno) {
        alumno.asignarCalificacion(materia, calificacion);
        guardarEnLocalStorage();
        alert('Calificación asignada exitosamente.');
    } else {
        alert('Alumno no encontrado.');
    }
});

// Consultar promedio del alumno
document.getElementById('consultarPromedio').addEventListener('click', function () {
    const nombre = prompt('Ingrese el nombre del alumno:');
    const alumno = alumnos.find(a => a.nombre === nombre);
    if (alumno) {
        alert(`El promedio del alumno ${nombre} es ${alumno.obtenerPromedio()}`);
    } else {
        alert('Alumno no encontrado.');
    }
});

// Consultar promedio del grupo
document.getElementById('consultarPromedioGrupo').addEventListener('click', function () {
    const promedios = alumnos.map(a => a.obtenerPromedio());
    const suma = promedios.reduce((a, b) => a + b, 0);
    const promedioGrupo = suma / promedios.length;
    alert(`El promedio del grupo es ${promedioGrupo}`);
});

// Ordenar alumnos por calificación
function ordenarAlumnos(orden) {
    const alumnosOrdenados = [...alumnos].sort((a, b) => {
        const promedioA = a.obtenerPromedio();
        const promedioB = b.obtenerPromedio();
        return orden === 'asc' ? promedioA - promedioB : promedioB - promedioA;
    });
    console.log('Alumnos ordenados:', alumnosOrdenados);
}

// Ordenar alumnos ascendente
document.getElementById('ordenarAlumnosAscendente').addEventListener('click', function () {
    ordenarAlumnos('asc');
    alert('Alumnos ordenados ascendentemente. Ver consola para detalles.');
});

// Ordenar alumnos descendente
document.getElementById('ordenarAlumnosDescendente').addEventListener('click', function () {
    ordenarAlumnos('desc');
    alert('Alumnos ordenados descendentemente. Ver consola para detalles.');
});
