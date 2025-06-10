document.addEventListener('DOMContentLoaded', () => {
    // Default campus center (replace with your campus's coordinates)
    const defaultCampusCenter = [31.104829, 77.173390]; // Example: Delhi, India
    const defaultZoom = 16;

    // Initialize the map
    const map = L.map('map').setView(defaultCampusCenter, defaultZoom);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define some campus locations with markers
    const campusLocations = [
        { lat: 30.757085294207997, lon: 77.29919541201659, name: 'eternal university' },
        { lat: 30.75615208879401, lon: 77.29895916980128, name: 'new girls hostel' },
        { lat: 30.75602237935943, lon: 77.30000933049523, name: 'akal college of nursing' },
        { lat: 30.75607945540646, lon: 77.29821148125366, name: 'apple a day' },
        { lat: 30.75564231335872, lon: 77.29935801003823, name: 'akal charitable hospital' },
        { lat: 30.755368805502417, lon: 77.29779002259855, name: 'tennis court' },
        { lat: 30.755034862248504, lon: 77.29725187324463, name: 'helipad akal academy baru sahib' },
        { lat: 30.754414805052125, lon: 77.2959490723202, name: 'teacher building' },
        { lat: 30.756557825749493, lon: 77.29754335345932, name: 'solar power plant' },
        { lat: 30.75531153848804, lon: 77.29602015866725, name: 'akal academy baru sahib' },
        { lat: 30.755620751375464, lon: 77.29667115648739, name: 'guest room' },
        { lat: 30.754970808242, lon: 77.296080288195, name: 'sbi atm' },
        { lat: 30.75491598350065, lon: 77.2961140965474, name: 'branch post office' },
        { lat: 30.75496208328654, lon: 77.29525310744602, name: 'baru sahib gurudwara' },
        { lat: 30.754722364154674, lon: 77.29479176749662, name: 'vip building' },
        { lat: 30.754169904131313, lon: 77.29375061947748, name: 'chango temple' },
        { lat: 30.753957952269694, lon: 77.29251566367134, name: 'sangat building' },
        { lat: 30.753549645100644, lon: 77.29310913159595, name: 'amphitheatre' },
        { lat: 30.75303389085421, lon: 77.29331590562147, name: 'ib school' }
    ];

    function findCampusLocationByName(name) {
    return campusLocations.find(loc => loc.name.toLowerCase() === name.toLowerCase());}

    // Add markers for default campus locations
    campusLocations.forEach(location => {
        L.circleMarker([location.lat, location.lon], {
            radius: 0.001, // practically invisible
            opacity: 0,
            fillOpacity: 0
        })
        .bindTooltip(location.name, {
            permanent: true,
            direction: 'top',
            className: 'location-label'
        })
        .addTo(map);

    });

    // Variable to store the routing control
    let routingControl = null;
    let currentUserLocation = null;

    // Function to get current location
    function getCurrentLocation(callback) {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    currentUserLocation = L.latLng(lat, lon);
                    console.log("Current Location:", currentUserLocation);
                    callback(currentUserLocation);
                },
                (error) => {
                    console.error("Error getting current location:", error);
                    alert("Could not get your current location. Please enable location services or try again.");
                    callback(null);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
            callback(null);
        }
    }

    // Function to get coordinates from a location name using Nominatim (OpenStreetMap's geocoding service)
    async function getCoordinatesFromLocation(locationName) {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.length > 0) {
                return L.latLng(parseFloat(data[0].lat), parseFloat(data[0].lon));
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error geocoding location:", error);
            return null;
        }
    }

    // Event listener for the "Get Directions" button
    document.getElementById('getDirections').addEventListener('click', async () => {
        const destinationName = document.getElementById('destinationSearch').value.trim();

        if (!destinationName) {
            alert("Please enter a destination.");
            return;
        }

        // Get current location first
        getCurrentLocation(async (currentLocation) => {
            if (!currentLocation) {
                return; // User denied location or error occurred
            }

            const destination = findCampusLocationByName(destinationName);
            if (!destination) {
                alert(`Could not find "${destinationName}" in campus locations.`);
                return;
            }
            const destinationLatLng = L.latLng(destination.lat, destination.lon);


            // Remove existing route if any
            if (routingControl) {
                map.removeControl(routingControl);
            }

            // Create the routing control
            routingControl = L.Routing.control({
                waypoints: [ currentLocation, destinationLatLng ],
                routeWhileDragging: true,
                showAlternatives: true,
                collapsible: true, // Make the routing panel collapsible
                language: 'en', // Set language for directions
                // Use OpenStreetMap's OSRM demo server for routing
                router: L.Routing.osrmv1({
                    serviceUrl: 'https://router.project-osrm.org/route/v1'
                }),
                // You can customize the marker icons for start and end points
                createMarker: function(i, waypoint, n) {
                    const markerIcon = L.icon({
                        iconUrl: i === 0 ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png' : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    });
                    return L.marker(waypoint.latLng, { icon: markerIcon });
                }
            }).addTo(map);

            // Zoom to fit the route
            routingControl.on('routesfound', function(e) {

                const routes = e.routes;
                if (routes.length > 0) {
                    const bounds = L.latLngBounds(e.routes[0].coordinates);
                    map.fitBounds(bounds);
                }

                L.popup().setLatLng(currentLocation).setContent("You are here").openOn(map);
                L.popup().setLatLng(destinationLatLng).setContent(destination.name).openOn(map);
            });
        });
    });
});