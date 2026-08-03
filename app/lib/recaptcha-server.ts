export interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

const RECAPTCHA_SCORE_THRESHOLD = 0.5;

export async function verifyRecaptchaToken(
  token: string
): Promise<{ valid: true } | { valid: false; error: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not configured.");
    return {
      valid: false,
      error: "Please try again.",
    };
  }

  if (!token) {
    return {
      valid: false,
      error: "Please try again.",
    };
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    if (!response.ok) {
      console.error("reCAPTCHA siteverify request failed:", response.status);
      return {
        valid: false,
        error: "Please try again.",
      };
    }

    const data = (await response.json()) as RecaptchaVerifyResponse;

    if (!data.success) {
      console.error("reCAPTCHA verification failed:", data["error-codes"]);
      return {
        valid: false,
        error: "Please try again.",
      };
    }

    if (typeof data.score !== "number" || data.score < RECAPTCHA_SCORE_THRESHOLD) {
      console.error("reCAPTCHA score below threshold:", data.score);
      return {
        valid: false,
        error: "Please try again.",
      };
    }

    return { valid: true };
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return {
      valid: false,
      error: "Please try again shortly.",
    };
  }
}
