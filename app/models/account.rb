class Account < ApplicationRecord
  belongs_to :bank
  belongs_to :user

  before_save :unset_other_defaults, if: :is_default

  private

  def unset_other_defaults
    user.accounts.where.not(id:).update_all(is_default: false)
  end
end
