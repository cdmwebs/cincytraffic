Artimis::Application.routes.draw do
  scope '/api' do
    scope '/v1' do
      resources :cameras
    end
  end
end
