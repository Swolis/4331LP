import React from 'react';
import PointOfSale from './PointOfSale';
import { ModeProvider } from './ModeContext';
import { OrderProvider } from './OrderContext';

const WebcClient = () => {

    return (
        <ModeProvider>
          <OrderProvider>
            <PointOfSale />
          </OrderProvider>
        </ModeProvider>
      );
};

export default WebcClient;