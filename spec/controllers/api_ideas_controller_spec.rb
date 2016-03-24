require 'rails_helper'

RSpec.describe Api::V1::IdeasController, type: :controller do
  fixtures :ideas
  describe '#index' do
    it "responds with all ideas" do
      get :index, format: :json
      ideas = JSON.parse(response.body)

      expect(response).to be_success
      expect(ideas.first['title']).to eq 'Dog translator'
      expect(ideas.last['title']).to eq 'Flash puppy mobs'
      expect(ideas.count).to eq 4
    end
  end

  describe '#create' do
    it "responds with created idea" do
      post :create, format: :json, idea: {title: "new title",
                                          body: "new body"}
      idea = JSON.parse(response.body)

      expect(response).to be_success
      expect(idea['title']).to eq 'new title'
      expect(idea['body']).to eq 'new body'
    end
  end

  describe '#update' do
    it "responds with updated idea" do
      put :update, format: :json, id: 1, idea: {title: 'new title',
                                                body: 'new body'}

      expect(response).to be_success
    end
  end

  describe '#destroy' do
    it "deletes the specified idea" do
      idea_num = Idea.count

      delete :destroy, format: :json, id: 1

      expect(response).to be_success
      expect(Idea.count).to eq (idea_num - 1)
    end
  end
end
