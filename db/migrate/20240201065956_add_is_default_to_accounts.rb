class AddIsDefaultToAccounts < ActiveRecord::Migration[7.1]
  def change
    add_column :accounts, :is_default, :boolean, default: false, null: false
    add_index :accounts, :is_default
  end
end
