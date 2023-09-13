export interface AlertOptions {
  status?: 'success' | 'info' | 'error' | 'warning';
  autoClose?: boolean;
  duration?: number;
  showConfirmButton?: boolean;
  title?: string;
  text?: string;
}
