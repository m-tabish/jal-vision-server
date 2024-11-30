# Prisma CRUD Design Documentation
 
## <span  style="color: gold;">  Introduction   </span>
This document outlines the design and implementation details for CRUD operations using Prisma in the Jal Vision Server project.

 
## <span  style="color: gold;"> Prerequisites </span>

- Node.js
- Prisma
- PostgreSQL (or any other supported database)

 
## <span  style="color: gold;"> Setup </span>

1. **Install Prisma CLI:**

   ```bash
   npm install @prisma/cli --save-dev
   ```

2. **Initialize Prisma:**

   ```bash
   npx prisma init
   ```

3. **Configure Database:**
   Update the `DATABASE_URL` in the `.env` file with your database connection string.
 
## <span  style="color: gold;"> Schema Definition </span>
Define your data model in `prisma/schema.prisma`:

```prisma
Copy the Schema.prisma file in /prisma
```

 
# <span  style="color: gold;"> Endpoints </span>
### 1. /insert: 
<span style="color: #E3242B;">`GET`</span> To insert the data in the db

### 2. /read/ :id  
<span style="color: #E3242B;">`GET`</span> Find the data using id (village-name in the central data set)

### 1. /update/ :id   
<span style="color: #E3242B;">`POST`</span> Send the new data along with same id in the body

## Conclusion

This document provides a basic overview of setting up and performing CRUD operations using Prisma. For more advanced usage and features, refer to the [Prisma documentation](https://www.prisma.io/docs/).
