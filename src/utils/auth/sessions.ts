import { v4 as uuid } from 'uuid';
import * as bcrypt from "bcrypt";

const sessions = new Set<string>();

export async function createSession() : Promise<string> {
	// create session UUID
	const sessionId = uuid();

	// add hash of UUID to session list
	sessions.add(
		await bcrypt.hash(sessionId, 10)
	);

	return sessionId;
}

export async function checkSession(sessionId: string) : Promise<boolean> {
	for (const sessionHash of sessions) {
		if (await bcrypt.compare(sessionId, sessionHash))
			return true;
	}

	return false;
}
