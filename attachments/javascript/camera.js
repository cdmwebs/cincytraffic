(function() {
  var root;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.CincyTraffic || (root.CincyTraffic = {});
  root = root.CincyTraffic;
  root.Camera = (function() {
    __extends(Camera, Backbone.Model);
    function Camera() {
      Camera.__super__.constructor.apply(this, arguments);
    }
    Camera.prototype.defaults = {
      type: 'camera',
      location: '',
      href: '',
      latitude: null,
      longitude: null
    };
    Camera.prototype.idAttribute = '_id';
    Camera.prototype.hasGeo = function() {
      return (this.get('latitude') != null) || (this.get('longitude') != null);
    };
    return Camera;
  })();
  root.Cameras = (function() {
    __extends(Cameras, Backbone.Collection);
    function Cameras() {
      Cameras.__super__.constructor.apply(this, arguments);
    }
    Cameras.prototype.model = root.Camera;
    Cameras.prototype.url = "/collection/camera";
    return Cameras;
  })();
}).call(this);
