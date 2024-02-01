class HomeController < ApplicationController
  def index
    render inertia: 'Dashboard', props: {
      name: current_user.name,
      accounts: format_user_accounts
    }
  end

  private

  def current_user
    User.first
  end

  def format_user_accounts
    current_user.accounts.includes(:bank).map do |account|
      {
        id: account.id,
        name: account.name,
        number: account.number,
        balance: account.balance,
        is_default: account.is_default,
        bank_name: account.bank.name
      }
    end
  end
end
