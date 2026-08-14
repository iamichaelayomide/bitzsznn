# Bitzsznn

Recovered production website for [bitzsznn.vercel.app](https://bitzsznn.vercel.app).

## Local preview

```bash
npm run dev
```

The preview runs at `http://127.0.0.1:4173`.

## Production build

```bash
npm run vercel-build
```

Vercel publishes the generated `dist` directory. Configure these environment variables in Vercel:

- `PAYSTACK_SECRET_KEY`
- `NEXT_PUBLIC_SITE_URL=https://bitzsznn.vercel.app`

Never commit secret keys to the repository.
