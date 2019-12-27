import {BehaviorSubject} from 'rxjs';

export interface INetworkAdapter {
    shotArrived$: BehaviorSubject<any>;

    getOnlineTargets();

    subscribeConnectionError();

    sendGateWayStop();

    initConnection(chosenTarget);

    subscribeToUpdates();
}
