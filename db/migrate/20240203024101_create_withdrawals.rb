class CreateWithdrawals < ActiveRecord::Migration[7.1]
  def change
    create_table :withdrawals do |t|
      t.references :account, null: false, foreign_key: true
      t.decimal :amount
      t.date :transaction_date

      t.timestamps
    end
  end
end
