import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import Badge from './Badge';

interface WithBadgeOptions {
  bottom?: number;
  hidden?: boolean;
  left?: number;
  right?: number;
  top?: number;
  containerStyle?: ViewStyle;
}

interface BadgeProps {
  value?: React.ReactNode | ((props: any) => React.ReactNode);
  status?: string;
  containerStyle?: ViewStyle;
}

const withBadge = (
  value: React.ReactNode | ((props: any) => React.ReactNode),
  options: WithBadgeOptions = {}
) => <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithBadge: React.FC<P> = (props) => {
    const { bottom, hidden = false, left, containerStyle, ...badgeProps } = options;

    let { right = -16, top = -1 } = options;

    if (!value) {
      right = -3;
      top = 3;
    }

    const badgeValue = typeof value === 'function' ? value(props) : value;

    return (
      <View style={StyleSheet.flatten([styles.container, containerStyle])}>
        <WrappedComponent {...props} />

        {!hidden && (
          <Badge
            value={badgeValue}
            status="error"
            containerStyle={StyleSheet.flatten([
              styles.badgeContainer,
              { bottom, left, right, top },
            ])}
            {...(badgeProps as BadgeProps)}
          />
        )}
      </View>
    );
  };

  WithBadge.displayName = `WithBadge(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithBadge;
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

export default withBadge;
