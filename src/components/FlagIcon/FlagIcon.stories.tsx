import React from 'react';

import {FlagIcon, Props} from './FlagIcon';

const meta = {
  component: FlagIcon,
  title: 'FlagIcon',
  decorators: [
    (story: () => JSX.Element) => (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {story()}
      </div>
    ),
  ],
};

export default meta;

const defaultProps: Props = {
  accessibilityLabel: 'Canada',
  countryCode: 'ca',
};

export const defaultState = () => <FlagIcon {...defaultProps} />;

export const allCountries = () => (
  <>
    <WrappedFlag countryCode="ad" />
    <WrappedFlag countryCode="ae" />
    <WrappedFlag countryCode="af" />
    <WrappedFlag countryCode="ag" />
    <WrappedFlag countryCode="ai" />
    <WrappedFlag countryCode="al" />
    <WrappedFlag countryCode="am" />
    <WrappedFlag countryCode="an" />
    <WrappedFlag countryCode="ao" />
    <WrappedFlag countryCode="aq" />
    <WrappedFlag countryCode="ar" />
    <WrappedFlag countryCode="as" />
    <WrappedFlag countryCode="at" />
    <WrappedFlag countryCode="au" />
    <WrappedFlag countryCode="aw" />
    <WrappedFlag countryCode="ax" />
    <WrappedFlag countryCode="az" />
    <WrappedFlag countryCode="ba" />
    <WrappedFlag countryCode="bb" />
    <WrappedFlag countryCode="bd" />
    <WrappedFlag countryCode="be" />
    <WrappedFlag countryCode="bf" />
    <WrappedFlag countryCode="bg" />
    <WrappedFlag countryCode="bh" />
    <WrappedFlag countryCode="bi" />
    <WrappedFlag countryCode="bj" />
    <WrappedFlag countryCode="bl" />
    <WrappedFlag countryCode="bm" />
    <WrappedFlag countryCode="bn" />
    <WrappedFlag countryCode="bo" />
    <WrappedFlag countryCode="bq" />
    <WrappedFlag countryCode="br" />
    <WrappedFlag countryCode="bs" />
    <WrappedFlag countryCode="bt" />
    <WrappedFlag countryCode="bv" />
    <WrappedFlag countryCode="bw" />
    <WrappedFlag countryCode="by" />
    <WrappedFlag countryCode="bz" />
    <WrappedFlag countryCode="ca" />
    <WrappedFlag countryCode="cc" />
    <WrappedFlag countryCode="cd" />
    <WrappedFlag countryCode="cf" />
    <WrappedFlag countryCode="cg" />
    <WrappedFlag countryCode="ch" />
    <WrappedFlag countryCode="ci" />
    <WrappedFlag countryCode="ck" />
    <WrappedFlag countryCode="cl" />
    <WrappedFlag countryCode="cm" />
    <WrappedFlag countryCode="cn" />
    <WrappedFlag countryCode="co" />
    <WrappedFlag countryCode="cr" />
    <WrappedFlag countryCode="cu" />
    <WrappedFlag countryCode="cv" />
    <WrappedFlag countryCode="cw" />
    <WrappedFlag countryCode="cx" />
    <WrappedFlag countryCode="cy" />
    <WrappedFlag countryCode="cz" />
    <WrappedFlag countryCode="de" />
    <WrappedFlag countryCode="dj" />
    <WrappedFlag countryCode="dk" />
    <WrappedFlag countryCode="dm" />
    <WrappedFlag countryCode="do" />
    <WrappedFlag countryCode="dz" />
    <WrappedFlag countryCode="ec" />
    <WrappedFlag countryCode="ee" />
    <WrappedFlag countryCode="eg" />
    <WrappedFlag countryCode="eh" />
    <WrappedFlag countryCode="er" />
    <WrappedFlag countryCode="es" />
    <WrappedFlag countryCode="et" />
    <WrappedFlag countryCode="eu" />
    <WrappedFlag countryCode="fi" />
    <WrappedFlag countryCode="fj" />
    <WrappedFlag countryCode="fk" />
    <WrappedFlag countryCode="fm" />
    <WrappedFlag countryCode="fo" />
    <WrappedFlag countryCode="fr" />
    <WrappedFlag countryCode="ga" />
    <WrappedFlag countryCode="gb" />
    <WrappedFlag countryCode="gd" />
    <WrappedFlag countryCode="ge" />
    <WrappedFlag countryCode="gf" />
    <WrappedFlag countryCode="gg" />
    <WrappedFlag countryCode="gh" />
    <WrappedFlag countryCode="gi" />
    <WrappedFlag countryCode="gl" />
    <WrappedFlag countryCode="gm" />
    <WrappedFlag countryCode="gn" />
    <WrappedFlag countryCode="gp" />
    <WrappedFlag countryCode="gq" />
    <WrappedFlag countryCode="gr" />
    <WrappedFlag countryCode="gs" />
    <WrappedFlag countryCode="gt" />
    <WrappedFlag countryCode="gu" />
    <WrappedFlag countryCode="gw" />
    <WrappedFlag countryCode="gy" />
    <WrappedFlag countryCode="hk" />
    <WrappedFlag countryCode="hm" />
    <WrappedFlag countryCode="hn" />
    <WrappedFlag countryCode="hr" />
    <WrappedFlag countryCode="ht" />
    <WrappedFlag countryCode="hu" />
    <WrappedFlag countryCode="ic" />
    <WrappedFlag countryCode="id" />
    <WrappedFlag countryCode="ie" />
    <WrappedFlag countryCode="il" />
    <WrappedFlag countryCode="im" />
    <WrappedFlag countryCode="in" />
    <WrappedFlag countryCode="io" />
    <WrappedFlag countryCode="iq" />
    <WrappedFlag countryCode="ir" />
    <WrappedFlag countryCode="is" />
    <WrappedFlag countryCode="it" />
    <WrappedFlag countryCode="je" />
    <WrappedFlag countryCode="jm" />
    <WrappedFlag countryCode="jo" />
    <WrappedFlag countryCode="jp" />
    <WrappedFlag countryCode="ke" />
    <WrappedFlag countryCode="kg" />
    <WrappedFlag countryCode="kh" />
    <WrappedFlag countryCode="ki" />
    <WrappedFlag countryCode="km" />
    <WrappedFlag countryCode="kn" />
    <WrappedFlag countryCode="kp" />
    <WrappedFlag countryCode="kr" />
    <WrappedFlag countryCode="kw" />
    <WrappedFlag countryCode="ky" />
    <WrappedFlag countryCode="kz" />
    <WrappedFlag countryCode="la" />
    <WrappedFlag countryCode="lb" />
    <WrappedFlag countryCode="lc" />
    <WrappedFlag countryCode="li" />
    <WrappedFlag countryCode="lk" />
    <WrappedFlag countryCode="lr" />
    <WrappedFlag countryCode="ls" />
    <WrappedFlag countryCode="lt" />
    <WrappedFlag countryCode="lu" />
    <WrappedFlag countryCode="lv" />
    <WrappedFlag countryCode="ly" />
    <WrappedFlag countryCode="ma" />
    <WrappedFlag countryCode="mc" />
    <WrappedFlag countryCode="md" />
    <WrappedFlag countryCode="me" />
    <WrappedFlag countryCode="mf" />
    <WrappedFlag countryCode="mg" />
    <WrappedFlag countryCode="mh" />
    <WrappedFlag countryCode="mk" />
    <WrappedFlag countryCode="ml" />
    <WrappedFlag countryCode="mm" />
    <WrappedFlag countryCode="mn" />
    <WrappedFlag countryCode="mo" />
    <WrappedFlag countryCode="mp" />
    <WrappedFlag countryCode="mq" />
    <WrappedFlag countryCode="mr" />
    <WrappedFlag countryCode="ms" />
    <WrappedFlag countryCode="mt" />
    <WrappedFlag countryCode="mu" />
    <WrappedFlag countryCode="mv" />
    <WrappedFlag countryCode="mw" />
    <WrappedFlag countryCode="mx" />
    <WrappedFlag countryCode="my" />
    <WrappedFlag countryCode="mz" />
    <WrappedFlag countryCode="na" />
    <WrappedFlag countryCode="nc" />
    <WrappedFlag countryCode="ne" />
    <WrappedFlag countryCode="nf" />
    <WrappedFlag countryCode="ng" />
    <WrappedFlag countryCode="ni" />
    <WrappedFlag countryCode="nl" />
    <WrappedFlag countryCode="no" />
    <WrappedFlag countryCode="np" />
    <WrappedFlag countryCode="nr" />
    <WrappedFlag countryCode="nu" />
    <WrappedFlag countryCode="nz" />
    <WrappedFlag countryCode="om" />
    <WrappedFlag countryCode="pa" />
    <WrappedFlag countryCode="pe" />
    <WrappedFlag countryCode="pf" />
    <WrappedFlag countryCode="pg" />
    <WrappedFlag countryCode="ph" />
    <WrappedFlag countryCode="pk" />
    <WrappedFlag countryCode="pl" />
    <WrappedFlag countryCode="pm" />
    <WrappedFlag countryCode="pn" />
    <WrappedFlag countryCode="pr" />
    <WrappedFlag countryCode="ps" />
    <WrappedFlag countryCode="pt" />
    <WrappedFlag countryCode="pw" />
    <WrappedFlag countryCode="py" />
    <WrappedFlag countryCode="qa" />
    <WrappedFlag countryCode="re" />
    <WrappedFlag countryCode="ro" />
    <WrappedFlag countryCode="rs" />
    <WrappedFlag countryCode="ru" />
    <WrappedFlag countryCode="rw" />
    <WrappedFlag countryCode="sa" />
    <WrappedFlag countryCode="sb" />
    <WrappedFlag countryCode="sc" />
    <WrappedFlag countryCode="sd" />
    <WrappedFlag countryCode="se" />
    <WrappedFlag countryCode="sg" />
    <WrappedFlag countryCode="sh" />
    <WrappedFlag countryCode="si" />
    <WrappedFlag countryCode="sj" />
    <WrappedFlag countryCode="sk" />
    <WrappedFlag countryCode="sl" />
    <WrappedFlag countryCode="sm" />
    <WrappedFlag countryCode="sn" />
    <WrappedFlag countryCode="so" />
    <WrappedFlag countryCode="sr" />
    <WrappedFlag countryCode="ss" />
    <WrappedFlag countryCode="st" />
    <WrappedFlag countryCode="sv" />
    <WrappedFlag countryCode="sx" />
    <WrappedFlag countryCode="sy" />
    <WrappedFlag countryCode="sz" />
    <WrappedFlag countryCode="tc" />
    <WrappedFlag countryCode="td" />
    <WrappedFlag countryCode="tf" />
    <WrappedFlag countryCode="tg" />
    <WrappedFlag countryCode="th" />
    <WrappedFlag countryCode="tj" />
    <WrappedFlag countryCode="tk" />
    <WrappedFlag countryCode="tl" />
    <WrappedFlag countryCode="tm" />
    <WrappedFlag countryCode="tn" />
    <WrappedFlag countryCode="to" />
    <WrappedFlag countryCode="tr" />
    <WrappedFlag countryCode="tt" />
    <WrappedFlag countryCode="tv" />
    <WrappedFlag countryCode="tw" />
    <WrappedFlag countryCode="tz" />
    <WrappedFlag countryCode="ua" />
    <WrappedFlag countryCode="ug" />
    <WrappedFlag countryCode="uk" />
    <WrappedFlag countryCode="um" />
    <WrappedFlag countryCode="un" />
    <WrappedFlag countryCode="us" />
    <WrappedFlag countryCode="uy" />
    <WrappedFlag countryCode="uz" />
    <WrappedFlag countryCode="va" />
    <WrappedFlag countryCode="vc" />
    <WrappedFlag countryCode="ve" />
    <WrappedFlag countryCode="vg" />
    <WrappedFlag countryCode="vi" />
    <WrappedFlag countryCode="vn" />
    <WrappedFlag countryCode="vu" />
    <WrappedFlag countryCode="wf" />
    <WrappedFlag countryCode="ws" />
    <WrappedFlag countryCode="xk" />
    <WrappedFlag countryCode="ye" />
    <WrappedFlag countryCode="yt" />
    <WrappedFlag countryCode="za" />
    <WrappedFlag countryCode="zm" />
    <WrappedFlag countryCode="zw" />
  </>
);

const WrappedFlag = (props: Props) => (
  <div style={{width: 40, padding: 5}}>
    <FlagIcon {...props} />
  </div>
);
