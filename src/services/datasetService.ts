export interface Dataset {
  id: number;
  name: string;
  tags: string[];
  status: 'published' | 'private';
  owner: string;
  useCases: string[];
}

const datasets: Dataset[] = [
  { id: 1, name: 'Payments', tags: ['finance', 'transactions'], status: 'published', owner: 'Team Alpha', useCases: ['analytics'] },
  { id: 2, name: 'Customer360', tags: ['customer', 'profile'], status: 'private', owner: 'Team Beta', useCases: ['marketing'] },
  { id: 3, name: 'Trades', tags: ['markets'], status: 'published', owner: 'Team Gamma', useCases: ['risk', 'reporting'] },
];

export const fetchDatasets = async (): Promise<Dataset[]> => {
  return new Promise(resolve => setTimeout(() => resolve(datasets), 300));
};
