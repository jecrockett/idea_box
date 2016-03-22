class Api::ApiController < ApplicationController
  include ActionController::Serialization
  protect_from_forgery with: :null_session
end
