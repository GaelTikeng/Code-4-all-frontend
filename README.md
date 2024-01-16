#    Welcome to Code-4all
This document outlines the structure, setup and functionalities of Code-4all. It's is designed for developpers, contributors and users to understand the project and how it works.
## Project Overview
* <b>Name</b>: Code-4all
* <b>Description</b>: An online platform selling a diverse range of coding resources splitted in two main categories: <b>Frontend</b> and <b>Backend</b>.
* <b>Target audience</b>: Developers, programmers, students, and anyone interested in learning and practicing coding.
* <b>Tech stack</b>: Full stack application.
## Project structure
This project was built using the following technologies;
* <b>Frontend</b>: Nextjs with TypeScript
* <b>Backend</b>: Nestjs with TypeScript
* <b>Database</b>: MySQL
* <b>Assets</b>: Storing images, icons, and other static files
## Setup and installation:
1. <b>Install dependencies</b>: Use the following command line tool to install required libraries and frameworks;
```bash
npm install
```
2. <b>Run the server</b>: Use the following command to run the server;
```bash
npm run dev 
```
3. <b>Access the website</b>: Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
## Third parti platforms
1. [`Firebase`](https://firebase.google.com/)  for google authentication
2. [`Edgestore`](https://edgestore.dev/) for file upload
## Key functionalities 
* <b>Product browsing and search</b>: Users can browse through product categories, search for specific items, and view detailed product information and can eventually add to shopping cart.
* <b>Shopping cart and checkout</b>: Users can add code snippets to their cart, manage quantities, and proceed to checkout using various payment methods (paypal and credit cart). After purchase the user will receive links of all the purchased code snippets in his mail box.
* <b>User accounts</b>: Users can register and create accounts to manage their orders, see their purchased code snippets, see payment histories and eventually have the posibility to upload their own course and put it for sale.
* <b>Content management system (CMS)</b>: Administrators can add, edit, and manage code snippet information, category, description, price, etc.
## Demo
You can view a fully working demo at [https://code-4all-dev.vercel.app/](https://code-4all-dev.vercel.app/)
