// transforms a provided input string into a valid url, e.g. "example.com" -> "https://example.com"
export function transformIntoURL(s: string) {
	if (s && !s.startsWith("http"))
		return `https://${s}`;
	return s;
}
