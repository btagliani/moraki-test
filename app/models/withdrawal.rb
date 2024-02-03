# frozen_string_literal: true

class Withdrawal < ApplicationRecord # rubocop:disable Style/Documentation
  belongs_to :account
  validates :amount, presence: true
  validates :transaction_date, presence: true
  validate :able_to_withdraw

  after_create :update_account_balance

  private

  def able_to_withdraw
    return unless account.balance < amount

    errors.add(:amount, 'Insufficient funds')
  end

  def update_account_balance
    account.update(balance: account.balance - amount)
  end
end
