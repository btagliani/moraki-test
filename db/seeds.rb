# frozen_string_literal: true

# Clear existing data to avoid duplication
User.destroy_all
Bank.destroy_all

# Create banks
banks = Bank.create([
                      { name: 'Bank of Example' },
                      { name: 'Example National Bank' },
                      { name: 'First Example Bank' },
                      { name: 'Example Trust Bank' }
                    ])

# Create a user
user = User.create(name: 'John Doe', email: 'john.doe@example.com')

# Optionally, you can also create accounts for this user associated with one of the banks
accounts = user.accounts.create([
                                  { number: '123456789', balance: 1000.00, bank: banks.first, name: "John's Savings",
                                    is_default: true },
                                  { number: '987654321', balance: 5000.00, bank: banks.second, name: "John's Checking",
                                    is_default: false }
                                ])

puts "Seeds created: #{Bank.count} banks, #{User.count} user, and #{accounts.size} accounts for the user."
