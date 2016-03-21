class Idea < ActiveRecord::Base
  validates :title, presence: true
  validates :body,  presence: true

  before_create :set_quality

  default_scope { order(:created_at) }
end
