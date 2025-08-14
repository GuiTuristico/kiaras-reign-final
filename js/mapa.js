let map;
let marker;

function initMap() {
    const defaultLocation = { lat: 40.416775, lng: -3.703790 }; // Coordenadas de MasterD (ejemplo)

    map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 15,
    });

    marker = new google.maps.Marker({
        position: defaultLocation,
        map: map,
        title: "Ubicación de MasterD"
    });

    // Intentar obtener la ubicación del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(userLocation);
                marker.setPosition(userLocation);
                marker.setTitle("Tu Ubicación Actual");
            },
            () => {
                // Si el usuario deniega el permiso o hay un error, se mantiene la ubicación de MasterD
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        // El navegador no soporta Geolocation, se mantiene la ubicación de MasterD
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    // Puedes añadir aquí alguna lógica para notificar al usuario si lo deseas
    // Por ejemplo, un console.log o un mensaje en la UI
    console.log(browserHasGeolocation ?
        'Error: El servicio de geolocalización falló.' :
        'Error: Tu navegador no soporta geolocalización.');
}

// Asegúrate de que la API de Google Maps se cargue con el callback initMap
// Esto ya está en tu contacto.html:
// <script async defer src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&callback=initMap&libraries=places"></script>
