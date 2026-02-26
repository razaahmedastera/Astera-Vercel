import DatasheetListScreen from '@/components/screens/DatasheetScreen/DatasheetListScreen';
import { getAllDatasheets } from '@/lib/contentful/api';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Data Sheets - Astera',
  description: 'Explore product data sheets with technical specifications, features, and capabilities of Astera solutions.',
};

export default async function DataSheetsPage() {
  try {
    const datasheets = await getAllDatasheets();
    return <DatasheetListScreen datasheets={datasheets} />;
  } catch (error) {
    console.error('[DataSheetsPage] Error:', error);
    return <DatasheetListScreen datasheets={[]} />;
  }
}
