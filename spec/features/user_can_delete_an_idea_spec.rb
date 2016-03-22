require 'rails_helper'

RSpec.feature "User can delete an idea", js: true, type: :feature do
  fixtures :ideas
  scenario "Idea disappears from screen and database when user clicks delete" do
    visit root_path
    idea_count_before = Idea.all.count

    within '#idea-1' do
      click_on "Delete"
    end

    expect(page).to_not have_css('#idea-1')
    expect(Idea.all.count).to eq (idea_count_before - 1)
  end
end
