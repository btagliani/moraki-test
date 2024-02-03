json.extract! withdrawal, :id, :account_id, :amount, :transaction_date, :created_at, :updated_at
json.url withdrawal_url(withdrawal, format: :json)
