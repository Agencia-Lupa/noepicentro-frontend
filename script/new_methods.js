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
            'source-layer': 'mun-8q037a',
            'paint': {
                'fill-opacity' : 1,
                'fill-outline-color' : '#d7a565',
                'fill-color' : 'transparent'
            },
            'filter': ['==', 'code_muni', ''] 
        });
    }

    map.setFilter(
        'highlighted_city', [
            '==', 
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
}