require 'rails_helper'

RSpec.feature "User filters ideas with search" do
  scenario "User types in a single letter" do
    visit root_path

    fill_in "Search", with: 'g'

    expect(page).to_not have_css('#item-1')
    expect(page).to_not have_css('#item-2')
    expect(page).to     have_css('#item-3')
    expect(page).to     have_css('#item-4')
  end
  # scenario "User types in part of a body" do
  #
  # end
end
