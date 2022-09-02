import { v4 as uuid } from 'uuid';

const sessions = new Set<string>();

export function createSession() : string {
	const sessionId = uuid();
	sessions.add(sessionId);
	return sessionId;
}

export function checkSession(sessionId: string) : boolean {
	return sessions.has(sessionId);
}
