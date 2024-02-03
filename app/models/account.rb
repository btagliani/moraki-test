# frozen_string_literal: true

class Account < ApplicationRecord # rubocop:disable Style/Documentation
  belongs_to :bank
  belongs_to :user
  has_many :withdrawals, dependent: :destroy

  validates :name, :number, :user_id, :bank_id, :balance, presence: true

  before_save :unset_other_defaults, if: :is_default

  private

  def unset_other_defaults
    user.accounts.where.not(id:).update_all(is_default: false)
  end
end
