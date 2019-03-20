import { PaymentDirector, PaymentAdapter, PaymentError } from 'meteor/unchained:core-payment';

class Datatrans extends PaymentAdapter {
  static key = 'ch.datatrans';

  static label = 'Datatrans';

  static version = '1.0';

  static initialConfiguration = [
    {
      key: 'publishableAPIKey',
      value: null,
    },
  ];

  static typeSupported(type) {
    return type === 'CARD';
  }

  getPublishableApiKey() {
    return this.config.reduce((current, item) => {
      if (item.key === 'publishableAPIKey') return item.value;
      return current;
    }, null);
  }

  configurationError() {
    // eslint-disable-line
    /* if (!this.getPublishableApiKey() || !this.getSecretkey()) {
      return PaymentError.INCOMPLETE_CONFIGURATION;
    }
    if (this.wrongCredentials) {
      return PaymentError.WRONG_CREDENTIALS;
    }
    */
    return null;
  }

  isActive() {
    // eslint-disable-line
    if (this.configurationError() === null) return true;
    return false;
  }

  isPayLaterAllowed() {
    // eslint-disable-line
    return false;
  }

  async charge({ stripeToken, stripeCustomerId } = {}) {


    
  }
}

PaymentDirector.registerAdapter(Datatrans);


