export interface AnnounceProps {
  id?: string;
  _id?: string;
  title: string;
  favorite?: boolean;
  french: string;
  dutch: string;
  german: string;
  english: string;
  category: 'general' | 'realTime' | 'urgent';
  icon?: string;
  isFavorite?: boolean;
  suggested: boolean;
  suggestedBy?: string;
  addName?: boolean;
  email?: string;
  phone?: string;
}
