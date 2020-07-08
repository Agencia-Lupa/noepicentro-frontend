function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  const options = {
    enableHighAccuracy: false, 
    maximumAge: 10000,
    timeout: 10000
  };

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  function error( error ) {
    status.textContent = `Error ${error.code}: ${error.message}`;
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

}

document.querySelector('#find-me').addEventListener('click', geoFindMe);
