export interface Table {
  title?: string;
  columns: TableColumn[];
  data?: TableRow[];
  searchBar?: TableSearchbar;
}

export interface TableColumn {
  title: string;
  field: string;
}

export interface TableRow {
  [key: string]: string | number;
}

export interface TableSearchbar {
  type: 'text' | 'number';
  placeholder: string;
  min?: number;
  max?: number;
  search: (value: string) => void;
}
