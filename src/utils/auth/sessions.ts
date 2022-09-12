import { v4 as uuid } from 'uuid';
import * as bcrypt from "bcrypt";

type Session = {
	// bcrypt hash of the sessionId
	hash: string;
	// expiry timestamp in seconds
	expires: number;
};

let sessions: Session[] = [];

export async function createSession(maxAge: number) : Promise<string> {
	// create session UUID
	const sessionId = uuid();

	// add hash of UUID to session list
	sessions.push({
		hash: await bcrypt.hash(sessionId, 10),
		expires: (Date.now() / 1000) + maxAge,
	});

	return sessionId;
}

export async function removeSession(sessionId: string) : Promise<void> {
	sessions = (
		await Promise.all(sessions.map(async s => {
			// remove any session matching the sessionId
			if (await bcrypt.compare(sessionId, s.hash))
				return null;
			else return s;
		}))

		// remove nulls from mapped array
	).filter((s): s is Session => !!s);
}

export function createSessionCookie(sessionId: string, maxAge: number) : string {
	// set attributes of the session cookie
	return `session=${sessionId}; Max-Age=${maxAge}; Path=/; Secure; HttpOnly; SameSite=Strict`;
}

export async function checkSession(sessionId: string) : Promise<boolean> {
	// remove any expired sessions
	const now = Date.now() / 1000;
	sessions = sessions.filter(s => s.expires > now);

	// check if the sessionId still exists in sessions
	for (const session of sessions) {
		if (await bcrypt.compare(sessionId, session.hash))
			return true;
	}

	return false;
}
