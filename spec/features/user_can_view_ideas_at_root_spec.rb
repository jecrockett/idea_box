require 'rails_helper'

RSpec.feature "User can view ideas", type: :feature do
  fixtures :ideas
  scenario "User visits the homepage and ideas are in the database" do
    visit root_path

    titles = page.all(".idea p.title")
    descriptions = page.all(".idea p.description")
    qualities = page.all(".idea p.quality")

    expect(page).to have_css('.idea', count: 4)
    expect(titles.first).to eq "Flash puppy mobs"
    expect(descriptions.first).to eq "Randomly show up places with ten puppies and a small encosed fence thing."
    expect(qualities.first).to eq "Plausible"
    expect(titles.last).to eq "Dog translator"
    expect(descriptions.last).to eq "Help humans and dogs to communicate seamlessly."
    expect(qualities.last).to eq "Genius"
  end
end
