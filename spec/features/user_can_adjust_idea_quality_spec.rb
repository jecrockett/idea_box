require 'rails_helper'

RSpec.feature "User can adjust an idea's quality rating", js: true, type: :feature do
  fixtures :ideas
  scenario "User clicks thumbs up button on idea with increasble quality" do
    visit root_path

    within '#idea-2' do
      expect(page).to have_content "Plausible"
      click_on 'increase-quality'
      expect(page).to have_content "Genius"
      expect(page).to_not have_content "Plausible"
    end
  end

  # scenario "User clicks thumbs up on idea with highest quality setting" do
  #
  # end
  #
  # scenario "User clicks thumbs down on idea with decreasale quality" do
  #
  # end
  #
  # scenario "User clicks thumbs down on idea with lowest quality setting" do
  #
  # end
end
