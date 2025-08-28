export interface AclEntry {
  user: string;
  role: string;
}

export interface Lineage {
  upstream: string[];
  downstream: string[];
}

export interface Dataset {
  id: number;
  name: string;
  description: string;
  tags: string[];
  status: 'published' | 'private';
  owner: string;
  useCases: string[];
  acls: AclEntry[];
  accessCount: number;
  lastQueried: string;
  lineage: Lineage;
}

let datasets: Dataset[] = [
  {
    id: 1,
    name: 'Payments',
    description: 'Transactions across all payment channels',
    tags: ['finance', 'transactions'],
    status: 'published',
    owner: 'Team Alpha',
    useCases: ['analytics'],
    acls: [
      { user: 'alice@example.com', role: 'reader' },
      { user: 'bob@example.com', role: 'writer' }
    ],
    accessCount: 1234,
    lastQueried: '2024-05-01',
    lineage: { upstream: ['RawPayments'], downstream: ['PaymentAnalytics'] }
  },
  {
    id: 2,
    name: 'Customer360',
    description: 'Unified customer profile',
    tags: ['customer', 'profile'],
    status: 'private',
    owner: 'Team Beta',
    useCases: ['marketing'],
    acls: [{ user: 'carol@example.com', role: 'owner' }],
    accessCount: 523,
    lastQueried: '2024-04-15',
    lineage: { upstream: ['CRM'], downstream: ['CampaignTool'] }
  },
  {
    id: 3,
    name: 'Trades',
    description: 'Trade records for all desks',
    tags: ['markets'],
    status: 'published',
    owner: 'Team Gamma',
    useCases: ['risk', 'reporting'],
    acls: [{ user: 'dave@example.com', role: 'reader' }],
    accessCount: 812,
    lastQueried: '2024-05-10',
    lineage: { upstream: ['RawTrades'], downstream: ['TradeReports'] }
  }
];

export const fetchDatasets = async (): Promise<Dataset[]> => {
  return new Promise(resolve => setTimeout(() => resolve([...datasets]), 200));
};

export const fetchDatasetById = async (id: number): Promise<Dataset | undefined> => {
  const all = await fetchDatasets();
  return all.find(d => d.id === id);
};

export const updateDataset = async (id: number, update: Partial<Dataset>): Promise<Dataset> => {
  const index = datasets.findIndex(d => d.id === id);
  if (index === -1) throw new Error('Dataset not found');
  datasets[index] = { ...datasets[index], ...update };
  return datasets[index];
};
