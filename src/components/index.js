// UI references
// https://ionicframework.com/docs/components/#buttons
// https://material.io/guidelines/components/buttons.html#buttons-raised-buttons
// https://material.angularjs.org/latest/demo/button

// Core
import Button from './buttons/Button';
import Input from './input/Input';
import Modal from './modal/Modal';

import ListItem from './list/ListItem';
import Overlay from './overlay/Overlay';
import ThemedView from './themedview/ThemedView';
import SafeAreaView from './safeareaview/SafeAreaView';

// Utilities
import SearchBar from './searchbar/Search';
import Badge from './badge/Badge';
import withBadge from './badge/withBadge';
import Divider from './divider/Divider';
import Slider from './slider/Slider';
import ButtonGroup from './buttons/ButtonGroup';
import Image from './image/Image';

// Productivity
import Card from './card/Card';
import Tile from './tile/Tile';
import Avatar from './avatar/Avatar';
import Header from './header/Header';
import PricingCard from './pricing/PricingCard';
import Tooltip from './tooltip/Tooltip';

// import {
//   AirbnbRating as BaseAirbnbRating,
//   Rating as BaseRating,
// } from 'react-native-ratings';

// helpers
import Text from './text/Text';
import {colors, ThemeProvider, ThemeConsumer, withTheme} from './config';
import normalize from './helpers/normalizeText';

// const AirbnbRating = withTheme(BaseAirbnbRating, 'AirbnbRating');
// const Rating = withTheme(BaseRating, 'Rating');

// More components
import Loading from './Loading';

export {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Input,
  Modal,
  ListItem,
  PricingCard,
  Tooltip,
  Text,
  ThemedView,
  SafeAreaView,
  Divider,
  SearchBar, 
  colors,
  normalize,
  Tile,
  Slider,
  Avatar,
  // Rating,
  // AirbnbRating,
  Header,
  Overlay,
  ThemeProvider,
  ThemeConsumer,
  withBadge,
  withTheme,
  Image,
  Loading,
};
