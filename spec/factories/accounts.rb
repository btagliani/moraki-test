# frozen_string_literal: true

FactoryBot.define do
  factory :account do
    number { '123456789' }
    balance { 1000.0 }
    association :bank
    association :user
    name { 'Test Account' }
    is_default { false }
  end
end
