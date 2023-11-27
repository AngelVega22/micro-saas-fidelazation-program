# Loyalty Program

A loyalty program to reward and retain customers.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contact](#contact)
- [TODO](#todo)

## Project Overview

The Loyalty Program is designed to reward loyal customers and encourage repeat business. It offers a range of features to enhance customer loyalty.

## Features

- Customer registration and profile management.
- Points accumulation for every purchase.
- Redeeming points for rewards or discounts.
- Special promotions for loyalty program members.

## Getting Started

To set up the Loyalty Program on your local machine, follow the instructions below.

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Configure the settings in the `.env` file.

## Usage

To run the Loyalty Program locally, execute the following command:

``
npm run dev
``

You can then access the program at `http://localhost:3000`.

## Contact

If you have any questions or need assistance, you can reach out to us at:

- Email: avegasam@gmail.com
- Twitter: @ngelVegaSamani1

## TODO

Here are some tasks that need to be completed or considered for the Loyalty Program:

- [ ] Implement email notifications for points earned and rewards redeemed.
- [ ] Create a mobile app version for easy customer access.
- [ ] Add a feature for referring friends to the program.
- [ ] Conduct user testing to improve the user experience.
- [ ] Document the API endpoints for external developers.
- [x] Improve security by adding user authentication and authorization.
- [ ] Enhance the program's data analytics and reporting capabilities.
- [ ] Improve user experience
- [ ] Add types of rules in the registation form and improve it.
- [ ] CRON JOB to delete no active transaction points.

Prority tasks:

- [x] Implement Program registation funcionality.
- [ ] Configure dates logic.
- [ ] Add Pricing page.
- [ ] Integrate digital payments.
- [ ] Monetization logic.
- [ ] Add mobile menu.
- [ ] Define more business logic.
- [ ] Implement a dashboard for business owners to track program performance.
- [ ] Implement more enviroment variables.

Bugs:

- [x] Registation form validations and edit form validations.
- [x] No transaction if program is inactive/deleted.