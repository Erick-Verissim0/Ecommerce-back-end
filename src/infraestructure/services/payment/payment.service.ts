import axios from 'axios';
import { config } from 'src/infraestructure/config/environment/enviroment.confg';

/*
  Esse service funciona da seguinte maneira:

  O metodo createOrderPayment será chamado ao criar um pedido para aquele cliente, nesse ponto, será adicionado um dado na tabela "orders" com o status "Received".

  Quando o usuario for criar um dado na tabela orders_items, ele vai chamar o metodo capturePayment, que vai retornar se o pedido foi pago ou não, se foi pago, então o status do pedido vai para "In Preparation" e o dado será criado na tabela orders_items
*/

interface PaypalOrderStatusResponse {
  id: string;
  status: string;
}

export class PaymentService {
  private paypalTokenUrl: string;
  private createOrderUrl: string;

  private clientId: string;
  private clientSecret: string;

  constructor() {
    this.initializeConfig();
  }

  private async initializeConfig() {
    const configuration = await config();
    this.paypalTokenUrl = configuration.getPaypalTokenUrl;
    this.createOrderUrl = configuration.createPaypalOrderUrl;
    this.clientId = configuration.paypalClientId;
    this.clientSecret = configuration.paypalClientSecret;
  }

  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
      'base64',
    );
    const response = await axios.post<any>(
      this.paypalTokenUrl,
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data.access_token;
  }

  public async createOrderPayment(
    amount: string,
    description: string,
  ): Promise<string> {
    const accessToken = await this.getAccessToken();
    const orderUrl = this.createOrderUrl;

    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount,
          },
          description,
        },
      ],
      application_context: {
        return_url: 'https://www.yourwebsite.com/return',
        cancel_url: 'https://www.yourwebsite.com/cancel',
      },
    };

    try {
      const response = await axios.post<any>(orderUrl, orderData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      return (
        response.data.links.find((link: any) => link.rel === 'approve')?.href ||
        ''
      );
    } catch (error) {
      throw new Error(`Error in creating payment order: ${error.message}`);
    }
  }

  public async capturePayment(payment_id: string): Promise<boolean> {
    const accessToken = await this.getAccessToken();
    const captureUrl = `https://api.sandbox.paypal.com/v2/checkout/orders/${payment_id}/capture`;

    try {
      const response = await axios.post<PaypalOrderStatusResponse>(
        captureUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.status === 'COMPLETED') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(`Error capturing payment: ${error.message}`);
    }
  }
}
