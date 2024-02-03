# frozen_string_literal: true

class HomeController < ApplicationController # rubocop:disable Style/Documentation
  def index
    render inertia: 'Home', props: {
      name: current_user&.name,
      accounts: nil,
      withdrawals: nil,
      errors: nil
    }
  end

  private

  def current_user
    User.first
  end
end
