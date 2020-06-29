mapboxgl.accessToken = 'pk.eyJ1IjoidGlhZ29tYnAiLCJhIjoiY2thdjJmajYzMHR1YzJ5b2huM2pscjdreCJ9.oT7nAiasQnIMjhUB-VFvmw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/tiagombp/ckbz4zcsb2x3w1iqyc3y2eilr',
    center: [-30, 0],
    zoom: 4
});

// vis functions

function draw_circle(center, point_on_circle) {

    // remove circle layer, if it already exists
    if (map.getLayer('circle')) map.removeLayer('circle');
    if (map.getSource('circle')) map.removeSource('circle');

    // transform coordinates into features
    let center_ft = turf.point(center);
    let point_on_circle_ft = turf.point(point_on_circle);

    // calculate radius in km
    let radius = turf.distance(
        center_ft, 
        point_on_circle_ft
    );

    // generates circle as feature
    let circle = turf.circle(center_ft, radius);

    map.addSource('circle', {
            'type': 'geojson',
            'data': circle});

    map.addLayer({
            'id': 'circle',
            'type': 'fill',
            'source': 'circle',
            'layout': {},
            'paint': {
            'fill-outline-color': 'tomato',
            'fill-color': 'transparent',
            'fill-opacity': 1
        }},
    );

    return circle;
}

function show_people() {
    map.setPaintProperty(
        'people', 
        'circle-opacity',
        0.25
    );
    map.moveLayer("people", "national-park")
}

function highlight_people_inside(circle) {

    if (map.getLayer('people-inside')) map.removeLayer('people-inside');
       
    map.addLayer(
        {
        'id': 'people-inside',
        'type': 'circle',
        'source': 'composite',
        'source-layer': 'people',
        'paint': {
            'circle-radius': 2,
            'circle-color': 'white',
            'circle-opacity': 0.8
        },
        'filter': ['within', circle]
    },
    'people'); 
}

function toggle_labels(show) {
    //console.log(labels_layers, !labels_layers);
    //if (!labels_layers) 
    labels_layers = ["settlement-subdivision-label", "poi-label", "water-point-label", "road-label",
    "waterway-label", "airport-label", "natural-line-label"];

    let opacity = show ? 1 : 0;

    for (layer of labels_layers) {
        map.setPaintProperty(layer, "text-opacity", opacity);
    }
}

function toggle_circle(show) {

    let opacity = show ? 1 : 0;

    map.setPaintProperty("circle", "fill-opacity", opacity);
}

// main function

function init_map() {

    // geocoder

    let geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        countries: 'br',
        language: 'pt-br',
        flyTo: {
            'speed': 2,
            'zoom': 4
        },
        mapboxgl: mapboxgl
    });

    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

    // got geocoder results
        
    geocoder.on('result', function(e) {

        console.log(e.result.center);

        // remove existing layers for new seatch

        if (map.getLayer('people-inside')) map.removeLayer('people-inside');
        if (map.getLayer('circle')) map.removeLayer('circle');
        if (map.getSource('circle')) map.removeSource('circle');

        // fly to result

        map.flyTo({ 
            'center': e.result.center,
            'speed': 0.8,
            'zoom': 12
         });

        let flying = true;

        // fetch 

        let lat = e.result.center[1];
        let lon = e.result.center[0];


        let time_before = performance.now()
        fetch('https://coldfoot-api.eba-8zt2jyyb.us-west-2.elasticbeanstalk.com/coords?lat='+lat+'&lon=' + lon, {mode: 'cors'})
            .then(function(response) {
                if (!response.ok) {
                    throw Error();
                } 
                return response.json();
            })
            .then(function(api_result) {
                let time_after = performance.now();
                console.log("tempo para fetch", time_after - time_before);

                let circle = draw_circle(
                    center = e.result.center, 
                    point_on_circle = api_result[1]);

                bbox_circle = turf.bbox(circle);

                // wait for the end of fly_to camera movement
                map.on('moveend', function(e){
                    if (flying) {
                        flying = false; 

                        map.fitBounds(bbox_circle, {
                            padding: {top: 20, bottom:20, left: 10, right: 10},
                            duration: 1000
                        }); 

                        let fittingBounds = true;

                        // wait for the end of fitBounds camera movement
                        
                        map.on('moveend', function(e) {
                            if (fittingBounds) {
                                fittingBounds = false;

                                show_people(); 
                                highlight_people_inside(circle);
                                //toggle_labels(show = false);
                                //toggle_circle(show = false);                     
                            }                            
                        })

                    }
                });
            })
            // .catch(function(e) {
            //     $log.append("p").classed("erro", true).append("span").html("Erro na busca do raio. Provavelmente por causa do certificado do servidor da API. Experimente visitar primeiro <a href='https://coldfoot-api.eba-8zt2jyyb.us-west-2.elasticbeanstalk.com/'>esta página</a> e tentar novamente.");
            // });      
    });
};

init_map();
