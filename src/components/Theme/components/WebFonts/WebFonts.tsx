import React, {ReactNode, useEffect, PropsWithChildren} from 'react';

import {useThemeConfiguration} from '../../hooks';

export interface WebFontsProps {
  children: ReactNode;
}

export function WebFonts({children}: WebFontsProps) {
  const {typographyPrimary, typographySecondary} = useThemeConfiguration();

  useEffect(() => {
    const fonts = [typographyPrimary, typographySecondary]
      .map((typography) => [
        {
          fonts: typography.fonts,
          source: typography.sourceBase,
          weight: typography.weightBase,
        },
        {
          fonts: typography.fonts,
          source: typography.sourceBold,
          weight: typography.weightBold,
        },
      ])
      .reduce((fonts, typography) => fonts.concat(typography), [])
      .filter(
        (font): font is {fonts: string; source: string; weight: string} =>
          font.fonts !== undefined && font.source !== undefined,
      )
      .map(
        ({fonts, source, weight}) =>
          new FontFace(fonts, source, {
            weight,
          }),
      );

    async function loadFonts() {
      await Promise.all(fonts).then((loadedFonts) => {
        loadedFonts.forEach(function (font) {
          document.fonts.add(font);
        });
      });
    }

    loadFonts();
  }, [typographyPrimary, typographySecondary]);

  return <>{children}</>;
}

export interface MaybeProps {
  condition: boolean;
}

export function MaybeWebFonts({
  children,
  condition,
}: PropsWithChildren<MaybeProps>) {
  return condition ? <WebFonts>{children}</WebFonts> : <>{children}</>;
}
