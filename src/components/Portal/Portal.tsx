import React, {useState, useEffect} from 'react';
import {createPortal} from 'react-dom';

import {createIdCreator, useId} from '../../utilities/id';

import styles from './Portal.css';

export interface Props {
  children?: React.ReactNode;
}

const PORTAL_HOST_ID = 'PortalHost';
const createId = createIdCreator('Portal');

export function PortalHost() {
  return <div id={PORTAL_HOST_ID} />;
}

export function Portal({children}: Props) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const id = useId(undefined, createId);

  useEffect(() => {
    const portal = document.getElementById(PORTAL_HOST_ID) ?? document.body;
    const node = document.createElement('div');
    node.setAttribute('id', id);
    node.setAttribute('class', styles.Portal);

    portal.appendChild(node);
    setNode(node);

    return () => {
      portal.removeChild(node);
    };
  }, [id]);

  return node && createPortal(children, node);
}
