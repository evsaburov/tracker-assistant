import { IDeliverService } from './deliver.service.interface';

export class DeliverTrackService implements IDeliverService {
	start: () => Promise<void>;
}
