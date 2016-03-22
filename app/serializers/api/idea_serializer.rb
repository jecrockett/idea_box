class Api::V1::IdeaSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :quality_in_words

  def quality_in_words
    "Swill" if object.quality == 1
    "Plausible" if object.quality == 2
    "Genius" if object.quality == 3
  end
end
