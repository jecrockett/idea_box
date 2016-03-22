require 'rails_helper'

RSpec.feature "User can save a new idea", js: true, type: :feature do
  scenario "User sees the new idea appear in the list after clicking save" do
    visit root_path
    idea_count_before = Idea.all.count


    fill_in "title", with: "New idea"
    fill_in "body", with: "Seriously so super good."
    click_on "Save"


    within '#idea-form' do
      expect(page).to_not have_content "New idea"
      expect(page).to_not have_content "Seriously so super good."
    end

    within '#ideas-container' do
      expect(page).to have_content "New idea"
      expect(page).to have_content "Seriously so super good."
    end

    expect(Idea.all.count).to eq (idea_count_before + 1)
  end
end
