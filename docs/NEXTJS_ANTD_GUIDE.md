# Next.js + Ant Design + Tailwind Quick Guide

## 🎯 Why This Stack for the Hackathon?

### Next.js 14
- ✅ **Production-ready framework** with built-in optimization
- ✅ **File-based routing** - No router configuration needed
- ✅ **TypeScript support** - Catch errors before they happen
- ✅ **Vercel deployment** - One-click deployment, perfect for demos
- ✅ **Server Components** - Better performance out of the box

### Ant Design 5
- ✅ **50+ pre-built components** - Cards, Tables, Forms, Modals, etc.
- ✅ **Enterprise-grade quality** - Used by Alibaba, Ant Financial
- ✅ **Consistent design** - Professional look without effort
- ✅ **Saves 60%+ development time** - No need to build from scratch
- ✅ **Mobile responsive** - Works great on all devices

### Tailwind CSS
- ✅ **Utility-first** - Rapid prototyping
- ✅ **Customizable** - Works alongside Ant Design
- ✅ **Small bundle size** - Purges unused CSS
- ✅ **Perfect for spacing** - Quick margins, padding adjustments

---

## 🚀 Quick Setup (10 minutes)

### Step 1: Create Next.js App
```bash
npx create-next-app@latest frontend --typescript --tailwind --app --src-dir --import-alias "@/*"
```

**Prompts will ask:**
- ✅ TypeScript? **Yes**
- ✅ ESLint? **Yes**
- ✅ Tailwind CSS? **Yes**
- ✅ `src/` directory? **Yes**
- ✅ App Router? **Yes** (recommended)
- ✅ Import alias? **Yes** (`@/*`)

### Step 2: Install Dependencies
```bash
cd frontend
npm install antd leaflet react-leaflet recharts axios zustand
npm install -D @types/leaflet
```

### Step 3: Configure Ant Design

**Create `app/providers.tsx`:**
```typescript
'use client';

import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

export function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb', // Blue theme
          borderRadius: 8,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
```

**Update `app/layout.tsx`:**
```typescript
import type { Metadata } from 'next';
import { AntdProvider } from './providers';
import 'antd/dist/reset.css'; // Ant Design styles
import './globals.css'; // Tailwind styles

export const metadata: Metadata = {
  title: 'AirWatch - Predicting Cleaner, Safer Skies',
  description: 'NASA Space Apps Challenge 2025',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
```

### Step 4: Test It
```bash
npm run dev
# Open http://localhost:3000
```

---

## 📦 Key Ant Design Components for Your Project

### 1. Layout Components
```typescript
import { Layout, Menu } from 'antd';
const { Header, Sider, Content, Footer } = Layout;

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Layout className="min-h-screen">
      <Header className="bg-blue-600">
        <h1 className="text-white text-2xl">AirWatch</h1>
      </Header>
      <Content className="p-6">{children}</Content>
      <Footer className="text-center">NASA Space Apps 2025</Footer>
    </Layout>
  );
}
```

### 2. Air Quality Card
```typescript
import { Card, Statistic, Row, Col } from 'antd';

export default function AirQualityCard({ data }) {
  return (
    <Card title="Current Air Quality" className="shadow-lg">
      <Row gutter={16}>
        <Col span={8}>
          <Statistic 
            title="PM2.5" 
            value={data.pm25} 
            suffix="μg/m³"
            valueStyle={{ color: data.pm25 > 50 ? '#cf1322' : '#3f8600' }}
          />
        </Col>
        <Col span={8}>
          <Statistic title="NO2" value={data.no2} suffix="ppb" />
        </Col>
        <Col span={8}>
          <Statistic title="AQI" value={data.aqi} />
        </Col>
      </Row>
    </Card>
  );
}
```

### 3. Alert Banner
```typescript
import { Alert } from 'antd';

export default function AlertBanner({ level, message }) {
  const type = level === 'high' ? 'error' : level === 'moderate' ? 'warning' : 'success';
  
  return (
    <Alert
      message="Air Quality Alert"
      description={message}
      type={type}
      showIcon
      closable
      className="mb-4"
    />
  );
}
```

### 4. Prediction Timeline
```typescript
import { Timeline, Card } from 'antd';

export default function PredictionTimeline({ forecasts }) {
  return (
    <Card title="24-Hour Forecast">
      <Timeline
        items={forecasts.map((f) => ({
          children: `${f.hour}:00 - PM2.5: ${f.pm25} μg/m³ (AQI: ${f.aqi})`,
          color: f.aqi > 100 ? 'red' : f.aqi > 50 ? 'orange' : 'green',
        }))}
      />
    </Card>
  );
}
```

### 5. Loading Skeleton
```typescript
import { Card, Skeleton } from 'antd';

export default function LoadingSkeleton() {
  return (
    <Card>
      <Skeleton active paragraph={{ rows: 4 }} />
    </Card>
  );
}
```

### 6. Search Box
```typescript
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function LocationSearch({ onSelect }) {
  const [options, setOptions] = useState([]);
  
  return (
    <AutoComplete
      options={options}
      onSelect={onSelect}
      onSearch={(value) => {
        // Fetch location suggestions
        setOptions([
          { value: 'New York' },
          { value: 'Los Angeles' },
          { value: 'Chicago' },
        ]);
      }}
    >
      <Input 
        size="large" 
        placeholder="Search location..." 
        prefix={<SearchOutlined />}
        className="w-full"
      />
    </AutoComplete>
  );
}
```

### 7. Data Table
```typescript
import { Table } from 'antd';

export default function HistoricalDataTable({ data }) {
  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'PM2.5', dataIndex: 'pm25', key: 'pm25' },
    { title: 'AQI', dataIndex: 'aqi', key: 'aqi' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => (
        <span className={status === 'Good' ? 'text-green-600' : 'text-red-600'}>
          {status}
        </span>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />;
}
```

---

## 🗺️ Leaflet Map with Next.js (Important!)

**Leaflet doesn't work with SSR**, so you must use dynamic import:

**Create `src/components/map/MapView.tsx`:**
```typescript
'use client';

import dynamic from 'next/dynamic';
import { Spin } from 'antd';

// Dynamically import Leaflet components (no SSR)
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { 
    ssr: false,
    loading: () => <div className="flex justify-center items-center h-96"><Spin size="large" /></div>
  }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

export default function MapView({ center, zoom, markers }) {
  return (
    <div className="h-96 rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {markers.map((marker, idx) => (
          <Marker key={idx} position={marker.position}>
            <Popup>{marker.popup}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
```

**Add Leaflet CSS to `app/layout.tsx`:**
```typescript
import 'leaflet/dist/leaflet.css';
```

---

## 🎨 Combining Ant Design + Tailwind

You can use both together! Here's how:

### Option 1: Ant Design for Components, Tailwind for Utilities
```typescript
<Card className="shadow-lg"> {/* Ant Design component */}
  <div className="flex gap-4 mb-4"> {/* Tailwind utilities */}
    <Button type="primary">Submit</Button> {/* Ant Design */}
  </div>
</Card>
```

### Option 2: Override Ant Design with Tailwind
```typescript
<Button type="primary" className="!bg-blue-700 !rounded-full">
  Custom Button
</Button>
```
*Note: Use `!` prefix to override Ant Design styles*

### Option 3: Use Ant Design Theme
```typescript
// In app/providers.tsx
<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#2563eb',  // Tailwind blue-600
      fontFamily: 'Inter, sans-serif',
    },
  }}
>
```

---

## 🔧 Environment Variables

**Create `.env.local`:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
```

**Usage:**
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

*Note: Next.js requires `NEXT_PUBLIC_` prefix for client-side variables*

---

## 📱 Responsive Design with Ant Design

Ant Design has built-in responsive utilities:

```typescript
import { Row, Col } from 'antd';

<Row gutter={[16, 16]}>
  <Col xs={24} sm={12} md={8} lg={6}>
    <Card>Content 1</Card>
  </Col>
  <Col xs={24} sm={12} md={8} lg={6}>
    <Card>Content 2</Card>
  </Col>
</Row>
```

**Breakpoints:**
- `xs`: < 576px (mobile)
- `sm`: ≥ 576px (tablet)
- `md`: ≥ 768px (desktop)
- `lg`: ≥ 992px (large desktop)
- `xl`: ≥ 1200px (extra large)

---

## 🎨 Ant Design Icons

```bash
npm install @ant-design/icons
```

**Usage:**
```typescript
import { 
  HomeOutlined, 
  DashboardOutlined, 
  CloudOutlined,
  EnvironmentOutlined,
  WarningOutlined 
} from '@ant-design/icons';

<Button type="primary" icon={<CloudOutlined />}>
  Check Air Quality
</Button>
```

---

## 🚀 Deployment to Vercel

### Method 1: GitHub Integration (Recommended)
```bash
1. Push code to GitHub
2. Go to vercel.com
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"
```

Vercel automatically:
- Detects Next.js
- Installs dependencies
- Builds the project
- Deploys to production

### Method 2: Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 📊 Performance Tips

### 1. Use Next.js Image Component
```typescript
import Image from 'next/image';

<Image 
  src="/logo.png" 
  alt="AirWatch" 
  width={200} 
  height={50}
  priority // for above-the-fold images
/>
```

### 2. Lazy Load Components
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <Spin />,
});
```

### 3. Use Ant Design Tree Shaking
```typescript
// ✅ Good - imports only what you need
import { Button, Card } from 'antd';

// ❌ Avoid - imports everything
import * as antd from 'antd';
```

---

## 🐛 Common Issues & Fixes

### Issue 1: Leaflet not displaying
**Fix:** Add to `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-leaflet': 'react-leaflet/lib/index.js',
    };
    return config;
  },
};

module.exports = nextConfig;
```

### Issue 2: Ant Design styles not loading
**Fix:** Make sure you imported CSS in `app/layout.tsx`:
```typescript
import 'antd/dist/reset.css';
```

### Issue 3: Tailwind conflicts with Ant Design
**Fix:** Use `!important` prefix in Tailwind:
```typescript
className="!bg-blue-500"
```

### Issue 4: TypeScript errors with Leaflet
**Fix:** Install types:
```bash
npm install -D @types/leaflet
```

---

## 📚 Essential Documentation Links

- **Next.js**: https://nextjs.org/docs
- **Ant Design**: https://ant.design/components/overview
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Leaflet**: https://react-leaflet.js.org/
- **Recharts**: https://recharts.org/

---

## 🎯 Hackathon Component Priority

### Day 1 (Must Have)
1. ✅ Layout with Header/Footer (Ant Design Layout)
2. ✅ Map View (React Leaflet with dynamic import)
3. ✅ Air Quality Card (Ant Design Card + Statistic)
4. ✅ Loading states (Ant Design Skeleton)

### Day 2 (Nice to Have)
5. ✅ Alert Banner (Ant Design Alert)
6. ✅ Data Table (Ant Design Table)
7. ✅ Search Box (Ant Design AutoComplete)
8. ✅ Modal for details (Ant Design Modal)

---

## ✨ Pro Tips for Hackathon

1. **Copy-paste Ant Design examples** - Their docs have ready-to-use code
2. **Use Ant Design's preset colors** - `success`, `warning`, `error`, `info`
3. **Customize theme once** - Set colors in `ConfigProvider`, use everywhere
4. **Use TypeScript** - Catch errors early, saves debugging time
5. **Test on mobile** - Ant Design components are responsive by default
6. **Use Ant Design's message/notification** - For user feedback
7. **Leverage Next.js App Router** - File-based routing is fast to set up

---

## 🎊 Sample Dashboard Page

**`app/dashboard/page.tsx`:**
```typescript
'use client';

import { Card, Row, Col, Statistic, Alert } from 'antd';
import { CloudOutlined, EnvironmentOutlined } from '@ant-design/icons';
import MapView from '@/components/map/MapView';

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <Alert
        message="Welcome to AirWatch"
        description="Real-time air quality monitoring using NASA data"
        type="info"
        showIcon
        closable
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Current AQI"
              value={85}
              prefix={<CloudOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="PM2.5"
              value={35.2}
              suffix="μg/m³"
              prefix={<EnvironmentOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Locations Monitored"
              value={12}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Air Quality Map" className="shadow-lg">
        <MapView 
          center={[40.7128, -74.0060]} 
          zoom={10}
          markers={[
            { position: [40.7128, -74.0060], popup: 'New York - AQI: 85' }
          ]}
        />
      </Card>
    </div>
  );
}
```

---

**You're all set! This stack will help you build a professional-looking MVP quickly. Focus on functionality first, polish later! 🚀**

