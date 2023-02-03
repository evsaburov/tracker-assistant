import { IDeliverService } from './deliver.service.interface';

export class DeliverNasaService implements IDeliverService {
	start: () => Promise<void>;
}
