class Api::V1::IdeasController < Api::ApiController
  respond_to :json

  def index
    ideas = Idea.all
    respond_with ideas
  end
end
