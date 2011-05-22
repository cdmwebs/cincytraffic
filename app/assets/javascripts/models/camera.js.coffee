class Camera extends Backbone.Model
  isGeocoded: ->
    @get('coordinates')?.empty?
