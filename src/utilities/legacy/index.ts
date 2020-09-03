import styles from './styles.css';

// will be used to inject the equivalent of Core’s:
// $color--default-button
// background('btn')
//
// Usages in core not implemented yet:
// .btn:hover/:focus (for outline)
// .sp-modal-toggle__phone-wrapper::after
export const button = styles.Button;

export const colorCanvas = styles['Surface-colorCanvas'];

// will be used to inject the equivalent of Core’s:
// $color--page
// get-background-color('main')
// background('main')
// get-solid-background-color(x) (as a fallback for alpha colors)
//
// Usages in core not implemented yet:
// .skip-to-content
// .page-error
// .page-unsubscribe__content
// .full-page-overlay
export const colorSurfacePrimary = styles['Surface-colorSurfacePrimary'];

// will be used to inject the equivalent of Core’s:
// $color--sidebar
// get-background-color('sidebar')
// background('sidebar')
// same-palette('sidebar', x)
//
// Usages in core not implemented yet:
// .order-summary__scroll-indicator
export const colorSurfaceSecondary = styles['Surface-colorSurfaceSecondary'];
export const colorSurfaceTertiary = styles['Surface-colorSurfaceTertiary'];
export const colorSurfaceQuaternary = styles['Surface-colorSurfaceQuaternary'];

export const utilityDefaultBorderColor = styles['Utility-defaultBorderColor'];
export const utilityDefaultTextColorSubdued =
  styles['Utility-defaultTextSubduedColor'];
export const utilityDefaultTextColorEmphasized =
  styles['Utility-defaultTextEmphasizedColor'];
