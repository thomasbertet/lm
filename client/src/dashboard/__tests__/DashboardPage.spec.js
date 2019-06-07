/* eslint-env jest */

/**
 * @jest-environment jsdom
 */
import React from 'react';
import 'jest-dom/extend-expect'; // .toBeVisible & more.

import { render, cleanup } from '@testing-library/react';

import DashboardPage from '../DashboardPage';

describe('DashboardPage', () => {
    afterEach(cleanup);

    it('should render a loader when no data', () => {
        const { getAllByText, getByTestId } = render(<DashboardPage />);

        const loader = getByTestId('loader');
        const noData = getAllByText('Waiting for data');

        expect(loader).toBeVisible();
        expect(noData).toHaveLength(2);
    });
});
