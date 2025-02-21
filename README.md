# Next Auth Without Auth Deps

## Description

A simple project to demonstrate how to create an authentication system using Next.js without using any authentication dependencies.

## Dependencies

List of dependencies used in this project:

- `next` (v^15)
- `react` (v^19)
- `typescript`
- `jose`
- `server-only`
- `tailwind` (v^4)
- `shadcn` (@canary)
- `zod`

## Diagram Scheme

![Nextjs Basic Auth Architecture](https://github.com/user-attachments/assets/971627f7-71e0-44e1-8a10-b02406c8c3d8)


## Installation

Instructions on how to install and set up the project.

1. Clone the repository:

   ```bash
   git clone https://github.com/rxtsel/next-auth-without-auth-deps.git
   ```

2. Navigate to the project directory

   ```bash
   cd next-auth-without-auth-deps
   ```

3. Install dependencies

   ```bash
   pnpm install
   ```

## Usage

Instructions on how to use the project.

1. Create a `.env` file in the root of the project and add the following environment variables:

   ```env
   SESSION_SECRET=this-is-a-amazing-secret-key
   ```

2. Run the project:

   ```bash
    pnpm dev
   ```
