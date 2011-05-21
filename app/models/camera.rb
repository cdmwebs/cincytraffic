class Camera
  include Mongoid::Document
  include Geocoder::Model::Mongoid

  field :name
  field :state
  field :description
  field :mile, :type => Float
  field :road_name
  field :location
  field :image_url
  field :coordinates, :type => Array

  geocoded_by :name
  after_validation :geocode
end
