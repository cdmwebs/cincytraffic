class Camera
  include Mongoid::Document
  field :name
  field :state
  field :description
  field :mile, :type => Float
  field :road_name
  field :location
  field :latitude
  field :longitude
  field :image_url

  def coordinates
    "#{latitude}, #{longitude}"
  end

  def as_json(options = {})
    options.merge!({ :methods => :coordinates })
    super(options)
  end
end
