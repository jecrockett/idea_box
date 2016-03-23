require 'rails_helper'

RSpec.feature "User can view ideas", js: true, type: :feature do
  fixtures :ideas
  scenario "User visits the homepage and ideas are in the database" do
    visit root_path

    # selenium is working off a different database, so the create call is persisting into this test causing the first idea on the page to be 'new idea'. Monkey patch by having this array grab the second idea on the page, but should fix the problem not the symptom before all is said and done.
    first_idea = all('.idea')[1]
    last_idea = all('.idea').last

    expect(first_idea).to have_content "Flash puppy mobs"
    expect(first_idea).to have_content "Randomly show up places with ten puppies and a small encosed fence thing."
    expect(first_idea).to have_content "Plausible"
    expect(last_idea).to have_content "Dog translator"
    expect(last_idea).to have_content "Help humans and dogs to communicate seamlessly."
    expect(last_idea).to have_content "Genius"
  end
end
