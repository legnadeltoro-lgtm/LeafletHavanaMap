// Crear mapa centrado en La Habana
var map = L.map('map').setView([23.1136, -82.3666], 13);

// Capas base
var streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenTopoMap contributors'
});

// Marcadores
var plaza = L.marker([23.1366, -82.3570]).bindPopup('<b>Plaza de Armas</b><br>Historic square');
var cathedral = L.marker([23.1360, -82.3585]).bindPopup('<b>Catedral de La Habana</b><br>Colonial cathedral');
var museo = L.marker([23.1368, -82.3610]).bindPopup('<b>Museo Nacional</b><br>Cultural museum');
var morro = L.marker([23.1465, -82.3554]).bindPopup('<b>Castillo del Morro</b><br>Coastal defense');
var malecon = L.marker([23.1320, -82.3650]).bindPopup('<b>Malecón</b><br>Famous seafront');

var markersGroup = L.layerGroup([plaza, cathedral, museo, morro, malecon]).addTo(map);

// Ruta entre los lugares
var travelRoute = [
    [23.1366, -82.3570],
    [23.1360, -82.3585],
    [23.1368, -82.3610],
    [23.1465, -82.3554],
    [23.1320, -82.3650]
];

var routeLine = L.polyline(travelRoute, {
    color: "red",
    weight: 4,
    opacity: 0.8
}).bindPopup("Suggested Travel Route").addTo(map);

// GeoJSON (polígono zona histórica)
var oldHavana = {
    "type": "Feature",
    "properties": {
        "name": "Old Havana",
        "popupContent": "Historic area of Havana"
    },
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-82.363, 23.133], 
            [-82.353, 23.133], 
            [-82.353, 23.140], 
            [-82.363, 23.140], 
            [-82.363, 23.133]
        ]]
    }
};

var geojsonLayer = L.geoJSON(oldHavana, {
    style: {
        color: "blue",
        fillColor: "lightblue",
        fillOpacity: 0.3,
        weight: 2
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.popupContent);
    }
}).addTo(map);

// Control de capas
var baseLayers = {
    "Street Map": streetLayer,
    "Topographic Map": topoLayer
};

var overlayLayers = {
    "Markers": markersGroup,
    "Travel Route": routeLine,
    "Historic Polygon": geojsonLayer
};

L.control.layers(baseLayers, overlayLayers).addTo(map);

// Leyenda interactiva con "enlaces" a cada marcador
var legend = L.control({position: 'bottomright'});

legend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'legend');

    // Items de la leyenda como links a los marcadores
    var plazaItem = L.DomUtil.create('div', '', div);
    plazaItem.innerHTML = "<span style='background:green; width:12px; height:12px; display:inline-block; margin-right:6px;'></span> Plaza de Armas";

    var cathedralItem = L.DomUtil.create('div', '', div);
    cathedralItem.innerHTML = "<span style='background:green; width:12px; height:12px; display:inline-block; margin-right:6px;'></span> Catedral de La Habana";

    var museoItem = L.DomUtil.create('div', '', div);
    museoItem.innerHTML = "<span style='background:green; width:12px; height:12px; display:inline-block; margin-right:6px;'></span> Museo Nacional";

    var morroItem = L.DomUtil.create('div', '', div);
    morroItem.innerHTML = "<span style='background:green; width:12px; height:12px; display:inline-block; margin-right:6px;'></span> Castillo del Morro";

    var maleconItem = L.DomUtil.create('div', '', div);
    maleconItem.innerHTML = "<span style='background:green; width:12px; height:12px; display:inline-block; margin-right:6px;'></span> Malecón";

    // Eventos click: flyTo + abrir popup
    L.DomEvent.on(plazaItem, 'click', function() {
        map.flyTo([23.1366, -82.3570], 17);
        plaza.openPopup();
    });
    L.DomEvent.on(cathedralItem, 'click', function() {
        map.flyTo([23.1360, -82.3585], 17);
        cathedral.openPopup();
    });
    L.DomEvent.on(museoItem, 'click', function() {
        map.flyTo([23.1368, -82.3610], 17);
        museo.openPopup();
    });
    L.DomEvent.on(morroItem, 'click', function() {
        map.flyTo([23.1465, -82.3554], 17);
        morro.openPopup();
    });
    L.DomEvent.on(maleconItem, 'click', function() {
        map.flyTo([23.1320, -82.3650], 17);
        malecon.openPopup();
    });

    // Evitar que el clic arrastre el mapa
    L.DomEvent.disableClickPropagation(div);

    return div;
};

legend.addTo(map);
// Travel Order interactivo: al clic, centrar mapa en cada destino
document.getElementById("dest-plaza").onclick = function() {
    map.flyTo([23.1366, -82.3570], 17);
    plaza.openPopup();
};

document.getElementById("dest-cathedral").onclick = function() {
    map.flyTo([23.1360, -82.3585], 17);
    cathedral.openPopup();
};

document.getElementById("dest-museo").onclick = function() {
    map.flyTo([23.1368, -82.3610], 17);
    museo.openPopup();
};

document.getElementById("dest-morro").onclick = function() {
    map.flyTo([23.1465, -82.3554], 17);
    morro.openPopup();
};

document.getElementById("dest-malecon").onclick = function() {
    map.flyTo([23.1320, -82.3650], 17);
    malecon.openPopup();
};
