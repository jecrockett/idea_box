class Api::V1::IdeasController < Api::ApiController
  respond_to :json

  def index
    ideas = Idea.all
    respond_with ideas
  end

  def create
    idea = Idea.new(idea_params)
    if idea.save
      respond_with(Idea.new(idea_params), location: api_v1_ideas_path)
    end
  end

  private

    def idea_params
      params.require(:idea).permit(:title, :body)
    end
end
