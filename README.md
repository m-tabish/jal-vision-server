# 🌐 Jal Vision Server

This is an Express.js project for the Jal Vision Server using TypeScript and Prisma.

##### <span  style="color: gold;">For API Endpoints refer to <a  href= "https://github.com/m-tabish/jal-vision-server/blob/main/Docs/docs.md " target = "_blank">Docs</a></span>

## 📋 Prerequisites

- Node.js
- Typescript
- Prisma ORM
- A PostgreSQL database url
- Docker (for running with Docker)

## 🛠️ Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/jal-vision-server.git
   cd jal-vision-server
   ```

2. Install dependencies:

   ```sh
   npm install typescript prisma dotenv @prisma/client --save-dev
   ```

3. Initialize Prisma
   ```bash
   npx prisma init
   ```
4. Create a `.env` file in the root directory and add your environment variables:

   ```sh
   (Linux) touch .env
   (Windows) echo > .env
   ```

   Example `.env` file:

   ```env
   DATABASE_URL="your-database-url"
   ```

5. Generate Prisma client:

   ```sh
   npx prisma generate
   ```

   1. If you are already running a database, run:
      ```bash
         npx prisma migrate dev --name <A checkpoint name to mark your migration>
      ```

6. Running Locally:

   ```sh
   npm run dev
   ```

   The server will be running at `http://localhost:3000`.

## 🐳 Running with Docker

1. Build the Docker image:

   ```sh
   docker build -t jal-vision-server .
   ```

2. Run the Docker container:

   ```sh
   docker run -d -p 3000:3000 --env-file .env jal-vision-server
   ```

   The server will be running at `http://localhost:3000`.

## 🤝 Contributing

We welcome contributions! Please see our [Contribution Guidelines](#contribution-guidelines) for more details.

## 📜 Contribution Guidelines

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```sh
   git checkout -b feature-name
   ```
3. Make your changes.
4. Commit your changes:
   ```sh
   git commit -m "Description of your changes"
   ```
5. Push to your branch:
   ```sh
   git push origin feature-name
   ```
6. Create a pull request.

Thank you for your contributions!

## 📄 License

This project is licensed under the MIT License.
