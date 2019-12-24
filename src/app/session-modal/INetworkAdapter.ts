import {BehaviorSubject} from 'rxjs';

export interface INetworkAdapter {
    shotArrived$: BehaviorSubject<any>;

    getOnlineTargets();

    subscribeConnectionIssues();

    subscribeConnectionError();

    sendGateWayStop();

    initConnection(chosenTarget);

    subscribeToUpdates();
}
