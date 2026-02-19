export const typography = {
  display: {
    large: { fontSize: 57, lineHeight: 64, fontWeight: '700' as const },
    medium: { fontSize: 45, lineHeight: 52, fontWeight: '700' as const },
    small: { fontSize: 36, lineHeight: 44, fontWeight: '700' as const },
  },
  headline: {
    large: { fontSize: 32, lineHeight: 40, fontWeight: '700' as const },
    medium: { fontSize: 28, lineHeight: 36, fontWeight: '700' as const },
    small: { fontSize: 24, lineHeight: 32, fontWeight: '700' as const },
  },
  title: {
    large: { fontSize: 22, lineHeight: 28, fontWeight: '700' as const },
    medium: { fontSize: 18, lineHeight: 24, fontWeight: '600' as const },
    small: { fontSize: 16, lineHeight: 22, fontWeight: '600' as const },
  },
  body: {
    large: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
    medium: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
    small: { fontSize: 12, lineHeight: 18, fontWeight: '400' as const },
  },
  label: {
    large: { fontSize: 14, lineHeight: 20, fontWeight: '600' as const },
    medium: { fontSize: 12, lineHeight: 18, fontWeight: '600' as const },
    small: { fontSize: 11, lineHeight: 16, fontWeight: '600' as const },
  },
};

export type Typography = typeof typography;