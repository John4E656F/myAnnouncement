import FontAwesome from '@expo/vector-icons/FontAwesome';
import { icons } from '../constants/iconMapping';

export interface ListProps {
  _id: string;
  link: string;
  icon: keyof typeof icons;
  title: string;
  category: string;
}
