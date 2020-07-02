# front
App to be published

```
// To show or hide labels on the map
labels.toggle(true|false)

// To draw a pin on the user location
user.draw(center)

// To make the user pin pulse
user.highlight(true|false)

// To draw radius of death
circle.draw({})

// To show or hide it
circle.toggle(true|false)

// To center it on screen
circle.fitOnScreen(padding)

// To add population density layer (rendered, but hidden)
people.draw()

// To show or hide it
people.toggle(true|false)

// To highlight everyone who would die
people.highlightInsideCircle(radius)

// To highlight first deaths on the beginning of the story
people.highlightSomeInsideCircle(amount|false)

// To outline cities
location.highlight(code,color|false)

// To make then disappear by painting them black
location.fill(code,color|false)

// To add familiar places from Google Places API
tooltip.draw({center,label})❓
tooltip.toggle(true|false)❓
```
