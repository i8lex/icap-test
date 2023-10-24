export type User = {
  id: string;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
};

export type Table = {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  message: string;
};

export type LayoutProps = {
  id?: string;
  children: React.ReactNode;
  page: string;
};

export type Page = "table";
