let map = L.map("map").fitWorld();
let pickupMarker;
let dropoffMarker;

// Initialize the map and set its view to the user's current position
map.locate({ setView: true, maxZoom: 16 });

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Handle a user's location found
function onLocationFound(e) {
    let radius = e.accuracy / 2;

    L.marker(e.latlng)
        .addTo(map)
        .bindPopup("You are within " + radius + " meters from this point")
        .openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on("locationfound", onLocationFound);

// Handle the case where the user's location can't be found
function onLocationError(e) {
    alert(e.message);
}

map.on("locationerror", onLocationError);

// Function to add a marker for pickup or dropoff
function addMarker(e) {
// Add the first marker as the pickup location
    if (!pickupMarker) {
        pickupMarker = new L.marker(e.latlng, {
        draggable: true,
        })
        .addTo(map)
        .bindPopup("Pickup Location")
        .openPopup();

        start = pickupMarker.getLatLng()

        document.getElementById("pickup-info").textContent = start
        .toString();
    } else if (!dropoffMarker) {
        // Add the next marker as the dropoff location
        dropoffMarker = new L.marker(e.latlng, {
        draggable: true,
        })
        .addTo(map)
        .bindPopup("Dropoff Location")
        .openPopup();

        end = dropoffMarker.getLatLng()

        document.getElementById("dropoff-info").textContent = end
        .toString();
    } 

    if (pickupMarker && dropoffMarker) {
        let dist = map.distance(start, end).toFixed(0)
        console.log("distance",dist)
        console.log(start, end)
        document.getElementById("disance-info").textContent = dist + " m"
    }
    // If both markers exist, don't add more
}

// Event listener for adding markers
map.on("click", addMarker);

function getTopFares() {
    // This function should be implemented to interact with your backend
    console.log("Fetching top fares...");
    
    // fetch("/get-estimations", (err, req) => {
    //     req.
    // })
}

function resetPins() {
    // This function resets the pointers on the map to set up new pickup and dropoff locations
    console.log("Reseting pointers...")
    location.reload();
}