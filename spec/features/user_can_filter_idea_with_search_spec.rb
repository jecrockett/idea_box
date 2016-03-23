require 'rails_helper'

RSpec.feature "User filters ideas with search", js: true, type: :feature do
  scenario "User types in a single letter" do
    visit root_path

    fill_in "search", with: 'g'

    expect(page).to     have_content "Randomly show up places with ten puppies and a small encosed fence thing."
    expect(page).to     have_content "Guerrilla Glitter Bombs"
    expect(page).to     have_content "Dog translator"
    expect(page).to_not have_content "Candy Sneakers"
  end

  scenario "User types in lower case letters but a match has capitalization" do
    visit root_path

    fill_in "search", with: 'randomly'

    expect(page).to     have_content "Randomly show up places with ten puppies and a small encosed fence thing."
    expect(page).to_not have_content "Guerrilla Glitter Bombs"
    expect(page).to_not have_content "Dog translator"
    expect(page).to_not have_content "Candy Sneakers"
  end
end
