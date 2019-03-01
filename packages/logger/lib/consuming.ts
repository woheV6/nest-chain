import * as Moment from 'moment';

export class Consuming {
    private readonly now: Moment.Moment;
    constructor() {
        this.now = Moment();
    }

    public get consuming(): number {
        return Moment().diff(this.now);
    }

    public start(format?: string): string {
        return this.now.format(format);
    }
}
