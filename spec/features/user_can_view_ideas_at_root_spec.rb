require 'rails_helper'

RSpec.feature "User can view ideas", js: true, type: :feature do
  fixtures :ideas
  scenario "User visits the homepage and ideas are in the database" do
    visit root_path

    first_idea = find('#idea-2')
    last_idea = find('#idea-4')

    # expect(page).to have_css('.idea', count: 4)
    expect(first_idea).to have_content "Flash puppy mobs"
    expect(first_idea).to have_content "Randomly show up places with ten puppies and a small encosed fence thing."
    expect(first_idea).to have_content "Plausible"
    expect(last_idea).to have_content "Dog translator"
    expect(last_idea).to have_content "Help humans and dogs to communicate seamlessly."
    expect(last_idea).to have_content "Genius"
  end
end
