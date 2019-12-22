import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-session-modal',
    templateUrl: './session-modal.component.html',
    styleUrls: ['./session-modal.component.scss'],
})
export class SessionModalComponent implements OnInit {

    sessionIsOver = false;

    constructor() {
    }

    ngOnInit() {
    }
}
