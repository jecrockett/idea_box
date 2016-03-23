require 'rails_helper'

RSpec.feature "User can edit idea title and body inline", js: true, type: :feature do
  fixtures :ideas
  scenario "User edits title" do
    visit root_path

    within '#idea-1' do
      expect(page).to have_content "Candy Sneakers"

      find('p.title').click
      fill_in "temp", with: "new title"
    end

    find("#idea-2").click

    within '#idea-1' do
      expect(page).to have_content "new title"
      expect(page).to_not have_content "Candy Sneakers"
    end
  end

  scenario "User edits body" do
    visit root_path

    within '#idea-1' do
      expect(page).to have_content "Shoes you can eat."

      find('p.body').click
      fill_in "temp", with: "new body"
    end

    find("#idea-2").click

    within '#idea-1' do
      expect(page).to have_content "new body"
      expect(page).to_not have_content "Shoes you can eat."
    end
  end
end
