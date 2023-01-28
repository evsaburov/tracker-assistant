import { PrismaClient } from '@prisma/client';

export interface IPrisma {
	client: PrismaClient;
	connect: () => void;
	disconnect: () => void;
}
