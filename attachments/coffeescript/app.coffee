$ ->
  Backbone.couch.dbname = 'cincytraffic'
  Backbone.couch.design_doc = 'app'

  cameras = new window.CincyTraffic.Cameras
  cameras.fetch
    success: (collection, response) ->
      for camera in collection.models
        window.geocoder.geocode {address: "#{camera.get('location')} near Cincinnati" }, (results, status) ->
          if status == google.maps.GeocoderStatus.OK
            marker = new google.maps.Marker
              map: map
              position: results[0].geometry.location
            console.log "#{camera.get('_id')}: mapped."
          else
            console.log "#{camera.get('_id')}: #{status}"
  myOptions =
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  map = new google.maps.Map(document.getElementById("map"), myOptions)
  window.geocoder = new google.maps.Geocoder()
  window.geocoder.geocode {address: 'Cincinnati, OH'}, (results, status) ->
    if (status == google.maps.GeocoderStatus.OK)
      map.setCenter(results[0].geometry.location)
      marker = new google.maps.Marker
        map: map
        position: results[0].geometry.location
