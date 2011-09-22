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

class root.Cameras extends Backbone.Collection
  model: root.Camera
  url: "/cincytraffic/_design/app/_rewrite/collection/camera?include_docs=true"
  parse: (response) ->
    cameras = []
    for row in response.rows
      cameras.push(row.doc)
    cameras
