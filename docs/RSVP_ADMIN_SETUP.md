# RSVP and admin setup

The RSVP form and admin dashboard require a Supabase project before deployment.

1. Create a Supabase project and run `supabase/schema.sql` in its SQL editor.
2. Add these server-side variables to `.env.local` and to Vercel for Production, Preview, and Development:
   - `SUPABASE_URL`
   - `SUPABASE_SECRET_KEY` (the server-only `sb_secret_...` key, not the publishable key)
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`
3. Keep the existing SMTP variables configured so RSVP and ticket confirmation emails can be delivered.
4. Set `NEXT_PUBLIC_SITE_URL=https://bitzsznn.vercel.app` in production.
5. In Paystack, keep the webhook URL set to `https://bitzsznn.vercel.app/api/paystack/webhook` so successful purchases appear in the dashboard.

Generate `ADMIN_SESSION_SECRET` as a long random value (at least 32 bytes). The Supabase secret key must never use a `NEXT_PUBLIC_` prefix and must never be exposed in client-side code.

After deployment:

- Open `/events/abuja-homecoming` and submit one test RSVP.
- Confirm that the guest receives the email.
- Open `/admin`, sign in, and confirm the attendee appears.
- Test closing and reopening RSVPs.
- Make one Paystack test transaction in a preview environment and confirm it appears once, even when the webhook and return page both process it.
