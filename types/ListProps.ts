import FontAwesome from '@expo/vector-icons/FontAwesome';

export interface ListProps {
  link: string;
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  title: string;
}
