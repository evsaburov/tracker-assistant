import { IDeliverService } from './deliver.service.interface';

export class DeliverLivejournalService implements IDeliverService {
	start: () => Promise<void>;
}
