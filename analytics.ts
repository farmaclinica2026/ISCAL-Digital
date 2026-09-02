/**
 * Utilitário de telemetria anônima para a funcionalidade de Antibioticoprofilaxia.
 * Coleta exclusivamente identificadores anônimos (sem qualquer dado pessoal ou do paciente).
 */

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyjuoAbaJiVLqvx5wDlnJwKMWa6plTfOX86HhaHtOTsLzJccCBbNsmffZvsUJwEq08cFA/exec';

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getOrCreateAnonymousId(): string {
  try {
    let anonymousId = localStorage.getItem('iscal_anonymous_id');
    if (!anonymousId) {
      anonymousId = generateUUID();
      localStorage.setItem('iscal_anonymous_id', anonymousId);
    }
    return anonymousId;
  } catch {
    return generateUUID();
  }
}

function getOrCreateSessionId(): string {
  try {
    let sessionId = sessionStorage.getItem('iscal_session_id');
    if (!sessionId) {
      sessionId = generateUUID();
      sessionStorage.setItem('iscal_session_id', sessionId);
    }
    return sessionId;
  } catch {
    return generateUUID();
  }
}

/**
 * Registra o acesso especificamente à funcionalidade de Antibioticoprofilaxia.
 * Não coleta nenhum dado pessoal e não bloqueia a aplicação caso falhe.
 */
export function registrarAcessoAntibioticoprofilaxia(): void {
  try {
    const anonymous_id = getOrCreateAnonymousId();
    const session_id = getOrCreateSessionId();

    const params = new URLSearchParams();
    params.append('anonymous_id', anonymous_id);
    params.append('session_id', session_id);

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      body: params,
    }).catch(() => {
      // Falha silenciosa para não interferir na experiência do usuário
    });
  } catch {
    // Falha silenciosa para não interromper a navegação
  }
}
