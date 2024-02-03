# frozen_string_literal: true

require 'rails_helper'

RSpec.feature 'Account registration', type: :feature do
  before do
    create(:user)
    create(:bank)
  end

  scenario 'Account successfully registers', js: true do
    visit '/accounts'
    click_button 'Add Account'
    fill_in 'Account Name', with: 'Test Account'
    fill_in 'Account Number', with: '123456789'
    fill_in 'Balance', with: '1000.0'
    find('button[role="combobox"]').click
    find('div[role="listbox"]', text: 'Test Bank').click
    click_button 'Submit'
    expect(page).to have_text('Test Account')
    expect(page).to have_text('123456789')
    expect(page).to have_text('1000.0')
    expect(page).to have_text('Test Bank')
  end
end
