const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateFields(data, rules) {
  for (const [field, rule] of Object.entries(rules)) {
    const label = rule.label || field;
    const value = data[field];

    if (rule.type === 'array') {
      if (rule.required && (!Array.isArray(value) || value.length === 0)) {
        return `${label} is required.`;
      }
      continue;
    }

    if (value === null || value === undefined || value === '') {
      if (rule.required) return `${label} is required.`;
      continue;
    }

    if (typeof value !== 'string') return `${label} must be text.`;

    const trimmed = value.trim();
    if (rule.required && !trimmed) return `${label} is required.`;
    if (rule.max && trimmed.length > rule.max) return `${label} must be ${rule.max} characters or fewer.`;
    if (rule.email && !EMAIL_RE.test(trimmed)) return 'Email must be a valid email address.';
  }

  return null;
}
