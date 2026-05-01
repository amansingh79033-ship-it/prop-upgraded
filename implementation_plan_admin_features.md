# Implementation Plan: Admin Features & Real-Time Messaging

## 1. The Dashboard "Sync" Issue
The screenshot you provided shows `0` for your server metrics because you are currently running your server using `npm run dev`. Vite (which powers `npm run dev`) only runs the front-end components and **completely ignores** the `api/` backend folder where our Postgres connection lives!

To see the real data sync, we just need to restart your terminal using **`npx vercel dev`**. This tells Vercel to boot up both the **Frontend** and the **Postgres Backend** simultaneously so they can talk to each other. 

## 2. Database Schema Upgrades
To support user freezing and messaging, we will run a new backend migration script to:
- **`users` Table Upgrade:** Add a `status` column (defaulting to `active`, switchable to `frozen`).
- **`messages` Table (NEW):** Create a table to queue popups containing `id`, `target_codename` (or 'ALL' for bulk), `message_text`, and `expires_at`.

## 3. New Backend Serverless Endpoints
We will create four new Vercel endpoints:
- **`api/manage-users.ts`**: To handle Freezing and Deleting unique users.
- **`api/user-history.ts`**: To fetch the complete, time-stamped navigation history for any specific user.
- **`api/send-message.ts`**: For the Admin to blast new popup messages into the database.
- **`api/check-messages.ts`**: For the active users to constantly poll and see if the Admin has sent them a real-time message.

## 4. Frontend Admin Dashboard Overhaul
- **New Tab:** Introduce a "User Management" control panel.
- **Actions Datatable:** A list of all connected users with direct buttons to `[Freeze Account]`, `[Delete Data]`, and `[View Navigation History]`.
- **Admin Comms Controller:** A form to type a message, select a user (or select "Broadcast to All"), and push it live.

## 5. Front-End Real-Time Popup System
- We will inject a background polling hook directly into `App.tsx` that silently pings `api/check-messages` every 3 seconds without lagging the experience.
- If a message is flagged for that specific user, a beautifully styled high-priority Modal overlay will appear center-screen for exactly **5 seconds** before automatically dismissing itself.
