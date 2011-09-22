root = exports ? this
root.CincyTraffic or= {}
root = root.CincyTraffic

class root.Camera extends Backbone.Model
  defaults:
    type: 'camera'
    location: ''
    href: ''
    latitude: null
    longitude: null

  idAttribute: '_id'

  hasGeo: ->
    @get('latitude')? or @get('longitude')?

class root.Cameras extends Backbone.Collection
  model: root.Camera
  url: "/collection/camera"
