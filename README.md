# Moraki Test Application

## Overview

The Moraki Test Application is a financial management tool designed to allow users to manage their bank accounts and perform financial operations such as withdrawals. It features a Ruby on Rails backend with a React frontend, showcasing a modern web application architecture that seamlessly integrates server-side logic with a dynamic and responsive user interface.

## Features

- **Bank Account Management:** Users can add, list, edit, and delete their bank accounts. Each account can be marked as the default account for withdrawals.
- **Withdrawals:** Users can perform withdrawals, selecting one of their bank accounts for the transaction.
- **Bank Integration:** The application comes pre-seeded with several banks, allowing users to associate their bank accounts with real financial institutions.

## Architecture

The application uses Ruby on Rails as its backend framework, which handles data persistence, business logic, and API endpoints. The frontend is built with React, utilizing Inertia.js to bridge the gap between Rails and React. Inertia.js allows us to write our frontend in a single-page application (SPA) style without the need to build an API, as it leverages the existing Rails views and controllers to serve page data.

### Backend

- **Ruby on Rails:** Manages database interactions, session management, and serves HTML responses.
- **PostgreSQL:** Used as the primary data store.
- **Active Record:** ORM for database manipulation and query building.

### Frontend

- **React:** Handles the dynamic rendering of UI components.
- **Inertia.js:** Simplifies the integration between Rails backend and React frontend.
- **Tailwind CSS:** For styling the application components.

## Installation Steps

1. **Install Overmind (for managing application processes)**

    If you don't have Overmind installed, you can install it using Homebrew:

    ``` bash
    brew install overmind
    ```

2. **Clone the repository**

    ``` bash
    git clone https://yourrepositorylink.com/moraki-test.git
    cd moraki-test
    ```

3. **Setup the database**

    Make sure you have PostgreSQL installed and running on your machine. Then, create and migrate your database:

    ``` bash
    rails db:create db:migrate db:seed
    ```

4. **Install dependencies**

    Backend dependencies:

      ``` bash
      bundle install
      ```

    Frontend dependencies:

      ``` bash
      yarn install
      ```

5. **Start the Rails server**

    ``` bash
    bin/dev
    ```

6. **Access the application**

    Open a web browser and navigate to `http://localhost:3000` to start using the application.

7. **Run the test suite**

    Backend tests:

    ``` bash
    bundle exec rspec
    ```

8. **TODO**

    Add more specs
    Add frontend tests
