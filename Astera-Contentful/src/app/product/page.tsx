import { Suspense } from 'react';
import { ProductScreenNewClient } from '@/components/screens/ProductScreen';

export default function ProductPage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>Loading...</div>}>
      <ProductScreenNewClient />
    </Suspense>
  );
}


