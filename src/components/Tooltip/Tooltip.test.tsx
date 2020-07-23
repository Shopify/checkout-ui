import React, {HTMLProps} from 'react';
import {mount} from '@quilted/react-testing/dom';

import {mountWithContext} from '../../test-utilities';

import {
  Tooltip,
  Arrow,
  RETURN_KEY_CODE,
  SPACE_KEY_CODE,
  ESCAPE_KEY_CODE,
} from './Tooltip';

jest.useFakeTimers();

const children = 'This is a tooltip';
const defaultProps = {
  content: 'In case we need to contact you about your order',
};

describe('<Tooltip />', () => {
  it('renders the children within a button', () => {
    const tooltip = mount(<Tooltip {...defaultProps}>{children}</Tooltip>);
    expect(tooltip).toContainReactComponent('button', {children});
  });

  it('renders the tooltip content when the control is focused', () => {
    const tooltip = mountWithContext(
      <Tooltip {...defaultProps}>{children}</Tooltip>,
    );
    tooltip.find('button')?.trigger('onFocus');
    expect(tooltip).toContainReactComponent('p', {
      children: expect.arrayContaining([defaultProps.content]),
    });
  });

  it('renders the tooltip arrow when the control is focused', () => {
    const tooltip = mountWithContext(
      <Tooltip {...defaultProps}>{children}</Tooltip>,
    );
    tooltip.find('button')?.trigger('onFocus');
    expect(tooltip).toContainReactComponent(Arrow);
  });

  it('does not render the tooltip content when the control is blurred', () => {
    const tooltip = mount(<Tooltip {...defaultProps}>{children}</Tooltip>);
    tooltip.find('button')?.trigger('onBlur');
    expect(tooltip).not.toContainReactComponent('p', {
      children: expect.arrayContaining([defaultProps.content]),
    });
  });

  it('renders the tooltip content when the control is hovered', () => {
    const tooltip = mount(<Tooltip {...defaultProps}>{children}</Tooltip>);
    tooltip.find('button')?.trigger('onMouseEnter');
    expect(tooltip).toContainReactComponent('p', {
      children: expect.arrayContaining([defaultProps.content]),
    });
  });

  it('does not render the tooltip content when the control loses hover', () => {
    const tooltip = mount(<Tooltip {...defaultProps}>{children}</Tooltip>);
    tooltip.find('button')?.trigger('onMouseLeave');
    expect(tooltip).not.toContainReactComponent('p', {
      children: expect.arrayContaining([defaultProps.content]),
    });
  });

  it('toggles rendering the tooltip content when the control is clicked', () => {
    const tooltip = mount(<Tooltip {...defaultProps}>{children}</Tooltip>);
    const fakeEvent = {
      preventDefault: jest.fn(),
    };
    tooltip.find('button')?.trigger('onClick', fakeEvent);
    expect(tooltip).toContainReactComponent('p', {
      children: expect.arrayContaining([defaultProps.content]),
    });

    tooltip.find('button')?.trigger('onClick', fakeEvent);
    tooltip.act(() => {
      jest.runAllTimers();
    });
    expect(tooltip).not.toContainReactComponent('p', {
      children: expect.arrayContaining([defaultProps.content]),
    });
  });

  it('toggles rendering the tooltip content when RETURN is pressed on the control', () => {
    const tooltip = mount(<Tooltip {...defaultProps}>{children}</Tooltip>);
    const fakeEvent = {
      preventDefault: jest.fn(),
      keyCode: RETURN_KEY_CODE,
    };
    tooltip.find('button')?.trigger('onKeyDown', fakeEvent);
    expect(tooltip).toContainReactComponent('p', {
      children: expect.arrayContaining([defaultProps.content]),
    });

    tooltip.find('button')?.trigger('onKeyDown', fakeEvent);
    tooltip.act(() => {
      jest.runAllTimers();
    });
    expect(tooltip).not.toContainReactComponent('p', {
      children: expect.arrayContaining([defaultProps.content]),
    });
  });

  it('toggles rendering the tooltip content when SPACE is pressed on the control', () => {
    const tooltip = mount(<Tooltip {...defaultProps}>{children}</Tooltip>);
    const fakeEvent = {
      preventDefault: jest.fn(),
      keyCode: SPACE_KEY_CODE,
    };
    tooltip.find('button')?.trigger('onKeyDown', fakeEvent);
    expect(tooltip).toContainReactComponent('p', {
      children: expect.arrayContaining([defaultProps.content]),
    });

    tooltip.find('button')?.trigger('onKeyDown', fakeEvent);
    tooltip.act(() => {
      jest.runAllTimers();
    });
    expect(tooltip).not.toContainReactComponent('p', {
      children: expect.arrayContaining([defaultProps.content]),
    });
  });

  it('does not render the tooltip content when ESC is pressed on the control', () => {
    const tooltip = mount(<Tooltip {...defaultProps}>{children}</Tooltip>);
    const fakeEvent = {
      preventDefault: jest.fn(),
      keyCode: ESCAPE_KEY_CODE,
    };
    tooltip.find('button')?.trigger('onKeyDown', fakeEvent);
    expect(tooltip).not.toContainReactComponent('p', {
      children: expect.arrayContaining([defaultProps.content]),
    });
  });

  it('does not render the tooltip content when a key other than SPACE or RETURN is pressed on the control', () => {
    const tooltip = mount(<Tooltip {...defaultProps}>{children}</Tooltip>);
    const fakeEvent = {
      preventDefault: jest.fn(),
      keyCode: 10,
    };
    tooltip.find('button')?.trigger('onKeyDown', fakeEvent);
    expect(tooltip).not.toContainReactComponent('p', {
      children: expect.arrayContaining([defaultProps.content]),
    });
  });

  it('renders a control button and tooltip with the required aria attributes when the tooltip is active', () => {
    const tooltip = mount(<Tooltip {...defaultProps}>{children}</Tooltip>);

    tooltip.find('button')?.trigger('onFocus');
    const tooltipControl = tooltip.find('button');
    const tooltipContent = tooltip.findWhere<HTMLProps<HTMLParagraphElement>>(
      (element) => {
        return element.type === 'p' && element.text === defaultProps.content;
      },
    );
    const tooltipContentId = (tooltipContent?.props as {id: string}).id;

    expect(tooltipContent).toHaveReactProps({role: 'tooltip'});
    expect(tooltipControl!).toHaveReactProps({
      'aria-pressed': true,
      'aria-controls': tooltipContentId,
      'aria-describedby': tooltipContentId,
    });
  });

  it('renders a control button with the required aria attributes when the tooltip is not active', () => {
    const tooltip = mount(<Tooltip {...defaultProps}>{children}</Tooltip>);

    expect(tooltip.find('button')).toHaveReactProps({
      'aria-pressed': false,
      'aria-controls': undefined,
      'aria-describedby': undefined,
    });
  });
});
