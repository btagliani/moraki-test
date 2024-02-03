# frozen_string_literal: true

class AccountsController < ApplicationController # rubocop:disable Style/Documentation
  before_action :account, only: %i[destroy update]

  def index
    if params[:format] == 'json'
      render json: { accounts: format_accounts }
    else
      render inertia: 'Dashboard', props: {
        name: current_user&.name,
        accounts: format_accounts,
        withdrawals: nil,
        errors: nil
      }
    end
  end

  def create
    account = Account.new(prepare_account_params(account_params).merge(user_id: current_user&.id))
    errors = account.errors.full_messages unless account.save

    render inertia: 'Dashboard', props: {
      name: current_user&.name,
      accounts: format_accounts,
      withdrawals: nil,
      errors:
    }
  end

  def update
    errors = account.errors.full_messages unless account.update(prepare_account_params(account_params))

    render inertia: 'Dashboard', props: {
      name: current_user&.name,
      accounts: format_accounts,
      withdrawals: nil,
      errors:
    }
  end

  def show
    redirect_to root_path
  end

  def destroy
    errors = account.errors.full_messages unless account.destroy

    render inertia: 'Dashboard', props: {
      name: current_user&.name,
      accounts: format_accounts,
      withdrawals: nil,
      errors:
    }
  end

  private

  def prepare_account_params(account_params)
    bank_id = Bank.find_by(name: account_params[:bank_name])&.id
    account_params[:bank_id] = bank_id
    account_params.delete(:bank_name)
    account_params
  end

  def format_accounts
    current_user&.accounts.includes(:bank).map do |account|
      {
        id: account.id,
        number: account.number,
        balance: account.balance,
        bank_name: account.bank.name,
        name: account.name,
        is_default: account.is_default
      }
    end
  end

  def account
    @account ||= Account.find(params[:id])
  end

  def account_params
    params.permit(:id, :number, :balance, :bank_name, :user_id, :name, :is_default)
  end

  def current_user
    User.first
  end
end
