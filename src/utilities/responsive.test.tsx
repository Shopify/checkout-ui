import React, {useEffect} from 'react';
import {mount} from '@quilted/react-testing/dom';

import {
  generateResponsiveClassnames,
  convertLogicalProps,
  useResponsive,
} from './responsive';

describe('generateResponsiveClassnames', () => {
  it('returns base className', () => {
    const prop = {background: 'surfacePrimary'};
    const classNames = generateResponsiveClassnames(prop);

    expect(classNames).toStrictEqual(['backgroundSurfacePrimary']);
  });

  it('returns multiple base classNames when prop maps to many properties', () => {
    const prop = {padding: 'base'};
    const classNames = generateResponsiveClassnames(prop);

    expect(classNames).toStrictEqual([
      'paddingInlineStartBase',
      'paddingInlineEndBase',
      'paddingBlockStartBase',
      'paddingBlockEndBase',
    ]);
  });

  it('returns responsive classNames when breakpoint is provided', () => {
    const prop = {padding: 'base'};

    const baseClassNames = generateResponsiveClassnames(prop, 'base');
    const smallClassNames = generateResponsiveClassnames(prop, 'small');
    const mediumClassNames = generateResponsiveClassnames(prop, 'medium');
    const largeClassNames = generateResponsiveClassnames(prop, 'large');

    expect(baseClassNames).toStrictEqual([
      'paddingInlineStartBase',
      'paddingInlineEndBase',
      'paddingBlockStartBase',
      'paddingBlockEndBase',
    ]);
    expect(smallClassNames).toStrictEqual([
      'smallPaddingInlineStartBase',
      'smallPaddingInlineEndBase',
      'smallPaddingBlockStartBase',
      'smallPaddingBlockEndBase',
    ]);
    expect(mediumClassNames).toStrictEqual([
      'mediumPaddingInlineStartBase',
      'mediumPaddingInlineEndBase',
      'mediumPaddingBlockStartBase',
      'mediumPaddingBlockEndBase',
    ]);
    expect(largeClassNames).toStrictEqual([
      'largePaddingInlineStartBase',
      'largePaddingInlineEndBase',
      'largePaddingBlockStartBase',
      'largePaddingBlockEndBase',
    ]);
  });
});

describe('convertLogicalProps', () => {
  it('returns prop untouched if not using a shorthand', () => {
    const logicalProps = convertLogicalProps('padding', 'base');

    expect(logicalProps).toStrictEqual({padding: 'base'});
  });

  it('returns block and inline logical props when using 2 directions', () => {
    const logicalProps = convertLogicalProps('padding', ['base', 'tight']);

    expect(logicalProps).toStrictEqual({
      paddingBlock: 'base',
      paddingInline: 'tight',
    });
  });

  it('returns block start/end and inline start/end logical props when using 4 directions', () => {
    const logicalProps = convertLogicalProps('padding', [
      'base',
      'tight',
      'loose',
      'extraLoose',
    ]);

    expect(logicalProps).toStrictEqual({
      paddingBlockEnd: 'loose',
      paddingBlockStart: 'base',
      paddingInlineEnd: 'tight',
      paddingInlineStart: 'extraLoose',
    });
  });
});

describe('useResponsive', () => {
  const spy = jest.fn();

  function ResponsiveComponent({...props}: any) {
    const responsiveClassNames = useResponsive(props);

    useEffect(() => {
      spy(responsiveClassNames);
    }, [responsiveClassNames]);

    return null;
  }

  afterEach(() => {
    spy.mockReset();
  });

  describe('padding', () => {
    it('applies the base padding classNames', () => {
      mount(<ResponsiveComponent padding="base" />);

      expect(spy.mock.calls).toMatchObject([
        [
          [
            'paddingInlineStartBase',
            'paddingInlineEndBase',
            'paddingBlockStartBase',
            'paddingBlockEndBase',
          ],
        ],
      ]);
    });

    it('applies the base block and inline padding classNames when using 2 directions shorthand', () => {
      mount(<ResponsiveComponent padding={['base', 'tight']} />);

      expect(spy.mock.calls).toMatchObject([
        [
          [
            'paddingBlockStartBase',
            'paddingBlockEndBase',
            'paddingInlineStartTight',
            'paddingInlineEndTight',
          ],
        ],
      ]);
    });

    it('applies the base block start/end and inline start/end padding classNames when using 4 directions shorthand', () => {
      mount(
        <ResponsiveComponent
          padding={['tight', 'base', 'loose', 'extraLoose']}
        />,
      );

      expect(spy.mock.calls).toMatchObject([
        [
          [
            'paddingBlockStartTight',
            'paddingInlineEndBase',
            'paddingBlockEndLoose',
            'paddingInlineStartExtraLoose',
          ],
        ],
      ]);
    });
  });

  describe('background', () => {
    it('applies the base background className', () => {
      mount(<ResponsiveComponent background="surfacePrimary" />);

      expect(spy.mock.calls).toMatchObject([[['backgroundSurfacePrimary']]]);
    });
  });

  describe('border', () => {
    it('applies the base border classNames', () => {
      mount(<ResponsiveComponent border="base" />);

      expect(spy.mock.calls).toMatchObject([
        [
          [
            'borderInlineStartBase',
            'borderInlineEndBase',
            'borderBlockStartBase',
            'borderBlockEndBase',
          ],
        ],
      ]);
    });

    it('applies the base block and inline border classNames when using 2 directions shorthand', () => {
      mount(<ResponsiveComponent border={['base', 'dotted']} />);

      expect(spy.mock.calls).toMatchObject([
        [
          [
            'borderBlockStartBase',
            'borderBlockEndBase',
            'borderInlineStartDotted',
            'borderInlineEndDotted',
          ],
        ],
      ]);
    });

    it('applies the base block start/end and inline start/end border classNames when using 4 directions shorthand', () => {
      mount(
        <ResponsiveComponent border={['base', 'dotted', 'base', 'dotted']} />,
      );

      expect(spy.mock.calls).toMatchObject([
        [
          [
            'borderBlockStartBase',
            'borderInlineEndDotted',
            'borderBlockEndBase',
            'borderInlineStartDotted',
          ],
        ],
      ]);
    });
  });

  describe('borderWidth', () => {
    it('applies the base borderWidth classNames', () => {
      mount(<ResponsiveComponent borderWidth="thin" />);

      expect(spy.mock.calls).toMatchObject([
        [
          [
            'borderWidthInlineStartThin',
            'borderWidthInlineEndThin',
            'borderWidthBlockStartThin',
            'borderWidthBlockEndThin',
          ],
        ],
      ]);
    });

    it('applies the base block and inline borderWidth classNames when using 2 directions shorthand', () => {
      mount(<ResponsiveComponent borderWidth={['thin', 'thick']} />);

      expect(spy.mock.calls).toMatchObject([
        [
          [
            'borderWidthBlockStartThin',
            'borderWidthBlockEndThin',
            'borderWidthInlineStartThick',
            'borderWidthInlineEndThick',
          ],
        ],
      ]);
    });

    it('applies the base block start/end and inline start/end borderWidth classNames when using 4 directions shorthand', () => {
      mount(
        <ResponsiveComponent
          borderWidth={['thin', 'medium', 'thick', 'thin']}
        />,
      );

      expect(spy.mock.calls).toMatchObject([
        [
          [
            'borderWidthBlockStartThin',
            'borderWidthInlineEndMedium',
            'borderWidthBlockEndThick',
            'borderWidthInlineStartThin',
          ],
        ],
      ]);
    });
  });

  describe('borderColor', () => {
    it('applies the base borderColor classNames', () => {
      mount(<ResponsiveComponent borderColor="base" />);

      expect(spy.mock.calls).toMatchObject([
        [
          [
            'borderColorInlineStartBase',
            'borderColorInlineEndBase',
            'borderColorBlockStartBase',
            'borderColorBlockEndBase',
          ],
        ],
      ]);
    });
  });

  describe('borderRadius', () => {
    it('applies the base borderRadius classNames', () => {
      mount(<ResponsiveComponent borderRadius="base" />);

      expect(spy.mock.calls).toMatchObject([
        [
          [
            'borderRadiusInlineStartBase',
            'borderRadiusInlineEndBase',
            'borderRadiusBlockStartBase',
            'borderRadiusBlockEndBase',
          ],
        ],
      ]);
    });

    it('applies the base block and inline borderRadius classNames when using 2 directions shorthand', () => {
      mount(<ResponsiveComponent borderRadius={['base', 'tight']} />);

      expect(spy.mock.calls).toMatchObject([
        [
          [
            'borderRadiusBlockStartBase',
            'borderRadiusBlockEndBase',
            'borderRadiusInlineStartTight',
            'borderRadiusInlineEndTight',
          ],
        ],
      ]);
    });

    it('applies the base block start/end and inline start/end borderRadius classNames when using 4 directions shorthand', () => {
      mount(<ResponsiveComponent borderRadius="base" />);

      expect(spy.mock.calls).toMatchObject([
        [
          [
            'borderRadiusInlineStartBase',
            'borderRadiusInlineEndBase',
            'borderRadiusBlockStartBase',
            'borderRadiusBlockEndBase',
          ],
        ],
      ]);
    });
  });

  describe('spacing', () => {
    it('applies the base spacing classNames', () => {
      mount(<ResponsiveComponent spacing="base" />);

      expect(spy.mock.calls).toMatchObject([[['spacingBase']]]);
    });
  });

  describe('stack', () => {
    it('applies the base stack classNames', () => {
      mount(<ResponsiveComponent stack={false} />);

      expect(spy.mock.calls).toMatchObject([[['stackFalse']]]);
    });
  });

  describe('media', () => {
    it('applies the classNames to the specified viewport size', () => {
      mount(
        <ResponsiveComponent
          background={{small: 'surfacePrimary'}}
          border={{small: ['dotted', 'base']}}
          borderWidth={{small: ['thin', 'medium', 'medium', 'thick']}}
          borderColor={{small: 'emphasized'}}
          borderRadius={{small: ['tight', 'base', 'tight', 'base']}}
          padding={{small: 'extraLoose'}}
          spacing={{small: 'thight'}}
        />,
      );

      expect(spy.mock.calls).toMatchObject([
        [
          [
            'smallBackgroundSurfacePrimary',
            'smallBorderBlockStartDotted',
            'smallBorderBlockEndDotted',
            'smallBorderInlineStartBase',
            'smallBorderInlineEndBase',
            'smallBorderWidthBlockStartThin',
            'smallBorderWidthInlineEndMedium',
            'smallBorderWidthBlockEndMedium',
            'smallBorderWidthInlineStartThick',
            'smallBorderColorInlineStartEmphasized',
            'smallBorderColorInlineEndEmphasized',
            'smallBorderColorBlockStartEmphasized',
            'smallBorderColorBlockEndEmphasized',
            'smallBorderRadiusBlockStartTight',
            'smallBorderRadiusInlineEndBase',
            'smallBorderRadiusBlockEndTight',
            'smallBorderRadiusInlineStartBase',
            'smallPaddingInlineStartExtraLoose',
            'smallPaddingInlineEndExtraLoose',
            'smallPaddingBlockStartExtraLoose',
            'smallPaddingBlockEndExtraLoose',
            'smallSpacingThight',
          ],
        ],
      ]);
    });
  });
});
