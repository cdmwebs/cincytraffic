class CamerasController < ApplicationController
  respond_to :json, :html

  def index
    @cameras = Camera.all
    respond_with @cameras
  end

  def create
    @camera = Camera.create(params[:camera])
    respond_with @camera
  end
end
