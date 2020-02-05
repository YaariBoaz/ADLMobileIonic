import {BehaviorSubject} from 'rxjs';

export interface INetworkAdapter {
    shotArrived$: BehaviorSubject<any>;

    getOnlineTargets();

    sendGateWayStop();

    initConnection(chosenTarget);

}
