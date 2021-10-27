# next-avatars

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started

# MongoDB

Create MongoDB account and add a `.env` file to the root folder.
This will contain database setup credentials:

```bash
MONGODB_URI=
DB_NAME=
DEV_URL=http://localhost:3000
PROD_URL=
```

You can now proceed with installing and running the application locally:

```bash
# install dependencies
npm install

# start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Project structure

```bash
|- components     # UI components
|- lib            # MongoDB configuration & connection setup
    |-- models    # Data entity models 
|- pages          # Each page is associated with a route based on its file name.
    |-- api       # NextJS API routes. Resolves methods against the MongoDB connection
|- public         # NextJS public assets
|- styles         # CSS assets used throughout the application 
```
NextJS [Pages documentation](https://nextjs.org/docs/basic-features/pages)

# Architecture

The main business complexity is with uploading image files.
Since it's possible to embed an image as Base64 representation then we can solve the business requirement with a simple backend.
With MongoDB, we store the image Base64 and image name as JSON.
Then we proceed with API requests for rendering the images as well as adding/deleting them.


# To do

To be fully production ready there's more to be done.
These weren't included as this is more of an M.V.P. of business requirements:
* Adding test cases
* Validating/sanitzing user input (XSS)
* Making application a11y compatible
* Using tailwind for all stylings
