# Shopify App: Pre Order, Coming Soon and Request for Stock

This Shopify app will help customers to not losing their sells for stock management. After zero stock this app will automatically add those button so that customer can take actions. 


## Tech Stack

This template combines a number of third party open source tools:

-   [Laravel](https://laravel.com/) builds and tests the backend.
-   [Vite](https://vitejs.dev/) builds the [React](https://reactjs.org/) frontend.
-   [React Router](https://reactrouter.com/) is used for routing. We wrap this with file-based routing.
-   [React Query](https://react-query.tanstack.com/) queries the Admin API.

## Getting started

### Requirements

1. You must [create a Shopify partner account](https://partners.shopify.com/signup) if you don’t have one.
1. You must create a store for testing if you don't have one, either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).
1. You must have [PHP](https://www.php.net/) installed.
1. You must have [Composer](https://getcomposer.org/) installed.
1. You must have [Node.js](https://nodejs.org/) installed.

### Installing the template

This template runs on Shopify CLI 3.0, which is a node package that can be included in projects. You can install it using your preferred Node.js package manager:

Using yarn:

```shell
yarn create @shopify/app --template php
```

Using npx:

```shell
npm init @shopify/app@latest -- --template php
```

Using pnpm:

```shell
pnpm create @shopify/app@latest --template php
```

This will clone the template and install the CLI in that project.

### Setting up your Laravel app

Once the Shopify CLI clones the repo, you will be able to run commands on your app.
However, the CLI will not manage your PHP dependencies automatically, so you will need to go through some steps to be able to run your app.
These are the typical steps needed to set up a Laravel app once it's cloned:

1. Start off by switching to the `web` folder:

    ```shell
    cd web
    ```

1. Install your composer dependencies:

    ```shell
    composer install
    ```

1. Create the `.env` file:

    ```shell
    cp .env.example .env
    ```

1. Bootstrap the default [SQLite](https://www.sqlite.org/index.html) database and add it to your `.env` file:

    ```shell
    touch storage/db.sqlite
    ```

    **NOTE**: Once you create the database file, make sure to update your `DB_DATABASE` variable in `.env` since Laravel requires a full path to the file.

1. Generate an `APP_KEY` for your app:

    ```shell
    php artisan key:generate
    ```

1. Create the necessary Shopify tables in your database:

    ```shell
    php artisan migrate
    ```

And your Laravel app is ready to run! You can now switch back to your app's root folder to continue:

```shell
cd ..
```

### Local Development

[The Shopify CLI](https://shopify.dev/docs/apps/tools/cli) connects to an app in your Partners dashboard.
It provides environment variables, runs commands in parallel, and updates application URLs for easier development.

You can develop locally using your preferred Node.js package manager.
Run one of the following commands from the root of your app:

Using yarn:

```shell
yarn dev
```

Using npm:

```shell
npm run dev
```

Using pnpm:

```shell
pnpm run dev
```

Open the URL generated in your console. Once you grant permission to the app, you can start development.