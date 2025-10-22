window.onload = function() {
    try {
        if (typeof ol === 'undefined') {
            console.error("OpenLayers (ol) library not found. Check your internet connection.");
            if (document.getElementById('map')) {
                document.getElementById('map').innerHTML = 'Map could not be loaded. Check your internet connection.';
            }
            return;
        }

        if (!document.getElementById('map')) {
            return;
        }

        const { Map, View, layer, source, proj, Feature, geom, style } = ol;

        const departmentLonLat = [32.7339, 39.8656];
        const departmentMercator = proj.fromLonLat(departmentLonLat);

        const iconFeature = new Feature({
            geometry: new geom.Point(departmentMercator),
            name: 'Hacettepe Geomatics Eng.'
        });

        const iconStyle = new style.Style({
            image: new style.Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: 'https://openlayers.org/en/latest/examples/data/icon.png'
            })
        });

        iconFeature.setStyle(iconStyle);

        const vectorSource = new source.Vector({
            features: [iconFeature]
        });

        const vectorLayer = new layer.Vector({
            source: vectorSource
        });

        const osmLayer = new layer.Tile({
            source: new source.OSM()
        });

        const view = new View({
            center: departmentMercator,
            zoom: 18
        });

        const map = new Map({
            target: 'map',
            layers: [
                osmLayer,
                vectorLayer
            ],
            view: view
        });

        map.on('click', function(evt) {
            const clickedMercatorCoord = evt.coordinate;
            const clickedLonLat = proj.toLonLat(clickedMercatorCoord);
            
            const longitude = clickedLonLat[0].toFixed(4);
            const latitude = clickedLonLat[1].toFixed(4);

            alert(
                'Clicked coordinates:\n' +
                'Longitude: ' + longitude + '\n' +
                'Latitude: ' + latitude
            );
        });

    } catch (e) {
        console.error("An error occurred while loading the map: ", e);
        if (document.getElementById('map')) {
            document.getElementById('map').innerHTML = 'An error occurred while loading the map. Please check the F12->Console panel.';
        }
    }
};