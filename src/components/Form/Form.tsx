import React, {useMemo} from 'react';
import type {PropsWithChildren, ReactNode, FormEventHandler} from 'react';
import {FormProps} from '@shopify/argo-checkout';

import {View} from '../View';
import {createIdCreator, useId} from '../../utilities/id';
import {FormContext, useContainingForm} from '../../utilities/forms';
import type {FormDetails} from '../../utilities/forms';
import {Portal} from '../Portal';
import {useTranslate} from '../AppContext';

import styles from './Form.css';

const createId = createIdCreator('Form');

export function Form({
  onSubmit,
  children,
  implicitSubmit = true,
  disabled = false,
  id,
}: PropsWithChildren<FormProps>) {
  const translate = useTranslate();
  const generatedId = useId(undefined, createId);
  const formId = id ?? generatedId;
  const nested = useContainingForm() != null;
  const formDetails = useMemo<FormDetails>(() => ({id: formId, nested}), [
    formId,
    nested,
  ]);
  let implicitSubmitContent: ReactNode = null;

  if (implicitSubmit) {
    implicitSubmitContent = (
      <View visibility="hidden">
        <ImplicitSubmitter disabled={disabled} form={formDetails}>
          {typeof implicitSubmit === 'string'
            ? implicitSubmit
            : translate('submit')}
        </ImplicitSubmitter>
      </View>
    );
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (disabled) return;

    onSubmit();
  };

  return nested ? (
    <>
      <FormContext.Provider value={formDetails}>
        {children}
        {implicitSubmitContent}
      </FormContext.Provider>
      <Portal>
        <form
          action=""
          method="POST"
          noValidate
          className={styles.Form}
          id={formId}
          onSubmit={handleSubmit}
        />
      </Portal>
    </>
  ) : (
    <form
      action=""
      method="POST"
      noValidate
      className={styles.Form}
      id={formId}
      onSubmit={handleSubmit}
    >
      <FormContext.Provider value={formDetails}>
        {children}
        {implicitSubmitContent}
      </FormContext.Provider>
    </form>
  );
}

function ImplicitSubmitter({
  form,
  children,
  disabled,
}: PropsWithChildren<{form: FormDetails; disabled: boolean}>) {
  return (
    <button
      type="submit"
      disabled={disabled}
      tabIndex={-1}
      aria-hidden
      form={form.nested ? form.id : undefined}
    >
      {children}
    </button>
  );
}
