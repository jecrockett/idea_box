require 'rails_helper'

RSpec.feature "User can sort ideas by quality", js: true, type: :feature do
  scenario "Sort by quality button first sorts from high to low" do
    visit root_path

    click_on "Sort by Quality"

    first_idea = all('.idea')[1]
    last_idea  = all('.idea').last

    expect(first_idea).to have_content "Genius"
    expect(last_idea).to have_content "Swill"
  end

  scenario "Once sorted, sort by quality button reverses order each time" do
    visit root_path

    click_on "Sort by Quality"
    click_on "Sort by Quality"

    first_idea = all('.idea').first
    last_idea  = all('.idea')[-2]

    expect(first_idea).to have_content "Swill"
    expect(last_idea).to have_content "Genius"

    click_on "Sort by Quality"

    first_idea = all('.idea')[1]
    last_idea  = all('.idea').last

    expect(first_idea).to have_content "Genius"
    expect(last_idea).to have_content "Swill"
  end

end
