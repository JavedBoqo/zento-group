declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_LOAD_TIMEOUT_MS = 10_000;

function waitForGrecaptcha(): Promise<NonNullable<Window["grecaptcha"]>> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("reCAPTCHA is only available in the browser."));
      return;
    }

    const startedAt = Date.now();

    const checkReady = () => {
      if (window.grecaptcha?.execute) {
        resolve(window.grecaptcha);
        return;
      }

      if (Date.now() - startedAt >= RECAPTCHA_LOAD_TIMEOUT_MS) {
        reject(new Error("reCAPTCHA failed to load. Please refresh and try again."));
        return;
      }

      window.setTimeout(checkReady, 100);
    };

    checkReady();
  });
}

/**
 * Executes reCAPTCHA v3 and returns a token for server-side verification.
 */
export async function getRecaptchaToken(action: string): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    throw new Error("reCAPTCHA site key is not configured.");
  }

  const grecaptcha = await waitForGrecaptcha();

  return new Promise((resolve, reject) => {
    grecaptcha.ready(() => {
      grecaptcha
        .execute(siteKey, { action })
        .then(resolve)
        .catch(reject);
    });
  });
}
