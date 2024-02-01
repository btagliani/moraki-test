# frozen_string_literal: true

class AccountsController < ApplicationController # rubocop:disable Style/Documentation
  before_action :set_account, only: [:destroy]

  # GET /accounts
  def index
    @accounts = current_user.accounts.includes(:bank)
    render json: { accounts: @accounts.as_json(include: :bank) }
  end

  # POST /accounts
  def create
    @account = Account.new(account_params.merge(user_id: current_user.id))
    return unless @account.save

    redirect_to root_path
  end

  def update
    @account = Account.find(params[:id])
    @account.update(account_params)
    redirect_to root_path
  end

  def destroy
    @account.destroy
    redirect_to root_path
  end

  private

  def set_account
    @account = Account.find(params[:id])
  end

  def account_params
    params.require(:account).permit(:id, :number, :balance, :bank_id, :user_id, :name, :is_default)
  end

  def current_user
    User.first
  end
end
