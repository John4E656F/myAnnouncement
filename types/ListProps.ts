import FontAwesome from '@expo/vector-icons/FontAwesome';
import { icons } from '../constants/iconMapping';

export interface ListProps {
  link: string;
  icon: keyof typeof icons;
  title: string;
  category: string;
}
