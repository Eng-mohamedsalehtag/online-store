# Online Store

Online Store is an Angular e-commerce web application for browsing products, viewing product details, filtering by category, and managing a shopping cart.

The app uses the [Fake Store API](https://fakestoreapi.com/) for product and category data, Bootstrap for responsive layout, and Font Awesome for icons.

## Features

- Home page with hero section, featured products, categories, and call-to-action area.
- Products page that lists all products from the API.
- Category filter for browsing products by product type.
- Product details page with image, category, description, rating, reviews count, and price.
- Add-to-cart functionality from the products page and product details page.
- Cart page with saved cart items, quantity controls, item removal, clear cart, and total price calculation.
- Cart data is stored in browser `localStorage`.
- Loading spinner while product and category data is being fetched.
- Shared navbar and footer across the application.

## Technologies Used

- Angular 16
- TypeScript
- Bootstrap 5
- Font Awesome
- RxJS
- Fake Store API

## Project Structure

```text
src/app
|-- components
|   |-- home
|   |-- products
|   |-- product-details
|   `-- cart
|-- services
|   |-- products.service.ts
|   |-- categories.service.ts
|   `-- cart.service.ts
|-- shared
|   |-- navbar
|   |-- footer
|   `-- spinner
|-- app-routing.module.ts
`-- app.module.ts
```

## Routes

| Route | Page |
| --- | --- |
| `/home` | Home page |
| `/products` | Product listing and category filtering |
| `/details/:id` | Product details |
| `/cart` | Shopping cart |

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm start
```

Open the app in your browser:

```text
http://localhost:4200/
```

The app reloads automatically when source files change.

## Available Scripts

```bash
npm start
```

Starts the Angular development server.

```bash
npm run build
```

Builds the project into the `dist/` directory.

```bash
npm test
```

Runs unit tests with Karma.

## API

This project gets data from Fake Store API:

- Products: `https://fakestoreapi.com/products`
- Product details: `https://fakestoreapi.com/products/{id}`
- Categories: `https://fakestoreapi.com/products/categories`
- Category products: `https://fakestoreapi.com/products/category/{category}`

## Notes

This project was generated with Angular CLI version 16.2.16 and developed as a course e-commerce practice project.
