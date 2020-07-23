import React from 'react';
import faker from 'faker';

import {mountWithContext} from '../../test-utilities';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {Link} from '../Link';
import {createTheme} from '../Theme';

import {Breadcrumbs, Props, Marker} from './Breadcrumbs';

describe('<Breadcrumbs />', () => {
  it('does not render a separator after the final breadcrumb', () => {
    const baseBreadcrumbs: Props['breadcrumbs'] = [
      {
        id: faker.random.uuid(),
        to: faker.internet.url(),
        content: faker.random.word(),
      },
      {
        id: faker.random.uuid(),
        to: faker.internet.url(),
        content: faker.random.word(),
      },
    ];

    const breadcrumbs = mountWithContext(
      <Breadcrumbs breadcrumbs={baseBreadcrumbs} />,
    );

    const [firstBreadcrumb, finalBreadcrumb] = breadcrumbs.findAll('li');

    expect(firstBreadcrumb).toContainReactComponent(Icon, {
      source: 'chevronRight',
    });

    expect(finalBreadcrumb).not.toContainReactComponent(Icon, {
      source: 'chevronRight',
    });
  });

  it('renders a Link for breadcrumbs that are neither active nor disabled', () => {
    const to = faker.internet.url();
    const content = faker.random.word();

    const withDefaultBreadcrumb: Props['breadcrumbs'] = [
      {
        id: faker.random.uuid(),
        to,
        content,
      },
    ];

    const breadcrumbs = mountWithContext(
      <Breadcrumbs breadcrumbs={withDefaultBreadcrumb} />,
    );

    const [defaultBreadcrumb] = breadcrumbs.findAll('li');

    expect(defaultBreadcrumb).toContainReactComponent(Link, {to});
    expect(defaultBreadcrumb).toContainReactText(content);
  });

  it('does not render a Link and sets the aria-current for active breadcrumb', () => {
    const id = faker.random.uuid();
    const content = faker.random.word();
    const withActiveBreadcrumb: Props['breadcrumbs'] = [
      {
        id,
        to: faker.internet.url(),
        content,
      },
    ];

    const wrapper = mountWithContext(
      <Breadcrumbs active={id} breadcrumbs={withActiveBreadcrumb} />,
    );

    const [activeBreadcrumb] = wrapper.findAll('li');

    expect(activeBreadcrumb).toContainReactComponent(Text, {
      children: [null, content],
      emphasized: true,
    });

    expect(activeBreadcrumb).toHaveReactProps({'aria-current': 'step'});
  });

  it('does not render Link if breadcrumb is disabled', () => {
    const content = faker.random.word();

    const withDisabledBreadcrumb: Props['breadcrumbs'] = [
      {
        id: faker.random.uuid(),
        to: faker.internet.url(),
        content,
        disabled: true,
      },
    ];

    const wrapper = mountWithContext(
      <Breadcrumbs breadcrumbs={withDisabledBreadcrumb} />,
    );

    const [disabledBreadcrumb] = wrapper.findAll('li');

    expect(disabledBreadcrumb).toContainReactComponent(Text, {
      children: [null, content],
    });
  });

  it('emphasizes active breadcrumbs', () => {
    const content = faker.random.word();
    const activeId = faker.random.uuid();

    const withActiveBreadcrumb: Props['breadcrumbs'] = [
      {
        id: activeId,
        to: faker.internet.url(),
        content,
      },
    ];

    const wrapper = mountWithContext(
      <Breadcrumbs active={activeId} breadcrumbs={withActiveBreadcrumb} />,
    );

    const [activeBreadcrumb] = wrapper.findAll('li');

    expect(activeBreadcrumb).toContainReactComponent(Text, {
      emphasized: true,
      children: [null, content],
    });
  });

  it('subdues disabled breadcrumbs', () => {
    const content = faker.random.word();

    const withDisabledBreadcrumb: Props['breadcrumbs'] = [
      {
        id: faker.random.uuid(),
        to: faker.internet.url(),
        content,
        disabled: true,
      },
    ];

    const wrapper = mountWithContext(
      <Breadcrumbs breadcrumbs={withDisabledBreadcrumb} />,
    );

    const [disabledBreadcrumb] = wrapper.findAll('li');

    expect(disabledBreadcrumb).toContainReactComponent(Text, {
      subdued: true,
      children: [null, content],
    });
  });

  it('numberStyle theme renders a marker', () => {
    const content = faker.random.word();

    const breadcrumbs: Props['breadcrumbs'] = [
      {
        id: faker.random.uuid(),
        to: faker.internet.url(),
        content,
      },
      {
        id: faker.random.uuid(),
        to: faker.internet.url(),
        content,
      },
    ];

    const wrapper = mountWithContext(
      <Breadcrumbs breadcrumbs={breadcrumbs} />,
      {theme: createTheme({buyerJourney: {numberStyle: 'decimalLeadingZero'}})},
    );

    wrapper.findAll('li').forEach((breadcrumb, index) => {
      expect(breadcrumb).toContainReactComponent(Marker, {
        children: `0${index + 1}`,
      });
    });
  });
});
