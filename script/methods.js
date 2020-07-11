///////////////////////
//  FUNCTIONS
///////////////////////

//////////////////////////////////////////////////
// To show or hide labels on the map
// labels.toggle(true|false)

labels.toggle = function(option) {
    labels_layers = [
        "country-label",
        "state-label",
        "settlement-major-label", 
        "settlement-minor-label", 
        "settlement-subdivision-label", 
        "natural-point-label", 
        "poi-label", 
        "water-point-label", 
        "road-label",
        "waterway-label", 
        "airport-label", 
        "natural-line-label"
    ];

    let opacity = option ? 1 : 0;

    for (layer of labels_layers) {
        map.setPaintProperty(layer, "text-opacity", opacity);
    }

    map.setPaintProperty('airport-label', 'icon-opacity', opacity)
}

//////////////////////////////////////////////////
// To draw a pin on the user location
// user.draw(center)

user.draw = function(center) {
    map.flyTo({
        'center': center,
        'speed': 0.8,
        'zoom': 12
     });
}

//////////////////////////////////////////////////
// To make the user pin pulse
// user.highlight(true|false)

// will need this global variable :/
let request;

user.highlight = function(option) {

    let canvas = document.getElementById("canvasID");

    // Set Canvas dimensions
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width   = w;
    canvas.height  = h;

    // Get drawing context
    var ctx = canvas.getContext('2d');

    // animation parameters
    // set a smaller r_step for slower animation
    // max_r defines the maximum radius before beginning a new pulse
    const r = 2;
    let r_step = 1;
    let new_r = r;
    const max_r = 100;
    const iterations_no = (max_r - r + 1)/r_step

    const linewidth = 6;
    const linewidth_step = linewidth/iterations_no;
    let new_linewidth = linewidth;

    // init point
    function init_point() {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "goldenrod";
        ctx.arc(w/2, h/2, r, 0, Math.PI * 2, false );
        ctx.stroke();
    }

    init_point();

    let start;

    function animate(timestamp) {

        //in case we want to use a timer to stop the animation
        if (start === undefined)
            start = timestamp;
        const elapsed = timestamp - start;

        //clear canvas for new iteration
        ctx.clearRect( 0, 0 , w, h);

        //update
        new_r += r_step;
        new_linewidth -= linewidth_step;

        if (new_r > max_r) {
            new_r = r;
            new_linewidth = 6;
        }

        //redraw user point
        init_point()

        //draw expanding circle with updated parameters
        ctx.beginPath();
        ctx.lineWidth = new_linewidth;
        ctx.strokeStyle = "goldenrod";
        ctx.arc(w/2, h/2, new_r, 0, Math.PI * 2, false);
        ctx.stroke();

        //here we would check if the timer is expired beforing requesting another frame
        request = requestAnimationFrame(animate);
    }

    if (option) {
        console.log("começando...");
        request = requestAnimationFrame(animate);

        // get map bounds
        let bounds = map.getBounds();
        let coordinates = [
            [bounds._sw.lng, bounds._ne.lat],
            [bounds._ne.lng, bounds._ne.lat],
            [bounds._ne.lng, bounds._sw.lat],
            [bounds._sw.lng, bounds._sw.lat]
        ];

        // binds canvas to the map
        map.addSource('canvas-source', {
            type: 'canvas',
            canvas: 'canvasID',
            coordinates: coordinates,
            animate: true
        });

        map.addLayer({
            id: 'canvas-layer',
            type: 'raster',
            source: 'canvas-source'
        });
    }
    else {
        console.log("parando...")
        cancelAnimationFrame(request);
        if (map.getLayer("canvas-layer")) map.removeLayer("canvas-layer");
        if (map.getSource("canvas-source")) map.removeSource("canvas-source");
    }
}


//////////////////////////////////////////////////
// To draw radius of death
// circle.draw({})

circle.draw = function(center, point_on_circle) {
    // center returned by the geocoder
    // point_on_circle returned by the API

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

//////////////////////////////////////////////////
// To show or hide it
//circle.toggle(true|false)
circle.toggle = function(option) {

    let opacity = option ? 1 : 0;

    map.setPaintProperty("circle", "fill-opacity", opacity);
}

//////////////////////////////////////////////////
// To center it on screen
//circle.fitOnScreen(padding)

circle.fitOnScreen = function(circle, padding) {
    // circle: return value of circle.draw()
    // padding like: {top: 20, bottom:20, left: 10, right: 10}
    bbox_circle = turf.bbox(circle);

    map.fitBounds(bbox_circle, {
        padding: padding,
        duration: 1000
    });
}

//////////////////////////////////////////////////
// To add population density layer (rendered, but hidden)
//people.draw()

people.draw = function() {
    map.setPaintProperty(
        'people',
        'circle-opacity',
        0.5
    );
    map.moveLayer("people", "national-park")
}

//////////////////////////////////////////////////
// To show or hide it
//people.toggle(option)

people.toggle = function(option) {
    map.setPaintProperty(
        'people',
        'circle-opacity',
        option ? 0.5 : 0
    );
}

//////////////////////////////////////////////////
// To highlight everyone who would die
//people.highlightInsideCircle(radius)

people.highlightInsideCircle = function(center, point_on_circle) {
    // center returned by the geocoder
    // point_on_circle returned by the API

    if (map.getLayer('mask')) map.removeLayer('mask');
    if (map.getSource('mask')) map.removeSource('mask');

    ///// this could be a helper function. we use this code twice.
    // transform coordinates into features
    let center_ft = turf.point(center);
    let point_on_circle_ft = turf.point(point_on_circle);

    // calculate radius in km
    let radius = turf.distance(
        center_ft,
        point_on_circle_ft
    );
    ///// end of helper function

    let bbox_br = turf.bboxPolygon([-73.9872354804, -33.7683777809, -34.7299934555, 5.24448639569])

    let circles = [];
    let steps = 10;
    for (let i = 1; i<=steps; i++) {
        circles.push(turf.circle(center_ft, radius * i / steps));
    }

    let masks = circles.map(d => turf.mask(d, bbox_br));

    map.addSource('mask', {
        'type': 'geojson',
        'data': masks[0]
    });

    map.addLayer({
        'id': 'mask',
        'type': 'fill',
        'source': 'mask',
        'paint': {
            'fill-color': 'black',
            'fill-opacity': 0.55
        }
    });

    // for each circle/mask, updates the 'data' parameter for the mask source,
    // redrawing it

    let duration = 600;

    for (let i = 0; i<steps; i++) {
        window.setTimeout(function() {
            map.getSource('mask').setData(masks[i])
        }, i * duration);
    }

}

//////////////////////////////////////////////////
// To outline cities
//location.highlight(code,color|false)

location.highlight = function(code) {
    // pass city code to highlight, or
    // "" to remove any existing highlights
    // color is hard-coded in 'fill-outline-color'

    if (!map.getLayer("highlighted_city")) {
        map.addLayer({
            'id': 'highlighted_city',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'municipalities', //
            'paint': {
                'fill-opacity' : 1,
                'fill-outline-color' : '#d7a565',
                'fill-color' : 'transparent'
            },
            'filter': ['==', 'code_muni', '']
        },
        'road-label');

        map.addLayer({
            'id': 'other_cities',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'municipalities', //
            'paint': {
                'fill-opacity' : .4,
                'fill-outline-color' : 'transparent',
                'fill-color' : 'black'
            },
            'filter': ['!=', 'code_muni', ''] 
        },
        'road-label');        
    } 
    else {
        // makes sure the layers have the right style
        // just in case location.fill has been called beforehand
        map.setPaintProperty(
            'highlighted_city',
            'fill-color',
            'transparent'
        )
        map.setPaintProperty(
            'other_cities',
            'fill-color',
            'black'
        )
    }

    map.setFilter(
        'highlighted_city', [
            '==', 
            ['get', 'code_muni'], 
            code
        ]);

    map.setFilter(
        'other_cities', [
            '!=', 
            ['get', 'code_muni'], 
            code
        ]);
}

//////////////////////////////////////////////////
// To make then disappear by painting them black
//location.fill(code)

location.fill = function(code) {
    map.setPaintProperty(
        'highlighted_city',
        'fill-color',
        '#000000'
    )
    map.setPaintProperty(
        'other_cities',
        'fill-color',
        'transparent'
    )
}


//////////////////////////////////////////////////
// to fly to highlighted city and to make it fit the viewport

function fitVanishingCity(code) {

    let municipalities = map.querySourceFeatures('composite', {
        sourceLayer: 'municipalities'});

    let highlighted = municipalities.filter(d => d.properties.code_muni == code)[0]

    let bbox_highlighted = [
        [highlighted.properties.xmin, highlighted.properties.ymin], 
        [highlighted.properties.xmax, highlighted.properties.ymax]
    ];

    map.fitBounds(
        bbox_highlighted, 
        {
            linear : false, // false means the map transitions using map.flyTo()
            speed: 1, 
            padding: {top: 30, bottom: 30, left: 30, right: 30}
        });
}

//////////////////////////////////////////////////
// to make all cities with population smaller than death
// count "vanish"

function vanishAllBelow(death_count) {

    if (map.getLayer("highlighted_city")) map.removeLayer("highlighted_city");
    if (map.getLayer("other_cities")) map.removeLayer("other_cities");

    if (!map.getLayer("vanishable")) {
        map.addLayer({
            'id': 'vanishable',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'municipalities',
            'paint': {
                'fill-opacity' : 1,
                'fill-outline-color' : 'transparent',
                'fill-color' : 'black'
            },
            'filter': ['<=', 'pop_2019', ''] 
        },
        'admin-1-boundary-bg');
    }

    map.setFilter(
        'vanishable', [
            '<=', 
            [
                'number', 
                ['get', 'pop_2019']
            ], 
            death_count
        ]);
}