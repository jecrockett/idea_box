class Api::V1::IdeasController < Api::ApiController
  respond_to :json

  def index
    ideas = Idea.all
    respond_with ideas
  end

  def create
    idea = Idea.create(idea_params)
    respond_with(idea, location: api_v1_ideas_path)
  end

  def update
    idea = Idea.find(params[:id])
    idea.update_attributes(idea_params)
    respond_with idea

  end

  def destroy
    idea = Idea.find(params[:id])
    respond_with idea.delete
  end

  private

    def idea_params
      params.require(:idea).permit(:title, :body, :quality)
    end
end
