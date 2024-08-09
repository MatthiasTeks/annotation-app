# Image and Video Annotation Project

This project is a comprehensive tool for annotating images and videos, enabling users to import media, segment images using SAMv2, and export files suitable for AI training. The project is built with Node.js and utilizes a PostgreSQL database for data storage. The project also leverages Prisma for database migrations.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Media Import:** Import images and videos for annotation.
- **Segmentation:** Use SAMv2 for image segmentation.
- **Export:** Export annotated data for AI training purposes.
- **Database Integration:** Utilizes PostgreSQL for efficient data storage.
- **Prisma ORM:** Manage database migrations and schema with Prisma.

## Requirements

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) (v6.x or later)
- [PostgreSQL](https://www.postgresql.org/) (v12.x or later)
- [Prisma](https://www.prisma.io/) (v2.x or later)

## Installation

Follow these steps to set up the project on your local machine:

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Set Up PostgreSQL Database
Ensure you have PostgreSQL installed and running on your machine. Create a new database for the project.

### Configure Environment Variables
Create a .env file at the root of your project and fill in the following details:

```sh
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME
 ```
 
### Run Prisma Migrations
After setting up your database, run the following command to apply Prisma migrations:

```sh
npx prisma migrate dev
 ```

### Running the Project
To start the project in development mode, use the following command:

```sh
npm run dev
```

This will start the server on the default port (usually http://localhost:3000).

## Contributing
If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License
This project is open-source and licensed under the MIT License. See the LICENSE file for more details.
