export interface IPetitionItem {
	id: number;
	status: string;
	title: string;
	signatures: number;
	documentId: string;
	startDate: string;
	closingDate: string;
	requester: string;
}