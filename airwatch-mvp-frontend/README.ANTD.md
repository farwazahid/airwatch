Ant Design + Dashboard setup notes

- Place your Lottie JSON (you mentioned `Greenify the Earth.json`) into:
  `public/animations/Greenify the Earth.json`

- Install dependencies (from this folder):

```bash
yarn install
yarn dev
```

- The app uses Ant Design components and a `DashboardLayout` with `HeaderBar` and `Sidebar`.
  HeaderBar will render the lottie file if placed at the path above; otherwise it will show a fallback.
