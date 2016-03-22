class IdeaSerializer < ActiveModel::Serializer
  attributes :id, :title, :truncated_body, :quality_in_words

  def quality_in_words
    case object.quality
    when 1 then "Swill"
    when 2 then "Plausible"
    when 3 then "Genius"
    end
  end

  def truncated_body
    object.body.truncate(100, separator: ' ')
  end

end
