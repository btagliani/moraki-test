# frozen_string_literal: true

class BanksController < ApplicationController # rubocop:disable Style/Documentation
  def index
    @banks = Bank.all
    render json: @banks
  end
end
