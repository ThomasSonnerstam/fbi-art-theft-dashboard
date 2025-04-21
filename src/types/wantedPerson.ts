export type WantedPerson = {
  id: string;
  title: string;
  description?: string;
  images?: {
    original: string;
    thumb: string;
    large: string;
    caption?: string;
  }[];
  subjects?: string[];
  status?: string;
  reward_text?: string;
  url?: string;
  field_offices?: string[];
  publication?: string;
  modified?: string;
  age_range?: string;
  sex?: string;
  race?: string;
  nationality?: string;
};
