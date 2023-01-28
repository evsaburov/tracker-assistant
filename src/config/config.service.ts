import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';

export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor() {
		const { error, parsed } = config();
		if (error) throw new Error('Не найден .env');
		if (!parsed) throw new Error('Пустой файл .env');
		this.config = parsed;
	}
	get<T extends string | number>(key: string): T {
		const res = this.config[key];
		if (!res) throw new Error('Нет такого ключа .env');
		return this.config[key] as T;
	}
}
