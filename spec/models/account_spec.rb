# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Account, type: :model do
  it { should belong_to(:bank) }
  it { should belong_to(:user) }
  it { should have_many(:withdrawals).dependent(:destroy) }

  describe 'before_save' do
    it 'calls unset_other_defaults' do
      account = create(:account, is_default: true)
      expect(account).to receive(:unset_other_defaults)
      account.save
    end
  end

  describe '#unset_other_defaults' do
    it 'unsets other accounts as default' do
      user = create(:user)
      account1 = create(:account, user:, is_default: true)
      account2 = create(:account, user:, is_default: true)
      account1.update(is_default: true)
      account2.reload
      expect(account2.is_default).to be_falsey
    end
  end
end
