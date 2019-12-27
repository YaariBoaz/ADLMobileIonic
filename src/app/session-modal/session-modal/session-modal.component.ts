import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ShootingService} from '../shooting.service';
import {WebsocketService} from '../websocket.service';

@Component({p
    selector: 'app-session-modal',
    templateUrl: './session-modal.component.html',
    styleUrls: ['./session-modal.component.scss'],
})
export class SessionModalComponent implements OnInit {
    @ViewChild('container', {static: false}) container: ElementRef;
    sessionIsOver = false;
    shots = [{x: 56, y: 102}];
    drill;

    constructor(private shootingService: ShootingService, private  webSocketService: WebsocketService) {
        this.drill = this.shootingService.selectedDrill;
    }

    ngOnInit() {
        this.webSocketService.initConnection(11);
        this.webSocketService.shotArrived$.subscribe((data) => {
            if (data) {
                const height = this.container.nativeElement.offsetHeight;
                const width = this.container.nativeElement.offsetWidth;
                const x = data.split(',')[1];
                const y = data.split(',')[2];
                setTimeout(() => {
                    this.shots.push(this.shootingService.handelShoot(height, width, {x, y}));
                }, 1000);
            }
        });
    }
}
