(function() {
  $(function() {
    var cameras, map, myOptions;
    Backbone.couch.dbname = 'cincytraffic';
    Backbone.couch.design_doc = 'app';
    cameras = new window.CincyTraffic.Cameras;
    cameras.fetch({
      success: function(collection, response) {
        var camera, _i, _len, _ref, _results;
        _ref = collection.models;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          camera = _ref[_i];
          _results.push(window.geocoder.geocode({
            address: "" + (camera.get('location')) + " near Cincinnati"
          }, function(results, status) {
            var marker;
            if (status === google.maps.GeocoderStatus.OK) {
              marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
              });
              return console.log("" + (camera.get('_id')) + ": mapped.");
            } else {
              return console.log("" + (camera.get('_id')) + ": " + status);
            }
          }));
        }
        return _results;
      }
    });
    myOptions = {
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    window.geocoder = new google.maps.Geocoder();
    return window.geocoder.geocode({
      address: 'Cincinnati, OH'
    }, function(results, status) {
      var marker;
      if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        return marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      }
    });
  });
}).call(this);
