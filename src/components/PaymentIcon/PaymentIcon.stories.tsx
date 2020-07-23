import React from 'react';
import {PaymentIconProps} from 'components';

import {PaymentIcon, Props} from './PaymentIcon';

const meta = {
  component: PaymentIcon,
  title: 'PaymentIcon',
  decorators: [
    (story: () => JSX.Element) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {story()}
      </div>
    ),
  ],
};

export default meta;

const defaultProps: Props = {
  paymentBrand: 'visa',
};

export const defaultState = () => <PaymentIcon {...defaultProps} />;

export const disabled = () => <PaymentIcon {...defaultProps} disabled />;

export const active = () => <PaymentIcon {...defaultProps} active />;

export const unknownBrand = () => <PaymentIcon paymentBrand="Unknown brand" />;

export const allBrands = () => (
  <>
    <WrappedPaymentIcon paymentBrand="visa" />
    <WrappedPaymentIcon paymentBrand="mastercard" />
    <WrappedPaymentIcon paymentBrand="amex" />
    <WrappedPaymentIcon paymentBrand="afterpay" />
    <WrappedPaymentIcon paymentBrand="airtel_money" />
    <WrappedPaymentIcon paymentBrand="alipay" />
    <WrappedPaymentIcon paymentBrand="amazon" />
    <WrappedPaymentIcon paymentBrand="ambank" />
    <WrappedPaymentIcon paymentBrand="american_express" />
    <WrappedPaymentIcon paymentBrand="amex" />
    <WrappedPaymentIcon paymentBrand="apple_pay" />
    <WrappedPaymentIcon paymentBrand="arvato" />
    <WrappedPaymentIcon paymentBrand="atmbersama" />
    <WrappedPaymentIcon paymentBrand="bancnet" />
    <WrappedPaymentIcon paymentBrand="bancontact" />
    <WrappedPaymentIcon paymentBrand="bitcoin" />
    <WrappedPaymentIcon paymentBrand="bitcoin_cash" />
    <WrappedPaymentIcon paymentBrand="bogus" />
    <WrappedPaymentIcon paymentBrand="boleto" />
    <WrappedPaymentIcon paymentBrand="cash" />
    <WrappedPaymentIcon paymentBrand="cimb" />
    <WrappedPaymentIcon paymentBrand="circlek" />
    <WrappedPaymentIcon paymentBrand="citadele" />
    <WrappedPaymentIcon paymentBrand="clearpay" />
    <WrappedPaymentIcon paymentBrand="collector_bank" />
    <WrappedPaymentIcon paymentBrand="dai" />
    <WrappedPaymentIcon paymentBrand="dailyyamazaki" />
    <WrappedPaymentIcon paymentBrand="dankort" />
    <WrappedPaymentIcon paymentBrand="danske_bank" />
    <WrappedPaymentIcon paymentBrand="dash" />
    <WrappedPaymentIcon paymentBrand="diners_club" />
    <WrappedPaymentIcon paymentBrand="discover" />
    <WrappedPaymentIcon paymentBrand="dnb" />
    <WrappedPaymentIcon paymentBrand="dogecoin" />
    <WrappedPaymentIcon paymentBrand="dwolla" />
    <WrappedPaymentIcon paymentBrand="ebucks" />
    <WrappedPaymentIcon paymentBrand="eft_secure" />
    <WrappedPaymentIcon paymentBrand="eghl" />
    <WrappedPaymentIcon paymentBrand="elo" />
    <WrappedPaymentIcon paymentBrand="elv" />
    <WrappedPaymentIcon paymentBrand="enets" />
    <WrappedPaymentIcon paymentBrand="eos" />
    <WrappedPaymentIcon paymentBrand="epayments" />
    <WrappedPaymentIcon paymentBrand="eps" />
    <WrappedPaymentIcon paymentBrand="esr_paymentslip_switzerland" />
    <WrappedPaymentIcon paymentBrand="ethereum" />
    <WrappedPaymentIcon paymentBrand="familymart" />
    <WrappedPaymentIcon paymentBrand="forbrugsforeningen" />
    <WrappedPaymentIcon paymentBrand="fpx" />
    <WrappedPaymentIcon paymentBrand="freecharge" />
    <WrappedPaymentIcon paymentBrand="generic" />
    <WrappedPaymentIcon paymentBrand="gift-card" />
    <WrappedPaymentIcon paymentBrand="giropay" />
    <WrappedPaymentIcon paymentBrand="google_pay" />
    <WrappedPaymentIcon paymentBrand="google_wallet" />
    <WrappedPaymentIcon paymentBrand="grabpay" />
    <WrappedPaymentIcon paymentBrand="hongleongbank" />
    <WrappedPaymentIcon paymentBrand="hyper" />
    <WrappedPaymentIcon paymentBrand="hypercard" />
    <WrappedPaymentIcon paymentBrand="ideal" />
    <WrappedPaymentIcon paymentBrand="in3" />
    <WrappedPaymentIcon paymentBrand="interac" />
    <WrappedPaymentIcon paymentBrand="jcb" />
    <WrappedPaymentIcon paymentBrand="jousto" />
    <WrappedPaymentIcon paymentBrand="klarna-pay-later" />
    <WrappedPaymentIcon paymentBrand="klarna-pay-now" />
    <WrappedPaymentIcon paymentBrand="klarna-slice-it" />
    <WrappedPaymentIcon paymentBrand="klarna" />
    <WrappedPaymentIcon paymentBrand="krediidipank" />
    <WrappedPaymentIcon paymentBrand="krungsri" />
    <WrappedPaymentIcon paymentBrand="laser" />
    <WrappedPaymentIcon paymentBrand="lawson" />
    <WrappedPaymentIcon paymentBrand="laybuy" />
    <WrappedPaymentIcon paymentBrand="lhv" />
    <WrappedPaymentIcon paymentBrand="litecoin" />
    <WrappedPaymentIcon paymentBrand="maestro" />
    <WrappedPaymentIcon paymentBrand="mash" />
    <WrappedPaymentIcon paymentBrand="master" />
    <WrappedPaymentIcon paymentBrand="mastercard" />
    <WrappedPaymentIcon paymentBrand="masterpass" />
    <WrappedPaymentIcon paymentBrand="maybank" />
    <WrappedPaymentIcon paymentBrand="ministop" />
    <WrappedPaymentIcon paymentBrand="mobicred" />
    <WrappedPaymentIcon paymentBrand="mobikwik" />
    <WrappedPaymentIcon paymentBrand="mobilepay" />
    <WrappedPaymentIcon paymentBrand="mondido" />
    <WrappedPaymentIcon paymentBrand="monero" />
    <WrappedPaymentIcon paymentBrand="mpesa" />
    <WrappedPaymentIcon paymentBrand="netbanking" />
    <WrappedPaymentIcon paymentBrand="nordea" />
    <WrappedPaymentIcon paymentBrand="ola_money" />
    <WrappedPaymentIcon paymentBrand="op" />
    <WrappedPaymentIcon paymentBrand="ovo" />
    <WrappedPaymentIcon paymentBrand="ozow" />
    <WrappedPaymentIcon paymentBrand="pagoefectivo" />
    <WrappedPaymentIcon paymentBrand="payd" />
    <WrappedPaymentIcon paymentBrand="payfast_instant_eft" />
    <WrappedPaymentIcon paymentBrand="paymark_online_eftpos" />
    <WrappedPaymentIcon paymentBrand="paypal" />
    <WrappedPaymentIcon paymentBrand="paysafecard" />
    <WrappedPaymentIcon paymentBrand="paysera" />
    <WrappedPaymentIcon paymentBrand="paytm" />
    <WrappedPaymentIcon paymentBrand="payzapp" />
    <WrappedPaymentIcon paymentBrand="pivo" />
    <WrappedPaymentIcon paymentBrand="prepaysolutions" />
    <WrappedPaymentIcon paymentBrand="przelew24" />
    <WrappedPaymentIcon paymentBrand="publicbank" />
    <WrappedPaymentIcon paymentBrand="rhbbank" />
    <WrappedPaymentIcon paymentBrand="rupay" />
    <WrappedPaymentIcon paymentBrand="santander" />
    <WrappedPaymentIcon paymentBrand="seb" />
    <WrappedPaymentIcon paymentBrand="seveneleven" />
    <WrappedPaymentIcon paymentBrand="sezzle" />
    <WrappedPaymentIcon paymentBrand="shopify_pay" />
    <WrappedPaymentIcon paymentBrand="siamcommercial" />
    <WrappedPaymentIcon paymentBrand="sofort" />
    <WrappedPaymentIcon paymentBrand="spraypay" />
    <WrappedPaymentIcon paymentBrand="sunkus" />
    <WrappedPaymentIcon paymentBrand="swedbank" />
    <WrappedPaymentIcon paymentBrand="swish" />
    <WrappedPaymentIcon paymentBrand="trustly" />
    <WrappedPaymentIcon paymentBrand="twint" />
    <WrappedPaymentIcon paymentBrand="unionpay" />
    <WrappedPaymentIcon paymentBrand="unipay" />
    <WrappedPaymentIcon paymentBrand="uob" />
    <WrappedPaymentIcon paymentBrand="usdc" />
    <WrappedPaymentIcon paymentBrand="v_pay" />
    <WrappedPaymentIcon paymentBrand="venmo" />
    <WrappedPaymentIcon paymentBrand="viabill" />
    <WrappedPaymentIcon paymentBrand="vipps" />
    <WrappedPaymentIcon paymentBrand="visa" />
    <WrappedPaymentIcon paymentBrand="visaelectron" />
    <WrappedPaymentIcon paymentBrand="wechatpay" />
  </>
);

const WrappedPaymentIcon = (props: PaymentIconProps) => (
  <div style={{padding: 5}}>
    <PaymentIcon {...props} />
  </div>
);
