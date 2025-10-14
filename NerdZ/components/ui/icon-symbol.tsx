// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { type StyleProp, type TextStyle } from 'react-native';

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */

const Icons = {
  home: (size:number,color:string,style:StyleProp<TextStyle>) => <MaterialIcons name="home" size={size} color={color} style={style} />,
  about: (size:number,color:string,style:StyleProp<TextStyle>) => <MaterialIcons name="info" size={size} color={color} style={style} />,
  contact: (size:number,color:string,style:StyleProp<TextStyle>) => <MaterialIcons name="mail" size={size} color={color} style={style} />,
  features: (size:number,color:string,style:StyleProp<TextStyle>) => <MaterialIcons name="star" size={size} color={color} style={style} />,
  settings: (size:number,color:string,style:StyleProp<TextStyle>) => <MaterialIcons name="settings" size={size} color={color} style={style} />,
}

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: 'home'|'about'|'contact'|'features'|'settings';
  size?: number;
  color: string;
  style?: StyleProp<TextStyle>;
}) {
  return Icons[name](size,color,style)
}
