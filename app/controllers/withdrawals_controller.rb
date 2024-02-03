# frozen_string_literal: true

class WithdrawalsController < ApplicationController # rubocop:disable Style/Documentation
  def index
    render inertia: 'Dashboard', props: {
      name: current_user&.name,
      accounts: nil,
      withdrawals: format_withdrawals,
      errors: nil
    }
  end

  def create
    withdrawal = Withdrawal.new(withdrawal_params.merge(transaction_date: Time.zone.now))

    errors = withdrawal.errors unless withdrawal.save

    render inertia: 'Dashboard', props: {
      name: current_user&.name,
      accounts: nil,
      withdrawals: format_withdrawals,
      errors:
    }
  end

  private

  def format_withdrawals
    current_user&.withdrawals.includes(:account)&.map do |withdrawal|
      {
        id: withdrawal.id,
        account_name: withdrawal.account.name,
        bank_name: withdrawal.account.bank.name,
        amount: withdrawal.amount,
        transaction_date: withdrawal.transaction_date
      }
    end
  end

  def current_user
    User.first
  end

  def withdrawal_params
    params.require(:withdrawal).permit(:account_id, :amount, :transaction_date)
  end
end
