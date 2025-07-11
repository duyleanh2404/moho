export const loginErrorMessages: Record<
  string,
  string | { redirectTo: (email: string) => string }
> = {
  'Account not verified!': {
    redirectTo: (email: string) => `/verify-email?email=${encodeURIComponent(email)}`
  },
  'Invalid email or password!': 'Email hoặc mật khẩu không đúng!',
  'A verification code has been sent to your email!': {
    redirectTo: (email: string) => `/verify-email?email=${encodeURIComponent(email)}`
  }
};

export const otpErrorMessages: Record<string, string> = {
  'Invalid email or OTP!': 'Email hoặc mã OTP không đúng!',
  'OTP has expired!': 'Mã OTP đã hết hạn!'
};
