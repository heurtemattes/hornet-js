/**
 * Interface de configuration de la gestion des timeout session côté client
 */
export interface ClientSessionTimeout {
  /** inclusion / exclusion de la gestion du timeout client */
  isInSessionTimeout?: boolean;

  /** durée de vie de la session en millisecondes */
  sessionTimeout?: number;

  /** interval de déclenchement du timeout de session en millisecondes */
  notifSessionTimeout?: number;

  /** interval des répétitions après le déclenchement du timeout */
  notifSessionTimeoutRepeat?: number;
};