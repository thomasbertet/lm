/* eslint-env jest */

/**
 * @jest-environment jsdom
 */
import React from 'react';
import 'jest-dom/extend-expect'; // .toBeVisible & more.

import { render, cleanup } from '@testing-library/react';

import Notifications from '../Notifications';

describe('Highlights', () => {
    afterEach(cleanup);

    it('should render notifications when having data', () => {
        const { getByText } = render(
            <Notifications
                notifications={[
                    {
                        type: 'high-load',
                        average: 1.7,
                        time: new Date().getTime(),
                    },
                ]}
            />
        );

        const notif = getByText('High load generated an alert - load = 1.70');

        expect(notif).toBeVisible();
    });

    it('should render two notifications when having data', () => {
        const { getByText } = render(
            <Notifications
                notifications={[
                    {
                        type: 'high-load',
                        average: 1.7,
                        time: new Date('2017-01-01 00:00:00'),
                    },
                    {
                        type: 'recover',
                        time: new Date('2017-01-02 00:00:00'),
                    },
                ]}
            />
        );

        const notifHighLoad = getByText(
            'High load generated an alert - load = 1.70'
        );
        const notifRecover = getByText('Recovered from high-load');
        const notifRecoverSince = getByText('since 02/01/2017 00:00');

        expect(notifHighLoad).toBeVisible();
        expect(notifRecover).toBeVisible();
        expect(notifRecoverSince).toBeVisible();
    });
});
