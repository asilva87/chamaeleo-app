import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}

export function FontelloText(props: TextProps) {
    return <Text {...props} style={[props.style, { fontFamily: 'Fontello' }]} />;
  }
  
  export function SignPainterText(props: TextProps) {
      return <Text {...props} style={[props.style, { fontFamily: 'SignPainter'}]} />
  }