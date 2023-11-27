const elementDateTime = document.getElementById("fechaHora");

let map = L.map("map").fitWorld();
let pickupMarker;
let dropoffMarker;
let dist;
let date;

function getDistance(start, end) {
    let distance = map.distance(start, end).toFixed(0)
    console.log(distance)
    return distance
}

function transformHourSegment(s) {
    if (s < 1) return "00:00 am - 03:59 am";
    else if (s < 2) return "04:00 am - 07:59 am"
    else if (s < 3) return "08:00 am - 11:59 am";
    else if (s < 4) return "12:00 pm - 03:59 pm";
    else if (s < 5) return "04:00 pm - 07:59 pm";
    else return "08:00 PM - 11:59 PM";
}

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
        dist = getDistance(start, end)
        console.log("distance", dist)
        console.log(start, end)
        document.getElementById("disance-info").textContent = dist + " m"
    }
    // If both markers exist, don't add more
}

// Event listener for adding markers
map.on("click", addMarker);

async function getTopFares() {
    console.log("Fetching top fares...");
    if (!pickupMarker || !dropoffMarker) {
        $('#go-modal').modal('toggle')
    } else {
        await fetch('http://localhost:5000/get-fares', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*  "
            },
            mode: "cors",
            body: JSON.stringify({distance: dist})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                displayData(data);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }
}

function displayData(data) {
    const modalBody = $('#data-modal .modal-body')
    modalBody.empty()

    let currentHour = new Date().getHours()
    let firstElementAdded = false
    let top

    if (currentHour < 4) currentHour = 1; // 00:00 am - 03:59 am
    else if (currentHour < 8) currentHour = 2; // 04:00 am - 07:59 am
    else if (currentHour < 12) currentHour = 3; // 08:00 am - 11:59 am
    else if (currentHour < 16) currentHour = 4; // 12:00 pm - 03:59 pm
    else if (currentHour < 20) currentHour = 5; // 04:00 pm - 07:59 pm
    else currentHour = 6;

    console.log("Hour segment selected: ", currentHour)

    data.forEach((record, index) => {
        if (record.Hour_Segment >= currentHour && !firstElementAdded) {
            const recordDiv = $('<div class="record"></div>')
            recordDiv.html(
                `<b>Prediction</b><br/>` +
                `Best time: ${transformHourSegment(record.Hour_Segment)}<br/>` +
                `Estimated Price: ${Math.round(record.Predicted * 100)/100} $USD<br/>` +
                `Ride distance: ${dist} m`
                )
            modalBody.append(recordDiv)
            firstElementAdded = true
        }
    })

    $('#data-modal').modal('toggle')
}

function resetPins() {
    // This function resets the pointers on the map to set up new pickup and dropoff locations
    console.log("Reseting pointers...")
    location.reload();
}

function updateDateTime() {
    date = new Date();

    // inits date and time format
    elementDateTime.innerHTML = date.toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// Updates date and time every second
setInterval(updateDateTime, 1000);

// Page inits with current date and time