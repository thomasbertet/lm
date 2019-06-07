/* eslint-env jest */

/**
 * @jest-environment jsdom
 */
import React from 'react';
import 'jest-dom/extend-expect'; // .toBeVisible & more.

import { render, cleanup } from '@testing-library/react';

import Highlights from '../Highlights';

describe('Highlights', () => {
    afterEach(cleanup);

    it('should render highlights figures when having data', () => {
        const { getAllByText } = render(
            <Highlights
                data={[{ avg: 1.2, time: new Date().getTime() }]}
                notifications={[]}
            />
        );

        // Let's check the highlights are displayed.
        const numbers = getAllByText('1.2');

        numbers.forEach(number => expect(number).toBeVisible());
    });
});
