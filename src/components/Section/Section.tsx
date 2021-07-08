import React, {createContext, PropsWithChildren, useContext} from 'react';
import {ViewProps} from '@shopify/checkout-ui-extensions';

import {HeadingGroup} from '../HeadingGroup';
import {View} from '../View';

interface SectionContext {
  level?: number;
}

export const SectionContext = createContext<SectionContext | undefined>(
  undefined,
);

function useSection() {
  return useContext(SectionContext);
}

interface Props extends ViewProps {
  /**
   * A label to use for the section title that will be used for buyers using
   * assistive technologies.
   */
  accessibilityLabel?: string;
}

export function Section({
  accessibilityLabel,
  background,
  border,
  borderColor,
  borderRadius,
  borderWidth,
  padding,
  children,
}: PropsWithChildren<Props>) {
  const context = useSection();

  const level = (context?.level ?? 0) + 1;

  return (
    <SectionContext.Provider value={{level}}>
      <View
        accessibilityLabel={accessibilityLabel}
        background={background}
        border={border}
        borderColor={borderColor}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        padding={padding}
        role="region"
      >
        {level > 1 ? <HeadingGroup>{children}</HeadingGroup> : children}
      </View>
    </SectionContext.Provider>
  );
}
